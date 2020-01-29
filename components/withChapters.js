import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

export default (PageComponent) => {
  return class PageWithChapters extends Component {
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

    state = {
      chapters: this.props.chapters
    }

    async componentDidMount () {
      if (!this.state.chapters) {
        const res = await fetch('/api/chapters');
        const chapters = await res.json();
        this.setState({
          chapters,
        });
      }
    }

    render () {
      const pageProps = {
        ...this.props,
        chapters: this.state.chapters,
      };

      return <PageComponent {...pageProps} />;
    }

  }
}