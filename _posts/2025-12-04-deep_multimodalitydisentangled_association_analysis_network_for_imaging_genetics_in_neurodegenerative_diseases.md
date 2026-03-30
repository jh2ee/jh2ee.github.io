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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXE2DXVO%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIBPNvXeBqbaatNjITDC1CjCPnCGg7SEgsciHvInH%2Ba3DAiB0MHnPaKgyL3ObNQdiRGj30V9ohusacNCqo1ZI4%2BofRSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIM2eYx6MEDsIg%2BjFCpKtwDEmEsJ6txbOM0bcgR2zuPP0YzqsgNsZU%2F%2BeWMWvqUi3%2BQvi3KmSlIIKXCAoKJLQnvenxwU3hEPz3PvyN8VYd26Y3RPNTJTDBI9Hu3A3%2F63GWUaDFR5Y4Ix2J%2BcxNJJz%2FUoaUtMjEOyncuHjL5wBlccCM7pE4mS1ePwOGVbm%2BWnTzMDX85NU0VFpyIm7IDaeEQ1j3l4V5cCXOZS8B3wxmL82Q%2Bt304Z2LiPqJfT4ERCScQUbvsMJDy8XYUMDYiFJJJciHsiNqVjL0%2FfTbGka22NoFHmuK5OusrlRxWqaxRx52ezxKD7vrpB8BIRqr2f20E9JZbkCC%2BcjtSj1TBFJsBr1tfi4%2FVVuf7uRfd3Xu6HM2I6YKXr%2F1ILDW0r2nhYYZmpSnNhXBT7G90qS3QseF%2FX52YVHCgFgwnwVz6GKxS71Z8tTPF2HBbkQX7PGpQSiUEjYGDVbrzZIYRWGpvLaIQNuz1g7YaLdhB2OteV3nqWF84vt765ERQQG9LAAO%2BRHeZIUR4%2BjttTDX8nFV3j73LhR%2B23%2BlUqNsmu9c%2Buuc0t3NkEQtpRoFwpE%2F8ckSAV6itna0ZFfCHSWZtZA0wP7HQDhVOhSGXaITyksewHtCIDHjfV6vtZgmz9hYldN0w2o2nzgY6pgHTgYBmEveitY%2BzXtGb89yP44Nm%2F4X0bewE67Z%2BCWMkcFI9YnP6bw8WIfFF4rG%2FSSAiNw%2BF%2BmS4R7jphTLI%2BGslc%2FsPI3A6xrJjuW22u06i4DZ7FgW8uRIB4R6CmNObv4wcBocsfTwT0T%2BEE6QdUOF5iuuP18LQxbZ9HMlMMk2OzSkvduXbwjBMwoxvdBLZiZ4ZksVB%2FyYoji2G1D%2FaEyBg9nGYO0PR&X-Amz-Signature=5cfbead94ba7db944ad41039e7f01e0585fece14074ee8335b4caa7e2c910f52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXE2DXVO%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIBPNvXeBqbaatNjITDC1CjCPnCGg7SEgsciHvInH%2Ba3DAiB0MHnPaKgyL3ObNQdiRGj30V9ohusacNCqo1ZI4%2BofRSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIM2eYx6MEDsIg%2BjFCpKtwDEmEsJ6txbOM0bcgR2zuPP0YzqsgNsZU%2F%2BeWMWvqUi3%2BQvi3KmSlIIKXCAoKJLQnvenxwU3hEPz3PvyN8VYd26Y3RPNTJTDBI9Hu3A3%2F63GWUaDFR5Y4Ix2J%2BcxNJJz%2FUoaUtMjEOyncuHjL5wBlccCM7pE4mS1ePwOGVbm%2BWnTzMDX85NU0VFpyIm7IDaeEQ1j3l4V5cCXOZS8B3wxmL82Q%2Bt304Z2LiPqJfT4ERCScQUbvsMJDy8XYUMDYiFJJJciHsiNqVjL0%2FfTbGka22NoFHmuK5OusrlRxWqaxRx52ezxKD7vrpB8BIRqr2f20E9JZbkCC%2BcjtSj1TBFJsBr1tfi4%2FVVuf7uRfd3Xu6HM2I6YKXr%2F1ILDW0r2nhYYZmpSnNhXBT7G90qS3QseF%2FX52YVHCgFgwnwVz6GKxS71Z8tTPF2HBbkQX7PGpQSiUEjYGDVbrzZIYRWGpvLaIQNuz1g7YaLdhB2OteV3nqWF84vt765ERQQG9LAAO%2BRHeZIUR4%2BjttTDX8nFV3j73LhR%2B23%2BlUqNsmu9c%2Buuc0t3NkEQtpRoFwpE%2F8ckSAV6itna0ZFfCHSWZtZA0wP7HQDhVOhSGXaITyksewHtCIDHjfV6vtZgmz9hYldN0w2o2nzgY6pgHTgYBmEveitY%2BzXtGb89yP44Nm%2F4X0bewE67Z%2BCWMkcFI9YnP6bw8WIfFF4rG%2FSSAiNw%2BF%2BmS4R7jphTLI%2BGslc%2FsPI3A6xrJjuW22u06i4DZ7FgW8uRIB4R6CmNObv4wcBocsfTwT0T%2BEE6QdUOF5iuuP18LQxbZ9HMlMMk2OzSkvduXbwjBMwoxvdBLZiZ4ZksVB%2FyYoji2G1D%2FaEyBg9nGYO0PR&X-Amz-Signature=5cfbead94ba7db944ad41039e7f01e0585fece14074ee8335b4caa7e2c910f52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQGA4FAR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJFMEMCIEgwEqZX%2BCSuiN5niC%2BTP8W2cOtXsU5kjJgC5sd7yHoZAh9XkWRpC0uwOaJUDnm2toTx5i%2B4v81%2Bknm4SA%2FF%2FbJMKv8DCBoQABoMNjM3NDIzMTgzODA1IgwcUAUtdvXqzUMWF4Mq3AMdzDgi72sSTkUHXSs5N%2B%2FyTBgM66AzImUkw20u0IIinZjpdHShTwkyXD4cAAIo1CQvalzUFZYiMFpfRz0xSRe1FxqWQSXqiS4mYAaX7vmu6PByQ7MlJOJLY7uEE603JZYD5ebqv0z0Yn6FWRxuewoc2%2BRILU%2BCLfXpXbw8AJgpsPigbU7y2F54PuKJT4PqBN00feH%2BTULQGaE2f3vGTwyfuWenRLm%2BAJG4fxfO5XbFKffGTDvU6lfoAjRmuj1VX0PeTmnLAil1Br5T0NoPeFqsizYsKOuNCHOkjZfojoJBDwuxP0P7gxVivGFifbkoG%2BoVooPYylCSUtF%2BXXVqVewbE0G51mC3LhFDtKTs001zPyKyP2ajralTTcg3TrJXxyPBdxV%2B8bE%2BmDxg%2FBfnJnqQ4r9KoyHzjAem8aLDWTgKoPloocnaDyxonUGl6tB145LYDwkPr7U6l%2F0x8rlQ9Ou4t90NQTcYf6AfecVzjcTtj3cH%2BnxbXZuAV%2FcaHC2PdlZdsZC3chk2sE3Lmn5G4xjFaDJ%2FaiVqxa4RoFg1X94Wv1rIp9Px%2FDwzXoQmxUQuMAE%2BdOaYMNPJTo7iPSFyLaIZcgdST%2FJ6BR%2BBJ0MDx4klR2fzd1ao%2BeH7bE9anTCgjqfOBjqnAXreIKRrmxe7fO0uq2Bni4kWl3OsHmnp8uG3GPNVJvnAKGyC29goGqSadclkCBLwq%2BRyQQAcljtRV3VpL5uSV8XuaAT1rezLZBTEIh8xH3LakXWshQb7NSWp4fFF8UI1rkjnAGOwYtX%2F%2B47bnL8MdiBkaOiXm9iW2i15aa2iNpvd%2FkmAuHbgvSVZ5FIilBbJwmlJQBs3eXzsOS4h2spHF6SMOmt3Mdyt&X-Amz-Signature=901b8090949fe4a9d93f3fe9a9e3f908ae5eb4e8828eab2c6b9ee67fcdd0a8d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZO4ADAH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDzpcWAUPdv4QoK9vZOfZJTHKp9eI93yYnZyE%2BsETxawAIgWSHc%2BsZR5T2h3EbMLfq%2FXq%2BqIwNuhvBxrisej%2B2LHPEq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOb%2FjkZdp3fUoxd59SrcA%2F9PPJTBitMLcGAOUJRMnCGqq0R6G4u98eWa44UwVqMm2HCrwZ2Hg3u2NO3Kvp0Vsq3VLD6LuWj7EiAaf4g%2FzeaDzCQHIvZrFTltAI%2FR2lDYdxPdgR4xgLnpRvEsJPm4XLMZYutYEyBIii0u6Rq0uV8rfR6axieA8QcYNdh8QrF5ogDFCi6l7JybL5Uf8MYBqFZlXuyKS9E1M9Q3LGsKJtlMziXTV4lIO1AfIzZokL0pNhKJaEXLfFbnrwz9d7HP7lsJzZ%2B53%2BM%2FV%2FWYir4sasX2ntpc3Ta7wCJla2lwSEyT1Yyy4zYhgVJZC%2BIZOSU2JHd%2FYViPbeGi7fb%2F%2BZC8WqiCJntAJL8pyQh%2FfITDIEsujlgDq3FeVzzhAu0%2BJnXvHph%2BdTBFTcj3bNDc4%2BejWl%2F4t7odpMdDjXPv0cqiw8UOUMvLEfJ6dBEcuOLRsCt2t2PM%2FN3DHPcvsejIcgdryO%2BErCbbPlM5dRxdSYR1I3IOxe4bub5n2GPLgb1LXG%2FnXxTjKGwl1Q33uhLv1MMeGJK4fH5frj8ztxwNJMje%2F23bXszoTaN0LP6sXxKAZwkhOJmnqqL5Kn0ZkdWMtFRLxM9QxtTqbO8VzhlISfllZRg80UWe9brRWGJUv5EhMN2Np84GOqUBuHtxDbHMoptCYTonD7IvHsgnjEo%2BEJU8qLRLcZTvvdwHrQ6oAQ6jCQIuwv71XjMuF%2BEiOfjn9PasBw9ozIbWA4jkvRNSXEiMOqnTvGwJJeq%2BxOPqlOUGx0uUGl9H%2FLYPEHzYs3IyM8K15odUOsWxtxGxb9CtC6xhdkrS9u7Q5zTjfMwVOMID2sfOGtkFcazyY7I5BdRoIBqy058ZzBPWLTMngpIt&X-Amz-Signature=e52b9a9397c5f41394208362469a5a6d96cb3c49f7e7bb93fbac1b5873e40454&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZO4ADAH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDzpcWAUPdv4QoK9vZOfZJTHKp9eI93yYnZyE%2BsETxawAIgWSHc%2BsZR5T2h3EbMLfq%2FXq%2BqIwNuhvBxrisej%2B2LHPEq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOb%2FjkZdp3fUoxd59SrcA%2F9PPJTBitMLcGAOUJRMnCGqq0R6G4u98eWa44UwVqMm2HCrwZ2Hg3u2NO3Kvp0Vsq3VLD6LuWj7EiAaf4g%2FzeaDzCQHIvZrFTltAI%2FR2lDYdxPdgR4xgLnpRvEsJPm4XLMZYutYEyBIii0u6Rq0uV8rfR6axieA8QcYNdh8QrF5ogDFCi6l7JybL5Uf8MYBqFZlXuyKS9E1M9Q3LGsKJtlMziXTV4lIO1AfIzZokL0pNhKJaEXLfFbnrwz9d7HP7lsJzZ%2B53%2BM%2FV%2FWYir4sasX2ntpc3Ta7wCJla2lwSEyT1Yyy4zYhgVJZC%2BIZOSU2JHd%2FYViPbeGi7fb%2F%2BZC8WqiCJntAJL8pyQh%2FfITDIEsujlgDq3FeVzzhAu0%2BJnXvHph%2BdTBFTcj3bNDc4%2BejWl%2F4t7odpMdDjXPv0cqiw8UOUMvLEfJ6dBEcuOLRsCt2t2PM%2FN3DHPcvsejIcgdryO%2BErCbbPlM5dRxdSYR1I3IOxe4bub5n2GPLgb1LXG%2FnXxTjKGwl1Q33uhLv1MMeGJK4fH5frj8ztxwNJMje%2F23bXszoTaN0LP6sXxKAZwkhOJmnqqL5Kn0ZkdWMtFRLxM9QxtTqbO8VzhlISfllZRg80UWe9brRWGJUv5EhMN2Np84GOqUBuHtxDbHMoptCYTonD7IvHsgnjEo%2BEJU8qLRLcZTvvdwHrQ6oAQ6jCQIuwv71XjMuF%2BEiOfjn9PasBw9ozIbWA4jkvRNSXEiMOqnTvGwJJeq%2BxOPqlOUGx0uUGl9H%2FLYPEHzYs3IyM8K15odUOsWxtxGxb9CtC6xhdkrS9u7Q5zTjfMwVOMID2sfOGtkFcazyY7I5BdRoIBqy058ZzBPWLTMngpIt&X-Amz-Signature=92615bc04fe5b7c5d41e0b2bef876bed1fa18e77497126796b7b914bae1557ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466763ERWKH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDLfDLAD2uvPt6F47yYnYxJyNBF%2BhCNY1Pjqs6RkOXZgAIgFjA9cJo5Fbk3mOsgufw0YWavVlmzBUQ2i5%2FEtATbPdYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDE%2BO5lDQfC7RzPqiPCrcAxuc4sHjQK%2FdJ%2BCY17lj420jHplMLwFbjaNFrsMyY%2BXNphMLgaDFu8xVHnBXfoCAD%2B57YLeW0H49tBsoizdm7%2BsqoKr9PGUmwiEXJTxl3iyLjCWFJ%2FAUNpH%2Fv4kgpNTKLx0bg%2BeYv9Q5%2FTQHp56XYg%2FSO0%2BHze3KEvr0Z%2FYEFuMRw2SfIGw%2B6WUu5Y5nQaFOYnwDHcdUfFnJet%2Fo4GDrlxzr%2FeFF677Pjh3lkbMiCtxl5igISA7Aea7URUXROYbYWThpLnjsMXdjm2G70XWyS8ZyC1kEFVUKF1rZB6EQWcaCNUm5inakSVro4A3mQYr0TVE5uJ9EnAR6gcXWH32LEA4OMuZyc6mWjY1z7%2B8bRjDexHhMpO%2BCXPNowaxM1dH7OtlGTbSFXmIt%2FQ34O0EATOVxPdu3xtDdHEvV8wyFLQggsh6UsnBYMs9YuPe9r5eWpXBpMrMOJTVU9CkSxVNesQ%2Bn%2FKc0wsFZcoVt2c4mTswRVIpYGhIcL%2FtyK0N0KWArG2l9abx8YbCUKAnRUo5ov8yTJda%2FbDEd2NX%2B7BpZvlR9UmvbpZ6xI4lDOZz7MpwJ7SW3m9FovzNCSeCvf4gc4Oh1jiLIIzr0OeISz1TYogeeLEWFM5DyL%2Fd9V74kMLiOp84GOqUBGPyIumMdL92bi0HS4j5RG2EWj1TlaETPGbGjReASL7L0O5%2BKv7N%2B64D0wRI4n9sVr5OGgelKqwNyPtw8h6bUrRJyRaIIdbKDarY%2B0G76Xdi1rad1dhb4YYd4huSG8%2FmX4BNEANCb7gVSIQOJeNBAZNN%2Ff%2Br4cyS0vhqeXAnfDohUBVtAq%2FTCUzjFVSLfhybGyU3qF0R1YhI8Ggpha1A7NaT%2FOxV9&X-Amz-Signature=65cba7b0e6e668cf8872ad15c3fd0d0e00e384a5448c515b726e718972e92049&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GS3QIQS%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDyXeEYrrW467LZCQU907mUPJmsoq9FG8n9w2%2F4vHfdHQIgSgh%2FMUNeLc6g%2FkP5g9FjpUerFlIkzcNMBaa2l2DWoDkq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDEClf4SLHN9tVQI6pyrcAx5w5pdgbXuTYX7iDvfggFjJ1OHAAPkOazFYv9akHHI8qaQnwqb%2FnkM3QaqxbszdUEiaC7wvdDV6f5zkBjhjrwLx9f2OXUY3%2F5e7mUWcYVZ58m5KmHubcX7PRpzaxFPFv%2Fhc4D2dAwdKS2Z1AhWQE%2FwtjWgNRqiXFMoo4P9eB1kbX5XPyfpCIOvv7TzCMACnmskEv6apaTNc7roV7EgYg8cz%2BtfOvVuT6S%2BlC7dZmIyIBMEVrbDgxGwvfKYBbNidu5D4dspWCcNslzV63i2jM4uEBEotp0CZe8Xesx1Y7KVK%2BqtqDFUfjY1ifJ7sDeyyNpVEwc0q05kKjUHceFy6JzBS9RUyiTxxL85%2F9EURwRQ0sAArCugNBlaSz2NPf%2B2BgQrK%2FriE1YqETrepPX96air50SU%2FtKW2B7Zu%2BAv5JxKIPFiEGkwdFQk2NMRwGbavvrT6Y%2BU%2BUgeRx5J%2Fyy7YfUmPKnYKVuj4ppPWUEGegLhzgbHjfkc0D8qCvNYfwblEQVR1iWPh4O19apa5ywKuZCgJRz%2BZ5gEo7%2FHGzMsOlFrXKkvixsiw47TENvo%2BPrewxAS8bM0woHzz18WHJx9iBeTZqQ57ta409yJTS6zkLo2KfMkKRy02FDo4Wx4EMPGOp84GOqUBKsYbeSV0%2ByDYSQB5wumWlyhsHKadmcj0fX8rj9t3c4HWQ6veUFsAOLXIEA5xxLAqsh8NPrcy7K0mwiGCxnN1XRvDtSKAHJtMmEyVy3Ifnit0cL5Fq%2FECrmPZYWXNyJafPRVWcdhIJhxqRvFJ0oNCzW3pAH8qKaYSL7CyxQ1aZlARFWCxq67Yj6YP%2BK%2F0Kjv%2ByXuD6GCwYPXkMb3HUXmfhJ08tZWV&X-Amz-Signature=01d3b446a73d8d775bb5deed5e4e1d83a48f8ef6d2da0de1d8ad496f1283dd4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HYOLRFV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCyGfDXIzb6vP9O%2BfiI9A8FDzL8vEa%2BomDdrNCxV4TCtQIhANTaQgXtHRRJx5BDnctxM2aIlpObeML5V6%2FxEzwprbHUKv8DCBoQABoMNjM3NDIzMTgzODA1Igx%2FWa3%2BlRDRvWd3jkYq3AMIpeo0n5ewFxlMX9Y%2F07ZKmtQtQZsg2yqJiFLfD8xv3J1buD7totN4jIAUh4jk6gLJ9g7d%2BmrCOr2bSUeRoXG6zlm3y%2FLXl%2F11r9lXsJbHSFgeN%2BPjT6MITWXEDff79uyKGySzPv6on7QN7fnvPxdrQIVSFq4XuYlmMFMA3CBz%2FLmA0Rzcd9fk8xe5THrURyUdO9wKSBbjCkCWkY4KpROhEZYAzsczk79EZ9nweHXn6GiM60P9njedbLP9vFr8ZsooaVH6bpsyHD1dm4oD5vzX2YRi48nFYB4QpzmgNTOUXkli%2FQh0j1zJ7XEMWZGTvEy%2B%2F5w%2F6aNI9g39BMNqWYRJ7QVQd8PoiaVazePOIEXGvNJCOwcyWYqWU%2F54lGT9TUfRerwDPrRkmlBJu8%2BzlSj1%2FniArv%2Bq4Bj11%2BUDd0sTI%2BW0C3ajbU8jpTMTISIPIS3xfvq6dGbWo%2FGSHf40MZbIUT1K54rvpojHxorV9zM6yWYc%2FSJNcLRi%2Fi7Yrs3eb0XOg6%2BbGYoUDNuYcE5Scpsfn%2B%2Fc46Lt8fB%2Fa94mSA1H1y7KRRSF7Yqu97LXi%2BNIQ30DDuHdXtZKV7Yg%2Foi%2BJcfQ54zh7nq%2BHWJE3bdb3NH2oFO7kU4Zs40VF2y%2BRjCEjqfOBjqkAZzCzHiJkaK1UstE9AVNBW7X17IgwQ394vgF2wuRGdvO2QXABWZZxgyzggKGs7oWNM3nlqTXfRp6MVeTHlPUfzCjKrWy3ekfMy7egB8eVm6gCXdpmU0mqiBi21YPZDpuV0fMjoTst1nhHlZHGFw55ASjIvHYOkY7KW3AbR%2BLlq5C0YMmXn4cnMLrzzWX%2BCn%2BttgTnPqO1BwUPp5n5itG6wwk2UaD&X-Amz-Signature=0a1fa50687998917d80ee69cd793cbc0984477286f37d2acf361f57365f66af8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDS33KLP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIGfGfbrSAks%2FnGAi3nGjF0KHkxnGTp9ZNJC%2F8y0vj5IUAiAmsUBXp9JCqlnLIyFJr2gZ6VJrqDg0l%2Budg7kgJt%2FoGSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIM%2F9MdhaoZdtbraKMBKtwDiTwnl21MJWGTIQW63omv%2BcGA6amybWW7KCQhkKNZE17C2nE%2BFYiAeSKNbQ53ZksRKSopUV3zMTsJ9VO7ISIV%2BEjSU2HHTx4y8iDfGCToV36uQDuFAyX5JkbXkiTk1mtDIGuqmZ204%2BwhehcatzCJTfC8dNJTRAjYx8sCHFSmwyTrj%2FcSMWJw7wUS4gm6mBk9fOyVBT2SzlcGf%2BieoM3Brumk%2FsdIUCcodFscjwMFRtLvvLo01KczwwOVi6pOoh21LsHBuFdVhlgwt%2FieDnD25DVCsrQo2O9kQA%2Bl8BQnr0%2FinA7l8lKOa48Tj2%2FYZCo9HLLi9WiWDiu937%2Bkodba3ntgsIwwMYUvrINzNlB31T4fLCt2q%2FrHuYziGdt772lgwbusLqOeEbwbXmTWaDJTdINgdiY9YOTdr6O5Oh5EPj3hj3uUXGipNFEhmqekNqOL2wIKeZiZbn%2FYTrKqxwFNmfK856vT9t81F4R%2FR7mXLr7o7SJsBDtlqw3E9jBioQGXT0MRdrRhh9a4pS%2ByPmfiG4dGEcB1pyeoAce2wmF4kzuSHDk8TgiIJHcGZg4uWUKI3h7C6CePj31osfveTXN0xwnghh%2B4HuG1LKEACsT60t3%2B92D4A6VuDSBNSqQwxY6nzgY6pgFW5%2FYiXzaUq1iEy3d5AuvJonInhOgjW8LWn6gJl%2BbhTCK96JWPe%2Byg9EWblp5DWeEJ3ZElV1yjjhzB6p%2B1CGC31KdtJ3u3s0vrlHbKZZX9XP8pI21IO1j5WiKDM2lmNWcqEOJXd1KiDWcxK3ggKwGias%2FFcQMqJvl7fWH6UhUGmYQZ9AtChpAwBn3KqrZNowLc%2BE%2Fhvb5WR5sP84s1Ca%2FODiaFuxMG&X-Amz-Signature=d4427bb255a552cd5ab30f05f2bcf572184d516f36031eac48aaf2295369dfdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDS33KLP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIGfGfbrSAks%2FnGAi3nGjF0KHkxnGTp9ZNJC%2F8y0vj5IUAiAmsUBXp9JCqlnLIyFJr2gZ6VJrqDg0l%2Budg7kgJt%2FoGSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIM%2F9MdhaoZdtbraKMBKtwDiTwnl21MJWGTIQW63omv%2BcGA6amybWW7KCQhkKNZE17C2nE%2BFYiAeSKNbQ53ZksRKSopUV3zMTsJ9VO7ISIV%2BEjSU2HHTx4y8iDfGCToV36uQDuFAyX5JkbXkiTk1mtDIGuqmZ204%2BwhehcatzCJTfC8dNJTRAjYx8sCHFSmwyTrj%2FcSMWJw7wUS4gm6mBk9fOyVBT2SzlcGf%2BieoM3Brumk%2FsdIUCcodFscjwMFRtLvvLo01KczwwOVi6pOoh21LsHBuFdVhlgwt%2FieDnD25DVCsrQo2O9kQA%2Bl8BQnr0%2FinA7l8lKOa48Tj2%2FYZCo9HLLi9WiWDiu937%2Bkodba3ntgsIwwMYUvrINzNlB31T4fLCt2q%2FrHuYziGdt772lgwbusLqOeEbwbXmTWaDJTdINgdiY9YOTdr6O5Oh5EPj3hj3uUXGipNFEhmqekNqOL2wIKeZiZbn%2FYTrKqxwFNmfK856vT9t81F4R%2FR7mXLr7o7SJsBDtlqw3E9jBioQGXT0MRdrRhh9a4pS%2ByPmfiG4dGEcB1pyeoAce2wmF4kzuSHDk8TgiIJHcGZg4uWUKI3h7C6CePj31osfveTXN0xwnghh%2B4HuG1LKEACsT60t3%2B92D4A6VuDSBNSqQwxY6nzgY6pgFW5%2FYiXzaUq1iEy3d5AuvJonInhOgjW8LWn6gJl%2BbhTCK96JWPe%2Byg9EWblp5DWeEJ3ZElV1yjjhzB6p%2B1CGC31KdtJ3u3s0vrlHbKZZX9XP8pI21IO1j5WiKDM2lmNWcqEOJXd1KiDWcxK3ggKwGias%2FFcQMqJvl7fWH6UhUGmYQZ9AtChpAwBn3KqrZNowLc%2BE%2Fhvb5WR5sP84s1Ca%2FODiaFuxMG&X-Amz-Signature=12d6b432eab574a475b8f1675d6a342b2e3a93c522383bd5811a589a29d8765e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7BAEKXG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDZcsu5xknnnrqt7ByqOh1Gz8U2jH9UEfcCnqMygkI3NQIgStKxwDkJVl1cYawoYL41xy40c6GAAEGETEjjBEW7ZXUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDLOpwxgbMre0lRYa%2FircAyPmP3IRKtDYt7X0HYl2TnGrCYTZsLFzb4Nt7soWbK6TpNOpeAhMko2LgUCANsAI12R49gfHyW8a9MQEEEy7X%2BjB5A69xLmTYAc71LeJI3xK7xFrpnb2SQslMeFquTlf1vTvm%2FQDb8jqF8o0v7mdoSKyeeCaQ4iw1r3qYSUnEIADX7%2FhZmIhmsE%2FekNYVCB0puLIXPY%2B2cObDznGEHE%2FN%2BATD7GHFpch0EqqvTbXaYJkhbeTWzfZZgCyyegJ20R0DJiH7eWZ7TNCs3xOb73ORwnDag4un85NZJrhMBe7%2FmBgUr%2B7dXt3UlabicPI3hRn%2FZu6KN1F4R9FJ13V%2Fyw5qnr%2BgXnyUn%2BWVzfJ%2F5brzFl8W%2FzW4l7Q4rAyOy6aIm6NS5F0%2B8L%2FJmBhseTX2M5rzWiA5cAEkY%2BAt7AZz2F2peQUOLgSTmPRQ5JLCZl4mmZT%2FLwKSy4NwU2Ti%2FobolaNcu0oDncP%2FsmfgiVqDC8JBOYgU%2BDnDl9ISs34fpaCUNAw3y%2BM76X4f%2FxbkVbQWv3%2BoJKVveJw2pgGnn0A%2FnrV7pZk6NGsDlNJozWdwWNKDyIe01fQaeyVMkAA1zq7jZuN13O2SYYlVzDP0xkpUETlgDluLeqeqSutGVoRHHBZMNWNp84GOqUB7%2FE7Lhdm6m%2B4hLdCRYGhDoYt63TH%2BW%2Bhew7LjKq7haI6JXCs2RJ8e8lCNF4nZUJX9OhnhluTglalgt0Pg5RzxY50pyMfLJfjsz9CtYwLD3GiTLlTN8q9qTbqTOa3qZMNt25lIRMhwstdnNqg1bLtjAgNrd47%2FVzrYpe%2F7DydIRm4b7%2FqDfNBjvj%2B54wcurQdM%2FLEMf4TsPQFDScBHtHPc7oFDotB&X-Amz-Signature=747491c4c21f7c0afd31f441fa3b038544a1f5f6f448ff621254ed70f4a09526&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SBHBF7Q%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQD2SBi02x%2FolF8ShEQoWibLN0dbcb6OmafmDzvJpnfegwIgFGXrgFPCMpB6KHWFRdZDnaW9X2m%2B0cK8Yb1iV8iv1ikq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDK58h%2BxTEM81mYMIjSrcA%2Bl%2Fv0Ciak8XZx2vzCS4OC%2FwT4c0Z9U33I9nIM9y2BjtERsUWvRZ6rg40SXMj3PglFvhIvRm16HOlt4orJ9C%2BwQnNlCVmNWlRyQfR9WUEcqgj0OOb4oSzkLua2rB5NLxo0bV%2FR5tfBDy%2BWTOJSPwpBRSyYgdRYB1A2qeUw05A5UxXGiXwLN%2Be1aiFDiFqTdikkNSPYT76a5ih%2BSzLUsdCf94O3cxkkWlRmb1%2FQ%2FpQw%2FZlOKrn10qgG1%2F6dyopYi5yJ5%2FCxbyYBeA409YJ5zvvCIyt0gtFo0hl%2Bp1StV2thRgC0Li1UWTgO2BZEx1W6hiMaetBEKVeAQjo75sQ0Diux1Zd4%2BdbhyaMz5%2FjLvIT1hf%2Bs3G5qgGi934WUFnkY5pGuMlGdqctqM7W%2BFgyVt6jbBwYL21YjWzLtDupJSb6k7dT%2BPGCE0IRo4ZHscFlFECS73ZzPO5XaOomrgiZcddwqXMjJr5oHPd1eNh%2BGdWjvofLrLfu3XM5xDoQkcp0N5Vux2HtBSq0HAeYxu9TPdRTyfT7g3cEnDk%2Bvf8WsXgWR5CtDNy9g3rq01M%2BX%2FIU9eFhdzZM1YijI9SUbg5oIrIDaizTDJPLYjuobAdjBYYAw8vxyjTn6iDmKm4FY67MJ%2BOp84GOqUB9r4Tzt6ZPxSTCaU8cWFv2YhVH0%2B9M56m7i6hnJ8AaG0XAfRxaVgbJab7PA%2B7dsUprNZWFhW7TVzFdHfLJxngDp5Bvs0vAhnP%2Fd8YPK0nixPUZ94s6GUvx39HPYw23v%2B%2FRzpB9hQMzGkkRczpkGQywLd7meCgmFM8ypS2AzXLYhLEeblEiAwzLvlKhIgclFK3NbSdsX6Ii17qr5ZxFoueFTQfTatP&X-Amz-Signature=e85a16a9039bcd462a32e2d6ceb57333d94a17d269c4fc05947a59d6b3ddc95b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SBHBF7Q%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQD2SBi02x%2FolF8ShEQoWibLN0dbcb6OmafmDzvJpnfegwIgFGXrgFPCMpB6KHWFRdZDnaW9X2m%2B0cK8Yb1iV8iv1ikq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDK58h%2BxTEM81mYMIjSrcA%2Bl%2Fv0Ciak8XZx2vzCS4OC%2FwT4c0Z9U33I9nIM9y2BjtERsUWvRZ6rg40SXMj3PglFvhIvRm16HOlt4orJ9C%2BwQnNlCVmNWlRyQfR9WUEcqgj0OOb4oSzkLua2rB5NLxo0bV%2FR5tfBDy%2BWTOJSPwpBRSyYgdRYB1A2qeUw05A5UxXGiXwLN%2Be1aiFDiFqTdikkNSPYT76a5ih%2BSzLUsdCf94O3cxkkWlRmb1%2FQ%2FpQw%2FZlOKrn10qgG1%2F6dyopYi5yJ5%2FCxbyYBeA409YJ5zvvCIyt0gtFo0hl%2Bp1StV2thRgC0Li1UWTgO2BZEx1W6hiMaetBEKVeAQjo75sQ0Diux1Zd4%2BdbhyaMz5%2FjLvIT1hf%2Bs3G5qgGi934WUFnkY5pGuMlGdqctqM7W%2BFgyVt6jbBwYL21YjWzLtDupJSb6k7dT%2BPGCE0IRo4ZHscFlFECS73ZzPO5XaOomrgiZcddwqXMjJr5oHPd1eNh%2BGdWjvofLrLfu3XM5xDoQkcp0N5Vux2HtBSq0HAeYxu9TPdRTyfT7g3cEnDk%2Bvf8WsXgWR5CtDNy9g3rq01M%2BX%2FIU9eFhdzZM1YijI9SUbg5oIrIDaizTDJPLYjuobAdjBYYAw8vxyjTn6iDmKm4FY67MJ%2BOp84GOqUB9r4Tzt6ZPxSTCaU8cWFv2YhVH0%2B9M56m7i6hnJ8AaG0XAfRxaVgbJab7PA%2B7dsUprNZWFhW7TVzFdHfLJxngDp5Bvs0vAhnP%2Fd8YPK0nixPUZ94s6GUvx39HPYw23v%2B%2FRzpB9hQMzGkkRczpkGQywLd7meCgmFM8ypS2AzXLYhLEeblEiAwzLvlKhIgclFK3NbSdsX6Ii17qr5ZxFoueFTQfTatP&X-Amz-Signature=e85a16a9039bcd462a32e2d6ceb57333d94a17d269c4fc05947a59d6b3ddc95b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2PF6NP5%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T010726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQD824W79rAYbGJaFlgWJ9OO9oELqYxZ0c1%2BHugYp5bS%2FwIgNVyMcSumz8ygZSa6sEH3rETDgEt2EGIatBiXNgfEWqkq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDFdZb4Hd8jV2pYeOMircA3lslbqLtncz5pKy9lTmJJ1zcQkNbDjEGmAL4AVxoV5eZOv3Uq9NvjbOdS8waHwcsL4IGhVOp3wzsV8%2BwyKaiz%2BJLXdRby8FPT7wb5gxgz1O6B9hroWL1qpk1IPlqoa2uUmVlWMxOurWjlm%2BXPSRUkiUhuXWaZMoRSuNKJQaZ4l%2FVgg6Xj6AYyI%2FnE%2FHqT9ZK9MKDtjfxcefABBvIPzizBGsfQNBky8d%2FfudOGj5Lec3DHcCbs9Y6YdUy5pPB3c3wtxtTILit%2Bh%2B1yHA55fOtWaIOB0Mf0%2F1tpU7%2Bo4jn3lcNDKgfRUBF%2FuK9q7zkx0bKLs4zgWMS4ef1zojPEVxHIUFS8dUMTI2Yvbzhw0zwWEuofsUmJ%2Fy56J%2FlSqfictGQGLnqliCXS2RTpoHHx%2BuMsUlzDMv7%2F%2Bq6lH8p5Svya7LhPDwQj32U%2BkDPdyOjAUBe7Kr1oGyUSKFhdq2yLQeZMxhskpYJc1cNMFqgwVuZ%2FhqHV7uhbL89BrX2l4otgq3qk9RnCnNqsN3UVDgvAyXO7ZPEjYmr7lm1BVBWtaQswFdWIWffvYquBZa3VGp85Kvu9J7dlhSNv%2BeTiS3V2o5VH4XVQbPbtq4wTmTWfXq6DQsG0nRil9Sb09pUxfgMNmOp84GOqUBFUb7fOSRT2UhjrJcM4w1d5xuoevu6tg9%2FFnT59EmTI7AEAB7e%2BaT8vDZa81V4k%2F0%2BvRPOj8j8CFskvJfZdTFcrg%2Bdu7jO0KJpGNRWzJ2KPT0r6qa6OjuEm1nGg8jjG%2BbsHgqt3loT8mo54xwrgXsejnScb9qDuXlbJII9OOKuO%2FWKrmXRXNbzsLpMwPqQCE6G9NpO9WkIFr4JjOV9S9NZfjHJ9mX&X-Amz-Signature=711d0a7ae9e71b3dc95c0935b3d8019fbbb3880457709f2aa75bbcbcd7ae8fe4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

