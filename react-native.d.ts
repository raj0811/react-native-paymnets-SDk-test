declare module '@react-native-community/clipboard' {
    export function parse(url: string): { path: string; queryParams: { [key: string]: string } };
  }
  