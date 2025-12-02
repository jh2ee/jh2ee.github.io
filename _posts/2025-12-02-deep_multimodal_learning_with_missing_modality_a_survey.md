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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ4C4NNH%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDW%2FhGUM0y06SuFmFuUUYKW7c8l6fIwVTejbpcVJZZ%2FzQIhAIRSvfeRMNBd96vaxN7at4b4ONsDEP8ByF%2B%2B3P3HaHPqKv8DCBcQABoMNjM3NDIzMTgzODA1Igy1S4e%2FLSRkmg8fTj8q3APBVwJ4SgQ84p9HGnXgU%2BqVU1E4hvd9RyfxXTzcdiPp2e4qWgL5skSoFpxdZJu9Xe4Oe8C9CCySZexqBskn8B3CZVEUuafinbQyD27gOgw5vJhDkldEOH6bWK8aXQGb7tJV1Z%2Bvtjknd2Eh9N6heRVqsRjN1jlHZ9xNeMU7B7CJO5f1Xus%2BvYqNFsQAXBRR1QJNtODWksLDBEdEUZgHMo%2FfbXmsAqBZ%2FajkYnUITMUaKlsfe%2Bp%2FoeNQmDej%2BTd3T7eEPWHc86lADeIPMrDMQ%2BM%2Bcb90pFJMwNAQ1kSs%2BusYDYhQ4AUSS7Eg5ONLl1KBnmbASnTrdz9SdQJhWUYLWiBSye%2BubeftADAZekkWj14RJDrANJ0Ilr%2BpLk6qc1sKE6u4ZvXH4kFTQlVfdH7Ol6tKNSNn2YhxeZmi36sVBJ1633p241IHILxdWvovM%2FYt8IV86gvxKtRhRdjOHwswY1K%2FoJJhijU02u5s1fccvuHjsXFuN6b%2BW2HWoaWU6F0VaJ38k6l2bZQeyN7wbX3xBt3af26XqBsmIJ6KJcZPYmsDbh57QhUJNJ07yOkdeZojlMUQ2UmqFYjL0dh7YOMy7laDSE%2Fc7tXP5P0rxuw8ZrEXRmSNzPm8iGkxkK4m9zD66LvJBjqkAb4gply9gR3dc0g3ugy8wMD8dGlizk7B0ecs%2FKdNeOaOxjiXGeNCLwhuNJlqPZ6FL6GORn60Ij%2FqE9JcabABya0YtOc0ZgHUrgtAarPxTZwp%2FZQtCTL6eZLzdHUV9oOSRVkCYhD%2BDX%2BbFDbapQuOnmd9ZG%2FstTjWQ1VgdWGn6Rl%2B302d1X%2FGccxw98MV26LqciBcc6GZN9ANjmQgeU4MMxTeddid&X-Amz-Signature=12256ac97685beaed658ad12160d82544986283fa7cf4cb8f51901f2748f1f10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ4C4NNH%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDW%2FhGUM0y06SuFmFuUUYKW7c8l6fIwVTejbpcVJZZ%2FzQIhAIRSvfeRMNBd96vaxN7at4b4ONsDEP8ByF%2B%2B3P3HaHPqKv8DCBcQABoMNjM3NDIzMTgzODA1Igy1S4e%2FLSRkmg8fTj8q3APBVwJ4SgQ84p9HGnXgU%2BqVU1E4hvd9RyfxXTzcdiPp2e4qWgL5skSoFpxdZJu9Xe4Oe8C9CCySZexqBskn8B3CZVEUuafinbQyD27gOgw5vJhDkldEOH6bWK8aXQGb7tJV1Z%2Bvtjknd2Eh9N6heRVqsRjN1jlHZ9xNeMU7B7CJO5f1Xus%2BvYqNFsQAXBRR1QJNtODWksLDBEdEUZgHMo%2FfbXmsAqBZ%2FajkYnUITMUaKlsfe%2Bp%2FoeNQmDej%2BTd3T7eEPWHc86lADeIPMrDMQ%2BM%2Bcb90pFJMwNAQ1kSs%2BusYDYhQ4AUSS7Eg5ONLl1KBnmbASnTrdz9SdQJhWUYLWiBSye%2BubeftADAZekkWj14RJDrANJ0Ilr%2BpLk6qc1sKE6u4ZvXH4kFTQlVfdH7Ol6tKNSNn2YhxeZmi36sVBJ1633p241IHILxdWvovM%2FYt8IV86gvxKtRhRdjOHwswY1K%2FoJJhijU02u5s1fccvuHjsXFuN6b%2BW2HWoaWU6F0VaJ38k6l2bZQeyN7wbX3xBt3af26XqBsmIJ6KJcZPYmsDbh57QhUJNJ07yOkdeZojlMUQ2UmqFYjL0dh7YOMy7laDSE%2Fc7tXP5P0rxuw8ZrEXRmSNzPm8iGkxkK4m9zD66LvJBjqkAb4gply9gR3dc0g3ugy8wMD8dGlizk7B0ecs%2FKdNeOaOxjiXGeNCLwhuNJlqPZ6FL6GORn60Ij%2FqE9JcabABya0YtOc0ZgHUrgtAarPxTZwp%2FZQtCTL6eZLzdHUV9oOSRVkCYhD%2BDX%2BbFDbapQuOnmd9ZG%2FstTjWQ1VgdWGn6Rl%2B302d1X%2FGccxw98MV26LqciBcc6GZN9ANjmQgeU4MMxTeddid&X-Amz-Signature=12256ac97685beaed658ad12160d82544986283fa7cf4cb8f51901f2748f1f10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCZIXXY7%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCWj1gxOxpZS7fZC5uQ9ZWbgUxliXG7g47LW3qC%2BX4A0AIgE%2FVD8mRXZ%2FC1CI343gNN3KMngeuVTsQ3S8sKjtkjeYsq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDKap%2FZthL3SEIY6J9yrcAxWJr27tXOw4xD6enwtsGbVtb5%2BgqWVNHTt43tzjLNcDMEKIbxWC6s2VmK9hs1yYlw9qzcu8VgZhJ%2Fexllg%2Fu2MOrOeh8csLptrOEIx5Sqgd526MqFV8BHTVDCFIXaHYPcGvaSjT%2Bc10et1v3D8NYDZscPxivOhbZ5yYfwdmEslRBTpvUYvXSqTdcvaXNjsa2mfYY%2BmpeydMFUSaHL%2FhG8Bz4ha%2FMYAcB3usmiWqhUR77xorLQBuiohb8JGGf6paSEROaXagM9pSfFz0H94CtdmaI1XOzWke2e%2BKsQW1K3C%2FX%2FL4vrPl8hOQx3tXqMPTkeJ0l9f%2B1fR5UT7u3GBqmh21FqD40qb3wbpUJ2nQrO7yjNe4EwABi5vp20px1SQ2qEjcTelG5z%2FptoJB9o20MOnEQWyXYuRrEyOUD97HqRcBJ6eV%2FvgLsArdcghrrMrOji7wF9CfyFS%2F9EyDmezHVaQplIZUC12zYHvCxSai4VwEOdlkoNlDqK82qSD7lyLeweFATF5FKUJOBW85M6qJNQR9ktziLxEKygBPeHUTeTvEc2YsSx1%2FToininvNsGSVjiJOhI1qeEk9jW6ohQ6Kj6lFB6R9vmlA1b4hdMb0HO%2FWa%2BfsBD2RQtL8ZP7oMMLou8kGOqUBZxpGDrxzwd7MxFE%2FBDXSYDHRJ%2BzjcovpfCoSmN2LiDjSBvg2l7K4fj4de9Zn9kXaO4kUNP9HMKl99bC9ChNDkqi6WhOeYjzw%2FW6zxABVj9tuiKhzKNYn76%2F4htZKW8P2LFKlOw0MwFjmHndbf6%2FUphuj0K5iCJ00PuoDcgQ43t3XK%2FNetds6iyRMN0RQs%2BHZahOUSMPAVaj8GGTKfKK2fW%2F90%2FA7&X-Amz-Signature=43eaae57bc81dd382cffdd936e9a6f74232058b2a5b62f68859035c28a8a5168&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCZIXXY7%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCWj1gxOxpZS7fZC5uQ9ZWbgUxliXG7g47LW3qC%2BX4A0AIgE%2FVD8mRXZ%2FC1CI343gNN3KMngeuVTsQ3S8sKjtkjeYsq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDKap%2FZthL3SEIY6J9yrcAxWJr27tXOw4xD6enwtsGbVtb5%2BgqWVNHTt43tzjLNcDMEKIbxWC6s2VmK9hs1yYlw9qzcu8VgZhJ%2Fexllg%2Fu2MOrOeh8csLptrOEIx5Sqgd526MqFV8BHTVDCFIXaHYPcGvaSjT%2Bc10et1v3D8NYDZscPxivOhbZ5yYfwdmEslRBTpvUYvXSqTdcvaXNjsa2mfYY%2BmpeydMFUSaHL%2FhG8Bz4ha%2FMYAcB3usmiWqhUR77xorLQBuiohb8JGGf6paSEROaXagM9pSfFz0H94CtdmaI1XOzWke2e%2BKsQW1K3C%2FX%2FL4vrPl8hOQx3tXqMPTkeJ0l9f%2B1fR5UT7u3GBqmh21FqD40qb3wbpUJ2nQrO7yjNe4EwABi5vp20px1SQ2qEjcTelG5z%2FptoJB9o20MOnEQWyXYuRrEyOUD97HqRcBJ6eV%2FvgLsArdcghrrMrOji7wF9CfyFS%2F9EyDmezHVaQplIZUC12zYHvCxSai4VwEOdlkoNlDqK82qSD7lyLeweFATF5FKUJOBW85M6qJNQR9ktziLxEKygBPeHUTeTvEc2YsSx1%2FToininvNsGSVjiJOhI1qeEk9jW6ohQ6Kj6lFB6R9vmlA1b4hdMb0HO%2FWa%2BfsBD2RQtL8ZP7oMMLou8kGOqUBZxpGDrxzwd7MxFE%2FBDXSYDHRJ%2BzjcovpfCoSmN2LiDjSBvg2l7K4fj4de9Zn9kXaO4kUNP9HMKl99bC9ChNDkqi6WhOeYjzw%2FW6zxABVj9tuiKhzKNYn76%2F4htZKW8P2LFKlOw0MwFjmHndbf6%2FUphuj0K5iCJ00PuoDcgQ43t3XK%2FNetds6iyRMN0RQs%2BHZahOUSMPAVaj8GGTKfKK2fW%2F90%2FA7&X-Amz-Signature=43eaae57bc81dd382cffdd936e9a6f74232058b2a5b62f68859035c28a8a5168&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUS4HOPL%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIEcNOIg7SOuLfWQaU%2FpXVYe4tBffcyutholwl2QsBMf7AiEA7vq8Ikhk3NYjTlBgJ%2BsBoNQ%2BzQkvDBn8Jmt6BIGoChgq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDLPd%2BLbjDFwD6kIppCrcA7AllfZmWGo5uPCCDhtuxLDCvgiRxCJAS7Ip78qBgk9%2BjwKZLLQcxjdkMQXmCK7OFt%2Bdy%2BFDa7eCKwdL1%2BmpZjXLBxlBNiaMvi5%2BB9XuajW4iwscQ%2BAilCdSNZP7FZBFTcWYLEnV4bYl3M6Hd15TPQ8%2BV9GEsyTP%2FqFlctPiOzRsLa1m7BRlDrjav40WswNBwt4g6fgxUgpkRqHUdDuS3ksnF7GFxHnTkqMpqMhVYztMZhyyi7UbJjRTZaks%2FR8rMkhSXfbZN7xu%2BfEVFLA4xxqhF6CkDTEpxKNrath6PHTUU2DrclJE%2FYbgdFI72xXFljA9j%2BMTUF3aS3tlppMqJUlb9lpDcjG49yr5NItAXq2tqCyDgo6j3nu%2Fcir4UWHxh2WIW7ErUUuQX1mmK7c3Hl4fLO%2FS8DlgZsj2ecs6oVBA2v7NK5OZPq09O1FoU7bA%2BZcGpRB32DBxBlUU%2B0U%2FtIhgR5f9YowLY9okuz41m7ctIOBNY6NvpDUrRw%2F2HBLK9WGlmBO3RFBtb%2FtzxFczfZUjGxB3EQ0bFSnRZLzejflBUf2rxgBMQENOW3RL1fNzBBN1WPpj0hkoMCap0OiwsGZqdJBY2%2F6ywYiz1HPNcQFcKiG131H8NFy%2BpooIMIbou8kGOqUB%2FHsh%2FqfSraoR2W2snK2JnLMaguAyJSMdSKK%2BKxxr%2BzUx7bnSP7X5Pp4AV2tD%2BwDB4H8l6cvRyxzVZyFWdJ9T3ZPdrLy%2FwXJKXEQtjwk6UnZEfyT%2FiDfNhVgnds4eSgwPCUt2sNt9Yi195wIMeWAWC9%2BqCHfzL%2FsTXVjcODmJh69R%2Bq8OVHMWZvsNRwhSJ6GtT8UUon4A8zd0eeTFFv5d7wNo%2FOIu&X-Amz-Signature=8f3d43f51ecfb745a8b6f50db7c9ab7ec82bb7fdc56f5fa3e62085556f9c6849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPHIQXU6%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIEk5SJDb%2FwWafLTehET5vAgtXB1wyHpn35zrpeg1Z0ihAiEA8nM7AbbFHcO9%2BuMFGKcROrX3yjy5ZtkO4yNfqCJ%2BNG8q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDGKRdL55Bujza0yghSrcA9uW9J9mGwONH6J1Mnt7UlGlXEmCA%2BoTYNy1P4PAVWQn6Lptz8VAqMzGHPykXgbhQ%2FD9PdlAPfiL31FEkqKFC%2B7Uc54V2IlPxFYR1wBcavghwOD%2B5EdZ3kFZcUaqNlBMXY%2BBwpXEaF4j6CsLbniNYn5yZkinK7C8SRLjYWRVLxvxlBCXz54dOWhzLyCsikaeov7ad7lB%2BCaZpy1PZVwXCpoLdSWv%2FBqtjtPeaZXkbj6ruOOEQqBmG89%2F6PenntDhR%2F0clchna2sYduzGzSzuoqstgqmV5LA3GVkcsENBwsNn8iwjdS9w4CFeNB5o0BSFM%2FgzuQ35kn8%2FhIuDSrmA9dKcq8FiCnQ4eDifNR0trvxiKt1qPSY4KMXR5AnKIcxMy6hVIgGm%2FfT7V2kQ9bIIUFO73v46Qvr2ml9Qcxa%2Bor79xQY5%2F%2FbqPHnZb9rrzSi9XlYtPTh4t%2FgW%2F7jhS1cZ5xq8YobHQzgXlC3%2F86iHmrTUPMfWe%2F%2BsobF%2BasmgIH09PHVo16UuTuYCHn%2Bv0jRgUuBFcRwkDJy%2BllCJHSMCF%2Bfwqc%2F2I81KEHw1IpZIQAU8NywzTK2zTIBiUVNw19H79Ra3t7CXr59Du6JVhBm07VPet4KkXQ8uE6cxzLDtMLHnu8kGOqUBTjtavkfSllSgoO64iPRN2btZJjcWd0AAnBWDhJXQM%2Fymoxdyqwaz06KQx2lqZCu8KSI6RmCQJOGPOBJmzKXgCbz%2BkYMy72GJfH3eOaWisi9QTBgfZnUeeAG4LRggjFbv%2B9WX44XrecLRLd58SyBmYvcvEpap%2BL6zd2xFiA0plcf%2FzmT7wTxJZSDrSSA9PfC8tJCfyU3hCRQY1nqMRAZVpvR2tcQF&X-Amz-Signature=249a49958ce668df307b072a0c28bb7704a74d0193f99eac7e741cbf20b2922c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPHIQXU6%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T150116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIEk5SJDb%2FwWafLTehET5vAgtXB1wyHpn35zrpeg1Z0ihAiEA8nM7AbbFHcO9%2BuMFGKcROrX3yjy5ZtkO4yNfqCJ%2BNG8q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDGKRdL55Bujza0yghSrcA9uW9J9mGwONH6J1Mnt7UlGlXEmCA%2BoTYNy1P4PAVWQn6Lptz8VAqMzGHPykXgbhQ%2FD9PdlAPfiL31FEkqKFC%2B7Uc54V2IlPxFYR1wBcavghwOD%2B5EdZ3kFZcUaqNlBMXY%2BBwpXEaF4j6CsLbniNYn5yZkinK7C8SRLjYWRVLxvxlBCXz54dOWhzLyCsikaeov7ad7lB%2BCaZpy1PZVwXCpoLdSWv%2FBqtjtPeaZXkbj6ruOOEQqBmG89%2F6PenntDhR%2F0clchna2sYduzGzSzuoqstgqmV5LA3GVkcsENBwsNn8iwjdS9w4CFeNB5o0BSFM%2FgzuQ35kn8%2FhIuDSrmA9dKcq8FiCnQ4eDifNR0trvxiKt1qPSY4KMXR5AnKIcxMy6hVIgGm%2FfT7V2kQ9bIIUFO73v46Qvr2ml9Qcxa%2Bor79xQY5%2F%2FbqPHnZb9rrzSi9XlYtPTh4t%2FgW%2F7jhS1cZ5xq8YobHQzgXlC3%2F86iHmrTUPMfWe%2F%2BsobF%2BasmgIH09PHVo16UuTuYCHn%2Bv0jRgUuBFcRwkDJy%2BllCJHSMCF%2Bfwqc%2F2I81KEHw1IpZIQAU8NywzTK2zTIBiUVNw19H79Ra3t7CXr59Du6JVhBm07VPet4KkXQ8uE6cxzLDtMLHnu8kGOqUBTjtavkfSllSgoO64iPRN2btZJjcWd0AAnBWDhJXQM%2Fymoxdyqwaz06KQx2lqZCu8KSI6RmCQJOGPOBJmzKXgCbz%2BkYMy72GJfH3eOaWisi9QTBgfZnUeeAG4LRggjFbv%2B9WX44XrecLRLd58SyBmYvcvEpap%2BL6zd2xFiA0plcf%2FzmT7wTxJZSDrSSA9PfC8tJCfyU3hCRQY1nqMRAZVpvR2tcQF&X-Amz-Signature=249a49958ce668df307b072a0c28bb7704a74d0193f99eac7e741cbf20b2922c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

