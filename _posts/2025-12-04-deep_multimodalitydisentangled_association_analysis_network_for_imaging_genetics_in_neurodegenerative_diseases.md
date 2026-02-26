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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUDTSCRC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCRQrJrZ3UvmxxEN%2B7EndCf2ZUzfO1Qq%2Fv318yVG4h0fAIhAM%2BLFXzySOyG67hwCC6tFAhZHBoqI9h9ug0CNWbdyxIcKv8DCCQQABoMNjM3NDIzMTgzODA1IgyWA3OjMviHp2QchAoq3AMNlq%2FFPSAlQsp7yKkFNgPfq%2F1EbB3QMhXyeEYhGQGpy8YArQZhof4gj1RbXickxEiOU5bVlqxASzsIQzfMl%2FZyyzFnRGcxlsGnBA6XIgzasuJbgfsBMtvz5ksiOD4uCrcyCJVlRbb05R23R9x%2B1RQRSfSZ9vMoh6Bx6a7uETVTQmDixMhKb13y%2B%2F%2FV3YNBbIaOdNXdsDe93Eof2ZknsOwSNxnnojA4m3JIJ9RqnEuhPgLFPLnD7NMKEpHonpzCT6VTLssTn2kfVol1WPOUMtwKRAfO2mQqk%2F8b9SCj23J2RZfAL%2Fi55dTyReWD1%2BUYGd9%2Bl0jytpVRuNuNKByK1pqCahRuO2nqT4WignTGziHBfdwYccxw9Jv2ycSRjzO5o6omXTVKm2BEc51xqctu7pW0ffP7J%2BDnW80khL%2Bg82Zo5eKCyPca8v4gtjfjvrihyCFzHvm597Cpkw27Rt59YST4pu%2BnhS4VwSvb6Z1RHBB9gXUsz7MfXseXjX0ZmPQPH6UvQJfPJoKuuXvbYtM8mgfZIQmtK%2BpZdSH7n9mP4zU2N5%2BZFN0Qt2MQc2eApx7j%2B6%2BIymmxzAaBK7Miu4KmTk7r%2BboD4G2gEyb%2BBT2%2FfKA%2BcXr79BsfYpKU1%2BeQmjCw2YDNBjqkAUZxp%2BhKKI69Js%2F54eXcJomYvuIUOVxAzjyiS4TNp%2Fmw3U91%2BwVkgp5k99JLcWYBIBWv47t82lxWApAFb8ce3khstek%2Bi0o8biSlvfPF4b2rOh3SaAHUlh%2BP%2BB09b4fJR%2FMhjcluywrdpwybuwiaIYWLZTWYFF9u4rRP%2FGDTYlSffMNgyTQT%2FQpeXaP3V3CkN59tvELwCMtw9jrnIYJS08SG7Qsb&X-Amz-Signature=c55f46858b39a2a3ca75ca18fa53a8cf0dbb9e9ede00aa96ad3f80dd13352f78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUDTSCRC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCRQrJrZ3UvmxxEN%2B7EndCf2ZUzfO1Qq%2Fv318yVG4h0fAIhAM%2BLFXzySOyG67hwCC6tFAhZHBoqI9h9ug0CNWbdyxIcKv8DCCQQABoMNjM3NDIzMTgzODA1IgyWA3OjMviHp2QchAoq3AMNlq%2FFPSAlQsp7yKkFNgPfq%2F1EbB3QMhXyeEYhGQGpy8YArQZhof4gj1RbXickxEiOU5bVlqxASzsIQzfMl%2FZyyzFnRGcxlsGnBA6XIgzasuJbgfsBMtvz5ksiOD4uCrcyCJVlRbb05R23R9x%2B1RQRSfSZ9vMoh6Bx6a7uETVTQmDixMhKb13y%2B%2F%2FV3YNBbIaOdNXdsDe93Eof2ZknsOwSNxnnojA4m3JIJ9RqnEuhPgLFPLnD7NMKEpHonpzCT6VTLssTn2kfVol1WPOUMtwKRAfO2mQqk%2F8b9SCj23J2RZfAL%2Fi55dTyReWD1%2BUYGd9%2Bl0jytpVRuNuNKByK1pqCahRuO2nqT4WignTGziHBfdwYccxw9Jv2ycSRjzO5o6omXTVKm2BEc51xqctu7pW0ffP7J%2BDnW80khL%2Bg82Zo5eKCyPca8v4gtjfjvrihyCFzHvm597Cpkw27Rt59YST4pu%2BnhS4VwSvb6Z1RHBB9gXUsz7MfXseXjX0ZmPQPH6UvQJfPJoKuuXvbYtM8mgfZIQmtK%2BpZdSH7n9mP4zU2N5%2BZFN0Qt2MQc2eApx7j%2B6%2BIymmxzAaBK7Miu4KmTk7r%2BboD4G2gEyb%2BBT2%2FfKA%2BcXr79BsfYpKU1%2BeQmjCw2YDNBjqkAUZxp%2BhKKI69Js%2F54eXcJomYvuIUOVxAzjyiS4TNp%2Fmw3U91%2BwVkgp5k99JLcWYBIBWv47t82lxWApAFb8ce3khstek%2Bi0o8biSlvfPF4b2rOh3SaAHUlh%2BP%2BB09b4fJR%2FMhjcluywrdpwybuwiaIYWLZTWYFF9u4rRP%2FGDTYlSffMNgyTQT%2FQpeXaP3V3CkN59tvELwCMtw9jrnIYJS08SG7Qsb&X-Amz-Signature=c55f46858b39a2a3ca75ca18fa53a8cf0dbb9e9ede00aa96ad3f80dd13352f78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X67CVSEU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDCGRneftorhOiPUHQjDk3%2BrB%2BlYA2OJSD8mPxSp7yCJQIhAPUTJ1ZXjLNuHPbNGv7PIIsPkuMlm6Z7eHJBnx9jxIi1Kv8DCCQQABoMNjM3NDIzMTgzODA1Igz6ogPh3kUbru3Td1sq3APx5PE%2F26k63Z4Nnx2VdNrpVCNukWl6OkupgfJp8aC3mlmcaeTw7MAFNMRBuTcUlVWaI%2BIOfx8CQP%2BQ1PpWOQJgi3FH%2B0tv0Lql1pvHSVkXYZrf75YiD2M1b9weFSo5k6M0xERZ9YZe9eyIN43gVeX%2BSHC%2FsTI%2FnxAvldMBRrWNzAqdzRIc%2FQyL%2BtLqN7NiXi5FdQlhbaW7bjJTb9jpRvBzAanZ%2BkY9mdMsvr9As5NpTqnJqfuNDRmCZFie9v%2BDWTjaydWGYAZeOl71BdMaf%2BiYR6FDf80naCTrDXSf%2B2HP%2BqN1a5Jdye5GZCXDWjsna6oVM3xhPpQY25QDvuRcGqy%2BU%2BayNgZ9LaLSXgfyJMO8bzC%2FMOaPkg9c8psZ3lzUkTre42ccTDAXbYDMJCPvDn80wuvm61tPuFS1brQgOQZm18foKICHkCtSJTVz2mDGi1VLdzGS27EEduqpQXQKDBTkhbgD7VF8rfJD8yEy2xa9LZHHkv3iJUICiixO6FM3FQYNX7h0p%2BcTFldmZR7%2BU9RyALhTXASdxFjr4SWLpRjvxt%2BdI7jm5CEZ2pUABnA%2FDzQxnnuWLRJxyLFTIJiQz0ZkWvO8AvWt0uFdNamlj0aDRN7TSbJzO9hpaI%2BM4TCy2IDNBjqkAfxHsJbjxED0ponfPBt%2FeKGiHd4XBnhdxwauJZ3OdKDaLxKUbAo%2FhbWB4RLQ7AOpPMEJfF%2BCGCKAU41Tdsje7VIDUE1TENzcFni5RuOgY0QdikYkU%2BDulBls%2F3zSDDa7vruj0A7tC10EYn%2F3zDkWuTHP8AWqjN%2BTlZ004PFhMvNyKAUmvKMRH2E%2F9%2F4KGFWdyJ87CEFBORVUdys%2Bnr7qX8HcNqnw&X-Amz-Signature=42d3f6498a7cd18c89956064819d191d4a631a698ee2fcb0a7ed8b4ca3dc442e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656JLKDNE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBRVxc250IjeYJIcPpxtVqKTL5Ex5fO8pJWmg%2FuvjtniAiAfGOAT8FcV1yyLN9RhMazPm5aZLjifCGRHKNwmQw5k%2FCr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIM9xee5KbSf8TACrCrKtwDjkhDxZhHkUG7gWmXEt6p0JqPqFAdQiXH%2BWcunv9laIWk6wT3ARAd%2B2oAlvPIIdtwcsn27pmlkSSTrYHfTj8vL5M7pEZkC5JaaKKYmLH2jl%2FSwBkX9yEnbJQUu%2FLhJKaIcVfeYCz1ZikKF07WKQWmkSqq%2Fa%2FrGtF9hNga0U0GX44UJKBy7SG5fZW6r2gEJVLvKpAYa%2FUUP603aEAzag1fkikJn5EbuqEZ2wQ2fNFRPW5RuUKz9yeDuFTmgUrW11oPsL7BxRVxPzk6ujnt7A2RtaCfKbya%2FjoNnA5hPR1vT1wOx%2BduyFD34rm0Tt9NdoMLlpoZD8XUC1b7GjOD%2F5oCraprrpDNSPAIMeApzxEHY9LUl2Dfgf4S2nxUOwA6QOjfnS%2FU5eUFZqBfa3%2Bc0iefjYts3NHpDUHNeqAhwFw2dRxF5vrVipsnQmCbhEH3PlpcU4DXhmps9alHqV3G%2Fg9Phx3v47MH00IgHO5mOjr6I2PSwLZNR4KOh1JLYXNxy6CnmlwrKcXXLu1WVGvGri1B0wGsd0mvnotarDKBsBuBcQu%2F%2FrLn2jMU0eSerK47UFgQ7nv2GLY1K1dWCILqRlaHqNg7fMb8f2OHYx%2BD8dDLsVx7Y16wwIfBHEe3aaswmNmAzQY6pgHnEeE5VY2Nr5%2B1%2BGaiuxuERZ8lB0d5CcvAOK86TBzgpLSJ8XTo3js6l%2BWdURLuFiD2ZrVs9cdAmrpGhaKRwJHYTFptBLOORd9yquaefMbumbl9tFQZ%2B4xPPAVo5Ho8EUqhg6Zi56HxN3LxWC7dkanM%2BAWD3bSPJ4kw%2FI1AH00r%2B6ZGrL4QqPP1Yfeao6xv46sWpLj9YQPWCuktygra35aQqF%2FLsz%2FD&X-Amz-Signature=103dac114f371c11f36290e7ca8e9129431a1954cd97b1540e2d11e2d806dc82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656JLKDNE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBRVxc250IjeYJIcPpxtVqKTL5Ex5fO8pJWmg%2FuvjtniAiAfGOAT8FcV1yyLN9RhMazPm5aZLjifCGRHKNwmQw5k%2FCr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIM9xee5KbSf8TACrCrKtwDjkhDxZhHkUG7gWmXEt6p0JqPqFAdQiXH%2BWcunv9laIWk6wT3ARAd%2B2oAlvPIIdtwcsn27pmlkSSTrYHfTj8vL5M7pEZkC5JaaKKYmLH2jl%2FSwBkX9yEnbJQUu%2FLhJKaIcVfeYCz1ZikKF07WKQWmkSqq%2Fa%2FrGtF9hNga0U0GX44UJKBy7SG5fZW6r2gEJVLvKpAYa%2FUUP603aEAzag1fkikJn5EbuqEZ2wQ2fNFRPW5RuUKz9yeDuFTmgUrW11oPsL7BxRVxPzk6ujnt7A2RtaCfKbya%2FjoNnA5hPR1vT1wOx%2BduyFD34rm0Tt9NdoMLlpoZD8XUC1b7GjOD%2F5oCraprrpDNSPAIMeApzxEHY9LUl2Dfgf4S2nxUOwA6QOjfnS%2FU5eUFZqBfa3%2Bc0iefjYts3NHpDUHNeqAhwFw2dRxF5vrVipsnQmCbhEH3PlpcU4DXhmps9alHqV3G%2Fg9Phx3v47MH00IgHO5mOjr6I2PSwLZNR4KOh1JLYXNxy6CnmlwrKcXXLu1WVGvGri1B0wGsd0mvnotarDKBsBuBcQu%2F%2FrLn2jMU0eSerK47UFgQ7nv2GLY1K1dWCILqRlaHqNg7fMb8f2OHYx%2BD8dDLsVx7Y16wwIfBHEe3aaswmNmAzQY6pgHnEeE5VY2Nr5%2B1%2BGaiuxuERZ8lB0d5CcvAOK86TBzgpLSJ8XTo3js6l%2BWdURLuFiD2ZrVs9cdAmrpGhaKRwJHYTFptBLOORd9yquaefMbumbl9tFQZ%2B4xPPAVo5Ho8EUqhg6Zi56HxN3LxWC7dkanM%2BAWD3bSPJ4kw%2FI1AH00r%2B6ZGrL4QqPP1Yfeao6xv46sWpLj9YQPWCuktygra35aQqF%2FLsz%2FD&X-Amz-Signature=46a0fda2621f71a0d332e55ad43b2642a5d57d32c89462bee3efd1077ba9b228&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDS23AVS%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCvIFWsetvOVPMOF7ZYJAUDzMojJddp%2B%2FpW0aO6s%2BpcpwIhAMBooXBLPkLSHkYYbwWHcAMtIiEkCRMvx%2BZw8Cpw2G%2FSKv8DCCQQABoMNjM3NDIzMTgzODA1IgwP%2Fmy4d3H75X6PR8Iq3AMHXdsP%2FCO2i1kvV3gp3o7XJ2dFpLyseygnj3GYO3xmaHZCfPGEU%2FPfParuKkgYYqmhsndc6YVXL2YJ9LbcnEBRKnzZDgzkvoD8%2F5xJIAeooXPlhU%2FRPwann83q3pGu2Zk99%2BXvNzLjl7MGkfjk4gJYSGGgxI7FedUQuOIyMK5Bmmfb4CBHoECEdJ%2BFkvmt%2FvoTZy0PUnh8TbB%2Fx78zJsveaLD%2Fe1nmux2QQrFofR%2BmlLzdl09FIt3OUBCWVs9tCUKGLQOMHWMJi1gM9FdJQ0c8uohQhzqYkt6H0AHsdN1hcRRreeaGFfC9LVgB%2FwcnrJxP5fInizYmpt3KaD4izeZYExZE01FJzaJxdkofPQ4zxRylPeydMuqBwobTv2X2b9%2F6qQ7X8Jt%2FryYywkaF8QA7D7Gn7xpC%2B6cKfjC%2FHfpsHKLGdtTsNQdy8oJH9znRSLZNyTkEpY9LTWaOvCKCK%2FeyJoFTsxdxf4fO8xQuHLkkji%2FgAMCJtO3h%2BqWru4pjxGC3DdspcuEzDRg31uLHEB8YXAmEN1fwIDD5sEXjaPByoy5fflZBxQFuvBpSa9amFcY5nouCb5KABl%2B%2BCmnd6YGqLTIcudwQAOHlNUi0SrBvADWma6PlR9dRr6vjSTD%2B2YDNBjqkAROrLh2reWwtlQQgpZEThJRsnrqWcNTDS71B0LRjC55ioXSnRQHap2l6B6xSkNkEslPL4igy5RyEPB6qObUBx7J338XL7QaYdU9HOeL9dXvVJqYVJ8OUrjbDNIC8IpSWbQaP8qRk79FEzeTsJgjoQUy%2FnfW3DvlIgc2sUV4D9qIDkeBe%2FjhjLmf1LrsUN5ygvioEQDZlieaHzQAUNvEtSc1E%2BZpX&X-Amz-Signature=32c025f23bb22af5d5bf7e58339c327e5e75e7cdbcf1611ee6c127b3ca415a15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBJPW2HW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCU3NfNwltasg1C05587OQfen954h5Pa1rt4vXrG6tQ0gIhALV8zA8b1WiA%2BVVBnd%2BtUu%2B27sKS%2BXAM%2Bp7e2YQPCOBpKv8DCCQQABoMNjM3NDIzMTgzODA1Igya1M%2FIyc87GDHARZMq3APoGeaE%2FTyc0oUwDbqeJVfDNsDY1AEdBURFgKtoWt8oIv99kM2re0pE5rEUx0qnGZc%2BWpaXmYETDg35jA2fYUJAFtq2wKNpuYbzjHnzKbl0hz%2Bg%2Bk18f%2FttiLMkq6So3soGJihpXvIbXkqatngq6DuHo3XHRxtGyII6hPMPv02SndhkMi9UpOi3%2FWNtWKT8Do47Xw7ibLcgoMOPJCukc3nkyo7JFonZa%2BlHMW1MT%2B5Nw4Q4c2TloJtJZBWcmBYkwXOv%2BVBOX4q6N721AtW7UYzJmLQMm8sWPhHb%2BjrYZun97sfbuvj%2Fnqa%2FnunuJgrwjwohIPW%2BaE9h8MwNO3AtoNCetboKdBhuujnrz8%2F4dqUvvSfPZVr7c1v2aM44Es%2FBkQVDO9fClwxHkjTUBOe9Y53L%2BsCqkfbWiG9gvRRTkk%2B0YtVCeuAZYoayNBQLco9IJs9UdIipDS5tdD2LbU0dLd10WuSuVqnDo61EzCzXNcDG2Z0EJl3oYPRXcHehNArnDLx9bU0b7zvKqHciDs079hlZZKY4LRz1mjZqjxV6PFcuAUJoDddk5OQvxqeRXCPX%2F6pj%2BImRc4CC5Q8e5rQoOYqRc6oH%2BxiQi0F4hTWJsiJKeWCXnlTxlLIJvb%2FbCTDL2IDNBjqkAZ8AskQCQXEWUKMJZFR5WFJV%2F6S9VOiNE%2FRF6Lz9whIaxO4L9QzgDM4pf%2FBCd%2BZqTCl8bajuDU5YIzEqxAFWkLs77P9PfSW08%2Fa3qoVT%2Bad30qph6dtOFm5RnokUpDKzyz9tY4rYBMZvHTG0J6XkkVZ9y0hwA5JI5FTr5%2B1BDFEac8Nw4olPPPL%2FPopeSRu9%2F9%2FlzSw7EPvZj%2F5kbs%2B4gW9HnhmR&X-Amz-Signature=3d403ecccb4dee6fa72d1d91cdfbd1b099c872f42a47790dbf91a24efec757c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662F6GB5EL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQD1tYaLS4BZvNLbz1ravXwRmDEOHAwIUxLeE0bbIi7p3gIgTApniB37Ai3KIHGv9y80XMzOH2Lu0L4bbIvSWN36lCwq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDMpYiJflC0lU1toJLCrcA%2F3Ffw2Ooo1s2eGnMhDhnuK1%2Fc3Ep1M8qhSfq52%2FNQiJvRaPRs09ZAMH1%2FUyyWwuU7IwVJGEJbJW%2BL8Gpdeyk1NNXHnBHzQD%2FN0EW8d1zN6F0bJujOJgZmxZUgakDHwOgRfaGLHi%2BtARH5GzEu9ZvVpZyJqy4SV%2FyYz%2BZ7KLqvIcYGfNmUKVDoreBUMQ2yBIp6f6%2BmgOryzE54GzcsHoREJevG2WSbi5W8u%2FolhmqzGqmzQjkfzdEgZGZI8Muf4kDp7PKZvPvN9nKuhmaM1sUxQkskA8%2BdqpF7Pe02L5DkDfQH6MRS6byhymvZ7aPaoLvo35L4uBZ9p0FRsZp9Q%2BjcfKYLmG2jyraheMqTknfuxwufkcp2ij0U0taO0BxtRwxhlVJvTAU9Kdl5bYND%2Bf4q59uagGZcMKGMB%2F6Ng16mLimj7Y3JBpY3ppjrOsP0K02uRNX%2BgwL8p5KMNJEYQQgZEo8Ojjao1%2BQ0L1%2BaG9VNChbQKUcv3Kp1iBP21JG4wdTpFj3e6i6wkY19jn5QSLszg5%2B0pXYdt4CBn952qPjiQ08Jo75D9Ip36V27ZTWh9urTD4oktk%2BA3zWBjD0TsNSym1S%2BqSEHf5lZY2%2B0Yucr8b6YzrOHFOUX%2BDNT82MLjYgM0GOqUBOA%2FnmQai3jEz9aJxaXLwQ8GDOEGYjtnbWjdTMUUXghP5UkktnPW%2F4eLmci4CR%2BKMYbuKFrQ%2BawGvJDLvuAzcdfNXYD0glKpaZ%2B0VyRaIteRH2FkCJSbb%2BG8icSxanyLJ5JNkXxncpDQvxjh%2FS06GUO81bhM8yI%2F4edZFL4iGlW%2FFpDw1iI1jKgE36%2B0zDUKoEklV97bU08ZX8he4pmhL6%2FfWlI%2FV&X-Amz-Signature=e73b23ac74ed28593f18aee025b74c830a204b168edac2e5966dcf5426a689d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VLOT53T%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIH24yJdRb%2FYK%2BSpMQb%2BLW3OeVWfuFzcJCffbValT7UF6AiEA9LSGhKPESQVKkMIadiR1WpS8B9sX%2BhzMza8QfjhWa68q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDFnoanFdrR9ZOBFyMyrcA54JRwQPLUlHohEZzAtNAd6pGLraJ74%2FOeLASXyJbIWJbKqMghTG2EeK4uglhUYeF8fXiGN8dt4SV1yTU0VslwUD%2Bc1gtae7sk250%2BTzU%2FqM5PGUxoFp78Xic3GeJoxb1Djq1GIhaefi%2Bz0ngjyYmG3bjgCLjZyF6wnQp1jEiAfcetQWrAMwiQzFWfXaDtsk8mqmkna4G5S5RZUOTrbGeuh1TkDS63csAnFD2FzohFhaXuYJEnPV%2BB8uurXMa53LkKrGr4ShnVvCV0Bwd2FO5RsApRP3JvXTj%2FGasksdA%2FWLO9n04jzftLOV6Zqn9lMLlVXe4GTvL8pvZ1quiHY02sJsatWqO5Xs5YI9y9AeshiMpRjQM1ZcPxteJHF5qXchtV2uDKRZXTb0XoE2Fs%2BF6Rvx4mtA2eQB8ZmsbbjlAfsmFcuHynFA2xtjyE%2BFny%2BipoxWJyF7xQFbRJRKeggWZmkCjjNi%2BnhSWmzjpRxkje1Bd%2FLzZhELwYLYKAIR4Ywpkrg6wS0ML7gcg9NTArUoTDeSlrkWlTmDlZrNb40hST7lZHXpDrD0egmcQSlzqlFG1doHvCnnLdKaXfZhNtQgN5sQNCthq3t%2B0ba89yidtv%2B3rnVNuWh5JG7q9fpSMIjZgM0GOqUBHLAh5jRlO1dKJCNLZj1m3aACRS3J5M2VMRmVYXZl3rLtZfHmkTWVy4IXrw%2BT5C01Zl28RUNogDbbt%2BUayx2QksML3q8JAAdzgMFQDTaL4RcyXoWSrSvJa34tHvxW2Ve6z3lxOKNvoW4rXrkwas0dmHLaqs7kd8c5K%2FnoEGHDoD66Tqx81Gu42Vj932PUujpOTRtumyPABnQaahXSwCiya96X%2BeRg&X-Amz-Signature=1f7bcea370a0af7a8ab83c04d90d525e4649bc61882996c4c8c340d189fe05b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VLOT53T%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIH24yJdRb%2FYK%2BSpMQb%2BLW3OeVWfuFzcJCffbValT7UF6AiEA9LSGhKPESQVKkMIadiR1WpS8B9sX%2BhzMza8QfjhWa68q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDFnoanFdrR9ZOBFyMyrcA54JRwQPLUlHohEZzAtNAd6pGLraJ74%2FOeLASXyJbIWJbKqMghTG2EeK4uglhUYeF8fXiGN8dt4SV1yTU0VslwUD%2Bc1gtae7sk250%2BTzU%2FqM5PGUxoFp78Xic3GeJoxb1Djq1GIhaefi%2Bz0ngjyYmG3bjgCLjZyF6wnQp1jEiAfcetQWrAMwiQzFWfXaDtsk8mqmkna4G5S5RZUOTrbGeuh1TkDS63csAnFD2FzohFhaXuYJEnPV%2BB8uurXMa53LkKrGr4ShnVvCV0Bwd2FO5RsApRP3JvXTj%2FGasksdA%2FWLO9n04jzftLOV6Zqn9lMLlVXe4GTvL8pvZ1quiHY02sJsatWqO5Xs5YI9y9AeshiMpRjQM1ZcPxteJHF5qXchtV2uDKRZXTb0XoE2Fs%2BF6Rvx4mtA2eQB8ZmsbbjlAfsmFcuHynFA2xtjyE%2BFny%2BipoxWJyF7xQFbRJRKeggWZmkCjjNi%2BnhSWmzjpRxkje1Bd%2FLzZhELwYLYKAIR4Ywpkrg6wS0ML7gcg9NTArUoTDeSlrkWlTmDlZrNb40hST7lZHXpDrD0egmcQSlzqlFG1doHvCnnLdKaXfZhNtQgN5sQNCthq3t%2B0ba89yidtv%2B3rnVNuWh5JG7q9fpSMIjZgM0GOqUBHLAh5jRlO1dKJCNLZj1m3aACRS3J5M2VMRmVYXZl3rLtZfHmkTWVy4IXrw%2BT5C01Zl28RUNogDbbt%2BUayx2QksML3q8JAAdzgMFQDTaL4RcyXoWSrSvJa34tHvxW2Ve6z3lxOKNvoW4rXrkwas0dmHLaqs7kd8c5K%2FnoEGHDoD66Tqx81Gu42Vj932PUujpOTRtumyPABnQaahXSwCiya96X%2BeRg&X-Amz-Signature=a89c4d0422b9ba45bc53d2f06097e1b1f55e590fc6a501759a37d9c4bd012045&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BDFYDIG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCmC5xCdCiSfTCDOtBLUUC6EEGcjxSd7f07vrgKaJPskwIgEXiih0lXHpQP91harqZXZAy0iNdERkyN4schXPBdYtcq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDJVRgTTlhlY0jNv%2BUCrcA7djbnanB2CEw2RY5Zu24G4RiCPI9VtlOv3Q5ohmagHJyn80Dz%2BZJ37UXzXuQQvo1nPGGvAOeMVlN2uqRrdAd5Lzqxu677bmSxj2U94rBtsBO3mtohH6vISHGoEIcrIG6fCdQmoqVDQmM9n4UZO8ktlC8NamvZm7NIVciTI%2B%2Fw4Zon7NeYpKgIjT9R0EaQdVcKYHN2tl%2BsotW7oenX6gYKO55Y%2Bw09OCjS8u9cMKVim93XADjUzq6W3TWo1%2FYgfqnJ0oUW5PW8RHHB0sR6FPDG8sowbccLBS066Tu2nQrGyONpvv%2B4HE4vAzPWuhoYzcxH4U2fnDFOYsFbSQhNaOJ9P8r9EtuO0cJ9j17r8n8s0kabwKhgDU9QbWRuplx4%2FWsmF8p9X%2F%2BGp1tRbkof5pyVxn3wb6ujTR60TYFHZ4QyGp0mNhEDZUCBhs28GPcGafcbxoyZ3pfiU%2Fn9NGzZ9sSBOHTM2L9i3LSndrSpaGlBW56JUGI%2BDhTIu0t%2BV7zIZT0M6Fz8KeQ85%2BoGGQGeN1lt6S5Dopscor8EZdsz%2FgOtljZonOgtzrskPYibnY041FkdlLyyU%2B%2Bm3G%2BoeXkjQNyiH%2BI70WD96ZQvVgw3XrO%2FZu4qoiaVTmv6CloPU5MOLYgM0GOqUBMglucRuPomA%2FsiioKVIN8s7L%2Biz59wlCBwetwTyG%2BG1YWLZ72%2FaxrIE1Bp5kQ%2BT3OlefPVotBEm7T7ZUzb7iO%2BD4FBQmr4PZCnacZMHUgebYCmG0N6itJCYVFj9scc480sUZneQnrhFfvqnBiABNqeSh2oja7DwOkgB2qeF3d%2Fe1nj6Aqp%2FCGdn%2FIo2%2BvOGnwC3FkR9MInbta0e2fZvVOTzm%2BBD3&X-Amz-Signature=d306366c3c73227ce7a2c32289160b0f8d10afd310e9d3c73da0a383b2b312c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RX3E5L6I%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCMN%2FN85qBab%2BJgP40xcsNE78uV3RqsTiN7RP3ls6N0%2FQIgTeKhbiEXQjE17qSS%2F74APvylfIOqQk70kDeeRMkowAYq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDA4p0wp2j%2Fyif1gKlircA8iPQ7ezbC0yraWldDshYRmGO0rA7vyCxGAk2Q%2Bk62Q7Ua5wCRpqw3tTe3cs8g529VdfU%2B55k7BFP5Fh%2BrgszW5o75ZsmPSZvKzluNOfU7NNBvIk3G1uWWiDjF1s%2BrYXXu4nLYZI7BYgWE2Cjf8tYbCPgsc0rNMSkMs1P7X8zzw9JRB5j6plPujvxZXkofOjD8pxRtrtAvCUoMny87Zhj9%2BaUBDtSjNF3lIAxBCGqEwO2mZqY0%2BfocIpn9LqdBeXm2WT03zLsMS%2BTP7uqC7XhwdjTQa4nXcgzfS95rKn5Fl9YPfMVhwOJyMIv%2B6GubOF9mUELokweC4LsJBA%2Bwt7uwx8yLVV62qNvu5mx%2FOA265GPOTLDyjwjmYUNUM95eSJxqidGG7rM50Xisoo5nL6O43pXTTtMaFRTqnN0l85Ht8LRpvihO8g8Rwxzi5pSERImT59vVLWFcoi2yh51U7eir2bb2t%2BP6kaLYNHZCtadAdkwXofBpKr8PKdOPizBhVy3yE42rEDdizMYk6YT7W9jzoyZp%2Bm035J7fZgi7pylVzEo9VcpG%2BwYnwEvg8xcY2G%2FDPXEx5%2BJaB4pEYy1YBvLfMhPaczr5%2BnZevTXVfc6L7yYpft7c%2BDWPT2C%2BH%2FMKLZgM0GOqUBYpJwjAhdp8As7ATTZTRGuWJnXlQTIegsSjQ3txTM7oc6ls8z0s3dRS2U6G3c%2BzWFUaZQcbGwbwocI6HZso12BHlzN5VQDsfJznm3TymPNNFlRtZ0W%2Bas69hGbhNQH0VV7qihXzUeiHeaVSvk8Yzc%2FzZdd53PgwD6k8WRSeL2nps1etsL%2FOFZD6FwUJefBIhVR%2BiRFHgeG9S1YszKssbAcI6VKLu4&X-Amz-Signature=c33c1d0309037f7f2f9746d6f6ac057779b6df5dc44363775755903ec4768965&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RX3E5L6I%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCMN%2FN85qBab%2BJgP40xcsNE78uV3RqsTiN7RP3ls6N0%2FQIgTeKhbiEXQjE17qSS%2F74APvylfIOqQk70kDeeRMkowAYq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDA4p0wp2j%2Fyif1gKlircA8iPQ7ezbC0yraWldDshYRmGO0rA7vyCxGAk2Q%2Bk62Q7Ua5wCRpqw3tTe3cs8g529VdfU%2B55k7BFP5Fh%2BrgszW5o75ZsmPSZvKzluNOfU7NNBvIk3G1uWWiDjF1s%2BrYXXu4nLYZI7BYgWE2Cjf8tYbCPgsc0rNMSkMs1P7X8zzw9JRB5j6plPujvxZXkofOjD8pxRtrtAvCUoMny87Zhj9%2BaUBDtSjNF3lIAxBCGqEwO2mZqY0%2BfocIpn9LqdBeXm2WT03zLsMS%2BTP7uqC7XhwdjTQa4nXcgzfS95rKn5Fl9YPfMVhwOJyMIv%2B6GubOF9mUELokweC4LsJBA%2Bwt7uwx8yLVV62qNvu5mx%2FOA265GPOTLDyjwjmYUNUM95eSJxqidGG7rM50Xisoo5nL6O43pXTTtMaFRTqnN0l85Ht8LRpvihO8g8Rwxzi5pSERImT59vVLWFcoi2yh51U7eir2bb2t%2BP6kaLYNHZCtadAdkwXofBpKr8PKdOPizBhVy3yE42rEDdizMYk6YT7W9jzoyZp%2Bm035J7fZgi7pylVzEo9VcpG%2BwYnwEvg8xcY2G%2FDPXEx5%2BJaB4pEYy1YBvLfMhPaczr5%2BnZevTXVfc6L7yYpft7c%2BDWPT2C%2BH%2FMKLZgM0GOqUBYpJwjAhdp8As7ATTZTRGuWJnXlQTIegsSjQ3txTM7oc6ls8z0s3dRS2U6G3c%2BzWFUaZQcbGwbwocI6HZso12BHlzN5VQDsfJznm3TymPNNFlRtZ0W%2Bas69hGbhNQH0VV7qihXzUeiHeaVSvk8Yzc%2FzZdd53PgwD6k8WRSeL2nps1etsL%2FOFZD6FwUJefBIhVR%2BiRFHgeG9S1YszKssbAcI6VKLu4&X-Amz-Signature=c33c1d0309037f7f2f9746d6f6ac057779b6df5dc44363775755903ec4768965&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637ZUGH4O%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T113022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIB%2F6BPA1Yzxi52rgay8Y%2BFNMBf0DbGwL7zY7EPAQZ6G3AiEAp%2FUsFe6Tb5J41oUWRAAys5SUp11O0sisMnIxwF8x1sIq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDGIHwVmok9UHuJIYiCrcA5eBIieortVjVdEJUvbxtrgM0jjEFeFYRxOejUFcakR9Fp2%2BBa4DejScamO8pBpSL%2FE1NTRupDHroj93rwTpAv%2F5ap4H363HEz4Dbv0E%2BOLNbUoA39VuIfr0I%2BbYFULhwtB%2B%2FC6sOavGc5qibUT2E6d23LZ3ZtQPGc9rHmszxSt5yZ4zfgpYVq24eP5cIud7aEHMjgLCHy3nKezCZCnxGjiaRA3R490g2gx3o%2B8h%2Bn507O6xXMlNJhpa12sQVUNHo0RRcFJoNZbxEHyPUPYsDtXZpDqjnhlo5nipIrlT1WH%2FILJgmx8hfn4FlQyUMbRn%2FxlWfz9yJKivWmBHOp3KM2a0%2F4S09IYxh41bQiIe8GokDuFiE7NRcBZYRQykQj8gm1Ju1Au471bCwDDxHmOtmtlgbTvvVuaQC4n8p2ogftDGg0ojpFkH7rnLUEbJ8kV2V9%2Fpb8nc7O1qyEeRs2DxPIQG3C5UlLzA2xRbWlGWNbfKnoBweFhG59wP5Fvy1bANLPgf9EhT%2FRfFGPe%2FoRt%2BfqH5Hcnon0oquOeNFtGQ6J6CEX2sDFi3eiazxVtrfh19uWd1oT3D1jQWwpg2kLCBp97Dci1leidkEGm7mD5jPbMZ1DSiBr4WM23%2B%2BldvMMbYgM0GOqUBKw9mJqSXEoIjrQEpL6bIQYFgYZ7mTc%2B7Nhhe7xVEC0umZFDB%2FcLu52haZjoPOTfL5g88MttxWLGNPehbT19GIR%2FQSUeu4jOV8h1a8DaFHc58TTLa7xdxCAKxLrKJ6FjhOWTBhG3lYMhtSWWMuvXExfqgDkdae6SumYe%2Bj2LWz6QSpRkKEOSys2fPOpT0x6dKvmaXRqvGvA2MqZHNMT1FJnuhRa2p&X-Amz-Signature=9da6c722f03baa2371e38967b2a0654676c7917dbac54fcc0fe7cf8366488202&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

