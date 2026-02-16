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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SJZVW6K%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD3DQwnCVL0ghIymG10tNNvNNUW0ZU14v40PgOxBzwjfQIhAPjDfNAg0eocU5FIjgJfZ5dE0ZkntkhjekZNtT343KfvKv8DCDIQABoMNjM3NDIzMTgzODA1IgwFuZNUC3cv1S3ZssEq3AOYX7mtYGUkXi8Xh1SYLNO8FYZsa1IAIa4fwpV%2BBjNqWUUZAxnoOX%2Bzj31Z6DYnjg2YPLdYh3WfQjxnRpAudxRZcTDnGNmKEBjGi675QHPldpt8jHssNA38iZ2j6gWmlEsF4%2FA%2BFnzfEth55Ydh%2Fgh0bxvveAdzO6s7m%2FSC3IV5geteOF%2FeGsExpJU70fAOWvcVVc%2B%2FYhHMDZ1gCvI154EZsGZ5J%2FRWpT0NwJq%2BORx%2FbRlLGb%2Flgk%2FevhNBonhLJNQnes5Y7WLyJepoV3yxRR4TqreejEDs51lC2SjS2LhpDWtRMchCpDW6HnHyptjU8oYnp0zZSKftlu8kbJZRoOeC5o81BjtMqWP7%2FEvKQwIzhV5tPoBkl6Dsww6A1XGmfm8PmGLtBwP86qvcLcMO3BATntI2M4Php5n%2FF6B8zNhQmjeolVKya9mOJP3R0fZS6QorCRk%2FEAlB0hLkr3avovBXrEh9NWtQQyLM2SQeS8g3hHI7bcYt1TbU0A1DJ9X89yL%2BgjlC0Grg%2BQVyKzj7n0zt3nEFnPlgpTqyOgJ5sF%2FnQfF64U4JLPWqvvoK%2BytjboeBeIhTRHGyRRGi7p7XOiBJbX96gg5otHzFq43EiIUJt1j9pomXf6N7cPpYCTD5wcvMBjqkAVIxm56FlcJIlk%2F1WOeq8TXmPomRsKy8WhzSGivTHHMGi55%2BXFMbIEuGAx7OKS%2BEcUNROQkxoJxk8ECtXnQQ9fyuwM22fsK4KL4SWR6QjCSi5xfAjrzEzXil2O%2BM8iL6VKTradnfFYR82C%2BGiyjb4XIvgzvQcIpeSn0nQELbKNcolaI6f6%2BakpQjsCrRZEJ4Mq0enGKUG7zB5dtZQuQ7wltoPGhz&X-Amz-Signature=2c1b525151a0617dd102cfe19665d238635580f38117da079db27c5694a3e616&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SJZVW6K%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD3DQwnCVL0ghIymG10tNNvNNUW0ZU14v40PgOxBzwjfQIhAPjDfNAg0eocU5FIjgJfZ5dE0ZkntkhjekZNtT343KfvKv8DCDIQABoMNjM3NDIzMTgzODA1IgwFuZNUC3cv1S3ZssEq3AOYX7mtYGUkXi8Xh1SYLNO8FYZsa1IAIa4fwpV%2BBjNqWUUZAxnoOX%2Bzj31Z6DYnjg2YPLdYh3WfQjxnRpAudxRZcTDnGNmKEBjGi675QHPldpt8jHssNA38iZ2j6gWmlEsF4%2FA%2BFnzfEth55Ydh%2Fgh0bxvveAdzO6s7m%2FSC3IV5geteOF%2FeGsExpJU70fAOWvcVVc%2B%2FYhHMDZ1gCvI154EZsGZ5J%2FRWpT0NwJq%2BORx%2FbRlLGb%2Flgk%2FevhNBonhLJNQnes5Y7WLyJepoV3yxRR4TqreejEDs51lC2SjS2LhpDWtRMchCpDW6HnHyptjU8oYnp0zZSKftlu8kbJZRoOeC5o81BjtMqWP7%2FEvKQwIzhV5tPoBkl6Dsww6A1XGmfm8PmGLtBwP86qvcLcMO3BATntI2M4Php5n%2FF6B8zNhQmjeolVKya9mOJP3R0fZS6QorCRk%2FEAlB0hLkr3avovBXrEh9NWtQQyLM2SQeS8g3hHI7bcYt1TbU0A1DJ9X89yL%2BgjlC0Grg%2BQVyKzj7n0zt3nEFnPlgpTqyOgJ5sF%2FnQfF64U4JLPWqvvoK%2BytjboeBeIhTRHGyRRGi7p7XOiBJbX96gg5otHzFq43EiIUJt1j9pomXf6N7cPpYCTD5wcvMBjqkAVIxm56FlcJIlk%2F1WOeq8TXmPomRsKy8WhzSGivTHHMGi55%2BXFMbIEuGAx7OKS%2BEcUNROQkxoJxk8ECtXnQQ9fyuwM22fsK4KL4SWR6QjCSi5xfAjrzEzXil2O%2BM8iL6VKTradnfFYR82C%2BGiyjb4XIvgzvQcIpeSn0nQELbKNcolaI6f6%2BakpQjsCrRZEJ4Mq0enGKUG7zB5dtZQuQ7wltoPGhz&X-Amz-Signature=2c1b525151a0617dd102cfe19665d238635580f38117da079db27c5694a3e616&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCHGINSZ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCxkhODur64nAmnqm%2FCw4CrA6ihiBrdlAOvofEreD1ecAIgAvw%2FUwdLV4xmASKrz4nACCDswHSSc5jlzS3d6AaElE4q%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDNWekDLcxtDxoPLMXircA2Rk4zBwDgYnq0uKffV%2BRlLMIrWrinbvNnCMzRUYTay6I1upx3eb4IohBMASm32OiPSxmgSFFAA8%2FjjlLqY5egAzM7kOUoPfXDUhnLayN0EmJJT%2BiECTO%2Fzr4ZMIJVzOWoLezy9wLWuMOUTckkBm%2FYiJ1EuFF1CZk28y4vyvLyrVnRXmaxles1LH%2BA%2BR%2FXdwo%2FtbDz5y3QwTdlauUnw1IsOmv6UZg1wN62%2BNKh0zQzwyHzTao1fDGFBQnjuk1zltioY3VM92xXFcpCxv4Gi1zrXJkQpGYZYFjuBlwvrm0boOLs0UYrIePQhndWT7ielGtcGFO8RdU9krW%2B0nHnx63MCKOqbbqYG1lnqt7%2F35aVYMPmxNfbThbt0NZJEuA7%2Fr0X47rrrJdt5g5T5XQ2krx8qlU66rtORC8i7ObrZGA3Q1qll5A7FrVDzMWxqpNmMXQVlU0nRn54uYngptEOSfsS1OPuoXwDapRUqcVEC5xuQieN6JpJCSzYwduBQdu5nF1cGOxWRUon02SAkzvLjaqUUOeJ7Q8upWkNbLYEmENLXw4fOhTItfmex1wXTmpPnh1%2FRcPx4nwlI1U8GXk8lppdtIA596HjWONbSRzd8K4QheyoKWQJCjexAAWnpiMPfBy8wGOqUBAfVUVk4sZBaCX44ZQwJkIVKC1kri3eIasNeGa3CgOrECEtmw4ZX9VRU5N2CvRuph6D04K6QnFuqSYOBvGgFb8C1rH3%2Bmge8bcfY2Vgn6i2WZSRSpijszChCd63vodTkQ5o6CQmovnv7aBRoFq0p5c0SG2YI3ZUotvewUDtvH6m5TrtdCjer8B29y93M3RIxtmhnTc3pT4C%2FL9UYahsHXZMaV2DIq&X-Amz-Signature=5a052a028f6b25188b16398ccf372789a91cf0172334f32c5abaae3f39d5ece5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S5IU4ZE%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCiSMZ%2FrCt8C8k0oufUc9wiBBK%2FyrZzBFASRxXen2k%2FeAIgXa8Uoksrf8VloJh7wXrJMaIxOcwuZgBjD8azO3vLcPIq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDKAwEVH7znWMcYPvFircA15wNnmWcalI5PxgoY8JRBiMIcvJB5pLb23NJcykobPiqKAQky%2FxKXg8hujrvj7T50E1P8XFyvjzPv%2FArRGMz%2FPU3FSDybOs1oHKXTwaxbd87CL7rvRqJ4UBiXoJXPTZOh2xMokNUmBA1Lw%2FrdxqV474gyLLBjLxhI%2FwEu6KUUomNr%2FqRCsL6vBLhzCGGjWjYT7KfOAhalPvi%2FNQggW4Gcawd%2FQLHTZVtTI5rfmh8784rtMekLHrV39qD2lVzY4FdrSdhRqn%2F7di3IsEP6t1YSzGobfIlKVmT9kpKRpz7lK%2BbjnBNRyNgAQmPhXOEsoXEUJGUuTNB46RS4MwiUS7t7nvesk3Bs9zLHl4oKqVnuQlVbnBOwHzCuS4DobFmPj98HZeLFWNp7%2BY%2BiUIUi3F7dugBPBZaolD6XkUPnPcsjLILRQgCpdt%2BSDCqVQBi8uAzLVTaIM2Y2oSf9uB1z80raFiXIqfwYg22dfOAF4UU%2BCpcTpVMLEUO3Dd1St4Xu9u0Ir4y4MtxdYuzeoNpwTJ8c0dEfw26a%2BX1xijsG5wr6LC%2B%2BFEsp2qaNrcJOpYXSIauzrTIIplVHWxEIFEYItjNBB7nRnXQazIyWtjFz3A5kv1dkkGkDaiJdAeqJC3MNzBy8wGOqUBfbKLMX0SHDPpqdZgmJmJj5VxdZcrphx%2BL3ga6dOMCL%2F3aCdWuymeknJdR7lc%2Fwx5C0%2Fe2ZasDg1d8a5cDKURffFIVkeR8mg%2BnqqdeoTy91lc00b5cvYsZAa8yquKQ7ulWzftTKWKFpzEnlIDg77ANuRmBQgtcmFHTMxpoPtMPYWOc6eKTP8aeoKph9qXqiGv%2FIcIdPXj3DP7XyiVccQcSLLZ8w1m&X-Amz-Signature=0c5638bdff1c3945d9d66970acd17dd78aa79b9541403453428dd9d20f499bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S5IU4ZE%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCiSMZ%2FrCt8C8k0oufUc9wiBBK%2FyrZzBFASRxXen2k%2FeAIgXa8Uoksrf8VloJh7wXrJMaIxOcwuZgBjD8azO3vLcPIq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDKAwEVH7znWMcYPvFircA15wNnmWcalI5PxgoY8JRBiMIcvJB5pLb23NJcykobPiqKAQky%2FxKXg8hujrvj7T50E1P8XFyvjzPv%2FArRGMz%2FPU3FSDybOs1oHKXTwaxbd87CL7rvRqJ4UBiXoJXPTZOh2xMokNUmBA1Lw%2FrdxqV474gyLLBjLxhI%2FwEu6KUUomNr%2FqRCsL6vBLhzCGGjWjYT7KfOAhalPvi%2FNQggW4Gcawd%2FQLHTZVtTI5rfmh8784rtMekLHrV39qD2lVzY4FdrSdhRqn%2F7di3IsEP6t1YSzGobfIlKVmT9kpKRpz7lK%2BbjnBNRyNgAQmPhXOEsoXEUJGUuTNB46RS4MwiUS7t7nvesk3Bs9zLHl4oKqVnuQlVbnBOwHzCuS4DobFmPj98HZeLFWNp7%2BY%2BiUIUi3F7dugBPBZaolD6XkUPnPcsjLILRQgCpdt%2BSDCqVQBi8uAzLVTaIM2Y2oSf9uB1z80raFiXIqfwYg22dfOAF4UU%2BCpcTpVMLEUO3Dd1St4Xu9u0Ir4y4MtxdYuzeoNpwTJ8c0dEfw26a%2BX1xijsG5wr6LC%2B%2BFEsp2qaNrcJOpYXSIauzrTIIplVHWxEIFEYItjNBB7nRnXQazIyWtjFz3A5kv1dkkGkDaiJdAeqJC3MNzBy8wGOqUBfbKLMX0SHDPpqdZgmJmJj5VxdZcrphx%2BL3ga6dOMCL%2F3aCdWuymeknJdR7lc%2Fwx5C0%2Fe2ZasDg1d8a5cDKURffFIVkeR8mg%2BnqqdeoTy91lc00b5cvYsZAa8yquKQ7ulWzftTKWKFpzEnlIDg77ANuRmBQgtcmFHTMxpoPtMPYWOc6eKTP8aeoKph9qXqiGv%2FIcIdPXj3DP7XyiVccQcSLLZ8w1m&X-Amz-Signature=7c44ad550522688c103ff35a95ec653d9181a7a5d1ae654182618134d6fb9c0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646NNY6VL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQCFn%2FBaTycXZ4gQUizGh0Z%2Fv9bKArlGZYD4tgyNeJgROwIgDth9I8KSGFgwe6DHLf3Ay64O0IPZwJFRhbzmrdYCeJAq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDBg4qpIojSjwDtzuLSrcA4NnxSj7gPt1HYZ%2BIS%2FsYTHqfgVnA2EMzu5XG4oxjoSmg%2BJGS8RyokQSBph0ue3SK8NbVpUtyULo8wWiTSsJbSGWKLJY7SsjSTic8uK71pJhdRfwd4CxhdYbZrI9dA6v6PY8g8hhULd%2FpfEtZIZoEAno9AcuJVbXIn0r0byUWPMX5rz0JPKMi%2FhUtakLMSWOVZu8%2BvSZLULnZuSxHoC2fnXNEGO0BlnXa7mJQXPKAJZjQr0cNfoL5J0FKcvHazYMLMBjcrw4DoLROmjT9sqWlOAWulT12%2FEm09xAHAUQr%2BZfr%2FDcTqeEAgbXVmf4c2jvBdh5WLfMh3meg2n2bzH5Jvomrbt2cpeN9PctQubs8SBuAsuxgD6PtRXgPfZx8hnK%2Bs%2BRaTMJ74SSXv%2BDhp4jXO0kIlMtV3JoYEn%2BXzVzimX5eOFYoayOuBj1s%2Bbe3shRs6QAyqseTmRYyRZcb57JkyM4QjqU61BRZUkQvLSZsxOIKNLCsnnLD1APlKvW4OyUe%2FvI5YhDT2Nz295YXrHI3uXSAPOQVoPo5gQ5nbM6yyoM9K4MqIgJZ%2FU4mqhCL%2BPAiUn3SxjtNUCpW9uqVL8kkwfY6C6fQQVFP0JrM8pe%2BKd8qPDK29YCJs%2FZwfcoML7Ay8wGOqUB7AtwyE%2BPlU6QeHyehL0olCAvK7Bn8jDCRlXcbRITSwuWzlTJ6u2c3q4ZFZvRTIcnatIWDc1xG%2FdI78iC8kgcJtpFFPElc1BvBpA66skluI2h96WXopq5QKGO11AKg8RTHAz9Jy6iNIijpnCwwT36w1X4wsPZAFoFbTMlSe3EBBm4ZAOnNwsEmCO%2FcMqNVA1tGQ1Qfzcms5YLD%2BbBMS0Q9iCnimxu&X-Amz-Signature=965c13bc17441a83fa9d6d3dd72dd8dbdfca5845c43ecb9e17f5d44d68585083&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Q3E72PL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICvQZhglT3PcyeQjvudL0%2B7s4Bj86v1dvOzd9pzSIZC%2BAiBnIbaJC826iqRsoRnkhSJ4%2Fd7IUVPy6gLW%2BqzV8Koz9Sr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMdc0gN4zE4kvNDYtJKtwDIvYfnbVTLzlK6N0hPhO0yN3O3fUugBKRmxyJILDVaq5gGZOAEOdYRVWQYDKhSiGPAuc%2By0Dy2pqeF9RfmtOtSrpbVnfoWlGzJD2EFW8cO5BUKtiorj6Dpe44hiDyywM%2F7ruFT%2F8iSo%2FcHi4%2BvGO7xCV27sjUEn96lFer%2FkfbBS257RcuAdsLNrql4OExkDI4jQrZtaUf4SYKAoJX9Gf%2B6M3RkCS1tqHgroKjF0V1PfGAyT3YmY%2BVi74QTFzdd%2FzNrInKvaJVnDZ4H%2Fi1SsuLzydk%2B1AG0LBGt9NGhoPMWGPBUpPFcKDwYAy1rgMqur0feQjmSkdllfrr8jb9BtOjZd2L5D3hf8GfmUQ1M5Yi0%2B0xTN%2FvX51k%2BjkfnBxLAI4KWtFD%2BcxE2QwpvWkMP0til7oAqcAOWa8xgrevKb8q%2BCPIjFsOSTXYhwlZOVoD5auAXvLAmSNG0qEDowN9jqnzpOvYYhYs55nwewgEOj%2B95nW3HoAVJppeXi4Ic8UvqKf81Yx6N0Q3Nf%2FJm719N6USlSJNSohXlWkJyfafxwKAOsKPO3qiTfsFSsscrezZ%2BIgArs8mVR12T%2FyU3VRlqkVY6IKjCC%2F16p3%2FJfSptayhNDYnkY4yWukX6V92oAAw0MLLzAY6pgEwAPoE%2FnrsE0ur0F2%2By1CeIArbd7xRIX3PPcdwQvDJGGZGlMn4A6B%2Bv4Od1uYFxYSNJG6d6Ta6uDHgia51bjAHiyHdyCwkjZIrQP%2F3FHPLepv1pL8n3vjo4Qz3YtSbCF6jKZzkT3qyDwGMv9pFlOYZ%2BWFHJWIn3ioRtK4kqA7k6PmKlGQ8MAQ%2BhefkrPgSZY4D3iSExFhzLT0jO4MywBGXXArNv3kz&X-Amz-Signature=4254960d16e74bd32fb1f0f949826601c3c16e8841b0c68a72a94edf7c96ab67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HBQTCI5%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCeEKKX1%2BKVwK8AvXZZeZhoCZMRmybz%2FoKOwgTpwU868AIhALpq93xjXfOMbwti4Cq4go%2FMTYJyhaoTdEtFw9l5LLNyKv8DCDIQABoMNjM3NDIzMTgzODA1Igynx71GHOSy6PvCstwq3AN6kJNXb4g41IacJUFE4m%2BAMnzSshfJCtklmg5l8mKDr7xFOdWo96H9I4oI05MyJcIkTPRoPTIrx1ZoU1J3PV7Us5il6AWfHG0ImeznqUFaFjHWe9WKDTZunEJeHfufiRv69xkuVF%2Bc68evIOxFkamozITdT9DQRMvFMRagT2X8ycvIlkxLqmBmAlm6WYHyAlTyuZvSAe4cfL72jg3g1L8FC0hfSwVoJ7xEo%2B3qdZ8C7CgB3ATzCHzmeDhaqMbU5hkCk9x2HVKf84GlQkzSYmaR%2BeQsZg4niaBIMebDLbY3Ci4TQZ6%2B8hEYSI8am0aaVxd0C%2BcMSZrAnJmFBZaoOh6BhAzQxssKK64lJAvIAQFeirM0UNVwmGOSLAu9Ia%2FPgCcCNg1Lea2GGJkm9D9K%2Fraq2jgEPw6auoRQGJ6bvg8r31F5XeAgoUaFzltwcDQiTMA5utx%2BhcHUoKeqdRDAimNa0WFAM%2Fjq%2FpebW1khmsAxCVgBLPPDj4Kw2D9EVGu023FRcNQIYeAe4n7yywFneW3ZhF%2BSoVr9k2FarWY8wW26ds%2BR%2Bya9N7YQ4saXpjsfehRfxVETld8nCfm2EZHB5FTiEAfVYuMnbfbXXzx6A8DICn3s06LDOnaSSiDCtjDZwcvMBjqkAT2cqDklf7tK7QkGBqDx2pVWVHXVoOyPLF%2FBsVZR9uzK%2BWHStqnED6KngLhga0NKYru63Evb3zTPokoHiCoQMop%2FyeVLkhGg62VVfHenB56o%2BpSc3OEw81KFVvcqOH0fO0HM05XUENPcOOmQ4V2I9okSVFWCeTtK9rhBeLSk6nQ9iZ%2BqKeVnqriNB1yJl7R1rT0eM8cZfHvYWfln%2FAIqILVQKfdm&X-Amz-Signature=81a8a67e362f16fb0db36fdbc6df087a8163aec4bad965b52c387a25f0018164&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHEAR7SE%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHt3Q%2B8vBxte9MnV%2Fed2lUZJdGwHF5Uw9bJUFYqxyntqAiEAmhtojeqDYWN4Vy3do6f5Nbg%2BNbc%2FMFEZRHskbDLihvEq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDD2EjdFgeRa2IFFpFCrcA5YZihyQSRlB0KzYZcrsCR5RrCPE%2FdRznF2x50M3IIZXPrIA5XkHLq0dirVDOxYOBqedPZIeRQGbInD1l6XTV4u%2BZ8juMlAijw1p2%2FWDSIk4fgKx8veZ3tRmrw1iJqQbYrvXy21STb5pd%2Bu%2F2qRuGdu%2FXufzcF52AZEQGdBnJYH1THYUExhUU6%2FODk5Q7dLRj7i2IpvYbR9KuUYd6R5ljlxMaBGRxlnEzsvJwNGy%2BpltgCIqTDKEBQ9RKPs3192UzRYFKxYQn3lWXx%2FrEeV5cYtDv%2BaBJJZjNnGOC9jscWLqYMtlmUrNUI3SSK9la4U2NcymdGU%2F2cBEeQsOkPtKDM%2Fq9YKP5bH2Xx1dlCtBS6WlSVPUZJmn6R%2B33o2yVJyRIXULEtE9wpLL4zlFS9Yd20ARlhlz%2B4yfqOSHYk%2F9KhnQ%2BoCxgPz2bxQVg8WfQEXMNY7ftHJcAR2AXIezJ9nj4CmfMfpS22VLoN0uEaRbzWGB0IuWcjTka2OHqaZuWCPqt7xiHsw39jJpcOGqL%2FPCdEdjU9hKXwobdLdcGZRv9p42fk%2F4qGuRFFl%2F%2FfwUjnkN7HLwdALN1tqaSQu0wxarFSNsYDXp%2BltjPJwaQFKZ12uq%2Bsjp0hPKKUBzj%2BN8MOPBy8wGOqUBVUihvo26w%2BmO6jkOw6D6kk6owm9BoxkbxfOaVL01xJAsK1giviIGDQgeoLoUKu%2F%2BrKKqtlNruVv4jsGvSWLth79PkoZQ0MHnklgPfkYFVWAU9kn8%2BPMeII1fiYwa4HsCby9O%2Fu1lDXlr6jsyNED2HNzBLbr%2FXNGr28tsb1rkchV%2BFPOcywT2HNHarzDedM3Q3Bnkm0yBz7iITHUmJKlsAqk1cL44&X-Amz-Signature=77dee46b5711b7b9646dafed39347f5d33219ea33c7c93b6d3f74d7d22953241&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHEAR7SE%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHt3Q%2B8vBxte9MnV%2Fed2lUZJdGwHF5Uw9bJUFYqxyntqAiEAmhtojeqDYWN4Vy3do6f5Nbg%2BNbc%2FMFEZRHskbDLihvEq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDD2EjdFgeRa2IFFpFCrcA5YZihyQSRlB0KzYZcrsCR5RrCPE%2FdRznF2x50M3IIZXPrIA5XkHLq0dirVDOxYOBqedPZIeRQGbInD1l6XTV4u%2BZ8juMlAijw1p2%2FWDSIk4fgKx8veZ3tRmrw1iJqQbYrvXy21STb5pd%2Bu%2F2qRuGdu%2FXufzcF52AZEQGdBnJYH1THYUExhUU6%2FODk5Q7dLRj7i2IpvYbR9KuUYd6R5ljlxMaBGRxlnEzsvJwNGy%2BpltgCIqTDKEBQ9RKPs3192UzRYFKxYQn3lWXx%2FrEeV5cYtDv%2BaBJJZjNnGOC9jscWLqYMtlmUrNUI3SSK9la4U2NcymdGU%2F2cBEeQsOkPtKDM%2Fq9YKP5bH2Xx1dlCtBS6WlSVPUZJmn6R%2B33o2yVJyRIXULEtE9wpLL4zlFS9Yd20ARlhlz%2B4yfqOSHYk%2F9KhnQ%2BoCxgPz2bxQVg8WfQEXMNY7ftHJcAR2AXIezJ9nj4CmfMfpS22VLoN0uEaRbzWGB0IuWcjTka2OHqaZuWCPqt7xiHsw39jJpcOGqL%2FPCdEdjU9hKXwobdLdcGZRv9p42fk%2F4qGuRFFl%2F%2FfwUjnkN7HLwdALN1tqaSQu0wxarFSNsYDXp%2BltjPJwaQFKZ12uq%2Bsjp0hPKKUBzj%2BN8MOPBy8wGOqUBVUihvo26w%2BmO6jkOw6D6kk6owm9BoxkbxfOaVL01xJAsK1giviIGDQgeoLoUKu%2F%2BrKKqtlNruVv4jsGvSWLth79PkoZQ0MHnklgPfkYFVWAU9kn8%2BPMeII1fiYwa4HsCby9O%2Fu1lDXlr6jsyNED2HNzBLbr%2FXNGr28tsb1rkchV%2BFPOcywT2HNHarzDedM3Q3Bnkm0yBz7iITHUmJKlsAqk1cL44&X-Amz-Signature=df21132392a733063016fbd655798b5726c0bffc8cae38cca584f744c5f871df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBHMU5DR%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDk683Y14ddYPayvp9dO%2B6c%2FzFDEv9ZsBXWf6in62EfKwIgQEuqHKLqXR%2FlacamcFk5Cica0uotd%2FzG26Z7Q7m1M9gq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDLM82MSaPO8S8mFDAyrcA1FvuutGbKGwZnpnTkSzCl%2BHe0lJaOZRpFyrkoXnuhh%2BjqWRInJCdXNCQJSBFNSJKJQt0Grc0Rmh%2BzE7HlTv8loiK%2BK%2F1dKTDCLJeTnFYAL6mNac56Y%2F%2F0a%2BYAf9pHQ99vnOlteTiZwM%2FiFhBrjzq%2FjeMoO6w5iG41i%2FeaHzBJOR81fSSNbhMtEac5xPLyCBYtGZzREzITfiRYoHzHyK8tyz5LUMWDe7R6R78YcXIrggxSYXMg4afE2GrHL2dv55oHc3EeJ08AMQaGCkxsre8g8ceEVzq%2FByiuFssn3vjHLenosouiA0zR22rmyzMVbSXlHBEFpcl0wcjtNq58EVA2jl5ek14iVlsaF1iwnaXf2Z7M3NQzaN%2F9nhBjlZklTG05Z3Z15CpleFtS2HRqWx7laxC%2FBlD%2BH6srSufPRHxRKZIEAYhVHgTEkfcRvaMt1mQbU0tF8I2P0Koir4hjizeyWi%2B4ufm2mzSdrT01GY%2FzrU1oFsbJ5tZFtKIzlq0ukgSDPVOOuOcXegVm8Oeg%2B9TSAkR71qrWXhWY7g%2BCicrlc2xJJFqWDjZNb%2Fk%2BWWdNObgZ7bOw7Kw9tMjtkz9lmJA%2BAlh85qnjmigFPtjUqXZ8ZW8XIjSbsQ9A0mLENIMIPCy8wGOqUBd69EhLy2XUv9Snm7o5VcS%2FI0CO%2FxigOowhf7eWvDhb9wFbUZGJyZQV9NweO86JjKYWVH%2B%2BgYahl%2FJhbfYpEmIQG3%2FJouZT%2FvnEO%2B5OdXEej5%2F%2FKmmebwg9dIb8Ttab8lOcYrzfeviDybkLj%2BCNAq9Bv%2FnW3IIJjL%2B4r7%2B59UdKSsmAJ5UzoK%2BWTllo%2BHvVczXtYjXnSDEtIbaf%2B3UQnmCJRytRRg&X-Amz-Signature=cfb2931fac3ca6c582e6b0276dad4b6a68f5e978d52d626d50796bacb0f47963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDM3KPBG%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIDg38miwTIlResWVYGnfWPVrHC7wXUejHkeHEKyFPyvUAiEA%2BDt0aOIcJu3fpMPJl%2FNUNX8GRikZkxSRO8yMAU6Hfmcq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDGsVCrYM6YQMWatYfircA8UqdP3CzBJ4WhmNlG0Z%2Bau%2FxadmtEswgC0qc8e26GBPKvJWtUZI91EP0jkUY49EI7VSFu5cOvfMAfTYX6%2BA0u%2BWUQ4A0t%2FNd7egB5h13HpR4V8I%2BOTPnegxrW7DNIv1I%2FGou%2BnN0lNH1cLgJbhm%2BMI5jYmSkwM5wyicfy7JTZliTxnVNd1Z1C8MfT4idFJJi663hk%2BKgFyOTChH9Wsex0S%2FzjF0SoLOm3q%2FpOPPvqWKQAL%2B0xZDaDf2s2Nukhm3Hl9clHRgEikqBdKpyT6%2FEbfW1xwKhrQuMc6q6zs9onVuJspCiWnBZDxzwP0xC0GXud%2BueP3kAnVFtjVObLZbMxzKjsgSy423b%2BjwiF658FwQ9QaRG8hg3%2BRG5jRdr6hcFaobTbIZOdCmSWM5cUgSP8zl7PJCmaH8axkfmKq%2BgNKMg23VczzFlznOYJQRkhKf9tof9Lp3Ou9HfGDCAT3rg4mnsg5cYaXhEH3%2BAqsH%2BINeLBsYftkBv0s7MmEhL8zk3sgVdiLJvfndOPN1WPJmK7K9Ek%2BiusqPx5RiBSCwzvaFuU5BgUb0Yev0vieBdOpir9qJhS5DaJXXTrlRRNYvssiBM300469NYiDnsr%2FaoesiSrPNpJ%2Bl2gCEmDC4MNzBy8wGOqUBTQpYp9Ay0iBuq6pZLDusJSh%2BSaVI5qyeresBCKa9NW5SP9%2BRwbZe0bVbUYTorq91eWXu1%2F9hOwdUSw1ndIyB1n%2Bef8J5yr1%2B1Y%2FZQzlLNWXsJwtadlK8HXIxKktdKCsElN02clea9RE34%2FRwpaZfNPrCCxwRVJDNvHIkXBuw4Xhe4uh81qbKwvYP%2FCaicyRoirN4idN49jjGijjRZef7Df%2BttG9i&X-Amz-Signature=4358ad6e5812bab2f61e41382019595671a42dca55b5b77dd9478c2fdcf5465f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDM3KPBG%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIDg38miwTIlResWVYGnfWPVrHC7wXUejHkeHEKyFPyvUAiEA%2BDt0aOIcJu3fpMPJl%2FNUNX8GRikZkxSRO8yMAU6Hfmcq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDGsVCrYM6YQMWatYfircA8UqdP3CzBJ4WhmNlG0Z%2Bau%2FxadmtEswgC0qc8e26GBPKvJWtUZI91EP0jkUY49EI7VSFu5cOvfMAfTYX6%2BA0u%2BWUQ4A0t%2FNd7egB5h13HpR4V8I%2BOTPnegxrW7DNIv1I%2FGou%2BnN0lNH1cLgJbhm%2BMI5jYmSkwM5wyicfy7JTZliTxnVNd1Z1C8MfT4idFJJi663hk%2BKgFyOTChH9Wsex0S%2FzjF0SoLOm3q%2FpOPPvqWKQAL%2B0xZDaDf2s2Nukhm3Hl9clHRgEikqBdKpyT6%2FEbfW1xwKhrQuMc6q6zs9onVuJspCiWnBZDxzwP0xC0GXud%2BueP3kAnVFtjVObLZbMxzKjsgSy423b%2BjwiF658FwQ9QaRG8hg3%2BRG5jRdr6hcFaobTbIZOdCmSWM5cUgSP8zl7PJCmaH8axkfmKq%2BgNKMg23VczzFlznOYJQRkhKf9tof9Lp3Ou9HfGDCAT3rg4mnsg5cYaXhEH3%2BAqsH%2BINeLBsYftkBv0s7MmEhL8zk3sgVdiLJvfndOPN1WPJmK7K9Ek%2BiusqPx5RiBSCwzvaFuU5BgUb0Yev0vieBdOpir9qJhS5DaJXXTrlRRNYvssiBM300469NYiDnsr%2FaoesiSrPNpJ%2Bl2gCEmDC4MNzBy8wGOqUBTQpYp9Ay0iBuq6pZLDusJSh%2BSaVI5qyeresBCKa9NW5SP9%2BRwbZe0bVbUYTorq91eWXu1%2F9hOwdUSw1ndIyB1n%2Bef8J5yr1%2B1Y%2FZQzlLNWXsJwtadlK8HXIxKktdKCsElN02clea9RE34%2FRwpaZfNPrCCxwRVJDNvHIkXBuw4Xhe4uh81qbKwvYP%2FCaicyRoirN4idN49jjGijjRZef7Df%2BttG9i&X-Amz-Signature=4358ad6e5812bab2f61e41382019595671a42dca55b5b77dd9478c2fdcf5465f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4PR2LD5%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T093824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICP3MQ2ZNb6nvxgqpBNHnq6hio58v1hdiS7v725%2FtGheAiBXxoZtW0wnpanOeYcP%2ByraWdhS6zLBETNl5Q874q2K%2FCr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMhavakEGLfpUyNZe0KtwDxQErcc%2FghdWSQZe5pwKwGPDhFefM3ncrROFt9f2P%2FKihNpSysxqpBvkkzgpN4d%2FspF5sCUGQBc3bz%2B4BmRt%2FtLze0deyXbXNfS8aR3z9h5e%2Fr9L1nv%2B%2BgLJi2zpLB3Yits%2FJ3a0paYNbM2QQ643R75JVchUdP4Nrrj8OW%2BaDi3f%2FJL3sfG023jhjBb7ojn4dmrXbRpKxUFqCj%2FVXg50wtNTL8Jsf5yt%2FhMtyl64two6uSl1o%2BwmQJd%2ByNssi9evtzyXSECgPWn8A%2B0hZAWyO6sL9kCtRuhQkbegDNrabW%2B%2BXegsLRzVk8N%2BVR3pczA8ujNbToeTrkKiZvSmsoZHCazh4dx0pdieGi5O1p%2Fuwp7qV%2Bg2%2BTYhIzPjfY2OxzHUsYtLVjz5uNztFEErfdW20amxDToIMZj0yeRJW8%2BK%2F4F2Rw%2BNfIGnbxG1eMHVQKCKEmp%2BEhf9Z9I2dCUMZHgMrm%2FQOv5jEybRnr157qRzVJThMSXOfdsVXzpXQk6Mvu57qO3zX7bd20UXdOBDBDWfQTK4L6rIHRtXHD3Dok4y1fvYi6X97UY2tEsYYYOTT1IezEn56Uj7aZgj08H2PbXMbjxsqqaS2bhjWjb6IoTFzvj2flJfzqQhu3MbftV4w%2FcLLzAY6pgGmphC6pIlDsAWJ4t3tmAgnredAgn%2FRW1RGUmuRP2wnmCCjWzLi%2FM3NIdaxQFw0dr5XRiC9KEBjJF44xTzckZreVOUSvOnmogwfJ7SBZuEj2E1DFRk4QLia2iAmz1PV2gJL%2FQDVZK1gagWurHF1%2FaePsq0DYw0DPSkcbihUaCs2hU3Sj1ml3auBUyLPFvvkYyNyb%2Fq2a4M83YKq6UCbCAHSYVbnC4sx&X-Amz-Signature=b0696374c5b3af08519605cf641b4e493d65f44e61d8687475404e539e477417&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

