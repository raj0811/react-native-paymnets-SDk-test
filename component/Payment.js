import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export const Payment = ({collectId, onSuccess, onFailure, mode}) => {
  const [webViewUrl, setWebviewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  if (mode !== 'production' && mode !== 'sandbox') {
    return (
      <View style={styles.errorcontainer}>
        <Text style={styles.errorText}>Invalid Payment Mode</Text>
      </View>
    );
  }

  if (typeof onSuccess !== 'function') {
    return (
      <View style={styles.errorcontainer}>
        <Text style={styles.errorText}>onSuccess is not a function</Text>
      </View>
    );
  }

  if (typeof onFailure !== 'function') {
    return (
      <View style={styles.errorcontainer}>
        <Text style={styles.errorText}>onFailure is not a function</Text>
      </View>
    );
  }

  useEffect(() => {
    if (
      (webViewUrl.includes('https://dev.pg.edviron.com/payment-success') ||
        webViewUrl.includes('https://pg.edviron.com/payment-success')) &&
      webViewUrl.includes(collectId)
    ) {
      onSuccess();
    } else if (
      (webViewUrl.includes('https://dev.pg.edviron.com/payment-failure') ||
        webViewUrl.includes('https://pg.edviron.com/payment-failure')) &&
      webViewUrl.includes(collectId)
    ) {
      onFailure();
    }
  }, [webViewUrl]);

  const handleNavigationStateChange = newNavState => {
    const {url} = newNavState;
    setWebviewUrl(url);
  };

  const injectedJavaScript = `
    (function() {
      function handleEasebuzzResponse(response) {
        window.ReactNativeWebView.postMessage(JSON.stringify(response));
      }
      window.easebuzzResponseHandler = handleEasebuzzResponse;
    })();
  `;

  const handleMessage = event => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'openWindow') {
        webViewRef.current.injectJavaScript(`
          window.location.href = '${data.url}';
        `);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const url =
    mode === 'production'
      ? `https://pg.edviron.com`
      : `https://dev.pg.edviron.com`;

  return (
    <View style={styles.container}>
       <WebView
        ref={webViewRef}
        source={{ uri: `${url}/collect-sdk-payments?collect_id=${collectId}` }}
        style={styles.webview}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        allowsInlineMediaPlayback={true}
        allowFileAccess={true}
        useWebKit={true}
        scalesPageToFit={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      {loading && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },
});
