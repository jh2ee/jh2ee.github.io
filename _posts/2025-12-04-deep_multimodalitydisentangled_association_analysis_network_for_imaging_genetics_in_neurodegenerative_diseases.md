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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SCXMNXG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDkmMixv3QwUFBznSb4ctN8e02QP5Ug%2Bu5Y0L2bCw4rtQIgU0vYB6oWWeRSHMMk2k%2Fr4wv3nMRUiiIFswZo6Abuu2Eq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDCsIm6UAB33WTxvJICrcA0elA5Omwu0BSf60lPW7pdaln%2Ba33b59786OGMoQb8pObp%2Fh%2BKn9oKpgzDDB%2FFDJx%2B5GOSRosULnUXSSqF1c2xdQn%2F22Vhx6cR9hbODx9aYHwkmyRONzwZmQoKoyB8PJCGhf77fAol89BEIuzd9KlSxxFzC8pHelnqRYWX%2F494hLKe1pS6jqFLhPqBSpI6fGMxnObWri1RZBWafBfp%2FGZyQsoQxBnCbQQSzrlmI%2F%2BxmfEINpsILpBDQ5REEq8%2FVmQBVGBq2Nou0KbgT9MKQzPGbgF%2FAEfiYyrVCP7mI40656zET%2FQFlbdBvTdVGupHCsY9tYqhzSB3AYl4DxD8H0z2AWuXga6c%2FRPnb%2Bf4cY3qphIKINPCigRdjZQTZ5M9iv31Hrzakx9aCsipAy2VCaVMGb78hqohAPMp4vbFoE6dpSHCoPln1p%2FRUwIsk8Oj4l1NcizjheGZOlq5FJBKJIdL2FtSsGzfs1MAHDt6auP8d1Whyn0iS6hhZAppqIh5CixL1HoCdsr7flBUoX7Pw%2BLv2bBCKbbjHzb%2BxS8GMXzJEnK7vg%2BK%2FwCHWjh9C16MbSVS7VwYZ6VT09sV7OaranXO%2FXgvW9X9CiImmCrABdhdnPsvgSfT9xj9W49MLZMKLClM8GOqUBDWu1y6hEZnhFqR8gnPKJ5RhQg3KFgQF16%2B9wANOoSl2BfutsIGpVTualVnLnoD%2FnJNGDZqvFn7dz8RtKtclTWAlBS3rF88odK1%2FXVVwd65FHXvdzab%2Bw88L4aGATU6S484tBK2pkjE7Ppg4E2AA3c3g56lmXWyLxeBRKfhsS8QR6BYSmvo4OO5Vw7AYyRyHAlnqvjgMyIYu69pagV%2ByM7bztzhIR&X-Amz-Signature=3b4668eb0d0de09c588f6da51fc45e959f98967241b6ec0ea93c60708e1ed573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SCXMNXG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDkmMixv3QwUFBznSb4ctN8e02QP5Ug%2Bu5Y0L2bCw4rtQIgU0vYB6oWWeRSHMMk2k%2Fr4wv3nMRUiiIFswZo6Abuu2Eq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDCsIm6UAB33WTxvJICrcA0elA5Omwu0BSf60lPW7pdaln%2Ba33b59786OGMoQb8pObp%2Fh%2BKn9oKpgzDDB%2FFDJx%2B5GOSRosULnUXSSqF1c2xdQn%2F22Vhx6cR9hbODx9aYHwkmyRONzwZmQoKoyB8PJCGhf77fAol89BEIuzd9KlSxxFzC8pHelnqRYWX%2F494hLKe1pS6jqFLhPqBSpI6fGMxnObWri1RZBWafBfp%2FGZyQsoQxBnCbQQSzrlmI%2F%2BxmfEINpsILpBDQ5REEq8%2FVmQBVGBq2Nou0KbgT9MKQzPGbgF%2FAEfiYyrVCP7mI40656zET%2FQFlbdBvTdVGupHCsY9tYqhzSB3AYl4DxD8H0z2AWuXga6c%2FRPnb%2Bf4cY3qphIKINPCigRdjZQTZ5M9iv31Hrzakx9aCsipAy2VCaVMGb78hqohAPMp4vbFoE6dpSHCoPln1p%2FRUwIsk8Oj4l1NcizjheGZOlq5FJBKJIdL2FtSsGzfs1MAHDt6auP8d1Whyn0iS6hhZAppqIh5CixL1HoCdsr7flBUoX7Pw%2BLv2bBCKbbjHzb%2BxS8GMXzJEnK7vg%2BK%2FwCHWjh9C16MbSVS7VwYZ6VT09sV7OaranXO%2FXgvW9X9CiImmCrABdhdnPsvgSfT9xj9W49MLZMKLClM8GOqUBDWu1y6hEZnhFqR8gnPKJ5RhQg3KFgQF16%2B9wANOoSl2BfutsIGpVTualVnLnoD%2FnJNGDZqvFn7dz8RtKtclTWAlBS3rF88odK1%2FXVVwd65FHXvdzab%2Bw88L4aGATU6S484tBK2pkjE7Ppg4E2AA3c3g56lmXWyLxeBRKfhsS8QR6BYSmvo4OO5Vw7AYyRyHAlnqvjgMyIYu69pagV%2ByM7bztzhIR&X-Amz-Signature=3b4668eb0d0de09c588f6da51fc45e959f98967241b6ec0ea93c60708e1ed573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666OFRSHM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIBuWpKV%2F4tLAdhQddertm2CSG84BStZ6mYlNkODagvz8AiEA4fhajQEeToIFC2zscxG2sIT9MfHIR%2BBnRaFTnCgPw48q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDDKThax2qNpVAZ1jMircA3FYcf3Y57Kw7FsPF8q73mW391qKXWFvgvc%2FeA7ZfpdnDeVkQlrtbEDqR9NyQLruzqoUSCwV%2BKNRJJ0cXXhE7VxLxq80M5sTT7PLNRns9TCKIVEyOC8BD2UQ8MIsIoHkGt%2B2jKrZjVIAS9RlpwfH88UFr7bpO0Y1gCvDKQRBIcQOGCWwoWRJyiAik8sMIzDJL%2FKT6aOQO%2FZw0cy0vPSTJF8xTZucKthh2V8EaV0D4VyQArETYT%2BRo6tvjFlHLdIijmO1Rb1aq%2BWeSoYjfeLPBsGTb5blYXAjZ0anv6%2FEWmTSyhVDLEHaH0l7AzxtskNxghve7AYo80QaA%2F5QcVagB0oVflrg8M9IR6BQXJLI11Ml6N%2BYi5sOy2T52%2FqKxzkq2KYHNW1UQAH6EaJvBTpLrz7v6gve5P9j8tuQkjInAVnucj7CqQU2liH4xJf1UaTF0SHDwRsg90wirYsEclSRMhRkb0r8Karyj%2FamOF7dD0k3IER%2FhrhGe793Ky3rulLbkXicmKrXnhv44%2BAECNQpyXiMr66x4%2FTl8ypNB4dqQrI1eIhYsdCqt%2FmF7V5hoURnBfbuoPTZ33EWmoRI8Rdl%2F47XN7rIWxULGRvSP1JZz76rMAIdYy602za9tvdvMLXClM8GOqUBw85brtVZlLDqsePYmkLr9MEJmAirKHzrV7%2BqnpYSZjTSv0hXTIKzo7FLK%2FNtsIOCxOrQ1ra9IdzV1sOZWXRA6BGFeUrJ1tB0GKofxcrf6FbzCVn%2FMwJo%2Fl85kIPJ3A0etR9aH8VSEtVXsetpJhBJb1%2B%2BVMO5OaBlNtKGvcWhrG%2FSHiPNxqViFidm%2BPSQcRyG6iZnLGLn3mlr1x%2BIQaQOb%2BeAhwtP&X-Amz-Signature=4370fc2024cb3e02cd9dc28cbffabcb3217008c4eb0c0ecb01630a42e807784f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSJPWFU4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDkNIXEB685bKsg%2FKrQqSwBcIeqqv3JfFK4PREeT%2FDw2QIgVsk%2F72LBiyY5mHJzo%2FLgGLqPOKIpjD4BfQitmbHxjcEq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDEIDhidXoMEFSRvgpSrcA9SQK9Lif6zX1RZ8kfaICeH%2FGtRZu0JXDSz%2BnSFtVuf2FxrVJekOfqD9jzluz5wj1BXjKmHd4pv7vK%2Fb%2FSvTVqBiXvYDMKyac7ePa3cKoj9WzMhIiNn4tnFV0qE9mlL5g7S5blZ8opYdNzyeKSs1XjTNzfSrwLyol0PcQ3n8NmXOjXRaRXTERCWzHj%2BepbdlB6IYyAxI%2BXSvF3p46%2BQHKwI70XVTV0oIfTk%2BzDsI61xmJHgIxmUdM%2F7gwZb4lLQSFtb8PImHhjcQYwrmSgLaXGbIoLRE2l0gJpyVvZ%2Fe2h7MRMCSfqhCCG7W1sIhf5nKNIUU4Xf4yzB4TwwZ9khIx%2FZhl5ALjbYjNm7HtjOPuePZxONXjF7cZErBBiKpVLWSYKigH2%2BZd7MGvjtvsy9artfOc6ojbgBzav9YWVmWJzociTUJ%2FqsefhxMakl12MgpD5%2F%2FxuXaM0zh9lBLk1UCuIPkTxdNemrQplpwzl2MhkNwkwnykdzf4GTh4o3FFMjmq7hsTFnsJnNXvscqrRWq2QCsjAbZkgHKpLvkJMRWa3W8vIXg1SNrPrVd6THNhOXe6Ypmx6QCVFQBMJYLw2bmEucqq%2F%2BjieQfbVJTDMSYeQXJjOoRR8eKvgu%2BsnD%2BMP3BlM8GOqUBPWNcDpwYgZLDlLHv1K%2Bh%2BrPau4rz23UNFzFbRsOMefw4O7Ktk%2BeQ7DZqP203nB8mnEc46lTGHld2gyy1NDUzGg2y%2FkjIJptICSmTUzbJh%2BafNUsjaJaluyasSDXNU86VklTijF2UDx7S3hXDTpNl1wh1o0Nnl9dZnfCeQanaD0lAk8PheFwBeznShvyCf8uy5lAal9aNcsB8X%2FetT1WjoCT7lF%2BK&X-Amz-Signature=178142c44e8c0a7d964d137d31012c7ce8481ae1e2eac869c4ca0c62b9987e50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSJPWFU4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDkNIXEB685bKsg%2FKrQqSwBcIeqqv3JfFK4PREeT%2FDw2QIgVsk%2F72LBiyY5mHJzo%2FLgGLqPOKIpjD4BfQitmbHxjcEq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDEIDhidXoMEFSRvgpSrcA9SQK9Lif6zX1RZ8kfaICeH%2FGtRZu0JXDSz%2BnSFtVuf2FxrVJekOfqD9jzluz5wj1BXjKmHd4pv7vK%2Fb%2FSvTVqBiXvYDMKyac7ePa3cKoj9WzMhIiNn4tnFV0qE9mlL5g7S5blZ8opYdNzyeKSs1XjTNzfSrwLyol0PcQ3n8NmXOjXRaRXTERCWzHj%2BepbdlB6IYyAxI%2BXSvF3p46%2BQHKwI70XVTV0oIfTk%2BzDsI61xmJHgIxmUdM%2F7gwZb4lLQSFtb8PImHhjcQYwrmSgLaXGbIoLRE2l0gJpyVvZ%2Fe2h7MRMCSfqhCCG7W1sIhf5nKNIUU4Xf4yzB4TwwZ9khIx%2FZhl5ALjbYjNm7HtjOPuePZxONXjF7cZErBBiKpVLWSYKigH2%2BZd7MGvjtvsy9artfOc6ojbgBzav9YWVmWJzociTUJ%2FqsefhxMakl12MgpD5%2F%2FxuXaM0zh9lBLk1UCuIPkTxdNemrQplpwzl2MhkNwkwnykdzf4GTh4o3FFMjmq7hsTFnsJnNXvscqrRWq2QCsjAbZkgHKpLvkJMRWa3W8vIXg1SNrPrVd6THNhOXe6Ypmx6QCVFQBMJYLw2bmEucqq%2F%2BjieQfbVJTDMSYeQXJjOoRR8eKvgu%2BsnD%2BMP3BlM8GOqUBPWNcDpwYgZLDlLHv1K%2Bh%2BrPau4rz23UNFzFbRsOMefw4O7Ktk%2BeQ7DZqP203nB8mnEc46lTGHld2gyy1NDUzGg2y%2FkjIJptICSmTUzbJh%2BafNUsjaJaluyasSDXNU86VklTijF2UDx7S3hXDTpNl1wh1o0Nnl9dZnfCeQanaD0lAk8PheFwBeznShvyCf8uy5lAal9aNcsB8X%2FetT1WjoCT7lF%2BK&X-Amz-Signature=03530298b0cc702e8c128f914575de0a03b89af601b2e167867e8b5f2437d9e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWT45WVI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDftn29cK1Qy8daTUE4cKobp%2FpVavESL91b0AYIw3C%2BqQIhAJTNud1wiHydp62bsRNeE2Wsn837MaSnU3CQPj8iY330Kv8DCAwQABoMNjM3NDIzMTgzODA1IgxJLfhN9D7dcJWM2mQq3APoDUUYaKH2YkjcA%2FXYYtqVDWulC5alI%2FOceYpREcF7JVFt8%2B6jlgDjjQbQmbF60EZp9J%2BaU%2BT%2BlSu1zsvQroEJDnCn6dwNMtFkBRDZe14k7Uw5srEz2jZpMMNt9YDLfOAFKR1bFPvz4m8w7LtGSZ10UK1SZ%2F9oIfAXeGzs%2FfOR59IqaVzTKBkmVsE8kLIhlvZ%2BGLy9J33%2F91NYSor7taBvCjOc%2FnLg1zuFq%2FO%2BLtfTmh8iW%2Bz0mKJH2l0Ex%2FtmVkMfHQxJ9tENB2AXgCzFzH03yO%2B%2F76WMEEKk3dGbacXWE7mL1HchA1031PJY2p4ugktQ3GJxN%2FEejXukHS8i6%2FBcuYazsWOUcJGUnjqf4%2FhtgOZR4q7R6gz7WxW0FaqmYj4jYJN4HwixxWHkDijhYGw91XlwJrciDx%2FOVPZIkgYEmClNIHIVLEXeoLBW84LMGNSv7MGMH2%2BlF3ereeASyX7WNwchuDfHGYW%2FFAH7pEdtwb0UQcsWOaVLV%2BZlxzN5DAsCl7gjMh6nJukEShuZ69o5vbW2ildX%2FhfufVGF5ZsCKHhX6By1ezameqD35MnEIb9g%2BZndYGk8xk7xu2tle8v16tOTkbEyEl85qt9EdMxx6HaEeXymRbyXSCKjVTCgwpTPBjqkAQlzbm%2BXOj3Kllfi1xpdYcyAm5DJicurG5rL6yUIdzYm4EfCHdJxVRy1Hxrtvd5PHZGmg%2Fy8dxk1VbKBYbEZmgkTs3UvHpmwxGXyJUC779oVU9LeBDhJz0Bykh0wzNJnCN%2Foj7yhbO90yH4b6Ee8RK6%2BipHSJnBGrcApG2qxYPk3V8z1dljlF7vQsz6QoYpmX3EmOmmOkMua%2Fob2FueeBCjOfVOp&X-Amz-Signature=8270f084a5ac27c60982617dd0ddacfb2c13199a9b2131864bbb21fafa914249&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MPQZFPF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDxGeJ3xbekuBoVkML0V%2FoBmsWdbCPN6lf5CJaJa0LGrgIgTRnSkuqO%2BClesPBnH0s6pfUuGBhjQB5wvdYUsbq4p5wq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDH0nMZXGfp%2FphLWKrSrcA5dz5d%2FhYYmJNjLBVOyqOcpxxit6ZNYbwVUh4dVYqvHN%2BPBV8qDOWpnqSdSPTZO09Jl0imUgEBo5Kq%2BOPj0w3gy4YESA08CrLlWVXgnRIxlAWW8VllKZiV5wR7G3pZZZEG0kbaGmXigp6Y6IKDdN3eMfHMZ9fu1BXYv38a22U5fsAT7Ii1yH8ZOG%2B8Xjcc%2BbctDY9JIsqzJ8vP1qPeHEfRhBrBjlEqw9WCmUusaRQGcZ8Kck3NGqePvfMynq2Tatm%2B47uK1JqGw75VECFheVNrAnsqFrkLFZGPGV0i%2FCCfYPzPBKlz%2FlnO%2BbW%2FzJRJMnkTw6hZAke84tGPuc47A7HhmvWrjzS0KBI11jJFu7VfDajwVHqdWRBzIA11ttZDhvJcK2TbZXQhbRBcwXPP7plYgqoW6UGNspcVF9Y4gFHmH76KtULytfJK%2FVfyPXYFLEbzH96lmyMjrdrpp6murc8t7qVaTsHc7Ann3Mv6cQl65GgjoKf7hdmkksmMFgjemarHteDSFx7Vnen3u9BaZOPIksXUcI%2FsxoqkL1oR%2Fp7LmWmbHGlYFziK4A7cJ1DIRNkY4o3n1gDquYwZZyls7TTou331hG1ce4rAIuNjT2Ljjd240X%2FaZWPbe1jjQTMKjAlM8GOqUBkLSOTXJyn8qVmmy2%2B4mc422o7mW9q5%2FsOoq4ZklCB1ojqI3ojVBm1CkskGW0ZUtcoRzXRn63ut%2BR97JTlklC1CE7eclXpCf7JAD6aNd2j%2B%2FQMjtBELvrljBfgiWHydPSr%2FM41s2Pj0hfM9kzxQsT4U2HfzQ7YZlKlUpaJgZWim%2FzQOwgkX4Yzt075R48OZE79oW0h274lUXn9Q91f9ze6zIan2bx&X-Amz-Signature=3cb0db3231b5de11027b67cbf1d7b89d6df21940c738fb4fabca2f153f60ce13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X462DYTZ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIHmIbMpZR0xYp%2F8dXE%2F%2BXznqaCFvDQg6oQBcs%2FNdam0tAiEAmImwM5yjSRGvQf0rFSpl4gheIHbrY7K24TI3e6dHpOQq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDVn0G4%2F8Wwx0ZOzvircA7xM3OVuCtslVxxXylKNJl%2F2vpvR%2F9Z4fy%2BUQC9UnSHt5doF3lGOHUrsYuMcqEu0DtjisAJZaR8Eehk5feaFSnmTiH%2FOKyb%2BxPDf4AnI4mW6jb%2BeKd2V0lDhlRznYJOMN3oQj6zQTDT9BXy%2FB5RiYj%2FvppuQwG%2BfWwNP9k41Dvi9UdWPezks9AWCxdeOoHedj54AFIZQy8GneG3eFsMpRLyrGHzw0xYN9X8zOEki%2FnZIp2W7oaxa3pxb%2Bzl5gagcdtS355D8y1K0%2Fzf8QSZMKWcx8Cwj4RBi5QPUB4jb7hpyk1shAuQiqHyg55%2B783jhpVxV2dCHMy2cHgyzICnPuGcKIofurTIjOtBPoHIeEvAel5U4SvHzvVHpRSjC1gQtVsgXfz3B0%2BNfdGRxhYWjx%2Bl1micmoWUQnbVbBNt%2B%2BLZArQOY2k7SKJIm16lumdJMM%2Fav5mvlNdGamreoSZM6Rl9hpJyhLF2Ggh2r8MHi3lM1muju0jN3%2FXlI%2BDlcy6qWhb6tA94IaW6pv6I%2BvC6c%2FUdgN2EZh%2B%2Bql4GN9%2Bdoc6%2B3inA3RRBNcMw%2FXPURyObuFnqnK1wp%2FEPyR7ns6FN%2Fj3lgEsYERMx1GBM5Djef3sBMFWpaohCP7PupSFJZMKKXlc8GOqUBn2zTYx7l3f%2FeRDsIkZ6%2BtIJOxaFEd6KElAM3wnTOydaZmFAhv6PIEr9NBBMMDk6%2BnJ8AmHAyAwGwAnu5%2BSjDrhPy%2BYKB6wwUbY1vxmJQUphNoXUhW7KKo6kIETMMPuthA%2FBKwmFmjocQkCikm1h5d9L4m7q9wrrNNuxXLrIHOcIeUka3n6wYwHbFExRUfcUBXoXgkexTL%2BfUZHs3TIPEAe5w0Oj2&X-Amz-Signature=e544069d905b5f8658c9700309f8d07487fb22e6849f7411edbe871c6ae00124&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CABMY7R%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIHyw2nySrLwIhfeswwlmCG6mE%2FZoy%2F5O3eiDeVrmP0wuAiEA64P8xLSymARvqYlmBULkjdj7A2L5EaS3Jh72jndHLx4q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDNMUNDS26JJpYKTt%2BCrcA3MBZXbhViV%2FZT9JIzJ6d9jw3IKUNUiNxlig%2FR%2FZJeblkC%2BEXIXjTd0zBvlnNUcJv7m%2BlpJYSTINzVT0NMFfWIalXD6YtoJ%2BU3V50WyGaUKHJFXhOs%2FDO%2BREN6w9Vf02mejIST9fvCNkspaI1zmGASWZOt7PMsmpx7r%2BWCwuN1bMzXLyXt1%2Ba1yN%2BLhCRNGFK6CtUKv0%2FpFusipdzD6keSx9J8gj7ZkL8o%2BPC5DAbZMwOcRuvQ%2FJby3pOYTh5G5qTTAz3hZRvW7Fhc0uzC4zB2S1TjIigM4VRIcazXSRYw4m%2BZLeyD5Hp3QDK2U4kVU9AHrJPoYaNdxanzS8pSfkNZAHqhp1T3vZ7lqeqAg4kA0rwGsUk2ijHf5qs1NjHMTW5eMnE%2FxEVP7uoPxDUrcWJry1%2B3CzkuBBQimkI7WaP3IMUW%2Fj6fg6lqbrvSexi%2Fxa1kuCq83C2sdmn1sX8MNnwS6NU%2FCa4%2B1szW4c0YoCkU09%2FIx12iEFzG%2BpLKimB1K1uhn6Wdj22vMC3vAi4FwyrhUnY0Fsodur6q303Oem%2BcDRs6cUP26P%2BD0gflaXtowKjOMiZeiw8Tb8%2BsZxbaa1CDk4mQYTTphRgUSG%2F3dwmlrZtIJGuMxXK%2BMp9m96MJuelc8GOqUBvoRO0eYVReJX8Hl5oa5aUYD10kIyc3Eu%2FyhSb631cSVLR9PxLpfYopwL1Ah2Jr913QYsTwh6MNCm%2Fpju2B7H79dV2iyPB7sxBvru9epLINynQHX9m%2BPv89yerQG0srhiR0U41nmn1YP18x9EMCcJL1KkWdB3RrH2BDCYGqX1QZZfhXT1%2BkfllQ%2BdEug6FmTw2o4Y0nXd3r1fczkGnTWGCmbvfJ44&X-Amz-Signature=1d5a51332364c8f3f9ede36765e5a0b951b83892d69a1e1910499323fe8566d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CABMY7R%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIHyw2nySrLwIhfeswwlmCG6mE%2FZoy%2F5O3eiDeVrmP0wuAiEA64P8xLSymARvqYlmBULkjdj7A2L5EaS3Jh72jndHLx4q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDNMUNDS26JJpYKTt%2BCrcA3MBZXbhViV%2FZT9JIzJ6d9jw3IKUNUiNxlig%2FR%2FZJeblkC%2BEXIXjTd0zBvlnNUcJv7m%2BlpJYSTINzVT0NMFfWIalXD6YtoJ%2BU3V50WyGaUKHJFXhOs%2FDO%2BREN6w9Vf02mejIST9fvCNkspaI1zmGASWZOt7PMsmpx7r%2BWCwuN1bMzXLyXt1%2Ba1yN%2BLhCRNGFK6CtUKv0%2FpFusipdzD6keSx9J8gj7ZkL8o%2BPC5DAbZMwOcRuvQ%2FJby3pOYTh5G5qTTAz3hZRvW7Fhc0uzC4zB2S1TjIigM4VRIcazXSRYw4m%2BZLeyD5Hp3QDK2U4kVU9AHrJPoYaNdxanzS8pSfkNZAHqhp1T3vZ7lqeqAg4kA0rwGsUk2ijHf5qs1NjHMTW5eMnE%2FxEVP7uoPxDUrcWJry1%2B3CzkuBBQimkI7WaP3IMUW%2Fj6fg6lqbrvSexi%2Fxa1kuCq83C2sdmn1sX8MNnwS6NU%2FCa4%2B1szW4c0YoCkU09%2FIx12iEFzG%2BpLKimB1K1uhn6Wdj22vMC3vAi4FwyrhUnY0Fsodur6q303Oem%2BcDRs6cUP26P%2BD0gflaXtowKjOMiZeiw8Tb8%2BsZxbaa1CDk4mQYTTphRgUSG%2F3dwmlrZtIJGuMxXK%2BMp9m96MJuelc8GOqUBvoRO0eYVReJX8Hl5oa5aUYD10kIyc3Eu%2FyhSb631cSVLR9PxLpfYopwL1Ah2Jr913QYsTwh6MNCm%2Fpju2B7H79dV2iyPB7sxBvru9epLINynQHX9m%2BPv89yerQG0srhiR0U41nmn1YP18x9EMCcJL1KkWdB3RrH2BDCYGqX1QZZfhXT1%2BkfllQ%2BdEug6FmTw2o4Y0nXd3r1fczkGnTWGCmbvfJ44&X-Amz-Signature=db509f136b85ad95dac039f563899f21bc8749cf2e9c6bd2453a1ce5a37389c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYOPOMDV%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCICZ3P%2B%2BBJPicSjLiRxF%2Ba5OxGnMCQy%2FLu9SxlDuCRJ2QAiBZRvjgsxbK3ApuVglbiZjTncH%2BzH%2FG%2BYRrDVDJ5ZLX1Sr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMWU3aA3SQ4aZK4CWBKtwDMg0zsVZJAqKn5rN1ZRC9eDR3yDIt1EIrAX%2BjQH4rXd2HTrC2jgmvD6G1D3PHXNAJ34HZxThsweaNLK37vEFKqNfg7hCyc168kzMFxeLfyWvsDaogTjEdAAkbmartoRMw0Qctm2fnOOMV%2B31Cn1rrFdjXeUagtkpurEV225iKYiEg%2F2dIEdOIo8Pz8z5hdHNysjP0ZxiTbj8op7qvagpqWfns4l9N8VdX0tevMyzGeznNJVQpy92MBtKxQ7k%2BqR5e9MzruXYtJaJx2uBjM7Hlfu7swPsOueogoymhh4lRESrNMdovJHWoXMJe1X06QcnEz%2FwR24sh0%2BKKPQG0of0Ti%2Fu2%2FmMWa%2F1sBmfdpUu5Lx2J80Vz3hDfMvUkc7z8nBQooKTwmpGK%2BTUpjcNqOh30C4%2BgreXLZGrJZnqRrxGo6jFDkaoFAD76NFzI8ZZvbkX9SmB8CYii7ebH0P0GWmuKqYw64HCBtJtG5yTPc6Z0qPJ0w5AZwkfyXdaa7y7pF6wMkSl%2F9hFAivtKKoPNcHcbqkdDeyYIiNi%2BDQ4El73DWAYteFCWUh%2BaWLVqWeINeorumpFYlmcEO2n8w1z1fTPTH7R6ilYE7OJI4VC%2BN0fsRKwWMGzAGbzyUb1UBr4w%2FL%2BUzwY6pgFkKTvbo2KH6ovn%2FryWp2Oc2WkBO%2FlgYAVnp4mKVHYR0iM1fdu9WK8IVKLC4PCNz7NzR2WLDOm%2B%2FJUBC7%2BHYvbhrGlNweiYyKI828a1RJrSCHKVPltsR2z9ePt%2BnoJeCgX8fr5Oev1iqUW66GmBF%2FygojWL0OahbfYjybZkF3CAgbbobxVf2z%2BSEO5zrryuriHYEfA%2BPtgJIUx1k5vTx2MvCMOnxdpX&X-Amz-Signature=2db2deeabaec348141360366c64c7af570558925f3b69f5c495b64c48ad12a51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CDGAVMS%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCPaXZhrSGv83A947UH%2FJpFWz6BunGPLtmxD4HrkOEyJQIhANMwUq1%2FYBz9oRaEs66Wuil93zC40LP9qN4tVhypmuJwKv8DCAwQABoMNjM3NDIzMTgzODA1IgxG4hNDS%2FjRygyzycgq3AO82QLVpPOzlpSmJmybFv4EpRMiOEMe%2FZxhPxGPD%2BHgej7KLUpOVKUamEaXAMAmtP%2BDBidrPl30EKbqNle6%2FG%2Bf5xIa56Bo8hn1JAyoSlomdVg5bk5YpTSd%2BITRfZ4tQK46OCzike0KQ1BKHMVMM%2FgeAp4kXgSlnVFgSZAI6rf8m%2BN6smf9F9n%2F9E%2FqJdGI02B4fVgzJkS9xng6EdMgvJgDvS%2BChdZ9WXRuGz050JQk2QsHzjBVYuhH%2BmQtaJlOdQ769eolTMmMiEcfJxw9ciCX2rA%2Fjkr36mwfosmR1sbcVaAqqySJM%2F7Wmh5PIK9lVkpn%2FL8kaHLqNBx%2BSNsiDH3jUaPrTFkbluQMVbXxqwM9ngJe3stXuOIyvX1vLUxfgPssz%2BevBML06GcJwW40BQTvqV%2BEgfGP2aT1lN%2BPXBZnhlJANgBPYT7AhzMJzLzAcnXXJogAmJXG2Zbjt7K2cKPRuoc1u18aEPRYZR1Qb6BBfKMq4JFyfIuxqzkMSwRLSxYnTLSmEAaMQql5bWyG5YSRbwubC0kad1GGUa3TVEl3YYmNduIV5qoIVVFBp1Bdsf0qwfICWr1YVFU7c%2FLIYBCjBwCmqD0q1mqvAdZiWlVvq3Xf4IBLPfTCDnZPvDC%2FwJTPBjqkAafYR5hdN%2Ff%2FSomnK4K4iMTyZMqTVHWlRVf64aGpTMjfmVssxXbxQo34AIoMNQ1qRZ7jhJHp0hZV%2BRuuyeFvD4LcuBU4PsLF6otn4uhkT9GZl%2BZTcrp%2F0o7upCzqq4%2Bg3%2BX7khX549xsPcsYwqDdZVQGxx3GUem2LeOYIa9eZq6bv6la0TSO8XheQZT4c6o1zpKQAisrj5kqigccXw7IPQX%2FCtp6&X-Amz-Signature=c40928218b82b126ee253dac0b61db2ac08bbd7492fc43c719be5cfa9be9c0bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CDGAVMS%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCPaXZhrSGv83A947UH%2FJpFWz6BunGPLtmxD4HrkOEyJQIhANMwUq1%2FYBz9oRaEs66Wuil93zC40LP9qN4tVhypmuJwKv8DCAwQABoMNjM3NDIzMTgzODA1IgxG4hNDS%2FjRygyzycgq3AO82QLVpPOzlpSmJmybFv4EpRMiOEMe%2FZxhPxGPD%2BHgej7KLUpOVKUamEaXAMAmtP%2BDBidrPl30EKbqNle6%2FG%2Bf5xIa56Bo8hn1JAyoSlomdVg5bk5YpTSd%2BITRfZ4tQK46OCzike0KQ1BKHMVMM%2FgeAp4kXgSlnVFgSZAI6rf8m%2BN6smf9F9n%2F9E%2FqJdGI02B4fVgzJkS9xng6EdMgvJgDvS%2BChdZ9WXRuGz050JQk2QsHzjBVYuhH%2BmQtaJlOdQ769eolTMmMiEcfJxw9ciCX2rA%2Fjkr36mwfosmR1sbcVaAqqySJM%2F7Wmh5PIK9lVkpn%2FL8kaHLqNBx%2BSNsiDH3jUaPrTFkbluQMVbXxqwM9ngJe3stXuOIyvX1vLUxfgPssz%2BevBML06GcJwW40BQTvqV%2BEgfGP2aT1lN%2BPXBZnhlJANgBPYT7AhzMJzLzAcnXXJogAmJXG2Zbjt7K2cKPRuoc1u18aEPRYZR1Qb6BBfKMq4JFyfIuxqzkMSwRLSxYnTLSmEAaMQql5bWyG5YSRbwubC0kad1GGUa3TVEl3YYmNduIV5qoIVVFBp1Bdsf0qwfICWr1YVFU7c%2FLIYBCjBwCmqD0q1mqvAdZiWlVvq3Xf4IBLPfTCDnZPvDC%2FwJTPBjqkAafYR5hdN%2Ff%2FSomnK4K4iMTyZMqTVHWlRVf64aGpTMjfmVssxXbxQo34AIoMNQ1qRZ7jhJHp0hZV%2BRuuyeFvD4LcuBU4PsLF6otn4uhkT9GZl%2BZTcrp%2F0o7upCzqq4%2Bg3%2BX7khX549xsPcsYwqDdZVQGxx3GUem2LeOYIa9eZq6bv6la0TSO8XheQZT4c6o1zpKQAisrj5kqigccXw7IPQX%2FCtp6&X-Amz-Signature=c40928218b82b126ee253dac0b61db2ac08bbd7492fc43c719be5cfa9be9c0bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B2SS7HB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T222028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCICA%2F%2BdBfDdMBN1O%2FhkgKjJv1C0AIcdL0YJ32ZXBI7FhoAiBAZu8SMfG5zzQ1CkKbYmSzQhuh40suuorhlw5MKOVwair%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMvM4tc7TIUQdqJU9%2BKtwDyo3ZtfAgigITSAw4I%2FLvjmTe6fAtpKayhe%2BaLOq4LynWsweIy0c%2Bi5OfSX9kcQbYFwt7fkLugrfxwOZ0PPXWCkhHbbx2QB%2B8kvYz51ySWiDkBcLhK%2BJLahhoVeHh1jf%2FJ56V9L1hyux0MZgoF7ABG42A7juYRBQE0zs0opaSN2mtVtSqhOTRSUF0Z8zdEuUijiATbRE8EmcZScHscg%2FYMQijBpDJJeP2NoESg9A4tM7YJZV6XFn31K9x9QAocUSzc8D7e990GE9e89yw%2Bdf%2F94epAfimflQC0VJs9peYpTnxjIwTrVpX0OT2AOmJGe7HxOuJAeTnS06TvNeYsE1gDY6SY2T2a4jZ2%2F%2BR9o0zQkCjjphziiYnbthT3Awf2gED8JIi5mQn%2FKutk5s0dUelLt4DdtH52nnSYpVzKr4cbnqvL9PuGwrR1qWHLG6C9AIkCPyg5OCRwU6kARIOg7cj2HQ0V%2BavHWP6elAQauAMii37upcngjimiB57gGNKUB%2B3pwXZKbIEFfOUnE6xJ9MMdcKFIbqnxEfN1IBWVsFP7UnGev7DNrP5mdstKxLZJYF6OEfxiU5%2BK6gq8Om7xOMZ4aB69czSi6iYYVcveH72CabQVCf7%2FgWEUUjwqAwwo8CUzwY6pgG%2B%2FCjARAANeuSc%2Fd8J8MvlLMF7eUmR5Ug2DsPMy2fst4IwgcbYFwurGDWKj3VZQAZUfgoemxSaAl0oO2DBlBSanuZOTDClAHbTJ7rLlwwAofVmyiklzcGSc7LjabytWrWIf9ZR3u%2BwvtbnOJL7H8fvXnlxQoaecjY3EkpnnVCBx%2BBueC0kxMnuOb3RI5xcjZxtY1hfdISMJ%2Bgzicsp7E8J7MGKHvUr&X-Amz-Signature=bbaa107e4542645bf518f99f47a54e2a7865bf1c4ad85a6b5748c43e2fb8c501&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

