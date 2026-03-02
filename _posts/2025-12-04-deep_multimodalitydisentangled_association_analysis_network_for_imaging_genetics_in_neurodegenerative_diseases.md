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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMRLTU22%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FXGNl1iFwkRADD10mQLS8sjzdD318TmfOneItRtR05wIgQu%2FASEGyYfcy6cDdWjGMk%2FI8W199HHzf%2F5Agb6dk9dMq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDHwBxsoBrxNQro1XUCrcAxaigDHnoTRPktCQTrfdq83732vhn%2Bpo%2F5Y%2BLKpZs%2FmNBZX4frRF316ZRb154PZHAAprF%2FENtaOueU9ii1eEDR85G1RgAKtdgxMiDa9Fkf7xuyb7Cy35maF2qb%2B8zRZZ7Cr5iaZ%2Fvv73q6glnedHcwN7zVSe%2B3lsaEHkOczntJfnf%2FHyp9Ei2P36SJwhVNvfIMbxksYHBuT%2F4yIKzFkFbMcx35XsSXTujiM5eVQSHtHjYQH5thgbFi%2Bmoui%2ByyBSDy%2BRjT47X2fHoSgAbT7wT6XBjeYCBUwDlNRG0HTosGxI6UPT6rufyEbi3BTicW7njQ%2FoY2ozzi6AwRjBNjIk54N%2FhLuGsf%2FnKutyyJV198IsLndWLACG03IVr7MuQ6WPWYRCwVwYs%2B2WzccVNk4YGdb9HtydrJwLUEvxqBgZohehzAcO6B5hCtIX3d5ap2PYFFKZ3GLCuGjvylle3Y9XBJ32JOXmDXxXnxhJeT2UjZ%2BAT3SziAmeHzXR1mHSbtVJzBwYtYhgy7WGGvS0ine3eJihnQ5PIyIUQQrvO7fmDujgxfXSwjsQsrB6Up4u36w4dle12sgJRWEwBPY1C35AoiuxIXipGDTCnMcHsBLyyeHpzDF4xMGwm%2BApYXVNMPimk80GOqUBK2xNo9eOl6EnYAQkeUCcQ7RT%2F4nbZ%2BXDbUhGheXnklkXijICI%2BsF2RR%2Fg0LrE9llDArlqy%2BEarc0C2A1d%2FevFs8uZ9iRyfuRDiLGnoPGwvhupd03iwc5gWQ3%2FTlqAbxxwjEQa62dihir1wZs5LcJwqjX2Hx0qvHKBAvqY3zPBsv%2FLkVpnBcgWJTdMs5ziIOfdEK8kbUiOaL%2FPcMUyaf%2Biu3ghxoH&X-Amz-Signature=50b9e055fcdd65e72a6bed8ed54af4e9b49718e9280b0d1e195ffa64ca24266b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMRLTU22%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FXGNl1iFwkRADD10mQLS8sjzdD318TmfOneItRtR05wIgQu%2FASEGyYfcy6cDdWjGMk%2FI8W199HHzf%2F5Agb6dk9dMq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDHwBxsoBrxNQro1XUCrcAxaigDHnoTRPktCQTrfdq83732vhn%2Bpo%2F5Y%2BLKpZs%2FmNBZX4frRF316ZRb154PZHAAprF%2FENtaOueU9ii1eEDR85G1RgAKtdgxMiDa9Fkf7xuyb7Cy35maF2qb%2B8zRZZ7Cr5iaZ%2Fvv73q6glnedHcwN7zVSe%2B3lsaEHkOczntJfnf%2FHyp9Ei2P36SJwhVNvfIMbxksYHBuT%2F4yIKzFkFbMcx35XsSXTujiM5eVQSHtHjYQH5thgbFi%2Bmoui%2ByyBSDy%2BRjT47X2fHoSgAbT7wT6XBjeYCBUwDlNRG0HTosGxI6UPT6rufyEbi3BTicW7njQ%2FoY2ozzi6AwRjBNjIk54N%2FhLuGsf%2FnKutyyJV198IsLndWLACG03IVr7MuQ6WPWYRCwVwYs%2B2WzccVNk4YGdb9HtydrJwLUEvxqBgZohehzAcO6B5hCtIX3d5ap2PYFFKZ3GLCuGjvylle3Y9XBJ32JOXmDXxXnxhJeT2UjZ%2BAT3SziAmeHzXR1mHSbtVJzBwYtYhgy7WGGvS0ine3eJihnQ5PIyIUQQrvO7fmDujgxfXSwjsQsrB6Up4u36w4dle12sgJRWEwBPY1C35AoiuxIXipGDTCnMcHsBLyyeHpzDF4xMGwm%2BApYXVNMPimk80GOqUBK2xNo9eOl6EnYAQkeUCcQ7RT%2F4nbZ%2BXDbUhGheXnklkXijICI%2BsF2RR%2Fg0LrE9llDArlqy%2BEarc0C2A1d%2FevFs8uZ9iRyfuRDiLGnoPGwvhupd03iwc5gWQ3%2FTlqAbxxwjEQa62dihir1wZs5LcJwqjX2Hx0qvHKBAvqY3zPBsv%2FLkVpnBcgWJTdMs5ziIOfdEK8kbUiOaL%2FPcMUyaf%2Biu3ghxoH&X-Amz-Signature=50b9e055fcdd65e72a6bed8ed54af4e9b49718e9280b0d1e195ffa64ca24266b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UJSQJQ5%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEcsOMLr7BN44%2FNHPM8cfF1g6cZgXM3ESWQ1QU4V2JtjAiBIH9uZyy%2FGvOz7mtNNIDzUZnYzsG60AOOxo4lqPgOEJyr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMVJ1%2FKzNm0BLBP1nsKtwDMNjrc4M7heH%2FV1SxgPYZeEI%2BM4bEebUKvBjZdJZlJooOPBCBFlzF1bFx8%2FGfafjTJuBjiwKdfaQVuMXe57rlfaxNI7icJ2DYkhIOo6GGP8j46mK0fxXmZ%2Bfq4SolCaRqtv1S%2BoMt470L2XFed4UNr29NGwrfoO8JSLb7H%2FcVbdzvV2LuQoqhIkX%2BeUgs5Ec73uEKe7SNtoaLUWZUiQ5AawrS2f8L3izH32oGFRrCxepUX%2F%2B0iNJ0JrtUq4tpSZYdZsxKdzCG%2B1XbYWb6v0j92Ot9ORYHphaJoOoAh8scHRoj58pl91Uljr7uFIK9gXWowkhbDfIJf6XpiuKwh5Fxih346TlOGOfk29%2BFpWziAFHvOqBVFY3djPckdP2ISNrrJVU2neNHCJXGBJ%2FSnYAeodzzRXguhAbCfjbwXtPq3QoydfB%2BJSGE6BPLAFlMnTmstczaSOpWe4mA2W5aSOTSK8R6hLAPM%2Fmc18Nde3lPe1ezBqMbRJ%2FDLKKX0n1ra8soIGPEmrKKg1coCX2P9e%2BC0W3zEuDrSG0vagKJy93%2BUO%2F0xXFqfi%2BpXsFHDd0khKejTD5BMdznFKIg4dzxSnE%2Bq8cCOLvXlKyD2In0xWgE0DiXwXiEp%2FQQFHSxRBEwzKaTzQY6pgHPKXzHBCuPU%2F2ROL7Hs63ZN5wGGQ0iHzhc1VXdbSyuKIjBw4MryJVHsLEAlYr6Idv5vz9VK7NQUVimnhrmlY5wvGDnMYHvtkkxAzdOXmrKSRRPcpw41rQ4ARifDJDRAaAYvWhR44nBXHhdg8VVs1p6hIRZIV9JGtdBQVB9Lf4RyfzPnvuyjpPyRd7D4NmVr5BawyfpYd%2F%2F3Ehhx93kEmZbWpNQSJ9j&X-Amz-Signature=6d79ba0f2f7dc770f1e567de20f05cd3d2d8d53c9e593a43bbe0907a60f18555&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TQDIF3J%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCCtO9irpQBEEwzw%2FOSoPYybbbbFFvj5hQVaMAfRBk8iwIgfTxuwf1CW%2FAWLfwa5Ekq9BcB1%2BbF4LP7Z0s8zcwkjRoq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDPSFRTC4nW8eB0Vd5ircA6OI0palsNUumcvQDYd0RbFYS3Ec2JbW9GpVbYYcicU3RkdbhVJVHgjmDt%2Beyb4rAjjLqwJSx6%2F2AN%2FXOpkDaID1S4M2V4Zu0zZ%2BO15F7dHIT9ajYnMdP0CBXAJSEKw7U%2BOEEGP5ioQBwfbcQ9JmUXHxELioV2eaPObiyTYClCv5Rd01guPLUEq1UmNFEUPzkHb682PClgbF3LsnJIqigReQsj06BnWG9ryAgwraSeTcF4cDZJ%2BQjY7NzwUssFH1JspQZMmRELT2HlWshK%2FFgYRXgAOWr8Id2rPHsKMgQZts5UapGYb3QX9wwCLS9%2FJmPfasnrNrPbvYMgdARlVfWEIs2%2FxmlyKOFt9LQ%2FlGT9IdajV2j91jmp8B7mMZkllPHz3eunuUwXEXvHMqv4qenyzliJU%2BlW8o0iS%2Bm6q5WE6uaRRLErIeflUO%2BK9ATsIcBxs2QzQ1UN9%2BKzquEiLXolca%2F0boO%2B%2FvAM%2Fz%2B2PNAt0%2BWg%2FFn756CpRuAKudy6eLoO0N%2BYWaPyHGeZd%2FfgiaWsAAMRyUHCOIe8nZXV4bh5FRfBZeBmzWGyh1%2BMJHP9dv7uuqose3H%2FF7BlUlVPb5kVdA%2BHNtxgKkVZZ6U%2BWwn16oBKn5de2j48D8GnIEMJamk80GOqUBCNs95ok7euxzwNgcfaqTixAw2fzCNAj8tRlAqUcfq3vumEmaR%2FO5PR%2F19K%2FU82kqtAy7pSQ9cF6MetzkTKFnCejWUcQRu09URIVV4HapKBZbEWynIoa%2BxhOzCaCgTL54sT2RqT3ohWF0wBMeg48NT9IROVind%2B%2FRFntCr9BZV8ef6uNg0oM1vXGC63bpdUGCYtuxWCByQ8O2e13L1pkeYDzzrJ%2BN&X-Amz-Signature=09bb230e4e2748eab5a69a7175d34fc4cfbe83fef14bc51fd381900e7f08e4ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TQDIF3J%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCCtO9irpQBEEwzw%2FOSoPYybbbbFFvj5hQVaMAfRBk8iwIgfTxuwf1CW%2FAWLfwa5Ekq9BcB1%2BbF4LP7Z0s8zcwkjRoq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDPSFRTC4nW8eB0Vd5ircA6OI0palsNUumcvQDYd0RbFYS3Ec2JbW9GpVbYYcicU3RkdbhVJVHgjmDt%2Beyb4rAjjLqwJSx6%2F2AN%2FXOpkDaID1S4M2V4Zu0zZ%2BO15F7dHIT9ajYnMdP0CBXAJSEKw7U%2BOEEGP5ioQBwfbcQ9JmUXHxELioV2eaPObiyTYClCv5Rd01guPLUEq1UmNFEUPzkHb682PClgbF3LsnJIqigReQsj06BnWG9ryAgwraSeTcF4cDZJ%2BQjY7NzwUssFH1JspQZMmRELT2HlWshK%2FFgYRXgAOWr8Id2rPHsKMgQZts5UapGYb3QX9wwCLS9%2FJmPfasnrNrPbvYMgdARlVfWEIs2%2FxmlyKOFt9LQ%2FlGT9IdajV2j91jmp8B7mMZkllPHz3eunuUwXEXvHMqv4qenyzliJU%2BlW8o0iS%2Bm6q5WE6uaRRLErIeflUO%2BK9ATsIcBxs2QzQ1UN9%2BKzquEiLXolca%2F0boO%2B%2FvAM%2Fz%2B2PNAt0%2BWg%2FFn756CpRuAKudy6eLoO0N%2BYWaPyHGeZd%2FfgiaWsAAMRyUHCOIe8nZXV4bh5FRfBZeBmzWGyh1%2BMJHP9dv7uuqose3H%2FF7BlUlVPb5kVdA%2BHNtxgKkVZZ6U%2BWwn16oBKn5de2j48D8GnIEMJamk80GOqUBCNs95ok7euxzwNgcfaqTixAw2fzCNAj8tRlAqUcfq3vumEmaR%2FO5PR%2F19K%2FU82kqtAy7pSQ9cF6MetzkTKFnCejWUcQRu09URIVV4HapKBZbEWynIoa%2BxhOzCaCgTL54sT2RqT3ohWF0wBMeg48NT9IROVind%2B%2FRFntCr9BZV8ef6uNg0oM1vXGC63bpdUGCYtuxWCByQ8O2e13L1pkeYDzzrJ%2BN&X-Amz-Signature=99f2e871e8b941029863787cbc72c9771d51a4555e52cb810985cbda45300fff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GZHWESW%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHirmVLxyKLLEjy%2Bd5AULiZXO3ZcxXRIcZHAKQssZ82hAiEAq7msaAXaQ%2FkQZP9hxWcKioui4%2BJX9X3AsNZS%2B9GYs6Yq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDNmwHOcTYqmZs61%2BpircA21mmYlBddvmqyB2I3qcKp6m7oZ5Lt99eyiZYtsRlp5uKg4aOefzyCrR6CgCDkfHI1NiF8KaZZUeyn%2F%2FZ9w8YaaRYgxE5QtqM%2BhDgHAzv65rNeRBpNzzhixBEZ%2B2Dfdqet7ueB314HGXkgTqQ%2BG9KmvTRrut2EaFLoC1lh29aMmgoI0yMzUyUu8QKb5n6XW6Gs9g%2Fy%2FDymAiUdgvsaRx2hcMWHhX4EcEETQoBkthz3Jt5p3cqnqkJgNgVSRisfJY%2B8G1tegWvqmqrIob5vhVy%2BA61EH4mhSxYU%2F0wzWfn6VXqPNLsmH%2Fygx2GsYYnwbrsYu18k9sMTEYUQEVzLTwZR96%2FuMygOTiAuKBInEzTnTaOlovIpGPKTZmv0PAcCfoFXZHq5Pgabx0yA6WvMqjkQLqtmkRjV6js9zNayc5SWhYzNWPk3y9X0gO2laVZ96eD6xI93q1HT8CvaEcWHrB34ZggnjDscFGjYS9uMSzyWAiqCcKaSnHvoPmntZU%2FvSOjevLmu%2FIW%2BR3w0odi%2B1iLmSzlVh5wZOM1uBKuLRsDMBus%2FeVVaEzVwh66E3lBhFVclOn2ktnsZgBNhH2ljwzW5mmEeveR1Vv4fLjOyxu0Z9pYzQrwyr25JNSMa6mMLSmk80GOqUBGdJiaKj4eOZVjyt7m9JugdJP%2BLnEUt8xTHnO97614E6TQ3VEW8HB5x3LKXByVZ8GIbZFUToFcxFs%2BaIL53Q8NvLgievRTJSAnCo8Kj%2FZ1SX0hWNTjX%2FD0zwU1M7eT%2BsVdXFFVTjhNLaan7QcNfyOICB%2BuOwUCFHV4XagrZkddgtekLq%2FqF5QF7dbD6FDb0oJ%2FuMZoQ8ckvFdN%2BgrygZ%2Bgl39YsA8&X-Amz-Signature=9dad2d53a13db65664fe5659b6a388f827d23cc6d00059309073384bc7f89114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZKSJGHS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3DMwIusLa4FDPL%2ByOvVl5tEWpo3mCOawr%2FeKh3GMN%2FwIga6WRVpq0fN8OUuWiEFGcCfGtpkm8h3h4sliNAF%2FT4oIq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDLtbxGfSOkcsB0AmZCrcA6FbHJ8lryKvev7JopuGnczJ10IBLADryfH3DKaWzBrrsGQqKOaB%2BhepOhzm%2BY1m6LmBBuT%2BNZePa9g7NOzJnUgcj50lXvgKav4PH7SWtWcd%2FpiLjAh2XiVLuwrInn5qP%2FJq%2BN%2FfhkaDrm24zfJAWLQiz2TbKUC2vlTu1uD72Uh%2BcYf%2BRWXE%2Blr9dJDWft48Ni0uUVsk2GDaXE6zQ7xlPzMFoAFNAvrrZCz%2B3FjotJt6LWU%2FoK5%2B%2FoDbMJq7R3Ii8Fdh1o%2FIJnB51%2F61TQY%2BqRjoaf1UFFqYJ9YGQ5uvfLzZI%2B56gDYQVpmkENUHFQgsUq9UXdZsixX5Vvjpwb9S%2BjK3DTzmwZ6ZSkndRJ3Vg1de0nOPfFEjCdKeebrLfuknvkqPMCus47pfrIOpgQvFt1dNsUho1uEoyQ5AiRswYTsMZ26Uk4BpfFnOYaBPqyVcrjXgyVCEHIxTCQOB6nxe%2FrEsbyYfSd3teXHtTySsWbiqzEXNQWPa47ka8WAEeztaK4l7CUJpY9bqWWjiOwwQG3hbACogLYeOe0G%2B56kU4XAPjLeTeFzo7eAjoXfVxOLhmBvQERFSRF%2FHFMX0FkwNC6%2FdeSVLwD8kRtrQJDnfwGNgb1jWwvf6hKsilyP5MJKmk80GOqUBbAJNY8ruAiCe2aQ0yCNNvM87iyHvwqnJf8GCX0fEiFcsbCotfPQYB3KKE2%2FEif9INAQ5WJ9vZM17YqCFSwxOXYGndtl4qSdj75DXeTgzewhsE4coOf4qUgEZ0GWnjqjizdGp%2Fn4DnFohLYuN65%2BWv%2Bcqv1z546PJnhUCt2DmSATlUP5NcjAABA%2FUMPwMAbdN8Y41WSxwFxGkS2flwyjtG2WpLVte&X-Amz-Signature=9274e90db4a60621ea2df40f810f59595dda98bc2d252fc07194c11542f77ff2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLMMGK53%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDw5vOSDjRkannIniKJttRRx888f6rjEvO2Aq0kI8UBIgIhAPEjjjDnBwQyitLA8lwQtX0PSIukJztFRG2S2SCZg5ddKv8DCHkQABoMNjM3NDIzMTgzODA1IgwWPKUjt237xOH4CMYq3APQvTdOZpAWITvwK58I0coEpIhouP%2BfYY0pm2voay6KVsn4lf7M6oWXO9%2Bsfy7kYO0s%2FL24D4qTIOuyVBxUd1%2BpvRWpMPz7JObFl9RgnbI0Nm2%2Fr7vtLoS184zB6b9jprW%2BUH0rMcin7yhtBpHFnmxWQHP1Udx0K%2Fle6AJIyyEY8%2FcOJyqgqsaSxyUJKfejTXPHXW7m0R364JiFACWTJNax8RDTzs58C6vHJdqvfhVOVJyOF00BkDpVOLWuiAP3NheSsI%2FYB5Nar1%2Ft1lZNPVhA%2Fd44rm6QP1bsbp5RTJWK0XC8V%2FERee4x6vKh26zsNvkkD0AP6Opbq5gPqrnJ%2FpmAm%2Br62%2Bi6WgLsg020w7zjvvrDndnGJuciwnEHIlk%2FVmz6rgFDq7nRx3rGkd6K%2F7IqateceeL43lU8UA7bl88U6RmVGSTkq9xFwMWT7Fsr9%2F9PjNF06g%2FHk%2FKejCnWvBmRDPpfl0LiqKQk7QWYYJ1CXG9wr8U1AWQWvXXgkAd2O96K5bTo8byIFO5Mg8EgR2463qsRGWiwi3DGMFIbFZiR9v9zvywUaoxfLxqv4xDWqdSIwHcrlP3BlzoHTi6htTcozS9rGcERmN0%2BsmsOwd0c0AiiNCsuuUQvEoSZKTDqppPNBjqkARIkw9p5ToJuXF5jRJ94XXD7D7ah6Va29lg8UfuZQnuerDipmD1IQo4W6B968E3ZG36MHoJGfI5P6KOowdt6JL95kQKu8I9TXwj%2BTb4LR1pdgqbyrL64UEf4ecPMCN6XgvZttGt1UBDUazc1B%2BLEfzSs1Tb%2FyQpEnTjsesR0HAN5SPYrn93p8I0%2BjGybmEJlkZx%2FNtAocqVb3WuJgnXH4IP3ljfV&X-Amz-Signature=a4bebc4026783b9a26a7867f0404d9ea0c768cdbc8d5af1c4856eb63f46181c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSUOQA3G%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICeKb5uKTOaC2F2chWGRDv%2BFJ8dFUiGFsRUapcQ3u3N4AiEAukp6hpIHs8hwUo5Oja9fywB9B5yL9YQX7WSuxCAQVjUq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDH5vx%2Bwr3Dcy92uGKircA8Sr1bAZDcJvI%2BZ%2BkGfwMs9GRjPZvcOZpLzbLaH1aB1nC3sp63mM%2FWt29%2FAc%2F7yADNpE6u8fCVl%2Fp6C8uVKbuwK9moIzmtADO89Y0vKU8WpLrwNGdxUNkdbHAVgvC2l7f%2FLYSImumuzDhwYUNr79jpLH4XiIBPquSNUv4anFLNK7R39HVb2sKuut%2FC9a9aFecp6i39wRoulEbes%2BGl7WnlEtFdid9eRXKw707NxDNibIpwv7l7w3voUTr6hQ1K4TtitjvrdIUOrYijINrWhww1JxG%2B8fZAEOBwzVN0mZzLzYZGhXBA7XCiKMHf2NrTccGpSbBey9jzLzvGUOJi1Lb1F%2B4cYUFcDIoBUk556adVACP%2BnAdmBApwenZ2ib%2Fm62OlsFboa1L6bgxoWdl6JRQIM7VAzMnS448c%2FvkYSRakMsqDaiRvlCvx91Ju5ybS3Ewlb%2FyqjnhFsNSWb851h6wcbLpue2KDMbNEiROyKDVD1tW6lHUmf1lR85ggHPTXkLfzOigr39GDxyGFNVXj1AagazS%2BDnYrm6DmkA2TixecD1E5pTJuYDvw9eH9Fht9RNVGaGaJr8jHi7HU2TN2hRANYhnQtu65bvWldQNsHBwB7rb0d88xXRrMi91gq7MP%2Bmk80GOqUB6uFk1AuuqI4EmdZlYbzdNbKpFRdH%2FEaW4ExST%2Bs6qTBWFGMRkffpZvHaj2e8tdqy9C%2FyKgBkipzbwz%2BIeBAchLhuL4qhwaHfML9ijec2C635IGwrEqK%2FyJlvYav4v38N6pecuDvwxW55OXXf%2F6h3bmR3Gm81uZrbHQ0ZS6qjr%2FAhmHNBeiySEpwved%2BBrBNIDYoVXjLyV0o0lEuSfU%2Bh5hzdXbej&X-Amz-Signature=8576a34734c9a3f3bfa540ce01a45e5800acec3de8815d7248db459daa1f7609&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSUOQA3G%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICeKb5uKTOaC2F2chWGRDv%2BFJ8dFUiGFsRUapcQ3u3N4AiEAukp6hpIHs8hwUo5Oja9fywB9B5yL9YQX7WSuxCAQVjUq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDH5vx%2Bwr3Dcy92uGKircA8Sr1bAZDcJvI%2BZ%2BkGfwMs9GRjPZvcOZpLzbLaH1aB1nC3sp63mM%2FWt29%2FAc%2F7yADNpE6u8fCVl%2Fp6C8uVKbuwK9moIzmtADO89Y0vKU8WpLrwNGdxUNkdbHAVgvC2l7f%2FLYSImumuzDhwYUNr79jpLH4XiIBPquSNUv4anFLNK7R39HVb2sKuut%2FC9a9aFecp6i39wRoulEbes%2BGl7WnlEtFdid9eRXKw707NxDNibIpwv7l7w3voUTr6hQ1K4TtitjvrdIUOrYijINrWhww1JxG%2B8fZAEOBwzVN0mZzLzYZGhXBA7XCiKMHf2NrTccGpSbBey9jzLzvGUOJi1Lb1F%2B4cYUFcDIoBUk556adVACP%2BnAdmBApwenZ2ib%2Fm62OlsFboa1L6bgxoWdl6JRQIM7VAzMnS448c%2FvkYSRakMsqDaiRvlCvx91Ju5ybS3Ewlb%2FyqjnhFsNSWb851h6wcbLpue2KDMbNEiROyKDVD1tW6lHUmf1lR85ggHPTXkLfzOigr39GDxyGFNVXj1AagazS%2BDnYrm6DmkA2TixecD1E5pTJuYDvw9eH9Fht9RNVGaGaJr8jHi7HU2TN2hRANYhnQtu65bvWldQNsHBwB7rb0d88xXRrMi91gq7MP%2Bmk80GOqUB6uFk1AuuqI4EmdZlYbzdNbKpFRdH%2FEaW4ExST%2Bs6qTBWFGMRkffpZvHaj2e8tdqy9C%2FyKgBkipzbwz%2BIeBAchLhuL4qhwaHfML9ijec2C635IGwrEqK%2FyJlvYav4v38N6pecuDvwxW55OXXf%2F6h3bmR3Gm81uZrbHQ0ZS6qjr%2FAhmHNBeiySEpwved%2BBrBNIDYoVXjLyV0o0lEuSfU%2Bh5hzdXbej&X-Amz-Signature=70e606cebed20c3eac6f70cf3ccd5fc580a9d9221a031c09153e07a1f5b92712&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YEQMI2A%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDyGdx1x9JY7o%2FeiU1uOzRkrnZV4CduZCqVTa5AfC9sDgIgRi6%2BTDtIP8CRyZ0ZUmzpUIKdaRKgao8GGdJKxRbQJ%2F0q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDIMrD8hu97ALL15dySrcAw%2BMb2kejOX863hQ%2BbMvsIHA4zNPfKLhqM8ggOuUpEXL0rQopLlkIdoJc0xMgz6xhYkOVvdyOoFocptVtFHxy00%2BOIvSWINyIPLNaoFiwvCXgwKSiSR%2BXeL4zYIlw%2FdogwnaIiXQQdzxSQ2DhA6oYr41GYevcvjynW6Lc%2FxuVh0FJbW48B6TskBV8aexAkcIV9piiONZe0fsRSTUOI6dZwgSPs%2FcSWtfTbtNtxU3B1x1RTgcD%2F4Q9s%2FKr%2B0pgknwZS7kfmO1RliYL2mWO9rLtY4BY%2BdVcwwfbf8tOUoNjfXgfHunzQY0GmkSHSTlXvxaHygury7K1P%2FcSF2qEowvEPqmZVMrXE2li3hRjNI7PaR2bKCu5xy0LEza3H7fW%2B2iSh%2BGnnyCSsTtEjNp3r%2BO%2B%2FIkRj5VAkzgWTk0eoMuCsG7QJvTKLS5nNgrk4T5XQZwJZS3tTQIXEJwgEfgIUwCXsWSFYLSvQVSQQ5RE4e2QCqJwJb6gZvVBebBe5umgBxMpyrDcLRA1rROHfFRlJPSmaPYZrQbvoEgioRFVDctMiOHXOefVFrLyV7fqQ1E%2FYtP71UiImu39mwaG4llEX%2Bj%2BkAcUd%2BRdY2c0Nw%2FdhFJYFpMetQNH%2BUcYo31H%2FU9MLatk80GOqUBd4ffzpxAt7Oxiempc6yDhgHGgCA9OL9fAax79wrI1QoeFikdzMD5oioa0M6qTcrCyTWu58ebaPxl%2BjdmaURTK7RQpgl%2B%2BuNOh21nrba38eywpg2e%2BZ%2F6jOpRmsc26OqZApSsOLLJK5OhemOEGupUZSVfHJS5ct7M2RKOC15p5VMZLurE3z%2FnwXbcdVHW3ncwj1%2B8qtlGLGlnnsXzi%2Fuo4PtOcarK&X-Amz-Signature=c04f90eeb0a9596d6702af4a61956189038935ccd45892137571b34a2f7dd59d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UEYA6ZT%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB%2FuFS8KoaFqD6bBxlFxT7xMI8afgc5vL3kgMslxUbE6AiEAwfaYmds0DkTb9toDelbJwKr%2FjIsDWqbQxFWqbCA7Nq4q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDBeZ035mytbPTCBotSrcA%2FgZFMfWTIuShkD22%2BwayQDAExWNI%2B%2FtKq0O6eOH95fJTJyHvD5s37lD7TWFcn3ZJdTCZyxlVLq5%2F59JnJ0HepvBwWsC%2BQhaZ1eXlPf%2FnEohU5psSdylpd9wxnxmvijnk6vZU3xGGOBakmgl2k1fiLXA66KxxeJ5BBEiB%2BOMZuxzLFXqbOR6Jic5cONlH3Z%2FapYfSrRMPaKfsuCuxZjT6BX45vkAKasOC1ArLH1rltcDuo8yqbst7r9pdeQ9aUgPx8vEfRKBugm8eS6xOzXfe94s%2FPpjsUbc0DhhT01y6R%2FTQooPSOlzJTclq6nuMtAB%2FqARHathi4cqj3M1GqWGwQqsN%2BNzTu8DBWKvlSSB4wBoQG1icl%2F0SZ2TmJhjF%2BrcRmyqn%2B7VIKKMXTPb2jUgYBoQ28Q15FIMyX75Pi6Zoxcc4SH15pZnd%2FI3KvZhqCs%2BeOQZazp5Nvx6yO7637dmjkr%2FbXsw0%2BTCh%2B3UDKyqEa2o3xpL3u%2FB6lHAUywc9olJS9U58s4mII328kypGcrhXtr9o7BKxF7uFDMgJ6KAEJK0YHCqNQkoFRIyXIkzid0OAWq74yP1t4GsOzrIpWUDmGPGDXapcbewFHvrj0whsxP6%2B5iAkYcB1g3DG1mXMKSnk80GOqUBHn6zc0tkDMzPnTlDKmTu5zPrRZwZ61rCQBB9zmRXPHrfIMxHq1%2F4fPJrEsj9HQGieE69l56XKw%2FLW7FkA6k6kTKR%2Fdg3OtTZvlJAV%2FRfJv%2BUlXrhZi9ghHaBJ6GwrB8EQqV6kTqUkt1wXz2aja%2FmwWMnnp1ZLAdgIJYNudgWVWtP%2FLiL1jRneVZ%2FB8g6%2FUYOebvpUNBbFioEiGiD%2BPEyLeeat%2F%2FE&X-Amz-Signature=ba34d2fe107eab93071abdae44a1ed4ef5fd16418f3f82ad713236bab20ecd32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UEYA6ZT%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB%2FuFS8KoaFqD6bBxlFxT7xMI8afgc5vL3kgMslxUbE6AiEAwfaYmds0DkTb9toDelbJwKr%2FjIsDWqbQxFWqbCA7Nq4q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDBeZ035mytbPTCBotSrcA%2FgZFMfWTIuShkD22%2BwayQDAExWNI%2B%2FtKq0O6eOH95fJTJyHvD5s37lD7TWFcn3ZJdTCZyxlVLq5%2F59JnJ0HepvBwWsC%2BQhaZ1eXlPf%2FnEohU5psSdylpd9wxnxmvijnk6vZU3xGGOBakmgl2k1fiLXA66KxxeJ5BBEiB%2BOMZuxzLFXqbOR6Jic5cONlH3Z%2FapYfSrRMPaKfsuCuxZjT6BX45vkAKasOC1ArLH1rltcDuo8yqbst7r9pdeQ9aUgPx8vEfRKBugm8eS6xOzXfe94s%2FPpjsUbc0DhhT01y6R%2FTQooPSOlzJTclq6nuMtAB%2FqARHathi4cqj3M1GqWGwQqsN%2BNzTu8DBWKvlSSB4wBoQG1icl%2F0SZ2TmJhjF%2BrcRmyqn%2B7VIKKMXTPb2jUgYBoQ28Q15FIMyX75Pi6Zoxcc4SH15pZnd%2FI3KvZhqCs%2BeOQZazp5Nvx6yO7637dmjkr%2FbXsw0%2BTCh%2B3UDKyqEa2o3xpL3u%2FB6lHAUywc9olJS9U58s4mII328kypGcrhXtr9o7BKxF7uFDMgJ6KAEJK0YHCqNQkoFRIyXIkzid0OAWq74yP1t4GsOzrIpWUDmGPGDXapcbewFHvrj0whsxP6%2B5iAkYcB1g3DG1mXMKSnk80GOqUBHn6zc0tkDMzPnTlDKmTu5zPrRZwZ61rCQBB9zmRXPHrfIMxHq1%2F4fPJrEsj9HQGieE69l56XKw%2FLW7FkA6k6kTKR%2Fdg3OtTZvlJAV%2FRfJv%2BUlXrhZi9ghHaBJ6GwrB8EQqV6kTqUkt1wXz2aja%2FmwWMnnp1ZLAdgIJYNudgWVWtP%2FLiL1jRneVZ%2FB8g6%2FUYOebvpUNBbFioEiGiD%2BPEyLeeat%2F%2FE&X-Amz-Signature=ba34d2fe107eab93071abdae44a1ed4ef5fd16418f3f82ad713236bab20ecd32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R4TS7TK%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T005619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCIF6wbqyhupmk4m%2BX1b%2Ficx%2BcJl%2FhqEpm78nxRdmqwtdOAh8VHlAYb0GZ%2BAn%2BVhYgAlG2TOsDhvm1DAxAUsyH%2Fp%2BQKv8DCHkQABoMNjM3NDIzMTgzODA1IgyIsGDqNzOGDAA%2B7zMq3AP7jTXpAzPkAtA2KLAj3Sj6GT%2FCVt7PyqEQiOWZnhglXT%2F2p1eg8Zd2433jI7pm2NVawksunPcKh0nX2EMJr155B6ZTKIDOrl8nddGWYvJx79QkDEHk0poZPfU1PlLZPVTDvl6K6t0iQ19FAm000iOSnZb%2FA6R23DtXCmGCPTlQntRRWbPEtVXJiRSR7IlByNmzvuDSzx1ybt2HfC%2FnorRd07jy%2B5ghoI1Mi%2FNysO7nRoXqjt5u54YApFxWeU6nR4M72N9%2BwvMmnKigDuvi01hg6YaXbJxiSFMOwY8Ok9oKlILZGjPHXYdtINgoVMaCJkGf3ekeg5xJG9eU%2Bb5xEcKOS7fKh%2Fa3Y0Yys5Xw%2BsDFDuRCeqjLFQiJnRym%2F2w9cBeb0W4rG%2BnrtezusM5O3957MjL5d6UZDjZMVcpB2GyXvj2AAtYJkn9pkEktzfZunWMWpThpzb4pl9p7FYA%2F5shjwE6pZd%2Bw37w3sWAGtWjVHwrOrdr69iNTlUBwKMYo0YOhF2I822pyaoJFIsPnVljVKejMbSfvl8drjGiPTHqNKYMvT%2BbOzKA05XS8T0dL2TFXbpKukRphq8PAIFLl3%2BJacVQO9hL5pyvpwBnzB5F1WQ46uMQvCjCumKu3gTCNp5PNBjqnAX8T1KyjoP0tWianiJuB6YAa8pPhSJ%2FT%2FdScZ8%2F2mXxcFjB3FeRDKED%2BSAyzKM8vTt1zCR702b80RQ5BIl5xXBkoY6ph2MdzIrUZtW8xijw6VxqcosSDC2D%2Fq1%2B3zEapF9%2BOFmTcG2uHMUWvzTDIK%2FkF4VFsTHtgTNgf%2BZmX%2FtfrUg5FT86pt9N6fFaEm8B7RJQpR7S5ZxZ3YwT1gSvH75%2B1A3%2FzeFSQ&X-Amz-Signature=2e02641d6e2594c0ab0627387c04427026af5d3bd9ea97bb7a7a192f62eb67b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

