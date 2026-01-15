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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIMZY7VS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIFIsj7VqcVbzrhM5ccR3vqfBQnGPav5aEz%2BNkq4hasNyAiEA%2FN8KPtMlAZutQboAbirZtf7UMjZo13pBxGRjcDR2Vzkq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDPp3jErlPhrZDtRIiCrcA%2FkLAJjruL%2FL5Zn7WOwpix8RgXOZcQ8vPqBcSTXHyTpNVHdPLMtlhZE0TVxa%2B%2F6O%2BTxgG2sXFzwA9gIycggmYQxuiIcRhuvWmU2YXRmDAfjL5fgfE4r72qAhMKZkXhFAv57EYxgUGcZvFRuNGUtf%2BwJI6GtPYo7NS5b21c6lq6TF6w4PoJZu8nwHOtRVmtaTYhF%2FtqjknnmsoQLvO3mwn2Kn1SAnbsOqJEanwqmpx%2FCJNN22jj5lk2NXYMpjq5FYWqNUuHOf4lKIXtm2omaWIAE444E1xleuOQQjuB3u8tkk62JuD%2FKqC4yZ3XCvecFiVGCCSsuW%2BFzf5Cm17cKf%2FvsjlzweYwRjVT7dyDplS1awPc5KCNL1C8GJ%2FksawkUrTTE2zCKzx59PPlM%2FRr90N6nb52NrhpYgA%2B0SnBnSGwOq%2FLO88hNNPxxTf4YKiddQusxKHWJ1dHTIS0OgWhJMirMps1QY781rz5%2FO48ZDZnl3O3pk3kjaucqNDfRGYH4dmLAPQ4faGPSIU%2BzcFikPwAEch0Pxyc%2BPzFJJOWtzgqB%2BSkEAz6XOd1tPJJrz1R%2F0DD1wpiQYDnRiDhrj%2B3L1XAI2Dttqm4L3u9mvLvXqi9H4xC3C6ZgsHSbJIz%2FlMJHSossGOqUBWI0qs%2FBiAsVGWiIkS14eGP2KpS9PEcIV3cUfs5FLiaPG6H1wXUiJLMx1xF9WQ%2F2ucA3ghcNwskqLxyvYxurghos1spS%2BiZIX39Uiy5saxZ5d7rsTUgstfoe%2FzI5W331BN6FtuvRjmwwpzRpT0RxGOt4RYfql69Wq0I1wTuZtNW8VOz2NAXr4CmcSuU%2FV6PR6NsHsfU9Mj3SfPX40EYMr%2B%2Bo97DnD&X-Amz-Signature=73ad5305633d2e788edc1b50b19bf2dc92654924b6c50809d7ab237ba8f7f336&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIMZY7VS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIFIsj7VqcVbzrhM5ccR3vqfBQnGPav5aEz%2BNkq4hasNyAiEA%2FN8KPtMlAZutQboAbirZtf7UMjZo13pBxGRjcDR2Vzkq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDPp3jErlPhrZDtRIiCrcA%2FkLAJjruL%2FL5Zn7WOwpix8RgXOZcQ8vPqBcSTXHyTpNVHdPLMtlhZE0TVxa%2B%2F6O%2BTxgG2sXFzwA9gIycggmYQxuiIcRhuvWmU2YXRmDAfjL5fgfE4r72qAhMKZkXhFAv57EYxgUGcZvFRuNGUtf%2BwJI6GtPYo7NS5b21c6lq6TF6w4PoJZu8nwHOtRVmtaTYhF%2FtqjknnmsoQLvO3mwn2Kn1SAnbsOqJEanwqmpx%2FCJNN22jj5lk2NXYMpjq5FYWqNUuHOf4lKIXtm2omaWIAE444E1xleuOQQjuB3u8tkk62JuD%2FKqC4yZ3XCvecFiVGCCSsuW%2BFzf5Cm17cKf%2FvsjlzweYwRjVT7dyDplS1awPc5KCNL1C8GJ%2FksawkUrTTE2zCKzx59PPlM%2FRr90N6nb52NrhpYgA%2B0SnBnSGwOq%2FLO88hNNPxxTf4YKiddQusxKHWJ1dHTIS0OgWhJMirMps1QY781rz5%2FO48ZDZnl3O3pk3kjaucqNDfRGYH4dmLAPQ4faGPSIU%2BzcFikPwAEch0Pxyc%2BPzFJJOWtzgqB%2BSkEAz6XOd1tPJJrz1R%2F0DD1wpiQYDnRiDhrj%2B3L1XAI2Dttqm4L3u9mvLvXqi9H4xC3C6ZgsHSbJIz%2FlMJHSossGOqUBWI0qs%2FBiAsVGWiIkS14eGP2KpS9PEcIV3cUfs5FLiaPG6H1wXUiJLMx1xF9WQ%2F2ucA3ghcNwskqLxyvYxurghos1spS%2BiZIX39Uiy5saxZ5d7rsTUgstfoe%2FzI5W331BN6FtuvRjmwwpzRpT0RxGOt4RYfql69Wq0I1wTuZtNW8VOz2NAXr4CmcSuU%2FV6PR6NsHsfU9Mj3SfPX40EYMr%2B%2Bo97DnD&X-Amz-Signature=73ad5305633d2e788edc1b50b19bf2dc92654924b6c50809d7ab237ba8f7f336&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7BLDUQ5%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIAmYuDNYl82qsag4gHSSg6sN6nutOkYubvkvZEOM3pLkAiANnRs9QTZlIhMDgu7ulpT3tKdc6RgC3jiG7cXi8icuBCr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMXX5EDo72Hwwi%2FkPXKtwDeqlTUYfBetz9GpStH10L5iFA26%2F1yi6Swui0o4%2Bgsnx3aihTQTjhAt0hrS7D9iZhYJImLTDDNVaZKIS35hTt%2BJ1FqtpB7KPezI518K%2BS3QiRzlY3c8cdDiqKKxgn%2BBAC8Z6Dd9SlOErcdS6b6lyA3QoL8mjau6Z4vuMeOTnCy96xno%2BZCwhFIU18K48tc9gb3aIDfN2E7W7DAgYwH2IneYyEYS1szubX7Aa4efqEam7j5YxJnNXvrGm7ZPYFadmsxUocdXIA%2FpfwfdTWVLe1Rjm9C8R8ItZTEDJCklRVFbYu9LDCrHuB1BBwznHXYh7gQjq10i1xD9Ei4phn9g6SfaBEF%2B%2FbjKhEJVEwU2iO5ay0jISlsHfwFuE9b3tEJrnZMgnB6gmv06LUfiDNbHPk4d9LGnJg%2FPH72xangbjMnkLGlOpxa7EhPjPu9ueI82GiSOZIr5xm%2BCFUlBl0cVwkFXH8fgEWn%2ByptGdm5jZ1q71bXCHfvF2ak%2BHvkqnsdcn93HCNGD5IS6vJdiZFwsYvSHJcTgL%2FClSxGmnfuJGjpudaHRUn6dVCd0uSHB04X31cdp%2BMyc9W0WDnyMmOEpZ5OI%2Fl8%2F2avi%2Bz4MKYcE2%2BpPl1ub%2BAk5dv3%2FzK%2FZEwntOiywY6pgFdiWB0H2ssxVe7Snmkd9xpp%2Bf5E2I%2BMroQMkmVblzFUPTkdJvbVGVPz2H0g%2BHQwIwFUw5u6klYD96vku7sC2A4l2pHjAXOsgjJs0wkt4YPJdqRUwWwQZpzc0QPtQBwUU91DVeRFz7MYhsvaGF8ORwNeypL9604KCU1F%2BsOvO9%2BIE4OkGXNXcSeruiRzsBbZSSTKtrKMjtBac6D9RaYT0Zz%2BkSCjkk2&X-Amz-Signature=14478a806012088072e85e4bd43001db8704b8a61d57aad38300b0158d5e4065&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGLJPCYQ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIG7UplWUHb5aTlzNwDZcIooQkZtIrJ9ivZYHRlCg2zWUAiBgGunKN4aX0VjJFfYxsPDMDg9xJRs7%2FgI9NMz7pGleQyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMclT6Z7rOtmOmZX6KKtwDtxpZF7gOmc%2B0FPRg8JzoduLlEGitaiRQILfcukNIpQlOMhPSi9F2ngnoOZhsCGaqZxmpZHIgdKsFxXwg4GWh1SMDb6suh9sl9CxfU3MMbIaJKBliQkbvkRauXP6kE7x5DinERTfURx7sTIQnTKuqp%2BgVbIS2ssLdCIFWmQ2Y9%2FFhD0GKl0kKNIwYUtrjWlViIXcQCf7F43ayUfXjH1Z45y6yWXrBpmrUShLE4sR6MqgmMIV6eXjlqInbd40H0293u3rV7KMvIh%2F9Sf%2Bhe9TDspskrBrJrZCLs3%2B9c%2FK3Y8lV691QGQzqYDcqJGMaO5mp1Chv4Xy7Ye1%2FkTvdLy4x0JIWqkj3VJjp%2B%2FZrm%2FmA5Sk9pxyiS00OyYSQLh3nrCcUO4gN7rdtpV%2FJJ8K36ZhZalzvzyYkpE9MvlxRgeoqYTptrhkoaSkI7kc3Kx2FINCjYhxRM5TYFkxZWPbAYXX5X7nbIrpFpKJgrqs9C8DMpebq6qKdjOWXhUw4mWs%2B1Ml15kJAPR3kUoC4skZXpBV1I%2BinuefFmyWtSuPCQExh7OzcwUwHcy36qyOWwDMBPgH93TsWsI%2BJeAonBPAldbEZN9M4Erz%2Bop5aQyW%2Bk0qS%2Bw0OpkCr2MFcgScze%2Fow69GiywY6pgGlDzZ3T1VLcCFKz5M3Bas5vNWVu6vJNNxm1fqUYKjk0l%2BoG6%2BJ44YWMDuAwtewhkb6pDgJ5fu5Tis1on28NtT1lRD2oKRjd3e9fDtIGhAfHTymZb2P%2FDX4Aaxsi501K0k0jWeeLUYNCa7jZ3qPvRCVz7yIgtvcjh%2FT3qNUmb9d8QYIEVJNv8%2BI%2B%2Fdnb2ZC73VaMrLLVFzfwrGAD4G8mM2Rc%2BQMK3vj&X-Amz-Signature=2a99d25433bc964e819465853b339fd35ae79e9987bd7d933aac0ce230d00840&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGLJPCYQ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIG7UplWUHb5aTlzNwDZcIooQkZtIrJ9ivZYHRlCg2zWUAiBgGunKN4aX0VjJFfYxsPDMDg9xJRs7%2FgI9NMz7pGleQyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMclT6Z7rOtmOmZX6KKtwDtxpZF7gOmc%2B0FPRg8JzoduLlEGitaiRQILfcukNIpQlOMhPSi9F2ngnoOZhsCGaqZxmpZHIgdKsFxXwg4GWh1SMDb6suh9sl9CxfU3MMbIaJKBliQkbvkRauXP6kE7x5DinERTfURx7sTIQnTKuqp%2BgVbIS2ssLdCIFWmQ2Y9%2FFhD0GKl0kKNIwYUtrjWlViIXcQCf7F43ayUfXjH1Z45y6yWXrBpmrUShLE4sR6MqgmMIV6eXjlqInbd40H0293u3rV7KMvIh%2F9Sf%2Bhe9TDspskrBrJrZCLs3%2B9c%2FK3Y8lV691QGQzqYDcqJGMaO5mp1Chv4Xy7Ye1%2FkTvdLy4x0JIWqkj3VJjp%2B%2FZrm%2FmA5Sk9pxyiS00OyYSQLh3nrCcUO4gN7rdtpV%2FJJ8K36ZhZalzvzyYkpE9MvlxRgeoqYTptrhkoaSkI7kc3Kx2FINCjYhxRM5TYFkxZWPbAYXX5X7nbIrpFpKJgrqs9C8DMpebq6qKdjOWXhUw4mWs%2B1Ml15kJAPR3kUoC4skZXpBV1I%2BinuefFmyWtSuPCQExh7OzcwUwHcy36qyOWwDMBPgH93TsWsI%2BJeAonBPAldbEZN9M4Erz%2Bop5aQyW%2Bk0qS%2Bw0OpkCr2MFcgScze%2Fow69GiywY6pgGlDzZ3T1VLcCFKz5M3Bas5vNWVu6vJNNxm1fqUYKjk0l%2BoG6%2BJ44YWMDuAwtewhkb6pDgJ5fu5Tis1on28NtT1lRD2oKRjd3e9fDtIGhAfHTymZb2P%2FDX4Aaxsi501K0k0jWeeLUYNCa7jZ3qPvRCVz7yIgtvcjh%2FT3qNUmb9d8QYIEVJNv8%2BI%2B%2Fdnb2ZC73VaMrLLVFzfwrGAD4G8mM2Rc%2BQMK3vj&X-Amz-Signature=66c543a9f28114ce32a983fc4677977a9c20e1917ea25baee988268a8794d751&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTOO27YN%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCICBocnY1yqtOqsdUCJ0Vhcuz4CGYUtP8BNiDHu7zvsLfAiEAmyzYZ1oqLc1bTZsWfG%2FSM1vN96%2BbBlVKnMyPX5Op4Boq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDBwsqcGVYANXyi7sECrcA9pWP%2BTQ0FqnhPIPYKevzDFN%2B6N6ev1N5HZHkNxaT9awImyvFVi5tshKhTbMiyUDZUgh6Jr7wdHfY8Ukerw2HX5UD05Etm5CRfaDxOmL2UkNA1mdRUCknfUTHnPvqwFCUhDw8VvzrkcYtqVkEd%2BiiurkvEp0qFCfTDPxRfn3YxNCjSRp9kcIe0wZX3K6W0K8zS1JCLpdouLyBZ%2FAOXQ6W%2Bsj38KU5b1gwea6OIWIlJirSX3c0EakcEfLtforo72%2B1ezj5%2B%2B19qg9SGCw83CKNSZShfdhSGjua3fvQnoemmpTD%2BVIz0Hsk2Ml9ArhSUl8%2Bs8DltLU%2BASp%2F8ywG4AXpEeyx5omYydPm%2BnA1eDU0hniC5NHMdwRkCjedVXh1BOzPJsRNpxLLQcsK%2FfK%2FYZkfhMDNvUF%2Fzfr8jgCo08506iSMwGR%2BhNTMDZWOahQbQwH3wd6nu6jl96bBZHTxMOAzfyRp8qbIOcwXo7Gyet6SOxc3KkefjXGH%2BShOje2GNjCTjbRarhOx4IVAgoFA1BQokpzu4FWmQUixWUui6eRY%2FYUGiCUOuBwB7wIgI%2BgXUrMmDK9w9AzWub2GzSQiU2RwI9lb5jT9TfTkSVhOPrQ1IuSf4cFEXV7WteZOACCMI3TossGOqUBovTvLQBt6wNPALq3xblM34KnrFalmENN5oO2X8IqqOm1T9gRVqki9GxVScLah09UBaJuvGlN1YicdLs8okAA8e9vuTcRkO%2FD0t6hu4adm0%2Bxm8LNd%2FAEwLGlCXY8%2BD8aUm4zFCP7AmUtj35MCNS1Ru8QunrSB9shabuwgALTbUYupKA9FiZhwOBN1tqxIwgp5P%2BFfg9TdafdJnVYxbLjWraaYTEp&X-Amz-Signature=a2f48fdc720f19d162a6550ed518add01991adac87e2bf353e1bb6526ee0c1c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656D3Z2UO%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQC8zgKN01HPd79eSXpLSlaV4zSSN8U4cHNqcxWv2jQLnwIhANRvcxnRt%2BFpL5vDsYglNqxc3IRgQIcFLYrgWKsJECYoKv8DCDIQABoMNjM3NDIzMTgzODA1IgzIlVH7RxhMsNwU8zQq3ANynRjgkahDuF5a45xImJ%2FPUiPekBfQOfZ1ZX23AVUHtWFbgqZoScMkn6mMKtiiQq0imIZnQ4P93zXeT2EB1Cq%2FHzqTxci%2BfdJCfPc6rr30d7HaNXsDlwtvMrRqLzLgaHlsfdQRmulCR%2Fc0B7Zo2WuoALuGZ7v90gvQc%2BVTsuzLisakldu9%2Fj72Qr54qJN1zdzs0OVS48CBBJGa1xXx4aco0tbV%2BZ08Du1VGB8dN4okFMvF4ztWRJSXf%2BuRWjGeLahKjAnW6FS0C9jr6LJ2hc8yTeTUaXG5lHLphWS9L5cunE87vzVlIiUEccbngeTGF%2F%2Fg8Z8EiCftH7fReBK937VIU5ER0FG7tDs0CQvURyWOjVUYBvq5igTi3YV7dmg26TGXq0wYQkCWunZW6hAtjidTcbP%2BdGPqjoV041880vTXe2RtEFr5Cl1EbNKCEYlmr1Hir2FuHRrx34DnSOIZzdcI2leViE6NW7ncFH9e0wHRjO5xxm5IaxE%2F%2BvgshmQ3FebxQOd4xEfgflSEqdsep0xgAj0GoBHOszrnKqCIZV%2BfK%2Br5JWNDliThDaogvCG84lEyvLMcVNXa%2Fe%2FpTFmLSVcwH2m8T8MwVlogbVrcGAWL5s8ePful6v%2Bah8bYyjCp06LLBjqkAXvFCYIsJVEphWrpd0ZJO3m3DwHLfU8uL6rLlODrf4SqAs9uZ2yB4b4SrGs4nOwh%2BJU2ZJy9C8gH5m8bd4L0nph7PA6jIzh7uugo7oOLY5wuUDRJvoqQxqkLNrji%2B1o8roDDVOZyn2m7dy4nDZrIe65i6WvybwxWBqg1WlclSnBfOWRYJzkmCAcTIwzjgppn2YjgybU1NtArcOjRmPgXJxug5VyF&X-Amz-Signature=378deb64797e24082ee7f96c8f042a8396632c68a72c2d93941edb59d579d220&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSEBTBI2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIDrf7zJY67ImE6I1aa8kOSNPWEl5BTpAtHOE9LwrxJmSAiBN4%2FXgswYq7%2BPxmoKhmIJ8o%2BwRg0gICd6muyZK4fAPlir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMil3FnMPLaRqpJAvcKtwDR8jX6PQytONoYA8ISYgx7A7A5xBTfixicEoujHzZnuB5CYsXTwzg643WzQ5uZgvHB7BABtppW18uJC6moISDPwzgwopxnuvbwVV3uNGw1d%2BaAAs4gqeT1mtAjnXDik15WOuHvQs4SvLjxWEun8aj%2Fyu3HEEshstMc%2BxIIvTdxBzstBLrlIA%2Fntxf0xvMlz44Uh8zAtFasJtwPrTwc2qGVIp1rqfxMhkiSIAc948UMGbtpryn6R%2BuAVj3LngPknv7xeYFQdmcuRnA2IE1DgTl%2BCq888lYMrKtxowS1iCIeHqhk9gFy3J%2By3uqebJWUWAoLRcJWNdZr9%2BRHIxIbp1ir5NpYn8rWoqTjShjMUIx%2F84Q1mr5XnBWMW53cwiJwLy5B6%2FrycHXG1YmqFa4%2BtF5tDm%2BPT%2BUTTMo30njMTrmcdku5hoSSD91PQuIf8cdT3grzi%2FbUMnjMmDCywdmcQcnVevOfXua6F%2FVqps3d59Jsj4c6t9OJbqbJ%2BgITetVUEG7tFc08D0v6IjGh7JQJpgQa4Dab6UqJsXOE0HHk3%2F%2FkYj3XynWf%2FOLglZYkzflsvxuejV9leZYljcMdP%2BYXD%2B8NboRdG5YRyHeAgWNoYgVQ4yHJHqzHuPBgsMujDgw9dGiywY6pgFMaRfJn7SPN2VEwDQSAoP9izIHcubbqzBzQUczSkRvcQ9sz4pKRPbJkbe%2BEq674x2YrY6%2BNM9Vr5B%2BvegaRCUdwvZAi0Zcta2dWpPoWGIiQm9NtzAj4Oz%2FT13csR8mhIoOscwrsgjNdmEQ%2FmCv%2FG%2B4xPMiBYOCmiu%2Bg5IIB7M%2FD%2BuEH%2F5lV3y9o7gYrZBuPLkClrDOOvjgkPmHHFoMhxY35%2Fak1x8N&X-Amz-Signature=4eab35dfd199950acb32631bbd264d91d98bb2873de4cc4643b1db664188a912&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULQUTSGX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDGgBChx2kEEfGDDj1Kef0De6QwUl9t5hXmPvHNlKda2QIhAOOY%2FHV5zfxg4alpZmlzNAhkRz%2BuQV4kTdDwQUS5uh%2BxKv8DCDIQABoMNjM3NDIzMTgzODA1IgzyRxDFEt66wxI%2BIB4q3AOWQgMl7qr2clD8USf4XuJt4SCpeF6XuoUjj8JPeobBUoYLthzaemAsbjjqqUzBK%2B43IEaXCXwe3jUiBzA%2BMNq9viAeDD3Gr2SUUgvNbxP4D8GC6W9SFNDhfTLC5mHXCsTxmO%2BZ3T%2BeBsTN0NCfvkXq2j%2FHhAklTqbtWWrg5KFG%2BRGBwJarqcH8f8MhvzMDAQyA%2Bbat6dt2g3%2BnQ8i0tE5crJwB6bpfT6Q%2Fc%2BeJWs85j7YxS2t%2BVhyiwauy4mrT7%2BNvJs5aHuUBIoLot2TR8ZkOAgsWjhZG6fwNrqP5YgdGuEiyonNVymjfn3VvLllEOc3DI4o5625QAxW1Eko6HI7K4Fhfk4AhW4zfwLm5n%2FuHwWBg%2FQLKsQK7vWKLmpFGcjjLt%2BvtEGIzAKqMfjSDyrmA0PY8VvsE24LpsnFqYXbkqoib4QXvHcJBIjz%2FGZxELPZGzElSsrLr93BaT5UrOu%2FWhxtq7azubqINIMS3BwNkgbmZcLvP2vw0F4QKp%2FgRe6sFQaLN%2BCRw63kMkP4U2nf%2F3PCo83zOx6tLjvLK4Qz0YZsO6I9gB8NAzkjJQSQOfdBLlCjyWEX%2BJGYpIs9%2BOjhbVrZ9K8Aap3lMUTSFAabksEMsq6i%2BYfIOxHXdgzDv0aLLBjqkAQbbKAQEB0yHpLsCbNhames3AicxevszpnCxl9%2FFm6NgXwCTp42FNqZXGWuQ%2BI5ls8GNgjiAalvlPkHtq0X1NeQzx3SC4I1aLLG4BGaekZXWVf8dXMcQs%2FT0hyHuS%2FYmIBd2TnYBfzh1UQsGh8QJtEJ923kIXlyxf1UogsONHzMmMZY5kkmO2Umae3dT8XBoQZlyLPNHQYQLjWXHHWSPEva1hYbq&X-Amz-Signature=99260930c250835e90e4ef41bf9d4a63281910e00f4f1da7970c11ac0a7e7454&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULQUTSGX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDGgBChx2kEEfGDDj1Kef0De6QwUl9t5hXmPvHNlKda2QIhAOOY%2FHV5zfxg4alpZmlzNAhkRz%2BuQV4kTdDwQUS5uh%2BxKv8DCDIQABoMNjM3NDIzMTgzODA1IgzyRxDFEt66wxI%2BIB4q3AOWQgMl7qr2clD8USf4XuJt4SCpeF6XuoUjj8JPeobBUoYLthzaemAsbjjqqUzBK%2B43IEaXCXwe3jUiBzA%2BMNq9viAeDD3Gr2SUUgvNbxP4D8GC6W9SFNDhfTLC5mHXCsTxmO%2BZ3T%2BeBsTN0NCfvkXq2j%2FHhAklTqbtWWrg5KFG%2BRGBwJarqcH8f8MhvzMDAQyA%2Bbat6dt2g3%2BnQ8i0tE5crJwB6bpfT6Q%2Fc%2BeJWs85j7YxS2t%2BVhyiwauy4mrT7%2BNvJs5aHuUBIoLot2TR8ZkOAgsWjhZG6fwNrqP5YgdGuEiyonNVymjfn3VvLllEOc3DI4o5625QAxW1Eko6HI7K4Fhfk4AhW4zfwLm5n%2FuHwWBg%2FQLKsQK7vWKLmpFGcjjLt%2BvtEGIzAKqMfjSDyrmA0PY8VvsE24LpsnFqYXbkqoib4QXvHcJBIjz%2FGZxELPZGzElSsrLr93BaT5UrOu%2FWhxtq7azubqINIMS3BwNkgbmZcLvP2vw0F4QKp%2FgRe6sFQaLN%2BCRw63kMkP4U2nf%2F3PCo83zOx6tLjvLK4Qz0YZsO6I9gB8NAzkjJQSQOfdBLlCjyWEX%2BJGYpIs9%2BOjhbVrZ9K8Aap3lMUTSFAabksEMsq6i%2BYfIOxHXdgzDv0aLLBjqkAQbbKAQEB0yHpLsCbNhames3AicxevszpnCxl9%2FFm6NgXwCTp42FNqZXGWuQ%2BI5ls8GNgjiAalvlPkHtq0X1NeQzx3SC4I1aLLG4BGaekZXWVf8dXMcQs%2FT0hyHuS%2FYmIBd2TnYBfzh1UQsGh8QJtEJ923kIXlyxf1UogsONHzMmMZY5kkmO2Umae3dT8XBoQZlyLPNHQYQLjWXHHWSPEva1hYbq&X-Amz-Signature=3b4e9d71a2439893ba193848888835d2b4310cf187b1ae0856a43ac26ca7fe2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OBVIAID%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQCUje3jmcWTAM9ba2GRuoLAGPEaqle9Sy5nd7Y6L3KQ2gIgCh4iX76bT0zEBM2ERt%2F7Ikg4jRt2JLtzlgeSVUmxbzwq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDLWomn%2B7DNO1kDD2%2BCrcA4Awef84bWJj4GM%2FjkYDEvOu58xhoLDO96DWSD5PPIRJkzGpoyBHgXPxoP3nrQpkjM8fM0Hj5nOD2JxxiOMVr8BRWf4F%2Bl9xZLUImPbI03iwnP1GKym5QY5OSgJ1GOaLsIwAo9x33BZ8AuMYsFnYMvFyDFu5jznVmNu1R4oeY1vexSIJ%2F4Byi6jaIlONoxXFQwWSyX%2ByX5w9aYKskj6eE0wAZ%2B3cminM%2FZLJq99hPuBfzKBvP5IPRSfiyj78%2F%2B5r44qQ2vXIL3mz2Wyz6BPr9UBk7pckkRRG7nTaBr3gfKOrrNyGUPZpmx43XolJM9OTU5MKQ0wHdSQ6SWsfqgfMt2SBkcdH2ZVYhmaKugqw7UxUtWJHVm%2BIIDcRN6RnMPuHIxdHCipGwFOjxvqRN80iWvPgdTxMcIlVYeqaaNstaUgVcv0Akkjl7UEiq%2B42lHYyEhafOtT40qrsFrD5bVXyTal2EdEzwm0znHNtyDOi%2BpF8QGPWc41mP%2F3ZmK%2B%2Bg8CeWqu2WKyPp9aHEWOOU43B6jFea0DL6UirA3wGXtJMZyKxSNHp9jJuLQ4bfNILWgqPgCY%2Fb1TwS6t60ljRnVTcW2JWft4UfVnd7RwdaE%2FaZMNJ0BYlNtnrrpMHdke1MIfSossGOqUBN1GSoX871BAlsNh8gqWe71m0z4j5%2FbUZx8slykd0CTYD8m4CRQwBE0Gv6R0BTZUle10pvklL9uGYrBTv1%2BgjGczbYwNN9UxAwbxsaRc9WvyPHFB9nZQQ%2B%2FC3CsDTu5bez7sm5IIqHIxBOdFtGa8uPb0zVnlDsp6JmSnjcNNg0qQ5haz6LOtRW76zbfFBpfL2w%2BE66euXwBLTvRqaSRaHA3THX4Bw&X-Amz-Signature=9c89b8b578b6a3b6fe5a0c8b3f0784153cf457176fd542a2f3ad02be927fa232&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QL3LK2HD%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQD%2BVzCZSw4wdz1WthTBIA4qy638CCgD6Ah81XMlSUPcQwIgfmTNaEUMTZq%2BvMOwpqaZiu2q9oYDtqePweFVkJLil8Uq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDNnRvqarfm6GuEOi5SrcAwji6qRBy4P%2BW04OiwLwAyVyDv8jLnmXHAig%2BpQLjjlc9SJ6pK%2B49crkYql%2FxFXx013QE0WjRYKSgLvinVV5yWMmaYqB0fNVtT9aL8U1wM32sWGIsOtq8ukfvWEt4019Hz19Z79L5r0nI424Jvl5XnV0JBvT2GCiICJvhPdtdB9w3UbnDvCuWETMo%2BCWcD3bPA7Qy9PazzmZeIDYQsOWH3LJ1m6iJSErUPRcQDXSE9wJ5s7rDBuUXP1EYuVsvf3jjle4SOEQKfKemljXAFtf70c4VQauU%2Fl1ogEMG9Ssh8LrCXYdmWA7Om8JUFhZg%2BRoXOEkjJe2eBcTf3E5y1RLvgEiSwvoDXEok1%2F6Dkp0t0u6HxrtNoo5YEmWRkbKVKyrRHx22Z3T35MrOWqHmeSVjSuNq6kbP%2BeKmKlcR4JajaCU200JQqBz9KDpLA9IrwXlnc1xsJHsXx2nFBQJhqXLd47cjt5LnYcmLerhVB0T04647%2BhEZdjs%2BaCTCd4FdTvTEuPDCG2A3fCyFKuxSJvthwyejVYcJtpvbeIaRnjHVa%2FilxPgpUoEI51e7JfS0fAGJ8VXQQ9SerWH4BG4XAVZ8lIGx1RZU%2BkYlI5ybD%2BHQsxPaDGrYVItxjt2LA20MNLSossGOqUBJuvahAiDZs0czhAtHbkImzag6zlGXq6ku0z3g%2FQIqx3gpilCl%2BNUp3n0Ei79lYnDV%2BXYQDpWiUwFRyHqUefDcmrH1uucGW1HN0QEhO2rfwwry%2FWQLqYoVRjwR%2FwQA7iwJ%2BK4gp6Oj4p%2Fd%2Bg7muIq93scsk%2BIma6BMmRjEmQ82w5TkxcoEOrWq4kuGuk5rgaO%2FFRCvlVc0aW6%2BsId6fpQ6%2B37%2F2In&X-Amz-Signature=8b8be3c0f5230732b4563286f6624de522ee0be736f3d9c58983fe2380d3cae0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QL3LK2HD%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQD%2BVzCZSw4wdz1WthTBIA4qy638CCgD6Ah81XMlSUPcQwIgfmTNaEUMTZq%2BvMOwpqaZiu2q9oYDtqePweFVkJLil8Uq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDNnRvqarfm6GuEOi5SrcAwji6qRBy4P%2BW04OiwLwAyVyDv8jLnmXHAig%2BpQLjjlc9SJ6pK%2B49crkYql%2FxFXx013QE0WjRYKSgLvinVV5yWMmaYqB0fNVtT9aL8U1wM32sWGIsOtq8ukfvWEt4019Hz19Z79L5r0nI424Jvl5XnV0JBvT2GCiICJvhPdtdB9w3UbnDvCuWETMo%2BCWcD3bPA7Qy9PazzmZeIDYQsOWH3LJ1m6iJSErUPRcQDXSE9wJ5s7rDBuUXP1EYuVsvf3jjle4SOEQKfKemljXAFtf70c4VQauU%2Fl1ogEMG9Ssh8LrCXYdmWA7Om8JUFhZg%2BRoXOEkjJe2eBcTf3E5y1RLvgEiSwvoDXEok1%2F6Dkp0t0u6HxrtNoo5YEmWRkbKVKyrRHx22Z3T35MrOWqHmeSVjSuNq6kbP%2BeKmKlcR4JajaCU200JQqBz9KDpLA9IrwXlnc1xsJHsXx2nFBQJhqXLd47cjt5LnYcmLerhVB0T04647%2BhEZdjs%2BaCTCd4FdTvTEuPDCG2A3fCyFKuxSJvthwyejVYcJtpvbeIaRnjHVa%2FilxPgpUoEI51e7JfS0fAGJ8VXQQ9SerWH4BG4XAVZ8lIGx1RZU%2BkYlI5ybD%2BHQsxPaDGrYVItxjt2LA20MNLSossGOqUBJuvahAiDZs0czhAtHbkImzag6zlGXq6ku0z3g%2FQIqx3gpilCl%2BNUp3n0Ei79lYnDV%2BXYQDpWiUwFRyHqUefDcmrH1uucGW1HN0QEhO2rfwwry%2FWQLqYoVRjwR%2FwQA7iwJ%2BK4gp6Oj4p%2Fd%2Bg7muIq93scsk%2BIma6BMmRjEmQ82w5TkxcoEOrWq4kuGuk5rgaO%2FFRCvlVc0aW6%2BsId6fpQ6%2B37%2F2In&X-Amz-Signature=8b8be3c0f5230732b4563286f6624de522ee0be736f3d9c58983fe2380d3cae0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG5VZ4UC%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T100123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQC1PKQZcsWwBocL1qJnvCYC6sc8iXAzXHfw8orUuBUS%2BAIgdCRI3Rg7a9G%2FRDm0hiRiDLjEpgl2c2%2FSq7PwcPCC6P4q%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDMk266RledtMuc%2BI4ircA5nbmgYAKKdqVcUvau%2FxQeqrsxYxiaE3Fid0XtWuKHrm4HnjgzGFIQ9ePI6anf9QyIujXE%2BTJ2bLGJZRZn5lhjib1yxOPGc%2B1s53MuHVIIPo7CcGnTrc%2FOkz1DkMECU2VZcghDTyRKDpMuoPIkAPKbUeg5AQzWJcgfdvuPT%2BQUARN9r6CTfJlWFQxfLI%2BLp9IWz8aoJjGpPZS5zTcBTJOmVEM6uo0R6HmLfCFPXG%2BKBlmAOCrNW64bTPTCEs36kXyGV5tIyKIKgvhVFweW1Ahyboh7RzX%2BSgyP%2Ft9fT4n1XFjyiR5xUUKOHIaa8U0N5xYhdxURoB9AS8QLRHAlEpgMLKjGpebM97Ve9c9AjImo4BEUwLShEST%2FWMCOlL7I1RFhTKCpb3%2B1J1i8xPONuIcPhKwI6gJjKcbst52y7ZjAHpjH7Mww3UiXCXjsyFfNdGIMXsDVuGvrKst2m8CIEBT67fkgcV83IVWYzbSH75Yg33Lv1neajJQjaxRyveJ5btBrsJKzbotqKeZ64ddKsBDQscu0uYHIvByJiBOmoBFs9RKQdB%2FkJ2WF843sW7%2BSCvk9l5AUyQU5PUYlg1%2FMfU2kwneUKVFgYSpPl2t%2Bp1IZpFmMFwiz6vieJZBqNgMPvRossGOqUBU9dwfFWbHZBzUuIOXMA9W5xJLmU75uDQ%2FQi8AQiQ2jEiKvpqSay1NZF7DHsww84S34QAutTS34bz1Le8U2xzx2kVo9fH1PX2bx5Sab5AxjJgDCb7b0ZbjjQkYGTdIOJgJ53QPFzDzz52nYKED3fZukD7tV6nH%2BR0vEAgR5I8%2BNUtDstifMXbkp22zCyNgY%2FEOUDZCcH7wo%2B8u%2Bq5YW0tkwj7R92O&X-Amz-Signature=97ad741ac4bc5fadf2ead201a14a66a61dfe53d9b46ab1a859173535d9e4d36c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

