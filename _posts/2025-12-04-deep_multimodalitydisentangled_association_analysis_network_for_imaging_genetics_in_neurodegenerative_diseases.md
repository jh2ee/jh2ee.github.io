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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKITDIS2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDa%2BBKDN87H9%2B8SLvoSzl4gD00hj5vW35ndwwNiAeQpwgIhANnuzEXXFWUQ8%2Bd%2BXK0Q3n8JHWkE4pq7%2FjeQMmxRtfVoKv8DCDUQABoMNjM3NDIzMTgzODA1IgwhEnxXhxyBTfjnYLUq3AO8HGcc8HfdaNaCRVpQPxUw6sg5CjTRtL62GfgG8gDk0bpKIv1ajoPZu2sGFnkFKmFjfIK2J%2FggvNVEh5Z%2BAppGqoYQC5J9x8v9kCqmRh3KkLNYTqcfFsEMYUmfFgPMM5RUDmMNmBh6qrVnTdE50ZIEKYrlpYk%2BAlCSzzzIITOq6Q7VaWeXLU6x2418FEqHtCztp52c3uSG%2B0p2UJxAVR5cv6aYhD1Rt7QOvABrMwR1QGyxmUaACJaafrKGWFMecj1qz7wkG%2BOJWHhEmiWyN7ZYaqEkDH%2F3KzOa6xrORGfqez1PrudOJAUG1%2BBXV9NAUZZh0JonnfY28d8nZJF28nu90HPAfOZl6d2p4FOmwMb5VasaKlEOsOJQqyOoI1PdnJtAthVNmSkl10H0MvuXdJyQFyXtA%2FPHHHkroPIufmyoHzHQD0VAuQgVUSMer7fdckLM84LO1EK78H%2Fq8CFR1Xq3l5CCxZSFNmSM70%2BYB%2BEe4J0GLRJou4U8RZBkR4op2MJcDlb7v9rNI0M4qr43tU1LKilZlX9uUQIGAfNaHgzNGQXEu6CJo%2Btf5qaQUK3xzsFUNls6ND%2F7p8ZzHTe0UH8m6%2FdQOezfbzLeC401qE53IQ8GVQfqI6SYWxrQQDC%2FhuvKBjqkARL8WDJhTY7k9Z1Nh%2F6P5qdQI0rvza3W8V5hZX9QvRIXalbQheE9l3pLOe0QxoKD1UZeL62B82xf9t59zQ4dlXZI%2Fiq2M4ZevUvLRDfR%2Bqs6y3gMiijZk5P2p4%2FWbb1sjHVt6V1A4w%2F5ybVA19rbnRJM9zle2m35ek3Q6T9NiVShuaS1c%2FqBS5T%2BPSoqGcFPFNM2W4dAa9cpeGnEhqXXKS6U%2B%2B4t&X-Amz-Signature=f0c0b7febfae9afca52c50b6f54c0da4d5e4171c6a7d1082b04bb012b85bca33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKITDIS2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDa%2BBKDN87H9%2B8SLvoSzl4gD00hj5vW35ndwwNiAeQpwgIhANnuzEXXFWUQ8%2Bd%2BXK0Q3n8JHWkE4pq7%2FjeQMmxRtfVoKv8DCDUQABoMNjM3NDIzMTgzODA1IgwhEnxXhxyBTfjnYLUq3AO8HGcc8HfdaNaCRVpQPxUw6sg5CjTRtL62GfgG8gDk0bpKIv1ajoPZu2sGFnkFKmFjfIK2J%2FggvNVEh5Z%2BAppGqoYQC5J9x8v9kCqmRh3KkLNYTqcfFsEMYUmfFgPMM5RUDmMNmBh6qrVnTdE50ZIEKYrlpYk%2BAlCSzzzIITOq6Q7VaWeXLU6x2418FEqHtCztp52c3uSG%2B0p2UJxAVR5cv6aYhD1Rt7QOvABrMwR1QGyxmUaACJaafrKGWFMecj1qz7wkG%2BOJWHhEmiWyN7ZYaqEkDH%2F3KzOa6xrORGfqez1PrudOJAUG1%2BBXV9NAUZZh0JonnfY28d8nZJF28nu90HPAfOZl6d2p4FOmwMb5VasaKlEOsOJQqyOoI1PdnJtAthVNmSkl10H0MvuXdJyQFyXtA%2FPHHHkroPIufmyoHzHQD0VAuQgVUSMer7fdckLM84LO1EK78H%2Fq8CFR1Xq3l5CCxZSFNmSM70%2BYB%2BEe4J0GLRJou4U8RZBkR4op2MJcDlb7v9rNI0M4qr43tU1LKilZlX9uUQIGAfNaHgzNGQXEu6CJo%2Btf5qaQUK3xzsFUNls6ND%2F7p8ZzHTe0UH8m6%2FdQOezfbzLeC401qE53IQ8GVQfqI6SYWxrQQDC%2FhuvKBjqkARL8WDJhTY7k9Z1Nh%2F6P5qdQI0rvza3W8V5hZX9QvRIXalbQheE9l3pLOe0QxoKD1UZeL62B82xf9t59zQ4dlXZI%2Fiq2M4ZevUvLRDfR%2Bqs6y3gMiijZk5P2p4%2FWbb1sjHVt6V1A4w%2F5ybVA19rbnRJM9zle2m35ek3Q6T9NiVShuaS1c%2FqBS5T%2BPSoqGcFPFNM2W4dAa9cpeGnEhqXXKS6U%2B%2B4t&X-Amz-Signature=f0c0b7febfae9afca52c50b6f54c0da4d5e4171c6a7d1082b04bb012b85bca33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXLJMMAT%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCICVtWEO3vMR6zccJ8y2NAewnGAURLA6V8Hd7zdkZp7uaAiApmirQTtpR0yqHObEG1oswd%2B%2F%2FrrJrbZG7uuXhiysfkCr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMObzhYYHbFGHhgNdvKtwDDSPOlSOM3k9KGP4iFywglxSQoXi%2BghY0WiwjK5xb4EWhgGNW0TaB5QWrRyHgFFiezAOKVOJqj7zCBswkLQEnQ12uGGWIEFteHFCz9AbGy%2F6Jaq4piaCMDgPWnRc%2BPOM3htAmXjfQy1HFU0sdr6j20Xb0RwiO%2FfPK%2Fr%2B8k1O7GLLYlI5JsYmhGD%2BP%2FnfPGjCgop6XStnDv9l%2FzYkhpAv%2Fj17KL2IgByLH6R80U76vsyUyoZuhrcRypW%2FIa5jTvSTTOF0NhjOEvqNbZPxNhZ3qcij3Bu%2ByXzYL7DojWL7IRv8dpv2hZ83UsNuFb5FqSzNk011OUsgjA9UPXTxMjRHM62KOBGAy%2F1VZy%2BXXhnpSEatC6cBrLLd6UyL7dwPDl5AXtjkO%2F1JXXRWu0gGSOIJHHeqVsSiSLttfe8S9nkwn6W02st5YsteyoLlsfU1xhF0nzPR80nk4qA35T0KiqJ4FMbZuexJSR8H5Ca0nu1TGS%2BcVnWrbyX%2B8ZehgGlWik3WIAV2Oen4D%2FLeVR7leVVkvgjJU3N%2BbNZWntIwvf5mJxGrS6eJpBrvtykqBhM0Kic1423NwWzePFbupmgr1G%2FB2tLqILDB1GGV7QLvOyGIrzK9QS6EVeIiAJkDUaa4wmo3rygY6pgF16BD1IxC45k0AB7R1JDeHDm0rbRIwomK2Tb9%2BAICOM5O%2FtA%2B7%2F1axJObeyZqES7V037jTWwr2QMpZhwjVBbQpa9NyxpAtU%2BtufU7O4GFos0Z7fLtHnOaIU2xEPvtMAwCCa0LG%2Fd2OkfhkCSpuKWK59j6aJkorP8MmzulX%2BWLeAPFkJiZIvE7k1uc7ylYa8h7a2CVE2wI%2BKmhUlAeqwTNWzpYvP6hN&X-Amz-Signature=87375ae8054fa91032f3464c126aaad002cd2bcba454ae62b108c1f5132d3fb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644WBH54K%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIBFiIuJcZOxO0WOvLhD3qG%2FjAUQxdaLXDvrr5TRJC4O7AiEAp3OZKmXNvABh3gEneXpJqp1r7nNEuJ3BEu7oWLx%2FHpcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFTBuNIhtdMBlhg8MyrcAz0FA9KDouOv5lCgZ%2Fw%2BxhKT%2FxXELyiuHodPTELxjb%2BR6MfvNga7K5v0sT5wwrm1RrznUK7Rbturn9UJN1%2BEktGG4ha8hKAk2JAHrJPFCPfbL0wOoqRgNh6of14eGfBhge3B43aWl5xplvXww3O7mzea4iqmYNMhmGhAObzCuNiwzkCq6qWMRzdgY4lubl22Plkjxeaju3vWoZmW%2BVv8sCb4SwBSQCDUax657tvuXiAbGPij%2Faa8cAUAt41VvwJ7qTHIYm2M9o%2BfxzG7bgaa%2Bn1pIuwQg6Awcv%2B3337sRiePoudrr8fmDmJBYhasaBUUYuGICVADtjyCz7k2%2FE80UUGlSzl8Yu7TZofKrjBYxKCW4fmjxBy3CYgg9MQBoXY3xMKq8JYsCsLBD0ABBruSQotVwPLV94UosH7GxlJifyEXf3GsJJgf35Aoduh2HrjM1QBx7n1MrIQZWe97HBpKthpVia%2F%2Bv3KYFrp585%2BV0g68mk4reUTsm9zfAoLoyhTAG1R8lpc2YfoadvzKzdukSh03V9n%2FrLM427HljYQyxeN8Yq%2BS1gDFjXxgYY8adkzaGIAuE3cAqeL%2F8zz2qZXeUIqSrL%2B1edoBW7ixPGRO8lKzl477mNpnjzQ%2F1e9gMOmT68oGOqUBYeMU51ldYhk%2F2NSh5jD4ALwt7FAG7ftIshEyADGMkh8Aw1SZ9MRVNqmjVzEoLC7oZSOc5rK7KdZYCY3PGo7ekcKXoj7qMD00HYW1%2BmHH4RAK279g4bjPPMWHwjBoS4pUuZ%2FCk73Kj9f5rjisLEvp0hGEhk40Kk0yD7UhoPUFhq7pIn7yALPIabVaaI3JoEvRTrL9wnYLwUOs4CA42eyExsa4HTZ7&X-Amz-Signature=10d3d6a50ea83f451716609aa1bc880fd6b1b66b3622c1b57f9cff5b349386c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644WBH54K%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIBFiIuJcZOxO0WOvLhD3qG%2FjAUQxdaLXDvrr5TRJC4O7AiEAp3OZKmXNvABh3gEneXpJqp1r7nNEuJ3BEu7oWLx%2FHpcq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFTBuNIhtdMBlhg8MyrcAz0FA9KDouOv5lCgZ%2Fw%2BxhKT%2FxXELyiuHodPTELxjb%2BR6MfvNga7K5v0sT5wwrm1RrznUK7Rbturn9UJN1%2BEktGG4ha8hKAk2JAHrJPFCPfbL0wOoqRgNh6of14eGfBhge3B43aWl5xplvXww3O7mzea4iqmYNMhmGhAObzCuNiwzkCq6qWMRzdgY4lubl22Plkjxeaju3vWoZmW%2BVv8sCb4SwBSQCDUax657tvuXiAbGPij%2Faa8cAUAt41VvwJ7qTHIYm2M9o%2BfxzG7bgaa%2Bn1pIuwQg6Awcv%2B3337sRiePoudrr8fmDmJBYhasaBUUYuGICVADtjyCz7k2%2FE80UUGlSzl8Yu7TZofKrjBYxKCW4fmjxBy3CYgg9MQBoXY3xMKq8JYsCsLBD0ABBruSQotVwPLV94UosH7GxlJifyEXf3GsJJgf35Aoduh2HrjM1QBx7n1MrIQZWe97HBpKthpVia%2F%2Bv3KYFrp585%2BV0g68mk4reUTsm9zfAoLoyhTAG1R8lpc2YfoadvzKzdukSh03V9n%2FrLM427HljYQyxeN8Yq%2BS1gDFjXxgYY8adkzaGIAuE3cAqeL%2F8zz2qZXeUIqSrL%2B1edoBW7ixPGRO8lKzl477mNpnjzQ%2F1e9gMOmT68oGOqUBYeMU51ldYhk%2F2NSh5jD4ALwt7FAG7ftIshEyADGMkh8Aw1SZ9MRVNqmjVzEoLC7oZSOc5rK7KdZYCY3PGo7ekcKXoj7qMD00HYW1%2BmHH4RAK279g4bjPPMWHwjBoS4pUuZ%2FCk73Kj9f5rjisLEvp0hGEhk40Kk0yD7UhoPUFhq7pIn7yALPIabVaaI3JoEvRTrL9wnYLwUOs4CA42eyExsa4HTZ7&X-Amz-Signature=51c9540117d61ce6b5ec2342a4b544a2e4d129387543ed791841d8487d9beedb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5QK3SWP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIEsGygQ9%2BLTBAIMij1JRauqonjvuEJNNBSMzRIzt4ZONAiEAjz1U0DCr0XgJCPMIz5X%2FwnIADYzofZLY2XAz43GCXSgq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFOrzmUT6WNAq0e5QCrcA8D2F9LVEoEJY28i%2FOGx8WQLQu%2FMyj6mjvzO84yaiZ1HSMBAWkWmK%2FvpztWdfuibX9ib1PycfTK2FJdEMRjEG7NarzJNUx8C%2BgzdgbNnzy1BVVLZMUHzp9kHkNP6u%2F420bhFYpCNciwyEX8cabu%2F%2FHVsutcPyhneX7kZImbkI85uIV2UEH4Y2lNJzuoXDf4tpTYcR5eA4vSFzE%2FAfeytX1Zg80G0wtm5hYjdDWs2dfuhbPTdTgbovUzruGlmjbej3H315n8D%2FsmvKGGngS6qfDUDuPUg5l6I5PBAVPkuHHFRnlruwOu5RqpHN8Owb7iN2w9fwAjwicE%2B%2FaSW4SMIBZV3BfxKaEXOZokl6O9G%2BNTzCUSUJ00%2F8NCS9L9TvXc9zV3ACpnyOOSm8T7qAB3K7pfQaOzfKUim24K7QF6MAQOT4GyleVH12PwGctJZwIbuiTikJH10yGpmEUBZV3Snr5hDdJGdQQIsT8l7%2F0fVdHXp%2Bxn5qWe7FnejaKv6qStDo7aYhg5wK8ZO5275WgZ2cjJp6m4xiLL7CG4B2RMyOE5ebz741sBnsLhdmC6NB80A9zgh1TZOJXvzm4B35v6SLhW4OTzcyeNylL%2BEdZ1Mw9v6RbtQKr10oQ07mYMsMNOO68oGOqUBSQfdN%2BxpOK3KfO%2Bfqn5yTRLsHFEnoX9rxoUBNmE6qEjLzEDuGnizaH1kDtYGATulv4UszM%2FpItP7pBMzW0%2BjljjmfxDFDBceNpeRjzdCHtzpHZZ2oO%2BrmbKr%2BhCqN9CoLSm%2FqZ5hJLfCKXsQmXRzfWEIsdFv7Mij4ddVs09AosRaVrIIxO6o59J28jzZouhkivv8w3d8EuhQO9KHl%2FIwgryum6Oq&X-Amz-Signature=dd73db9183a57becf6bf02bd5be8f11074c67712032686694bb856d8f79af581&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3YROSZH%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQC9xY9yYrT64PHpOKNIFduM82egCMYZKclGAJDPh3bUhwIgZZzOxcGw%2BcF%2FAuzbjfZvkXb%2FnkxNO8BswfVPNPtz%2BU0q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDB8nYGLamdDvTCDJIyrcAxKJsS1nFTUEbUYGfgvcjxpkxHbw1PfcWl7okjxW7icHfnUEBTlV6I3zLpXs8NHXMiiFwI298OhGRZRpnJwVwj7jA%2FEUVu%2BRXIOusPKuufaBC4waANJd1Mejin9r2j0foQU4IY1mKkIgZabx9ooxY897vlmO9P2StMCO%2BW4F1yB6NML9aB3mh9RsW6E2PTZNkabq8X3JdcC6RsjOUKqk5YnoRseTaYSHn7s112qNZtDcambNjWkLkrfNIJPic3WA7QgKPAYzGBckFg0cC1moBcUXKasefEXMjkjeI%2BVwegaHyubhyD98eMR%2B8h8TxG9X3EEejI2o%2BT%2FyWmI5uh6pWM7cAd1Ph2m%2BDTCkTjgKzGpxG%2Bwcc93NYYpyyTR%2BwLxJml6oUnpqImHNeey6MRw72aURG2Clr7pCTNkotduHYzdpIwVSOscVWzgibUQuWmDZPsNbrjY1v%2Fbqj5g8pJvL97A8YfhgqVGtM%2BpKlJtFgJkWWTZ3TZDbrnFDcdyY2db%2B9PWnwh%2FZoFE4RjHkMVYEh4Sev6nTWo5yxqr61trmZRzklOSN5qyI%2B8ZABXbJqw0g9vNMVH3MwOeW7Qc1oi0RwljfOtv3ZCHE65V%2F3AuwPelv3jvkpB2S7Ic3qJK2MJeS68oGOqUBdPdRaGVOipjuGp2OOpuE1EdTM3liE2SlNHyw7IqqiXghtrek%2FrYqaDedX%2Bv1s%2B9LL3JY2vey5LdNYcCYkk6hZPJBVTKgyW5CNzT8GZT38k%2FOsI8ufHtpPYhdn9KEBL9O%2F%2BvIfOtTh6jPd8L4FOcm21idTHIgtwqeOMbh5yW1wnjMx5aFrkgdpjVr7BQw8cIBkOF45WXLcrI6ZtSZFN3kTCOLVXIl&X-Amz-Signature=67a2d5cfc1ba3aefae0f671a42478ef7455b2b33e404a75deb33a835b39d9287&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZPHRUZP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCICdDBA7Va8sFLOHOehJ6aIUEuQRihttMF%2BjlDY2t74SYAiEAhEOjuXlt%2FL%2FlEFobnBqBumxzjwCXauB7ls3J08kPokEq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDCSmQ0hc2q8g90EQTSrcA7O7vdIWuH%2Bh8zex5CpVagGYidzUgQfLmW%2Bj9mrIQLfXgpFqZiNAiHE0mOg%2FXmLMGRvbqAbKRJ6xENCSsRBetNM49XpDweiYVxiqsaH8ud0a4jqZ5tppR3tuv4MU5Wsy56jn6kp3IINONJuzo48odxMVZMS3HWmNTH%2FzLVYdvqVlzslI0sE5v1C9SWN1nQqur6UO1eUNI12xbRLq0cqj%2BuYbnCEeVRGQBGCl5jCGvrx%2FTTXBy1Tm3ipXDpCnqOc%2FifbbDsXNuaFDbj4zxKCzMHYY%2FodprLtg4tzIOfTnlGnIy1LLtMXGpuiGPZIkdb00KZD%2Fp2nbcHCuPWUh%2B%2BH6s19KAgOIt3Gc%2F8UFtOOe5N4RhoF5TRhaDZmpSCBCIqXUzPtGlAIg42hitU9CWuqiWVvxmrMGwB%2BViti8YsCCsLa9fSRCTO2AqV6T5OJniTXOpKsAk2bOKTiNetYnpbjkXjrx2K9pDNRP%2FlgiG7XTIy%2BSr6PogyddU7fIxiQkv41smCUw3IEsvGb86ErNTU%2FrnmnmuvkKfBXQgZrF%2FKwuytD7mVgUF7UdrBXDwtf8EobmHF0Zx06FxysuJBONFVWBpAL9yXigSfbqPjhDeK%2FRK1mQXvss0WQl2EWUw1tRMKiJ68oGOqUBMGn5hJXyQw23hkLxFj4%2FzbEqdwkr92xYVtvkL7SkL6qrhd4S7hhTpbdOmOWkxqPNzW2VfWm51Hs9wuI35q6WSuaeodj5yod9%2FUOU0xNZdTAEe0puvVut6a2eiAj4jT%2BiMKM6QBcjsysYnhoU0XfvApcVLFAUUb8E0FynNXGmTAmGJKb3S4Eo%2FWPqH4ZHh5iLGtIs%2BShQCuJ%2FA10F6sbHz4D%2B7hhV&X-Amz-Signature=bc58efcdf6e066357227bf97285e7aaaa3b869662e952ca0b4d4c470e4bdd4b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M3EVPPC%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCa1NNO8SSpubhHvcS6RlhchoHK1pkPr8%2B8WBP5nIVFuwIgUYThcJI6EbGRU%2Feg417dtFEjf8Lv0dggbqLfdQWbRmYq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDGE7%2FZin1%2F39ymKveyrcA0%2FAYdMy1UmwcFUfXXil%2B3fvVVgZMY0VVnvVLlzZCoKSLKOQBptLeaFzlmAR%2FlBtbxN6l%2BTRjUHy24q0%2BNTE02nk8EWJ%2Bu5hKJ0cXdN5ZSdSwtNl%2BgZdDv1pghyImM92ozgEjif09CzIiIe2TYWlTG4TnfjrGc0IT3NVyNnT7ugBZCG5NquM9OMdpyKSQ6aq%2FfNQctiuOwp1mGk3uis6XF%2BemIVLbqaJoLa1YIVKxZjRzcMTf8DrcyzF4M9ocv%2FVxQU2WFMP3U63MN1LKmatrTWZ8YfzQRjEc49CiEY%2F6Z7yjpvkg9Bx5Mx2otvtURfG4eO5pTS0C%2BMqcsCBt%2FDZEYaWVvQ0%2BVF97FRgmI8Db8xxdMp%2BCUYlHyx%2FOHUXLb5nPwof6AC7nC1Iewl%2F67R0HzhoWenKEyl4DOKhZDI4KUoXNMLPfPwdnR5chDP%2Bz9dg5G0vNY9FtwUlqSZcgiKXr42O4Wr8W8Z%2F3RzlbQL6kpEoR1AwABtEXowwzT6MHTiGJB8CrtJhkQLWd0LQjaEvYAqOtFsxoPmqIgEDznMUZxjpCUnIEckCOnqlZ6aINpjvT408RvzCt6%2F0O73YjbBR7A%2FZ308SD3tEb4RMFlIZV5VgRv8F4J32RfHiL2m8MJiT68oGOqUB7xYrRowUqrKxs2fv6Pwl8uto%2FGhbiwIv2xC%2F18hh11oIcGQByyITj6rVkGJ0lXmFVjnJEgZ90vhVoOzcncELvpQDDZUJh4uvBqYaYM83LeJg7RR3atzZDl6Wg0gbP6zL4CouhxgQsDnyvsfEVnyaykR5Osf%2Br5JVCw%2F%2FtUNHMBt82STTPjftXBznmNp9xEIB28Y8ied7lg30BabkBa3CkP38WWm8&X-Amz-Signature=6b1c2416ddcf3c43e81666f5075124daac9e367073eb1b7b0538bee4de7190c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M3EVPPC%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCa1NNO8SSpubhHvcS6RlhchoHK1pkPr8%2B8WBP5nIVFuwIgUYThcJI6EbGRU%2Feg417dtFEjf8Lv0dggbqLfdQWbRmYq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDGE7%2FZin1%2F39ymKveyrcA0%2FAYdMy1UmwcFUfXXil%2B3fvVVgZMY0VVnvVLlzZCoKSLKOQBptLeaFzlmAR%2FlBtbxN6l%2BTRjUHy24q0%2BNTE02nk8EWJ%2Bu5hKJ0cXdN5ZSdSwtNl%2BgZdDv1pghyImM92ozgEjif09CzIiIe2TYWlTG4TnfjrGc0IT3NVyNnT7ugBZCG5NquM9OMdpyKSQ6aq%2FfNQctiuOwp1mGk3uis6XF%2BemIVLbqaJoLa1YIVKxZjRzcMTf8DrcyzF4M9ocv%2FVxQU2WFMP3U63MN1LKmatrTWZ8YfzQRjEc49CiEY%2F6Z7yjpvkg9Bx5Mx2otvtURfG4eO5pTS0C%2BMqcsCBt%2FDZEYaWVvQ0%2BVF97FRgmI8Db8xxdMp%2BCUYlHyx%2FOHUXLb5nPwof6AC7nC1Iewl%2F67R0HzhoWenKEyl4DOKhZDI4KUoXNMLPfPwdnR5chDP%2Bz9dg5G0vNY9FtwUlqSZcgiKXr42O4Wr8W8Z%2F3RzlbQL6kpEoR1AwABtEXowwzT6MHTiGJB8CrtJhkQLWd0LQjaEvYAqOtFsxoPmqIgEDznMUZxjpCUnIEckCOnqlZ6aINpjvT408RvzCt6%2F0O73YjbBR7A%2FZ308SD3tEb4RMFlIZV5VgRv8F4J32RfHiL2m8MJiT68oGOqUB7xYrRowUqrKxs2fv6Pwl8uto%2FGhbiwIv2xC%2F18hh11oIcGQByyITj6rVkGJ0lXmFVjnJEgZ90vhVoOzcncELvpQDDZUJh4uvBqYaYM83LeJg7RR3atzZDl6Wg0gbP6zL4CouhxgQsDnyvsfEVnyaykR5Osf%2Br5JVCw%2F%2FtUNHMBt82STTPjftXBznmNp9xEIB28Y8ied7lg30BabkBa3CkP38WWm8&X-Amz-Signature=eec6cd6bddae948053b69e6a5755f1995a69b7f02771471f29412103485b510e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG22MK3W%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQDZLHFhUZUp0w7gg46T%2BU6vbFpEfOSUc2gnDXFmE%2BFtYwIhAOWbYbHw46DY2HO9Ju1ABM%2BwxC3uw80T%2BGnAZ0bs%2BvUFKv8DCDQQABoMNjM3NDIzMTgzODA1Igy2HRKTdZi0L7bP9bwq3APdl1msyZxHtpNgxcXAZqk3njbNN3ow8m2TPzVb2wfRfy988peRib1QvmihlwgibmJIb0ec%2BUCDeUwZFE5%2Fxs6DOvFqbq%2FZoy9aMJ2hWQQsGHq5UGolyce%2BChuv2hh6t97u9J492Wcq6fkaITpovSxO9JqFnfSiyCRpZB06egq5dFjbx9CZ9i8v%2F7AwlWbTPEEVb86BfZvdKF5zy31mrD5EHhB0UHwTIE46aHksokZnRJjwq30ERJKm1evbX9yJ%2F9GpKCnCd5ZVS5XPKJJbzo%2FmugquQ%2FbsNd3OWWOJyewPXsajQAx1JEmcTtohppK%2BO1g19rW6kgBfyS0L7Hhvlb6CBX9XerKINQ7%2F5r6NnFBpy%2F2yu3MPH%2FUI6bf%2BN%2BMe%2FiQFj0q8w%2BL08DX%2BXfQ9Tmt7%2BNEd56YqfjIG2bPd4DaoWdzIlRnGwQywRWcfqlOZX63Fo6ZjmQlUh%2FaKAU%2FJCDY6%2B6FxTEonrrEkMY7V3jj3Yi%2F032sb18NEIt1lcSRSpGqVDA%2F%2FPGcwvOsfojDsjbawxsLiB1KDQfJgUWpjp5oXOzI%2Bz3t6Xlt%2FN1vBk3bv23ybFOzZZkrFXH%2BnSqOvYF5RRRbxphmGmxuzJv1eqwNPunYhTNkhcM%2BHMji7xTD27erKBjqkAaMi62Q%2BQxLKPt6GW0KxxaCRpHF2bZ%2FT%2BVGE5A3xm0C2JcCD6qmRTdhrq1Or9W2Pdgxd0snhHbS3QFGeCGEYLTL1NVyIjRMd3UkCL%2BarGH8XbXCeL%2FHhM6hVoPENqj32De2EHH%2FzKPFFQYs%2FtC95eX8NGRVbCgHK3tgOUs09AYWBwVvSa6yhkVxFbzDmRDtigcaWRfQKdUmEVVAqTy6k72qtlRir&X-Amz-Signature=8cd6014c477e9e7ebaa47918150306b9f9344beeee2856490cbf3cc34d3264b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UTXD3EW%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCULkWeKgFHXTizUQpQQU9aWwJLqE4lWnCIwKPa1i5LYQIhAOValCBlWpCP9BKHhN8wztz9YN14njL4tRsACGuBVIgMKv8DCDUQABoMNjM3NDIzMTgzODA1IgxT739loxray6IUqMIq3APwN6fLRWOXcpnIJjkuqc0WKipImFthebQQSlxRRLzyrTMHZdG0wT0PZbkpYCdpK6FdgnZz60WjGPvAp%2FITerByx01S7BQ8l9Z5gnIMKbSR50QLruDLHiWkaDoMfkohaoDyUD3w3ICZ75i4RWb3cfwki%2Ba07Do%2BZezLcIsQBxughds%2F8Ksk6Ie3L5hm6hBkbmSxq3WxcP1BykKO2bryXZSkY3e5YMSTsU%2B44QxREWdqqce5cwGBOfaInQ6wJfHzqRZGAlxcgwUMrBKEACp8k8br4SCvVnuTwNYs0uFTQU3F8PkfxRka%2Fi2%2FaUkQZZlIEstGA%2FsS133Lu%2B4IbiA%2F7Kr%2BTHuOKouDhLvlXO1qyFtPVNvKvW9dxwJcqtaY8HfSzcP4U6UEr0MRB71baKy9KSBZjc8Pi3oGhFYCvKiGeijqyK2FV%2F3hWm02ItggMCGLToum5B4sC41N9UpLjDZAyiBgcWcUsvgrsTGq3KHyxb8tZl9YLPLhqIUOX7uFuHRLSBjLrsJcbKeH%2FPeizOLfxGvcbTCEoIQ0pbnlMVRkbE2yI%2Fc3Pocjmrp9eOfA8WIAczlSi3JcJnGAOyU9qiO%2BrpXTySs40ccAdSWJ0jYHlpJuGY1ft8cTRtY5FANuJjDUhuvKBjqkAcF8EiDL%2Fy6SZ2i1ecSQpFY%2FFArP5N6xkBBeDocv9o177IGXypQQ6xPpFFEt8GOGxaVocX64c%2FWrlDxz9Xe3La6XNbur82RV5YsFjNUiRP7NeP%2Fq3eEnKLoUGPq9ys0lTI6oxJUlFo82FV7B%2F%2BVUyrYYXHuAbSLdsAZNJ%2FEuC18J0%2B0%2Fd80EOmy6l2ncRxb%2FDXRiRWLv8dA1SuN%2FvicgGpDeerKO&X-Amz-Signature=b15b0160a50978789ec889e1cbc671a2d3e63a91c0e6650d8ad6ac232de69f11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UTXD3EW%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCULkWeKgFHXTizUQpQQU9aWwJLqE4lWnCIwKPa1i5LYQIhAOValCBlWpCP9BKHhN8wztz9YN14njL4tRsACGuBVIgMKv8DCDUQABoMNjM3NDIzMTgzODA1IgxT739loxray6IUqMIq3APwN6fLRWOXcpnIJjkuqc0WKipImFthebQQSlxRRLzyrTMHZdG0wT0PZbkpYCdpK6FdgnZz60WjGPvAp%2FITerByx01S7BQ8l9Z5gnIMKbSR50QLruDLHiWkaDoMfkohaoDyUD3w3ICZ75i4RWb3cfwki%2Ba07Do%2BZezLcIsQBxughds%2F8Ksk6Ie3L5hm6hBkbmSxq3WxcP1BykKO2bryXZSkY3e5YMSTsU%2B44QxREWdqqce5cwGBOfaInQ6wJfHzqRZGAlxcgwUMrBKEACp8k8br4SCvVnuTwNYs0uFTQU3F8PkfxRka%2Fi2%2FaUkQZZlIEstGA%2FsS133Lu%2B4IbiA%2F7Kr%2BTHuOKouDhLvlXO1qyFtPVNvKvW9dxwJcqtaY8HfSzcP4U6UEr0MRB71baKy9KSBZjc8Pi3oGhFYCvKiGeijqyK2FV%2F3hWm02ItggMCGLToum5B4sC41N9UpLjDZAyiBgcWcUsvgrsTGq3KHyxb8tZl9YLPLhqIUOX7uFuHRLSBjLrsJcbKeH%2FPeizOLfxGvcbTCEoIQ0pbnlMVRkbE2yI%2Fc3Pocjmrp9eOfA8WIAczlSi3JcJnGAOyU9qiO%2BrpXTySs40ccAdSWJ0jYHlpJuGY1ft8cTRtY5FANuJjDUhuvKBjqkAcF8EiDL%2Fy6SZ2i1ecSQpFY%2FFArP5N6xkBBeDocv9o177IGXypQQ6xPpFFEt8GOGxaVocX64c%2FWrlDxz9Xe3La6XNbur82RV5YsFjNUiRP7NeP%2Fq3eEnKLoUGPq9ys0lTI6oxJUlFo82FV7B%2F%2BVUyrYYXHuAbSLdsAZNJ%2FEuC18J0%2B0%2Fd80EOmy6l2ncRxb%2FDXRiRWLv8dA1SuN%2FvicgGpDeerKO&X-Amz-Signature=b15b0160a50978789ec889e1cbc671a2d3e63a91c0e6650d8ad6ac232de69f11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UB2N2OG3%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T210121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCsyG3oaic%2BgoZOiAh375dhBt7Uaf43DnPI8%2BE1eJchtwIhAOPN6CXxGwftWF7j01JcbwXe9aoytzUUt7RrznUj1RkrKv8DCDYQABoMNjM3NDIzMTgzODA1Igw0MLIRxhoQAikv5mQq3ANDBVamDeKrZawu8WIuYiDe0E9kVXKIUXPXe4S2m3aMM6L%2Feu6RMUKQQy%2Fwlk1DLwGahG0tOVILjQ%2BAttr8%2Fufi1Bbmtat5%2BFUxuYuKw2nJEtuJH8NFpIbtW%2FKYFy%2Bqls9IL0Z7bYeLWH7nLLurA2zQ%2FvM3ggt%2BW%2FoTUAh3xPyi9OZEd%2FZ8AAY7VX5JUNrqu%2F%2BXvvk%2FxrlghUef9ZRFmFlDNwjcjPZ2ds00tLVthcsfkh0oSo7lhNz4Jk38T%2BqyZWHPEC0tnJ4OU8V2OVZgglUD6S94uLgCq7sUTuwxDALJKlOYXicZQ3Dk0poFfFbZONp90OdwpegrRGxzYmwIwBn6fCpt5d%2BvHYOXelrneApA48npHgi6BEl7nIzsVl3xYf2UoBIFiwUPqG%2BQIaYw9l6JRHmZc6IQHWre7HUJO9k0LFcb09LbGTB7gW5T3m%2F1wJhJX6kg7BGatON0Cje61Qlii5ocTvgxqfX3Z%2FZiCMcQZP%2B1tLGUPEvhWVD6YEH6EKKM8j4Kn1Mq0F42mdWfO5A0OHBeTPI2GXT5HUzi2qHRH1FcJZ8wMYCcoGSkMMPssQxDhCJ0gngoiNIknkPZN8ELhtpSRx9RQ9sEPF8g0UeNsklfgus63C0MASNMIzCvmOvKBjqkAYrnkXlZfphIlMOTClLZ1lifb3V9GsqtM6MW7jlSQOgcAmwEK8em2x6Esg0UIwhSp5R1rGHg9n06k0Pd%2BZ67a8PWWtklufDi5BwL1tVNW7Hx%2BFp3LLeHK9DKv%2BG2eENF1926kmypQugYaELRDg%2F0yxMQKGEzqvFTuANhL3i%2FNUVqtHGhGxPidnfGhe%2B4vVkKVOMHLEsfJbM4ZwpQFjVwzZHXpUWf&X-Amz-Signature=58dc3a1b5b6d9fc5beb237bdce0bd5a87f5cda1d9efd002488e7064c63ac603f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

