import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createGetInitialProps, createStylesServer, ServerStyles } from "@mantine/next"
import { rtlCache } from '../utils/rtl-cache';


const getInitialProps = createGetInitialProps();

const stylesServer = createStylesServer(rtlCache);

export default class _Document extends Document {

  static async getInitialProps(ctx: DocumentContext) {
    //@ts-ignore
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />
      ]
    }
  }
  
}
