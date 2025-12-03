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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W65FX7W4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCx41JJe0WMl44wonPXJ%2Bch7SujUSHVL19GZK%2BgAM4pXwIhAJ%2FOAhn3H%2FwgmN3hkuGveo3YurSMm83%2BzeWP7S2hM1DKKv8DCCIQABoMNjM3NDIzMTgzODA1IgxtS9lYgB0QIaKUKk4q3ANg1spLffVCQSRhSTlpcG06ZLXrOPLNpR4Il8ncdntWoLuRlZPHW4UT2AgwUptzGhMvwhTxnyHI8SF5bjjr4I2kAlHLk2HUnZ01mj0JvC9bvF4He%2FSBtsdV74BxcpHlt3cKzYvK0eecCS14VBIcn62qYPuhTuvLB5hTwnICqU0rk4pFm2HTI4VHU2KTAsq%2FgFkGdBug%2Fc8sPBjepM8ZRYAmr4mxuWDRJAhQcUbVM2ctKrFbVxbcUKdeaIBf%2BTTl9sazNOeXhVmEzqKdBO7XKPkNTBwzwFwXug6vg16AAv3bMUC4Oi5lUKCzYOxJUW1p6JwuTuAq%2BYW1s8v1UK4VR%2BfQA2bxdCnd%2F0wu32o%2F2T5iUsdXWYge6GbHhT5VMh2cOU778iXi1xkUVERKjWPu1SPpJvUDubcFhT2s39%2BCau4D%2FTei66MN1ZQ9h3wkrbKNXM7K%2BHbABKbJWGk9dQfOsMPY%2FG6yh%2B2f4zGVbnJ4WYiQ344PvzO9zdhEHrrae12riKtg%2BwxGGFGPlEf4WJKEVCpA5aAjkPUnpl9QyVfyopWk%2Fzh3e7vGDuka0GmrTh%2FNuVLTMvDlqA2%2Fvmo0EXL9Xc3zMb28jnETHRkL0oDShvDmB6SDd6DnMq8bCtOmtDDXlL7JBjqkAYCXBc6a21IesRjkFG2i%2FrB2akFiWt2W0KON2cTQVD2a2Duusq9J4qsYW5ZvL4s4esXJELk7n6a9I6oR9AsVes5Q1wzAitDfNQsEFf9GUdCBP4221ro4%2FJgYJtp%2ByywbVT0ySRjcO%2BwFEblMXUasRA4GOQ5Q2CwGpJ6AjZsLCm4mNUDRE9S6DtykEmmG%2Fp6h3KhNImnAJZNKOdMamIWP%2F1y%2FNt9Z&X-Amz-Signature=323c9467a250cef760e50cc0458658094470984d10f63303d0e89f19df6c1028&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W65FX7W4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQCx41JJe0WMl44wonPXJ%2Bch7SujUSHVL19GZK%2BgAM4pXwIhAJ%2FOAhn3H%2FwgmN3hkuGveo3YurSMm83%2BzeWP7S2hM1DKKv8DCCIQABoMNjM3NDIzMTgzODA1IgxtS9lYgB0QIaKUKk4q3ANg1spLffVCQSRhSTlpcG06ZLXrOPLNpR4Il8ncdntWoLuRlZPHW4UT2AgwUptzGhMvwhTxnyHI8SF5bjjr4I2kAlHLk2HUnZ01mj0JvC9bvF4He%2FSBtsdV74BxcpHlt3cKzYvK0eecCS14VBIcn62qYPuhTuvLB5hTwnICqU0rk4pFm2HTI4VHU2KTAsq%2FgFkGdBug%2Fc8sPBjepM8ZRYAmr4mxuWDRJAhQcUbVM2ctKrFbVxbcUKdeaIBf%2BTTl9sazNOeXhVmEzqKdBO7XKPkNTBwzwFwXug6vg16AAv3bMUC4Oi5lUKCzYOxJUW1p6JwuTuAq%2BYW1s8v1UK4VR%2BfQA2bxdCnd%2F0wu32o%2F2T5iUsdXWYge6GbHhT5VMh2cOU778iXi1xkUVERKjWPu1SPpJvUDubcFhT2s39%2BCau4D%2FTei66MN1ZQ9h3wkrbKNXM7K%2BHbABKbJWGk9dQfOsMPY%2FG6yh%2B2f4zGVbnJ4WYiQ344PvzO9zdhEHrrae12riKtg%2BwxGGFGPlEf4WJKEVCpA5aAjkPUnpl9QyVfyopWk%2Fzh3e7vGDuka0GmrTh%2FNuVLTMvDlqA2%2Fvmo0EXL9Xc3zMb28jnETHRkL0oDShvDmB6SDd6DnMq8bCtOmtDDXlL7JBjqkAYCXBc6a21IesRjkFG2i%2FrB2akFiWt2W0KON2cTQVD2a2Duusq9J4qsYW5ZvL4s4esXJELk7n6a9I6oR9AsVes5Q1wzAitDfNQsEFf9GUdCBP4221ro4%2FJgYJtp%2ByywbVT0ySRjcO%2BwFEblMXUasRA4GOQ5Q2CwGpJ6AjZsLCm4mNUDRE9S6DtykEmmG%2Fp6h3KhNImnAJZNKOdMamIWP%2F1y%2FNt9Z&X-Amz-Signature=323c9467a250cef760e50cc0458658094470984d10f63303d0e89f19df6c1028&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIFUOKQR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCICpDlmI%2BQfE%2FsjGYhLbjo6oCgH9o%2BvN03J02oiCoQQ8ZAiEAoBw%2F%2FlOPWj%2BAUbuttFjzBJyuIqcZ3V4UxaPOXCTGNtYq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDBeJ9G3n1jckIZXAaCrcA0SmsJbjCb8vgRaXEg1hQBIYxEZJi02vnQzwbw8TjiN4lz%2Fgo7KM1sSA%2B8t0G%2BJpsos7WPZxIZCsPFa0%2BISFqBo2dWMjSKkX76kqjhKWia1jW8BwB8fGAK9IB7x49DNPHefFHeEyXI9V1KqAHFpYTAFU1UMgpUXdKnqSXqXmANxAEYIxdchLJ1z3H2Uq2ICsFQ7oaPi%2Fj5Dtn4MWCgVXB84mbqxq51EipFXpsyNycTM%2FAu9wfF3q6r9%2FxM1Yp9rYds12BMgCOhTxqALwVMYgWMWlfwIyNAvZYATqX3Q%2FVf68nV7vs6U2cO%2BpPGuaNEDAI3chy2j05DvOAdedBDNHJUrkU5MpHQoeGbZwen5MlmTggVnVuHFZbpwcNIfdycGRatzHwjSGi%2BAU1Mzs4iZFxFprfwUc79q4epj%2FlpTQdRyR5Jz2WBtmmSuE%2Bczy%2FIVZ4fDU1uwW9uSSVTaZw9%2B92Dbj0cjTJbZ%2BdEe8hchbwcxmaJnqM%2FciggB82T4UXJeAtBOyFkWK9fSHNuXmhuUJfg%2BHBo%2BVNVrN4eB0Nzab9JZZ%2F9kScZc%2BjOJi0jOTZNqJhI3a6Nt%2Fn83ssgiqsQG5uAFDC8GSu2CYEgR9k8S0xVzGneXdz2iVDjw3mjfCMIWUvskGOqUBUzw7YsmOGC0WBZ%2BJARSTExbfbFQg9u6BNCHoEDTCxNt1lWdgcY31PdKQ4M3QYTV2alJsSx3x1KcmYwX%2Fbgbk%2FtsRIjXR1OiBKN0%2Fw9uCPt8XqhlY3CIqufzL9tXOPeu68EJ3PHJ82iVxNTkLjlSxY5tsxBsD%2FqvPiZZCPk8WKrmeU8mGuvE0wJCBx4jfaXKFobtUACc0zbTQ5DnvL5agw%2F%2FS3jAv&X-Amz-Signature=28c2dd62dc59fd458592fa3f6a37e80204abd5379899b2b8f0e469680e479104&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIFUOKQR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCICpDlmI%2BQfE%2FsjGYhLbjo6oCgH9o%2BvN03J02oiCoQQ8ZAiEAoBw%2F%2FlOPWj%2BAUbuttFjzBJyuIqcZ3V4UxaPOXCTGNtYq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDBeJ9G3n1jckIZXAaCrcA0SmsJbjCb8vgRaXEg1hQBIYxEZJi02vnQzwbw8TjiN4lz%2Fgo7KM1sSA%2B8t0G%2BJpsos7WPZxIZCsPFa0%2BISFqBo2dWMjSKkX76kqjhKWia1jW8BwB8fGAK9IB7x49DNPHefFHeEyXI9V1KqAHFpYTAFU1UMgpUXdKnqSXqXmANxAEYIxdchLJ1z3H2Uq2ICsFQ7oaPi%2Fj5Dtn4MWCgVXB84mbqxq51EipFXpsyNycTM%2FAu9wfF3q6r9%2FxM1Yp9rYds12BMgCOhTxqALwVMYgWMWlfwIyNAvZYATqX3Q%2FVf68nV7vs6U2cO%2BpPGuaNEDAI3chy2j05DvOAdedBDNHJUrkU5MpHQoeGbZwen5MlmTggVnVuHFZbpwcNIfdycGRatzHwjSGi%2BAU1Mzs4iZFxFprfwUc79q4epj%2FlpTQdRyR5Jz2WBtmmSuE%2Bczy%2FIVZ4fDU1uwW9uSSVTaZw9%2B92Dbj0cjTJbZ%2BdEe8hchbwcxmaJnqM%2FciggB82T4UXJeAtBOyFkWK9fSHNuXmhuUJfg%2BHBo%2BVNVrN4eB0Nzab9JZZ%2F9kScZc%2BjOJi0jOTZNqJhI3a6Nt%2Fn83ssgiqsQG5uAFDC8GSu2CYEgR9k8S0xVzGneXdz2iVDjw3mjfCMIWUvskGOqUBUzw7YsmOGC0WBZ%2BJARSTExbfbFQg9u6BNCHoEDTCxNt1lWdgcY31PdKQ4M3QYTV2alJsSx3x1KcmYwX%2Fbgbk%2FtsRIjXR1OiBKN0%2Fw9uCPt8XqhlY3CIqufzL9tXOPeu68EJ3PHJ82iVxNTkLjlSxY5tsxBsD%2FqvPiZZCPk8WKrmeU8mGuvE0wJCBx4jfaXKFobtUACc0zbTQ5DnvL5agw%2F%2FS3jAv&X-Amz-Signature=28c2dd62dc59fd458592fa3f6a37e80204abd5379899b2b8f0e469680e479104&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDTITDP5%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCUD3XZlwTYVCyJzoIadIUoFpEoC6qBFCuuOymIQ2rekAIgZd46Q9pKr7JboTfHATu6XaK9MZXPm8UzWyt9nfgsyH8q%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDIdajX1xpdA0tZEFCCrcAx8FKDcI%2BxNV4DTvATCd3tgfylQthG4Ia0pYIvbrHe4rMDPNts0Mq2ASGsXOOGmpM7zVae4sj%2B6JeUNkiQAxDmd67gJBchwkaTJc0yOTZGxqLttg9QMhah5SUJZN51R5Fwx8cXhQz%2BVOlcRpBp0b735oHtb6q4zys%2BO9eD6yzx%2FfcBmiA%2FThS%2Bw8Z2L1yQ4YFfQQRlc2WzGgy0LSFkTVClKgIQeyQdD9J5hMWDsuC9huIyKRQQP%2BrmncxZZv7aifUt9O0wIJRLTdF8Hd%2FHtRzAsi0GYdW%2B8bpCXlmH3DSeTl6pBlSDCCE5de7j6qSAYdT5%2BiTEUs1Eo%2BAZemMY%2FovJj0zGKv%2B2W8DDq6pnRrwrca8xMNwVmW2yt1OOViiPOoRFRXarMYmYa9ZOVUvslimw1rd%2FY0J338i%2FRkDl1EnVDqGwxyzler9X60luPnK5K716wntXomKpwAUBkrz8EkXQm8fDONTFzK7dGemEyy9UNK%2F%2BksQYDUHML7RokmC6OAN5gduXJcc8axIuyTVDYyiMU7TcJ%2BTM1%2Fb91rKZk1Jl8RakmkiCm9ukwCWH9T7LYEJh9pPLShxuc2kjMMmBQy%2B9QfXjTRXNv80hwWQ%2FsyLhVT9QAg7DDMYIqvjOe4MIKZvskGOqUB1tiNbz2HFCI5eN7SR0nzC2bzFVgD03HxPG2eebBNn0g%2Bvjf45D1Txaglrviu0HhRtERUAMq3YyIqCjGtTE%2BNR3E%2FtjtSurijQgIFWzY0IEUIQZNRh%2BkeD6%2FIksjCGRna1WV7rFoBI58PIRrQ7CuTNgntfs5luVGj9uFvj9nP8jyXDpt1Y%2FUZGmtUwfW1iFBOLW5ekJZcitjRc8Qt8Q4y6ANWtP89&X-Amz-Signature=12939e3514ac88426ef1307628f984cd6994440627913dc42cffe142fa372d36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HMR3GTK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQD34BE5ruHftTrXPTOr5Y4iF2uSVZylQDE0KbwRucttaQIgBRqzv0PyH12HAmV6hfFjrpUp7QVyyqoYaDbAXrLKEJcq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDAmzI7G6j0VUNMZ%2BECrcA1xOZV5Xy%2FGUHEiTZPlw%2BiKHB0ZgRZbDxKI0RzkxxLFUgIXezvUXkxdyXhke6Py%2BJlwFhyTJsltSElxvsl9B4thLLgSES84r8VTdnTF7DkcEwxPKN2pe0gwSd6iEPj%2FBR8G5PFwI8Ry4JKL7%2FYc0bLo5pLzgykF%2FibTW0MUBZ0Jg%2F4tBvEMn8%2Ftu395kWROyiVYiJ%2B1pt%2FQS%2FlvIqj3OfeqxGwjRGGzC7Ab9kFSZWXaIoGZhh%2FMOCNWG%2BMcyy17cmI9qAjo3LmblDwAlOhGu%2BBj9fqIKjlPKV4vSmXm%2B7xlc9i8FRrE6KVlxBofQYO%2B73ujx5soEpGV8V64qyll0tpcY1m%2FfWKihbQDxBxkSRWUuRQL8JcjjVgQzAcvy%2Fzt5UQoixUVNowSBwzFQKfpLic9J%2FrKD19rz3blJ1rMxEwOgzPZ7F46kuDDGgy5AhRJRgXnso0v0H6osLsPT%2FeYYh1pApWS4pnWftsDdFb4Tuv9gxtNXVmvXzIYmsev5J5pihjIBl6hLBISXknyLyBHtY1Ki8Uxfoh%2BTsHt6KM4oZQn23Yrl5hrOmR1qCT7SFmKIekSwMaNYVcLTq0wchfYDu%2B7M9NtajvE2jWlZrOYQ%2FBaCadzxLcNJUrhEbqj7MIabvskGOqUBds5hFQMVFffp6M9d1QilXizOwwZP41K8163Wx1xQhUKPgSoZjY9J4stS3iQLRvTqjOXizbhrQZeDDMBVoj5CKyk%2FNWbGlrQOmlxaKS9CReQrs5vD8x%2F7mqFlxhPEUGkDpQZj4WZXIB0UfTofyiVV5uS16Kdvl6j5xAxpJMdcgqpD1mqwW5NJCJHIUfRJk%2FEysdi%2B0wT6NbjSM0lH3Kz0XVEwQTIP&X-Amz-Signature=7ed0cdc12461dfd82ce1c054f67272ab9cedf79a6196dc9e0b73b30f15b2821e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HMR3GTK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T041745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQD34BE5ruHftTrXPTOr5Y4iF2uSVZylQDE0KbwRucttaQIgBRqzv0PyH12HAmV6hfFjrpUp7QVyyqoYaDbAXrLKEJcq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDAmzI7G6j0VUNMZ%2BECrcA1xOZV5Xy%2FGUHEiTZPlw%2BiKHB0ZgRZbDxKI0RzkxxLFUgIXezvUXkxdyXhke6Py%2BJlwFhyTJsltSElxvsl9B4thLLgSES84r8VTdnTF7DkcEwxPKN2pe0gwSd6iEPj%2FBR8G5PFwI8Ry4JKL7%2FYc0bLo5pLzgykF%2FibTW0MUBZ0Jg%2F4tBvEMn8%2Ftu395kWROyiVYiJ%2B1pt%2FQS%2FlvIqj3OfeqxGwjRGGzC7Ab9kFSZWXaIoGZhh%2FMOCNWG%2BMcyy17cmI9qAjo3LmblDwAlOhGu%2BBj9fqIKjlPKV4vSmXm%2B7xlc9i8FRrE6KVlxBofQYO%2B73ujx5soEpGV8V64qyll0tpcY1m%2FfWKihbQDxBxkSRWUuRQL8JcjjVgQzAcvy%2Fzt5UQoixUVNowSBwzFQKfpLic9J%2FrKD19rz3blJ1rMxEwOgzPZ7F46kuDDGgy5AhRJRgXnso0v0H6osLsPT%2FeYYh1pApWS4pnWftsDdFb4Tuv9gxtNXVmvXzIYmsev5J5pihjIBl6hLBISXknyLyBHtY1Ki8Uxfoh%2BTsHt6KM4oZQn23Yrl5hrOmR1qCT7SFmKIekSwMaNYVcLTq0wchfYDu%2B7M9NtajvE2jWlZrOYQ%2FBaCadzxLcNJUrhEbqj7MIabvskGOqUBds5hFQMVFffp6M9d1QilXizOwwZP41K8163Wx1xQhUKPgSoZjY9J4stS3iQLRvTqjOXizbhrQZeDDMBVoj5CKyk%2FNWbGlrQOmlxaKS9CReQrs5vD8x%2F7mqFlxhPEUGkDpQZj4WZXIB0UfTofyiVV5uS16Kdvl6j5xAxpJMdcgqpD1mqwW5NJCJHIUfRJk%2FEysdi%2B0wT6NbjSM0lH3Kz0XVEwQTIP&X-Amz-Signature=7ed0cdc12461dfd82ce1c054f67272ab9cedf79a6196dc9e0b73b30f15b2821e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

