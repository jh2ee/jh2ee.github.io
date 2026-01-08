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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YO2TC4QI%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICwLoE3Uh5uXvR9oKS9%2BVDn6JtiRXsjiogw00fzRPVBdAiBYqsTDzdJSy%2Ff%2Fcc9RfGOjl1UQHYevC4ZaCyIolL2klyqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwwdKvVcI1sRPbsTyKtwD4FWDFROQOc6R2uFWnygptagNsoiLrrcwnHQIyHxrv4Q9GqsLQ%2BweWPb3nLuOPE9A%2BTlUQ2GkmSGT5%2BYoeiXCK0aVp37lscxjVjGo%2BjQ6EsNl8FOTKIp%2F1W2LTPPscUrQAw9btQv1F9Z2VmaVpEg5YJhBU6NCkbZRmIvgfwoWE8F4JbxH8%2BMS%2B91Q45xWAVxGN0%2BmmkkkvUlzGEd4KRm3jxuIhS54VrROqgW5pG55pDQ1XysLSdVMibg2xtUeRbn5eqAuqq3C9nL1rJrhPQ1hY47l0dt87IQGSEV%2FjtzsM1mHVsmo0Wtg2RbTddhJE6oxvlYTlnyIl2TVYM9gZQfVYLnsiX0CLDU7xM8qbOHtsKjJgcxWGq%2Bu4t37E6pCqYjuviUhpMh9SYplbKDMmNZki4tN%2F6BcC0ckUTJ9mgOxRMCzKkIQGSN%2BeKpiCDrHf4LBVrHYG9Mwqx7JbGzpwHqCxXEVXrJJGTZpDVGDsgFeW%2FH3ZGkZrQKqatoth8XuP3UQtjlpoM5aw3gTJOrVSycnlW%2BLKJHpolLerkzsTzHTw74JwuR4740m6iA%2F%2FLwJLvQPoH4SlHoGE%2BPcralCNHHTlpsDt3OxYXRbgLVOTzUO7hujEKTFPyDDD4o4XBAw7tz9ygY6pgFDRcTLeveIQFHI3LiwN4IZk5QyyRr%2FNW5UWKQs23B3evKcaPss0ECzCn6mWAtL8Rnh6T0w4x%2F3Lgm2bVxSUlxI9RTvVgI9XGXh13m6sSbfYhMcQ6zQ4ElQWkV3QpIS9h0PQdHNX%2FukF0o1D%2Bl94uVUI0SuXmyCzo2nFh1auoQXSgKSZJj%2BY6IsGbKVq9DBQEiSoHqDH9H5xsw89IzHFtaF9EbnIdFN&X-Amz-Signature=51d3b8511f661243546d94ea7974a00847970f48fda8ab72a9ea30a375cec1ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YO2TC4QI%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICwLoE3Uh5uXvR9oKS9%2BVDn6JtiRXsjiogw00fzRPVBdAiBYqsTDzdJSy%2Ff%2Fcc9RfGOjl1UQHYevC4ZaCyIolL2klyqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMwwdKvVcI1sRPbsTyKtwD4FWDFROQOc6R2uFWnygptagNsoiLrrcwnHQIyHxrv4Q9GqsLQ%2BweWPb3nLuOPE9A%2BTlUQ2GkmSGT5%2BYoeiXCK0aVp37lscxjVjGo%2BjQ6EsNl8FOTKIp%2F1W2LTPPscUrQAw9btQv1F9Z2VmaVpEg5YJhBU6NCkbZRmIvgfwoWE8F4JbxH8%2BMS%2B91Q45xWAVxGN0%2BmmkkkvUlzGEd4KRm3jxuIhS54VrROqgW5pG55pDQ1XysLSdVMibg2xtUeRbn5eqAuqq3C9nL1rJrhPQ1hY47l0dt87IQGSEV%2FjtzsM1mHVsmo0Wtg2RbTddhJE6oxvlYTlnyIl2TVYM9gZQfVYLnsiX0CLDU7xM8qbOHtsKjJgcxWGq%2Bu4t37E6pCqYjuviUhpMh9SYplbKDMmNZki4tN%2F6BcC0ckUTJ9mgOxRMCzKkIQGSN%2BeKpiCDrHf4LBVrHYG9Mwqx7JbGzpwHqCxXEVXrJJGTZpDVGDsgFeW%2FH3ZGkZrQKqatoth8XuP3UQtjlpoM5aw3gTJOrVSycnlW%2BLKJHpolLerkzsTzHTw74JwuR4740m6iA%2F%2FLwJLvQPoH4SlHoGE%2BPcralCNHHTlpsDt3OxYXRbgLVOTzUO7hujEKTFPyDDD4o4XBAw7tz9ygY6pgFDRcTLeveIQFHI3LiwN4IZk5QyyRr%2FNW5UWKQs23B3evKcaPss0ECzCn6mWAtL8Rnh6T0w4x%2F3Lgm2bVxSUlxI9RTvVgI9XGXh13m6sSbfYhMcQ6zQ4ElQWkV3QpIS9h0PQdHNX%2FukF0o1D%2Bl94uVUI0SuXmyCzo2nFh1auoQXSgKSZJj%2BY6IsGbKVq9DBQEiSoHqDH9H5xsw89IzHFtaF9EbnIdFN&X-Amz-Signature=51d3b8511f661243546d94ea7974a00847970f48fda8ab72a9ea30a375cec1ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RANU5LL%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDw01HwDzwCP1Uv1JmsQk8B9ZH0sXlmgOU1XlxOy8tZUQIhAOmTZXlVwXhYkAlug%2BFqYJvS3qDcep4%2FhkWr7CXfvtwgKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzu9NADRxWJRpS4Niwq3AObdqwJsF2KvgyQpK3rjAjL5ksAMuGa4D88XNB56FtO3CTEblIttbOcTJXCRdCGy%2B44B2%2Bz9NSp2e1hAHWgC2tA0UlVJmkayKRpYlZpMHVC7NzRKlfcoKTfXAhqYHLXHtiUVxucpdL5VZTfmla0K3lUgbxIB3EFuirP067qCPI%2FVx498or4NtVbWUhCCseNB3VEe5B5E7mHpELQbHbZ0VwwbgysCWk97tvsLwaSYR7TfzjKpX7T8MBSJCANfYQgb1YrlP37soGrzVkPBmDyYEcFRHXUIt3VVAVsQCvelFDzZimhsoDstL0jrw8fg8k%2B9k4omwASxjkXzdnf5Jjm3jZw5jYSwi6avSQImUR0U7yox%2BtRgv7uc5r94tEcWluR9ctrX%2FBFOnRl6vNWzJEhhpxgtmBtMVxIjJmNfXnXb1dJoUlueM30f89dKB8YUfp8ERkfrgFOU0p%2BCg9Rm8KBQwvd5NM%2B%2FSVB%2ByvG3uQBjcIeiPKzZStz5pgZGXTJifCvQkA5jJ4olaO2crI8p8xPCtZ%2FvZYtKV0EU1Xv0kX1ta2kzRiHxUH3fLJDSjAod67WY1MklMzxwOJpi31pJsWsq433F07glPwDWUs3mek4%2Bw87AQWCjgk%2BKy9UuIWTIzDI3P3KBjqkARTi5jAQMMnoCr1sz%2BaDpZKxdZGkI6aGOsZtiWcuWpzPapXV8KycabgD9MH4VI261%2F%2BKhhZUfjIdkDBMMcNyd0bb568v5f1EfLDL7qfyq2b2o%2BJwgSC5ZrqQQXkLQs84kMHrWMqoNyisBdMwbQGc04q94Jzwq4i%2FTyNgB3JD4%2FOMeOsNcd1qQabPZ%2Bd4dwv%2B0FrSF%2F8xVW%2Fp5t2SOUil%2F3KKgXxz&X-Amz-Signature=209706ac3a8837514bdc82c1f6f56be8af708f6e238e82bbf2cbf5e780a28fb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCDFBV2G%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICXJWCSXWGTP0gfGEx2st6QadLIhpBPGA5J9pzg1mY9TAiEAkOBKNLTRKXMvI0E5zcqaEu3KnMMc%2FnlGJ35Et9pVFEEqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJO3SFEq0IADI9AdRircA5dsY5fISjdws2KZ8lVIi51CCYrJVL8fNykqKUlDFujxBeqbm%2Bcx1U8akdJxYvqb3mMv1Ts7iVuw2l%2F2HGgE759r9z6IuXWeWs4QdoLIilJF%2BbB4VL5W6JqO%2BzFh4Xf0u7x6ZaYePzJtJ8iJEbIMTp0ViJbcFdwHs5yKz5s1B4SjwTSp6iQl53Wj4CDpEGQU6bcYtjZd2IG1KRPZNHHW6N7rq1VPxyaKyhRlv6oAK4SX9Vq4H5nmZAaJX7x2mbKw5PA5XXbIvkke4SAx0O%2Fpc%2FwjHM1YLukUjvJMJytzNzqgEdXVMvepELN%2B5eTHTIKM8%2BN5ENTZ2%2FKa4zPg0%2FLGWNtHdGeA%2FaekwvzOoXpzYMw8tkioHOaiyIelPTp0w8Ls%2Bwx8wGLjiGo1O%2FFrm2UMd03Kb9XcBT0C72KcrXUYvhEyq4%2FVC7PmSLAkz1dtGIB0Wae%2FSx4UCLiQt%2F39aHa8KqMjRxAyyTE7p12gwVJrncnVZalezQSwqZlKGJoDwMkfXFQNLQS%2F9WpgrCwt1vZYGTr6nvZFgGFbxz3SE32MXQVyC5v40fe4BvYVp1yW5q5D0oeJ1rGlJqjtD8BI4H36kmOc9rOQU8Y%2Bjcml9Szf6rqoBWNMFVUFAJHBd5IRMLvc%2FcoGOqUBg2mTfxOZT6XFyP8sSW5RN8qUZb95Uzr13u%2BwnKNE3nVRDXPyjD4Z5Lvc5QYXb%2BTkjG7%2BYOPj3Bbr5eY6gx1VMmTY4gmItLfcBhxEDAGt%2FPEJym6eBNl2hROC1CzzbcGH%2FzXJxaWvXXmQ1ttFXSEUgcShIXI3uzeEYK2Dr8tWAHFvjEum2SrvSsbCRviExmZURRKFYdoX6m6M2pz6mdM6PwOWboKO&X-Amz-Signature=cafb3ff2b782b6011e351ca5c0743a7a4fc1ffe9d2e40e25358c32f00e9d8b5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCDFBV2G%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICXJWCSXWGTP0gfGEx2st6QadLIhpBPGA5J9pzg1mY9TAiEAkOBKNLTRKXMvI0E5zcqaEu3KnMMc%2FnlGJ35Et9pVFEEqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJO3SFEq0IADI9AdRircA5dsY5fISjdws2KZ8lVIi51CCYrJVL8fNykqKUlDFujxBeqbm%2Bcx1U8akdJxYvqb3mMv1Ts7iVuw2l%2F2HGgE759r9z6IuXWeWs4QdoLIilJF%2BbB4VL5W6JqO%2BzFh4Xf0u7x6ZaYePzJtJ8iJEbIMTp0ViJbcFdwHs5yKz5s1B4SjwTSp6iQl53Wj4CDpEGQU6bcYtjZd2IG1KRPZNHHW6N7rq1VPxyaKyhRlv6oAK4SX9Vq4H5nmZAaJX7x2mbKw5PA5XXbIvkke4SAx0O%2Fpc%2FwjHM1YLukUjvJMJytzNzqgEdXVMvepELN%2B5eTHTIKM8%2BN5ENTZ2%2FKa4zPg0%2FLGWNtHdGeA%2FaekwvzOoXpzYMw8tkioHOaiyIelPTp0w8Ls%2Bwx8wGLjiGo1O%2FFrm2UMd03Kb9XcBT0C72KcrXUYvhEyq4%2FVC7PmSLAkz1dtGIB0Wae%2FSx4UCLiQt%2F39aHa8KqMjRxAyyTE7p12gwVJrncnVZalezQSwqZlKGJoDwMkfXFQNLQS%2F9WpgrCwt1vZYGTr6nvZFgGFbxz3SE32MXQVyC5v40fe4BvYVp1yW5q5D0oeJ1rGlJqjtD8BI4H36kmOc9rOQU8Y%2Bjcml9Szf6rqoBWNMFVUFAJHBd5IRMLvc%2FcoGOqUBg2mTfxOZT6XFyP8sSW5RN8qUZb95Uzr13u%2BwnKNE3nVRDXPyjD4Z5Lvc5QYXb%2BTkjG7%2BYOPj3Bbr5eY6gx1VMmTY4gmItLfcBhxEDAGt%2FPEJym6eBNl2hROC1CzzbcGH%2FzXJxaWvXXmQ1ttFXSEUgcShIXI3uzeEYK2Dr8tWAHFvjEum2SrvSsbCRviExmZURRKFYdoX6m6M2pz6mdM6PwOWboKO&X-Amz-Signature=53298c8ea0eafdce0b40c1b27a5b06d057453d085cb0a5fb7e17e6b874513287&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDFUPRWH%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBLzlBojSd%2FeVPD85habBF4RGo98cRjufdgWo4fGnSdaAiEAliR0ZMFhCMuiGHm2rQNoWm1Y5JYKxyfhYdQW6avc7GgqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD2%2BEsp%2FQrPZiiu1iircAxpt1J6GfQhM8zhk6gvNo1GnyfiKgMjiYqHiM%2BYfQlNvP%2FTAyiYXajhhMnaE4I1H%2BGGJrqBWAJe7MQtNNucgv2ULuApvTXbzy5l5knLgbDa7MiKQpD%2BBHAkDtq%2FShPY%2BKHdu8j4gSHCfFVFWLXTjhTTFyYYT5dkugcNrJIj7sdPixETC9ooyBQ4rhscDXRmQsDA6Y2OuVosGdXJtQvPJjk5HUNy38MjqnoJNGOoIS0lbwHSjRPPYShuhEQJt8B20P7HWvQ3YNYUyfkewFZOjSL7bxAMEOzLXB%2BSdKa53hGAWDy%2Fzm6g6Ji5M9ZID%2BI8rFIX3%2FB%2BK7KsUxQ1drbmQ5fysG0CmgGAexVSjVquXy4EsW6kiI3i7caQyWr46PQadmvqkVbLv1OAJvRoNVHhzSX4bulYX9DZubBhtC9eG2sDk%2F9JLSrrzFFA8l%2FsDnZxKJ6waHNqjKWA63zuVqiFh3TRgC%2BadxUW9WHsIeOjcYwZthUoy7X92xbbDm8ltTJhKlm%2FeETmWt%2Fg0HOrZqd%2B%2FPvMYnel4DIiEcvaqKcb9iWgm7rxUw5Bp2s5dFgMqtfL0ehHxe%2FI76c0qa1wrnsJo0uKWSTxclZiCfLyWb8eIV%2B4PXirZVO7K1a7xcKPqMNHc%2FcoGOqUBESgjdHB4YdQAA%2BuXILegcwF5dvcNfG%2BJGe7agWAZMKAC6qIBz0Ad6sdBjCWFZ%2Fw4GEWuok2NrNIGjrbEgL3eU6USxyj4pgqH%2FhKaIaHyvMS5Z0NGWyyGNs0qyzS%2BG5m862jdKF2jlNr9xBzHbRZ0dzhiuyteF1SPKCGk5XowaR%2B4JRrhXSfckBaYElPxSQMkpAmeYgisuACG2fznGiIkMlxappnY&X-Amz-Signature=754e3358451a2e4b6d5d293077e49c41c64d16ee976e04a43dc57d1c8ec64a11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666RYT43Q%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICghqPJlyw3ymVr6FajEc1KxWAUxLKbzzfL0%2BVq%2BjrdNAiEA6fq7Vjq3BTckU369M3RqNEU7%2BmsudF1mVFMZqvTqoPcqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKWh4%2B3XZKVQCL0rYCrcA4jXQr6JBU3ysyX%2B4DENlfoqMbkbJINMQqZRA6EBbvHiHYmgc6s70Z9f03Z2Ne0GKATF6gYFiyL5e2mlKsKv%2FKNSAgR55MSRnPbPoPMAxlEC8YesKc0ywMgNYY%2Fc4kPv9RgZAv4o6rGSBT4Q3IJXxBc74lo8yrslzFlhXTjY7yxC%2BJL0KyotBA4yP9jV8LlhFFdAk7nWW2S%2FY0LOXmure%2FJ6TvI7SUZFXqgHs3k%2BIAsznMFbstazbrWY%2BOOxeWUNB1v0w4ebPN%2FAcYEo%2BWTgqQBjEvpfGzWdgqOgs3ezKAaXTdR8i6rlhYOt9THjZlNulEuBA6m%2B07ZchYS%2FQtVlZCLFOiQPX38ahP1zzqhpo8t7rrIxYEkV55A73Mp4OojlaoVqQzb5OTwPZAQRsH9VmWa1%2B%2FfCqyNAaZP09pEMh4yuTDwURhGIdG0vdIxQEby4ee644bLNBkE1SvM5DwRZ5hkadu6sER8kWMndcKUCaK6bnV56bYuKRh83QIU8TAlVJl8iUPqHp3701iTTa4Sn1vWhsSqzEPuLO6z7pPn2bVrjcOTRXde%2BNBwIVYsCtug8Kc2JN4XK6dCq4YyVtxy6UDLbxDph5JU18T5LOyr%2Fbi1WEOc0aAc5Kyi4vkddMJXc%2FcoGOqUBPyvR8vVgSaK8LN7hGjAi4ujCD2nFPO0Dko2cohbyvhI3V6fzJ1upwGiYViwffOGFrSCdL0S54g5oE98PFBhSVVgJ%2BZUhSi6xGd6vOQ49jjkIl6X9ouixZgneAglnbjoEdjQTKegGYG2352rM9Zg4%2BJ9GDZBcjKwniDqG6Sfh6LEXzQvYWeLsgKvaTy6RcfUz%2BDlP99nAL%2FDSCXDMnBhmQP9ZvRkK&X-Amz-Signature=b0d4374d67c1958777f2c7c5f8818a7e9a1178d10da0d797d63150e58d537758&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGMGG4GG%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH5ggZJ33rxLWYmy1u6PENGsSWaFm8w8F%2Fxwp8DBcJc6AiEAobiQU%2BFSuNwN6I4khZnLHItTqNSfYYQR7RS6mMdfHEAqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJJMW0jF6VqNfyqR8ircA2mzUcDI%2Bv%2F95SlI7itYVe3oiyfEHZ%2BZ%2Fc7%2FeubGKqb%2FL5SWsdo4RwIOAMKXG%2Bvcdj1AzCljFh2VT9fctPkeqi%2F88NM4siqdOaR4fV%2B3JNELlXvhuwmJJPp%2BSLpZ8jvMPtmv8FLyebuEQlhH51aGdb857Ghd8G4VbKeKKGonGqi0TbGpg6rN3zvs19JNcRqKcILrd5M5MZ0aJr4qy8Gl2Y%2BK81aiFuUHaMiHvrPYzRmePO2a7TpoFc0m7jiKq7n6nrAOG2Sg2PlCUYb%2Bd6HASuWhKDLO%2FQdKSxGYf6D5C%2FyHAKea1VpwBIJtjVnd639IPT59NaT10VYCf%2F9R2QRRl1zPG13wErk5qeQrNkiRraPOEsFearXHvhEv1fqnNHTWyQMJIazTTXUWEePU3REVy%2BnBhf5l9YW7hJzjeFZKk2vzErvoawUCJ0F7b7a7rHgIhyp27NjPk3Xg%2FYE2M3bHzWuy4NUU%2BEStohHYs4BODe9MaTnspVDa6kmWypBtXiA%2BgCBFML2SIxdG8ue7j3HURnWgc1FaW%2FzVN5bb8g94zmPHy6bDcFCz7pBRV4FtfWPcNmwqgez%2BtIkTNyR5N0ws6PlhJrKAZRLGv9uo2UM1IIpD0cXyRF38xqhvMzv0MLLc%2FcoGOqUBLahZLvk17Y6up3u3eAavylolWHT%2B9nq9G4b9fNa%2F5UnKTg1zdRVGsyXLYerVgdqhrGPmJj%2FFx4n2ztArnKqh18lBS%2FjwuH4fACTKOvX0Oa7AJA0E%2B9N4xMVK%2FPUz%2F8YT41ICNF4LROzMe%2Bi14uTLCEepmEwmSHnc%2BkeViG%2BUNaobrcNir2TuKDtKXYY%2FQomdOF%2BnrjDkldUN3k9cqVqwjhtPhZCw&X-Amz-Signature=c000f3ca41482bf4b246791d8e6ad24129c200cb24171922b2835114430cb532&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQRH5D73%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCeo41%2Bc%2FPmrW5ynYjBR3p3t2rtrfEV0B8vXLTSVVLYnwIhAMN5x8FoVyxCTPLkOEAPqLGtTz83ld1kzcqPHqWghkK7KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyrDcomTmK44oUQSp4q3APFxumhGW9DOsDhwihK%2BS9opt9rVMU2aakPMLVqcmuUULers39iGTLPFbbnM%2BKgluqMWzE5BU5v5wGcZu8SbhiD1sqftEyCPcXYmseOan7Q1voskafzHxrU2SXniRaMhxcCGdj%2F9Oh5DGF1TVPQjMy0PHmn8CB5cXG8jLAuBZ4PsINaDFhAp7lgAyM1W0G88PQpAWN0dK2K4A%2FvGT2V9IImhIFmkm6g8S0xdS7da3ns0wkO3GkzUFUt8Zn3Gqok9PwPpOIQZM2KLpn1SeO68m2lZuzKUfcKgncLaoWSUsDpO4QzM28ZYiHc7qMoP1MnpE9UN8xK1BYcRmN2%2F4%2FX3Yepru706nduO7NLr0SoPAm0CFV%2Fp1bdMrjQxHjVbz00%2F4IFf88KDpHYipuKHwjBGiWm9DiNXhJj83oLSZbyDlfWx2oxbZ%2F4hJ9WgrtNoaE0SFTduJamk8u4XD70F8LsERBulI%2FEcrwbUJxdVpQryh1LB1VhxiT%2BRMGk%2BmE9DGdTQwLJge6MdO7DDK%2BF%2BNL%2F%2BPajse%2B1oOMCtifJQ4vmrDiOC3OOA3U2RZo44vEQfZPeso4wCjmmRvspsd4GUTnjXWZV4%2FSDNkGwaEluX2oxNZ%2FxV717QHkpvuKrw4bU1zCD3P3KBjqkAWZSll%2B88pbXEf8P3KyZv3lvXqirVIo4Spqez%2FMVTZm%2F0DgljRlVoNmyuB9N8DYtskhzw3TJKNrsElT7Ps3VoT3jXwnSKhsRQAD4DwKietxsWsW%2Fg%2FjDqKoDDJ0NWVakirZ23JpNKtPVhNjMBG%2FM%2BrA4RR13cAMtjcAclwuBl29MmH9bJMr%2FA%2FZu9AIE7QEYGCIgbZIcEx8hstkcvAJp3DGJw64i&X-Amz-Signature=54c9e7b6a44728c63e440e971e8ddb9694e5970af43329cd0b6202c191a66677&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQRH5D73%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCeo41%2Bc%2FPmrW5ynYjBR3p3t2rtrfEV0B8vXLTSVVLYnwIhAMN5x8FoVyxCTPLkOEAPqLGtTz83ld1kzcqPHqWghkK7KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyrDcomTmK44oUQSp4q3APFxumhGW9DOsDhwihK%2BS9opt9rVMU2aakPMLVqcmuUULers39iGTLPFbbnM%2BKgluqMWzE5BU5v5wGcZu8SbhiD1sqftEyCPcXYmseOan7Q1voskafzHxrU2SXniRaMhxcCGdj%2F9Oh5DGF1TVPQjMy0PHmn8CB5cXG8jLAuBZ4PsINaDFhAp7lgAyM1W0G88PQpAWN0dK2K4A%2FvGT2V9IImhIFmkm6g8S0xdS7da3ns0wkO3GkzUFUt8Zn3Gqok9PwPpOIQZM2KLpn1SeO68m2lZuzKUfcKgncLaoWSUsDpO4QzM28ZYiHc7qMoP1MnpE9UN8xK1BYcRmN2%2F4%2FX3Yepru706nduO7NLr0SoPAm0CFV%2Fp1bdMrjQxHjVbz00%2F4IFf88KDpHYipuKHwjBGiWm9DiNXhJj83oLSZbyDlfWx2oxbZ%2F4hJ9WgrtNoaE0SFTduJamk8u4XD70F8LsERBulI%2FEcrwbUJxdVpQryh1LB1VhxiT%2BRMGk%2BmE9DGdTQwLJge6MdO7DDK%2BF%2BNL%2F%2BPajse%2B1oOMCtifJQ4vmrDiOC3OOA3U2RZo44vEQfZPeso4wCjmmRvspsd4GUTnjXWZV4%2FSDNkGwaEluX2oxNZ%2FxV717QHkpvuKrw4bU1zCD3P3KBjqkAWZSll%2B88pbXEf8P3KyZv3lvXqirVIo4Spqez%2FMVTZm%2F0DgljRlVoNmyuB9N8DYtskhzw3TJKNrsElT7Ps3VoT3jXwnSKhsRQAD4DwKietxsWsW%2Fg%2FjDqKoDDJ0NWVakirZ23JpNKtPVhNjMBG%2FM%2BrA4RR13cAMtjcAclwuBl29MmH9bJMr%2FA%2FZu9AIE7QEYGCIgbZIcEx8hstkcvAJp3DGJw64i&X-Amz-Signature=38cde501fce7f46654ac0efae36506aa26ded307cac4e1683a82757ff7cd2a85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7RGVPQC%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCa85GGvTuJOaqwGPnyE15CNQKwoDMr3FXoyaQ1s1AEOAIhAJ6DWSejMZJGONNvUqSLxi4w4wU0Ff88wIjaRVZ59NVuKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwke9H0fdzDLHocgo0q3AOz70U5JpQWIQQinHhZCLr7KTSxkoOKAaGfD%2BGmG2ek%2FfM27xJa%2BFYU%2BK8oRnsAIK9B%2FJabli81zmBdn%2Fua4aqsQkxzAj%2Fit6MKvDjI4uxl091A6hKxhhgEEYqlRf6ghX6IOSUn9FpGzH5G3jZOO7GZ3OhYA719bKm7yNvTU33INV%2FU3hFYHn7HisSGwT8rNdtFXArAdVmTl%2FoArAaM4fHVJIuivwVrPEV1Z8xW67gc0YdADyN7L5bHMKURSsSDRyK10T%2FpHerqXcXS2IQgfhY6jwKRlwl2f0eoBD18R%2B4SKmGl%2FE%2BtXN8hqAnTKatRxpXd2Se2IjerpqxcMzj2kX23Nve2a7bxO%2F%2FW5IPV8XaWTVVa74pe6vNR2DcL2V223p44J17LZ8%2BB0yXvd4WtxHgbn9m8FzfxTM4cMfGeZGB0DqVcV9vtZTrpcWIrbLhpArtfu1WLh64V9ZBrJkJHAGxWdJqBqRXdvMrC7RrGTLNs3luk2wNdBRClxZnlgQo2XplklvofNZJo%2FbzPjjz%2Bm9CWRasLgP6cwk%2FFgdXDDOiIahlyVuaWVXqNwtTA1mMBDBVCJVjnCQIc7Vpdq%2BhG6XglWDPSxzRcOHyJTrioMIxQU8%2B9OJ4tL0lA1IJQgjC43f3KBjqkAT3AdKygnHRch7PPn1d7sydQTA85pMdP6v4HYqSW0s0t%2FEUnKiglOg4MrImxNA45wP83nrnAlH3tqKr0jVpIKle%2BAqlKkD0EJrvwT%2F2cgmxsKVwbdooI4KsW2G%2FQNXaiHwI%2Bi1d4PipQovDUzZkqn9%2FHq%2FtqaPZIxR%2B1FLov%2Fg2epMXGPugXnDQ%2FEqunoCdtN7zGgujNLebHMRCvwMvCmvytEhFP&X-Amz-Signature=0c3bf3083aa38b2b8bd79131f487e17d7018957e5a79a8d237e4f504024367f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XME7XXEV%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5kI4e2kzfI%2F2NrQnO6gdiMWcIFu6ccP3pu9dgcPm3OwIgFRHkk4YY6iHKeNHPyyQpLBLK6W%2F8yHyggV5P%2BGa0hUQqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMxWnN5ePB4yWIxW8CrcAwutL4GRWZkkbuTExpBYfhhhGQFt4H9UgAgkFVg0dw0pbBUnga8GA18x2h8k9wbeVnTG0%2BZczyZ9UXlxwQgHWh1D8vk4LFEdcy%2BfPBPEc3fea5xBz4p4lNgyS%2FeHf42aJkChDaV7Nz%2FwCNvW%2FQvlo%2BmqG9cNZhVOAZp9L0r2jmEaog8qhCeXmJ%2FzyJjTyK3VAlMgAb%2BAyDGKNJyHgkZzWvbPQQ%2FJuUfilMR89oVSRKA%2FziXWxYKAKbRil8aqps3MY6Wz0O%2B71uecbSBDYzbzNKKXia9H86wavUGHwfbNjH9JQ2WkVV1FyVpB6Y39ohjOl5w46iV0rX%2FM7lZ3C8J3L18nHmb%2FJDRl4BlMiFiSeF3aQCpPb1ptbgIYbRdpiN9Dwg9UUdA2NWYQ4YxTr1uZnMcSuxHXMHef9BKSongdWNsLJCI9uKJWqQ0Iki06D1RAUp%2FEMIJ1aAhEzfCBWOfbjBfF5DLNoG%2Bzf%2FquAlpu3Zk3TMzxDruuO89yHvIJBQnhdyUiSXaG%2BHFDSKIBdfxqHKbodtKOM3xG1K26FYszmEXzYDYsuK2CZCiHD0UCdfFenjmdACjkV6MiqFgr6bMEgcrKQSucMaj8RCKAMQ%2BWviN9N%2BUX6OYu18OfK8J5MMzc%2FcoGOqUBkO%2B%2FYDfuFRQ%2BHHBU1WRg3zHdJb96KNrTp8V16G%2B1%2BxeIJMQqYNIvkgTq%2F52%2F1O9a4PN%2FKOQWMblquj4E%2ByU6Tp%2BsOl8qGZksTKII9nMkhFQ1112DEhBMEA28t0FAeTtPc34dxa4SMT07nFI3SP76yO39yL0MLvrIDBRuBU%2F5OZv9%2BVP4ooO82LYcEP1IvcaUYTZHcQkG4z78bf0rAD5DXH3qRS7Q&X-Amz-Signature=4efa76c3e5bdc2e24ad08be47d20f4505b00206a01bb21f1004543a8e732be23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XME7XXEV%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5kI4e2kzfI%2F2NrQnO6gdiMWcIFu6ccP3pu9dgcPm3OwIgFRHkk4YY6iHKeNHPyyQpLBLK6W%2F8yHyggV5P%2BGa0hUQqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMxWnN5ePB4yWIxW8CrcAwutL4GRWZkkbuTExpBYfhhhGQFt4H9UgAgkFVg0dw0pbBUnga8GA18x2h8k9wbeVnTG0%2BZczyZ9UXlxwQgHWh1D8vk4LFEdcy%2BfPBPEc3fea5xBz4p4lNgyS%2FeHf42aJkChDaV7Nz%2FwCNvW%2FQvlo%2BmqG9cNZhVOAZp9L0r2jmEaog8qhCeXmJ%2FzyJjTyK3VAlMgAb%2BAyDGKNJyHgkZzWvbPQQ%2FJuUfilMR89oVSRKA%2FziXWxYKAKbRil8aqps3MY6Wz0O%2B71uecbSBDYzbzNKKXia9H86wavUGHwfbNjH9JQ2WkVV1FyVpB6Y39ohjOl5w46iV0rX%2FM7lZ3C8J3L18nHmb%2FJDRl4BlMiFiSeF3aQCpPb1ptbgIYbRdpiN9Dwg9UUdA2NWYQ4YxTr1uZnMcSuxHXMHef9BKSongdWNsLJCI9uKJWqQ0Iki06D1RAUp%2FEMIJ1aAhEzfCBWOfbjBfF5DLNoG%2Bzf%2FquAlpu3Zk3TMzxDruuO89yHvIJBQnhdyUiSXaG%2BHFDSKIBdfxqHKbodtKOM3xG1K26FYszmEXzYDYsuK2CZCiHD0UCdfFenjmdACjkV6MiqFgr6bMEgcrKQSucMaj8RCKAMQ%2BWviN9N%2BUX6OYu18OfK8J5MMzc%2FcoGOqUBkO%2B%2FYDfuFRQ%2BHHBU1WRg3zHdJb96KNrTp8V16G%2B1%2BxeIJMQqYNIvkgTq%2F52%2F1O9a4PN%2FKOQWMblquj4E%2ByU6Tp%2BsOl8qGZksTKII9nMkhFQ1112DEhBMEA28t0FAeTtPc34dxa4SMT07nFI3SP76yO39yL0MLvrIDBRuBU%2F5OZv9%2BVP4ooO82LYcEP1IvcaUYTZHcQkG4z78bf0rAD5DXH3qRS7Q&X-Amz-Signature=4efa76c3e5bdc2e24ad08be47d20f4505b00206a01bb21f1004543a8e732be23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SK5OVYH%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T091706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDWk0eeaEsSjAb43z2UZrHDx%2BgjzAoJhByg%2Bh6usrK4hAiEAxLVDdNcKilShtXjDFpl6QejyWNdlbHiDxW%2B283ZGhy4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAC27f%2BFTswIrQH3PSrcA0SHzqAY%2Fs7kkrHByu75Fvp5giPA2B0lNXklQxmYc6VWKQ7qFa97Rh18CRju64VDVcvP5PL7Vei6W7Tyc8usWV8UMPKMXrfn77%2FvpmfNxUfOP8KP%2Fly87zOEn0Yd%2BsmBOPGPOPrvmzdFHyKZUUmdsUPk4OJRMRcu9gB838I7NWy6K8oJfTFLviUwmE88zxA8EupV2%2F4EBOieF2SVl2OPYQTpQCoVAglh3s4JW%2FvHbZ2T5JJGe1z4%2F86zseyahIaJGVLeV%2B7ADU81lRpdQAHP4cC6LSQL%2F78Mi05lfF7qjwGKluQrsB2N3fNgN3OMkg%2BkTfUgvu2N9tlStTPVB7NYOGchnoeXf%2FpXzCXIm1sRjzkcOPswx9SB%2FR%2B8sVVCeLdiIDrmry%2FMIJMEQBCF%2FTV7JX0eQunXODIOjv%2FsSM6i9c8Axpk%2FbnFkHwu9XNzSAcnkglRDdwJRbJwPqVQS3Z5spDKLOhti1%2FIiqKil%2BtO8rIbmlIu%2BG4MgV9aKeJT0XH6YNt3zrIhxyuOMaqrZ%2B%2BQFmzsNXmKb%2BiuQ107Sl8zkCl%2FJ2w48hVZlUDanZG1Gll3RHaNsF6xbUQCq70gcXOkf%2BPhDa3ywOWX3aQisurIDbDofgR%2FdWOog1c9Ks2F%2BMOnb%2FcoGOqUBuZRTdbhi7HiPd2BipHwwfYD2JlK6fwHP2VMZMKQU0vjEVMycRhOne774CqNv%2F9iy0ZMjItrZmEBZakD20IWZBWizWJuNxSPODkR2Bv9JB0%2F%2BYcFX6d0ntl%2FTQGPhJBzB8I8bPVjjnQq6d9WGUHgqV0SRW9pah8EHD1AyfUfTTyWeqzRSGGOHlddOxDJAp3Pxfm3gUmansv6DZndTqSi%2BENVpLEqe&X-Amz-Signature=5f4d30766e8f0d12e8c3c309427b1aaef05bd2c84337356ccc933ae862be0660&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

