---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VZUZ5FZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQCCzJwYbPopQ4LmLGIOsY%2Fb3QHWX1wdQ%2B4xy8Y5o9d5rgIhANS5zFeBddyemRqm1bDPGssaWsv0YRwYumRqBpwJU9tpKv8DCBIQABoMNjM3NDIzMTgzODA1Igw6kTIoORp6ziQL%2FSkq3AM9CYN3wX5Top3f1rrDMoEalhshmZxSec7dwgFFRz1a21czxeI%2BRyHKVJWREq1vbO1FelFxgqxddLiQ4YBivW87gCnWURrkr%2B6xBJ9rKwiH1Y5ESBpBWSBzH6bWBsFZpM4sZWe%2BQMSUDGOJGT7SlgvyjhzYNKG1WA095Z8%2FrdE9NIhERuyj%2B9tLl5AdVbNuxEcgatmbqnmYbyTNri7A8%2BvWCB28VB8oMpFwDIQd0HFUZoCqu%2BtocdGgW6sM9W9N5GjP3qWwwrfWlSLIA%2FJX2byWcAsSAU5gm8FjuMksGfN4gBs8FfqvzkUA7U241SeKCumodQfHXyvsKJ22RkwXEeqTgRkdUopNRQ0eijedkYUna1DZHOrCisZyOlGkP8u5l98stN2jsD7XS1YBsOAWhIcP8G910tEWGerRWV%2FVAwQlHlvYhBruDJiC5OnapUTiro0zK22axaahmsU1s72UlEuOW14OmTrxKAjmBWaEqY%2B54%2BXBGJBZRLn%2BQSBVCRUGCDUFbf1V3IxAp5yCfS7BlrytlhRL4gbCg%2BXtWT0xi%2FZYgTOv5EpIhUntnVPQPaVe5OwuhZWSyoQDXpirFgspE2JXIpnOZsCMSGket%2BFkFEK4FVjzh4dPuHDt4OtDXjDsz7rJBjqkAdpvHPIb3gjz%2FQWp4J%2BbwSu24JCyCYRjzhb8tnKTkz80UAsqCTazemoY6z0NHMOmr%2BBZTewzoEyVFGE%2FxrqrxPn7zUGvr8g7zNBtG%2Ff4UXfcPm2%2Fi4hj6uo6OOowYp6Ts8NV3NR9S8HvABKWSj2kOq%2B5AHKD7Z4yjyDR0loVh1POkAD40NzFSI3fUXyh%2FJ7wKcRd9wdfx%2BIWXJrJWDmNPbEccgPj&X-Amz-Signature=66e9624b7d5f579d8eb339730ca4d7b8d380b0b381828f8a8c39ff1ff45a5dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VZUZ5FZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQCCzJwYbPopQ4LmLGIOsY%2Fb3QHWX1wdQ%2B4xy8Y5o9d5rgIhANS5zFeBddyemRqm1bDPGssaWsv0YRwYumRqBpwJU9tpKv8DCBIQABoMNjM3NDIzMTgzODA1Igw6kTIoORp6ziQL%2FSkq3AM9CYN3wX5Top3f1rrDMoEalhshmZxSec7dwgFFRz1a21czxeI%2BRyHKVJWREq1vbO1FelFxgqxddLiQ4YBivW87gCnWURrkr%2B6xBJ9rKwiH1Y5ESBpBWSBzH6bWBsFZpM4sZWe%2BQMSUDGOJGT7SlgvyjhzYNKG1WA095Z8%2FrdE9NIhERuyj%2B9tLl5AdVbNuxEcgatmbqnmYbyTNri7A8%2BvWCB28VB8oMpFwDIQd0HFUZoCqu%2BtocdGgW6sM9W9N5GjP3qWwwrfWlSLIA%2FJX2byWcAsSAU5gm8FjuMksGfN4gBs8FfqvzkUA7U241SeKCumodQfHXyvsKJ22RkwXEeqTgRkdUopNRQ0eijedkYUna1DZHOrCisZyOlGkP8u5l98stN2jsD7XS1YBsOAWhIcP8G910tEWGerRWV%2FVAwQlHlvYhBruDJiC5OnapUTiro0zK22axaahmsU1s72UlEuOW14OmTrxKAjmBWaEqY%2B54%2BXBGJBZRLn%2BQSBVCRUGCDUFbf1V3IxAp5yCfS7BlrytlhRL4gbCg%2BXtWT0xi%2FZYgTOv5EpIhUntnVPQPaVe5OwuhZWSyoQDXpirFgspE2JXIpnOZsCMSGket%2BFkFEK4FVjzh4dPuHDt4OtDXjDsz7rJBjqkAdpvHPIb3gjz%2FQWp4J%2BbwSu24JCyCYRjzhb8tnKTkz80UAsqCTazemoY6z0NHMOmr%2BBZTewzoEyVFGE%2FxrqrxPn7zUGvr8g7zNBtG%2Ff4UXfcPm2%2Fi4hj6uo6OOowYp6Ts8NV3NR9S8HvABKWSj2kOq%2B5AHKD7Z4yjyDR0loVh1POkAD40NzFSI3fUXyh%2FJ7wKcRd9wdfx%2BIWXJrJWDmNPbEccgPj&X-Amz-Signature=66e9624b7d5f579d8eb339730ca4d7b8d380b0b381828f8a8c39ff1ff45a5dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675X2TVWS%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIF4Tf7gn1KoFyGDe27g6Iz0FeVahQQ8jFvCprCyYUPqXAiASDizTp9UJJjp70ERBVlwWF9wloQMGLwvQct%2Fn%2FiRO%2BSr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMwFbDB0lCF8Jdp2jCKtwD5X6MmzIdd1xS1Ehhz1AKf9NXeJb8qivNNtabTtfp7apFZwbUBYdtFwh3nCtjrsz7r5MNePNflgL1ZYr1hnlIaHfLA%2FZVRC6kOwQCNNASg%2FOkyIouCiZX6p3%2BuvDp1nlhW87oPvzUZkMdryw55ajqrKNcZydQxuuAWw0te1NFQhn5012gYW6NuyRjpdK%2F1pGVKIYeYM4K9KFZbgVh7REFIb%2FP8%2Fa3sH4TYhqyWKmIbd1XVjpj0Vt7sR6Hn521%2F0Kh5lP2LhWvXWMivw6CdVnlLMJ33p0Yf8fuPfLadZUdxOS4GzjmNT3V6SDxIPEmbUb1EmMl7oTJqh507yt1qdw3%2FucSPXt%2Fg%2FUazkWzyG5iOsOKulTm2DqTHOTK0RzWtn%2FXwgWMlP%2FS%2FpX%2F52hnzQpapiRIsqRT%2BBbyPjv0YWSslkJBY1M3MaAua61%2Bff6xVPpNbxC4eMPULwrIypJ3LO8rwH5fFLP6nryn2XGrVb0bXNx24kMuR0Atxe%2FAq62%2FwYDvVTLFXjXa9XC5w2mHaD3Sex0afsXlzQ0vhA00%2FQjNIaLhWMsWqm3LfjJ%2B6hWyyh1sax6PsxH4ugBJvX3boiXFvFihUJtT5Nvt8sPImCKrvCGD2n3WsyDMka2n6t4wtNC6yQY6pgHVcUzv8oI9h4tAAf%2BIOl65NYfhqX%2BshYAzewyk6BQFIM0ykwUsj3jJz2f69ukavVWuAGkX0SffBjFKqHZW0co1sliMvWZuif9%2BfP1KHNkDTtvbev4bOLWdfPDdqhoqranms7tHeNrT8UiozyMd6NdVtvto%2By3yYyFXIX60nD%2B9vgYI7TYm4odiAbpl8saS7lkxf9DTg3wiMNij7HPqzyYERgTh7M1J&X-Amz-Signature=4b1cfaf71f439fd2ff11919f0cd1b3779a340641f0f3a4b2065800c67110f995&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675X2TVWS%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIF4Tf7gn1KoFyGDe27g6Iz0FeVahQQ8jFvCprCyYUPqXAiASDizTp9UJJjp70ERBVlwWF9wloQMGLwvQct%2Fn%2FiRO%2BSr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMwFbDB0lCF8Jdp2jCKtwD5X6MmzIdd1xS1Ehhz1AKf9NXeJb8qivNNtabTtfp7apFZwbUBYdtFwh3nCtjrsz7r5MNePNflgL1ZYr1hnlIaHfLA%2FZVRC6kOwQCNNASg%2FOkyIouCiZX6p3%2BuvDp1nlhW87oPvzUZkMdryw55ajqrKNcZydQxuuAWw0te1NFQhn5012gYW6NuyRjpdK%2F1pGVKIYeYM4K9KFZbgVh7REFIb%2FP8%2Fa3sH4TYhqyWKmIbd1XVjpj0Vt7sR6Hn521%2F0Kh5lP2LhWvXWMivw6CdVnlLMJ33p0Yf8fuPfLadZUdxOS4GzjmNT3V6SDxIPEmbUb1EmMl7oTJqh507yt1qdw3%2FucSPXt%2Fg%2FUazkWzyG5iOsOKulTm2DqTHOTK0RzWtn%2FXwgWMlP%2FS%2FpX%2F52hnzQpapiRIsqRT%2BBbyPjv0YWSslkJBY1M3MaAua61%2Bff6xVPpNbxC4eMPULwrIypJ3LO8rwH5fFLP6nryn2XGrVb0bXNx24kMuR0Atxe%2FAq62%2FwYDvVTLFXjXa9XC5w2mHaD3Sex0afsXlzQ0vhA00%2FQjNIaLhWMsWqm3LfjJ%2B6hWyyh1sax6PsxH4ugBJvX3boiXFvFihUJtT5Nvt8sPImCKrvCGD2n3WsyDMka2n6t4wtNC6yQY6pgHVcUzv8oI9h4tAAf%2BIOl65NYfhqX%2BshYAzewyk6BQFIM0ykwUsj3jJz2f69ukavVWuAGkX0SffBjFKqHZW0co1sliMvWZuif9%2BfP1KHNkDTtvbev4bOLWdfPDdqhoqranms7tHeNrT8UiozyMd6NdVtvto%2By3yYyFXIX60nD%2B9vgYI7TYm4odiAbpl8saS7lkxf9DTg3wiMNij7HPqzyYERgTh7M1J&X-Amz-Signature=4b1cfaf71f439fd2ff11919f0cd1b3779a340641f0f3a4b2065800c67110f995&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P6B42NP%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIFnlWGnNBNEFcEtlIA2lTvydfhriPvrTCLEuz5Fn%2Bh9AAiEAqoFPU7lqT2zUKIjY2uLNahPzVnRQEFQRwdwZmxglmAgq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDKVtcSeKmZXyrY%2FvNCrcA1H8KDeWixkHOm4%2B8ebc2OkFUB1c03Ytf6Gg9VSvwUGKr7aQwL6jzazi%2BTif5r5AvwgF%2FTx1ZLEKLSwnOEoYIh4KehGFzkq%2BCmSgjrW3poYvX1uB5gkvRVmOOv5xJXqfUPuOYC8uSEUIru0XIewLXj%2BufxBVcOwT7haWEOidNu521Lch%2F3aQqJI%2BONPqWa9LNJc2vbXrSmN4RLRgPRRro71ChURN9a0yUHPDGG2M2j%2BUFlCggEV0e8YFrrYGIJrbHfQ0l3CNUiRBFAfnWlcgDN2hcwL3IxQnBhHSuRA3G5dJ8y5GMWVvE%2FL%2FKOyZj8gPbnMfh8rxtTRn9rUe4jlqwU4kM%2Ft%2FkFLBQSMTpT9%2Fzx76UvTCSTW%2BrPGXZ%2FXJ3HKOLyLvycDw%2FVbffpueqPuZX3cNaioIzuc6PoBrnTxhFc%2FKJAXm3lF4zYBTwePP62sb3yPu0oFq0P2nyyHkBzUtzdQn%2B4nypppqSLChbJlPD7l8GuW0pqQnm83IkDfTOJudCVvtla1tE5PMx1YhdVNZKPxk6cMTecvSrzSMuNlwwZIXAqQ0J9eZJI17PUfN8KEYVTP%2FC6N9tE9kY5hKER%2BBez6B2DDLJOUOTLCml7XVoHDsZiMyifsOlSxLYmucMM%2FQuskGOqUBQk9RLWDUrXwWpCjKak82Ji5DxTRUd4349LS2V14Djg8dZFtum75J%2Fc1nzUCcSGOUpg1jboFn%2FOR5Uq%2B8Ofl4aa3k5tO%2BANapPiBnub7XpyGfIPLvtpJ87iKu%2FrSTGoRu6zb5fkjTLa1ANf77YvVrtuBteWnaGa6rSU1gg62k%2Bkl0TyjijQyjk42G3md8I8JsAB%2B8VTCAsu8n3GYa0q7rcP3Hfi1l&X-Amz-Signature=ad800cdfc771aa45e60aba52701f2dcaf66dbebb7167b87ee4a9034cfe72a064&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLOOAFGK%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQC%2F3Ow6xbVEwU1E2LqAb3XGOBIXDueywWoEvHk2zYKmDgIhANaM6TWlM%2FDaWt7sxI1SMV2GgUXMB2HF7B%2B%2Bm7YAlLVUKv8DCBIQABoMNjM3NDIzMTgzODA1Igx57geD3j0sa3XysPsq3AMZe4Ksgwdl%2B3odRwliAo8rtxPbplZsWc03Av39uHmeLRqxBSanGqRjDSjSd%2B4B9LHzxnZLlweXwY1KPO19PLdhDmzmNXjaKHZh7CqULDVWXC3ukE4E74Mzr%2BsR9qvsHZZ9hFYbafA7hzeN4w6ayD3KqBtVN6aIOiBEncjJjL5n67ckQRSU%2BuK1ADrB9s9a%2BSxKRDAzJ5f7roOV34kX7I3YRkLfw6XnSAcFy3Sw7NUYnK9wJZX2Ky6aFSVYQd0VjKpXDIl4d770W6wmO6QzTsQJAAClx4caF0Vtk%2BszsNO9uqLZdFPQ39%2BScRfOHtgMNPAGBJWDd4DbJwh6n5L9KvMnCZUDeyL8KX8ndMcAqR6sCYgDIgAf%2FPKv9KAQR3iOkdDbfWc3HjEOaCC8sy9DpehTMEoSuBL5hiSjYtYQvh6NdF0l1RXWRrnUBBuiPS5JnskNXqbGr19CZRwzuodsSPlXH8jWYKNdSBonQmOrigvOU7jHd454pAAr4MC3st5Sn498wc6%2BuuiNR6rrQoUWR53SpiFTgR7s%2BqodS7ZnsYR7Aj2o4IBlG0P2toFapaA1S7opAglpStI0qLIl%2FGCL4npgAO0UAv6HQJlpJtrqoUS%2F%2F1ZnUYXM5YROVHklyDC00LrJBjqkASXqpbGyhAe22YttCXR9r8fNzAclNWpwq3AQ0b3fK8CTnYlrU01gzE4UmifU7HiZZdHMxdw8dCnL2g%2Bm49PXq5Nr2Lorum0NLK0CYkru7Q8Kprjldn2vJwU5OElWUpDbnZ%2FZ7E1xjK3IfVStr9AKEZSvb3EfIXcV2T67ILPEzHBmh4FTaMjWErKTAocmCBnH635Dac8TDL%2FlhseqGE96xvhkkYCr&X-Amz-Signature=d51c5d018eed81305822ae0ca8d538ecbdaa913e404f0dbb2056fed31bbfeb22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLOOAFGK%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T091427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQC%2F3Ow6xbVEwU1E2LqAb3XGOBIXDueywWoEvHk2zYKmDgIhANaM6TWlM%2FDaWt7sxI1SMV2GgUXMB2HF7B%2B%2Bm7YAlLVUKv8DCBIQABoMNjM3NDIzMTgzODA1Igx57geD3j0sa3XysPsq3AMZe4Ksgwdl%2B3odRwliAo8rtxPbplZsWc03Av39uHmeLRqxBSanGqRjDSjSd%2B4B9LHzxnZLlweXwY1KPO19PLdhDmzmNXjaKHZh7CqULDVWXC3ukE4E74Mzr%2BsR9qvsHZZ9hFYbafA7hzeN4w6ayD3KqBtVN6aIOiBEncjJjL5n67ckQRSU%2BuK1ADrB9s9a%2BSxKRDAzJ5f7roOV34kX7I3YRkLfw6XnSAcFy3Sw7NUYnK9wJZX2Ky6aFSVYQd0VjKpXDIl4d770W6wmO6QzTsQJAAClx4caF0Vtk%2BszsNO9uqLZdFPQ39%2BScRfOHtgMNPAGBJWDd4DbJwh6n5L9KvMnCZUDeyL8KX8ndMcAqR6sCYgDIgAf%2FPKv9KAQR3iOkdDbfWc3HjEOaCC8sy9DpehTMEoSuBL5hiSjYtYQvh6NdF0l1RXWRrnUBBuiPS5JnskNXqbGr19CZRwzuodsSPlXH8jWYKNdSBonQmOrigvOU7jHd454pAAr4MC3st5Sn498wc6%2BuuiNR6rrQoUWR53SpiFTgR7s%2BqodS7ZnsYR7Aj2o4IBlG0P2toFapaA1S7opAglpStI0qLIl%2FGCL4npgAO0UAv6HQJlpJtrqoUS%2F%2F1ZnUYXM5YROVHklyDC00LrJBjqkASXqpbGyhAe22YttCXR9r8fNzAclNWpwq3AQ0b3fK8CTnYlrU01gzE4UmifU7HiZZdHMxdw8dCnL2g%2Bm49PXq5Nr2Lorum0NLK0CYkru7Q8Kprjldn2vJwU5OElWUpDbnZ%2FZ7E1xjK3IfVStr9AKEZSvb3EfIXcV2T67ILPEzHBmh4FTaMjWErKTAocmCBnH635Dac8TDL%2FlhseqGE96xvhkkYCr&X-Amz-Signature=d51c5d018eed81305822ae0ca8d538ecbdaa913e404f0dbb2056fed31bbfeb22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

