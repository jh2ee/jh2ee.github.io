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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VW2KFOOS%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIBGJp57OoY8n8yNLd05O05QzMFY%2BkzL%2BEsZgUreXhsNcAiEAsUq6E1YxaqFI3wdNLUP%2Ba3pXVFFESgadqZuD0xNNAAIqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJd9uOsQwZNOEI6uaCrcA946jKdFaVWrMv%2Fps5V%2BfTxaUnxMhHlfUgIweVqLQiZvJTMuSQI9K6MEm%2BODl9miGP2gWcm3SBc1UAsXjXfpyzPt%2BTusp2ZOhckSqoPZZzxJcY77%2BDZHJOFiBodw33VsMdoPUYJfsH%2F0QGa9KNhe3iCmx4C%2F3NZf54Dm0Vwozqfj9NHLpZUSoi50P2a6TtFGPXSX%2FmqvR0XCmOiaHTgSJ5h%2FbshUt10AzBFB03KE47Slaz3ADCUXmGclplDEmgv6sfvGng40hmygaLY4D0bAAx0jsw1CkrHY2pG%2FFazsP1DbB4rQvcMrCvIap5K0tR6V5FJIH8xxCzVLZLsUQf8Zwcf7WurDbptIzefikyNNL5u91tAan9zCDidkhHIlb12IH5NT4goHUh0YsrhdrptsDcLC2NaK3YkTboFrwBJgdzEp13B%2FmeEKdexZE3obd3F5lHITqqOEP2SadqhCI6WKOQe0uwvMmBVPyg8U86uxVMZXPmTiPfBN%2BZdDQHe5CDoB9GKLDwXObb9Ps4w55HX7fvlhghxeh48daJKb8Z1t6vuEqKGjwSgvkEsuC8rMTwOzOeDocvU6XiK8VytyLQWdyD4dGN%2B%2FU6LDzWpcub79kY5%2FuHko5TI0jbptYCElMMD2%2F8sGOqUBtiMN%2F4fEPQiKKCJ%2Fhd9aRNNRQktVtyux51kItUJz7K6fQ6%2B0mUnCkI%2B6LPk0jT0XZPpgwDKxI6O4ZWRAuuQM30WJG9AuPh3j6fOzMtBumJKG1SqsECnNC4U8lsVT2vmUMLnwtqr13q2X%2Fme5kJnqcQQQGT1tS4wSb1RbupHNy6lENcc2H1%2FP1e5vpkomaw42S%2Fm30qj16GS1htSpSH9musBTyZOV&X-Amz-Signature=eb002d88bc5bba0a1cc2ab56f0da86c5315084cf6e5d6530d9b56a68ddd1de63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VW2KFOOS%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIBGJp57OoY8n8yNLd05O05QzMFY%2BkzL%2BEsZgUreXhsNcAiEAsUq6E1YxaqFI3wdNLUP%2Ba3pXVFFESgadqZuD0xNNAAIqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJd9uOsQwZNOEI6uaCrcA946jKdFaVWrMv%2Fps5V%2BfTxaUnxMhHlfUgIweVqLQiZvJTMuSQI9K6MEm%2BODl9miGP2gWcm3SBc1UAsXjXfpyzPt%2BTusp2ZOhckSqoPZZzxJcY77%2BDZHJOFiBodw33VsMdoPUYJfsH%2F0QGa9KNhe3iCmx4C%2F3NZf54Dm0Vwozqfj9NHLpZUSoi50P2a6TtFGPXSX%2FmqvR0XCmOiaHTgSJ5h%2FbshUt10AzBFB03KE47Slaz3ADCUXmGclplDEmgv6sfvGng40hmygaLY4D0bAAx0jsw1CkrHY2pG%2FFazsP1DbB4rQvcMrCvIap5K0tR6V5FJIH8xxCzVLZLsUQf8Zwcf7WurDbptIzefikyNNL5u91tAan9zCDidkhHIlb12IH5NT4goHUh0YsrhdrptsDcLC2NaK3YkTboFrwBJgdzEp13B%2FmeEKdexZE3obd3F5lHITqqOEP2SadqhCI6WKOQe0uwvMmBVPyg8U86uxVMZXPmTiPfBN%2BZdDQHe5CDoB9GKLDwXObb9Ps4w55HX7fvlhghxeh48daJKb8Z1t6vuEqKGjwSgvkEsuC8rMTwOzOeDocvU6XiK8VytyLQWdyD4dGN%2B%2FU6LDzWpcub79kY5%2FuHko5TI0jbptYCElMMD2%2F8sGOqUBtiMN%2F4fEPQiKKCJ%2Fhd9aRNNRQktVtyux51kItUJz7K6fQ6%2B0mUnCkI%2B6LPk0jT0XZPpgwDKxI6O4ZWRAuuQM30WJG9AuPh3j6fOzMtBumJKG1SqsECnNC4U8lsVT2vmUMLnwtqr13q2X%2Fme5kJnqcQQQGT1tS4wSb1RbupHNy6lENcc2H1%2FP1e5vpkomaw42S%2Fm30qj16GS1htSpSH9musBTyZOV&X-Amz-Signature=eb002d88bc5bba0a1cc2ab56f0da86c5315084cf6e5d6530d9b56a68ddd1de63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4NRITBL%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCbkWQWenaDLVG%2FkCSQZ3x6RC%2F7Esi3abUA%2Fz6Pvb1DowIhAOEAnzczOpUSkuVBEe2W0PWnXODhEsK8guTmiCSJFHANKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwqRhMONhxb9LZzWMAq3ANZK%2F3ksOo%2FEfIEDpOKNydKaKVdk9YR7OrXBEBV9osaMCCvD8yVepQ9Tct3NtndPxUT0sbyHDc6tkE8ah3A1ShEt%2FsC8JEvnZUcCdZZuH%2Fsqkd0CVpdokjHovMcusBOSW809hzhvx7QeJcoxkqsXgZwyTAI0gR2RVFMEUybpJz7Z0KNGMqC8FvZFdA0770rgySKSUcXRLHmwg83qO7QQSks3sjHGMUZHd%2FwqBdbgR7aXZdMJcXdz1iDKKHEGeKOLhhVCBNwGXu%2BjnSx%2BJONceLp86Ic%2FI5lk5pAxfle0z1c%2BPzMeVBX0BUz1CmKVVmcFJw8y8IOiuEVVkHNvyhedHBJnzahsVnRzclSXWujIad%2BDeBy%2F0RZREZaWQNw85wYVfWDXXjg%2FwWgtVbyEA%2B01hc1j8%2B5pZsfDDkedNDp06669kCykCjqLJlDAm1tN5QFEp0G7DiCH5G5P5OHuO0Yg0IZd9JQdiZumhowIX7wDDC9sLM4LB7H2d13M0rxnOsRRVwE3egNgrPELXC6n6WQd4Lardz2ko3a6pPEAs1jKkqyjNiABQ%2Bx48p2Nhr7AbxV3hnYimdHsNZjKo0aHxGYmPGx4a51WgcTJ0jbWJJZYynSus0tUPN%2B3RsCRXSUVDD09v%2FLBjqkAUBcQQCXcyDynsq2tnKJThWyYU3ZN%2B0bHjNmbxq1%2BZY2Vs2AZDwyonPbdbDe44J54EOKId8033KNtQdc0UJLcGnKRdketbxc%2Fxqw1bQpkzumw%2B2Qrnxgyoa6VPyilaCPryqz%2F%2BjW9Tf0M%2FfolzWV8Pcoq0WWDePew5ckounjNj2MlLk4jQfMOa0JiZqZS2uHlLlzgH3qKaB23CDqDoJ4BhhSl%2FEb&X-Amz-Signature=e148bbedb1ecf7c8f58b4d42aef1b323e9a089efd437c615a5e2a000efd25120&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B5SD6W6%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDt4RMr02%2FT3TclI3aHtppbaXSwvOEBNTDcMceWOBNxWAIgCzJovBtW4cxsASVRVtwNsykxKIxJ0B5kNBSsuWT%2BGkUqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN8uILypDa9kPGQbhCrcA8a9fL8sMlYvYFOFNfOyWfX5cjhwFpMeeBONjYnOg4OhSgS1OScOSyaJERYqcJdQw5LMApztWczc1EbCdipfSDH1Cm4MWpmmbwCjtKBoCQKxMdq8vzLhiCrdjnXtQw03lB5XDH7v3bn5NkGpgS1MB%2FMrM1KoP1kb9x2eyEPYFjIrTA3y2vxMffG2SQVQO5Vq5TK2I7j4guFLTxByDIa1xX8xkvkLpKvwk03ahbzqtMvRKb91ggPKZVC6mQOXZHZOQ4RQX3cYK06uQbBXYLA78IKlHU%2BumhJmO9%2B3XDDr5yKEdzcHlqNpCALebicO8ACufehgX9qdKHIU9jh%2F5xiOmR5OkqF2Aq4BJcCKvT8hhGG7Lq0kZCPIbrAUf5Tcjwx%2BvugCirUR8Mw03AiZ935xrb%2FnZvsAB8uW0mYXWrvqxveT6AMTv%2Bd%2F2%2BuXDyhNqMu%2FE5UI%2FGInwBRZZDmWU6K0aa8QvpHp6OBkl8mYekbGbL4X2t85BSsN96%2BXmNsBYOIH44NqSCTjmtaWVHH3e88q%2FDsutavp96WIfqMyWWGi7t%2Fc9dUpYc2Z5PtdDOZpFzxxedlCmPpVGf6lJV8yL1nMlBuD642IvOw5n5U4sJxJTA6BAMzaGjwacTzTPYoBMPP2%2F8sGOqUBH%2FbIZGouE45AaTWdHlE3csgBO3DpVuWBEthMDvE2K%2Fjy3k6dVENMKR1imxo9Ceo2wvO2sx1061R1q75oZ9jzRqAdXMMwwRT4vW73HxFGNlTCwSDdYlyuf%2Frk4%2F188Iwe3C1%2F%2FcMcak7aQfsngpL6UM5%2B6Kg8E0I7AX%2BXFOfaZMfnDlyqnt5sCBPnRsOxnTVqDRuH1oZfr7yRnFrP0ZkGAmYaTqH3&X-Amz-Signature=269272db247d47fb284097dbefd12ff240cf87f8948d7ce8a6f65bbab3aad85f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B5SD6W6%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDt4RMr02%2FT3TclI3aHtppbaXSwvOEBNTDcMceWOBNxWAIgCzJovBtW4cxsASVRVtwNsykxKIxJ0B5kNBSsuWT%2BGkUqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN8uILypDa9kPGQbhCrcA8a9fL8sMlYvYFOFNfOyWfX5cjhwFpMeeBONjYnOg4OhSgS1OScOSyaJERYqcJdQw5LMApztWczc1EbCdipfSDH1Cm4MWpmmbwCjtKBoCQKxMdq8vzLhiCrdjnXtQw03lB5XDH7v3bn5NkGpgS1MB%2FMrM1KoP1kb9x2eyEPYFjIrTA3y2vxMffG2SQVQO5Vq5TK2I7j4guFLTxByDIa1xX8xkvkLpKvwk03ahbzqtMvRKb91ggPKZVC6mQOXZHZOQ4RQX3cYK06uQbBXYLA78IKlHU%2BumhJmO9%2B3XDDr5yKEdzcHlqNpCALebicO8ACufehgX9qdKHIU9jh%2F5xiOmR5OkqF2Aq4BJcCKvT8hhGG7Lq0kZCPIbrAUf5Tcjwx%2BvugCirUR8Mw03AiZ935xrb%2FnZvsAB8uW0mYXWrvqxveT6AMTv%2Bd%2F2%2BuXDyhNqMu%2FE5UI%2FGInwBRZZDmWU6K0aa8QvpHp6OBkl8mYekbGbL4X2t85BSsN96%2BXmNsBYOIH44NqSCTjmtaWVHH3e88q%2FDsutavp96WIfqMyWWGi7t%2Fc9dUpYc2Z5PtdDOZpFzxxedlCmPpVGf6lJV8yL1nMlBuD642IvOw5n5U4sJxJTA6BAMzaGjwacTzTPYoBMPP2%2F8sGOqUBH%2FbIZGouE45AaTWdHlE3csgBO3DpVuWBEthMDvE2K%2Fjy3k6dVENMKR1imxo9Ceo2wvO2sx1061R1q75oZ9jzRqAdXMMwwRT4vW73HxFGNlTCwSDdYlyuf%2Frk4%2F188Iwe3C1%2F%2FcMcak7aQfsngpL6UM5%2B6Kg8E0I7AX%2BXFOfaZMfnDlyqnt5sCBPnRsOxnTVqDRuH1oZfr7yRnFrP0ZkGAmYaTqH3&X-Amz-Signature=c229eb01f5fc22c2d8e78d07c72cc1d584cc08b81d675829e976771b41ea9f11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWQ2WYEM%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCICqbtdzmyfjHOzFMqVT%2F72JSxeYzp1UoPPBXIPJ8VdzSAiBzCPnAGy%2FyyDLzrPPLqaj7RiEYv1yQSq49yOlbsxCoTiqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrDXOCr19H3%2Fu%2B9JGKtwDc%2FW3Lh5dyVqLhTr1ktcNYChpMwfEez50i2sCCMS13iL8isYA3SgCLEU9w3SaFX5oY%2Fa4VfZ%2BS38laAjtmqqmkwD4faPxwWFTjn0AiTErc8tcbe7nZGg6Y3vvKT36qSd3xjenBrckQ6UcyWb3d2thNasfL9U%2FlJh5IvAcg7VUCWFpR%2F3GJRHRE55m2jvnc6imS2FgLda42qJBh6CXlXgZq8tIBpd5zFZfqjAaorZnym2huCoOH8EOgx1ACT7tZwZVD9puiUWch85ueYcwC2jrUULmDV1vubsJpxkSTXsgPyABLRRUiNk%2B8%2FS8P5BnVxxzCsCbdpF5CA%2B%2FuJetd1WFli45GBDqe8MvdCNFgkVf1nnalYRlYn8c4R9R8UrOYqTh8uvAvwrojpPHX%2FlvstbwahxUMIWzMATOZZxUaNd8LQDqgWQ5EISm48z%2FNyAMSHFULskCOEKBs5gMFY7CO8CZuaM6RF7D7uZCsKuBUTFM7lI3vmfvWiRbNnzSKa9R1i3BRtE8RtCDA9aNBUX8g5zH2NcO0lZBRctWv1HGglSaXRVf119lnyLdbfY9ZWtYgeT8iOeqA8zAuUD%2FZbWg9zRd7rk%2BibVJrxB9QSxEXHchOs1scEIK%2FX%2BXLYrLSYEwhPf%2FywY6pgHQNVcttQWgSMou9f5ibA2IsSBTiQdLN0rM0PC5J1AfExKRHHL79JBdnm0nSn30fCP%2FrVk0Ay%2BMFwFci6WAyeRQ0TPKF4gPPuIvSL80yoUa0Q%2B5X2ig44aQCx7hgnFEW6ban6kQe3nkj51qAwVeWARCbtTacqBKc155JnZ6L1MGm3g623VUY6V69pKhuPyZgWkq4DVt2pGdl2g%2BriAb7Jyn89AWbmyl&X-Amz-Signature=62a282da0a8655345091e6fb206e5be224c532aa17c0036804e503482addf100&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFYQTZMW%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIDykU5%2BqWTk8mZWlGXkk97AitvnWILDItfXvp0FMOs7eAiAee9iokRD95ORG%2Bi3S4XPQ5e1dSv%2FPxKOSwdAzRtkNDyqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaB9xU%2F74yM1pFxNmKtwDEaklT6sVCdn7DFOZKnkRy5xJ5sSjvxhZqQbAeegM%2BbCRBnquU9Q%2Ff1vF8F4exfPp%2FV6bIksbizsJic8ZDu2rRuRv%2FLm0ZQdILHgYU7OlwzbalJCc2PAZX1OWmNKfiMmJ3bickyoAs3ZBmeVrWUZ%2BINVcg%2BJUtdZ%2BSbwJoe5eAc8OOPv87liecEIdxhk%2F6yW31N5tECu%2FSZwE6r%2B5RucTAr1rJNc4WKW5OudLwzpQC3OqmK2gAcQp8PC%2B0c9m9VB9GcLtzU1Fa%2BnRsenxvgsKl%2BCBvSONbpXpYcCBe%2FajaolEfON1KMRzdFpYK7XJAtxsG4AyGsgqdknljAd%2BpFv5ToHPf%2FUBxWbMBa8rqNOPvgAj22v83NBxumu5Lw6ZSmqF%2FZRMAWCwpiCnffGs2PS1xoetn1xHDlJavHtA3A3XApGzd027WqR8anK2UA2Dh0CIknQw5vU715EweREBLCLSGbf6m%2FH%2BA7HJgIdlfj0azFez1mLW%2B7uGyr8poSWXgQPR2lnGcwgLxsrMkGMeLZgww4UvxfYFvjH6fs6x%2BFKJ3RzXKP7fydK3r1SEbsLsUKd9exjQPU1fR90HgXF0UtWzeK92KfMHuce4oJbT0m9BfSL7Z5QSYuxzszrll3AwgvX%2FywY6pgEHFgycRTQ%2F2tzNA1enxoPpmn3xPQdWiqyS0j7byb86yVDlXnhjAuL4j3DTS3M3f8nc3NkTLeFmXYmhJo%2FAwQC%2FO4ZLIVgo0K3pAyw%2Fr%2B0OxllERHDTR5is18aF7mXIpniKk9MWVQ52ze0ppCEBZnY%2BFiXEQzypDARHmwJxMbz5E5uPCwf%2FXET37%2FugHQj2Pq%2FCybdQPZFvGpaa5X41u2%2Bg96lK7X8C&X-Amz-Signature=ee343d940e4cf5b0193cc4f9e3ab45b30107052d71498af8f5cb3bc0086cd87a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5I3DU4D%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQD0iW6V%2B4wNcH5cHItlAzFPRM2rH%2BQ1baoHMEJRIlDv1AIhAMPHIBZqdxtzcIXQUD96DDC%2B0rKb9agQrOshoFYkLSHCKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyu7N6KnR9n%2BQurHFYq3AN5hRkzs%2BbQu9QHQ3XoCmXGAdOfoSpMckgM5RxRC19ymAXvLcWtSvXca0eQtAn38Pl3TZn359R%2BImLqbQR8LniysRfqpqCacCXl%2B0yvULkmWSn72qmVwYWkgsBM5NwYP2yhmxZ%2BSb3839vmZVUaia0BvLLJskS3SjYMGh9RGH7GwI5QZIGQj23oZfW0XfC%2BXZGSjBZV1HlgoRx4pW0RPltAMgaFqkhdiuQwEtA3T%2Fikzbbi2ZwSNZDvX3YA07EjaUxYOowD2uzdsBk6Q2tu9A%2BA0IN%2FPM7C7Hq6ZdYoLLgF83avPcQ77P3Dyin0iWDzaQS%2FVYQRAICc1BgDCnIk%2FcGBrr4sXCMydR8otJemAj6Y1pT7sli4T9djkudq7tj9RWOEKuxWHqypnbdbjKBYvFvDVxmzoD252%2B8n5JY%2BrRu%2B1oXR3yJSnukORjWUr3B%2FH0leJQkXIytrwPflgYN2HqAu%2FJrnCp%2BbuYHUFA7Yn1V4bmhCYC7rKXgQS3ZTTXz2%2BRlGZk4P2GDZifw5pWKmfd8JVMj4Ab6q0LSQNcuo9kIG0YGnN%2B7N2Z1eM1nvdwp1GmhBz0ufoEpQMzywM8bMVyr3Ef4yh%2BhCs86tJLri7CPT5RjR3ex6rrAgOTY2MDCJ9%2F%2FLBjqkAZaaksPUWojJ8Hg%2FH%2BImoEgedGpU1PoY%2Bgw9emdx5Xr7Gru9gtWBIoMBgXtwGpLnTYkbqelb4VpCYk6p8iKyA33WfEy%2FLWb8XbTawzqXqyvzkO02kfaJm5Uby7OJmbn%2F%2BDX%2BkVAeFUHwTs37G%2BAGxOvaUxNGVh8QKeT3b3IW6Nk6ec%2Bbcul22K5e64zDOz1TPBfEo9LqCYwrb2eIs2ivtUh7r5r3&X-Amz-Signature=9cc245843b23883b5388ca6225fc3e71733603006ced3efc75143e7b2462d9a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX7Z3PZG%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIH8RYuyLrJLVtHicFoIft6pf6ZUH45nlhItIlBhxXABkAiBEx9ns0odgcxaHcsbw1cTVVzPBlmbURkNM%2FPH5lRMBwSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKDtWDLrvGD7IROnPKtwDdZaDHwwTYhmUV7hufuVfCG5%2Bz9YrgqlRTqCA7X2oZ3XTn5nYOBv7IJ6h2aJATj5A%2B6SCdw%2Bspphu8d4v5IMG2YpsDXLOGWetLxjXQi0jIqW5IIL6vo5C3SRJaO7luFeFZC4l8y5YsI4E0YC6rAMCEbOsJ6DufoSsX%2F7eW2XOEBki99oygy7bjjJOvF5HL7LR3%2Fv26GVygkFmkljrUTcc931DbH1N142UX8%2F82eFowwLUSyuUX8EkaEPyxIiWPYOSphzIcSpoH0MdXErPC2IHn%2Bfaon1DbxcxlmzP1Rh%2Fj7leO%2FQhHrwlvhY6hKdUtGDSNL40j6nzxYxg4tHoqKpgGLSYO56X1Hf7djlcjE1DjTPF8nd0J%2BQpd8%2BMEETQYIaiqLfgNQiuc14rHxDht2cgNLM%2BBEBd4GVBSyoQkcmZBGWbDdgKQgPNWTHmEGZp8nPbPj8miLeYoOCdg0hGhl4zbusaKD%2Fqt1g3nYSH%2Fj8mRDFGm2WT9%2Bzs22kgfUTSggjtQlmKX%2BNXa42qJ7cxQwGvXonufeplFRidZwp4bU%2FuU3nZhtfq7P3JWhaR8vEVrqh7yQ6G1PwO5Ttpvua4tOqWSlKhtr%2BzXGkHdwUvwOEiPABHB1xXQl%2FB7VNIRVMw7%2FX%2FywY6pgGI14hnTr%2B552XWBCE7jnwN5wAf4lb3f5mQo%2F4ota%2F6eXPlUqc%2BGe1PjQlP0xffOtU3g9pL7m%2BOWGmKj1tXhQ9PjwZp8OWj3O0njvHMmDBAljxUFPQ3AMANG11mWxjGc8qsNCYFopij8Ad1sMbGjYcx0kf4rofP8p0iI7ik3Kbil5pkIUl0Hv2jBS%2FDXEgjNippBRA44gjtr%2BTQDZpuFygDLhtIBepF&X-Amz-Signature=553b48061fda7eb158c8493d155c409ae4860c7965720a25d32b8010ef83d83d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX7Z3PZG%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIH8RYuyLrJLVtHicFoIft6pf6ZUH45nlhItIlBhxXABkAiBEx9ns0odgcxaHcsbw1cTVVzPBlmbURkNM%2FPH5lRMBwSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKDtWDLrvGD7IROnPKtwDdZaDHwwTYhmUV7hufuVfCG5%2Bz9YrgqlRTqCA7X2oZ3XTn5nYOBv7IJ6h2aJATj5A%2B6SCdw%2Bspphu8d4v5IMG2YpsDXLOGWetLxjXQi0jIqW5IIL6vo5C3SRJaO7luFeFZC4l8y5YsI4E0YC6rAMCEbOsJ6DufoSsX%2F7eW2XOEBki99oygy7bjjJOvF5HL7LR3%2Fv26GVygkFmkljrUTcc931DbH1N142UX8%2F82eFowwLUSyuUX8EkaEPyxIiWPYOSphzIcSpoH0MdXErPC2IHn%2Bfaon1DbxcxlmzP1Rh%2Fj7leO%2FQhHrwlvhY6hKdUtGDSNL40j6nzxYxg4tHoqKpgGLSYO56X1Hf7djlcjE1DjTPF8nd0J%2BQpd8%2BMEETQYIaiqLfgNQiuc14rHxDht2cgNLM%2BBEBd4GVBSyoQkcmZBGWbDdgKQgPNWTHmEGZp8nPbPj8miLeYoOCdg0hGhl4zbusaKD%2Fqt1g3nYSH%2Fj8mRDFGm2WT9%2Bzs22kgfUTSggjtQlmKX%2BNXa42qJ7cxQwGvXonufeplFRidZwp4bU%2FuU3nZhtfq7P3JWhaR8vEVrqh7yQ6G1PwO5Ttpvua4tOqWSlKhtr%2BzXGkHdwUvwOEiPABHB1xXQl%2FB7VNIRVMw7%2FX%2FywY6pgGI14hnTr%2B552XWBCE7jnwN5wAf4lb3f5mQo%2F4ota%2F6eXPlUqc%2BGe1PjQlP0xffOtU3g9pL7m%2BOWGmKj1tXhQ9PjwZp8OWj3O0njvHMmDBAljxUFPQ3AMANG11mWxjGc8qsNCYFopij8Ad1sMbGjYcx0kf4rofP8p0iI7ik3Kbil5pkIUl0Hv2jBS%2FDXEgjNippBRA44gjtr%2BTQDZpuFygDLhtIBepF&X-Amz-Signature=ef93fdfff88390f63cd639d4b4313c5be47666fda94d90e09e2876cc218df4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAQXCEF5%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIG2a9Ue6NzCAaR6Q4jzVaNTDTxMr7Zsxsu8hAgQ%2FqJ%2F%2FAiBfWwmyRLT3o4in20lY8%2FVXQ%2FApJcvJ7UUesBJDwr6rSSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMW2Ea2l1Zxgsj3bSDKtwD6wN3odsZqyeqbraMI7JASnr3EU2MvPL0kpZSzPLousVS7OYhJjDa1gHmAb236zj%2FnGMES470c53X042X5Kd2R%2F%2FuWcj2GT5f9S1SC8AdhktncQjAwSaSpT82tT1ehHfCG8Z8mDl%2BD98wxSOYjOp6ZUgEXXVkVFub%2FVBQ%2B9XUgV3oK0KAmeLXEBi0VdUPscl6nCu4FFCNfPNHWQN%2BnZ5y6wUJiiapE3SmlZIpilI0KQy7IAS0zPkCdcQdAX707rCGBBshkRHUU0ADyZ6ksMqkHoHU5avKNeHBq70sxmTUPjRgEai5mS7eMarqcnmTRhuTjlJKgsbByAKsDiZmQm61ndLBnO65YHEqQfRbSWCnX7CTganEQKAoGuPZLb05JBmc6WCFU2Qn44MDQ1jg2LmHUlG4MWEvBpmQHEnNk4%2BSr397Loz4VSFhcJwwPJJbrD8i%2By%2BqCO2d1b2Mvf%2BucbngyfgpE%2F4iACRl4DFZIr%2FR5cZHS%2BuEZXBj5l%2BRAcVlQAHTzJqCLJe0B0F613fdGx8Fh%2B1P7hj%2FgxrafP5QVnBGj%2FuEBiLECOY57RuNpF6gH9Gax5ZRi0CdswgPXKq8jfof%2FwbZAI29Nuhq0rXy0gwZsek%2FID7PbpWuKbsxikMwjPX%2FywY6pgFa94kZpptQ9FE4uwKVk5obyyVtRXBDt4plgoNjmV%2B2OHU%2Bx2VofKHw2miAoeeu%2B9pIETpY3cVzo%2BzbYrgbKxUxBMZuvor%2FkCXwAbolEK7q7TTedaXb7JsT4RuUw4VYghIa35s4m5oMwXlYV%2B%2FN39ETi9aRnC60%2B661nEL8deNVninFZprwXulSkscr9vsTWlMxeVS3x3shsXIPF8Rn9SG8RrOHXloz&X-Amz-Signature=d4dbdec458cf95220b7627b407ecd581456a2c440e39b7eeed9ebcb9fd3ec540&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNAYAJDJ%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQC31ZEQy05dm29bydzZKCCjPcR3FMGvM8T97liJ%2F7VWKQIgXrwc4X0d1DdkMk2tsUyYq6mfyV9eAecKFebD%2FG9NN78qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDpERuDYXq3srZhNRSrcA5gPHu6UsI%2FhoNZhOX8Q4fK816ZPujl38y0T9IiRtaSv2awr60yVo9hyVIE9gtYdQpVFePeiwvVAVrqxKkjxCp8f6DVQ8zzxq1uAOVc5c9rTJ24qOesskCUtdfPoZ61dF5%2Ft3ocm8QyidGcVdXLcLDp36l4mKtUpfb7KJVXYFICBwBS24MvNX7zBWnq9NqvRz7yAa3CdglRIyz6jZfv7q2Spv4EN9hKz%2FeZGuMD9NB59eUWYH8h9l1i6pEH80w1Mx24pa0G7OnTU%2BWjBXJGBt9kXIZIYE9BnJGMYacxbzVa0bAKRWPt2IYxtybPte6CaI41IlYzW2GIaW%2FzPPDpaM70upJdNdrgvkBqk%2BdRzuCoU46YmMJDr2v1XQO0xJPm%2BGkIxfxcM2V3n9wmBVoTb2CNlRooNuEZZYQ%2FSNg7Q9%2Fl%2BTxtsPx4224dPZ8pVIoSzKSFZ76gJ3Ve%2BuJouiVCWJ837kpBRGn8FbR94%2BNmoLHMbDtljgrOavoXroNORfzJq610sP%2BnR0Otbray9xlAsNACRpHCQyG6nA9lLrUJCkbTxSWPQdkCpWTq8BMRHKlSkynYu8N5QptqhYX2WmVlJSpc8nE%2Fbbq53Vr7226MTnfEaU%2FHWd%2FAqyaOJYgqaMM32%2F8sGOqUBxN3Nh5cl3Ku9ngnJN%2BO3tam6dwT4NkKvfsVh3DCOsBMXp9AA%2FJxJo0QuAY8BfZe633ZvYlh%2FKWhEE3HhFP6Qiu%2FdjNmLtIk3XEOVIDbG7F3N69zhHHf7%2BfjIJmscKvTF7iQzKZ6sK1V8rj4s9MoyN9h1paAl6Q6wap5kc%2FVC9zp2KAsRKoIFdtWEQUSbI0aX0CXE0eDaiiAv0ewTUodkSM06WtEP&X-Amz-Signature=aede2e320a6b745e207d10e29a0829a2cc4cbfbe3ee821e659b94dae6ce0b398&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNAYAJDJ%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQC31ZEQy05dm29bydzZKCCjPcR3FMGvM8T97liJ%2F7VWKQIgXrwc4X0d1DdkMk2tsUyYq6mfyV9eAecKFebD%2FG9NN78qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDpERuDYXq3srZhNRSrcA5gPHu6UsI%2FhoNZhOX8Q4fK816ZPujl38y0T9IiRtaSv2awr60yVo9hyVIE9gtYdQpVFePeiwvVAVrqxKkjxCp8f6DVQ8zzxq1uAOVc5c9rTJ24qOesskCUtdfPoZ61dF5%2Ft3ocm8QyidGcVdXLcLDp36l4mKtUpfb7KJVXYFICBwBS24MvNX7zBWnq9NqvRz7yAa3CdglRIyz6jZfv7q2Spv4EN9hKz%2FeZGuMD9NB59eUWYH8h9l1i6pEH80w1Mx24pa0G7OnTU%2BWjBXJGBt9kXIZIYE9BnJGMYacxbzVa0bAKRWPt2IYxtybPte6CaI41IlYzW2GIaW%2FzPPDpaM70upJdNdrgvkBqk%2BdRzuCoU46YmMJDr2v1XQO0xJPm%2BGkIxfxcM2V3n9wmBVoTb2CNlRooNuEZZYQ%2FSNg7Q9%2Fl%2BTxtsPx4224dPZ8pVIoSzKSFZ76gJ3Ve%2BuJouiVCWJ837kpBRGn8FbR94%2BNmoLHMbDtljgrOavoXroNORfzJq610sP%2BnR0Otbray9xlAsNACRpHCQyG6nA9lLrUJCkbTxSWPQdkCpWTq8BMRHKlSkynYu8N5QptqhYX2WmVlJSpc8nE%2Fbbq53Vr7226MTnfEaU%2FHWd%2FAqyaOJYgqaMM32%2F8sGOqUBxN3Nh5cl3Ku9ngnJN%2BO3tam6dwT4NkKvfsVh3DCOsBMXp9AA%2FJxJo0QuAY8BfZe633ZvYlh%2FKWhEE3HhFP6Qiu%2FdjNmLtIk3XEOVIDbG7F3N69zhHHf7%2BfjIJmscKvTF7iQzKZ6sK1V8rj4s9MoyN9h1paAl6Q6wap5kc%2FVC9zp2KAsRKoIFdtWEQUSbI0aX0CXE0eDaiiAv0ewTUodkSM06WtEP&X-Amz-Signature=aede2e320a6b745e207d10e29a0829a2cc4cbfbe3ee821e659b94dae6ce0b398&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BDQASO5%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T051814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDWkBuNGldhbBMhNipnADaxn3i%2BeMcZk6uvulucwL3AQgIhAKBAC47j%2BHmZVPYUS9GdDkJoim1JddVkI3q5YVuoofeAKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgAGVCYBJpu5gfqfIq3APOWAPPJgTiI4V2rOUx8EJkTbCSbdAavd2%2B1x9xf7olQAnD3UMu8QQ2Uf%2BiE2G0lajj2pXiJ0t8DQEKjFqogeJ7n1f2c%2BngQXSr11MxlxHjSW4YvFrJ7AwLOstQT1MKoxOhx24wWo%2B%2FQOFPeJOqo6Z5qwuiz8uWqQCo1kMeRoa20hjKe2SpjW6f6onFLVNl1LZEPY6CJc%2F8T6PtZTgzaVagw84WGKzc4XkyiVeqUurPLmqopt6Luupky6j7pxHDfEoBK2xBnTPA4CcUgwIDe6mzhAG%2FHyHDTRMDLOWjZJfprsKlIXsO99tak2ypdWoU2TzgGXmBHJ9YPnjhpQwbJotSeN6gfgABxMAG2yI8co%2Fx659H44xxOdap4Oqn5p4H1nFiE9yNsLtoPDdVTXTa%2F1B53HN4kmAYRGTFBDT1q%2FptLBkqkFJuDJmRh0WHGptXch6nA8vTp4BCx1ML3BnAYVQCOG6yGz0jBWwZL1hVC6sygaRHHM%2B4G8qIdIKWRt3%2FJsZ7c2pMP%2FWUqcxnNTUdBzz0W47xD1tdzSw23Cl4O3Y7%2F0UXVI81MadJ0pRhc1PgT5J0I%2B9ch73XL%2B7L79Yoyp4JOf%2FhVgofmpyFAT2lMNVjjXI%2F9YqChLeHr%2B79zjCJ9%2F%2FLBjqkAY041JO9GZ8mX4QZMGDu8T10lRequzJbgabolXKrpdQ%2BFrUSAFvXVy11dTZdxpYdXFUqvZlvoFWpPOJ9SzKYaY1CZYk4MYHK0soIWg87yluTac1y0Wy8mc4Ur971InopRj4WPJThXwBqbn%2BXhKmEOxBS8ybLULRFt3DmceTTHd8kCJlG62FwtQxnGSmYVC8u4fBx25bQltiJPb9XQzOvIMwZF7Nj&X-Amz-Signature=eb59514ed614a4825ea34b765695e39cb125eb8e1388470a35ebc81aa6cc242a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

