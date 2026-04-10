---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YC6D45E5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIDDghB%2F4o1dH2xXsChoe1%2FgSy0XtDJyh3FSyCUl2mOBZAiAahq1VDKbOgT4b1OjiV%2BnIsyRbHjWdyq6OU94JhrEpSCr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMxjsDd0bxatwl%2B4HLKtwD2AUiINhY0H6psl10VrGG19VSjkeOJ7CAK6m8uWUrDbDfFphZcG710MnYXRLMI4oyHqw7ZpSDJNF5RJ9IxgTorgnIJboWyLOjZiJkisQfmeWUOidF0ZIa1A5iJO26t6Rmn%2FG8rrw69H5dW8lwaZ4WQeoifuI2E9JmOIP88DTK4y0BQ2B0EOg2AGI6mK7nvG%2FAYHpCwL1xBt8PUKcmbW88YbJqTGyjAmKr%2BxYBItbctW6ZHKsDqljaDdtisXndLjA2ZrHRRgEFBpQx91piNZ6fqLT5ulsGOXK6sHqGwLVDZ8tzdmv0Z80BYy7A%2FBjiOYVJZAt8GTHuliSONrQusyyBg0jDGpgjmAGokGX8iq37tMCuKtZXtTnKz9ww8MRKtQdbalnOJgDRrSmRjrwMyu%2BK1r0jxI9kDtkfgo0obSqcuIA%2BcxbfTa%2BQte5xUE1rkE%2BMqOWizVQ3ajQX8Stga2Tj6GBpEKrO2K6oL6jzsfTryxjWQwB8I2OF94a39qmc6hr%2BHfA0Jsp%2FjpBeTX2S2BSAmsbzrSMEk9SJKDtp1m4bmFHRWEl3eW%2FuYaY7Y1i7IY5YxqPtqngMY7K0ytq4K2O3aoNGo%2FnOrUytX1TcpcbdtQQ%2Fjo6fZS0%2Fjxl44DIwhsTkzgY6pgEYzW1iViq1pZ7yv1MVxGLRH7e%2FLA91tJcYbwMLqZyuXS%2FsrdZexJzaqnTzAtuwqyhPw5DQ3vXjSq6RXPuRDBucUhiCrCxQjjzUGN5VT3by8ZSKfgPDhOyOSqSiGFLUYHau2ADxj3IIgKtxmdn0dEgJvFVk4Zjacy1XJUru%2BPDbZE2K8I9GNGOb9R5jrl7OGS8ZOHoxp4yNUuJ2bRZliQAAT9x7hRNC&X-Amz-Signature=ee0c4ca66885d62a43d1cebfbb299da67cd5410da62f6f557743561aa578e612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YC6D45E5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIDDghB%2F4o1dH2xXsChoe1%2FgSy0XtDJyh3FSyCUl2mOBZAiAahq1VDKbOgT4b1OjiV%2BnIsyRbHjWdyq6OU94JhrEpSCr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMxjsDd0bxatwl%2B4HLKtwD2AUiINhY0H6psl10VrGG19VSjkeOJ7CAK6m8uWUrDbDfFphZcG710MnYXRLMI4oyHqw7ZpSDJNF5RJ9IxgTorgnIJboWyLOjZiJkisQfmeWUOidF0ZIa1A5iJO26t6Rmn%2FG8rrw69H5dW8lwaZ4WQeoifuI2E9JmOIP88DTK4y0BQ2B0EOg2AGI6mK7nvG%2FAYHpCwL1xBt8PUKcmbW88YbJqTGyjAmKr%2BxYBItbctW6ZHKsDqljaDdtisXndLjA2ZrHRRgEFBpQx91piNZ6fqLT5ulsGOXK6sHqGwLVDZ8tzdmv0Z80BYy7A%2FBjiOYVJZAt8GTHuliSONrQusyyBg0jDGpgjmAGokGX8iq37tMCuKtZXtTnKz9ww8MRKtQdbalnOJgDRrSmRjrwMyu%2BK1r0jxI9kDtkfgo0obSqcuIA%2BcxbfTa%2BQte5xUE1rkE%2BMqOWizVQ3ajQX8Stga2Tj6GBpEKrO2K6oL6jzsfTryxjWQwB8I2OF94a39qmc6hr%2BHfA0Jsp%2FjpBeTX2S2BSAmsbzrSMEk9SJKDtp1m4bmFHRWEl3eW%2FuYaY7Y1i7IY5YxqPtqngMY7K0ytq4K2O3aoNGo%2FnOrUytX1TcpcbdtQQ%2Fjo6fZS0%2Fjxl44DIwhsTkzgY6pgEYzW1iViq1pZ7yv1MVxGLRH7e%2FLA91tJcYbwMLqZyuXS%2FsrdZexJzaqnTzAtuwqyhPw5DQ3vXjSq6RXPuRDBucUhiCrCxQjjzUGN5VT3by8ZSKfgPDhOyOSqSiGFLUYHau2ADxj3IIgKtxmdn0dEgJvFVk4Zjacy1XJUru%2BPDbZE2K8I9GNGOb9R5jrl7OGS8ZOHoxp4yNUuJ2bRZliQAAT9x7hRNC&X-Amz-Signature=ee0c4ca66885d62a43d1cebfbb299da67cd5410da62f6f557743561aa578e612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTUBFUZP%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDILv1kPcCgm3YXR48iJiLEjUiq60ywYzLh841sALOmCwIhAIB61Ogvpb1mgf1HXOhI068S0jtoTZzW4kWlNeg9p2FMKv8DCDEQABoMNjM3NDIzMTgzODA1IgyjrLre8BNA6mVeLigq3AOP%2BrJzoq5hz8CiXxo2GH0ZrnhacC93sr5k1z92YZ2aWmu0QIPp2rWI5yqzEVjlsFUMI4QtoWaNsipMWBEK%2B5l0Z5PzWsqyxMpYfd0WuZ0uLnF3XzCoO13xDKCR%2FSTgEVasl%2FoDLhvXYmU%2FqRNiASsyYu3B7dd3JLRhG9ylFcTs3If%2BaChOgqwE%2FStHg%2BfrO4H2tJnieKLfpp%2Bn7O8XSZAJWQgSPfKqe2QNIneGDI975NMaiQw8s5FRY9qzIyuIC07lYnlwMvSNy7nywk96XQmOpTM9TjwvTnC9KQmAqp4xny4Iz9gq4OwWvCmYLc8xpghvwZpe%2BFuUxyfKlzCi9zQJEbiIZS3dRFxm28XRFqnTIqraWFBr5CxtoUReXGYNM8HH3%2BjjNNF%2Fu7oPpa4fXh1EQ7yxeH4R1JPigZ2%2FKEdmfN9irgPQstlqRwshBXAKCq3gY%2FNv%2BrP4hmY3QMn1ni%2F4M0v5ASM8wFanmuWLEuUwMvMpb65Qb2AteaymBwuojye3YPJAwOL3vqccwnvT3N6FxDhaa7p3mNvNDss10Yc3VtSPMz%2FeMj4HfBOqb34oKXKkjR9nF9%2FUt0H%2B99oalj5MKkZT5fz4oxlSlgQViicYHsrywzFXq8uIp%2FQ8TjDuxOTOBjqkAalkd3WFSuwJMl8TpGYj0xrIruK%2FFGIkYX8LLUOuljQtzdbdF%2B1kRvUbAUZnLZiWlzliYTJzEUJR0LX4gFqKDoQb7WRA0FYA3FyM6OpGZcBV1z6XM%2BezbCzlKUgPR57mkJnTwMR41nD0VCohfGbvKTOMQXBuFPTohTaKl9pbenY99v5lTlHTrryBPrjCoPlHe0Rhl0%2BRWKrmlG%2Fv5XvVBm0LJCRo&X-Amz-Signature=f8141b81fe5f057e73a16079e108f1b913afe6e28236999bebe70be78509fcd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2H43WLJ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIEvLX4%2FhJ%2FIQCv1hGtYTPWqGqt09HIkawzh5dWY%2BWRFGAiB9JC9HytGHXV6N27N%2F4qZhXxlEzfA1yTE5bAdjzK8p5yr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMUvr4KrCIBkJ2wd2VKtwDbo2lC4HxGNWd24Vv13xOiPGU1ZRF9pTS2GGjjeJP1EcTyNpUZuGD1hxye%2FoX%2FmUSzHuHaJgvzEJ43nhj%2F6%2FhssY%2FQXAoMqlCIqA%2FVbO%2BUneMQzIWbUqkOOxXNDEIU7Woywpf6fxHwrWtEpVsI3%2FlUGmzXqsWeBsuid2IYu5E%2FyFgYXudqCOKPeP8AXofwmrqL%2BmN4znJYG9Hf1QjKMyj031U8JmJe55e%2Bypl0Nq%2F2rBcoRx4YccDpl3QeBpuZ5gJkP5RnrwR4JnVu2DsCH%2FFQszcL12YVubX40ptrF6iluKTRXJursbCETJ2uEWCiOBYfjP59OK39TWUSmSz1tT4xegBSYUl1q47ojYrKwJkKwlrRm2yOWHV2ZmiF84UdiJTFmqR%2F%2Bmh0psdCUZoPik%2BTGsNSY3tsbTvRNGXrp1Dzw5c%2FJB%2FG1T%2Bw%2BK0dSmeIhYJHVhiF46N4UNan%2BLnIfIUgCS3IvevJqxJzN%2FMG07UfPHzgTYYKVlubiPLoODa6JWVsyr8XvEvb62pFGTf%2B70ebvnuYWO8LZu11HM0XPGkYRIHwtBPBRu4SdO%2FNBuVo8jTIA6OPDA6bB%2FPbNpJoaBhF%2B11mtknF1%2ByPKzo7s0SKLC%2FnMIkHJAKKu3DXlowisbkzgY6pgGAYf7WrQ2K%2FQn4vXfvNCcHi%2BJ6vJSFZPwpynj6AkcvGtqN9k2Nh1tcRxqvvPQXxuIdb9c5NBOcVjar%2B9Sf0OZsLnlhUf61EXg80Tzyc5XywCzxFS3vUViTWS7dTvEZQvXQ6ul52xjdrWMQQQyXaw9MXYbv1yl33%2BETeV%2FG9e6w4Pdf9TuQvHKNP7h6QYex1QxItrJlL%2B8XPXxs66fLwBuFWhqxMEMZ&X-Amz-Signature=909d5827f4e489eb1cd763453cbe5318df25c366989f95d374f6604f5f0236da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2H43WLJ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIEvLX4%2FhJ%2FIQCv1hGtYTPWqGqt09HIkawzh5dWY%2BWRFGAiB9JC9HytGHXV6N27N%2F4qZhXxlEzfA1yTE5bAdjzK8p5yr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMUvr4KrCIBkJ2wd2VKtwDbo2lC4HxGNWd24Vv13xOiPGU1ZRF9pTS2GGjjeJP1EcTyNpUZuGD1hxye%2FoX%2FmUSzHuHaJgvzEJ43nhj%2F6%2FhssY%2FQXAoMqlCIqA%2FVbO%2BUneMQzIWbUqkOOxXNDEIU7Woywpf6fxHwrWtEpVsI3%2FlUGmzXqsWeBsuid2IYu5E%2FyFgYXudqCOKPeP8AXofwmrqL%2BmN4znJYG9Hf1QjKMyj031U8JmJe55e%2Bypl0Nq%2F2rBcoRx4YccDpl3QeBpuZ5gJkP5RnrwR4JnVu2DsCH%2FFQszcL12YVubX40ptrF6iluKTRXJursbCETJ2uEWCiOBYfjP59OK39TWUSmSz1tT4xegBSYUl1q47ojYrKwJkKwlrRm2yOWHV2ZmiF84UdiJTFmqR%2F%2Bmh0psdCUZoPik%2BTGsNSY3tsbTvRNGXrp1Dzw5c%2FJB%2FG1T%2Bw%2BK0dSmeIhYJHVhiF46N4UNan%2BLnIfIUgCS3IvevJqxJzN%2FMG07UfPHzgTYYKVlubiPLoODa6JWVsyr8XvEvb62pFGTf%2B70ebvnuYWO8LZu11HM0XPGkYRIHwtBPBRu4SdO%2FNBuVo8jTIA6OPDA6bB%2FPbNpJoaBhF%2B11mtknF1%2ByPKzo7s0SKLC%2FnMIkHJAKKu3DXlowisbkzgY6pgGAYf7WrQ2K%2FQn4vXfvNCcHi%2BJ6vJSFZPwpynj6AkcvGtqN9k2Nh1tcRxqvvPQXxuIdb9c5NBOcVjar%2B9Sf0OZsLnlhUf61EXg80Tzyc5XywCzxFS3vUViTWS7dTvEZQvXQ6ul52xjdrWMQQQyXaw9MXYbv1yl33%2BETeV%2FG9e6w4Pdf9TuQvHKNP7h6QYex1QxItrJlL%2B8XPXxs66fLwBuFWhqxMEMZ&X-Amz-Signature=115355f5d90b42c261c7a71552628a4054eebdd2139b3136762837cb0017929c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665J3SIJST%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQD%2BtEaUExw1%2FZ6Swm6jo55TR6Zl54GupurELivrXVBGWAIhALhI2IAKz77hphXteTXLwKc3DTaScAOTBflQF3ulZa6%2FKv8DCDEQABoMNjM3NDIzMTgzODA1Igy26skcfdgFbyQsykMq3APlSemgsNjhXLiTyxMu0udxpLRKFwsbN2yBPRCoMcRHFp%2FZQFvJi7n4p4KNpZnn%2BaPJQnzxjVy2uMEVBzrVaFu9jJWUM2cL1bjzUcC8ekOkKvIab6cdDZX7tGZu%2Fv93fztJBtN34vTH%2FaWFMtOh2ZwvIx9jDhmlAoccb%2BZrLVblwTC93bd5h4fdQSSREE%2FOxTGrg%2Bd%2BpZj6i3CBa5X1Z7MiV6dzt1AFxo6DhVn9QJzPWMhnvcqlXTPQs5jYs%2FZja66CHaz4RUfasgF3o35OzxTmaP%2BCicUDs4OCbYi9pR5TWAtKeorGlU0ZdKirYw7vWC2aYFtonke4rTnbYwgJd468sNxGcTDUy3jFA6CJ%2BUSi7n7PRvP3QaWR5u2Dov%2BoB1p59leuN2JdtvFPX8g%2BvCnnZKCNIT2FJanNbRatLQrQEciYxi%2FWcSVPenx6m03gdaboUIH50DBICtGBXsOJfyPVunYuUU5RzCC5AZo5hyDSVTRjmH5Tkk8I%2FP1JA1UUicGGwlZTYvxwE7vLNhuGkeGyQc0HW1BPYG3xo6s0JrKmjYRG95PhWlBtcJ0ixkkprPleoSaBDYMEf4iw8EpzjVEjWN4239QriN5vcUIebsDFGJxNrK5zL3XSsp2R3TCmxOTOBjqkATwXgzjK9GhYorB4VLTjchvOaFc7jz8r9Q7quCjJMpWbI76t8Mhio7Qf5eEY%2BHVPYJ9IciKGKzNFVYqMZQBQYTv%2FVM7z8Zrz904kTPei2P3QPhNRqL4%2FX2Jcvu09znmZX7ROW9iZA0TuPiAzgjVbauvQZlHFrT6U14whsKpjTyvbw1eLRnZ6knN%2B%2Fxu9DwmEhJWyDenUDSbMBmVT%2BiX9QGLYvBCB&X-Amz-Signature=d018618028ca1cb859437d0316208f06d0ca9ae79deb70edb35e8ccf6e6d3ca9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZVLEWXK%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQCS7Gk%2B2L6oXUDBNT2MKOfgkRKXQC4DuZvTop8KdfKzHAIgPVlC0AoVBz%2FXbD4itGq%2FTYsPu9nL3RaYWNa2kbg1dZkq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDFgwjRWzCdFg5TEoyCrcAx71jDBpduFks90HqvBG7gdLXFolj%2FWMJlsyX6ZuhPRbmLqwRUeIDxgMJmyaBiWm%2Bs376MeHd2mt0YVmmVH2W3%2BoVWNhM3ArEeRV9R6%2FlK2wKj6MJUm%2Feb2oSFWaYZ9WwDirLauL%2Bhdt%2BSWJ8%2FGK5A11Hn5Y0wMx2yYTngeUX2yztLkEh2FVfGTZVZHZmS7hfCpz5GOH4WXmtSUEq%2BE6NFikN4JCqwtkWuo6oXQj56j%2FC09efKU%2BGJ%2BWSOFK3qS91BbZ0zeGuWft%2FGuraxG9eoI8XNVSsnwX4YpI0za9vxFtoYz6XFB4hDdyNuk4taqEysQaQuWBFps2iYICaLKu%2BTpE9pNF0r0X2fxi1e32OAIxHnkYs8Nnm5KAoLBUWAvUCeRzQFRzHvnp4voLDw7aN2pfWoK8U9GZNt4sJTC8lq5kRI3Ejx%2FZXhSACkjZyqPLYE3EV4z4xqvnUR3OIhmCkp8d2Q1ZpQlLZ37HglvxQv3o1Nw8ZIkC1fRWJapDVh0qz3Z4i1528aa5P8xEoGkv5AA5MCYOcCN27jxzpDri%2BmACPGlCkuJtE6%2B%2Fg2Nci2GuG%2FPx8332znXAU37i6iGEOPJWX8XfDZJoQ0ubNncBWO2bSxjg9aEXxr1dYgP2MPHF5M4GOqUBxqcdhggFBu99%2B%2FhvQL5ICMmx8SCWedXcpKPivA%2BmNKwsFK2yPiikZ5uILr7F1QKVJRMcGj7FqXs8isuFvzz9aBshPly04QkMsVqYMt227h%2Ba1pYZQAKudc6ogWmT8mo3cO%2BhvQriSl8IUknELzIJLXA8XTAAFertmJ48o6JLFNSM8p8yid445DH6GgwTquTabPT%2FYSw8W47Zm2jmCXnIC8gNxd6k&X-Amz-Signature=e0f231285cd4086785e1e04736bc57453b929b215532438d8cda64655004cb29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCNYFA3B%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIFDE79ebveUjucKW4%2FO4rlm0%2BBhhuBHpDPqMqwkavlbzAiBnt9y%2BfkxPBZUp2KN3JMprQ2MC9ERaGw1ILYrtSZH5mir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIM1ywB4fCAEUZlckQMKtwDbnPFAFecbZSwaWpw4GPljmHf9LvYsCFdkxP68GeD6%2Fvh9DT7nbldLy3QlyqZYRr4xmGZdrUyslU4x0fEDMkBYoO2EB2lCMKU0jLD2Cy0J3bj9MhhJ9WfWhlKEWSCQUkI05plUujcIk%2BI4ao05DlQlqVN3jT9bjLWiRzHRit1234QnWT09p8aykB5gg59dOKGQN9SN5IwrioVVuLH7ZqvN6KakWIMtfsRMmJRlkAtY4qYItUXzsg7fvpDbxAECzhKTGu54ypYWkwXRKS%2BKuvyFvIdI9c5kz3MqTFaJPTnsVTT%2Bzgt1KuWSos12%2BJJprqUrYsix9%2Br0WJmZjYHINw59SFBi7JxEGoPpcAlgVh9K3IEta9C8409QP1iAR8NW8DcKmLvNQJZm6juKxS3wKSof4AddegswcykbUM4QkosG1gbB5%2FrqFPdXDxdAyO738fwwG2S7AvVgT8tmWsXrl8VrBMFjR0t1IzBqwW18bxy4EfeKmbIHrGm0iZnV4aDUnjMCJDmGyLi2m9o6G2kIvfe%2FOajyafTM45vUK%2BaP7x9owRfsB0dxjCOMv3rGPXvWorhgrqvm8uQYkJv%2FAQt5bGT1sXcieIXeoPPQM%2F%2BwrZXPpxObN5v1oNJPeyp2gQwvcXkzgY6pgF9inGCL%2BiqUiSNT7CUAeRBF3rzENEnar5Og8XqtNqs6tOPQr1zZViLDqag4Xwuf8KejfZpQll7SZnAuJL6QYy4Q3reEz9xdrvNc7g0SX9JILfFz4sL6W73eQYA1c8I%2Bfwk4IGqjlaMF4JxKl96AY6qXVys6RspUrazZV50VdyK5Uo5zGxUyzUwt%2FUb9459wOq%2FDk4vqQyvd4w%2BRPE2zS1V8i4mi6Qg&X-Amz-Signature=013c3eec23ac9960f2cf48a37ec09a301191a9b5c67f4b7cddd3ad258a648928&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624AIM2TK%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIHFs8PxZEMVd%2F7yAgE%2FNSX4Ck%2FVjfEqXtkIwPLBK9opdAiAh%2FMOVZ8rxiKdTUjZ8TwJ3G10aH%2F8kGg8nJnQ9Pn24Dir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMrEpQYC%2BL3CM6Dh3PKtwDaGz7GHsJXTqTjW6hDLqZez%2Fq61zJbFJ8pf465E6c9iyVCuiuEn4MY9FoC6mlrn8zw5dcyBELaS%2BkzHsVEfUb3%2FYS4yF8XrMprlrP3Eyl%2BV7NQY2%2FwPcIwOqLm%2FMu%2FbYccEL9WbZsDXvKEgm8zWCEuccfe2%2FMtm80X5eixxW0OJS4Tj30MY8FqQ%2BO8mtOFC3aPH5tp1LNQsTuKXGXKJ99zlU4m2DEXMey4DCXYZ7URrRT1rO%2F6D9L8NISunH6%2FaSVSN5d4a4HwAUdoHSxbL5wl8U8PU%2BXQGcPuwMSJrcpYg5q%2BqNQvdiAC8pq5UE9OdavPxO6DB0y3U%2BKetsNsZJumFvf9TxCpQ7cQDs5MloU69Y8U2qpJqgTjEfwAwLeq%2FPyX2DsEMYsfpx7LHg9%2BX8Ytn8407iWlZyF%2FhVTuLmOOCd4J5MmMofJ7eZdOwUDzFmuSECHwppyv5eNG3mbF5vrwTElKfju6g%2FCl9cDlOzlIBn33qJXFqbA4z2g3WeBKN%2BTJVKmbg%2B%2FrEfGPymJjMj6Y4qrL8SaNL30KQrr23iuNpYL82GqGXCKLbWTSGK6z%2FSNwxfXfl6VsPrjy8tH4gwyaKR5AA2ra%2Fubk0g5aPtBTOjKDjKks8IJhxJkDYYw2cXkzgY6pgEums2I%2BS51rUXBOPrA2yWwnDhpkz8ZiKFkcouR8UPT0CjOySU8PkvQlTfkQYiNpG7Mm8GGz4kvzqWPz%2F65leMVM044iEupdQ15Suv7RoswpX%2FVXLCgu3XXC8H9zn3ktY18BzlcnV3tGq2Octq8p%2FdMhKACV9YkAuL1AozmR0mXM%2Bq%2FiBsmTUZnb5%2BArdD%2FW6QQhe4OWY48ooGJF8tSpwv1HltfSzuE&X-Amz-Signature=f342130fbc29b6f4cb4d67996ba636916861e1961f514895ef39dba1cd484269&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624AIM2TK%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIHFs8PxZEMVd%2F7yAgE%2FNSX4Ck%2FVjfEqXtkIwPLBK9opdAiAh%2FMOVZ8rxiKdTUjZ8TwJ3G10aH%2F8kGg8nJnQ9Pn24Dir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMrEpQYC%2BL3CM6Dh3PKtwDaGz7GHsJXTqTjW6hDLqZez%2Fq61zJbFJ8pf465E6c9iyVCuiuEn4MY9FoC6mlrn8zw5dcyBELaS%2BkzHsVEfUb3%2FYS4yF8XrMprlrP3Eyl%2BV7NQY2%2FwPcIwOqLm%2FMu%2FbYccEL9WbZsDXvKEgm8zWCEuccfe2%2FMtm80X5eixxW0OJS4Tj30MY8FqQ%2BO8mtOFC3aPH5tp1LNQsTuKXGXKJ99zlU4m2DEXMey4DCXYZ7URrRT1rO%2F6D9L8NISunH6%2FaSVSN5d4a4HwAUdoHSxbL5wl8U8PU%2BXQGcPuwMSJrcpYg5q%2BqNQvdiAC8pq5UE9OdavPxO6DB0y3U%2BKetsNsZJumFvf9TxCpQ7cQDs5MloU69Y8U2qpJqgTjEfwAwLeq%2FPyX2DsEMYsfpx7LHg9%2BX8Ytn8407iWlZyF%2FhVTuLmOOCd4J5MmMofJ7eZdOwUDzFmuSECHwppyv5eNG3mbF5vrwTElKfju6g%2FCl9cDlOzlIBn33qJXFqbA4z2g3WeBKN%2BTJVKmbg%2B%2FrEfGPymJjMj6Y4qrL8SaNL30KQrr23iuNpYL82GqGXCKLbWTSGK6z%2FSNwxfXfl6VsPrjy8tH4gwyaKR5AA2ra%2Fubk0g5aPtBTOjKDjKks8IJhxJkDYYw2cXkzgY6pgEums2I%2BS51rUXBOPrA2yWwnDhpkz8ZiKFkcouR8UPT0CjOySU8PkvQlTfkQYiNpG7Mm8GGz4kvzqWPz%2F65leMVM044iEupdQ15Suv7RoswpX%2FVXLCgu3XXC8H9zn3ktY18BzlcnV3tGq2Octq8p%2FdMhKACV9YkAuL1AozmR0mXM%2Bq%2FiBsmTUZnb5%2BArdD%2FW6QQhe4OWY48ooGJF8tSpwv1HltfSzuE&X-Amz-Signature=ced27d5a5ef88e6c0dd4a231cd3c18693381bdbfc32760742f20b56b6982ab55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAJW752K%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDSYqEHS1QHkplnk7PEIPwUhxM7%2BDnH%2Bx8QliC4hsPv5AIhAMEK6bnWl3E7rMyGOvaFLw01yJipLGQKg5hcnKX7ruDeKv8DCDEQABoMNjM3NDIzMTgzODA1IgxKdhxs5DH66mVcCdAq3AMQ2sCy4jbo7gjcgmJHuuikVvzQzyiwWLqVS5cwHwMVeL9whNKOAP82c3gm1Vr5%2BL3%2FLKBd1AAqTrF46JtO3GYDV9knGXfLOMpf0bBiFZMXklHv38zA62vbNYCSln2c95RV9qQ3hkRvQXSmW0P6aMciJtaYBZBDz%2BYsnO3uZhPzpAFtpDGXudte88KdHAHjlj7l7%2B0n33DCOVddmR5BANfqPlfgQzYLWOiVpSqCF8y3FqmwGT%2BkTKZG0AIWHKHR47aB6LJt3%2BMt%2F14MFdBqtuSWodHlDs0IPoAS%2FDSSkJD%2FqinX7GEgx3ME6Qt5zemkZJrCLJXTw1P%2B6Nrw%2FrroFGTdGwxLNScZXWR3WXGHlPt8VzNenz1nHA5UHLkLVMwSV9UWbR5WStCgyUWKi%2F1dEPS2uGydlVnMi77G890ohF%2FJ0Xpcux8ciZZv02MaUGoND%2B2dsMdpcaRra%2BrhDvTfBYvlzA6sEkoZB%2Fa4fQ5ZnsavvLhOFSz%2BW1G5mwj31f9je%2FGyBQ1wZbq5SwweBsvFIVr%2Bv2G71tuJWLBBZ2iGn5f7yG09zwOUtai2kjkeKjnEQB90qEYe5WNOuvDbvYf%2FOLpy5OrJQdtaGI6sYgv7hYpJaAiiYUdsYxyysBViizC8xeTOBjqkAZExCmCvxVXN92nBrUNF5PpzY8G5kLqFu6JigOjqomNxd16RzZ%2Ft47bRDapBU1qhNlq9p%2Bt4twGrM%2BpEJtrkztszdwOQrBrFjBnZ5POyAYQzk3jUbXeEpNv7P%2FgMSRduaN0%2B2HOoaZvX6cxMyPLLmspqi03ADppqhAaAwzyhchCoX2k9iQsIsN3QYaYD5s2KUHM5wEXM7cAyfLS582onqw7GAskB&X-Amz-Signature=8c1452e00ccd61d49ac559e5696d93df534bbf18dcaf584faadee360fe585443&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VOIFQJM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIEMA0ZuaKw0h7%2F827Hh8XWnZAji5oWMR6u5jTsQJQQeHAiEAw5cU7OxhKU20NBP2YpmclKzQ5ucfUQpbv25xehvSOk8q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDGta5w7sMowQRrhM%2FCrcA%2BT6thQ8dvbBbBDCaGkybpBK8ED9SvqnjX2miXeaEBkf%2FfqdlhRwbE%2BDnuYKluzZtOdea19CtabDskvehYczj7uM8%2B4FjYGKeid3fzAzuMKSesJFFzcKbvqBiccOR%2Bm5fohlY7mxjU%2B6LhiAKmqBxcyInGm0mVir4DhpNM5igPU7l92%2FXtfpSu21AeqnxSGk2G8bba78a4sC%2B1piKWLqRwj5%2FHuwWkT9aHX7sPfrfe1TOKqxr1RIsAeTymuLd%2BSlMebH%2FeFJTLCz3dLuRB7ElcO4ilOg27zI%2Bnc0KqC75NgR8UZTWWV6ks9Sb4t90p0WNFxBpAm%2FKPMZMhPToiXxTRDuv0%2BNg7OwCNcyk60AlOiV9Tp2oRK%2BkmXl%2FMrNpB%2FqBoquNbUnbteyqdYwQTPfLXB2S9KzYWu%2BdTuBoEmMlcNY8v7GSC94OFZ55Ikv0XVbGwg%2F9H4TKLvxn7BVnNXQ1sc0ST547sK1Ql476fep6G1IT6eYggZWu379mXihDcA%2BI9ojR3RVK4ZLpYmi1LB8IybzeppICqTlIPlc%2FhGj6WuPynHF4aUoDPwQ4kCDCDrO8QrlVeNgNiWWiM0R25f5qVOM0EqYfO1RiYTXQPbI1BvwifK1ClMSqEAYP6fXMO3D5M4GOqUBxteVKURkNPBdyXLHpSsb3rSI%2B51NTHHtcphib17QC%2BMccLrYbCguG0lkxD0ORVfUV23Hbw8spKbXtT%2BkkB6T%2Be%2BRHN%2F1TOACxelpunirdB1QA3nRF8G3JonqOW8VhL3ZK01xkZu73VUS8GL7UMYU9V4NWaDtrrTbWayEJfKlt5EBAohiMnAZSPUGUJnu0hqdu%2FsDKLwlQws1PUr2HvDwmOAqUrwK&X-Amz-Signature=c09f0742d11504c1e0c5c6bcdf8977a462fb256fe3b4c806db6dc050fdeceb6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VOIFQJM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIEMA0ZuaKw0h7%2F827Hh8XWnZAji5oWMR6u5jTsQJQQeHAiEAw5cU7OxhKU20NBP2YpmclKzQ5ucfUQpbv25xehvSOk8q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDGta5w7sMowQRrhM%2FCrcA%2BT6thQ8dvbBbBDCaGkybpBK8ED9SvqnjX2miXeaEBkf%2FfqdlhRwbE%2BDnuYKluzZtOdea19CtabDskvehYczj7uM8%2B4FjYGKeid3fzAzuMKSesJFFzcKbvqBiccOR%2Bm5fohlY7mxjU%2B6LhiAKmqBxcyInGm0mVir4DhpNM5igPU7l92%2FXtfpSu21AeqnxSGk2G8bba78a4sC%2B1piKWLqRwj5%2FHuwWkT9aHX7sPfrfe1TOKqxr1RIsAeTymuLd%2BSlMebH%2FeFJTLCz3dLuRB7ElcO4ilOg27zI%2Bnc0KqC75NgR8UZTWWV6ks9Sb4t90p0WNFxBpAm%2FKPMZMhPToiXxTRDuv0%2BNg7OwCNcyk60AlOiV9Tp2oRK%2BkmXl%2FMrNpB%2FqBoquNbUnbteyqdYwQTPfLXB2S9KzYWu%2BdTuBoEmMlcNY8v7GSC94OFZ55Ikv0XVbGwg%2F9H4TKLvxn7BVnNXQ1sc0ST547sK1Ql476fep6G1IT6eYggZWu379mXihDcA%2BI9ojR3RVK4ZLpYmi1LB8IybzeppICqTlIPlc%2FhGj6WuPynHF4aUoDPwQ4kCDCDrO8QrlVeNgNiWWiM0R25f5qVOM0EqYfO1RiYTXQPbI1BvwifK1ClMSqEAYP6fXMO3D5M4GOqUBxteVKURkNPBdyXLHpSsb3rSI%2B51NTHHtcphib17QC%2BMccLrYbCguG0lkxD0ORVfUV23Hbw8spKbXtT%2BkkB6T%2Be%2BRHN%2F1TOACxelpunirdB1QA3nRF8G3JonqOW8VhL3ZK01xkZu73VUS8GL7UMYU9V4NWaDtrrTbWayEJfKlt5EBAohiMnAZSPUGUJnu0hqdu%2FsDKLwlQws1PUr2HvDwmOAqUrwK&X-Amz-Signature=c09f0742d11504c1e0c5c6bcdf8977a462fb256fe3b4c806db6dc050fdeceb6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCB5ZMIE%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T173807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCFuHR2Tn5aAqLn4Ukv7VtAfjj2Gi0L5W%2FUr6GeAW879wIhANi%2BIbJ2FPwx1dwsg9uOjwOINZtikmS6Gzy5kCKMU4ZcKv8DCDEQABoMNjM3NDIzMTgzODA1IgzvBmlKtj8vEyRipT8q3AOF%2BOVM%2FoI14G8%2FQpDsDafoArpK9Q%2BeEbGh1t1x656fF8hWQhXQU8g8OHFQyTyLhQLIBil1P5UCOQ1w0%2FX2GvHIK9HmSFCRPmj6TmnvWqNH4zu1sGiLLONiapfzbYhf7BI5wnfKnKB6MGYwPy6wMQ6GXaiNqNwLB2y%2BFZu8xVOD0A2%2F62ChObAo2CxFn258k7PmxUb3dl53Nn1fuJsAVtzEbrTI7VBXb7ZgTJpkeo9NL6PZTjjcgQbdc4JvX0xi6WfffZpgUy%2B06PRBGeBLZKgBU%2FmShbaV3Lh1CqQuPLLwLXP8b%2B1iNPQdxefNmbeT0RMauVNsKzwpcNieGXIwJ%2FgzbrTb%2BIXCJRCy%2BODzEILcJvTUd2ZwZIldUvXaydBPZXgsGrUUKJhlaCi13rDQC%2B9j1Z2oR8XvqJYVSYR1Smu6elq1RK%2BYQ7Azc178y8vTd24SliBoA3gUmvsNSS%2FOTqUyS%2Fdbz0C2CbKTReSm%2ByxMvKxLdkqTHcCMPuIHsp2P0u%2BMHKWEyDEKe5OSXD6Q749UlhC9c3%2FuLScEmXyvtZ4f0OFiukBn7Ce%2BUx37uKhmPgZ1RRwZyg3Qm%2BDrEVuqQOxMiwSy9sZ0x3PyhJM%2Bqn5ZCcrx0ZDVz9r1MimrETCHxeTOBjqkAY8TuOu1WRmJHAduT5KJP2wu5Rd%2FUXq8jNrLj9OlOonsmOX5jfLVQ7jG4ZHTIDzO%2BZLN5BeV2q0RY1SpF7991TIWv7U1ZfA%2BzGoBcRt8tqxFwiIllE9TWUM0e3%2Bs2Uk6QQhb9Ph1L9u3pExVuOaVzkwf6sTiM8rxmtNRbx7R%2B1cW5g%2F2FEyGlWTKFxneirfRjj6judkMwL%2FzkVMgYNZDWGZcsnHo&X-Amz-Signature=f76f25cf8d42283ee04d12b45d586cb13e457d684f0b499e1d940483fddd53ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

