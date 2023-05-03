import { pushTestData } from '@/firebase/utils';
import { useEffect } from 'react';

export function UploadData() {
  const datas = [
    {
      user_uid: 'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
      content: '김소희 게시물',
      createAt: '2022-08-26',
      images: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(330).png?alt=media&token=d6a519f1-a549-4366-b3b6-75f514c5dd08',
          alt: '꼬치 사진',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(334).png?alt=media&token=1dabb241-1400-4c53-8358-1c3300646cce',
          alt: 'html 공부',
        },
      ],
      like: [
        't53il9PxSydQoY4OQyBFrG6RRfz1',
        'pN9I8XTDJuXN3yWnIncviR4HuhB3',
        'NfeMMce0J7g821R7O1QAzuZo0ia2',
      ],
      comment: [
        {
          user_uid: 't53il9PxSydQoY4OQyBFrG6RRfz1',
          content: '열공하시네요~',
          createAt: '2022-08-26',
          like: [
            'NfeMMce0J7g821R7O1QAzuZo0ia2',
            'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
          ],
          recomment: [
            {
              user_uid: 'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
              content: '제가 좀 열심히 하긴 하죠~',
              createAt: '2022-08-26',
              like: [
                'NfeMMce0J7g821R7O1QAzuZo0ia2',
                't53il9PxSydQoY4OQyBFrG6RRfz1',
              ],
            },
          ],
        },
      ],
    },
    {
      user_uid: 'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
      content: '김소희 게시물2222222222',
      createAt: '2022-08-26',
      images: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(4).png?alt=media&token=1fb0fac4-97bb-4ea3-b673-096f356a0e0c',
          alt: '스타듀밸리 농장',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(48).png?alt=media&token=40e83bab-57f9-479c-b114-d490bd2cbadc',
          alt: '한담해변',
        },
      ],
      like: ['t53il9PxSydQoY4OQyBFrG6RRfz1', 'pN9I8XTDJuXN3yWnIncviR4HuhB3'],
      comment: [
        {
          user_uid: 'pN9I8XTDJuXN3yWnIncviR4HuhB3',
          content: '게임도 열심히 하시는군요~',
          createAt: '2022-08-26',
          like: [
            'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
            'NfeMMce0J7g821R7O1QAzuZo0ia2',
          ],
          recomment: [
            {
              user_uid: 'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
              content: '제가 좀 뭐든지 열심히 하긴 하죠~2222222222',
              createAt: '2022-08-26',
              like: [
                'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
                'NfeMMce0J7g821R7O1QAzuZo0ia2',
                't53il9PxSydQoY4OQyBFrG6RRfz1',
              ],
            },
          ],
        },
      ],
    },
    {
      user_uid: 'pN9I8XTDJuXN3yWnIncviR4HuhB3',
      content:
        '여러분 저는 지금 유럽에 왔습니다 너무 좋네요 하하하하하 아무말아무말 아무말을 해보고 있습니다. 여러분은 잘 지내시나요? 저는 유럽의 구석구석을 돌아다녀보고 있어요! 저희 콘서트하는 날까지 다들 몸조심하고, 저도 잘 다녀오겠습니다!',
      createAt: '2022-08-26',
      images: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F1.jpg?alt=media&token=518346e6-aa49-40c7-8617-3dd6afe9279e',
          alt: '유럽 with 가죽자켓',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F2.jpg?alt=media&token=37f4f177-7b52-48da-b3b5-d80187f5c43a',
          alt: '유럽 with 떡볶이 코트',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F3.jpg?alt=media&token=721a9f92-e179-440d-be3f-2a5bd5fe9ffd',
          alt: '유럽 with 아메카지룩',
        },
      ],
      like: [
        'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
        't53il9PxSydQoY4OQyBFrG6RRfz1',
        'NfeMMce0J7g821R7O1QAzuZo0ia2',
      ],
      comment: [
        {
          user_uid: 'NfeMMce0J7g821R7O1QAzuZo0ia2',
          content: '언니 사복 존예탱이예요',
          createAt: '2022-08-26',
          like: [
            'pN9I8XTDJuXN3yWnIncviR4HuhB3',
            'NfeMMce0J7g821R7O1QAzuZo0ia2',
          ],
          recomment: [
            {
              user_uid: 'pN9I8XTDJuXN3yWnIncviR4HuhB3',
              content: '오랜만의 여행이라서 신경써서 입어봤어요~',
              createAt: '2022-08-26',
              like: ['NfeMMce0J7g821R7O1QAzuZo0ia2'],
            },
          ],
        },
        {
          user_uid: 't53il9PxSydQoY4OQyBFrG6RRfz1',
          content: '언니 조심히 다녀와요 ㅜㅜ 콘서트 날만 기다리는 중!!',
          createAt: '2022-08-26',
          like: [
            't53il9PxSydQoY4OQyBFrG6RRfz1',
            'pN9I8XTDJuXN3yWnIncviR4HuhB3',
          ],
          recomment: [
            {
              user_uid: 'pN9I8XTDJuXN3yWnIncviR4HuhB3',
              content: '우리 유애나도 조심히 잘 지내고 있어요~',
              createAt: '2022-08-26',
              like: [
                'NfeMMce0J7g821R7O1QAzuZo0ia2',
                't53il9PxSydQoY4OQyBFrG6RRfz1',
                'pN9I8XTDJuXN3yWnIncviR4HuhB3',
              ],
            },
          ],
        },
      ],
    },
    {
      user_uid: 'pN9I8XTDJuXN3yWnIncviR4HuhB3',
      content: '드림 개봉 기념! 드림 홍보 스케줄 사진들🌱 내 퍼스널컬러 #드림',
      createAt: '2022-08-26',
      images: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F4.jpg?alt=media&token=ca664c64-b6d3-4c8b-b3ef-917ed08b264c',
          alt: '아이유 드림',
        },
      ],
      like: [
        'G9HeDOJzemNBiPSLFEr6sSJc0gw1',
        't53il9PxSydQoY4OQyBFrG6RRfz1',
        'NfeMMce0J7g821R7O1QAzuZo0ia2',
      ],
      comment: [
        {
          user_uid: 'NfeMMce0J7g821R7O1QAzuZo0ia2',
          content:
            '언니 프사가 트위티인 줄 알았는데 이제 보니 셀카였던 건에 대하여,,,🐣💛 트위티 그 잡채',
          createAt: '2022-08-26',
          like: ['pN9I8XTDJuXN3yWnIncviR4HuhB3'],
          recomment: [],
        },
        {
          user_uid: 't53il9PxSydQoY4OQyBFrG6RRfz1',
          content: '취향범벅 사진이다...행복...🤩❤️❤️❤️',
          createAt: '2022-08-26',
          like: [
            't53il9PxSydQoY4OQyBFrG6RRfz1',
            'pN9I8XTDJuXN3yWnIncviR4HuhB3',
          ],
          recomment: [
            {
              user_uid: 'pN9I8XTDJuXN3yWnIncviR4HuhB3',
              content: '세상에 쏘이님을 여기서 보다뉘😍',
              createAt: '2022-08-26',
              like: [
                'NfeMMce0J7g821R7O1QAzuZo0ia2',
                't53il9PxSydQoY4OQyBFrG6RRfz1',
                'pN9I8XTDJuXN3yWnIncviR4HuhB3',
              ],
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    datas.map((data) => {
      pushTestData('posts', data);
    });
  }, []);

  return <div>데이터 업로드 완료~</div>;
}
