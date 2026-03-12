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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBZ6N7QW%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEe9LXGPekKInKYl2xmP0Kp1zL3akF2wWcmOYwAyF9HAAiEAgIeLCCZHgbgTZQ4jlCNT6IMIi1BwlUwsMVDqRxB4xIMq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDDbMzrlTOOzGz3NasircA0%2B13l7g9jxYVjJxvX3ATUL5Ki%2B30uAGDUe%2FmUB7P6L6VtTwYxZxI0cURxEnSyqSwpZ0dgLm869wtumWYyVmQ5YhY8dTtxjIC6t%2Fl%2BSGvRN%2FT2kvOBM6SYeQSKPADGz4WBRQ5q%2Fas6EQYxSMSThVRtG0hEfQFKUPbo8M%2BQNGg7CL6uDy4Wt7hBJYkmX3Wcm9bDDzhKOA3ldAk%2BTUU0rgHI48UuTZSNEpWp5iAriSDZJPSGlDw80BhBmY3aQTVV1%2FbLI5vrC0Wqm3%2Bp5Jk5GrYjUae6TQG1fHOZavoswl5%2Fsm7%2Fh9%2F1RxKNAWJSYzPcsr7q3Vi%2FhHZX%2Fz20uJMNc3NautLpXGNM9GJluO8Y7leH8P0jqz5S3BXsZsj4L0kBjNQF%2BZ6oHbWcIU7QiHxEkavRZ7%2Fm91G12qWYujOFjdCV940ML4A4lC1GpOlAkVLtjMs7xW%2FYZEqlA70739EXdLPm4kPmmlPnBisgCwFMj6CQa0iBEXhr2svMt5RLA5jCSOe83dagpNuqKXEaYxk5n0gOyjIzkzWZ3D2Evs2S1Z5WNvKh5mo42Y4WVYak9BbUCQat9%2F4EER7r02aIvQp2RYXU5QMwHU3lCa%2FVPvJ81Yf8Q6hhxK7DNTSjgj6URAMNCUzM0GOqUB7PQ%2ByJafGSXJqGKCSamlQ6t0u0FK71YdMQdXhAKwgvD2ukjD3DDvlSiSVwaaEqlggWlWcGcoWThr%2Fr9b3Dwbqk5IFejYZVBhez7NNbTaSaTxnCthRt4iRAYpv%2Bq9VUTGaW%2FjxHU1tMn5ZBc5wYcaHtxDD5oJEiOyKuXgLx2jI1ou8zgeQPj5e%2B2ELqjijKXfV7iaODAGtEwHRpugrt6RIPr7ST7C&X-Amz-Signature=74a62204271abc7f4b0e07275e3a6120cd7418a97019375d483ce7cf5f2e7e15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBZ6N7QW%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEe9LXGPekKInKYl2xmP0Kp1zL3akF2wWcmOYwAyF9HAAiEAgIeLCCZHgbgTZQ4jlCNT6IMIi1BwlUwsMVDqRxB4xIMq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDDbMzrlTOOzGz3NasircA0%2B13l7g9jxYVjJxvX3ATUL5Ki%2B30uAGDUe%2FmUB7P6L6VtTwYxZxI0cURxEnSyqSwpZ0dgLm869wtumWYyVmQ5YhY8dTtxjIC6t%2Fl%2BSGvRN%2FT2kvOBM6SYeQSKPADGz4WBRQ5q%2Fas6EQYxSMSThVRtG0hEfQFKUPbo8M%2BQNGg7CL6uDy4Wt7hBJYkmX3Wcm9bDDzhKOA3ldAk%2BTUU0rgHI48UuTZSNEpWp5iAriSDZJPSGlDw80BhBmY3aQTVV1%2FbLI5vrC0Wqm3%2Bp5Jk5GrYjUae6TQG1fHOZavoswl5%2Fsm7%2Fh9%2F1RxKNAWJSYzPcsr7q3Vi%2FhHZX%2Fz20uJMNc3NautLpXGNM9GJluO8Y7leH8P0jqz5S3BXsZsj4L0kBjNQF%2BZ6oHbWcIU7QiHxEkavRZ7%2Fm91G12qWYujOFjdCV940ML4A4lC1GpOlAkVLtjMs7xW%2FYZEqlA70739EXdLPm4kPmmlPnBisgCwFMj6CQa0iBEXhr2svMt5RLA5jCSOe83dagpNuqKXEaYxk5n0gOyjIzkzWZ3D2Evs2S1Z5WNvKh5mo42Y4WVYak9BbUCQat9%2F4EER7r02aIvQp2RYXU5QMwHU3lCa%2FVPvJ81Yf8Q6hhxK7DNTSjgj6URAMNCUzM0GOqUB7PQ%2ByJafGSXJqGKCSamlQ6t0u0FK71YdMQdXhAKwgvD2ukjD3DDvlSiSVwaaEqlggWlWcGcoWThr%2Fr9b3Dwbqk5IFejYZVBhez7NNbTaSaTxnCthRt4iRAYpv%2Bq9VUTGaW%2FjxHU1tMn5ZBc5wYcaHtxDD5oJEiOyKuXgLx2jI1ou8zgeQPj5e%2B2ELqjijKXfV7iaODAGtEwHRpugrt6RIPr7ST7C&X-Amz-Signature=74a62204271abc7f4b0e07275e3a6120cd7418a97019375d483ce7cf5f2e7e15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDAVWYCL%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID%2B5ScKQO%2F4712rLiuArl%2FxSbGvZVHe43cS9aP1hHff7AiBnzdoOj24aS%2BpxDCzK9yKa8Ty76RPn%2Ftp5hKIFZKn5oiqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkMpddC1HhXzTvPH3KtwDRh9hUOl%2Bm8QITp7b1IIV2FfcRkSusVZj5Wxabf0jbfGrcRUoWpGTo2sQEwvnZN8EGxUUA21u59AHYKOs7bd5BNx0cQcDTvBIGmUJQVVWaBbbtafCU%2BoO9ocWZACaIvI1H9mBxWgUHZhknhHkn0i81Om2N8137joBDHvkgFL9GGzQ1mJKAhYTfTFfbnRXqKgxDlnYeZbPb1sAZSvvuZiCiGOtIL%2BVxIQB520Z99X3cxOnH6Qvi7UkQKSQ5LLv2Ivnd6YWh%2BprYkremEFevLBtlfCGBgHszv5mo3wOi4HZQJ64pUMJs37MhHJV%2FZu8buglOYF0nXVzBy9MHHvDxRZLA3nQU9r1hxOKNT9w61rZUommUk25S7MMUKvP1Qu7hcUF7TnPatOCucAy%2BQ2Ncvg46iCas%2BVSigq6gh6fg1IXqAwpEyfQpEEQ5R6fesv9QXVKlDVLd1DPf4XdcV4pPNiOI7aGdM3HAY5ZC3716VDzV46RKdYnn0U0W09TtTVfz49bhG42B4GM%2BnGcryRBiWjhL%2BQwGSdAmMQDf0U7B%2F%2FGgKn%2F9%2BRtPGb3wKeIfjfbQxRMqKtKpDXt2RtqUIm1XPsbQn9D682WyIQMx812L8FqbBJkQzui%2Fj8p9KIpK3wwtIPNzQY6pgFNgd9KKJKmvzUQKUdbNSGBAd196isV0RNcHfn%2BwSu7xyhAsiJ1NqvfuVBTFozjtbdILNiWzWa%2FE4yoA4qaIB1yFkRjbV%2Bdp6TEV4mhMSj8GxtO5W0LFwmb4HoXIe7ZgEqShgScRt60fOWpouESpP9mz6BpGX8PYAGMz0HJdWE8IquKC%2BQEqql1%2FZB5vzP65hO9lCskDw44qJAZxe%2Fo3Tp%2FldkJd5HL&X-Amz-Signature=4d8b8e9c9e6f748d428a746583d0e0404d27e689e90863b4cef04b427b54fc31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHDIO65Q%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGXSC3WBDgu6BJMomgXyiDtx9XgK7%2BBjeRIakkUP9LBAAiEA23lyfZ%2BGShSq4f4dBCbb8I%2FFJF5mr166OYUEus9YJVsqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIO2lKh3u8Hm86DtMSrcAzV%2FVc94PCUlENar4fol0Mbt6LQg2ipjrQPuOBnizKmrPzRJp1UQuTb4OrQakyFBFJoThf82j2vYgFfFlJsADcn5fphMNdCrOWdPjlrGtCtzWZKZvJw9ZtnWDngg4T%2FYBecepHQjSyPdLQ0HAB7LRJCyOiaqjteBERSPCXzXjjpdtOwGM5XXo9mkERr6IPPZVIdh6UwR6T3%2Bwgsbu1WkdhpTjEoEzgc0x907mFqqRzt6B6rOAiJhyxA4WKvjc0QEo%2FLc1ftk5dIOBUIi%2F%2FqYhm1OFuOJRNp7O2fbN6ZGXy5s62JBGPfIt%2BGvhudsaOR6%2BdPAH4YW7HYo9agsBYr6jT2NgnFYNeKUYEu%2Bo5mVPxxoVohs4F7J%2BkanlMPmehGLW8VPQFNkGLZvJY9tauJLxJiMirSzjCaDdRO%2FMeDDADIOJdgZARhcYjRtmInd6lOub0jI%2BKhFSDxrlTCXQlkeC4rjWOF95SThuf3bPBVgBxgOZwIm9EcrowIOK7OXIKIhF0WgK8KRtkPsIh7Fdx4JVUEubvSeYhfoPct%2BL83%2B3gTNT9Q%2BbRWQoBRadzmUNUyZAI%2B6bfZYel2Rz%2Fb%2FPRUg4PuH%2Bu6D3HaSs9pEtrZ4pEWXqkFmD0gUW4fO6N7bMJqIzc0GOqUBbo3U35%2FBNcsS3jCgLPyx7eY65HU1mDTByIVGrj%2B646NG2BCtmVI7QH1Hygsb0eRDXHT50nW4R5N%2BsXhqFk3Zc7D1U%2FAvnUr9j8LXgyC1i13hxa6nMU2Qi%2Bw7LVJ8brBDormYzRHBOgd8QOJ%2Bl5Xy69LqXmxmULiLVIDG9mx5yVhFxejDtSbnRVLkCXnWJtHBsWlSKycnMX5tfSYJgl0v4AF8F5e2&X-Amz-Signature=33c5c0e2cdfb73cfc0bad8850f8501da797f6155a51fd750128adcd919abba28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHDIO65Q%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGXSC3WBDgu6BJMomgXyiDtx9XgK7%2BBjeRIakkUP9LBAAiEA23lyfZ%2BGShSq4f4dBCbb8I%2FFJF5mr166OYUEus9YJVsqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIO2lKh3u8Hm86DtMSrcAzV%2FVc94PCUlENar4fol0Mbt6LQg2ipjrQPuOBnizKmrPzRJp1UQuTb4OrQakyFBFJoThf82j2vYgFfFlJsADcn5fphMNdCrOWdPjlrGtCtzWZKZvJw9ZtnWDngg4T%2FYBecepHQjSyPdLQ0HAB7LRJCyOiaqjteBERSPCXzXjjpdtOwGM5XXo9mkERr6IPPZVIdh6UwR6T3%2Bwgsbu1WkdhpTjEoEzgc0x907mFqqRzt6B6rOAiJhyxA4WKvjc0QEo%2FLc1ftk5dIOBUIi%2F%2FqYhm1OFuOJRNp7O2fbN6ZGXy5s62JBGPfIt%2BGvhudsaOR6%2BdPAH4YW7HYo9agsBYr6jT2NgnFYNeKUYEu%2Bo5mVPxxoVohs4F7J%2BkanlMPmehGLW8VPQFNkGLZvJY9tauJLxJiMirSzjCaDdRO%2FMeDDADIOJdgZARhcYjRtmInd6lOub0jI%2BKhFSDxrlTCXQlkeC4rjWOF95SThuf3bPBVgBxgOZwIm9EcrowIOK7OXIKIhF0WgK8KRtkPsIh7Fdx4JVUEubvSeYhfoPct%2BL83%2B3gTNT9Q%2BbRWQoBRadzmUNUyZAI%2B6bfZYel2Rz%2Fb%2FPRUg4PuH%2Bu6D3HaSs9pEtrZ4pEWXqkFmD0gUW4fO6N7bMJqIzc0GOqUBbo3U35%2FBNcsS3jCgLPyx7eY65HU1mDTByIVGrj%2B646NG2BCtmVI7QH1Hygsb0eRDXHT50nW4R5N%2BsXhqFk3Zc7D1U%2FAvnUr9j8LXgyC1i13hxa6nMU2Qi%2Bw7LVJ8brBDormYzRHBOgd8QOJ%2Bl5Xy69LqXmxmULiLVIDG9mx5yVhFxejDtSbnRVLkCXnWJtHBsWlSKycnMX5tfSYJgl0v4AF8F5e2&X-Amz-Signature=222f95b42031156cb66fbd405e91b252cac30a50d5b04d1fad8712594ace6519&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZU4PGRDY%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE3cLIi8Zz%2BXAL7e50RdMIFr0Z6VN8FjoSrSBhwWSnKMAiBkl71T0PLR7KQ%2BgP%2BsXmxF%2Frl5WlBXmHlsUKG5isSSSiqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1GI9%2Fjpr8NzUdc80KtwDXm9uPpMwjNlJA9tOgE2%2BNuKicDWcG5QKMEZc4sQzeqiPP58zC0nAJ%2Fb01HxuMvGPDeB3fAYg5nv5C6qLjL0Qc7A6sjl1IKvnCG1VTc%2BKrR9iKSQcH%2BGfV1GpLHOYXHVbDdCJGJi%2BKas%2Frh2EkusPEJ%2Fpl74HERKFbNgP59fsqw0ukKOx2%2B3fHVbGTLEDqyKsfzkMoO8dw6ayOK9cUzV81%2BrTNYjmv9KC3%2FRzdwmQhBl%2BXsNkk67uJpIF8gq9o%2BV3LS0JSRofchSlIsFD%2F29EYv4GXh86zR9wY%2BzBWdovgv%2BbKq2pZsIaH4ZO59ZntIse0ar3%2F4SPdj5ru5vqeaJyjYn2Bvm2nrZ4TLzNQ1Djieb%2FKpGE8mdLCvV8SSbENl63c9f%2BFhA%2FvBo8fkrYlfQduFdaK3ho6JPbRe8q9TxwP50wQGNajbw1zLWWjxCBXqQ07z%2BSsw%2FHx66w7OnlFvmKPEuYbyrlg%2B4SufoI%2BAtFilFzc%2FgiQq6JX70KdRjNm6xkcasM95njZWR4zkSdA1os%2FCt3hER%2FHjz6AyNkFege2p08mhptpyWDlXSYuUj95ZSkqF6Xql1X9fzazxqGraTQHvt3K1KbhU7K2M6k2PYl04Z0j68vUzAYvy4tdUcwsYfNzQY6pgFKW84e1X43VMxeDy9HhcVtTrHZ7z2IIYvZCupumKAq7rLjTLITNjvLmsg8wvTJDH0HPoFXFjMgoK55CfbtN%2BxttMdU5SnojVdTTol3rCJhXcqlap7ChkvBOp8qfzq%2FG57%2FoSGdzvWVT6dCI971biZmLHCG7lWVl7FAFptMaXCreWZgz5R4P0hIFXP0c7zm0Oc5Jc%2B%2By72qIQIQ9%2BfbIgwjGLnzY9uo&X-Amz-Signature=d96eddca7c0a0495bcfe1e1d532f04c9b57c9aaebdb279b275eee9e4b9ebd942&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QPN4RRT%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBFImyelPoSMAlBTnFI8XFWVKlwpf12ktpptu8MRR1IAIgFapfGdLV4qwcX%2FzZXVqPX%2F2Ryrn93FEFkVtPu4rx1UEqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBPicnuWU8haldcljCrcA%2Fb2a9Z9vKqtNIzNKacVaH3T2c%2FOO%2B1gXJM1rkIfWHpqVOgnv4GTAqqjHEZl8FPVq2Ua3%2BRGSJk8gGYAAZe6%2BlPr0MhI%2Bd9HHk4JvfXdXbeHBMwAEtbBFHfH7%2BhNmP5iECHmB1Cpb3yRZTXnHqqJXzdxeEpQmSRy1aKhHiZjjDiC%2BJd8Ar%2FOAonJr%2Fp3OjGG67p%2BP6nKF0ckt8b2cehHk6%2Bflb97or%2BcLHmvKEnnoH6z6lRgEc1zR1Z4zRXx0Dmkv4rm2rKFJw7CaRyQDkHMwfHK1h4nPvwXFHjgjey047G1k9KJ%2FKFnp%2FUQy93qvmMXW7HbL4N7MKnZmOUC5BzwCDM2YnTiVLMSOuJbykOX%2BFHRqW4Ci14LDi3bM5AZOsRcc5Ai7rNCVUH1EWZKVZ1fIf%2F3t6LBqLUcymbbTK8yNO6JhTR8jV4iS11bEcWQxVEuB429ruxb78e%2F7NgroL5G5vAqy9EAvGMooT3pIyCfpFbONCSTf4FF%2B2%2FK%2Fwrfpzs3OCsIqbuk%2FF7wVMg5%2BBEHgOG1eijJNrIIOsj0BY04kEe4to6GPXvzuIPUpbH6srj57x9DT5cyHTkt2p5u5V8W5JNXEnMevOgP9CqN%2BPOZMVygprMlnrjI7CsFgEvpMNmDzc0GOqUB58jI2IEakG4V1NxluUP2NumbBQMq9Ex5JH7NLJTcsM61pgVzVyC6x1%2FWzh4CK%2BrYPPwagl5jz0zvrZmCKodVycORPfSd9wbK4%2BtvYASg0Tis8m0GvDsug73meslPvisY128I6DBUYRqEFFNqBS1R9%2F36r8H5aHmq3evj7iQ%2FWH87HcUiIQZfxFkSznfVvze7wKjMEOb6vlzPgOEOPOnYwqPA6Jri&X-Amz-Signature=8e9a7839ba332f717ab10fddc3b6bb7eb1265d0da87273c6a48ca950a2682110&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656QJKYX2%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCzC7gM4epNTdIWu3EC%2BHlytU9J7hmsQQlcNkI3XNMz1gIhALAd7ljbvOopG%2F%2BLaGDCaUKkMOENdoE2GpV0hN9urUJLKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxxa%2FrBvdOqplK3e2Uq3AODpmRU65wTZLn%2BCtieLISCcdtVmb5ypeheGbbfVM4mfBrpMFwEVHqqZ1Q1lL1w2rBxBxnjq8wPHXlbTb%2BZeX1beYjFGYNxCHbxxQ5X%2BK9HuaJX8yWcGdGb5sQkmgm6heD7iFK5hvG944u2bVY4RVXUobgjhqWGMXaAWCSA1BXfrtqXbHfdg40Cc0iLylF8E9fmNaGs%2BzBYzjjwY24QDST6JRVriTKmSy88DL0C7%2FJHyAOIXUBFwo%2Ff2tCTVW5mfsns%2BPNhERqGUg7GFSC4995TCWULEBNgQNsSwRzMQCR1nc8QlaNvY23NwVzqN%2BBn4xqEeqDTNapF%2FxBj2xCZmNZvLo7z2IvCHEKoIjQp5WkLXjJfB4Tyysrd9LMnWfmIEQzNr3P2qwVuDfqE8XkELNWkcMFQzx6HsH6TWz4J%2Bv7cBFQbyli2c4x6NyRsnCJMHh0oYZQlMt5TkEGtfrm97RGbDr1AuleyuIVRiFNcC2FeX3WxiWHI8IgFJ5ke6nwvrHUBVoesZALHOWjTW7lKXKjVrubTiuo6EiCnDgzBD8J0tHzTnn4TLzRm5udosFcdKA0nr6M9p1qzX5ruxroalqI8RyRtJ1d4wkOmE971HPnydcSynRek1yxp6LBuDDD%2Bhc3NBjqkAYOpRFSi5%2BOYAPbOGTHbpvrB2UySAa3wCphB%2FiGgFq%2Bei7xnJxi9v0BcGPAs9nHuYbSK0%2Fk1de4n4%2FTNi6DbfSAvc%2FS656QJLRgoQwDj0CEuSn0YvHKjwyiQLIqYijs9C9ntwGRPG%2BVY9CcTq6IimIv0MQwlfofyoLQqYpJPQDIxhDHVEsV%2BKWJm0O0hstsvh1MrvvNu27eNKPJzHnkEiBEq5n9q&X-Amz-Signature=a63b17f44be243ca45fbe328d44551844634e069790b582ccd9e610cf1e5d223&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIITUTKK%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAfVFAyiTCtOTCBcYSFdFs2%2FZxUKLOK84Ha2vzsJkf%2BgIgeSKd3xX15I20S%2B6Susjv1zwvhEiOf9SNFhqaGAl7wi8q%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDPct2LY%2Fjxph%2FMlFCSrcA9m7AbAph%2BfuZaLuRRlnKufOJSE7sdIQAGwFQyXjP9L4aAZ3EVU1ZswWLF8MQXCvoohybbdpthDtek4q0YR4uWwrMUWQVrDeGtZ9oRkheoXwTLS2tEPZ5eydUVmrV8Pas%2FyqOTXYm6s1lcTOZ6kYeDKzKvjgu2aws%2B89N6BVH6bicRfxMYBKx%2FxtN%2B6rx1IaHFEM0sfjexGRAJX85Pw%2B7DiOSEP39RpvKs0yqQzaYlowQbXjhplmCmV1Qz%2B3l%2FDgS%2BEEh97VS8ztpYChUtlhOr1%2BzqtQ5B0V6cl3dRsSYyPGoFhGvqXnne3bwaKWLz48PpTUbpQXH1%2BR%2FUQMgtdvmaBogLJGBtxalda4TeJWgPj9as33sA7xWoM%2FTTofl65mZcH65P2YNRqoiGSeb%2FmyygZgj5hGChSvTaxwLqXXyCCNvQfdreP%2B2%2Bl7AIX1kCkHLHW8XW0Odx9rR3QG4m56JIqeB6lJkss444GTxR1LXV1P1flHSDbJBkmAQFtJ7oGE%2FIe2dPENhveuFsdP5uiTU2I6dJemCQz5%2FMbqgLzkG5Prn9Ailp4hm8uzxyoQyaAqSc5kz%2BW1D62dH1jcbxK29d796eaZg0mXwrx6fmUOqldIMi3f2FLrv%2BxaXfWWMLuYzM0GOqUBMfcrgg88ytUTsEDy3wlQxG5DvC5wizL2PInuBOeKDBkwz7NBUQu%2B%2BrFxUO2M0TzmtDSACNwOdV%2Bom61%2FjgnitihXK4bDBIb5N3iIw0uzH%2B%2FoPhDvr5wxFkFgN5xe3QFVPvMg%2FJCQwM%2BEizy83GgoE7yWUmiz9hnezLtaqMGx2Yr3esds6mfY%2B0%2F3hLCJU9ntZKe%2Bd7SkMNu8jgaQf1a40YPfHddE&X-Amz-Signature=2c4a5cef7282fcf921cf25830d5feac4190d832ed5499f8621d507e075fb5029&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIITUTKK%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAfVFAyiTCtOTCBcYSFdFs2%2FZxUKLOK84Ha2vzsJkf%2BgIgeSKd3xX15I20S%2B6Susjv1zwvhEiOf9SNFhqaGAl7wi8q%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDPct2LY%2Fjxph%2FMlFCSrcA9m7AbAph%2BfuZaLuRRlnKufOJSE7sdIQAGwFQyXjP9L4aAZ3EVU1ZswWLF8MQXCvoohybbdpthDtek4q0YR4uWwrMUWQVrDeGtZ9oRkheoXwTLS2tEPZ5eydUVmrV8Pas%2FyqOTXYm6s1lcTOZ6kYeDKzKvjgu2aws%2B89N6BVH6bicRfxMYBKx%2FxtN%2B6rx1IaHFEM0sfjexGRAJX85Pw%2B7DiOSEP39RpvKs0yqQzaYlowQbXjhplmCmV1Qz%2B3l%2FDgS%2BEEh97VS8ztpYChUtlhOr1%2BzqtQ5B0V6cl3dRsSYyPGoFhGvqXnne3bwaKWLz48PpTUbpQXH1%2BR%2FUQMgtdvmaBogLJGBtxalda4TeJWgPj9as33sA7xWoM%2FTTofl65mZcH65P2YNRqoiGSeb%2FmyygZgj5hGChSvTaxwLqXXyCCNvQfdreP%2B2%2Bl7AIX1kCkHLHW8XW0Odx9rR3QG4m56JIqeB6lJkss444GTxR1LXV1P1flHSDbJBkmAQFtJ7oGE%2FIe2dPENhveuFsdP5uiTU2I6dJemCQz5%2FMbqgLzkG5Prn9Ailp4hm8uzxyoQyaAqSc5kz%2BW1D62dH1jcbxK29d796eaZg0mXwrx6fmUOqldIMi3f2FLrv%2BxaXfWWMLuYzM0GOqUBMfcrgg88ytUTsEDy3wlQxG5DvC5wizL2PInuBOeKDBkwz7NBUQu%2B%2BrFxUO2M0TzmtDSACNwOdV%2Bom61%2FjgnitihXK4bDBIb5N3iIw0uzH%2B%2FoPhDvr5wxFkFgN5xe3QFVPvMg%2FJCQwM%2BEizy83GgoE7yWUmiz9hnezLtaqMGx2Yr3esds6mfY%2B0%2F3hLCJU9ntZKe%2Bd7SkMNu8jgaQf1a40YPfHddE&X-Amz-Signature=12e3862b28d62d161f63481b3a3b57296d388e5aecb17d2ead79e99d7a70b28a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDEUNOVG%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIMEbSWlJuR7Jb8s7AHYum5RgU0r1JoFMsgDirRMYh8wIhAPorEM%2FjeGC7VuE6DYDoKwWFFdw2mbSfZNuccou4mlssKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgYkYjgdbj7cScK%2F8q3AMY%2BhYk%2B2M4zaP5mHzgR%2BZl4dZP0mQV%2FdUgKwRaP9Kh2PQTB13Cl1tfqHL8gEaZwdsnUZI9jDH67t477wkvM7GdAPsRB%2B9RdhNh7phms3UhdxxxiC9tFrm7%2BHNDhF54IdUR%2BKIuCbMbOC352kfJPwQhMYj8isyz0uHcaH0%2BU6vuJc5QMiRE6ruL0ZfVV06Y73YpDEqd78nj5NYz5uUJ5LFDMjoZDw7T0cSFWNy4hmH0EmkWjzs%2BKDP0gGZb84MZNbMwhs4pDbW2WmbjrMkEmyMTyxcGndxSQ4xBQG4ugIXXEKvZui589r9gslFRKKGz24ZHsLFO3gP5z0mEkSWw7yu6f6gh3J11ohxQlisyGQLEabvKUBFRBj%2FHiNEEgNAWxCy%2FO4nwrUrcqsC6cunadTt4fTwnF0OepR1G4uLdnmry%2B4Bjif23rbxsCkqEHk2eKNUZBxWNTppiSdaeATJZ17FVzqGaMPUPoDmJtAGAgNHBG6zrd41dtIkeGaKa2%2FvlZIaRvAroKIAbAfkjMApEyu1uxIeMFoZedDs20WBfpzn%2FQX6%2B52tAEpHxQtNEBMzOm15Ih86vueixv1lgeYWBbryygtrcKx6BuFEV6E1YO3R1St4fVTOd1KvJGX6A0zDyic3NBjqkASoQNgCvqskhcxdw%2BwVBoPqZRFlRgrZJimk1GdM56dZTx6VtJJxaPxkN4nYYo%2BDNMbtg%2BQ58EGiFwdngZd%2FFiOFTL4u6sh3Y43ap%2FLDgjSCrAhIo7Bhr%2FVv3HlZMsOrfZTJ2amsfGu%2BXsSIVdNl35dceuBDGaiEuUXg%2FOp%2Fvcv995PRWC1uapZBpgcJWEIoyJJJXzHGRjrJ8IS1Czyj%2Bb%2BlixP7A&X-Amz-Signature=da1ad27f7425044146567ae51b6475597a56cd6fe9af375621f8f05e6d82c42c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLZPDRW4%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCMVNaxAF1LnVg52IUlgHph9SJthVWYhuggX%2BrGK9OYbQIhANOGU21Obmgg8SEJLblDg46cGDooX3H0mUU%2FMBn6mhE%2FKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwd5%2BlyPbr9moZG47cq3AN%2Bphu%2BTr68i19LX7iY7zyeRYSDjD9OS0u3BBzA9MYRdOktTgD2qpw0xVWLA4MgBnyjZ7IbLXyEB9t7bmE2SzFqXh%2BM5UbT1cXXpBXHg00lLO9REOjGdKVS2F1a6WfvqpdCX9CuDFOr0Q7mAzdFOjwXut%2Fpgm2UL7TyH9NtWqew808i5HESdGOzusCC%2FtVN%2BnDUcygQKfP88%2BWSua%2FBXVc37M%2FicBZsEnXwPVuAPro9l99X2bVAoDdeAv%2BjNcw79HAyPNnKCj4cUsJceiQDO7VX3H%2BahchJpLqtrfWN5Px4r7ij9Jy6d7K%2FPrwH97lIvEfU3pgjykoSLKAsTrmkc%2FduEVqlo4BS6C2O7yqze3W3wYHrjyW%2Be3W%2BEucNPhwStgNlkQMA%2BXdG2N9aEMXVYXwD%2Bd0D7x0EPFY5618mJrwXatwFM05xBS615JhP%2BV4oFZ9QUhClThzfPWVVsAxmOBrN2EtSeeahzHd5yiUGLWH5mJpYMkXiQ6WgGonyjreSTzQLJjyPzf2aDeAwCR%2FSOLE8s7xVvSa34PnCs1rpd%2Fr3iBf%2FnJ%2BdFG%2FvRybbJgVHxd3eYHEIXBmTisQ79%2FdN%2BfdDvzGSlUDZlU4sK1YFg8n1YNEcKt43l0xYHjWCujDois3NBjqkASqL%2B9F5j9hlzc3wec6x5ZHySiljo9PphhQS44kpXFMVlPOMgkRd7YyEZPBov3spJ9x2EMvFXhw6dxWS%2BHa8OUnGd7yCoklQXCunvKfE8CAQqIHFoMPX%2FxZl6mFwMKL5jBPpDzxI8QUGBKIO4D1aE8xKild%2FHxts4EXzbJTdFo9i%2BbuGb8XM0S5BIWTmW%2FwmW91ca0ehFtIhTXB438jxwXPKeUoq&X-Amz-Signature=d7f5de5ebf2c9a6ec3ad5fab76d0b0e2cf46fcc56a9df15ff7abdc0807172f51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLZPDRW4%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCMVNaxAF1LnVg52IUlgHph9SJthVWYhuggX%2BrGK9OYbQIhANOGU21Obmgg8SEJLblDg46cGDooX3H0mUU%2FMBn6mhE%2FKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwd5%2BlyPbr9moZG47cq3AN%2Bphu%2BTr68i19LX7iY7zyeRYSDjD9OS0u3BBzA9MYRdOktTgD2qpw0xVWLA4MgBnyjZ7IbLXyEB9t7bmE2SzFqXh%2BM5UbT1cXXpBXHg00lLO9REOjGdKVS2F1a6WfvqpdCX9CuDFOr0Q7mAzdFOjwXut%2Fpgm2UL7TyH9NtWqew808i5HESdGOzusCC%2FtVN%2BnDUcygQKfP88%2BWSua%2FBXVc37M%2FicBZsEnXwPVuAPro9l99X2bVAoDdeAv%2BjNcw79HAyPNnKCj4cUsJceiQDO7VX3H%2BahchJpLqtrfWN5Px4r7ij9Jy6d7K%2FPrwH97lIvEfU3pgjykoSLKAsTrmkc%2FduEVqlo4BS6C2O7yqze3W3wYHrjyW%2Be3W%2BEucNPhwStgNlkQMA%2BXdG2N9aEMXVYXwD%2Bd0D7x0EPFY5618mJrwXatwFM05xBS615JhP%2BV4oFZ9QUhClThzfPWVVsAxmOBrN2EtSeeahzHd5yiUGLWH5mJpYMkXiQ6WgGonyjreSTzQLJjyPzf2aDeAwCR%2FSOLE8s7xVvSa34PnCs1rpd%2Fr3iBf%2FnJ%2BdFG%2FvRybbJgVHxd3eYHEIXBmTisQ79%2FdN%2BfdDvzGSlUDZlU4sK1YFg8n1YNEcKt43l0xYHjWCujDois3NBjqkASqL%2B9F5j9hlzc3wec6x5ZHySiljo9PphhQS44kpXFMVlPOMgkRd7YyEZPBov3spJ9x2EMvFXhw6dxWS%2BHa8OUnGd7yCoklQXCunvKfE8CAQqIHFoMPX%2FxZl6mFwMKL5jBPpDzxI8QUGBKIO4D1aE8xKild%2FHxts4EXzbJTdFo9i%2BbuGb8XM0S5BIWTmW%2FwmW91ca0ehFtIhTXB438jxwXPKeUoq&X-Amz-Signature=d7f5de5ebf2c9a6ec3ad5fab76d0b0e2cf46fcc56a9df15ff7abdc0807172f51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2KMI7XA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T231549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDaL7kRyPLyzxVT%2ByAGGSXtyCnuxpfVWSaozI2v138ZyAIgbXK2aEcTdOaH54TsLc4S%2Fz%2Bh%2F5w1qYG9RGzo3nPnpqAqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFxdrXTbVnRc%2F0W5NCrcA7Bj6RM9AdNf9rmYwSWEpfggqzX%2BdB08H9CXvEtIwbXR5MwawZV4v%2Fcd%2FplPgyinKNaxo8%2BrD3DWeL%2FBgic4y%2Fie5Fi8CsDaEeyAzs795pdNTfRlFfq6aTlWz9%2FRWw47IIa8TW9Ipij%2F1YjyBkJOmg%2B9cWMUB1LsMgKN6PWkhcgR15a7KS%2FVIePfKNBweQ89VtZkF0N7Ma5Dv1dN1%2FTP2ionZTKcOEPFzDZPsJE4OzVep32wRr6qVhTc2nbg3KKuXvvTU0lyv3GO36BgJvp1eHYZfJo029xTtyd%2FCXDurNbWv1WOqhhjQnmLRo5GYjDHnmCLgVQMKfsUKw1ulrU2wBG0uE1J1lRyZG7YV8DsaS4oSCt5p2xRKeG38tpXK2O87zVOJL%2FzH8lbGLyAWv4XRTSnHivqpZtmnFd0cUiyHuJ5hyteuLNVTbMOv%2BMv7WNyfzc7g83iu4C02LC9NrfqB%2FT2oSF%2BvVhW0JkuNOnVNPlH5MbtZDkWApd0fnXmkRXVwHnklszL3vmcRU4GXcD9y%2FpWDu5u43VDzsxo7sC5wSimRr82wD3TcfyVY2oxomPdkTkprVYNfFtIbDQijI4NIOY1VIEX%2BzJHIjUu8dhpp9pakudlrDYqjhvTySdLMNGKzc0GOqUBehbWqZlaAjReMVJuU%2FhcNIrmKCU37jvXiuY96b57EqBpTNvo%2BDlCxTlecFqJJrYDPfY3LkklyVtJrrBV8CIqP2N4qNMNvzkiSVR8B6JamQlP1UT3O%2F4reAKkYqMtPpmvyeECg2TRJ6VGSxR3udOPUGnTuaPcXh4QukkrkAjBDHKJFwgoj3B3q836GN76uFvoztmTiucTl1VNuxlNBdQlEZZzlfjE&X-Amz-Signature=5183aecb393ba50be4d9266fe978767237de201b8bed960cf1634ba002fc2c85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

