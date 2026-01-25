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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUR3KLWW%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIDJxxIiJ0vJhAZWufIOm5UKEPnHEAXjh6Bgjv79V7w3BAiBHGiKuLowHrnFmXpP4%2BFCLFU7N7xgSTis0w8bMX4sQTyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMA5S0xHiYsQo6WDaqKtwDK4AHbHUxGCR2YKM46p%2BUeQofD0qDGMXuthNGt7uCqQrJ%2BTBq1LgGOH%2F%2BVNqlyEO4Lxz9%2FH4tsWxgkwJKZHSKNO8RDHuqqPqoxkhfq7bpRBEYpjNhCamLOWllSm10X1T52z63o0sAeTshZ%2FraTG50OdeJCgmy47x8cDShpShkmFWaaIpP16xhqJnAY2eEpUezibS2wfhNytV7PhkVSvkSaAxMZMrhvmVoUMAS2WMlxXj3YP2xOz9t4RI%2BOBTrSJhPiySgJ3Zh35cwQF5z2WNmCwY461Xi4eHM5YO%2FVxwaiPbcurxKKQ5cTHb9lA3lirSH35Aw8BFfawpM4HfxxEmiV%2B07BEDKIizxEzrmlQS95F7b99VkMyaeljX9anCPQJ1FZX61ghvRFJPiDnweV5mVdcVPAPJwQNnMLQ2pDoBkV9gCa9vxlbHdX2TYIfFWs%2FOvzREwlIUoYvD6JxBGKuCcwkX9kOAoXaMK9Fehwxm2AE%2BxSd3xT7HjCypDrZ91%2B1pSRNdLPbtELaOrZyg3rRzwV5vy4BN8EiKPjKM5HyskZ5r055OZO2E%2Ba9AxxrnF42g1kfmMGD7YdotfPVdHdsrucdbLJnrW0%2BlGILI3U4PGo5cLAFD2RMlSvZAL2hgwg8nXywY6pgHCgR7zSXg6f22IZFWwKtJsM5AOw%2FsHMYHTm4jHI%2B7wWa%2Fa2qLCEBnrjgRevM4ON8E%2BRLHYGxqTYra8yJfkPw0mKOWAQJQiN%2F1rXRu1gUieGZDRSDKrkMpKmFxJLzvcAGheGVe%2FQTPSxIbK6UycVp1chhS2DgRmq6u5rAQJT8omlSkDEyQRehphVsfktmNod7u13xNAxwU%2FvspXao2evIeXKmwY%2BpEy&X-Amz-Signature=0093467c08225bdd63c0fc4eb69ede9ef972bcd878338f03115354d8c5f999da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUR3KLWW%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIDJxxIiJ0vJhAZWufIOm5UKEPnHEAXjh6Bgjv79V7w3BAiBHGiKuLowHrnFmXpP4%2BFCLFU7N7xgSTis0w8bMX4sQTyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMA5S0xHiYsQo6WDaqKtwDK4AHbHUxGCR2YKM46p%2BUeQofD0qDGMXuthNGt7uCqQrJ%2BTBq1LgGOH%2F%2BVNqlyEO4Lxz9%2FH4tsWxgkwJKZHSKNO8RDHuqqPqoxkhfq7bpRBEYpjNhCamLOWllSm10X1T52z63o0sAeTshZ%2FraTG50OdeJCgmy47x8cDShpShkmFWaaIpP16xhqJnAY2eEpUezibS2wfhNytV7PhkVSvkSaAxMZMrhvmVoUMAS2WMlxXj3YP2xOz9t4RI%2BOBTrSJhPiySgJ3Zh35cwQF5z2WNmCwY461Xi4eHM5YO%2FVxwaiPbcurxKKQ5cTHb9lA3lirSH35Aw8BFfawpM4HfxxEmiV%2B07BEDKIizxEzrmlQS95F7b99VkMyaeljX9anCPQJ1FZX61ghvRFJPiDnweV5mVdcVPAPJwQNnMLQ2pDoBkV9gCa9vxlbHdX2TYIfFWs%2FOvzREwlIUoYvD6JxBGKuCcwkX9kOAoXaMK9Fehwxm2AE%2BxSd3xT7HjCypDrZ91%2B1pSRNdLPbtELaOrZyg3rRzwV5vy4BN8EiKPjKM5HyskZ5r055OZO2E%2Ba9AxxrnF42g1kfmMGD7YdotfPVdHdsrucdbLJnrW0%2BlGILI3U4PGo5cLAFD2RMlSvZAL2hgwg8nXywY6pgHCgR7zSXg6f22IZFWwKtJsM5AOw%2FsHMYHTm4jHI%2B7wWa%2Fa2qLCEBnrjgRevM4ON8E%2BRLHYGxqTYra8yJfkPw0mKOWAQJQiN%2F1rXRu1gUieGZDRSDKrkMpKmFxJLzvcAGheGVe%2FQTPSxIbK6UycVp1chhS2DgRmq6u5rAQJT8omlSkDEyQRehphVsfktmNod7u13xNAxwU%2FvspXao2evIeXKmwY%2BpEy&X-Amz-Signature=0093467c08225bdd63c0fc4eb69ede9ef972bcd878338f03115354d8c5f999da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PRU42J6%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCN5Z3ljUt7CGiz2oMwgyLB16tGuQBQxAVgKyzJoj1ZuQIgLh8tD75SmkksbD9de6EbsGB%2BEVReyoLW0r9w1x4A3E0q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDEHeqPxmLRyXkyJ3zCrcAxVpq4jADSr5iEk1aYTiI2liQomcLTfAFbGQui70ATXd5nBTiZg8v0cxzy5o7CJGB%2BLLKJStPgSYHubSjN5Zl5%2BbmSsSmrCl1Tm3PiYBZbIKB0njcrkr0bE1lra%2Bqv9UPrZOE6oq5vVfxO0PAU%2FDxLerHZiPEOImFt3FW0mVLhJ5mo3t8pyvZYbqW2n4xqSl4PqIM%2BXk5N9%2BmRR6e2bmcr%2BDhMBK%2Fm6FRPCljoyTpNpEIwoNE6qZwJMPxXlu%2BeP%2FCC1kQPwXtvhEr1dJ5EDNtt%2FoC6jHjrm%2B%2F7DhYZJ6%2FDMP3Lf6BCQMKRIMxW11%2B7TxTOc81%2FbmHeWdDyoPFCDkcDkOBBFpkxO7mp0wFqZf9nOLWf%2BpRLpccfIgOhxajv9g4zilD5KSAUwPVTYGu3RG0IRgv0C56TwCHklLHId4PYkvxjjNFUH1NuP40qQCsCb%2F2q29If3jCXrce0ibIKOvHr3txu9rWWVksEMaNokCp%2FJIka3OjvHIwVnwBAzmoOZ90IzYefZfjfy0gr6YqJxKmXmwvJlMmorZ8Iwg05lRZBaaMbPV%2F9u4CPmQIVPkB9azTFxDuayPjFWeANwXSHXo0os1VTUxX8MxGg6ctpJuhGJmCY9A6tq6Rw8CnO%2FbMPDI18sGOqUB56iqn24IDCnzsxGOPf5liheknyIMPnFxUGM7oyVd4tZWJOcivKBMrKkQgQu%2Fe32NLxF%2BGXUKJlZffRGWCCJdgFiPh4oa8LEa5MTFv1H%2BevjEzZTO6Fm49Z%2F3BhHAPDfNleYRZyNCuON%2F9Pt0khW5OBV11lkEvciN5iHkEcjxtLPPl8m8MYX4GAnWtabW5FFWeUBM8uIXDtnC2x3K8P%2BvwPMsLpk4&X-Amz-Signature=80edd1afa8391ade5e852fa7d5357de07410198203f9ae73f543def60c20511c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SLE4WLE%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICv%2BEo%2BbXEW3bLkUaGgzFsVbDhiPXza0FsAQBEhkACa8AiAsdgZk4R9Nd8z4x3zPIMQYZ5IQqUSek%2B3NUj7LdvRajir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMD2KX6X%2BLkJ%2BPI9tYKtwDAFHV7znQVaxv6s3yDsafn71t6TMjwOPsJpANNK2v2rTUpD%2Be%2BWOEmgTKcn8EjfiS6L3%2Box2rJRU4%2BBCzu00OutYuTYXtYA5nhGiN%2BiSE69aQPlsvcMn9yasUXVWC9eTlMV8Bdj88yXVrmvw7cvsM2xMQmyut6OGTnkWToVVkNyZOSqrAISc%2FgwcJZh0ptJIgoxdterGu2VpJmoP%2FtI0bKaGv40oylROwAjmPy0mZTqr%2BE7QzSuOMiEXhR8L5m9KMWOYd1OCAMDtkHeFABTIrbyPqo%2BuUPIgx%2FDpF%2FWXNvijgO20hBLMIBJoHK4egeMLqgJD9fu%2FzggOt%2Bkds1%2FdFP2%2Fk3NM0wV8OQFxzKzbk%2FEg5DjF%2FwfusrPxIoRwdV%2BUksHgAipyaMxQg36ftkTKKyTws%2Bk%2B287c69siMtDtE%2FSqhT8rapjikzWPKyGVJFhLvIGqm5yYjc3q%2Fe6wRcmc6rFbKGya5EM%2F4tdXBYuuypF%2ByO13ExCJbICXEoDea79Y%2BlOzlT2trcbFVuLIfZlJyIoUU1flY1BdLpE8h%2BP7DUUQ72RYnpuyUWfxv%2BpY%2FhqcR0WrHP7hOrGTYa8Eob9tyUTXnMJTUBFEtCkfKsCQ%2FcxCYiqLFxRbMvi6Itv8wusnXywY6pgFUZ0VBA8JCeY3xwtwf7uXpnkfSWYoadM8TQHWnvs3dGf3LjY1kapJcoKX2JbEqzpbTGuy9tDSRCHp088uts0Hi49tSGqvofa4chwI7n3w55uS5zBEXKHJ%2FXWAz08CiRhTd3EnqrhJC%2F8JnrNTGG0%2Fx4bLLrQvXLp9zKqzn4jTYtqBJki5sMJ6HhySyf8yMfW5wmVi5xkM986w1Gug4hj0TQ8dO6ARw&X-Amz-Signature=483ddbe1d7807fb0989d852fd88e176cea5f62aafe68fd0c14b1c74f74de784f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SLE4WLE%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICv%2BEo%2BbXEW3bLkUaGgzFsVbDhiPXza0FsAQBEhkACa8AiAsdgZk4R9Nd8z4x3zPIMQYZ5IQqUSek%2B3NUj7LdvRajir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMD2KX6X%2BLkJ%2BPI9tYKtwDAFHV7znQVaxv6s3yDsafn71t6TMjwOPsJpANNK2v2rTUpD%2Be%2BWOEmgTKcn8EjfiS6L3%2Box2rJRU4%2BBCzu00OutYuTYXtYA5nhGiN%2BiSE69aQPlsvcMn9yasUXVWC9eTlMV8Bdj88yXVrmvw7cvsM2xMQmyut6OGTnkWToVVkNyZOSqrAISc%2FgwcJZh0ptJIgoxdterGu2VpJmoP%2FtI0bKaGv40oylROwAjmPy0mZTqr%2BE7QzSuOMiEXhR8L5m9KMWOYd1OCAMDtkHeFABTIrbyPqo%2BuUPIgx%2FDpF%2FWXNvijgO20hBLMIBJoHK4egeMLqgJD9fu%2FzggOt%2Bkds1%2FdFP2%2Fk3NM0wV8OQFxzKzbk%2FEg5DjF%2FwfusrPxIoRwdV%2BUksHgAipyaMxQg36ftkTKKyTws%2Bk%2B287c69siMtDtE%2FSqhT8rapjikzWPKyGVJFhLvIGqm5yYjc3q%2Fe6wRcmc6rFbKGya5EM%2F4tdXBYuuypF%2ByO13ExCJbICXEoDea79Y%2BlOzlT2trcbFVuLIfZlJyIoUU1flY1BdLpE8h%2BP7DUUQ72RYnpuyUWfxv%2BpY%2FhqcR0WrHP7hOrGTYa8Eob9tyUTXnMJTUBFEtCkfKsCQ%2FcxCYiqLFxRbMvi6Itv8wusnXywY6pgFUZ0VBA8JCeY3xwtwf7uXpnkfSWYoadM8TQHWnvs3dGf3LjY1kapJcoKX2JbEqzpbTGuy9tDSRCHp088uts0Hi49tSGqvofa4chwI7n3w55uS5zBEXKHJ%2FXWAz08CiRhTd3EnqrhJC%2F8JnrNTGG0%2Fx4bLLrQvXLp9zKqzn4jTYtqBJki5sMJ6HhySyf8yMfW5wmVi5xkM986w1Gug4hj0TQ8dO6ARw&X-Amz-Signature=abcd3bbb230a38a673e96e8e5908bbde12a19a968836d7c34b862dcfaa696a76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTJSEBFV%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIDelDBix7dl1sbM%2BMVREoD9poyS5li0HF7bNhUKKIGCcAiEA2xg3jDE%2FK%2Bc8dmfLsei7cGGKAJIAAb3xAAPuuuq%2Bsskq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDEVf%2Bsb3odefpe8FPCrcA%2FWou4mz09uz%2FF5PFv8f01I%2F7BDvWjrBi7PYoFjZL5nLt7U%2BYHayWygzrCq6SO0TrbY%2FWt7gO%2FZYeWkj%2BuyDZXy3QfX6AYPcKfBcwoHRLeWu%2FLw8oBOi75mgESbQAX%2FjE8Ein8j9kCYznlBlLwW93LkIiLYqhsm0wBQDQCZofgHBc%2BGDd2YJhwzgtLlBwfR%2Bvsx21UZG%2BK8AN0qjo37ttv2ocwUIxZ5ZtWWe%2FCVEgW2JHAvnUCiTuVTqtNh2BsSOn91pG17HApC49%2BI23B8QMxoHRZbRhTvfNSK67k3JQlGA4uHi%2FPTmGsFdiOWGqzAhobbd4E64PoQiBQZDSoneklU0C4i6yVajQWErCPzpiV5QjMcXm%2BMzGqhKGXe40nWogVdjNK1t0q7vxM7z5FcbMYO1XeVcse8yJ%2Bi%2FRJ%2BjuiPYdQcwUEbbkFtE%2BavOZZOUgatqDsJTTnzuzFwKmNK2g0fQHjblKtNRej8j4XIKdDEWZYExjYZqW4GPh7l9dGPb3DpjThQ5%2BkNCyu2oQ3H2L5rbRD4cLxBnKijlo7DNyYGXFD9pYS48dXU%2FlKO1bz5AK8jlFqW93d6xeZT2DSbPb3E4UrsFzWlADnW3oLNDxIhsYRRHcA8r81hwDf8UMI%2FJ18sGOqUBLuikqZMl%2BJm0%2BHFJZww6API0cNoriweRT6ij4WMYuD2LA052Fq8Q3AsaDrvlcsawcPIxFSh3g3uhtdDVsQWKGKDmiAyuk830UxqMGPh0th9TtpWPETxrVgZsFUmQUivmbR%2B46%2Fvp%2Bvb38MJUSXhPHed0eZCL7SgvU3kj7KJRG21kNE3eSvpsL0tCfHvoMijOyZVFMhGpABlR0iZzeJobKDCp%2B%2FpF&X-Amz-Signature=5eb66f25def2d9920f9a9366995429e068d2c3ba27cbeb22bac3cfcd958c2153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGH7FNBK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIF7temnDENETmRr92JAmPmqN04a6rlLYTswUf0R6vsG3AiEAwPxxXpOuFj67tPpXVzFhsA1Fylq9ZD54F4REB99ywaMq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDGM8xFtJl%2Fx%2FJyNppCrcA8ded9vKO9gMpHw9Vn8cBcmRDgyePHQ6r7Xh5D24Zcz1OBFMJ%2BNvJ%2BDoO5N95j7Ov%2BxYsL9I7%2BAkHtr8wPfFfQmBQDDImDvfKJGpFJA0cDCApIwBGFyYig94UBGiIS%2B65zydntVg9LzdeFJCV1keDxht84cLRcptqKLd0goKceII3sjA15XPYeGYkqTHPC4uDEDKjvHqNgzPBbTg%2BAeVFnELwSI50jPmwP1d%2BNv5ZGKLEni0Qf1GsvJvZAznaGfCHkmGb5XMZgeCAlo6QQBlX9gaKVyagM0HTr7L%2BTQH%2F%2BLDXbCBhenpMwWe3XVXcConi%2B%2Ftb3Q4HrEcZIhANkJWwPLZIcCE8bjL8oHhqnq2LtOBoYMBLSdFDs%2FuZOqqcQy%2BYEFZyBGe%2BLryWgooDhdl%2BkGouqHU4iWR6Vmdgq9xztZZDdO29mQNMu%2BvLJbVEpitp3YpNwKWVNNvLQCe9WlTaKhf6PplXRZaZJzpGjTT6O0RkER%2Bz9kKI4ts3HgiOawKq1RWi0BI1J8KXcXZSuZ6IIb7cZWRQCqtMA0wgCD4yKZ6mlVKx0Q4vwbHPHYYfu%2Bxr%2FvOO7%2BXAy9tF85ai53YOiCK3z1qSHm52DUpcl5g9v4oSh7nyBuUxboIdaOhMN%2FI18sGOqUBSTLZsh1QOPSfflDWYwKpQX%2FrHWi5tv69RsoUKdOlMEmdtVxLKOCj3nZ0WD%2FzFas5sz5FoqGdcOGvxDO8%2BBdtJ0YUtewJ4UcrQhcFPZ4fGOroixBJTux5uDnProtjyC8ROOLPyBC6g4JgKft2nLJEVt6D1jjRGAjH7sdvkltb9ee1PNUIvkd2bfswbjYHbN8KfRWQFXugU7sNpt83dfoBZUjXdJ6N&X-Amz-Signature=29ad963fbe93724c945fc42257797d2817286dded42aa1e55123879bc8fec1ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TJUKXVG%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIDEgQp4F4TyRSLs55InaJwg5xgy4EIDsQURavp6e5n4RAiEA6JdUbA%2BcHyGxcHYmUkW3sugeHPMFLA1dGgPkn4EA6bgq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDARtkiS39468OL8S3ircA5FhS89JOI2F7WDn2O4BN6PnTwzeg%2BM0iWXMln4KXPMDh42Y8pRhEgvT5KoiHk2gxLnjqqwS1Sy6yh85sFPiECFaBS1lANT6uq3OHJurs10npLGh%2Bi6yCE9mUFupu46gO7JN8EvXXbtBrIfrrk4CyjlBd3juHJncts5cQ8Je%2BaltV7zu36SGO6N1GQJ1u7Mflg7sYI8hmpXYhGmgS2cklknPjdc5DzD4VnEzwgKpqASxT%2FNpu6dc445TFO8pCKWOFmwKBSyod0Reo0kpyZiNWd4rA8Lu1hWZgycN160UaSvWttcEGrrvz3keFWpT9dos2f0t%2F%2BGO418B5QmQmQebXdB4uw7JiuoqNvSlDMWj8WO%2BkgQIAjrL%2F8awSzmsuFbpV6B4HAkGh8riY8PBYzg9%2BsJuSPzHdBNdmv%2Bd1uZWCydEEvyN4yrdFXRcS6QRUbpDI09rg4r0b83d%2By%2Fj3%2BKAf5VA6g9mVMXVbtk7wYO2Ukce1dpXvD9evMbgK5bPWXvLpA%2FrRy%2Bp%2FGIIxsGZ6pn19ZlA7R7aKivYViBZorO6mPKvQ8%2BxWIK0kQxuwf5dCP9qSqI1ocK7YPsj45lYg1rk7tftEtylzVor0IomArY21D90TnbGkP2L4kZ27aY6MNzI18sGOqUBbB0ukkAuiib8%2FG74qrUfjr%2BQFt7QpmRYj%2F%2BCMwuGuRhlvYVldF2CKtkV0aJZt0nWNuPPNW1Vun9u7Sq5nM6GIUeSc%2BDtEEPbAAo%2BIdRXyp7n%2BCOFbQWvtHZYBkxIRNF1uC8JITCnLsTWQBgB8ZnYJMUBgtOvcTHfq5%2B0FMlBq7gRLu8PTATxPYwxRAsXGUIVll7esy%2BGhSoV3W9PGYiCSb9W2UKN&X-Amz-Signature=2007b7086e653fb9480f07288c557ed0c6c896c97a818c9d175743056a4850ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ATWZR3X%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDJwng1zBNe4akXNqBhQf3x%2FpkndonyeS6eTZgbH1ZgWwIhAKqc8IUeQJHHUUOlI9tbGEJW6belFp9KM14t7zLu%2BgmKKv8DCCMQABoMNjM3NDIzMTgzODA1Igz82jP7Fptr2G%2FZTcMq3AMbayTFQiVoB98UTX65cfi2MXJvTiNhIL1ERmEzirZT803Y9ML8J8pM2ecfpG%2Fv0Etb7nE09qPce7%2FLEziS8lpvla5bwJ6MO3q%2FFrvoWzauS8%2FVRfj0k%2BCtj9Gedpnc8jOylroMUsdYZMt0Bew6jQlveqYSIR2CXYJ3CLC4mq%2FzPhg0mDTLGnjDbm6vG%2BaPV75d2qOEwOSBH7zf%2Fkj%2BUrllEEzvWLAmjdyF3Ec9S3RCKRIc3T5KqmcK%2FFjUfoSKJ7LLqq7%2FxdiJnq78LnA3ytxuCCj%2BgxIIoOEFfzfX3HRFgyrOjudRC24cry3MhSDHLTiqGfIcZYSwkPamQAscuD3Geq2XZgkNcVaCU1jYn6rGiIdKEjfIRqpknjlP1GoatfJJSatvajBLwRyT%2BAkrZRHL2T%2B2AaYbTrgEEzXk1Df9do%2Bs2ryrswKT4TLBFD8YsW0o1AR4KViMk02ByeHCj1BREXbBmr1lSoKOkU0JkANNK1CRwTnyqI3QU0ICL775ZeD1BIWcBm0e%2FpLajrqtwRE5QN5fZRagtoPNkGOyaqmW%2FhyBdsL9FNWdjqNXgawaWi4iBx3LOPp8wqrdzs0YRlVcnH0eilBfyU372jx7GJhwD6mcZzmP4usKvjX%2BATDWyNfLBjqkAeb7JbSzeEERkVhrg5PAfUOKGGaOzr2TRdjVjYSlqUxIbkRBwwkQXV4cxghSIUkCb5xLL4Cwxgw6s74le9Z3MpV%2FPhKR6lFv20E7b%2BZEU9Am%2BZK6QmiSxMEBLIZUAK6yK4pcbJkcuYXg6yF%2F1QCnAa17AtiUPZpIX3fTEowyFNPK7hrTKgE7%2BeRn26pzmNkbBM2253ni4MvkyffA2%2FAwzSr8inCO&X-Amz-Signature=1d6b82da66b59165deebdf2896feda7016e405edcb4a0b771fcf4d4572d41248&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ATWZR3X%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDJwng1zBNe4akXNqBhQf3x%2FpkndonyeS6eTZgbH1ZgWwIhAKqc8IUeQJHHUUOlI9tbGEJW6belFp9KM14t7zLu%2BgmKKv8DCCMQABoMNjM3NDIzMTgzODA1Igz82jP7Fptr2G%2FZTcMq3AMbayTFQiVoB98UTX65cfi2MXJvTiNhIL1ERmEzirZT803Y9ML8J8pM2ecfpG%2Fv0Etb7nE09qPce7%2FLEziS8lpvla5bwJ6MO3q%2FFrvoWzauS8%2FVRfj0k%2BCtj9Gedpnc8jOylroMUsdYZMt0Bew6jQlveqYSIR2CXYJ3CLC4mq%2FzPhg0mDTLGnjDbm6vG%2BaPV75d2qOEwOSBH7zf%2Fkj%2BUrllEEzvWLAmjdyF3Ec9S3RCKRIc3T5KqmcK%2FFjUfoSKJ7LLqq7%2FxdiJnq78LnA3ytxuCCj%2BgxIIoOEFfzfX3HRFgyrOjudRC24cry3MhSDHLTiqGfIcZYSwkPamQAscuD3Geq2XZgkNcVaCU1jYn6rGiIdKEjfIRqpknjlP1GoatfJJSatvajBLwRyT%2BAkrZRHL2T%2B2AaYbTrgEEzXk1Df9do%2Bs2ryrswKT4TLBFD8YsW0o1AR4KViMk02ByeHCj1BREXbBmr1lSoKOkU0JkANNK1CRwTnyqI3QU0ICL775ZeD1BIWcBm0e%2FpLajrqtwRE5QN5fZRagtoPNkGOyaqmW%2FhyBdsL9FNWdjqNXgawaWi4iBx3LOPp8wqrdzs0YRlVcnH0eilBfyU372jx7GJhwD6mcZzmP4usKvjX%2BATDWyNfLBjqkAeb7JbSzeEERkVhrg5PAfUOKGGaOzr2TRdjVjYSlqUxIbkRBwwkQXV4cxghSIUkCb5xLL4Cwxgw6s74le9Z3MpV%2FPhKR6lFv20E7b%2BZEU9Am%2BZK6QmiSxMEBLIZUAK6yK4pcbJkcuYXg6yF%2F1QCnAa17AtiUPZpIX3fTEowyFNPK7hrTKgE7%2BeRn26pzmNkbBM2253ni4MvkyffA2%2FAwzSr8inCO&X-Amz-Signature=8a039d0227922e81b5c7393c685a05dc04e99c5b407438efa82355853c72b14b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJDZ2R4O%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIGI5ZQaI8mD%2F1oDZCWwjYfrH%2B8U%2BM259yWkglHpN5HotAiEAwfIVlafjekmWU5hubuALCKWzCnp3FdIRStzlhVwlR9Qq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDKvQMlJUXRL3J9uukircA%2Bd%2FexELf31PPKK2zAsnMhowudUknvxZhFeKlDROwl%2FYzwiADUrC9ojHExLXB13gT%2BNTQCoPVgVOj7MrB4HzZBz5TnhOtZW4QMHzdXt3gabFR1dj5zMestePCmDT%2FdMaJKDFyDrUdkJmDP9kEfZPHw9ULCZAnzcB1Oi6lLVUPVYgoSnvp5nBN6%2BgaZ5TnVJtTzMrry%2BnjpkY0MlLdC3Y4xl1eFtHuQ8cFm2J2qCm3maLTdjUE7yfQLmPSvyrbrKBcJKSDiEKbF3vJ5n1QJ18ZGpcTLxx60WwIwI1lPucfJQotDuCCm9NCI1BrEwIabnnbo91OuvPBBURvY6joLT4P%2B1NnD%2BMYvy2IpQXH9%2Fs0pt2oGSt9nmAKUZc7x9Wkp3D9UeZwNrl95b3HfPXkG0XMWxgOXPpn4vMqMYieT8PLgBlmp3cTzN7kO200R5HfMFbVL4CFXgx9ZkjS1RKfQoeMIqFH9CqiEfYg%2F8YxXQtvdvvpApYMuHkp0S6IAjdHf9mZaJhAdEBuw1%2FBdScRZZtV5US7CSu1xu4C0nJ5jLjF7LIle21Vr%2FPABEzjuGruO2XvhHZ0hVSH%2BLcZq81OgM3KtSHsxDR2ZLuIkNVfra8muOhGw6d8eU1R6IKLLn%2BMOHI18sGOqUBC1zXDW52NUaLpLvjtd%2B0Kk4XhKrTsPgprAvTnWG0a5%2F%2BQa%2FN1I76CFov9XuIIxuT70aP5rNqlg8Bknhd1lmrUmITzMJsbLvtc3FKF5u%2B%2B4Ofpm6ZcgUMzzU7BCHwTnCMM1VIvkYCTb%2BEpD0id5zgj3d8dnfW72XtMy0D1tmWS9RMdQK6aDYBXuLt4PKfi%2FPgYCVeztjM%2Fb9%2FMdbsHRb1NUjwX%2Bod&X-Amz-Signature=4f9e3371d149fe0fd4676cac71998c7d9efff89a656c648e337db6738dc8bf5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673WA24RL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCJ48LqEhbXOCwt2kwk%2BiUcbOdc%2BIm3j9OQ%2BSPU7R2W%2BwIhANvPGbjb4iF0yqHxq6cvreWZWr7pRBW8I8Y6xG%2Bm9o89Kv8DCCMQABoMNjM3NDIzMTgzODA1IgxHbkEx3amJNVJXUvEq3AM4uTPSRT0LiOu5NCwT4oEfXGGnpBkPThAxB9dZWYjFaVLBOeyhjLEk%2BYlaW0qx6iNaaytKBTijDbt4xsweJJJ1%2FXnwn2mH3c6IQMebP767ja78CWxCxWE3ICVXz%2FYTh6vl1vX3gU203tLGklcCLMSO9vu9lP1ZctB%2Fn3gywVW%2Fe%2BzJ5C4TPrTXhKmwb7iGXuO2LbvzgJe%2BAfJ345OWDWmZgmcTZdDfakHpkf7IlNyRGxGv1ehiZPjhdczFrohiem1untU%2BTV2HgM8p2CpDiNmAOt%2BklANhanDFzlyeGQJBbRR%2FYJfaQ4U49Gz8q6dBc0MyN09Otv5aMyqBZ%2FssUhyzq%2B3iiK9ydqoVfgP1GgN7LUDzF1sLJgcXfJS7ypaYoWEwsmvbcMrggOldv2%2BXCUTQeyHFB2xOm7dcbvagdi0KXOkUwaOYRuZVCkNyHO3Ffzt8wCzK6SuHSivovzkXZRO0flcmSnCl%2Bu5iW%2BXjqOOG%2FEQkQAnDaoE%2FwIW2oWawe7ihZGmcaagjRVqPACpmkVJQ1kzE1xDJbyhySubszTNhKwiWUHgMXo%2F0aEqISGyIM6iZaHRVChMn4e5ZIPYixREvVzAo2NbG5Y2qOcu1IXOZjG%2FjzMDRskvPrwf4lDDaydfLBjqkAbHnK%2BfEduR1rnQRdFoTrLIJ8BuKxg1NOLs7rBT%2FXqOIKfwD3WX%2F5UYApJ9jWiQ%2BBsjRb0eCfGbs8UzGwGCOoX9iiej0rzcG1bUAcdA2oowdoaD%2FP%2BcnvldQU6ibT77Yujmhh84NQ07gY1l3UepS1NMp7qgYaVVztWavjuDQba4FcD7VZsEI2ep6mUcLygrU2QwU9lf3SSP2Bs0rFkb3jZx9ckHr&X-Amz-Signature=2e92e24f0e362e85285c58d79439d8f903321ca4334ef5ed059bf014497a3bc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673WA24RL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCJ48LqEhbXOCwt2kwk%2BiUcbOdc%2BIm3j9OQ%2BSPU7R2W%2BwIhANvPGbjb4iF0yqHxq6cvreWZWr7pRBW8I8Y6xG%2Bm9o89Kv8DCCMQABoMNjM3NDIzMTgzODA1IgxHbkEx3amJNVJXUvEq3AM4uTPSRT0LiOu5NCwT4oEfXGGnpBkPThAxB9dZWYjFaVLBOeyhjLEk%2BYlaW0qx6iNaaytKBTijDbt4xsweJJJ1%2FXnwn2mH3c6IQMebP767ja78CWxCxWE3ICVXz%2FYTh6vl1vX3gU203tLGklcCLMSO9vu9lP1ZctB%2Fn3gywVW%2Fe%2BzJ5C4TPrTXhKmwb7iGXuO2LbvzgJe%2BAfJ345OWDWmZgmcTZdDfakHpkf7IlNyRGxGv1ehiZPjhdczFrohiem1untU%2BTV2HgM8p2CpDiNmAOt%2BklANhanDFzlyeGQJBbRR%2FYJfaQ4U49Gz8q6dBc0MyN09Otv5aMyqBZ%2FssUhyzq%2B3iiK9ydqoVfgP1GgN7LUDzF1sLJgcXfJS7ypaYoWEwsmvbcMrggOldv2%2BXCUTQeyHFB2xOm7dcbvagdi0KXOkUwaOYRuZVCkNyHO3Ffzt8wCzK6SuHSivovzkXZRO0flcmSnCl%2Bu5iW%2BXjqOOG%2FEQkQAnDaoE%2FwIW2oWawe7ihZGmcaagjRVqPACpmkVJQ1kzE1xDJbyhySubszTNhKwiWUHgMXo%2F0aEqISGyIM6iZaHRVChMn4e5ZIPYixREvVzAo2NbG5Y2qOcu1IXOZjG%2FjzMDRskvPrwf4lDDaydfLBjqkAbHnK%2BfEduR1rnQRdFoTrLIJ8BuKxg1NOLs7rBT%2FXqOIKfwD3WX%2F5UYApJ9jWiQ%2BBsjRb0eCfGbs8UzGwGCOoX9iiej0rzcG1bUAcdA2oowdoaD%2FP%2BcnvldQU6ibT77Yujmhh84NQ07gY1l3UepS1NMp7qgYaVVztWavjuDQba4FcD7VZsEI2ep6mUcLygrU2QwU9lf3SSP2Bs0rFkb3jZx9ckHr&X-Amz-Signature=2e92e24f0e362e85285c58d79439d8f903321ca4334ef5ed059bf014497a3bc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FVO2AUM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIBvUHiw78XbpNGXcnbR%2BFkNHpSuuAKnK4pWNKAZ8kLblAiBpyvpqrrKwe7xYsHfS7w2fVsIaMJOfzvY9ns31jCMI0ir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM%2F%2BsNtoTXujvBtU6TKtwDodZgBe0O2T5zivyLB1BZA%2FUfCetoZTWB5C6e54qDMkEwAkRUKre6IcvFRa%2Bq4s1uVJNGV82Jz1Jc62XkfDXKrLS2eB7FxHBWQ2RaUABo1jde5dcwzsFnW6uPTd4i8XvDFl0zS6%2FcFYAeWhbg8Axhtyf5jsOwcr7s09DxDOKEL62V3tvtxabsXMCnoeLum%2FnIO1nWCYw9AYKmsZFuEoixpRTLrD%2Fu35zGiGSgw6yGuIhIUAKayaXoG8C96HlRAzMEDpaRPxPQBnJBQGo3u9S52aOtraZYiWEDZ9E75mtepukWVCuW1SxQx3s12tl10gn50zpx%2Fr5Ol1VEaAg3Ct8hru4F8oYD3ArySO5iXzlnEg4vg4QqKhbetr8xSgocDxDBw6eRNhmm2WxXsno%2B0w0Tkvm3Ck%2B4LfiFkjPhKDq%2Ftifh1JKTSUNTyuec7BvaMT3lojIjRSsJj7S%2B5L3IyJufSfbgk2z%2F8xWHX7%2FcxzAnmR6RPknoDj8PwB0BzZIzuF%2BEnVRNYT1BrlB6lUYkGD9xuGyxl%2FwWwD0bnEFeMUR64fs%2BzkrOYsCIAhAOdFpphyC3NbDHmFtVrIm9XWOsGTGDZxt%2BAX%2Fi0LsZ%2Fyx2hS94YMFcwY0zJFw2z4h1w58wrcjXywY6pgGiUh69WxczNA0XV45FtlfYbu5clXCdk0MqV1fMK%2FxOeygOOqtYdYVXTI77Am8pNGGwUwuJBqgypphYeQQGGbW0P4LXPH%2BNLONWPkKhj2bsHpAIZmOvcZYVuZl0r8ZgqJifWTK35ny5IGcwSDBKkLAlnH%2FusGzJ1s59VuaCKAfUEqdd3zhYdKm2Yh1Bq03Ja147v6wRvGhZhymIxj2WFLrF2EfhSPMu&X-Amz-Signature=79a7377901c3182e6ba5fd3219b174b80215e175d29cfbc59d3eadb6f19fd20e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

