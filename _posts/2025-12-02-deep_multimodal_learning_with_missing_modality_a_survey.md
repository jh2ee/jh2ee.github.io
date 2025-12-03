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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4K5BS2U%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDi3Zg%2BGt6n4hllhPNIe2cS1ATIjCMSYD%2FS6d3fnUVj4QIgZ55JCZIknA0M%2FpXKb%2BNcI59cgaEAv9KaF%2FqZO8j6iiIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMTvxIKLktafYQUQJCrcAyP%2FWvF0cmLrKOpCYA6ty598zQvtgs0F1JjLgytkT71eih%2B1vkdltvvmzSFTVXjL2YK0PoGp%2FcFCdY8yEiKnEBHCSHMXcEiPtpCo75CXTsoGlBMSmXN%2Fc1GfvozHunykt8Vgj59zXhgzyzVutPa7ZZv8VbG7eTZYAnVXa6Qd1aMVPPk2tlVqzwPtllp6AaFHrDNlKJS3M4IsZwyBwvKu2M4nX3Gxqd49uDNCKTi1L%2FUj9UvumzklEBUcv992WLEp%2BcDpg4TcHu9cjuUxZPCMETwyF1SR1mBTKgsbmXofH1tejHHbolThXmrTFfWfWl%2F9YnQIat3UA2NK5hglVtVzudcB4g1uF55yv208Gu1d3%2FBbsOm6qjeyvmRPbDhhYGmYrE%2Btlw4QwULNrHlwyPKfYy6zHnj2VzsN1ZWZgiGNwYIo2yoYOk%2BkSsV3NOeZ0AspEnSRBM%2Fmt0%2FOPkSo%2FV%2F27F1fpyoSlFvAwNHQcOpa36I1ivJB%2BN2XwWv7%2BiFHDJK67nJXlm5iB7EbtcJPCnP%2F2X%2FNyh2bggrxgZLP1vFS%2FdduzoFlmidPqrchcDg0DC8jMFphydUZMyzpqe2h1z23lVSQwXOVccuQULa3cEH%2BPAp21mME8NiUFbSZNHSWMNiAwMkGOqUB09%2BQGAZlZR%2BmkAvJinYMp8lEIiEifeJ9xkiUYyDSr8R3dhwvjFgv6dOF9hw614w%2F9AaApSxDwAmn7E0AsLmbAtUBnqLbk7WDj0wAElqYxt3ELi0hglTWrE4C%2BWlSQkIUsP5PnesKfvs3CjoP7txZIjvs7wn5z0mm4VM9L8wzyRFq8ML0A4gDi9lyTvH4x2doNhlXZMaOmh%2FA5azPTC8K5r9HdZ3U&X-Amz-Signature=866cf866f765b7082f2c0a0ca6c4c33f6806e92fcf2df3ecef3253e325fc2f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4K5BS2U%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDi3Zg%2BGt6n4hllhPNIe2cS1ATIjCMSYD%2FS6d3fnUVj4QIgZ55JCZIknA0M%2FpXKb%2BNcI59cgaEAv9KaF%2FqZO8j6iiIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMTvxIKLktafYQUQJCrcAyP%2FWvF0cmLrKOpCYA6ty598zQvtgs0F1JjLgytkT71eih%2B1vkdltvvmzSFTVXjL2YK0PoGp%2FcFCdY8yEiKnEBHCSHMXcEiPtpCo75CXTsoGlBMSmXN%2Fc1GfvozHunykt8Vgj59zXhgzyzVutPa7ZZv8VbG7eTZYAnVXa6Qd1aMVPPk2tlVqzwPtllp6AaFHrDNlKJS3M4IsZwyBwvKu2M4nX3Gxqd49uDNCKTi1L%2FUj9UvumzklEBUcv992WLEp%2BcDpg4TcHu9cjuUxZPCMETwyF1SR1mBTKgsbmXofH1tejHHbolThXmrTFfWfWl%2F9YnQIat3UA2NK5hglVtVzudcB4g1uF55yv208Gu1d3%2FBbsOm6qjeyvmRPbDhhYGmYrE%2Btlw4QwULNrHlwyPKfYy6zHnj2VzsN1ZWZgiGNwYIo2yoYOk%2BkSsV3NOeZ0AspEnSRBM%2Fmt0%2FOPkSo%2FV%2F27F1fpyoSlFvAwNHQcOpa36I1ivJB%2BN2XwWv7%2BiFHDJK67nJXlm5iB7EbtcJPCnP%2F2X%2FNyh2bggrxgZLP1vFS%2FdduzoFlmidPqrchcDg0DC8jMFphydUZMyzpqe2h1z23lVSQwXOVccuQULa3cEH%2BPAp21mME8NiUFbSZNHSWMNiAwMkGOqUB09%2BQGAZlZR%2BmkAvJinYMp8lEIiEifeJ9xkiUYyDSr8R3dhwvjFgv6dOF9hw614w%2F9AaApSxDwAmn7E0AsLmbAtUBnqLbk7WDj0wAElqYxt3ELi0hglTWrE4C%2BWlSQkIUsP5PnesKfvs3CjoP7txZIjvs7wn5z0mm4VM9L8wzyRFq8ML0A4gDi9lyTvH4x2doNhlXZMaOmh%2FA5azPTC8K5r9HdZ3U&X-Amz-Signature=866cf866f765b7082f2c0a0ca6c4c33f6806e92fcf2df3ecef3253e325fc2f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNJBX2BK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCICYni06tpsbGYeTiTjt61T%2BaLrXsVFztD47R477WBZheAiAwjt18yPw1onSXmbLEbHbRgDKACHFXDHpIB2GoOaMi5ir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMUuegbpcmaVXEhgN8KtwDNZpn%2Fv0CZd7nH%2BMNm6DK2UaY%2FCebcJkU2UNg8FoId%2BMj6LwxUPHxvcVlV2e1WfUNB0ulo%2Fweff9ojCFA5jAlPzbckexmEgfhZlnZ6%2BzhS7hStwKeo39SVvn0CX9ej3uHwjxmHQljFVqsidGaYrmFIcb3NvhNSxl4Pko461xRUT1d5UAee1jKNRF9uzR%2BMgAQlapqDDrLtedPPvTZiGsux5Tp%2Be1JbFPbDh0P2XMxnh5bh8RA0kr7Iwg12zdXyjYQTsp65ftsPTe6dE6nTyX3zr%2BtRMvsWfNwGhTjK8ZZ8jCKkeISK67Gq1rlzd05x1OiHanh7o9P77sc%2ByWqCa%2B0qiVqpI0dmlB10SuKG6%2BG5%2BhNgwBa6lxsWfzXQnCd8p5F98qX5s6hF%2BsxSfDRKonOF31OJLyQvUKCmHCAyuk1CfZQ12Y2kAV4V1NQAt2wzI5kQy3beWxlnH5Pfj93KgnXhQ%2FhsWEZrmX%2B6N%2BCvswHueYLymvvAgRg0apv8hwx%2BP321AeMsI6xE5EebL9emgbCR91yoyz640a%2Bovj2%2BfXA7bU0GJV%2F4qG%2FIqjHRHhm3quVv%2BCfoFrSLqu3DanRf6PzOsoDpM3diHakkkt8YpRdtdsfgsjr8Xvu9PhrTwgw8IDAyQY6pgHWvDVAM9otNqCjSXszqoI4ZurskX%2Bj7JWEcJpRBXl1lT3c0rXT8lqvxDpuH9t8mvcZvoUI28K9kkMO%2Bqw2O%2FwiO9d0fAtLB2f%2F%2FoVQ75H0WYU6Vfovbzo6ybF7gFHwlmqR1Y%2BWsnydnf%2FF%2FHyFSjlmp00aR%2FYOK7lJk6ioqavm3XsFatgaSLvBEVC%2FoJGfM0PxphhZHxTa4cf9wVPtEaw3Mq9l%2FSNN&X-Amz-Signature=9520e4c32cf2508865624b0c80f7e77de4005a577cadd67769b233e0a2dfbb9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNJBX2BK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCICYni06tpsbGYeTiTjt61T%2BaLrXsVFztD47R477WBZheAiAwjt18yPw1onSXmbLEbHbRgDKACHFXDHpIB2GoOaMi5ir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMUuegbpcmaVXEhgN8KtwDNZpn%2Fv0CZd7nH%2BMNm6DK2UaY%2FCebcJkU2UNg8FoId%2BMj6LwxUPHxvcVlV2e1WfUNB0ulo%2Fweff9ojCFA5jAlPzbckexmEgfhZlnZ6%2BzhS7hStwKeo39SVvn0CX9ej3uHwjxmHQljFVqsidGaYrmFIcb3NvhNSxl4Pko461xRUT1d5UAee1jKNRF9uzR%2BMgAQlapqDDrLtedPPvTZiGsux5Tp%2Be1JbFPbDh0P2XMxnh5bh8RA0kr7Iwg12zdXyjYQTsp65ftsPTe6dE6nTyX3zr%2BtRMvsWfNwGhTjK8ZZ8jCKkeISK67Gq1rlzd05x1OiHanh7o9P77sc%2ByWqCa%2B0qiVqpI0dmlB10SuKG6%2BG5%2BhNgwBa6lxsWfzXQnCd8p5F98qX5s6hF%2BsxSfDRKonOF31OJLyQvUKCmHCAyuk1CfZQ12Y2kAV4V1NQAt2wzI5kQy3beWxlnH5Pfj93KgnXhQ%2FhsWEZrmX%2B6N%2BCvswHueYLymvvAgRg0apv8hwx%2BP321AeMsI6xE5EebL9emgbCR91yoyz640a%2Bovj2%2BfXA7bU0GJV%2F4qG%2FIqjHRHhm3quVv%2BCfoFrSLqu3DanRf6PzOsoDpM3diHakkkt8YpRdtdsfgsjr8Xvu9PhrTwgw8IDAyQY6pgHWvDVAM9otNqCjSXszqoI4ZurskX%2Bj7JWEcJpRBXl1lT3c0rXT8lqvxDpuH9t8mvcZvoUI28K9kkMO%2Bqw2O%2FwiO9d0fAtLB2f%2F%2FoVQ75H0WYU6Vfovbzo6ybF7gFHwlmqR1Y%2BWsnydnf%2FF%2FHyFSjlmp00aR%2FYOK7lJk6ioqavm3XsFatgaSLvBEVC%2FoJGfM0PxphhZHxTa4cf9wVPtEaw3Mq9l%2FSNN&X-Amz-Signature=9520e4c32cf2508865624b0c80f7e77de4005a577cadd67769b233e0a2dfbb9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K5ARLFQ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIHG4lKi4TZdMltJGuUKqm1%2FGz6F1wMlb7W7EJwtwHUwnAiEAxb%2BkZyCvDEly%2Bj4w3XLoLk6bbWHZ%2FIUJe5UluC%2Fuobwq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMmX2euq5lKvnFMMIyrcA8ym3bIiG6S%2BoX7X2aiWfWHNAHqJ1BYy5eHJLTcwLzLc200oIRCE9pPvNaK23Nn235vyFbu5rCR1qQz4hL0048hSsIu8pZVEjo%2FtlmCauhXY7RJnGCK%2Bdg5m6k0brXXTa4WPgUdj3TSwohdKq4zT9EQ1QxUJ9B6y%2BcI1T8dq2l1Iaylx5ZusDYIVQ2mR3dNDmIqofnsFpefgGkE69R3qSykGov%2FhzJ0R%2FX3exJwLO%2FUi44c%2FiZAEfw8g6K7h%2BYMtpchiMn663G4ooxuKPFvFL%2FnwFW4%2BqICMGfWrc75d7eKH4kxX7Li29EIZY2ohJzshBJWnb03mJQf4zI71nOrNH7tO7G7AU62dRZPYThoub4ZTgqZTE3iGo4fAjxi1%2FkcI6dJPiKwtNW16pxMuCsNdxgk8mfsoDZkgz6NPBEIoWb6LC7cZCrkuEeJyLD60bNCywl4HMLAcOOROhmKtP79QuHZsYq%2F4NHtlBYiBoba6AJthzjjoFBLMJpKUyYjV4%2BsfgRYszddjPkSnG7JQAeZIP%2FmB71gJH06d1wpDOjGUfCHiukeziEAi%2FaJIhpKdNgKaqLpAb0%2Fbp4MJOEZhnJ0je8hMxXw8m5ikAJNwjxyUhdIjOXrxN8ajB8TheBZ8MISCwMkGOqUBNC54Sh8%2FLx1pDOPOPijKRTRMFifB7ZEp3WRFoAj6HaTPNPoCUSSTrNtwkwgG5CA7JnlpG4cZ67sMbygoFwzZVIRmn3Ri8tAerRKIHZxcMkbYp4ZiQWZ0knUX7iPoe3laArvGzQd4ekc%2FJ2jwN0YIgsii7D%2BsrK%2B7oMPuoMy1c33KQcInTQOJREMM10zgzlFIVfHjIfswa4Uc2MvbbANIj2qttsXK&X-Amz-Signature=b6b1348f098f2617f8b281234abaeb99f554acd9c58e0c233617899780593741&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646PBQ7FV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIAiaqfvVEy%2F8WWFOkaI1ODdMoRipYGKfoWopmCr%2FBhtyAiAU9vzH3ncq0RpWvN5QlATw8h1zor0AUYXbPMyBchas8Sr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMqUTE5U8HAKn0eMs7KtwDDoYLx5GGa1Yi1pSFd4Q5LbiS6V6BWSWpN2wePxAmYvovLWZjisSs%2FQ7Gp6rwmVR36xKZ5sPIL%2BqwEjWT%2FEd6hanfRQiZtWEwGMUhQDzW3DL9YpIWoyaivFxhrny1mMoMUQCVFQtEG5RdkUhWG%2FET4IWfPx0gKJ%2Bt9NP6NnDgJnsZSjNGElZd5sw5cWuxw7USCta6hnUU0axoqWNPDap8%2B9qTKmJQpyI%2BxUcigJlYwG3rsCsmH76V4%2Fn4Raqnlv4G9x65E2aSGFGJvjky61Z%2BWijWoAmGaHwKMfzHKI3NIBxD9XMkJ0zQShjqjvDtP4rlXjL%2F2ZNCcmM6xMYxsgrArx%2FMx6OdUovgnrd%2FL0lPDJcPLwu94AylobtXwMVkeiTGn5KaONieX3VFZQLIJkOuQWFtj1NSI6GD2b8ZX6cD9bURYXcukT3q53IdvB5SWhW4R9Tliwr6%2Bm3dXKeFiF23iGrp0dvimxRueqSmmo0DyNZnjc%2FAmZXo0kMKaiLyOYoM5QJU7Ed9CnxDCTYMY1Kw57TgCIY8IypsZ0gBwt6wtoadCJtw6L7mHbIXd3mNpciftn9c1Rev00j504KWVAyhYbldhlZiGYpj4cnl0ut0Fez94h0%2BWifSMdhh%2BcEw%2BoDAyQY6pgFEt9lB6CCSM4RYWftZDb%2FyVNxlM5nh0x0gVScyBL%2BuxcNuCbpgoCxkFt2LJ8rPAiL6iBOtHuqTZH6QugsjN2LujPBJE9e6LIyGm6B5HdOj7CoIxCZd1AHmNvn3K2YaWUaKQ%2FnptC4I8AFs3f3rbvS0AxXZXC9gpQbzGwNQqTr%2BwyQ%2BdnH3O90sIKG%2BKjQFaV8E6ZkQk5wnvgpf9tH8MKZzbiFaDNNv&X-Amz-Signature=dd12e52f6b1d9e15684704495ec660a491b8dcfdbc2f3682e3c75400719e2254&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646PBQ7FV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T100120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIAiaqfvVEy%2F8WWFOkaI1ODdMoRipYGKfoWopmCr%2FBhtyAiAU9vzH3ncq0RpWvN5QlATw8h1zor0AUYXbPMyBchas8Sr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMqUTE5U8HAKn0eMs7KtwDDoYLx5GGa1Yi1pSFd4Q5LbiS6V6BWSWpN2wePxAmYvovLWZjisSs%2FQ7Gp6rwmVR36xKZ5sPIL%2BqwEjWT%2FEd6hanfRQiZtWEwGMUhQDzW3DL9YpIWoyaivFxhrny1mMoMUQCVFQtEG5RdkUhWG%2FET4IWfPx0gKJ%2Bt9NP6NnDgJnsZSjNGElZd5sw5cWuxw7USCta6hnUU0axoqWNPDap8%2B9qTKmJQpyI%2BxUcigJlYwG3rsCsmH76V4%2Fn4Raqnlv4G9x65E2aSGFGJvjky61Z%2BWijWoAmGaHwKMfzHKI3NIBxD9XMkJ0zQShjqjvDtP4rlXjL%2F2ZNCcmM6xMYxsgrArx%2FMx6OdUovgnrd%2FL0lPDJcPLwu94AylobtXwMVkeiTGn5KaONieX3VFZQLIJkOuQWFtj1NSI6GD2b8ZX6cD9bURYXcukT3q53IdvB5SWhW4R9Tliwr6%2Bm3dXKeFiF23iGrp0dvimxRueqSmmo0DyNZnjc%2FAmZXo0kMKaiLyOYoM5QJU7Ed9CnxDCTYMY1Kw57TgCIY8IypsZ0gBwt6wtoadCJtw6L7mHbIXd3mNpciftn9c1Rev00j504KWVAyhYbldhlZiGYpj4cnl0ut0Fez94h0%2BWifSMdhh%2BcEw%2BoDAyQY6pgFEt9lB6CCSM4RYWftZDb%2FyVNxlM5nh0x0gVScyBL%2BuxcNuCbpgoCxkFt2LJ8rPAiL6iBOtHuqTZH6QugsjN2LujPBJE9e6LIyGm6B5HdOj7CoIxCZd1AHmNvn3K2YaWUaKQ%2FnptC4I8AFs3f3rbvS0AxXZXC9gpQbzGwNQqTr%2BwyQ%2BdnH3O90sIKG%2BKjQFaV8E6ZkQk5wnvgpf9tH8MKZzbiFaDNNv&X-Amz-Signature=dd12e52f6b1d9e15684704495ec660a491b8dcfdbc2f3682e3c75400719e2254&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

