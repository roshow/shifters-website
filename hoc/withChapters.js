import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

export default (TargetComponent) => {
  return class WithChapters extends Component {
    static async getInitialProps ({ req }) {
      if (req) {
        let { origin } = absoluteUrl(req, 'localhost:3000');
        const res = await fetch(`${origin}/api/chapters`);
        const chapters = await res.json();
    
        return { chapters };
      }
      return {};
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

      return <TargetComponent {...pageProps} />;
    }

  }
}