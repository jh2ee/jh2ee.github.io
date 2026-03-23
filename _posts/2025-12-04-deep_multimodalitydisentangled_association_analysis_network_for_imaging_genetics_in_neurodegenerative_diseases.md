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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSZVTA3G%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDjbdsUoB3MvgcTUS%2FdkmUaeAobl2%2BFbCfH3CUAAfEVtAiBWno8jV8aHc9WydCzasbyqRw%2FcAtYf7zOWmY6tvV2hKyqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKCtDKxL6DKTEwpwrKtwDR4sYaOGL6nwM8JDW3iWcvMFoZ3xQnw7i8tn6k17JgGxWHu8bqBQNqLbggzG%2FWgXXvqTnnNnGHgxVzsAu9TnTgpNsouF8AHvUzLE0kon4Il3PacL8nQMR1V34Eoim13NSNBFAs7znANRCRy22r%2FIIysoQOScBMFjS%2B9JWeTX7vQR2XWydrBRKBCA2uUEmCoOvD%2BW9jyQ3EPVQWt70O6XTUc1gVedFj2O1SSkhFW7ee19Gef%2FVtE5TFLA9wbVnlxd4afOpjL1vSJ4oQmUvGXHjKAReP4D2G5xZNbZHVYL1mK3UvWrgqJrm%2BlIecpB5vlrZekWLQXLiWhZEAlUKlOrCP4t3uC3%2Fo4JMEPnc1%2BHoDK77puEYPJoqs1v%2BQ3%2F7rUgvU0GPuBzcxcz7wk0nMCwT6PtjlolEK6scrM4EJdEkdz%2FCm3H9Az9m24GVv77Lwdvq5G1tz2sEm85YcMrLA6UyiOTMX4xdbJyGt1cji7i3pP74LoBJGZjizC0yKpcKs%2BwVvSBE%2B5dtcIJZbmv7iy1NVki3GJqG%2Fz9e5EmPBpBxnreQaswStg5s7Gm5XG8TidKnM7hpjaVoblWtlhBjXp9ccYecw62VboUNO5e%2Bcyf6ashg6wpExu2LvAfTeLwwh4WGzgY6pgH5jGlOsS7aMYLcyVKosfo9jsJxlG7TiN6Kb62w3kXw9PuRifeVNPTA3zKP72T08RzwH9MpNvrv%2BlckR59bA1gL5bamD8n4lZU9GFd04fvJglC0z7cWu1JbcgldiJDhZQ5FEtv0PJh7vRpUjvdG7onvuDpN0H639C%2F4Zhots8Flz5wYFMMpXZlhujhU48JECbJTAMCy7OhQdbb0IGHfGCU%2FwOiJE1%2Be&X-Amz-Signature=7e0d8c3419b40b7313a842292697c2e8450c33108cc7a3fd24da8a3317da5a1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSZVTA3G%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDjbdsUoB3MvgcTUS%2FdkmUaeAobl2%2BFbCfH3CUAAfEVtAiBWno8jV8aHc9WydCzasbyqRw%2FcAtYf7zOWmY6tvV2hKyqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKCtDKxL6DKTEwpwrKtwDR4sYaOGL6nwM8JDW3iWcvMFoZ3xQnw7i8tn6k17JgGxWHu8bqBQNqLbggzG%2FWgXXvqTnnNnGHgxVzsAu9TnTgpNsouF8AHvUzLE0kon4Il3PacL8nQMR1V34Eoim13NSNBFAs7znANRCRy22r%2FIIysoQOScBMFjS%2B9JWeTX7vQR2XWydrBRKBCA2uUEmCoOvD%2BW9jyQ3EPVQWt70O6XTUc1gVedFj2O1SSkhFW7ee19Gef%2FVtE5TFLA9wbVnlxd4afOpjL1vSJ4oQmUvGXHjKAReP4D2G5xZNbZHVYL1mK3UvWrgqJrm%2BlIecpB5vlrZekWLQXLiWhZEAlUKlOrCP4t3uC3%2Fo4JMEPnc1%2BHoDK77puEYPJoqs1v%2BQ3%2F7rUgvU0GPuBzcxcz7wk0nMCwT6PtjlolEK6scrM4EJdEkdz%2FCm3H9Az9m24GVv77Lwdvq5G1tz2sEm85YcMrLA6UyiOTMX4xdbJyGt1cji7i3pP74LoBJGZjizC0yKpcKs%2BwVvSBE%2B5dtcIJZbmv7iy1NVki3GJqG%2Fz9e5EmPBpBxnreQaswStg5s7Gm5XG8TidKnM7hpjaVoblWtlhBjXp9ccYecw62VboUNO5e%2Bcyf6ashg6wpExu2LvAfTeLwwh4WGzgY6pgH5jGlOsS7aMYLcyVKosfo9jsJxlG7TiN6Kb62w3kXw9PuRifeVNPTA3zKP72T08RzwH9MpNvrv%2BlckR59bA1gL5bamD8n4lZU9GFd04fvJglC0z7cWu1JbcgldiJDhZQ5FEtv0PJh7vRpUjvdG7onvuDpN0H639C%2F4Zhots8Flz5wYFMMpXZlhujhU48JECbJTAMCy7OhQdbb0IGHfGCU%2FwOiJE1%2Be&X-Amz-Signature=7e0d8c3419b40b7313a842292697c2e8450c33108cc7a3fd24da8a3317da5a1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q35VXNQP%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDsLoJz%2Fjuoan6odAg%2Fk8cUd1w4PP9yC6FjnjKFER3CrgIhAPMFoqNCsrW%2FjLo930ni5IHackB9CZegxGtWpvCSeo9DKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyemZfnTJSifychawcq3ANCrRKsz2tUp4JCR3GL7v7UlWfzLPEmFfZ0bRwVNPC3VwP192TGxOHZjnInxeQc%2FEk2mmz0YTb84rTsdF75TiV1G7yTheMe3m3UApvZo4cDRAn2KYF34Pg%2FdQv%2BttS2X4MAeWKc2auxLP%2FPa3VvkcbmBolG86%2BaTVvzTp39Do7GEQhURU2skO7HjIrn8WEjQoZZSXTHDwPr84UNzJdZaGwCrU%2FvB3H90CATfOyyXM3Xd6TQpdrzvE6clg9cSFpIn0iJ%2FOkcs8FyWu5qvIekUkxpiKaPRawaZlWnaTEcaWLgut%2B2Tg5Wk61dmOcwLTwJZKwGj9KKtRb%2Fw0WGnt4DO7%2BgUCy74m%2F2iT3HMCMOl7u7jK03%2BQlx%2FRmbMCIITdzglT3KYMgyNbMZJ9ba1kCnfbfovJr0gkWRlShU4EpEfeylC7yIlR5iDINRgK2x6lIz796EeSxHobfH3xK0PX1gPev0B65n%2BuQv0bHFxJUg%2FYRmz%2FcMkLa9pgRKcjNG9Cd53KH%2BuY8jABKsiNOp6YWXp%2Fy8TebhTaY68rol7%2FYTibi%2FnBl%2FY01ePks%2FNKvsyUK8KsPA3soZ9AOZFyLzyDyj3BHIg19ou1r%2BTJFR376mNVo7G79e7V88Yg84e7AUODCLhYbOBjqkAVeQGLqhZG57KacSMOH1KtK8e6N5%2B4lAamlzB79zYNOnttV4W8E2yxG5Tcfq2Zev185r3x%2BChugJnZuhRvD8hMtZ9%2BsBecU13IjGUHGTitGe7zZOgD1kl06xxjD5FYsERwOa0UFFM6%2BnwAKyraCjAESmn%2FYSsruZNNadfO27P%2FZdOsUSJ0kzzlE4oQ04hLaH3ix5mR%2BNzICFE%2FtJuFM1ck1oE5%2Bh&X-Amz-Signature=bc515e15961d0e225ca260a46cdc0490c778da4ba55a749098d6557a02914d7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WATFJ6TJ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF3zUt8bEMkUqX%2B%2B%2Fgcx7oklmSHPv8tvgmaRjQ97dODaAiAs0lwxFPhakYX3e90pRB6RVja5l6Vs21hzs5a%2F1LEe5CqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMITNU7Svk8cvDjVOaKtwDlHKSpbFqJdhIJ2JAIQEXQ5Zd%2Bl1demOCO1iQlIRUBK0mQQ00Z9I6fjVzAHn1BiBEGysjaRqAq1fJ9IBMI%2BFJl5XSq39PvBd9kKlhrPzrWKn87FIQTuuHIkaPFSDcsueTII9%2Bv%2Fa%2BHJZuFwzPqnlYOJg1mDW5GD1vL7zOtM5GXcl8sFyAAWVlexARxX%2BAQPkDE8OBI6PU5GaZRSU7ObZwDg1S13bjlzE%2BfrHPG7ui9alevlCa0HVvS8sn490eXhQlRioh6NIuiP3bkuzjvfwu9CzoMH1YmEh9e%2B0GqTnl43HagYqdk9TSnlHTfjN6J0kuihsGq2K24c6rquprv2Bdt213FMxDYeRu3UFA%2F3v1WSyGyE7jMNmx%2By%2BlTwt%2FCYpBWvkZTuj7nhRSP8c8SfJ7Ncyqii%2FRu9sJXRSAnJabg1zWbcONRtGTkU21%2BAdMz6Eg6OlBiRs6bUFa7v0TP7bWCWB3xhKsEUhSVcrBPa61KU4JChptKht%2BiXlnis7YoTPXF%2Fa3bLPfuWbJywsAZTikOPQb1bld1e3EI1%2BF5osINFdiTvOaLuO2SJNH5%2B2lSaV7AVlnPfXOSgAnneQuT3ObagrZ8ygvWR7FhqF4nMKNfR09OfC2zj1Hs25dHtgw5ISGzgY6pgH89kMqjPU3SUNgyoi4ZSCXLJg3ftitPtRQOcCgkcB68zLA1gR7myTLlq0T99Pa%2Fq%2BFSqRg2ZwDQ6SvUNQOtiPeJloQn4XjhganPIInAX4ZlspV25mNV3Fqf%2FZxBV0j68RDI96QK6Q45QQDI%2BGneMcF1%2FSifbdI6o6CDOVGTUjmfjljWsDn507e5jwHRXp4EuWhiXtXMQTvY4ItP%2FpMR7lOwUY5cM4x&X-Amz-Signature=659444d12af4cc349758e7b0a2bf91e6450b4bdb705f584c9052efd35e7966da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WATFJ6TJ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF3zUt8bEMkUqX%2B%2B%2Fgcx7oklmSHPv8tvgmaRjQ97dODaAiAs0lwxFPhakYX3e90pRB6RVja5l6Vs21hzs5a%2F1LEe5CqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMITNU7Svk8cvDjVOaKtwDlHKSpbFqJdhIJ2JAIQEXQ5Zd%2Bl1demOCO1iQlIRUBK0mQQ00Z9I6fjVzAHn1BiBEGysjaRqAq1fJ9IBMI%2BFJl5XSq39PvBd9kKlhrPzrWKn87FIQTuuHIkaPFSDcsueTII9%2Bv%2Fa%2BHJZuFwzPqnlYOJg1mDW5GD1vL7zOtM5GXcl8sFyAAWVlexARxX%2BAQPkDE8OBI6PU5GaZRSU7ObZwDg1S13bjlzE%2BfrHPG7ui9alevlCa0HVvS8sn490eXhQlRioh6NIuiP3bkuzjvfwu9CzoMH1YmEh9e%2B0GqTnl43HagYqdk9TSnlHTfjN6J0kuihsGq2K24c6rquprv2Bdt213FMxDYeRu3UFA%2F3v1WSyGyE7jMNmx%2By%2BlTwt%2FCYpBWvkZTuj7nhRSP8c8SfJ7Ncyqii%2FRu9sJXRSAnJabg1zWbcONRtGTkU21%2BAdMz6Eg6OlBiRs6bUFa7v0TP7bWCWB3xhKsEUhSVcrBPa61KU4JChptKht%2BiXlnis7YoTPXF%2Fa3bLPfuWbJywsAZTikOPQb1bld1e3EI1%2BF5osINFdiTvOaLuO2SJNH5%2B2lSaV7AVlnPfXOSgAnneQuT3ObagrZ8ygvWR7FhqF4nMKNfR09OfC2zj1Hs25dHtgw5ISGzgY6pgH89kMqjPU3SUNgyoi4ZSCXLJg3ftitPtRQOcCgkcB68zLA1gR7myTLlq0T99Pa%2Fq%2BFSqRg2ZwDQ6SvUNQOtiPeJloQn4XjhganPIInAX4ZlspV25mNV3Fqf%2FZxBV0j68RDI96QK6Q45QQDI%2BGneMcF1%2FSifbdI6o6CDOVGTUjmfjljWsDn507e5jwHRXp4EuWhiXtXMQTvY4ItP%2FpMR7lOwUY5cM4x&X-Amz-Signature=07ea275ad2e09a275c7f2f2f77cd05ad1de30f4b4f867c45e81971a937d84a39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VJ4AB4Z%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDL5jOtpWryojRC1Te81WX78wuclT8fKzZ5LSvGegCkYAIhAODyMcVeuY6ycN2PklfIQ8r24SyhH3fObaona4Hg2gTdKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUSjbJzWQx2td5ElEq3AMSGU4qHisyWXt70DABDCyXOpkR6DgwPBx0%2FJotPMfZiouRp9M9%2BeTA4qbmemrxEC2Y6PA81foziAMPHF5RDIk7IkwulWMtXMC%2FNpIeVbgYeN1WPXtQ9Q4t6hS4CXAEhVz2mZYUD4ypg8t64w%2Bxu8ESdfMeJcuaeO7ofAzCmstUSSOmV%2F98p9yF4aqBw88PMa09cm9PhON2xrlMZR78D8u3LcSqyScgl0FtsGxVJJoxCHkYt9byRJt11l8UJaNl5%2BtTIE7nFoasdJ4SpKxd6%2Fqrxd2NhpY6zy%2BeXfL7b5oEQ6RDWRb9C78cItOP7smXNeA812CwxBgMQj6O%2FiFBZ5uYQEfXaAzqV2DRS9h0SJp9MPLjQ%2BIoTELgfrIib1WvL2D4a%2FnXBTVyB3Bn%2B0h3VHtJvIilvrIbUbv4pPNjeZ9NuFthMvPqmoUTmx1ACvyQ5W%2B3oPI4ipRvh7IQs8zFUZiCCWaKLOaKBKuVBXbXSdf4jWRny%2FHwcllZbUagvnOTqRgzTPqihK7sEDLjHgN%2BzjG103ewqE9VPiKYj5vR5Dfr%2FzC2nUo%2F4njwuQaCBrUY9xyKEZEvTGRjYG2d9SuwaKivVZEaVRiUGMB4NZ6VQMXNE%2FQzRJC%2F7UySN2NTFjCihYbOBjqkAYDqP3AQvqlO7XIpWTCx8WtU1PicD7%2F%2Bm%2FqQSLDcVv2qI1hqsI64U%2BHIE0VJlZ9RTYYXVyPcfN%2F7rgrjUQ4z%2B6rg2oIf8Zqv6pne8mTUmHCbSjRMJr%2FfnDi8d8Jdta9JoYy9DWhdCAaCVdYEIV01ob9pm%2BIekGB2af75Sh%2BiMyaVHJvuZT4ZJBisHvMrFLSVwlzfyfkTZnGtS%2BR%2F7wnC6sfob53f&X-Amz-Signature=5153cd7000ab8940c43120378251d952bb2646afb48d298938ce47676e33da63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GZ75LOM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDE0MXoj%2FqWSYgkO8w%2FdXYX9hW5Tc0HH%2F%2FkaITGo5VrJgIgMH6IBB0yNWvvvVl5w8vZ2cxV%2BUalRh0f3a1ri%2BxVSqYqiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGNRJfC1TJvMeqZD2SrcAwvRJo2ARR2ygn8mzV1RjfJuPqxjwocn4teQj7%2FvwTHRhTSOjrttyaKGWhd3Gnlqda2lbkVsIPl79q6CpU0OKJOHlyd5pYMnRVDZ81Vt0CTZ6pEUmG7T128twko85hDFbpLWblhdMgtopfkQjPUgnyB4iPOeblL9k66LB1lP8SWotSyJAGjWRkdWN%2BnAsZPHGbyteUOrTwcusLnIXTi2fMWCOSJE5aM%2B4NugcIYBNzzd0DyjuTvKaB%2FHz%2Fo%2Bmpg%2FTmE93j3pIq0fql6NmuCT5X7ZnegSAs%2FP3Tis3wdYUtqZJNUkRn1k2IzeKNyNU4mb0097SsPsLlz8%2BLk0Wl2f57ADgO4GPnfyK1AuBMlukialG5cVwkixpvgbSMZ2x%2Fa48pHnV%2Bzx8kayy%2FrsqYakQXQ20E7KhKGXiDahBXhw6bV68GjhP%2Bzi1N6%2FnKA%2BK1eUimERvaoB5OdserxgYF0a%2FXXuLoQ%2FwflO6AGUQex4LheqF6YjE0uqChXuZbQl%2BelzpWAP2EUmACG1q7kpSG0lHeXQLbexkZn8GGleAQWY7sE9JvM%2FMrZD7573aEBl9MGlQKrYxbjkdDWrGszaxU%2BbXby%2BoTXgXlQjofVC6Ch5kecD2suvAdZGA1VV%2BtN9MIaFhs4GOqUBeaUVxgsBey6PjC3yhA%2FbgSwAvWMpsHFeRLZDdkgEFbTfJvoDNSKU9Fann3pvl7W83pkk2dZlrV5nRwvwGPwUfh0Q9cs1AfdH1imHe1iTseizLB%2Bl4YU43K0JQuKcnDsEZCsxCNnRo924kr18iqmP4OloTgfh78arwB%2BSGmVfy3WINC1pCJlkUIXmrFUu80nE69gQI8xh5tG%2B3DKWcwgQed7WoZ74&X-Amz-Signature=6839c40174d301790d9e749df08831b0fd677175d9eb3acc980bb9af90ffcc4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFODHZAG%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDF8MfOZt0vsMG1aNbg4LezhHZND8oheLENsqgzB8WargIgM4Sq9arq7ayhkldkvpkSt6fAify9I6Q6Ve18wBl7Xq0qiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN3WogheRUD8o8U7UyrcA4H%2FrvfXpTasshu4zV9TUHqREwbICcwWEgC4dSTYwvX2%2Bw%2Bmj6QXhc7DPqxAizfUiURkZJzrYU%2BdlL0RSJKsWCvfhV815wjhls%2FKp%2F%2FVIkbZHMeQH0K%2F8nBC3m5CYT1Xn2iePDhMn0kHvrNBtJQ2tal0qEVyAl%2BwFP7x5dfmk88%2BNRCHaWwT2KfXY%2FWigWo40XKJZ4souAjWAge6xIw6J6HyIcJuhSumfMUVtMe3AkuB9x1pMQBLK%2Fk%2F5FLeQ8a5T4JxxfrXt%2FZDlPAHAKCNBQCAE7g8xFfM01Wuo6O6LbyOKoPlhPyUpnwoT7hK2wR1Ha77CID%2BvrmZUNxHqB%2FMliPP17JuSjMqWRGLQDb0rP%2FrL8WwSCFp%2FmSN5eAavVOApZ1QQHpoG9EVnePkJn9wX5SUrMRLEdxj%2F1oYymp208snVXUUQuk1l5zUPTZrUEeVFK8dDma05YU0MO5H9bWLBlocCqbPCqh7kGbmrajX8IYfqHLteHfm0OQpJS8ugb8z%2FnOpj67YEUhEdCNt3xL0xvFCjycaMWi7glnApLm1OFWtD5ZI258VwjGGstQPMckHdR9q9lqQ%2FHzy6zGGQsuX4SgVmUiy1GquC%2BwKv0O%2FLYrPtG%2BOKb0y39pl0GstMLCFhs4GOqUBSJLNyDy00g2jfxskNc05kM5rNU79WHXuAIgpV%2BcKFBASNrXJ7U3mn3HfuybFo8qVSJsIjUT6WrT8idcB%2F%2FqhuHZB184HNHEy1FCGGItkQvHChae%2B0Ojktpa0kaYDwlOpFaxnZKfPq3FmvuRlMs94QswMu3EW4E0Ns7aTlvz0Q6agKkXp5b4bwd7x38v8mgTPgMnsW0FtfXNc%2FvhVWz9xi7fWj9uu&X-Amz-Signature=174cb21ddda9458597f18c408a06460a891087910f75c4efcd7f7cdb6f2b94d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3IVOJIM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEZzsdtwS9WLMrl1QeVTHhh2NEaBlUJlnvol4G9lQn51AiAzPYAOo3C02rnhqKnF%2BKJ9%2BdH0tGiG0GjHSMwWD3dh7SqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FTlrCUKTEeURhvkkKtwDIrcj1xHTEDlvH40onuO7TH9AcNcYhmuj3gCQE%2Fl4PDWUbdaabDl02HoI1gGO6iQxlwkRpRsKMhlNxekkVDWG4SZ1F3dyIiOxuCaC%2Ft%2B7V%2F1fZeFwu8%2FMuv%2BDh1sxnnRi0jc90HspWmfQW4QV0qMX4MXgQH1olP%2F9BSfLYD8WuPj5Z5vCbXgRAr7P4hYb7M0S7R9BzBeAX5nPIDE1v7rQ2YiZ%2Begwyom3oQ%2FxaS7LYiTLFqRpTi4BevuBje%2FlkmIi0eReKpopAr94SLPoMlVTI5AoDDMQil3s4S2W2kwYSBM6gOOWAEwfSUx1qKDlX6d7r85GdPf3oq5WPqwvI0OD7w3F7AmR1hRYWrbir%2FACi9G9utQiWadQSYpHRmIxQZi44ZFTIV1YNvG1nWgPrVBg%2BOA8UnMfG6H6jlnP7JopFt0icA3%2BSPyaIkAyzj6%2BpPGl9VjlY4SrO1i0LTApA%2Bk0g%2Fb9Ei7J26i5DST0%2F1RZlXk9GRUuVL%2BxIQRYigaTgvq3AelD1IWx0xNnfGYimN2Jt16J8XewFdZoxPR9taQbYQ4R5m8C1KHP8kKqeeJ%2BbySzPtJuY6%2BSOGtNstU0c7mR4iOOijThRSIjiyArMw3tvDBdgX5HsZ1c5LSfcbkw54WGzgY6pgEHwNs6xiCPP%2FaqAdNYIwTZXygQgdAlSqid3t2nOnH0%2F%2BjiG2zGwCVWFtolyVXnit6oZ859kQpn%2FL0PWOox91TcxoIiH8%2BtEmMxGDGOf3uS3%2BysRhALA8nJXk06bYyxV0euhAuPJjC5jh9M1X44Ki7PEWZ4blwjUWBml3zKH5e3pFsLggXnLH3z0mth4%2F3%2Bj%2BU5qf8vq8abvb9dKNq53vJyTYm1vD9J&X-Amz-Signature=b4c2a00c862a0a69b4687e764f608b367c915a233577905840bb1b2a1a49721a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3IVOJIM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEZzsdtwS9WLMrl1QeVTHhh2NEaBlUJlnvol4G9lQn51AiAzPYAOo3C02rnhqKnF%2BKJ9%2BdH0tGiG0GjHSMwWD3dh7SqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FTlrCUKTEeURhvkkKtwDIrcj1xHTEDlvH40onuO7TH9AcNcYhmuj3gCQE%2Fl4PDWUbdaabDl02HoI1gGO6iQxlwkRpRsKMhlNxekkVDWG4SZ1F3dyIiOxuCaC%2Ft%2B7V%2F1fZeFwu8%2FMuv%2BDh1sxnnRi0jc90HspWmfQW4QV0qMX4MXgQH1olP%2F9BSfLYD8WuPj5Z5vCbXgRAr7P4hYb7M0S7R9BzBeAX5nPIDE1v7rQ2YiZ%2Begwyom3oQ%2FxaS7LYiTLFqRpTi4BevuBje%2FlkmIi0eReKpopAr94SLPoMlVTI5AoDDMQil3s4S2W2kwYSBM6gOOWAEwfSUx1qKDlX6d7r85GdPf3oq5WPqwvI0OD7w3F7AmR1hRYWrbir%2FACi9G9utQiWadQSYpHRmIxQZi44ZFTIV1YNvG1nWgPrVBg%2BOA8UnMfG6H6jlnP7JopFt0icA3%2BSPyaIkAyzj6%2BpPGl9VjlY4SrO1i0LTApA%2Bk0g%2Fb9Ei7J26i5DST0%2F1RZlXk9GRUuVL%2BxIQRYigaTgvq3AelD1IWx0xNnfGYimN2Jt16J8XewFdZoxPR9taQbYQ4R5m8C1KHP8kKqeeJ%2BbySzPtJuY6%2BSOGtNstU0c7mR4iOOijThRSIjiyArMw3tvDBdgX5HsZ1c5LSfcbkw54WGzgY6pgEHwNs6xiCPP%2FaqAdNYIwTZXygQgdAlSqid3t2nOnH0%2F%2BjiG2zGwCVWFtolyVXnit6oZ859kQpn%2FL0PWOox91TcxoIiH8%2BtEmMxGDGOf3uS3%2BysRhALA8nJXk06bYyxV0euhAuPJjC5jh9M1X44Ki7PEWZ4blwjUWBml3zKH5e3pFsLggXnLH3z0mth4%2F3%2Bj%2BU5qf8vq8abvb9dKNq53vJyTYm1vD9J&X-Amz-Signature=5696467b578bb29e314186912c91870e7c35923f4244dcc05f76872dcead1d1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVT3GXHJ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4%2FclxoXI3u%2BvOllFQiCQvrtsxxL8IxN9O4NA2%2FG2v5QIgd8BcUTgUUb2zoYM0rJOAzJbXoytin%2BYyw1sHQsqw7%2BMqiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG%2BcwHKtey8q24lNaCrcA%2BYjK7ehBYF0MD5KhyLQY9inTR0NSpIz7jIAYVnF1Ggt0dJQoYz3trXzFHGpOykk2EsILaecbRRe1itgYw5eajMwqvelOro1%2F2noh%2F8jLgC7pe5oh8aemQT6yw4G2UBKB%2B%2BIr7%2FsxWkt9nAgCQkqmmjFJY3XFNuGcTUvpJKgKvdgM0dNtjBm7t3rXvjltiyMRTkJ4i9N3FceGqlwhYKJGvfZJjncpLWPITj1Z%2FYgOaF6siVwqIsL4o%2BSM%2B1BZVOvT2SkkaLF6mbYSCwk%2BK0AUYYo7AVinMlvslXlrd4BiDXrleyyeWzvr9zfYLlfj86aMeTKXW1IsUvVslZYWaV2F0dcPN38QljLKAvXRhwrOXlHSPAPzyGxwAuPRoFtY02zRubliHIY3ykuhclFsazFGxaYUHarh9SbNhBXDpIpZVok9Rp63Ar4f%2BLRHcO5vW2lhFxEglD3QrgoBf0Uimdk%2BjEC0xxGsUCvpEWG7h2H0GWYckdfubv%2BXgBek7mvSU%2FJT05co5gH0MZw7V9NkTpdopDtUoRh%2FRfi57s6sgYRPazdqdiONFxq9TKx1MHxTr4c3Pzb63x0Riy3Vz5ZLcri5HO9xe57F1x7LcL7fV1tonQJnuG1xsXmL3qseWPjMNaGhs4GOqUB8CHPXmZIr%2B9Tf2%2FJIjhY5oDeRYRQ1WQ3A3cgQqKez%2FP%2Fg2QQOvOslN%2FmhHDhl7Dn2%2BNGB2nC1qIjf%2BuHtcUTDFwh%2FNiZTH2UpVwEaCvtrMaylBo8ApQ%2BS7MDQbzKpl9dfdqz9Gi7NXKz49pWR8wpq7AiY1vIZTNbGiRHrJeT9J1Ta%2F%2BZe7zRILYWeMtTj0NAu7XPnvSYuig3Y3IgBFtyYD3gbuJc&X-Amz-Signature=da5b759941b045112a9f55823e3ec5ddd4adcecfca2359716fb9762f842ef907&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLZZ6DJD%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFFrGPtK6y5g1dWuIjFgSZByd7lwTJw3JBFnVK%2BQ0FzXAiEAzUbw4NTC3risklZ85HnzkRFswSMCvFukB9jKH2diyIcqiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNbtLJ4PPUd8hmaeKSrcA6lM8VFL1MjahKI%2BbydptHvrmgnXxdX6xPvnIL85%2BcnDQDDPGxdnnZ3ti4uXr9Fqz4LabkQ%2FKAUkHuWtfHUcG9ACajzOf72fosfZzlePQohTYO19QOj6FedZom469S9aagHzrZDHr0PMPc2Dp9q14M6re53PQaZM6lD%2F%2F6WgHofcq1Eqqyry%2FZnUlf8DrzW1jO9EmIUZKVfTXcw%2FGE6TVNp9PkUw5Z2ikC4AT2Z8ADHXVeaVQ96eiRKQL3m9uxuSWf593uMKRIfVthY3QaDvVJKLPc9aXZVpvU1ePZ3SX%2Ba1A3ECPqfCAX5mhVrNVS3OQuA7paekTY6gPlqSsTVMTxQkKv7Z8tIW3sNZxRRc3gMMxZUuDHmvCuj%2Bs9E3EMLERPRMS5x4XLMgXJT0ff%2FOInNXVu54IoGTMx5HWmVEWrZC4yOewTXX%2Bo%2B7IENAlT6C7bmPznhLl8UOoyTiTMZntK%2FDTSv%2BbSMstY%2Fs5y4B57rigMLyz8iT%2F8YzdHvqR4vZMcGdqQkNgq1tlbWXF3bja73glYsVbAOmjMwbtnmJ%2Fo7JUODBPKCyt4QkNJEgn1ITMXbbmJvTYMmqxzxF8iMYyEO24%2BcTnmvrIT3CidNIm9myPNlLD0ZOyEHPpcanMLKGhs4GOqUB2OauTSiiNg%2Bes9quS6LoZWZp0gc%2BIOQiwgSgdR6HgbrRXmqDiD9GDUG21IhFiU6HL4aaMCJeso7a3q5YfgkGpD%2FecvCMirQxvEBGk1l07AKPD70H0SlHvsExQ6aEQXgglqVpTXA8u5P5W4oL3edAZSOo5%2FZ7UoKMOphJMBJIwQMHdaa2d%2BqzisfTxO3WC2trLW6N1tf9k2QAgN1lFi8zSGJYkOFu&X-Amz-Signature=89d6ea351fc4d1ebedaa525e4a8d946f33e0cfefbde8df876394b312d4928baf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLZZ6DJD%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFFrGPtK6y5g1dWuIjFgSZByd7lwTJw3JBFnVK%2BQ0FzXAiEAzUbw4NTC3risklZ85HnzkRFswSMCvFukB9jKH2diyIcqiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNbtLJ4PPUd8hmaeKSrcA6lM8VFL1MjahKI%2BbydptHvrmgnXxdX6xPvnIL85%2BcnDQDDPGxdnnZ3ti4uXr9Fqz4LabkQ%2FKAUkHuWtfHUcG9ACajzOf72fosfZzlePQohTYO19QOj6FedZom469S9aagHzrZDHr0PMPc2Dp9q14M6re53PQaZM6lD%2F%2F6WgHofcq1Eqqyry%2FZnUlf8DrzW1jO9EmIUZKVfTXcw%2FGE6TVNp9PkUw5Z2ikC4AT2Z8ADHXVeaVQ96eiRKQL3m9uxuSWf593uMKRIfVthY3QaDvVJKLPc9aXZVpvU1ePZ3SX%2Ba1A3ECPqfCAX5mhVrNVS3OQuA7paekTY6gPlqSsTVMTxQkKv7Z8tIW3sNZxRRc3gMMxZUuDHmvCuj%2Bs9E3EMLERPRMS5x4XLMgXJT0ff%2FOInNXVu54IoGTMx5HWmVEWrZC4yOewTXX%2Bo%2B7IENAlT6C7bmPznhLl8UOoyTiTMZntK%2FDTSv%2BbSMstY%2Fs5y4B57rigMLyz8iT%2F8YzdHvqR4vZMcGdqQkNgq1tlbWXF3bja73glYsVbAOmjMwbtnmJ%2Fo7JUODBPKCyt4QkNJEgn1ITMXbbmJvTYMmqxzxF8iMYyEO24%2BcTnmvrIT3CidNIm9myPNlLD0ZOyEHPpcanMLKGhs4GOqUB2OauTSiiNg%2Bes9quS6LoZWZp0gc%2BIOQiwgSgdR6HgbrRXmqDiD9GDUG21IhFiU6HL4aaMCJeso7a3q5YfgkGpD%2FecvCMirQxvEBGk1l07AKPD70H0SlHvsExQ6aEQXgglqVpTXA8u5P5W4oL3edAZSOo5%2FZ7UoKMOphJMBJIwQMHdaa2d%2BqzisfTxO3WC2trLW6N1tf9k2QAgN1lFi8zSGJYkOFu&X-Amz-Signature=89d6ea351fc4d1ebedaa525e4a8d946f33e0cfefbde8df876394b312d4928baf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDPXA6VQ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T193806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FJXWUIHOrNLOTMhKQu4xdXD%2BGeVz4tzuK1jt8eHBy%2FgIhAPNQJP%2BnebAOpUlZGc009c1Doq3zp4UM690QaTVazMrKKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyMNX4YzcagyAWu%2Bcoq3APKFMYxMH2%2FizWQ5bpjZjtBEcIK81X%2FwDM%2F%2Fodyv5ErxDdyXsUJXhTawIiXGCIrIykoRtz7nakcEJHasU1ACXgxBxY1Gl6F18N4y9QKjEA99RF3TNxrJ1T7Z3yP6eR5ym5sE%2BWDYHxNoQMpOZ0F2KUBKpjkMzZdgA4x992RMKgWT0Nj5htx93Jpji%2F6INodposx8IHcpsYWVGaYlwrIR6blCyob2nOPbDxOpaDq9i3AdII1CaTa%2BlXz9KxHYESto0x16UPRXS7T1Wvq0f1b3Fl0KmbVUzeNDLdpmFOwSsiRbUHflmWm0rfppWddBoer%2Bx5dtpUaCtZgjLn1zj5fES7xUT%2FGad5Rs%2FuIfz%2FVW5EgWlzOpcH85lmBOkAW4kVttlj4Ep1Im4QJoiTXyNte%2FkpdSt8kjJ0x8BvxQwBuK5%2BGdyuRPoY%2FC9U11HbmpinXZLklhdabZwltq%2BNRmgZ38Ace5UXghSbWf5UnPZiVrOf7CVTQrzRQVK1eqluaOpFZkY01TGfpF49ix3aFUAouOnA%2BajRk7AbiYdzs5TxN26HjfnaEDVAeV4iQ5KqhtYICCx3OuvRS4cvag4WGSgt%2FwnIS9XcKSH%2FtvFpNNFai7WLp7L%2FSF7cKg9x1ENMA8DCBhYbOBjqkASpMIiCPi5CewRlXm7CJm2u5md6AyMEojfDJH37mUw0%2FDWngMKy534Bn0KTOt9GIG0oEudA5x1AwwEgTtfEG7JngwiWVFkKaFqzjDT81VUuhRBA9JDhBeoiH8F9ac%2FfO8GNkae7dpywhSjIqs05N7%2Bz3HFGMwTmmuGrqIv6ORTzJXaWGkHfNUBLPxBOcrJAb%2BAywRaXxsSZm2Fhp3rkxNJEIjtrn&X-Amz-Signature=c4396571345be50d4ca5fe821712197b06febae8d625f7fffcde1b9a0349256f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

