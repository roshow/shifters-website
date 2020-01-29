import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

export default (PageComponent) => class PageWithChapters extends Component {
  static async getInitialProps (ctx) {
    let pageProps = {};
    
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }
    
    if (ctx.req) {
      let { origin } = absoluteUrl(ctx.req, 'localhost:3000');
      const res = await fetch(`${origin}/api/chapters`);
      const chapters = await res.json();
      return { ...pageProps, chapters };
    }
    
    return pageProps;
  }

  async componentDidMount () {
    if (!this.props.chapters) {
      const res = await fetch('/api/chapters');
      const chapters = await res.json();
      this.props.setChapters(chapters);
    }
  }

  render () {
    if (!this.props.chapters) {
      return <h1>Loading...</h1>;
    }
    return <PageComponent {...this.props} />;
  }

}