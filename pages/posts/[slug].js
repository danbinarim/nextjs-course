import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

// 동적 경로(예: /posts/[slug])를 정적 사이트 생성(SSG) 방식으로 렌더링할 때 사용되는 함수
export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  // 가져온 포스트 데이터를 페이지 컴포넌트의 props로 전달
  // Incremental Static Regeneration(ISR)을 활성화합니다. 빌드 후 600초(10분)마다 Next.js가 페이지를 재생성하여 최신 데이터를 반영
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false, // paths 배열에 명시되지 않은 경로로 사용자가 접근했을 때 어떻게 처리할지를 결정합니다. false로 설정하면, 미리 생성되지 않은 경로에 대해서는 404 페이지를 보여줍니다.
    //  true로 변경하면, 미리 생성되지 않은 경로에 대해서도 서버에서 페이지를 생성하여 보여줍니다. 이 경우, 사용자가 처음 접근할 때는 로딩 상태가 잠시 보일 수 있습니다.
  };
}

export default PostDetailPage;
