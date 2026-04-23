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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPPWGNDE%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF3PJd2A98pDaMwJAD9NoER69DoxgEOyBIMcBofYIlZeAiBsqyG%2BJN8WkWNLjVKTKbCl4e%2FRGG0Vs8PegbvnnFFXhSr%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIMI367AjruQdLxQM1uKtwDtg8u5Qhzp76tf4h7A3Pb0b2ixA1vRN%2BqRqgD0w2RWX4MEZqcTz1QS1S5%2BHb7VAxPyE0owCgBWT0ZmbjrQegEL5vUuWnsYcflgofpLCjbT5CT4NElxkEIjAoTosM6Nx4GiIv73%2FBNIQ1Ve42qhSk3DjV2YNF8SeCTRtJKVMKbncStMICHOoV1sSyLf0T6qU2fA65P4Zsir7FyRRB4h%2Bu7iiNMW8xBJUORC9MxIuY7GtloL%2F6YNh31UEBbqT47jNmBZFagh0TNz4NYQg4NE28OVIqbyl8dyx32rZpbfKWM2G9v7P4k%2FQL76OWG%2BHO6Enyy79Z143WjlQqexeefZwqSR6ceZvOzJqVwj518TWbuLFbakWUDk9Olo8xJ5Uid8VeQrojJL9q2dafcLB2a81SFzn72TC12UDv4i%2FO66b6fHLsRaeLawGUbR9WO%2BhiQYc%2FIrgXqOMTSaXI6tuMtchXvrxrgw7797gl0TytqaaEHSEQc8eGIc5Mpt%2Fy5OY%2B8JWMriUi6EzNcGEDVBlVIYT5btBbIMNYPFmV9UOrAnuypP4SDx1ldxJSKLaKTY0CE5foxisJTCsHsC7cY0acGv0vNLxnmFc1WH65NoaelJ9m3EWyRJdf1qcofzoTd564w6JeqzwY6pgEO4w5hj%2B1TREaBOfJ2rrY9DHVVmCTIrmFmgHQ9AXGDd%2FaYpQk1V8VaAfgdl%2Fn7npCKRdsf5%2Fbk%2FD7wnctli5j%2B%2F%2BIUax6TIzeSdtdXsW7HZDK4edWKyt0mQP7e8zsWsVhDMuolRkPhgCbNIObkJwpfZ3%2F7jYrcD4uzDK%2Bcd6Vq0kTUqpdHmY5n0%2FMwVHAh%2BGgp0weDylfk%2FdHenq%2BpofYDWliuzI5f&X-Amz-Signature=ac739baa39b08834b2c1bd41f014963adc3d7cae20ac338bc3739fe2f0e6e18e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPPWGNDE%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF3PJd2A98pDaMwJAD9NoER69DoxgEOyBIMcBofYIlZeAiBsqyG%2BJN8WkWNLjVKTKbCl4e%2FRGG0Vs8PegbvnnFFXhSr%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIMI367AjruQdLxQM1uKtwDtg8u5Qhzp76tf4h7A3Pb0b2ixA1vRN%2BqRqgD0w2RWX4MEZqcTz1QS1S5%2BHb7VAxPyE0owCgBWT0ZmbjrQegEL5vUuWnsYcflgofpLCjbT5CT4NElxkEIjAoTosM6Nx4GiIv73%2FBNIQ1Ve42qhSk3DjV2YNF8SeCTRtJKVMKbncStMICHOoV1sSyLf0T6qU2fA65P4Zsir7FyRRB4h%2Bu7iiNMW8xBJUORC9MxIuY7GtloL%2F6YNh31UEBbqT47jNmBZFagh0TNz4NYQg4NE28OVIqbyl8dyx32rZpbfKWM2G9v7P4k%2FQL76OWG%2BHO6Enyy79Z143WjlQqexeefZwqSR6ceZvOzJqVwj518TWbuLFbakWUDk9Olo8xJ5Uid8VeQrojJL9q2dafcLB2a81SFzn72TC12UDv4i%2FO66b6fHLsRaeLawGUbR9WO%2BhiQYc%2FIrgXqOMTSaXI6tuMtchXvrxrgw7797gl0TytqaaEHSEQc8eGIc5Mpt%2Fy5OY%2B8JWMriUi6EzNcGEDVBlVIYT5btBbIMNYPFmV9UOrAnuypP4SDx1ldxJSKLaKTY0CE5foxisJTCsHsC7cY0acGv0vNLxnmFc1WH65NoaelJ9m3EWyRJdf1qcofzoTd564w6JeqzwY6pgEO4w5hj%2B1TREaBOfJ2rrY9DHVVmCTIrmFmgHQ9AXGDd%2FaYpQk1V8VaAfgdl%2Fn7npCKRdsf5%2Fbk%2FD7wnctli5j%2B%2F%2BIUax6TIzeSdtdXsW7HZDK4edWKyt0mQP7e8zsWsVhDMuolRkPhgCbNIObkJwpfZ3%2F7jYrcD4uzDK%2Bcd6Vq0kTUqpdHmY5n0%2FMwVHAh%2BGgp0weDylfk%2FdHenq%2BpofYDWliuzI5f&X-Amz-Signature=ac739baa39b08834b2c1bd41f014963adc3d7cae20ac338bc3739fe2f0e6e18e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCHCS35V%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFLdk7kugbswns%2Bf3IRzwPGF1qf6ZqPcEx%2BjNPVlRAfgAiAfjsiEDVTxJWQ7JGrsdI9bi1ps9vTW5v3gk980XuViByr%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIMUezzNbv7dG0oQgMdKtwDTbKSiXT2rB4Nnzn0EHGJIzOn%2Fvh6%2BXVxVQGeg3gfzRYpvIvb8fDeoGvgXadRtV%2FXHhmPRfS5mdzPLpJI42O8t9f%2FQf%2FVHZfS2FfLQS7y89%2Fe1cNfUUroMei44tU%2BY8AJDHLShhrUTjHxb0%2BDbVf8qV4Xf%2BIU%2FeMIw4vhdadT6bTP4YKmMf7mZ0AGWwVF5CVhqWatDnJ2JsfrFSuTOoQO%2Bjo0%2B7abZN3cNbGq1hp7VEJjqSTVpKeDnB1bSzpQvUfnJ28vxM6%2B%2BLHmdhI2mFqOo0rlSTSP03HaSD1dZZCrqs3VxmS6ps4VbffJj7606luA50pICA6mU1v%2BIFw%2BDBm0cw4V32bN7cLz0iYaBVWFSU3fyGsM2a3vcyj4WfbAZvw6KK0Q60Fcfm22ONiAoibayTqaIlDV5IM9uCaT9CKZirkYseTaAEWVaYoG0DYFLBc%2B5MvkjIr9y9%2F%2ByV2DOQKr%2FxN834Cl3CkKESmTff5dN6ndite21KqSA%2Bpxt3E9f9UtsQuLFcIc8Zbj07b8xOGG1r6MwI8YpKtDccp3wP1vDgWYPHxmcn4GvJtlOWb44IU%2BMUKkCWOvtXvuf5AsiGvHLzaoCe%2B%2FDAgOcvbBZK4ySp9xC%2FOwBeJhYZZ8yHUwkZiqzwY6pgHFFEdxh47pz7BampahmVC0X45fyXjbly0SBZBSSy7XkOJiiBNxhWBa4ZKYjtuSPG105Yp7Xrbl%2BX5%2F9KUS8hAdZlrWb6sCJeQ2KIxZ8owKNPcVOrRqnpIvonXterDs2Ju%2BUGyZO73v6McvuFXNkAThUfhm9EuRjsiHb0xuF3U4%2FFt8ggUVpi0Ot6Lcp0v%2FE9TRyjNZ9QQD0eNzdz09N2%2F1eOj6EX6A&X-Amz-Signature=c8dc68234575e14a178687f1589d5ea04e69c6bea8d5c5a8f4ff912b64a485d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VW5TWWJ3%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGGlJs2lzuzGIT%2FqsAZn4OCa3Nlz9x6Hjb7wb5cD9njdAiA3r7UMUZcUTng0fN0b2S9UoZkV%2BS3okK6HAvB%2FV8MYrCr%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIMZpAYJHfGOsKQrxr4KtwDSRy0TmRAqHep%2BduFYzkuNmrVm7hgzvsxyjKrZkjyGsdfaOtnbzf%2BZpeO26MRE8CcfB6W9iI0V89auhGfM0Ovpi7rCyoElaGzaISssMLpXSU6D9flLyFe9CD%2FbC2STnyUTdbaemo6xZ0Vx5c0iyvMAOEJQkS2ei49W2PQixLWHrTL5G%2Fu03ej3qnpKJkn3tQSMIOlml8gTyFM9D0G1MJG0XlttEDVTnOU8TBUxi87q3DD1s7Aa1qkwl7ySJx12PLUGlqJTyjULed9K%2BofV62z6i7gnDcfKD7iuHk0ePHlYxfKLHoFwzgD%2BXh0wmUc0fhFtQ80MS08ny%2FTFGzBh9r%2FMRRUSTdH7jgvGBrxENVDmWcOH7kuBIC9AlhS9hGQA6%2FdPHHCaYIv8PiQDexj7QL6Kj7sFxUxu1slFKFgUrftcW%2BNACFkQuXUiQJUQzM2p0nVBWQYHEvHrtpZbye1qLMhgyI9xPZvqSlKysXGwDIMP2sIa8PHqkKqAHeDLZeZo22aTssaxt6aEingb1jktaqmic30IwzdI2PXbflHIEno1%2BvfFdJ8aDl4R6qlal1QntrXTqAQBpRjJKsVqmy5U2PQg29eyIIVcS7RnxW6hYY5PHxQLbqPyU6yTmIGWkQw4paqzwY6pgHUWy4EIkBwor%2FscbX2xI7MO21vd597aOXK%2B3gEr8lJE8gozYsMdnHaLAssLct%2FvoA37nDYVbifGNbf%2FCStxi9l5Ew2FbIYCVNwhITpAzaP4ZU3SnRHgjgI8qptrWe8xzWjrgdLWSIcGYiTCsYyDy5gr8EGmHrzV9xKVbGfNAVs0A%2B89y%2FnFJhskM%2FZRadE1BBfVaYgT%2FRFWrH3CSfEKetSI36pr7lQ&X-Amz-Signature=24f27747844da0ef6251e3ea3b5a563d44e2c332042cd280600dd7375aa3481c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VW5TWWJ3%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGGlJs2lzuzGIT%2FqsAZn4OCa3Nlz9x6Hjb7wb5cD9njdAiA3r7UMUZcUTng0fN0b2S9UoZkV%2BS3okK6HAvB%2FV8MYrCr%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIMZpAYJHfGOsKQrxr4KtwDSRy0TmRAqHep%2BduFYzkuNmrVm7hgzvsxyjKrZkjyGsdfaOtnbzf%2BZpeO26MRE8CcfB6W9iI0V89auhGfM0Ovpi7rCyoElaGzaISssMLpXSU6D9flLyFe9CD%2FbC2STnyUTdbaemo6xZ0Vx5c0iyvMAOEJQkS2ei49W2PQixLWHrTL5G%2Fu03ej3qnpKJkn3tQSMIOlml8gTyFM9D0G1MJG0XlttEDVTnOU8TBUxi87q3DD1s7Aa1qkwl7ySJx12PLUGlqJTyjULed9K%2BofV62z6i7gnDcfKD7iuHk0ePHlYxfKLHoFwzgD%2BXh0wmUc0fhFtQ80MS08ny%2FTFGzBh9r%2FMRRUSTdH7jgvGBrxENVDmWcOH7kuBIC9AlhS9hGQA6%2FdPHHCaYIv8PiQDexj7QL6Kj7sFxUxu1slFKFgUrftcW%2BNACFkQuXUiQJUQzM2p0nVBWQYHEvHrtpZbye1qLMhgyI9xPZvqSlKysXGwDIMP2sIa8PHqkKqAHeDLZeZo22aTssaxt6aEingb1jktaqmic30IwzdI2PXbflHIEno1%2BvfFdJ8aDl4R6qlal1QntrXTqAQBpRjJKsVqmy5U2PQg29eyIIVcS7RnxW6hYY5PHxQLbqPyU6yTmIGWkQw4paqzwY6pgHUWy4EIkBwor%2FscbX2xI7MO21vd597aOXK%2B3gEr8lJE8gozYsMdnHaLAssLct%2FvoA37nDYVbifGNbf%2FCStxi9l5Ew2FbIYCVNwhITpAzaP4ZU3SnRHgjgI8qptrWe8xzWjrgdLWSIcGYiTCsYyDy5gr8EGmHrzV9xKVbGfNAVs0A%2B89y%2FnFJhskM%2FZRadE1BBfVaYgT%2FRFWrH3CSfEKetSI36pr7lQ&X-Amz-Signature=f295d313975b92376025e543637ff2f9fe28141d290e367ea0cc467054f25573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624HDRSQB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHtlU1OxJIEMklv4EwHwMwe2Uy1q4lF12FFyDtA0ta1CAiEArxTqRvPcFBYAA2kwnVVY9IC2%2Ff3N3UTYNhnnfHDavd0q%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDBog3jYfFD3tRb74MircA6U94r8r6K8Rd9blEjb1jIoFzktdnoCxO7FLJbrKb18dGPbnHmjxfplIZURrnrjhxwJBcTu%2B3Ju8b5%2FN6QOBbWINScidxyRnye0wD17yIPyojHf0tYQx4o7wxRcjyxp5L52AEKv%2FbJ536u3JyVRa2ArXhie%2F%2BdVX78jpI8jpkptxQ5t8HrQctlViaqMeUxZ3rP%2F0CtvSxdQs1E7C6eu3E3D8DIwqMXuUWj3IGlSCSAt%2BjBGQSa0XKMijUcz3EpvIMH%2BJcea3tO7ztgs0WmuDBd3gF1gZXNGcNHsMnmnkEpXRB7FELjH1nO62v2C5yjSptHPpqITNhmXhurv7DjFC3x4Z8tGYkHVwdvSn9p6nPR0BdBXDcX%2BQhmshLzDY%2BF9xWHyiw9CnmP3kHP4S6b5cUa22z5Eybe25HRngdgT5BS6Vzbp3Ta1DQ%2FCJ7ue40hSLnVQ86KZu32l1NmTx7uuufJbcacRvntJuEJgx6qzbIIvAriqJ2jcFugNK4KC2ZIt3Nu1lJYzzzRHvj2t70EVr1uVKfCwTUWTXHd1C6b%2BQGknIe1IBL10c7RgMeMR7xDDJkk%2FIzt61fUPQhFDphdEGvY0QbyqowYejGk45ArWGnLPgCH%2F45SviaU4FNZimMOqWqs8GOqUBSnbN%2FPHIJElF01Wg4s8Tn40IOEy7pv%2BQDRWy1WdBJOmX%2BIJaegHNjvid8ZIxtZbWe2GGozDzpjMBW7neFGZchw6mbZtbN6K95b8wLeJTMPmAWtVcutSWBzPrOT7%2BpR12P8RDDdiTLdkA8bsevPZCGaVwYfvF1ymQr%2BSusMazTR7EM51lycT%2BtUmClH0fO1onzyn6HLsFJvJj1rrzKCtsezV9%2BqWH&X-Amz-Signature=2fc11889fd2ace800a8677cf58b4806fcde8c171f623463ddc222128ff11e9ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YTKCRBQ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2F4dUEEVqV6rA5UCI8XRTXKfMXt1KZ2eOZPdoW0ZSOWgIhAJXKB18X0t8MJMEZ1BqXnZrasNok3g3eGN0naW7DL4VNKv8DCG4QABoMNjM3NDIzMTgzODA1Igy1B0z8zXDnsnSKPxMq3ANpLrVRUuMU8LWhoRxSQgqXWG0kJyHsomzw%2BHD1bz2GobzESA%2BwwkUVol%2B1wg70frlNp7qtiAbkmMJ73FOlJePMfW4hiNat%2Fp%2BDByGU%2BQnC6FnzxUgkVYn97wsoYcP1e4rKTta6OkGZGOhrHDQeZekYlO8SDRIpjDq6Delk7XWWo5RKTAEqqYDUrc5ZuUJehqfWBny6XY%2Fwj5%2BLU7%2BC3qcdag%2F9KC9YPr1ppIEGlqPjRctTYiJg9TZG%2BkHr7FCxlNTFpLxClE8c%2BC4w5dAdqcUb%2Bg8WSKoYWKji5dARBjLubORF3S4R1Y4L5W%2BKU5o8F5Lu%2BkzojfO8UGPkxjLQXdYLyQbkZZ7lSF7v%2BKTO0LB67Z3sWzNUWDoOIK60hXeRN5eaKzku63Of2%2BASQGELqj4ENo3cGkLStHrkpiMczwcapuPmGE1iZN7RX1AZNVsBeAla%2F0z80LDbTEai24HhKG9a4jMnRf0QNc6q6oEwVchQMei26ZHqT%2BXUv8i2hPRX3uQwSjJBNHfR%2Bl1%2BsQ3ryT2ROpIZ7vlNYjEmC0jj1rE0QpGGkFGLzaF%2BGNx%2Blln62QoIqZBt%2FMZL%2FHUlGdHVyBcCrRcsF8UWiOCMRrWXRRypN5pIsgZ7S%2BDyTMdG3TDxlqrPBjqkAX1H0bOwCThd%2F0GvGHBx9bINxuQsjqHtDiRLdAIMs7cYgat%2BWvkyKqbdSVmW5QaIkCz2co69NYxPp4eQfdjAB6drRevPvpvqMEXV3J8RvCr5SuTSqrJ22OVeZ5jXAoZw2qjdalJ8s%2BIymUbCTN155f2Q89keQ5djqL%2Fe1d5NVBoB0uKns%2F8oad0pSHyRbXZaKnLbUwmqzF2J1ArOGH2LLh62vlix&X-Amz-Signature=f6253dd92dd435ea3faafb8f6fb38cc327e1dd6a397c640983a13d98727678db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XODWGN2P%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDJmn10SyOGbj6X9DJb9RL3rNUDWsW5IVxePmD4GNfBoAiEAot3U90Rkv%2BglilcDE%2B%2FV0HCB7lnPb2zw90mnmK4kbxUq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDJ0X26XF74%2F0V%2B5bhCrcA8P95oMebWTFRK2pLT2l8tnSfpiu0My%2FQrCqw63rLdIkrxeOsN8t3%2Bna3dqzh3fMA7H5xnOuCWDz3DUbgDSMM0ak%2B%2FiyyxaPShVJ1fKGmlah3CnzwGRYrwU%2B8dvyITAWhBoUN%2B7Bu%2FN%2FX39uC5eztqn7iR%2F%2FXU0ALwEUzTI8CIHme59SVJAGOyrhbasnfFLWKGz%2Bzp%2Fk6XqdqkNJyaxxNZXoTMwemNe5rzJLMjI7Il3%2BSoLVLW1rzhCHaofA5SSnjnokp73CrUcgeAyINZk08yk%2B%2F8IoYT5OOHcnuiLwiQwKdzqQoDzDfYfjPLzlLX3Nk0eUIX2idEysXWCt0itWA0B0RMCV6FspnYlxR4Ugl33%2BgxiSztamz9GYuWuT8ofmlxGivVQ5FEonJBXLWjvpeANersao9v522KZD1IvrTIzvfkhU6Q%2BWsNorcxIZJKT5003Hd%2FZrxkLu%2FdyX10Ys41h7S90rrJ1bxPA6ndEEnACAfzlyrKbJN7U%2BxXY9CJKletNNGT89Q80XpQiVERKKUIbewZN5mg3DzWJOYrOxkY6YgN3libiC2n91ycov7qczxPJKjDmCPJo42yl6b9hQLBR5Phj996RGEE1g8g2IsbQKNkT3fQTm3PpsYDzNMLmXqs8GOqUBeico1nvrEWiJHq%2B5XwHzow1vVc0nq5sMTjOdT0OGGFqMLMVLJdJEw8rhdkl%2FvgzcsuCXCIcFYk6gkMSV8LuH9ZSSjrGO3Y%2FkgaeemD07HQS8NbLGVXBK1RCtrS7NaN2RmcOA2bX%2FTZ1ZpUGBE6cUAosBvl2wpj26Z4mg4bERH02ejzcg5ujlC5%2B5JftUJYgAop2LLdGA38x07oVaTKeKc%2FQU0%2B%2FE&X-Amz-Signature=3fd996c40b3b1813188be95f5b7abce5349d3cf221404d38b6a9d0e157e2499a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645AYVTTX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDC1Qu1L7tWXgFYUVr1IXlVDmbFvuqDwIri1YNwXcu5QIhAPwywPzUTXc6cAmTr47dZQhv%2FlWtj0WIsiSmkvAMGkjlKv8DCG8QABoMNjM3NDIzMTgzODA1IgyLXccp2KKkeHZsJCoq3AM%2FxGAUjfxD%2Bys43gS4QqqpvmdFhWhMtXdqhgXCLVHj329il2baFtZmJ5cwexwlUt7RlLRBzalADx82PHYjH6A9JfVU5NvhJ9mVOKGj%2Fw3eHVRW%2B75U7%2FD5RTyS5ZVfCTnStmwajTT1%2FFpd6qlxB%2FG0NnIU77E7ZFCX3poBcqhhIbF4nsHsrx2MWZ2uCr3tfcRfu4W2kkAErIVZdswmgCHSeDuoneRfnbQbmokOUjWZILvxHpgRDiF3lCmFcFIRYdeQvlBJKG9yWCztjYdUwna1TJOTsaZXYiEBZd3279swSdovdTbsI3EMGY2MNel3G%2FxtoNQWmwrbV9%2BZ2NSIXkww%2FW%2FQ0MoIFzEb72YVflDYV4KJya4%2B2QiNJP%2ByZcWI1q0377hjj%2B0%2BrFmWssHcvLjyNH0OcKvmVMYZS9QSDAS0S9KmePDOilX9AKKR7ERDQ%2BpKkxKNjHrG0j%2BhqjbswFqOwE%2FgsrylZrWhtC%2FHdfdLJ7PWY5kl2UCkzaQOftPgd1JX5o6FpfQCZXM0BG1GcFt%2FZExw0jc6v0OkWKpdfJm7nfI%2FnxUOJtpYQ3J2ooruciAj6b0vsEi0bFLFs%2FDuUt1ZhgT8vmYf2ep4W%2FyZ16XFGoxzbxzwfgZqOzm83zCIsqrPBjqkAS3VH07VzcCe%2Fus6TNf6xoj6EZk1auXi8aKNosV7njswQI%2FUDwEdfCeRM5xIY4%2BeUYKID18ozL5gpUmpOlN71jmCx70WxefnPqNSj5p%2BKkkthmQgE1R1I3vCMKAS5FgVp0ibD%2BG0gKFaATfH6TlU2Hecg%2B76cTKskmeGBGOuiiq5%2BuTUKihFomCk94vgpbiJQn2zil4fUEFP1CCSZoG1AJmCwWI%2F&X-Amz-Signature=c7cc7b19e80ede85ad1a0eccc4052e19ddebabac65933c154d6408b2514831e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645AYVTTX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDC1Qu1L7tWXgFYUVr1IXlVDmbFvuqDwIri1YNwXcu5QIhAPwywPzUTXc6cAmTr47dZQhv%2FlWtj0WIsiSmkvAMGkjlKv8DCG8QABoMNjM3NDIzMTgzODA1IgyLXccp2KKkeHZsJCoq3AM%2FxGAUjfxD%2Bys43gS4QqqpvmdFhWhMtXdqhgXCLVHj329il2baFtZmJ5cwexwlUt7RlLRBzalADx82PHYjH6A9JfVU5NvhJ9mVOKGj%2Fw3eHVRW%2B75U7%2FD5RTyS5ZVfCTnStmwajTT1%2FFpd6qlxB%2FG0NnIU77E7ZFCX3poBcqhhIbF4nsHsrx2MWZ2uCr3tfcRfu4W2kkAErIVZdswmgCHSeDuoneRfnbQbmokOUjWZILvxHpgRDiF3lCmFcFIRYdeQvlBJKG9yWCztjYdUwna1TJOTsaZXYiEBZd3279swSdovdTbsI3EMGY2MNel3G%2FxtoNQWmwrbV9%2BZ2NSIXkww%2FW%2FQ0MoIFzEb72YVflDYV4KJya4%2B2QiNJP%2ByZcWI1q0377hjj%2B0%2BrFmWssHcvLjyNH0OcKvmVMYZS9QSDAS0S9KmePDOilX9AKKR7ERDQ%2BpKkxKNjHrG0j%2BhqjbswFqOwE%2FgsrylZrWhtC%2FHdfdLJ7PWY5kl2UCkzaQOftPgd1JX5o6FpfQCZXM0BG1GcFt%2FZExw0jc6v0OkWKpdfJm7nfI%2FnxUOJtpYQ3J2ooruciAj6b0vsEi0bFLFs%2FDuUt1ZhgT8vmYf2ep4W%2FyZ16XFGoxzbxzwfgZqOzm83zCIsqrPBjqkAS3VH07VzcCe%2Fus6TNf6xoj6EZk1auXi8aKNosV7njswQI%2FUDwEdfCeRM5xIY4%2BeUYKID18ozL5gpUmpOlN71jmCx70WxefnPqNSj5p%2BKkkthmQgE1R1I3vCMKAS5FgVp0ibD%2BG0gKFaATfH6TlU2Hecg%2B76cTKskmeGBGOuiiq5%2BuTUKihFomCk94vgpbiJQn2zil4fUEFP1CCSZoG1AJmCwWI%2F&X-Amz-Signature=f31cbe8aac8d5569a5a8e4dcb14357390947b81f2f7bb3ef16a14f110e45f605&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI5A64ZV%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdNAX%2FPyAYx6bFHEAUc1qBZMHfxBu%2BACUA%2B4biC5V%2FLgIgSBirRiBRZr3RuXVDaUsw51NtebrqeI7qkwMGrZNkfhMq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDAY1vXxcnjnKUWk6tCrcA1kBnWJYr06%2Bgc0a5d7sY3lwCMINN5gar8bU0LNbrOcZ0SySDvemw3T7GcYwEx%2FAqkfLCNw5ABYJU1dTl5fZUyx%2F1g%2BgTfAsE%2BtzN2Ue0YI9%2F2Czvuawo%2Fx1ucc0wvGRihq3MI1Uicik%2FrHpG%2B7eiNvMxGBsBuXVMRYv0frqBg8qmz%2BpzPLrs1%2FocJqk0ZZ39JX6RjWxYtRrZejgR338hzZ5%2FVoNndHH3CkMaUJu1C5yceJ7x%2BE3D1FEKH%2F6PQTv%2FSUYku%2BjbCZGhCowjVh5sgoXyM88Vtx18q0zsKDL3E1oL1muyEMhI556hBt7gvdU9u3USwJNi%2BqwVnPamKjsbwFdd6Y23c%2BrY%2F3OOMvJBLI6s6vcgLfnlRxdoey2lm5bhWX%2BkIeHfZUO7bPuuOH4A3IFwGI882uKuFDTtKlq5WYa4Yt2TEsbeEe8McKnNkwiFho5kCiRtZpKDvxiLROBpskQkdTIxQLm6vOtYLqrkcdZrlpcg3m%2F35PikI5a7oeFvGsCIeGXwUDVnL9n0fsdd48J33dMeufgdx%2B%2BLZ5ADW9DLztVOxh7FO%2BiG58ABOcsgr41OieHlMxiLuZ4icUluwr25Cc1pZcf10x8rCn5pGosvbad2pVsFiW%2FIaaPMLyXqs8GOqUBqCDScaa7N1P7fWQQ0mR8rYepP0aCfYrpcCx7tyiVD0V0u7jUJbS0oK0rUs8H02OyTES9bjKOm39ZQieniHO%2BcGNbGu676kjPT37oY%2Bd5c98yXj%2FlSfuo1K8OkbfhCfuBtQrl5%2Fqpb6p0XQZDyrS7wCYssNS3Icv%2Fps7Vz1zIJhvmWid1qcmO1aZU%2FCuvc3eK0B%2Fkeoph%2Bwq%2BFxcWfq3BbZ98MRa1&X-Amz-Signature=44a5e259a8607a7080ca77b46fd39bbe75d4008d7cb908b7728aec6c1f7c903b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GHEXHXH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC1Y%2FPTTJDUqxDmCRiKcildwQ1UmdvVycJtLXngKzIDxAIgQUfTthEcPlKvUPjUclLofRazt9PGKK3U6h%2FKZV1cBRkq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDCIajPPuEYa8bjyliCrcAyYClCEJdYIayE%2BOb%2BjRg9T9Zt7BJbDvzldeYl2QWTg1G1w9ejFJdUTz5sMsy5A8xzwxMk2o%2F3efddbMpAayWkH07v0ckYT0XiKh5JydWn97gq18RqUPgBC8dHs8KoNq3IMfAByGvGZPQdOT2iGfDhvj2vuwRTCVoe6VE3oSuMYumPbkOLOncaGZyovgtNmsJQh4Na4xQCPh0OByF9SvQpfKoeHP1LyE3b8n12qiPqAA3cDyyQynzIJOMiDLxqJVanXM5bbqmvrOhDRQ96jdz6AU4NWyQxQeWYF%2BzcEBTvQ%2BI%2FXMGz4vRUSXtubRrvCXeQUkWBck38EFWIXm2H2kvS%2FDrEHTWsy7JPaZHMHorMKCxze7Gh5XJFVawmZjt69Ia16g6SSP0gLx1NkfVliryLNQDsBbWexq1YD%2FRb38u2gIvvNcA10YgG58rvVs2h%2FQVGcCp2jixV84zV4nEuGPVoyC3FfP0BHwStfKON%2BQAJbq%2B1q9%2FM%2FxS%2BU%2F7DyREC6FSl95INtxenj2FoLEAKJT352ky%2F8QEv2R%2FSGhw2gV5g0iseLmh3kBI35AfSE%2BDZ%2FyB1LFg2xQTojZRJgHrKX0YJEaF9V5K%2FxzXLV%2Fw9sIeUpFMY5r85OU2MvuUC0uMLqWqs8GOqUB7B2UYmZxLO47vlVGkRNmNKnShf%2FW17qJhjJA4D7pIb2rLJ3e22qyH5FjurEmXs9qcw4PbDomg53IggagPLzd9eZxJC9XnuyX7Pa8SCGAryPOWX1bze0wktlOj%2B9tBwLJwDaNi%2FwtVR4N7JUm%2FwccMk%2BxLZVSeiwTKfTk01%2FH9yZXLkU358zFpiS9wTVRS4v3LtIHY4BiZFb6uJwgQGIdt6OAzBw5&X-Amz-Signature=4b912029eff67252db53ea447f63026c6587005725cb10f0186dd37e27fc9f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GHEXHXH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC1Y%2FPTTJDUqxDmCRiKcildwQ1UmdvVycJtLXngKzIDxAIgQUfTthEcPlKvUPjUclLofRazt9PGKK3U6h%2FKZV1cBRkq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDCIajPPuEYa8bjyliCrcAyYClCEJdYIayE%2BOb%2BjRg9T9Zt7BJbDvzldeYl2QWTg1G1w9ejFJdUTz5sMsy5A8xzwxMk2o%2F3efddbMpAayWkH07v0ckYT0XiKh5JydWn97gq18RqUPgBC8dHs8KoNq3IMfAByGvGZPQdOT2iGfDhvj2vuwRTCVoe6VE3oSuMYumPbkOLOncaGZyovgtNmsJQh4Na4xQCPh0OByF9SvQpfKoeHP1LyE3b8n12qiPqAA3cDyyQynzIJOMiDLxqJVanXM5bbqmvrOhDRQ96jdz6AU4NWyQxQeWYF%2BzcEBTvQ%2BI%2FXMGz4vRUSXtubRrvCXeQUkWBck38EFWIXm2H2kvS%2FDrEHTWsy7JPaZHMHorMKCxze7Gh5XJFVawmZjt69Ia16g6SSP0gLx1NkfVliryLNQDsBbWexq1YD%2FRb38u2gIvvNcA10YgG58rvVs2h%2FQVGcCp2jixV84zV4nEuGPVoyC3FfP0BHwStfKON%2BQAJbq%2B1q9%2FM%2FxS%2BU%2F7DyREC6FSl95INtxenj2FoLEAKJT352ky%2F8QEv2R%2FSGhw2gV5g0iseLmh3kBI35AfSE%2BDZ%2FyB1LFg2xQTojZRJgHrKX0YJEaF9V5K%2FxzXLV%2Fw9sIeUpFMY5r85OU2MvuUC0uMLqWqs8GOqUB7B2UYmZxLO47vlVGkRNmNKnShf%2FW17qJhjJA4D7pIb2rLJ3e22qyH5FjurEmXs9qcw4PbDomg53IggagPLzd9eZxJC9XnuyX7Pa8SCGAryPOWX1bze0wktlOj%2B9tBwLJwDaNi%2FwtVR4N7JUm%2FwccMk%2BxLZVSeiwTKfTk01%2FH9yZXLkU358zFpiS9wTVRS4v3LtIHY4BiZFb6uJwgQGIdt6OAzBw5&X-Amz-Signature=4b912029eff67252db53ea447f63026c6587005725cb10f0186dd37e27fc9f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GYNEK3J%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T233325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID7KuukJPSrfK1DTMIpHjyvol%2B4idWnG66fXI9mNwPA5AiEA5y5JcRv%2FoiU1cdhkvBScEhKotdTr%2BIZX3oMSvlCijVAq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDCeHdPA8MYBZQUzTiircA%2BOlc4pxxufTXdAAeqdhTsDGgB7TmI7naUS4bgwQO9qocRCYXR%2BMbh5LX53Ukc1XdUSj4u%2F7Q%2FX0P42z0Ag%2BnpM49V0ajxMbSJfAAVN92Eq9cp3nYLClQQs70h%2Bi%2BJottrw391eEMSttx5p4Wb1uVZYAu8uEuplbP%2BSFZjis5XUzKZBUV8oRqjAQKEGDuurLzDbKou%2BD67sHn0vUIumf1uI6d0fe4hLHy7bDEOoItJ6HxRSXKuc4NyNCasI6UTwph9G7%2FNCdy%2BqD7JnBpB6384qpHVbLxdqWjuvvD8iM%2B4v085X0wgx%2ByXQO8Hpelwe7VfAGuMwi2c9NPy5eP1vichAh%2BfcsHwleTJ2iikCc95GAY4%2F%2FuriSxeqmUpzgrEq1DaBtLyXBqNvrA39TH4ClmZ5OZQclBumbvEElOSmo3E1ZUhnrb23XX6NSFYIuQEx6lE1clCXuago4l9WVBvY58zkxQMuw9M8C%2BB2qlcT%2FC3WjFjcRDhU8hMVPmSrntvlrp0Pgq%2BDGbXhiRGgdysUuyMa%2FyVtfFWmM8xZ5XwfMMhD5JfNkBJL2AsyZGGraLHv4pDRLRLEOWUo25%2BOP8bddRRoZlgaCQwFE8x83A2yzQEB3HODUejS5Vqm5D1BwMOSXqs8GOqUBphguRVkN1bLLEoxlvqXXtOtZdOVDRh5PeoUyNRKcWWAfYmwG3iIrxbJnu1LIibeM%2FZzXcYuzPCNYrdSckf%2FF56eNgVycfkJjnNrLXaJxdHmTGn6j0x0k5hYaoYqIOTAX1AAw41YLH1wDZLLb0LjKfSvG2dXifWdlzgzM0R5JdybkY5vyRLTtWWbY%2FD7LXtJaqhdXPFlSKsdGoNrjbhn5iUF0cSUM&X-Amz-Signature=8a7a6fb9bbbfbdd73753c12dbc3b6880cba1f05cdfc1bb3c8edac2dd393ccd0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

