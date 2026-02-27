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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCJUCJHW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQC3xCw6pXda%2BHWWLrMH2VTWtXsWAnjp%2BiSrsZllbTFlcQIgUHxugby%2FYBPHRRCKKi0MD2ptFSsmS1VnihNS1WKKuHYq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDIe%2FHFklcf%2BJspT6GCrcAwx8u%2BN6k95mnAhII87ao0qXOjyhmJiQE5SbYb04iLXAgHKfyf6eLpljEVKCcBoDUKtyjvNGQ9Zw%2BdgXddWDjIzS0KmUysrccmZrQgIfkmvR5t%2BFgtPEcZa3D5BxYJadYdGwwRKov8NUXTPw8ZWWGNhah%2FHsjiYaJul2CzpQTseWSKYPJ4ThQVxOeuXnK%2Fne7P5eTwwSOH48IZyPEss9OOgLecp0EL3%2FJ2CNPTO8c8lQWnWm%2Bb7NAC9HWvfVCss41en2dUdNx0dEZcOGKp9VmYvDUYV6ZcLwaA5oo%2FhPJcNPUsUHX4BfTXoAQuHz%2FxR2NF2jp32aEcuffjfqGFlWisOJGH5TErA63Shxui6zqEMeDsBTz69rE0VRQug3oWpdNWswuU0h408gCXYycHtYFxKvWFiXcuJ8oh%2BfB64xAH3Pyq%2FofEpZxgC%2BDZHL9X5a5CdYk9QQU2J%2FMmOReoDQydcc3eaoMr07wPT%2B%2Bdj10XrxSJRkLjG0G2np7Jj43iMX%2BeeJUpz0ncpiE71YYSUN6DvL3jVM8befOeRhKHR4QqX2ehpcH4wfAMNrcu6ZEcQqAt76GPO5pmzjIxJWZCE5B9%2BMxuCAQhH0gX92Ba5%2FemMVolOvu0wFaiq2Cu6bMJaChc0GOqUBpTOVSGrDJxvzpSJEORIrXRwUb6odsbJBFTAle1aKSZIwKKTscN%2FAyZIC1bRRO6tPl%2B5FTkmTKOeFXSRXY4TaZnTBAdjWJYKdb6yL%2FIL%2BGnH%2F6UkDg3Y1IHTLAhW7mU%2FbW7VmGJA87nGd4NIBq%2BwkAW0tfzhCKk5SEFmUwJolKwxdWlztmnEPIwtnuRPAJyx2GRmwhuoImrH%2BGBrFptnMK0WKxISG&X-Amz-Signature=cb6a952e57a924b2022c1e0ccb87e377b32ee8bf5e5b9a8724c17e578a5bafaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCJUCJHW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQC3xCw6pXda%2BHWWLrMH2VTWtXsWAnjp%2BiSrsZllbTFlcQIgUHxugby%2FYBPHRRCKKi0MD2ptFSsmS1VnihNS1WKKuHYq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDIe%2FHFklcf%2BJspT6GCrcAwx8u%2BN6k95mnAhII87ao0qXOjyhmJiQE5SbYb04iLXAgHKfyf6eLpljEVKCcBoDUKtyjvNGQ9Zw%2BdgXddWDjIzS0KmUysrccmZrQgIfkmvR5t%2BFgtPEcZa3D5BxYJadYdGwwRKov8NUXTPw8ZWWGNhah%2FHsjiYaJul2CzpQTseWSKYPJ4ThQVxOeuXnK%2Fne7P5eTwwSOH48IZyPEss9OOgLecp0EL3%2FJ2CNPTO8c8lQWnWm%2Bb7NAC9HWvfVCss41en2dUdNx0dEZcOGKp9VmYvDUYV6ZcLwaA5oo%2FhPJcNPUsUHX4BfTXoAQuHz%2FxR2NF2jp32aEcuffjfqGFlWisOJGH5TErA63Shxui6zqEMeDsBTz69rE0VRQug3oWpdNWswuU0h408gCXYycHtYFxKvWFiXcuJ8oh%2BfB64xAH3Pyq%2FofEpZxgC%2BDZHL9X5a5CdYk9QQU2J%2FMmOReoDQydcc3eaoMr07wPT%2B%2Bdj10XrxSJRkLjG0G2np7Jj43iMX%2BeeJUpz0ncpiE71YYSUN6DvL3jVM8befOeRhKHR4QqX2ehpcH4wfAMNrcu6ZEcQqAt76GPO5pmzjIxJWZCE5B9%2BMxuCAQhH0gX92Ba5%2FemMVolOvu0wFaiq2Cu6bMJaChc0GOqUBpTOVSGrDJxvzpSJEORIrXRwUb6odsbJBFTAle1aKSZIwKKTscN%2FAyZIC1bRRO6tPl%2B5FTkmTKOeFXSRXY4TaZnTBAdjWJYKdb6yL%2FIL%2BGnH%2F6UkDg3Y1IHTLAhW7mU%2FbW7VmGJA87nGd4NIBq%2BwkAW0tfzhCKk5SEFmUwJolKwxdWlztmnEPIwtnuRPAJyx2GRmwhuoImrH%2BGBrFptnMK0WKxISG&X-Amz-Signature=cb6a952e57a924b2022c1e0ccb87e377b32ee8bf5e5b9a8724c17e578a5bafaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSL6UBP5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIFOAMBwrcoqWgr%2FQHlAtCDoWgLwc2txZIbhGTzjNXLlFAiAduKb%2Feu1DSq34JofzibnD9U4CSdWhhcFikAh3CyRe2Sr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMmAJJ2Mlajn2hBg%2FoKtwD6rruQC%2BOiTLlYElWo6s6qr4vuarVTthAVF5WijppsUroIypecFvqzx92MjNRe%2B3ooDnuOtzDB1Ez6J8xOJfcnH2vimT%2BCIlpaZrGKrWwwBcb2fNLnd2M%2BqSLuHc0fE9PiJwNugCACwOMPq2q5cweVP%2FpG%2FO1exPlOh0WP6JMwDTPXryTsX8rK2I7%2BSNMx%2FWFYVxuo%2BS9AD%2F4oHuk%2BWbCaqTuza%2F2vgyUZAkn4QjY%2B4MetO%2FEkhf35Tw2yEP8R65RfworLQw%2FDCGoZ7jCz%2Fs5Ve3jhewwixTyy98dMx4Br5E%2FPtmqMMosRaw6zJmmNpwd4ur%2BRWuizPdBXPc4P4YcukUq637t%2BAYtIm12CMblZiy4jy4ZQhZWLRpwEwgd8oh5LyqcP0d%2FTKvykqjP%2BdtiTsZAaceIcTjoOJMLxsz4d7SV2Qts6BEwxVy2%2BSSh6xEGgfpO1hxl3zEc%2B%2BMrD4Rz7TUGFHNc2C7LHGeRiVcNpalbej550h2FjBUCquSqsFgpRprvXTrQgAKVHeugBPkICb4iceACl%2FenlXdHUWh5DbgNDGMoQRzAnhfUQjt0sPyUbs%2BOKIRIVyw79sog6bUJq2S78B6kf%2BRB4gzwhQ6jTSEq8DkgWMUvqHKlGiIwyIGFzQY6pgGmaPmQwCP3%2B07BkOY5rzAM7Pq2vTimU%2BW9VhXybQlCSbY6knX2aaot08Es%2Fvz9JQOxeQO8PE%2BWSpz1vpuoGK70FP2pf1%2Fs7aQU0iLtOu7MD7BsSGJD2uR0i3H%2F4SO4l1M8x8C236e5V0Q7FFg%2BffifhuflqoFDXYFn5UtGhkJDIKrwvuADp3AoYxLKsL6JQLKmiBpj7oKRQtxGvirIE2z0YV1g1Zil&X-Amz-Signature=32c847c948c4f79465c45d59deadfa68450121b7fd67d43d444abb1767071090&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ITFVUEW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQDj3P6Jck3A4jZKsL8mX18sdN%2BvG4TpdbJjMe0PgqGhRwIgDZsAB0s2XjqZaaHaaaqvuuy9Iosyc%2BoSBLKJDE4BdNUq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDDwLknAHfM7nbtekPircA6bXP5bOhSdmE2Dqz%2FBCuqZab9PHn4FYnVh4XtiIWwm2kQQyXyfJl%2BOpiJM6nJ9TRI2J4c9%2FPQ6acPXY%2BY5Uj0vesti2aa2w%2BpDd9AZnrjjyXUSHAW6es7kA8BthBqI8qVPMl4c7vs61%2BGLPYmR%2F7SxdrNP%2FfoVkucx0mKCFrrNb4J0uYij1ctImgVF6wJx7O01W9RYCAU%2FosvghXXdVYEiOoIDa5oRB0%2Bw%2BFbedN48LxAiSmxKu%2Fzqws6559KEmS8UEGmqxnhEq1aEnUAoF1K0ICZ5%2FeIBnB1NqPqeRBAcRa7sn6%2FjPNicLtzC5LYep3ZKcRkbGaprIaErubSZSPWbJ0GiQe8kkg3o8aAOYnqYXROli5BZLQ5jGdBmMrG0SjMcVhQ1yP3YNF9wB9H7QipUy9XVO8q3BM3t4RoeQK1ku%2F%2FFj%2Bfj0826SUQXYVLro7JYhFBDFdXgaRRfZvIvttGIwjPN%2Fe9Z5Bzz2AulGmAbdAhuzTQstSHzATmKLKSF4uqys2O0%2FidM%2BUBdugjbTmhKJu44af%2B2njLoff2gdpMBaPT1DkBgXaqu6hwT66aBwoJ4RuGbcFdWYqLMOLOAmJX4DA04R%2BRhMGB746k5cpRSR4UOaDx2lLI2%2FaaZWMMOBhc0GOqUBIhtNJfK4UjsyYN0nALJba%2FgcFqFKWAu%2F0abZDM1dG5mixIw%2BApfASVvbcD3H1Q8npe%2FXTUr%2F0pkqYxgNPvQAGdeBRGTidVD18GdMYxSCfz%2B4Vuyyc0jwLUrOsFzYg8r0dgQozP%2BxSGeAHPO7rQVU%2BVfrNECK9sblVEkYqVyuUJVNHfq0c4nFbwBeuFNPedsEva%2FjZOjtXwlgjXCaKtVEzL8B8OUV&X-Amz-Signature=d2fad77371d2810ed854032e9ebc03cf472fdec48c26dfd294a37c13276eccdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ITFVUEW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQDj3P6Jck3A4jZKsL8mX18sdN%2BvG4TpdbJjMe0PgqGhRwIgDZsAB0s2XjqZaaHaaaqvuuy9Iosyc%2BoSBLKJDE4BdNUq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDDwLknAHfM7nbtekPircA6bXP5bOhSdmE2Dqz%2FBCuqZab9PHn4FYnVh4XtiIWwm2kQQyXyfJl%2BOpiJM6nJ9TRI2J4c9%2FPQ6acPXY%2BY5Uj0vesti2aa2w%2BpDd9AZnrjjyXUSHAW6es7kA8BthBqI8qVPMl4c7vs61%2BGLPYmR%2F7SxdrNP%2FfoVkucx0mKCFrrNb4J0uYij1ctImgVF6wJx7O01W9RYCAU%2FosvghXXdVYEiOoIDa5oRB0%2Bw%2BFbedN48LxAiSmxKu%2Fzqws6559KEmS8UEGmqxnhEq1aEnUAoF1K0ICZ5%2FeIBnB1NqPqeRBAcRa7sn6%2FjPNicLtzC5LYep3ZKcRkbGaprIaErubSZSPWbJ0GiQe8kkg3o8aAOYnqYXROli5BZLQ5jGdBmMrG0SjMcVhQ1yP3YNF9wB9H7QipUy9XVO8q3BM3t4RoeQK1ku%2F%2FFj%2Bfj0826SUQXYVLro7JYhFBDFdXgaRRfZvIvttGIwjPN%2Fe9Z5Bzz2AulGmAbdAhuzTQstSHzATmKLKSF4uqys2O0%2FidM%2BUBdugjbTmhKJu44af%2B2njLoff2gdpMBaPT1DkBgXaqu6hwT66aBwoJ4RuGbcFdWYqLMOLOAmJX4DA04R%2BRhMGB746k5cpRSR4UOaDx2lLI2%2FaaZWMMOBhc0GOqUBIhtNJfK4UjsyYN0nALJba%2FgcFqFKWAu%2F0abZDM1dG5mixIw%2BApfASVvbcD3H1Q8npe%2FXTUr%2F0pkqYxgNPvQAGdeBRGTidVD18GdMYxSCfz%2B4Vuyyc0jwLUrOsFzYg8r0dgQozP%2BxSGeAHPO7rQVU%2BVfrNECK9sblVEkYqVyuUJVNHfq0c4nFbwBeuFNPedsEva%2FjZOjtXwlgjXCaKtVEzL8B8OUV&X-Amz-Signature=3337b55a8b4483ea6c9da08f415e46f277eac080184acb1998fe41ba3a2433cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SODHZSJV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQD7DVtjAf4Xog62urMaUeO7aLVgyn5WoHn%2F1U6eYTkWIQIgLFxOzPjVRvPhOeNXVtF4vImMnx3Av2JlQAFbvGeJAiAq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDGAp6WoQLP6OcShSLCrcA1UYueaeP1s6Yda2myi6yBSsUuKlz%2B7EhOcW4hBZ4mtGp7TuyJFAaE5xdOPpYYC1PoqzwvKTClLpILIZZ%2BCbbyJWtKopOsxnFgboaceW%2BXs4RwSmu1yep5ZqRq4Rw%2FAULF%2FOOiFbgnhbM4WtwU1tlsSPotfEoGHd%2BBKNYqO3pH3ZdA7FqRrs8vGJsVmpifHY1gLAd9X1MMtIx2z1XTgNOjDPA1%2BJyKy8x0%2FTM6JAIn2rFmWSSivzNnZ8kYI92zf0KmmnU4YjRCGFRP4psvtsq%2B42ehbLJmt7ntgfn4U9VOqo9lnIUXPRXK4nybwj4Qht4end7fNXqjobdegpOkWwU3tNj1ocX3k8SW0%2BwsVFKPfhkmV%2FqeXNDsq1GdmcyHyMuFi8SDxkxBvsvNxWstHs1rC%2BSemeqFSsIlQSXNUA%2FSY37fa5QXsL5g4dMGd0tBy4YEn0Ny35KFTOCu1DLZ2ryT0ozpVNL6lscH3b3HDoeWFobEGWYsr6K%2FKJJv1WbOja0Vk7BT43YFsQjqRiUDrUNIOzYg3xrNiMEz3QdBg5ZA7mKV1k%2FxqutGY%2BLrArQwuJm%2F7w30%2BQazDU9I7R3kqPialAyZx%2BZRCGjve%2FLaUuRtBFewQoa4g5EMF4Mr2ZMIWBhc0GOqUBzCTlrmcTaj5opM4cTdsK40telQIqwiKTdKR4maGm1RhYzC%2Fy4bw7%2F9WSOpKl6lExtT97BWdvJ91Wi5lPFi3Mlk0NcMeVsKiMgWUJRRO2SmWzeZvG9LEtpbe%2FPMb0NoIjQl5gDIx6EZEhVd3r7RUxAvrshhKUq360zWjoARg2vJgRdnS41GjjNLhD0BJuZ3%2Fu8KcOkQtHxrAEWQSfQbcFmycbbrIC&X-Amz-Signature=3b230fe4ed8ef52222224e0e8cdc67f53e80283cd7e15eb6d647e557e72179af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQRK7GU4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQDR9QxiDfIHxgjxZ4zSPrkzkvm3TTDrWdHVWBNbyVMt2AIgNaelR7WL6wZFttBbOG%2FkLClHXITkEqp%2BmlNrCZhhw%2F4q%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDHt41SpELx4JmPziWSrcA%2FR8geFhbCts8yvZd9vHLKVLKN%2BRhrzJ8Il%2FeD%2BHmcROcU4NBbJ%2FK7MgdAFPmBvsXtX7VZi%2FvkeUDOsika5KCXBE7H2DqF4LHa4cb1wdVugetW8WGnVd%2Fm6irt5pSfGGHmA9QzBT6aqLoqN%2BkELDF8b5dURieBIvMN8oQfX%2B2LORvtD9Q9xL8AIz7Oo2Bd2NwDEvbKjwjhw2wOkS8Dbrk5FyVKgL4dotCTscrzB%2FJXcjwYqMu7AaFe2HvxnRhqm9uiPi%2BU5rGjoGQZLynG%2BA4q3xuOR2vUSEBu40r%2Fe5ZJDKlUWN81KKa9eMBG8T56VZpjBvqd7Yey3Ixtp5rT%2FLEHwTTLm%2FTvu5n%2BvpL63jZzx9iMRCMko%2BLuvZQmFPZLL0uMd9vELcN3jnQvoiu%2FkwYgbdn6Lbg%2BMtYOo8XYf%2Fl9Kca%2BlhbP80i66F%2Fo4BLZBaN9GqeS0skiDzwIksvuBT4JzWnCgYLY%2F97EZ252x5r8Xq%2BATsMvdpGD9BJtXMo1Rsz3Z%2FDQLa4TDGtx%2B8R9K1A0eQrTzZEVZob5InqEt80uSRjSd%2BaM1syxtKF9Ztg%2FflI9%2FmVGpb5bzL2OFvgNpt2UschFt0sLogvuZ%2BJlhmQtPwVUPHoaDcVZH%2FII0oMOSBhc0GOqUBoDCRD4mgwtYAQ%2BLFJLVWM%2F3mUWz9g4sqXIQKrQKAKuM5tv6ony%2B8FiUTTDMnXKk%2F8a35tZkkzX3CzNpwQ7PRlJXslyMj7LACNqLLtWSyjzCh81EfBTHr7x9Y56PWGvimOetgtc%2FTG1okS1RF%2F0xyZtF8VXPZ3ozLCvYQKrTB1fN64lZWt9pnmTVyPo6Ps9zV0eXEp1%2BG3GqTAARi5SVcqK894rJL&X-Amz-Signature=585853771602ea0c72f70d5f4fdd9e6dab2cdd01d2af258f07ec42ce031b7670&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKS7Z4Q7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQCcm5chxDKh04f3JgzkGtvIHQCftLu%2BSVO26ZlO%2B6ok0wIhAPnRIyEvatNZRsPPIZWdeg5FOHaTr3sw7kT5RxFNa6M9Kv8DCDgQABoMNjM3NDIzMTgzODA1IgxDVANiqQZGsskg5Qwq3AOd%2FDfcI5cOycu%2FgzIAR4oZ2C%2BtwnEWxvRpNGS1cbF03vhQ5BQh%2FKdv7QmmrCFiO9B%2BeXejA5PnPohTkeqL0BWj118RMdEFIhVzIM9gfIyfMNME5ftXOpmeLgRO6RhAKLeBBUyFohmwH4bBt81qWf%2BtIgIbfTA8FbwpPyp4EMq%2B3quNj6A0VAgZjc%2BKUfFTsnxM%2FjfCyUfgx3kViALGNDvYKil9ABiGwXSTZuojMJsMIDGPYs7EslKYJEqTo61S4p%2FyMVR4PppnPk9QVq4hRwAglyAJPdRbqne2ortiLP7wxNil8MRVJ8I9pMqs8uVlh%2BqgkmrK4iEuLojIuFdEeCajtw8okl3Smqh59SGq1YJegW7XhM6n3bRUU%2FXK1uBXJt%2BVmn9TSbFk4OtQLBO2Dl63qZ70XBzX0%2FUKoWANJGCxPQP1sEvQbS6owWcr6Vp5L9Se%2F0MDqArSiny7qkrGGOrO4LKOYigS8XHKAmxb693mj0lR%2FWWSKvRYr3wr%2FraZ7DlsytZN9A%2FoQu8DBURbM5tDKLod5aGj%2F2ek4iOyXEUkH3Z%2B165Kp%2Bdzy99usyy1de3Vb78q6wKVijoK7wM%2BFgRAYF2vzLEld91BNgq%2B1%2FqpbMBQO0ZQKo79XjpHlDD3gYXNBjqkAV93WgcnyXRjOZghB3xoMd07X3kzmA%2BvKpCrFgCRodhhdWFSB3aLaKT9oRhaVPhyqANqJkXgnDjtb8OhL1Hyjz8ULni7T4yqfFjjX7RKH38Uy7cImbNMxMNhjliGkMK8fL5hFYFpfJzsfzpCqZGzMjgcmaYccvXgBCIaqAgw2KfliryZi3QFEpp19M19FTL1LK6djksKfNI42FwIptVBPX4hF3yn&X-Amz-Signature=0c06b274e81ca4f7dcea8f308cf7951e9ff14325a7743489234407b25468d07f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BMQRU3T%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIGayftlEhDWIEN%2Bikyk0d%2BEsZSaj02gqGX2eT9prODgXAiEAqY340bORVdoDSjomRRfliG9CBWMSiuRzfL6%2FKxjs0cwq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDG24zi2xUwKncVO1bircA93yo7EuBRkj8Y0j053gVQ9%2BKVFF2XSZB%2BMc5upZ59euTarZ%2FENDWIg2F9k83aX6Q8b3Inmqi8cUI5RNnPOM3pQVb5TJ1vscwjqV1G4p7zVrdOfOcyX82w1AzsQkkmaB8%2FA7rmccqxynetCtcpfFOTIxnRM0ze%2FmRXqa0b39EKQmoXMOj50O00Y%2FX0AZi2cQ%2B6ekGGIQdNv9YK0ZFj8wHwkPPs8aFJcooZPXlaXU0Igghn13pX2ZrfrSmzNUHPW0AYhlrYtqVpyjN6yLmylIEFcemNiEKLo312wXovRwjeQUpw3%2Fno2G9cxyVd4yLRyjgZvEUargfakFBckWfEocMxzu0ANAuSEURLqzXmRtpWS1S0SNLAwnpuvZeLD0AoJ4lQzbBktdcy1%2BHc7yKWe8AZ3ykENkStcsva6D8dqsSTbRPU%2BXx9gaVh0hQmnKq04xTndeaJ3pq2oiP10DrMtf1U%2BQqVHeC1po3bcCU8HarLAv2uVuwV%2BcEQj3B1xIbfpCDjzHuUvcUk8RqVGj9WXxeGsEPEukKcVeR5Auh90rlRRFdRW1DPtwLC1Kr625Es3i9DXXEodXQuF9GMWzUynOrMV65E6azZMpNqXm1qWZnJ34xeyaMJtVKEY0zWqDMMGChc0GOqUBE%2B8N0S7vzxHGOInehXBrW4r%2Ff6f96QPeC6pTh4TyTSJoZAYhxNt6crRnN8lP1FObzvgJH%2FK0kxVaJYDN2paf923fNS4VOJgAD0GBcaqzYgm3rbwhyT%2BBONgP%2BVcR6ehIjSWpytTLd8PwcUID%2F6blBfF0k3P2IN66NMGc8OaThQfrVM9i68h%2FI%2BzdxbsqWts1sFTRC%2BBp4PRxcOEa2BwKytZtOuAs&X-Amz-Signature=4402147db50af0ed7209429be3cf66225bc3ab83800056308a306496327e00ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BMQRU3T%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIGayftlEhDWIEN%2Bikyk0d%2BEsZSaj02gqGX2eT9prODgXAiEAqY340bORVdoDSjomRRfliG9CBWMSiuRzfL6%2FKxjs0cwq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDG24zi2xUwKncVO1bircA93yo7EuBRkj8Y0j053gVQ9%2BKVFF2XSZB%2BMc5upZ59euTarZ%2FENDWIg2F9k83aX6Q8b3Inmqi8cUI5RNnPOM3pQVb5TJ1vscwjqV1G4p7zVrdOfOcyX82w1AzsQkkmaB8%2FA7rmccqxynetCtcpfFOTIxnRM0ze%2FmRXqa0b39EKQmoXMOj50O00Y%2FX0AZi2cQ%2B6ekGGIQdNv9YK0ZFj8wHwkPPs8aFJcooZPXlaXU0Igghn13pX2ZrfrSmzNUHPW0AYhlrYtqVpyjN6yLmylIEFcemNiEKLo312wXovRwjeQUpw3%2Fno2G9cxyVd4yLRyjgZvEUargfakFBckWfEocMxzu0ANAuSEURLqzXmRtpWS1S0SNLAwnpuvZeLD0AoJ4lQzbBktdcy1%2BHc7yKWe8AZ3ykENkStcsva6D8dqsSTbRPU%2BXx9gaVh0hQmnKq04xTndeaJ3pq2oiP10DrMtf1U%2BQqVHeC1po3bcCU8HarLAv2uVuwV%2BcEQj3B1xIbfpCDjzHuUvcUk8RqVGj9WXxeGsEPEukKcVeR5Auh90rlRRFdRW1DPtwLC1Kr625Es3i9DXXEodXQuF9GMWzUynOrMV65E6azZMpNqXm1qWZnJ34xeyaMJtVKEY0zWqDMMGChc0GOqUBE%2B8N0S7vzxHGOInehXBrW4r%2Ff6f96QPeC6pTh4TyTSJoZAYhxNt6crRnN8lP1FObzvgJH%2FK0kxVaJYDN2paf923fNS4VOJgAD0GBcaqzYgm3rbwhyT%2BBONgP%2BVcR6ehIjSWpytTLd8PwcUID%2F6blBfF0k3P2IN66NMGc8OaThQfrVM9i68h%2FI%2BzdxbsqWts1sFTRC%2BBp4PRxcOEa2BwKytZtOuAs&X-Amz-Signature=11d6cd5fed6a3cab920a3e53faa877071a4351b8d1b0de7f4a099f89d56b1304&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXT3UVUQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIFAVcyq9no%2FIGVFLG%2FLAFCQ0DQBK03jYvDycssvYn9XQAiEAiV%2BgwLzUOhTdTp%2BJCLjGW91KAN1FUgRdpr39R3m6bzgq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDE4nUh69g3DUqcL22ircAzlr4xz%2FGL7wBqv9b6uowRnKWPpptE%2B%2Fy2VtllbqkWmYAUNMK6Vdqm521zvokYw6420M31ZPm8PLb2L9TzliI3jE1Lt5OCXFn9Xsjqo2LO5vH%2B4jFrM7gG1NrEbz6bfF7dF6BvgphOIwyasosN3D%2BkG%2BiaLuNf85NVoQ4zJyQOhbzUjV6Qa2vPbMF4Hd0nFMKgI7TV9TQgTgCVlKW%2BmkEWeQ25daqjoJlryxjiT1Tpb3gTe55DGFMJ2Jo4EGwu4znP5HfH%2BGiIswMi3FdkPjRgIwVuM6qd6uo4KpLjbnqoRoQKTQNcrrBOlkymBf5p79GpRO5NKGTif%2BPyOOBl2HU7cIP3YoI5i9R%2FySJqI%2BN2Uj%2FA0G9urBA9W2Q56Ip1c2hMBS1qwRZzos5BZC9nt4c7uZJ7Uu9ik5rQqqbTfoTvAKMg1R5j3xVt7yW%2BZqWzZ7V9cKNvyQn2NLfw5fLi%2B7%2BoaaFYdy5mC6rHIM4O56Akq2UzsbV7I8h95FUx82lRO8TGe4gKHv0sbsJi8hFTzz1R1odOLPRvcj4Zl1aotkSHPFOgQY5NNxg5sjVaw6OF320fepaXHGwBmnyrL0Eg5VnSV3dMXFhf02rUYte18onR6Bco68oumtEdEnYSB%2BMM2Bhc0GOqUBmnW7r77yQ7T4hG%2BSg2MFXVtiQdVFc0qj8gTmOVpQQuB993PHzZMS4tVu1%2BoPjUxPz5TPPjllR%2F4qj%2BdVgUfJp0VLMGz2%2BGVhBJLHMlSD%2BogAMwDmcLhNV3qE6CD4QjP9eCRNJjzAG8cGDtjJnRnxwBQkvCMW3nt0o5BMvovfrDR%2BxPbtsWQEUcZgWa1VF8%2FxJtfW33LXLL%2FUOxvLQUi7ppacCGOA&X-Amz-Signature=797aba70b77e9a4af0727522eec4f2e38670cd6ee989add0aca1256963ddb7c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TSHJ3C4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIDRGk7rptPA%2F5HZdfqtvJ9sPj8GG7CrtoVEeDeMLH5RVAiBZVp7SnTCEfOqeqO2aAtMwJdjCVGIwwzzVoX2xJ5PokSr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMH9h4kmfKmuksRy%2F9KtwDgbE%2FB43BhmVXb3omossKm7BcMsPtajl4XDaRnOa%2FzwAR7VdlSp%2B50075pju5Jnx8OPyloQxHwmjIMfKAivz1i42sMYGzV7EymDuCRrjtU2ofTaIOS2%2F7AzBmk3G9EKr7N1wIBXlpgdGa6xjmzXEGnU%2BRiS9CHdVEiYTPgZzJZ%2FT0lWjdftw%2BzCQkD%2FB8UsQR8vyXg4pC%2B6ksR3iFpAdheOJKGJeX2NcgO1k0YxY9%2FMdzuHpxBOSwwhaAsYVWkchRkT%2Brrl%2FeL7MQ6%2B4GVQd%2BvqDXjKDJ24DKereUF2l1Wevrtfw%2FHCjQ3B2U7oGRiGX%2FIjklrCDGYuE03Wcyl4uwVTjCDdDpwVIbk1b4Nvrkq6mGyGGW0BrjmAopyZoPbU6NYb8k81gzSWYDvjgnDf5NQY1u0tvSfTDAtE0QF%2FD2v2VzP3Zz35InBO5nK1m3rxs4yNHKImZcakt%2BWhjkqhoWaQFOyDH5U0gvbA%2BoGpI1Yg4%2FDVU5dpakjX9%2FN%2FhuHwnBiM36rFLwB3Xac41m5aIrlHKI8XtUJL4QU%2BrPj0PdWBVmEHy%2BuHInKDwD0DoIs0fwrOtvc1UTGrFP5K1JnlCaEd7ojfru%2FR5JdFGAnp445dvTrbLMRwpR%2B%2F%2FfsLIw6ICFzQY6pgFCJuixkZjTZwhJUcVJfEUvybTdAo8EF1aT68xBq%2FIicl3mB5OTHj%2BKKzCG2xT5iCniKzz%2BpX46cfDdD9qG2H4F3POIiEc48oeYvCYFp%2FUMCzGG8pMl3wvGrW87j2%2Btp2DGKKyCDXMO51BdLQ%2BGVDpPSuiYXmGvY2QdgUlSzqLTB2QXgxoj%2BwDuY73%2BT0xK61iZYq4fP8QfpaD%2Be6arcIzHdtvekKdX&X-Amz-Signature=32cf9b62bd875f255b33fe29112d827f4e14b50cda9db409c1271d1b7dc27925&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TSHJ3C4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIDRGk7rptPA%2F5HZdfqtvJ9sPj8GG7CrtoVEeDeMLH5RVAiBZVp7SnTCEfOqeqO2aAtMwJdjCVGIwwzzVoX2xJ5PokSr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMH9h4kmfKmuksRy%2F9KtwDgbE%2FB43BhmVXb3omossKm7BcMsPtajl4XDaRnOa%2FzwAR7VdlSp%2B50075pju5Jnx8OPyloQxHwmjIMfKAivz1i42sMYGzV7EymDuCRrjtU2ofTaIOS2%2F7AzBmk3G9EKr7N1wIBXlpgdGa6xjmzXEGnU%2BRiS9CHdVEiYTPgZzJZ%2FT0lWjdftw%2BzCQkD%2FB8UsQR8vyXg4pC%2B6ksR3iFpAdheOJKGJeX2NcgO1k0YxY9%2FMdzuHpxBOSwwhaAsYVWkchRkT%2Brrl%2FeL7MQ6%2B4GVQd%2BvqDXjKDJ24DKereUF2l1Wevrtfw%2FHCjQ3B2U7oGRiGX%2FIjklrCDGYuE03Wcyl4uwVTjCDdDpwVIbk1b4Nvrkq6mGyGGW0BrjmAopyZoPbU6NYb8k81gzSWYDvjgnDf5NQY1u0tvSfTDAtE0QF%2FD2v2VzP3Zz35InBO5nK1m3rxs4yNHKImZcakt%2BWhjkqhoWaQFOyDH5U0gvbA%2BoGpI1Yg4%2FDVU5dpakjX9%2FN%2FhuHwnBiM36rFLwB3Xac41m5aIrlHKI8XtUJL4QU%2BrPj0PdWBVmEHy%2BuHInKDwD0DoIs0fwrOtvc1UTGrFP5K1JnlCaEd7ojfru%2FR5JdFGAnp445dvTrbLMRwpR%2B%2F%2FfsLIw6ICFzQY6pgFCJuixkZjTZwhJUcVJfEUvybTdAo8EF1aT68xBq%2FIicl3mB5OTHj%2BKKzCG2xT5iCniKzz%2BpX46cfDdD9qG2H4F3POIiEc48oeYvCYFp%2FUMCzGG8pMl3wvGrW87j2%2Btp2DGKKyCDXMO51BdLQ%2BGVDpPSuiYXmGvY2QdgUlSzqLTB2QXgxoj%2BwDuY73%2BT0xK61iZYq4fP8QfpaD%2Be6arcIzHdtvekKdX&X-Amz-Signature=32cf9b62bd875f255b33fe29112d827f4e14b50cda9db409c1271d1b7dc27925&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGIXX2Q4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T082650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIGCto2US7XAWa6ejVwhwLIlTL27Bj2Wt9OoGdZ%2FBMfbOAiEA549db923j8KAvIlCBW%2F6%2BAK6KSsyxixuRmAsj4JTkpgq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDPfBJX7K6v2q7eP9sircA6p6w8xtFhsEzNJ1XEJpj8r3pRRd%2BENRT4fvIKmyqPJcWLoe0SU7k9u2XI%2FwIlq%2FvpWGXCiJhQOb2AJYzX2F7cbbeC7J2IwcoM%2BzBeQqPcSmdudI0J72Pk3WhKb6pf5082bCBtsSW3SzJllaUQJNq7Jy5BHIUIuCvFhFRyWd36P2WKLQmufpd%2FAacAFFw0st9rW8otYZPKlo%2BiubLSyHVCABRJ0erFj4Wa3e3oVe%2FXMc1fyehWqfHTfT5FM3Sn854yFVQS6OjOEn3ZI5YHzirXZtjjqIwhRDxgpjgs%2BtO0oZ%2Bb%2FoLW8HOkb5TnsCgpPySyvuxmcnBKclcrWWndees1quwkP1UMF6J%2F4ITkXbAdCdBOIgVfap3ULFRGmR3Lect3vdhh2cV5PPwx1qXrPtYYrddFR1lh28ZrNoGC7u2i3WkQ4PoJp8wmLObdLy877b7x27G3aRheq2nx5zPPET5RDPum4M38wjl96auV%2BEvLPCzHL4HcvhcEvSMofppoK8gfJEnWnjaWjnWu2Sfot8SMVQORblLa1eouykvluBOwDWI8MIelz418osVkWVX0w7H5L54%2BLotKtQ0SSvcgin2kIv7wQ6YQ%2Fw8Vk5%2F3XJPkW9H4miOfN0S9HtKwLsMM2Bhc0GOqUBqC83smRPCSVskoaS56UD4lCJ%2Fld%2F%2FpGWGBtR8xDb2eqJQZlcj0HjRfB3E2tM6JU7l799HQ9nUvfNReGcw%2F1yZQJWVWwPSR2yzARRV4H1dBgj8I63VXAMPgpHqK9o0nyNVSmKtWo6oZaDRs6xnKN%2B%2F3OtVSeWgDsqaQfMZNXqz0hY9bLJtJdKwElhFsgZSyBlHfqaHr9y3Fmtav4GXFoS9nqZ2fZt&X-Amz-Signature=97a2e49e52546733bed77a4de286f13d8536d039a25c9aa244e15b5a5d85000d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

