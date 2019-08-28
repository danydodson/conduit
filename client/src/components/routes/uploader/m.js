{
  // common: {
  //   appName: 'SeeSee',
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjRjYWYzYTFiNzVlMTBjMjg2NDNkZSIsInVzZXJuYW1lIjoia2l0dHlwcnlkZSIsImltYWdlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc2NlbmljbG91ZC9pbWFnZS91cGxvYWQvdjE1NjY4MDQxODMvdXNlcnMvdXNlcl8wMS53ZWJwIiwiZXhwIjoxNTcyMTQzODEwLCJpYXQiOjE1NjY5NTk4MTB9.un8B3YYYKjECaU0XB0CW2qFpnq0nHkFn-TOBEi8INYE',
  //   viewChangeCounter: 0,
  //   appLoaded: true,
  //   currentUser: {
  //     username: 'kittypryde',
  //     email: 'kittypryde@gmail.com',
  //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjRjYWYzYTFiNzVlMTBjMjg2NDNkZSIsInVzZXJuYW1lIjoia2l0dHlwcnlkZSIsImltYWdlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc2NlbmljbG91ZC9pbWFnZS91cGxvYWQvdjE1NjY4MDQxODMvdXNlcnMvdXNlcl8wMS53ZWJwIiwiZXhwIjoxNTcyMTUzMjk5LCJpYXQiOjE1NjY5NjkyOTl9.vXwwSxu3V1Nqjc6xDF--aacG9G4B6eHV4SX869nDw2M',
  //     bio: 'I\'m a superhero !',
  //     image: 'https://res.cloudinary.com/scenicloud/image/upload/v1566804183/users/user_01.webp'
  //   }
  // },
  // auth: {},
  // home: {},
  // profile: {},
  // articles: {},
  // article: {},
  uploaded: [
    {
      id: 1,
      fileName: 'food_01.webp',
      progress: {
        isTrusted: true,
        direction: 'download'
      },
      response: {
        req: {
          method: 'POST',
          url: 'https://api.cloudinary.com/v1_1/scenicloud/upload',
          headers: {}
        },
        xhr: {},
        text: '{"public_id":"medium_title_1","version":1566960217,"signature":"ac59ef452985af2728d3a679ca63e618c4b756c7","width":1080,"height":1920,"format":"webp","resource_type":"image","created_at":"2019-08-28T02:43:37Z","tags":["seesee","title_1"],"bytes":85648,"type":"upload","placeholder":false,"url":"http://res.cloudinary.com/scenicloud/image/upload/v1566960217/medium_title_1.webp","secure_url":"https://res.cloudinary.com/scenicloud/image/upload/v1566960217/medium_title_1.webp","access_mode":"public","existing":true,"delete_token":"714a4ed4a4bcd69ebca75f36873e8cd31ddc24886a56fd599437480f047d9e99eeae48105c93f2367ffedc20b5219336c2e97aef9bc5a2be5d547e77d7aaa6db3a2765ed459c97bc6148a2d112b624e6f925132a60a7dbf00995140279a8743dfc2030d35dd36737f3b204519817a73e91483d783594411f475cfee60b9c00501c6f3c31f4d31d018505d9f66fa49958"}',
        statusText: 'OK',
        statusCode: 200,
        status: 200,
        statusType: 2,
        info: false,
        ok: true,
        redirect: false,
        clientError: false,
        serverError: false,
        error: false,
        created: false,
        accepted: false,
        noContent: false,
        badRequest: false,
        unauthorized: false,
        notAcceptable: false,
        forbidden: false,
        notFound: false,
        unprocessableEntity: false,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'max-age=0, private, must-revalidate'
        },
        header: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'max-age=0, private, must-revalidate'
        },
        type: 'application/json',
        charset: 'utf-8',
        links: {},
        body: {
          public_id: 'medium_title_1',
          version: 1566960217,
          signature: 'ac59ef452985af2728d3a679ca63e618c4b756c7',
          width: 1080,
          height: 1920,
          format: 'webp',
          resource_type: 'image',
          created_at: '2019-08-28T02:43:37Z',
          tags: [
            'seesee',
            'title_1'
          ],
          bytes: 85648,
          type: 'upload',
          placeholder: false,
          url: 'http://res.cloudinary.com/scenicloud/image/upload/v1566960217/medium_title_1.webp',
          secure_url: 'https://res.cloudinary.com/scenicloud/image/upload/v1566960217/medium_title_1.webp',
          access_mode: 'public',
          existing: true,
          delete_token: '714a4ed4a4bcd69ebca75f36873e8cd31ddc24886a56fd599437480f047d9e99eeae48105c93f2367ffedc20b5219336c2e97aef9bc5a2be5d547e77d7aaa6db3a2765ed459c97bc6148a2d112b624e6f925132a60a7dbf00995140279a8743dfc2030d35dd36737f3b204519817a73e91483d783594411f475cfee60b9c00501c6f3c31f4d31d018505d9f66fa49958'
        }
      }
    }
  ],
  
  photos: [
    {
      public_id: 'medium_title_1',
      version: 1566960217,
      signature: 'ac59ef452985af2728d3a679ca63e618c4b756c7',
      width: 1080,
      height: 1920,
      format: 'webp',
      resource_type: 'image',
      created_at: '2019-08-28T02:43:37Z',
      tags: [
        'seesee',
        'title_1'
      ],
      bytes: 85648,
      type: 'upload',
      placeholder: false,
      url: 'http://res.cloudinary.com/scenicloud/image/upload/v1566960217/medium_title_1.webp',
      secure_url: 'https://res.cloudinary.com/scenicloud/image/upload/v1566960217/medium_title_1.webp',
      access_mode: 'public',
      existing: true,
      delete_token: '714a4ed4a4bcd69ebca75f36873e8cd31ddc24886a56fd599437480f047d9e99eeae48105c93f2367ffedc20b5219336c2e97aef9bc5a2be5d547e77d7aaa6db3a2765ed459c97bc6148a2d112b624e6f925132a60a7dbf00995140279a8743dfc2030d35dd36737f3b204519817a73e91483d783594411f475cfee60b9c00501c6f3c31f4d31d018505d9f66fa49958'
    }
  ],
  editor: {},
  settings: {
    inProgress: true
  },
  router: {
    location: {
      pathname: '/uploader',
      search: '',
      hash: '',
      key: 'jnr6qh'
    },
    action: 'POP'
  }
}