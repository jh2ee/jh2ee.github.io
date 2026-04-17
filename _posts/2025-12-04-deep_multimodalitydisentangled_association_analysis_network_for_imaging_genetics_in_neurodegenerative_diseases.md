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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHXQEUMU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJGMEQCIH%2F6MDSv8clS9DbiEC2PnIspk%2BeM13pwzBwCoHdxosAnAiAyblrrPiC%2FndzBw6l0qefMtdcH8OdM%2FcCWaSqE4XvMfCqIBAjT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMut%2BYHgyH2kbzaHbwKtwD2DMw1CCkVwsgG1zrL7sWIyDKKfhLL12%2FkHxJ%2BRqc8jGtH1YDP5DCdp4316ps%2F7WqgpuHrCtlTq%2FCAeD%2BsxhBxg9yUVPq57wjkOsf2FZBmemFZMECRtPhI4cbWRNyhbZd733uGqc3nSDFGKPPkgb6SO22oPVM9z0CP7bEAqqtV3Tz62ZsoySg4e6eI7ICzMfnPo%2BUzPx9iMsqBgbyPZxHJTpAQfks7JQjVcY6bMpegkuu8xwd4recWrUQ9MmDkIiQJMeIvlp9ziPMBOgXbb2DuuLDSwC2ZoQBX8PGS9M98MQetgAXOpF5XxqgdzRaXhA%2B%2BPhTXQqtf0wkYW3kVQU9U0w102GsG9CaW3Gac49JretlT7DEdcaV9u%2B6F2hhuwJM9Sfvp3DgeEZxAsafFG%2BAn7%2FO9yHZYfSICZB6%2BpNk16L%2F5N3YTPSVq0vLBV7Djj7ru4d2YOXbf1%2BzL646HIE%2FP1ormr%2BZWLfba44JZ6cMVOJBBG3T1GTQ%2FCILGlXpW0FjoC0lUD0iCsGqCwEs8UGyIn9QDcT09xO8xdMkn9AwHrmMMqNXM2rO0zYihST0ipIh2THK%2B0VOxYmrrwUKG8s8lCSYdyPB5dknT5QS6bRVw6CtjZPYWQ0C2cfHY4Mw2vqHzwY6pgEqULBy7pA0J4fB13ZwsmY9lN91GU8yB0%2BbXTX5dhyTUA6TIv97fAEbeHik0MkTytbhKa9bFHP%2FW8b5xjpXR%2FxkW9W1Ylq9mlv1qJGEDdd%2B2TQeFohProPJlcjV4LAfJCTIVPmr3uQ3wG1DKzAImNyKKYwKxsv4XpqkQ%2FiMP7yLCt7L%2FfZmrNvqLzkhIuyhaR91G9aQJM7pyzx5vie1pjwk5OPdnxnx&X-Amz-Signature=dd79c09f8a07f0de1e6ec57c224882e01b342de0dd89c26ea34c954a42ef1f2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHXQEUMU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJGMEQCIH%2F6MDSv8clS9DbiEC2PnIspk%2BeM13pwzBwCoHdxosAnAiAyblrrPiC%2FndzBw6l0qefMtdcH8OdM%2FcCWaSqE4XvMfCqIBAjT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMut%2BYHgyH2kbzaHbwKtwD2DMw1CCkVwsgG1zrL7sWIyDKKfhLL12%2FkHxJ%2BRqc8jGtH1YDP5DCdp4316ps%2F7WqgpuHrCtlTq%2FCAeD%2BsxhBxg9yUVPq57wjkOsf2FZBmemFZMECRtPhI4cbWRNyhbZd733uGqc3nSDFGKPPkgb6SO22oPVM9z0CP7bEAqqtV3Tz62ZsoySg4e6eI7ICzMfnPo%2BUzPx9iMsqBgbyPZxHJTpAQfks7JQjVcY6bMpegkuu8xwd4recWrUQ9MmDkIiQJMeIvlp9ziPMBOgXbb2DuuLDSwC2ZoQBX8PGS9M98MQetgAXOpF5XxqgdzRaXhA%2B%2BPhTXQqtf0wkYW3kVQU9U0w102GsG9CaW3Gac49JretlT7DEdcaV9u%2B6F2hhuwJM9Sfvp3DgeEZxAsafFG%2BAn7%2FO9yHZYfSICZB6%2BpNk16L%2F5N3YTPSVq0vLBV7Djj7ru4d2YOXbf1%2BzL646HIE%2FP1ormr%2BZWLfba44JZ6cMVOJBBG3T1GTQ%2FCILGlXpW0FjoC0lUD0iCsGqCwEs8UGyIn9QDcT09xO8xdMkn9AwHrmMMqNXM2rO0zYihST0ipIh2THK%2B0VOxYmrrwUKG8s8lCSYdyPB5dknT5QS6bRVw6CtjZPYWQ0C2cfHY4Mw2vqHzwY6pgEqULBy7pA0J4fB13ZwsmY9lN91GU8yB0%2BbXTX5dhyTUA6TIv97fAEbeHik0MkTytbhKa9bFHP%2FW8b5xjpXR%2FxkW9W1Ylq9mlv1qJGEDdd%2B2TQeFohProPJlcjV4LAfJCTIVPmr3uQ3wG1DKzAImNyKKYwKxsv4XpqkQ%2FiMP7yLCt7L%2FfZmrNvqLzkhIuyhaR91G9aQJM7pyzx5vie1pjwk5OPdnxnx&X-Amz-Signature=dd79c09f8a07f0de1e6ec57c224882e01b342de0dd89c26ea34c954a42ef1f2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RH4HUFT%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJGMEQCIFDN8Nt0ImEtrYrx0RhTYTCB4qdp4kl%2Fdx2EomvohKSAAiBmA%2B4p79Y%2BXjnKhH1V19A54sul54Dok4texzlhjbk9%2FCqIBAjT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIeSdyJ9Lu6BrO2fjKtwDOUAgfd2%2BWkatxZBuTNXKiH6DxAwCMg4wcJ66diB96uwEnaGBYxOGTOlfjA4CBddKfdQxXK4DS8k4MRX808vU%2BHRq7G0TIFn80Pt1qFcIqS5FRYBi4jwHStpNUXREjbnDWKgIyIC6Vq1floMaOy%2FR0FEdBdmgRjOdSXjcJVNXm4AaZlH94gtzfd7t69mhTxbbpyRcBqbWzCJPtnBBkdVTf9FljuU%2F%2FDwUMB%2F%2B9lNQnWl04NXJTnrmDo708IFZMo2Xt7DIAUjh%2BStovPAM845G4v71NIRJ1Y3QrSddTVrDd3gBqLjm5j7C8BSyh7v1kTErReBc5rA6JPEnm9YhANWQh5O3KI7Zg0%2BISmuIWvY%2BN5%2BCJvAsWfmWC74YCD2WHqqwlD%2BjFgesQ9N04um8EJFhL59htYEiu%2BtE4g5q6PlLurlkTVq1gi%2FTdk170q4cyfJXbddjdqjiBDTJdKCwZhq1kuWCjG%2BV2rXUyIBnkv4b9LWgVsHMljS2yXCuF4ebGH3tHUXEl2uM3dqfsoaZLzx7Epu2Um1DRarj%2Fs%2Fmaly1R1Mmtn%2B8uA4xkY0HmIdxMYVhA5dzYbXsmXrVpX%2BFphWFdTxofUlZPIRAcyF%2Bh10RcpMiql1sdcldAxdWaq8wg%2FuHzwY6pgFL9bTHcFmoDAYdQX1SH98FBJCrAhqWlZOdoIWzdmgUKv%2BIb6K%2FlFaDhVK4SFvTWkEeoNZ9Ofn5qsDwJrt%2FcQhpuI4amXpFgN1TauXL6llqfT%2FHu5S93xGbiUo%2FZOBnizyotdtR26SSDvPGZyEKAFsVnsR2wbI6bLxQ4Aw6zLGqTvXwcevRP0bTaSZ1ydhpNoUFohPqe4L6W4q9uO4ew%2B2DD%2FJNrVNs&X-Amz-Signature=8ad9e8213b56654bed0836c3c68f47ba094c0b6470f3e69fe123d088eeff057b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WS6R7HV%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIFi44Oxv8oUR9BGFpydme1Gfp0%2Fuj1d3e6NoiHq3DXLWAiEAxHJC7Wkw7S848AupnELoBUP0%2BbJZWg2lQOY8lISx5SoqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEIhhmzLwYPijEkxLircA3PQiqgEj%2FCVAFue3ZEgt5pnJa8ynZC95xnn5r5YL3c640u11aQbYzxQWASc7xSGZoP4S4nnLujcrJfGE1OVdPcKDoYi%2BGEkLfYF%2FkAUJK%2BXA0EO42LPzyppaFyBddi61zTtd6xxu3G%2FhMj%2F0zLd3iOnjciq6j4gUL%2FFsPto6vv10%2BxtgdOMlviCS2g%2F86o3AOw5gilkeXDyP4M18YBKUhORc5oLQY4BXvjXOS%2FIuQ4efGMjTJHo4sdv996kWRaBt0ttqx4JQSSql9%2FUESrqN%2FDsgmt3fYdKAcCi9t2CG%2BnGcEpjO7C2hf0yBEMsaKLFeOMhVQFS24NHv%2FvFh1q8LSxlyghb5VuYD4JJsC0gWYrgPQvxpysJNPheghF84wx8VbGX6GV%2B4GjHPR9RiSCoqAkSsvxKkRyzwLQpJrmzWARMUodJ9lvPYAZZEcDpVfPCdBPBq0y6j4Qu1F8Eg4IjyMKWn%2F6aYhRyLH%2Bp8q0JtSGqqSNYbbhnzXi65XQLxcNDW9Kykzf7SvL171cXnYaV3qTN4HKW7pyT4fjBP84FnF7Tx8EeYHSw7fdUNdkMuPDn2T9bgyBdUCnh%2BJQvxDqAAW9JKhOxzyI1yhNBYKoGx78XY7t8s4ODJ%2BKaBh5WMIf9h88GOqUBLRIFJv2G7N4M%2FfooNdenLBmOzx3T1Va0qE6I6F0rsJ2tB5iNUq1f1bt%2BzSZ1nNC5FwsmOQfBJCVrFjyGlH0UYokb5wOGi%2FhHbrINQjP3E%2FN86OwFL80m1LIw76ASaajwzyOeIoX4HOhiY1uYk4fOIVSFClZnfhuoBXg0%2FDkcC0XZzuCFKwKSzfKaXQODfaQ%2B5273CuSE1xF2af4PSByxyWUaHwJO&X-Amz-Signature=c0a041b1272de32e6e6fc17adc9e0fcd8e8fba0e916159b82878f3938cd7466a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WS6R7HV%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIFi44Oxv8oUR9BGFpydme1Gfp0%2Fuj1d3e6NoiHq3DXLWAiEAxHJC7Wkw7S848AupnELoBUP0%2BbJZWg2lQOY8lISx5SoqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEIhhmzLwYPijEkxLircA3PQiqgEj%2FCVAFue3ZEgt5pnJa8ynZC95xnn5r5YL3c640u11aQbYzxQWASc7xSGZoP4S4nnLujcrJfGE1OVdPcKDoYi%2BGEkLfYF%2FkAUJK%2BXA0EO42LPzyppaFyBddi61zTtd6xxu3G%2FhMj%2F0zLd3iOnjciq6j4gUL%2FFsPto6vv10%2BxtgdOMlviCS2g%2F86o3AOw5gilkeXDyP4M18YBKUhORc5oLQY4BXvjXOS%2FIuQ4efGMjTJHo4sdv996kWRaBt0ttqx4JQSSql9%2FUESrqN%2FDsgmt3fYdKAcCi9t2CG%2BnGcEpjO7C2hf0yBEMsaKLFeOMhVQFS24NHv%2FvFh1q8LSxlyghb5VuYD4JJsC0gWYrgPQvxpysJNPheghF84wx8VbGX6GV%2B4GjHPR9RiSCoqAkSsvxKkRyzwLQpJrmzWARMUodJ9lvPYAZZEcDpVfPCdBPBq0y6j4Qu1F8Eg4IjyMKWn%2F6aYhRyLH%2Bp8q0JtSGqqSNYbbhnzXi65XQLxcNDW9Kykzf7SvL171cXnYaV3qTN4HKW7pyT4fjBP84FnF7Tx8EeYHSw7fdUNdkMuPDn2T9bgyBdUCnh%2BJQvxDqAAW9JKhOxzyI1yhNBYKoGx78XY7t8s4ODJ%2BKaBh5WMIf9h88GOqUBLRIFJv2G7N4M%2FfooNdenLBmOzx3T1Va0qE6I6F0rsJ2tB5iNUq1f1bt%2BzSZ1nNC5FwsmOQfBJCVrFjyGlH0UYokb5wOGi%2FhHbrINQjP3E%2FN86OwFL80m1LIw76ASaajwzyOeIoX4HOhiY1uYk4fOIVSFClZnfhuoBXg0%2FDkcC0XZzuCFKwKSzfKaXQODfaQ%2B5273CuSE1xF2af4PSByxyWUaHwJO&X-Amz-Signature=3960394e9d2e29d93fbbb41e6da565114af6e2039b6c78e0586d8abf432b84c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJASA5FD%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQDuocpEEVG0zeHdlvEy5Vt%2BgRIWvn2L8wb9%2BvxEbCsMMgIhALukW9Clo%2B5MFyFtjhuNbm3WImctaMd%2BhYK8MkZrH9BAKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzmxuNIpVCX%2BRlvHj8q3AMXP2AlkI7odBYOh5ZHCLhcToGaA2GIMG4KsjCvrML1tAJHCLy8mOC657K17Hey7rC1HwwkB8mH9NW6J6GY%2BLPpyYooMHIdGROGguzqg0njnk62u3ejyg9a0iQS9VG%2BUd%2Fj7L87FN4X3mQnqO4pmM%2FNn4h0IBjCqgIDCOUOFOZW61JiA%2Bd%2Fr4fTO0rxBL23%2FOj16mtvlRbL6LAnWz8iHVHAsidez5f%2FMj3Xte1TgbLYw0uC8tar0yjo7ZHtdSXAaNJoWxUyA7QU%2F%2FGVJIHiwtFVD63xj8YlHJAcA2%2FdfUzDgkYq%2FwZR%2Fc4M9NGjAzZaPTj%2F6lml3hkS7fzeed4O7gDAKoKXvmJu%2BxqvOm%2BDSG6eTbj%2BU2J%2B7r6Rjwg4QIsNmGNCJFrIuJkY0LX%2BWj4hVpn3sTDQFDbvc4WFvEKmehRKcqRsamdwOpN%2F22Vg02k9dMo8fZ4Uf6ZNUrveO%2BD80JUMrJzkBMlsW8GZ4ZLHi0m7yuX9a4QXiEF5TnMuQurYuXb40aVbmSK6sg0W2GM6NaJkUf7Jos%2BXqt7w52Si1iR0tEqDSpUirEhLxS0qA4XNLkPVw6eEwCzGjt9xVQ0V864TyCE7ao1ujb947mUuR%2F801glPiXJgLo0I%2BZdmeDCe%2B4fPBjqkAbtSr5xzjlWi0G7AaP3M4ubH%2FAEP8RNkxFzwk82JnIIKI5DU96kDA7X4EoujUulepVFNxSc9L8IFzazowLWdzu3oAF8TyTta8qGc8lixbvJt3wm%2FdlkdEcXh549mfKpQllJqD087186UiljfX%2BwJmMV3BbNnv5SF8FGmwKrKAveQxnlkU2OFfyWCvpVXKXnpYLsIMkrTGq3WYvxvp24uQ45EPLWJ&X-Amz-Signature=71157efc0cf70294613f3a781d68f778d88b4238a6596c3065714ec2cd142452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626WDRS5K%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQCIpWEM73L%2BZ0xNfBmmt%2BW9gTUYz6WB4zHNOPZcEWzp3gIgPGv9XfkBMNPNVknzA9G6cHnOkJnkKlqoL57q8jhDSLQqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIbg%2F%2FkHASaxN0rFDircA1hEtLKwOi7n2DhpEU7j3tJSLjXxLbTNScpQCkiylRrpEg4DSwbDbb7Wzjn0u1nQ542SqZsNgCr1jqaDAODQN%2B3Wtep97FNvRK3Q1M%2BYERXJdSRlTeSb7%2Fca%2BXmLqON7xauP3X1iNjLTUxtrFjTJvrGVEUxp%2Fxzk8l1fVr1ak5zRx%2FKX3zg6bm5MBQBQExR3InSDQ6AI8VDxjU9eAv38IDZGoIpeoX3TlIuQzP%2FQAFLC%2FCFm7lD83Aue4%2BqVn8XG3%2BOmxccMe2wIijQUsxWDC%2FbTKDXJQwmBUE%2Fpf3hRlTjNZYa897rLzM%2BfJ%2Ban52sD6C0OAYT5Pajl1W2dQvgx7C7ZFfzkEhNRpFBAt7cDDX%2FpGnafieu6k2%2FFkmT960u8CvKZT6MwYhIXWde8lCLLkLDndJw4tyLfwuZ3fXfjXQR0g8M2mthZNfDysN0ShK2FK45Cj4TRSDqwcQTG1kVVz3lqXNCbWSl5yRSQ0i5J7KFuNxN%2B5DzmD1OSc%2FMnFdjxOD4iHEuC3flt8Gcng0GMQWidthRhRME8X13Afv6P4YSrEcngUlI1I48I%2Fb8Iqr50zMAQ6zWipO0WdHEuLeP6NdGIDFeZvbVFzz4Wp7RwWvMc6MYKMndmSEBvA7TgMIP7h88GOqUBgHsYOEObpe5oLis0E6sfn8yB%2BURgDuUT8qCKFQLR73gyK%2BlgEypk48vz4RmC3GnLeHJcr44F68EnmfjuzTS18oTztD8XSRySWJAd914YWtMHqhlHSz5SoqPjdg5pkB3k2fj0AfQhbWiryqWE9XEuO9fcYw5rI5grmemKcbHvrqOR2fdol7C7JfXz6VB6VGdZgwkF%2FZlpWcEzBRB1jEPnoVy6KErd&X-Amz-Signature=e0621cef3b918824d909827a9358b7514382d904a8f538ca887e3797a96aa1ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WUS5UZR%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQCccqFSnz7HVm%2B1wFG6vRmiHQdBeeGb%2B6vzlAQKJRFK3AIgaPZ32wY4QqoO3BlJh0idrcTSy7CIJyeurUkCFQYG58AqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAhIKZpSm2ZP6kv57ircA6PrbtW%2BF5UzmVjAfbHHGVwfsNCXD9CWimkSRp42c3vpHwBgDhit8Vsd26B7gFdsJ%2FkU4iJF3LvQtaDVE9M4zwhTZeuCtkJx0AUOZAzGFwmJWXYPZIqmT8gueetfX0fL4%2FFuME1JugIYaWUzAfM2SlAdFxmZ0BT4scc%2FBVVzdfuwdU4JzOE4WHcwZyhD2FvyUtRRyIS%2B5BBUZPDmqnXl3EefW8jurcDeErWBH0%2BTVK%2BMbWkN5xU9xlhTMqZ8TassAM7%2Bym6DS7AQCAJEA7bxl5%2FwlNKgJcJFcL9icD41McsuEB3whyS6G8eERHqBX%2BlXmkAyk4f%2B1xA3N5CtGDQMX1zVA8REK%2FG9xKdN03hIBHI1qkL6ECpEvlQb6s6Iu1dwhaaudeeUV%2BoIUjGnXCpB9PbJQh4lV68QAbGLyL%2F%2FaxXwt4DWArnEFFmq65cHWXYI9zSNoLNgkjeMfZ1BHPiPzG5yGJFrFDsQolUetnbUQAA9mYIC%2FwgJLMu4lXmif2Q0CFCpXpTDGL6sO28j638bpKGLRK1aTQrkpKd9yIc6tQbUXmHLCAtSkJdXxmlbxKochYDL76%2F4SIykZyrTf4FME6jTdwY%2FH%2B%2BZ0lnvUpFaOg653dr7%2FTHSSPDRgndoMI78h88GOqUBQWmzXHCfyd3liEbpGgH3X1TdGdTZgOZgTSO77NcV8GHiYHNNppClBl%2BhE7AX7DLi8%2Bk%2FejVCuNLvI4l9Np4MSItGqJ76gmzu9PBXK%2FL5YMFRnPXT54kThOG%2BcqQC9bACsgUtYdZKSVy9cQy2ynnnZQiIrmg4Hca6yEzsBnNy2IbsYRYXQD21m38zMZbYBH28bHKTmZZmNd%2Bd6WjkjOc5qr6jkx3Y&X-Amz-Signature=1f5739e766a7e08f81be1fa9a6a6a207de866c0579e3bea2b697f001e8424a87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGD6ZVOG%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIDUsyDDYsKZu%2FbXFCQH5XluNnXXqbkAat%2BcTspkoba%2FeAiEAtZBIcI2Fm%2F1FKco%2Ft6n7vUJashUakNKhOniX3yIEUJQqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP5iFENI1bcoannSOircAz0aCHYld8aPa3LL9gW8OhjzIKmgIz4X%2FK5FfnuY1qPn2D%2F3puDk%2BtOxst6fU1JvhG7OKYLBbuqiczTBpAcofDaOe663MKPtTOkJ9femh%2BEphHLtkLr5Lnh9hvgDnYUcofkd6Gjv%2F8Xp1I6CmCF1biyhJr2lmHCoDn3VUFPz99cx78vbbTkbJvDFZcmIF%2FC3wcHJ6o2YxlaPDoQIJQTxTU1YIMB3X2jDjsiuY5JKGwgms%2FfwW0pOCRJbvA5wPqmOqlbK1hm4Z8c1EXp9KPuEfs49QdVc7veK9kAa2ySi2JusKnpGpfXDS4%2BXWmUwL77MmgHS2DEUO7%2Fj85TljltpnK9wqO3%2Bbe60EMlo6oj0yVzz89iID4X3m0Eb35OSayUAsEaay6rCJYN37B%2FFekko1hN2gEN7dn9ru7qkRDCJXrU5CSEcNCmLDmFw7347fCiODRR%2FF3vuIuR5MZor3v3UT2ptFusdUIKqRYW6aK9oCQmUw1ejuY1vtDae82VdhKNmXZS%2B%2F09EV%2F1v9hct2RgzD87OnhMllXIClnA7M%2BCwMqMmqlBk2KlK9Uib%2BOlB0hJJsQQPcmnK4zlWjEgR%2FGxCd%2Bxf9WqNN%2BrvPIkcZ5j4ACxnTw4OGoLNT3QrPxniMKf6h88GOqUBQEMEvvB1Z%2BVQEqYL4iR4Ta77ZO5AZxfvFOvz8NbzhmyiLcwYbL4pJL7y7Ofc0PVbcR1uWKfZ5OiY8z%2BxWGxKKKMJ%2FIjeEgp1loxo5LLGthENGUdoD%2FLKNMAJNP9yQVWwr2PJHhGlwDvAn5rkGknRdTYdRLh9X3AZ%2FRZAfOdhcv%2FcX%2BYvhEgt6B3r%2BUIGZK47FPNkmZ7bViCxwEFh4ILa5uWWCmv8&X-Amz-Signature=025ccdcf8f5eb63ad3c0c950e17575a6403cd392b3e4171591a491f1243abf84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGD6ZVOG%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIDUsyDDYsKZu%2FbXFCQH5XluNnXXqbkAat%2BcTspkoba%2FeAiEAtZBIcI2Fm%2F1FKco%2Ft6n7vUJashUakNKhOniX3yIEUJQqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP5iFENI1bcoannSOircAz0aCHYld8aPa3LL9gW8OhjzIKmgIz4X%2FK5FfnuY1qPn2D%2F3puDk%2BtOxst6fU1JvhG7OKYLBbuqiczTBpAcofDaOe663MKPtTOkJ9femh%2BEphHLtkLr5Lnh9hvgDnYUcofkd6Gjv%2F8Xp1I6CmCF1biyhJr2lmHCoDn3VUFPz99cx78vbbTkbJvDFZcmIF%2FC3wcHJ6o2YxlaPDoQIJQTxTU1YIMB3X2jDjsiuY5JKGwgms%2FfwW0pOCRJbvA5wPqmOqlbK1hm4Z8c1EXp9KPuEfs49QdVc7veK9kAa2ySi2JusKnpGpfXDS4%2BXWmUwL77MmgHS2DEUO7%2Fj85TljltpnK9wqO3%2Bbe60EMlo6oj0yVzz89iID4X3m0Eb35OSayUAsEaay6rCJYN37B%2FFekko1hN2gEN7dn9ru7qkRDCJXrU5CSEcNCmLDmFw7347fCiODRR%2FF3vuIuR5MZor3v3UT2ptFusdUIKqRYW6aK9oCQmUw1ejuY1vtDae82VdhKNmXZS%2B%2F09EV%2F1v9hct2RgzD87OnhMllXIClnA7M%2BCwMqMmqlBk2KlK9Uib%2BOlB0hJJsQQPcmnK4zlWjEgR%2FGxCd%2Bxf9WqNN%2BrvPIkcZ5j4ACxnTw4OGoLNT3QrPxniMKf6h88GOqUBQEMEvvB1Z%2BVQEqYL4iR4Ta77ZO5AZxfvFOvz8NbzhmyiLcwYbL4pJL7y7Ofc0PVbcR1uWKfZ5OiY8z%2BxWGxKKKMJ%2FIjeEgp1loxo5LLGthENGUdoD%2FLKNMAJNP9yQVWwr2PJHhGlwDvAn5rkGknRdTYdRLh9X3AZ%2FRZAfOdhcv%2FcX%2BYvhEgt6B3r%2BUIGZK47FPNkmZ7bViCxwEFh4ILa5uWWCmv8&X-Amz-Signature=f2d54d1ece60b14d7e0da2874cdf9160953b4f82c464cf28ea13ddff91edb924&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MW3TBO4%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJIMEYCIQDQuT1m0IHz%2Bo58xKrlBDPvNFn103tooIYyb0e6d3qrJgIhAJzmNd%2FxGz%2F68EgtC3DLanam1t8CTvib9dClBVjdta%2BJKogECNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyiE%2Fw8uthuhweHM6Mq3AOh2%2B7XfJOEG15nJLAhYxRm4fS2UFUsMXDFyKbcJg7%2BpHC%2Bk3x3B9q9P1%2B4rVvwZpzjvxoK5JcTgISIQgi2Gxsd52L9LLdEN8F6Q82rFlWOjWiIiKF1lUC659E28qXq%2Be9TkxkPPT1a1p4kAGsEEhCpR8nNPbdMaR57Y9osuER2syfJ10oMu7PoDevOH3ZeSJtOVkHpaLxjwyyXqpVQAvdWVUXmVgL%2FMxk6wsRQQMQmcWrvgZLmkMwhNH1jd%2F9uNmStn4wpoAZGaj51qRDtcsBvs4XzsudaH971KglqHXIKX%2BlCExN%2Bc1fu%2FXRktcCyeS1kG2GdnjWYtVlMySvcJiyDoiWfpv%2FR4ghEuy1nb9Rx%2BN0%2BgtdZe7jOqbJzR0us2CanO21LoSCdwg2DXbefmT3beOnBjpwmWGfZKPzCtPRhTdaff0NvEuN0vDImBWcdwQcOEi23xQSB5HhOl1KiAzZZrzieikGm%2BqtiGtzFnl%2BejJTC68s7BxOls0ctarVd6nPjydkDFMiiyBUdgWq4eIN5kJfzni20TwZ24ArqVTRkPbGm%2FrZ9ACgSOFSNrrFAa3oR8A%2FoWXPdS6bsnyL0EZJFr%2BpMUN%2F4jEvWHAvZxHMgnrgxigo34iWtG69h4jDYgojPBjqkAZ%2B6XaPjRZElfaC2hR43l9LJ3Cmh9zoNtrDDHA3czqd4Qi94WiVimbXFOpOmu051euw8T4GIAg060wZsRG3oAX3Tf2AiPqFhWz0v%2BRqilJ1rPiUyFtTLctbSG2yeE%2FC6de0%2ByGi55iMBz23gBwhIeH4aSmAbL0RSyKxcFKK8LmklAJTEuJjMkeupb5aehQSWLSu9nJJGLfPHk%2F67zC0c%2FywJeizy&X-Amz-Signature=67d6ed524f781ab3c5b7fdbd9ee8167436af0345e01d129a72ac5ecf8b39439b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VOU7YKN%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQDzv1Zu94B%2FB9b59qnSYt7VUaceA0AqKBgGfwF8jbnQeAIgew7DTxhVRBhtI4TEi8YCAcT0LleZtKmJyj3MW66SXLEqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMXAkrnkYurj3WyBbSrcA7bfMgavyoVspGDp%2FAHOBqLcKTRKZ6%2B0r%2BNeey2xhRFOMce%2BLcJiKKJWrzq9KCjTe0h9HG%2BMazF85KNOgcHFjp9ghOUcy3iP44MJXqgzKa1WyTD6UulWt%2FPVI1bQIQhXEtHqn9tC3apMV4aNPRtsL%2B%2Fba%2FeD266P%2FDPyrq6YICSvnDoWRNE%2FPZOdw3%2Fzpeyn%2FYS6pt9JhoRk%2FDDJYRicG0iW7jdyGYLn%2F60bCOrk49L4QCZ6%2BEyGa7Y7kHTUWhAMesvmaWLEfutcDGk2Shf5YAO4wEBjpZrTmN%2Buk75Fz8bYocRz%2BUvtfj6bjoFaTL4K9Q8zpRXByOzTL10GpT1dfDR26PGBSgq%2FM5CiuJrEbSptTm6VEkcUz1WFWFZUUrXSdLrQlRTpK2ezlrIaWnaeopEVZLPCHgykiBEsoYv9%2FU8mgZdrVHyggjAeRIyD7DMmpsLjz3RqjRZRZY50Suhce7yC5SFwtRenYo3I5yquh1tszC0JkOQ%2BGU9kQMx05IGjwalXsodsmi0ki1GVjaAzXmjVJUNQ2L92SdyGDIMAn8tjvmJp%2FBZWZcWH3sfw7LeFGsd6hfseCVgJ3T4MSCd%2Fppl7NVhCMGlAxWQDpvHZAX8HG%2BsrcAKxu08exg%2B4MLT7h88GOqUBmwN91WCuHl02vPZ%2F1PhcwpGNKQ31JRp6ErPDLUim3eUpSvDzgOyvhIIFix0ozp9aBtA5imOCtqer2LIVw%2Fev7DqbodBTizZmx2CF5M1P4Bakih77L6I%2Bqtse5RHTBNA%2Bul6TM4xvglEuJEb590M8NtS%2BVdsnqRDzcFwvyVOJO6AB%2Fgg9TusS3EWB1XOu6ag61tBOZGe4rpfFr%2FGSjzZmqBDrfONF&X-Amz-Signature=f6d8467e748bb1153ed59d2e5833655b28557cc8f36472a475b1e136b8ef62e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VOU7YKN%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIQDzv1Zu94B%2FB9b59qnSYt7VUaceA0AqKBgGfwF8jbnQeAIgew7DTxhVRBhtI4TEi8YCAcT0LleZtKmJyj3MW66SXLEqiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMXAkrnkYurj3WyBbSrcA7bfMgavyoVspGDp%2FAHOBqLcKTRKZ6%2B0r%2BNeey2xhRFOMce%2BLcJiKKJWrzq9KCjTe0h9HG%2BMazF85KNOgcHFjp9ghOUcy3iP44MJXqgzKa1WyTD6UulWt%2FPVI1bQIQhXEtHqn9tC3apMV4aNPRtsL%2B%2Fba%2FeD266P%2FDPyrq6YICSvnDoWRNE%2FPZOdw3%2Fzpeyn%2FYS6pt9JhoRk%2FDDJYRicG0iW7jdyGYLn%2F60bCOrk49L4QCZ6%2BEyGa7Y7kHTUWhAMesvmaWLEfutcDGk2Shf5YAO4wEBjpZrTmN%2Buk75Fz8bYocRz%2BUvtfj6bjoFaTL4K9Q8zpRXByOzTL10GpT1dfDR26PGBSgq%2FM5CiuJrEbSptTm6VEkcUz1WFWFZUUrXSdLrQlRTpK2ezlrIaWnaeopEVZLPCHgykiBEsoYv9%2FU8mgZdrVHyggjAeRIyD7DMmpsLjz3RqjRZRZY50Suhce7yC5SFwtRenYo3I5yquh1tszC0JkOQ%2BGU9kQMx05IGjwalXsodsmi0ki1GVjaAzXmjVJUNQ2L92SdyGDIMAn8tjvmJp%2FBZWZcWH3sfw7LeFGsd6hfseCVgJ3T4MSCd%2Fppl7NVhCMGlAxWQDpvHZAX8HG%2BsrcAKxu08exg%2B4MLT7h88GOqUBmwN91WCuHl02vPZ%2F1PhcwpGNKQ31JRp6ErPDLUim3eUpSvDzgOyvhIIFix0ozp9aBtA5imOCtqer2LIVw%2Fev7DqbodBTizZmx2CF5M1P4Bakih77L6I%2Bqtse5RHTBNA%2Bul6TM4xvglEuJEb590M8NtS%2BVdsnqRDzcFwvyVOJO6AB%2Fgg9TusS3EWB1XOu6ag61tBOZGe4rpfFr%2FGSjzZmqBDrfONF&X-Amz-Signature=f6d8467e748bb1153ed59d2e5833655b28557cc8f36472a475b1e136b8ef62e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT3ES7CP%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T100137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJHMEUCIHt9OGfJFJnexK72j%2F8jUiAucGrUxH53DcppKWvjVeW2AiEAsdOW%2Fa%2Be9i7jW3HoWbjH9wrIoH2f8bwc6rNFgqefTj8qiAQI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFU9NrhWdJoeBOHN8SrcA5wopC9mP%2B7T42SV4a3rkJYz%2BuYYTXwMXUjpJv4ULqVNseBTyl088CfTVQrFQmDPJWNSLqXAO7dGncncbmhlZkBITiPCRB1RQTuHawem%2Bp0zD4r%2BZ3Ph3JrcOJJFj%2Fp978u2vVdKHQcJ%2FiCPrA6YHvX3nZQDxX3fDgr3Crt1KbJm%2FkVtN7R122WRq4nqcFCcFtMleJVYgBFfmZP92q9jSb9uYoUydxQ3I1QlYfiDqc%2FkFcTIY9rMYikEDjOE9jzFMA%2BGnGGGP4wptmFivSt5iFCOxpDlDyDBJF2qKJNchtn36lPqKei%2BQru6HPbWOh7I52v5vmUk1OnIEu1uZ8q03f7sGGYx0pH9c25h78BGJxyeSkc4fXjsvQFMho8PuO6NLQ2UTIPxx7U%2Fco%2F7E1lm7547l5tYfazRulKsTUpGjJO7HhBukhLFolh%2FhwZGte3Glx%2Fp9HSv%2B2amlYIaBVPCtK2%2Baoh1oOCCsCbgTxd6yTWEeauovM2aAIEHHkaa4aNnpLS7YeSS%2FdMappTkfPojiAs9%2FMaTUppWiRyTpD3urm3ptxukJArfNvqDxL5YbzEfmOjKo5CPQPB6%2BuLQv81R5JI6hL%2BWjSgh%2BDNatqyPvmbrdDGe4G4gfw%2BkaIXlMO37h88GOqUBOtB0NYkP79wmj2DQu5jHuRB5s0sQSaX0N00Lw8efbcyVpVXfsAkkUndW301lTbXbciftlNnaPSdQ1wrosgZiUzqfSKO4pAcL%2BhvSznXXARJaIZ292E0tAaTkG6EIam50A9ZO2N1J9XwraZO%2BgkJMeem4Lalb4cbh%2FlwOg%2F7mgM7R%2Bf%2FxZBx1wFXpbySff16rnjd1SNq7oEaWP9j1KC57fMyjX2TO&X-Amz-Signature=234855c727303065981f99442280e6aaf971cf1dc7d7a33215960858deead671&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

