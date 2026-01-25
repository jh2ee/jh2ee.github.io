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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOT2DVYB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIHFnRJM0%2FxHGPnP29%2FNRAEd8iAj5Txii%2BR6myo1z6EzWAiEApP8sZKrFclAixnUsDA04ds1817chD0UBPX1lNjnESUUq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDJmA%2BCSCJEoRDUKDByrcAygvz2tHmMPnlK%2FRTW5dAZgPWuLRoSn%2F9eHVbqeNz3tO62Gav0a%2BYC98yesMoHX0jgd8G5eyoAQ%2F97LjvtDWO65ZDjyMGShqnuas6AvYwVC%2BQC8IWdF8oiaw1y7hdZuTMVvgJNUiINeaIa4s%2BuPyM%2B6qyVEyxqEBmAIeHoXiARTQlE11r%2Fbj6Uc%2BXh34i8qBZZLGUvj9OcV18BEPzg5C22EloH2ezZ5eszufHBUUUqkknZYpDLEjdCCNmf%2FifzAk2FyVpEc5PdyXxOQuS7KPmNki5N3Ju83%2FxpDayJRcBrugFnEdoiYWzYQWJZFpdqujeFFigb%2ByrlgvKo0gixdLJpXrXMFEBOlnbLAugSaqDPkh2UGAYCyuDbpn1I%2B57PHZa168Qz3DR0bt4x30y%2Bn%2B3WZB9oRebwcZQs%2F6Fglc7DSh3lylbPToj07g7Hq1XIXqOp4JMoDWGEjPXPOolku1TSZeZn%2FN2P4GF%2BXM9JiIj9xSd1mKGO3lbvp%2FhfhZCvfOMSCsH1zlTSP7MmyGyKGj4oH2ukHnrf%2FG%2FLnynaWasoGMcE3NqkCEzCmWV3ppqenk%2FNc1wSKKYfkC2uhav2OFjyasFKXtMBqBaM8LSoBNoQc1VnFrZ2yjtQ5597gKMNqw1ssGOqUB0U9omT%2BPVkiMMsOKVI%2BNfHb%2BljeO6embVx6RKiBUkxvPlsVcFjpz6hDX%2BOuygk0rMcCKf0spqAZ3Upo93F0WDSu41odRuw4LGH9PyxBBUhTEjvmbx6yAuPz%2BA73E8m%2Bl3gN88sbpWPvaqEUJS3lcvMewnz6b5c8c%2FywgBRMoz64NO4Gjk6si1VTLV4WsYZVj9xpNcEK0w4CKOVNOVLU7XM2RNzlE&X-Amz-Signature=45305ac959eb64ef46df398c54d7cec11131de3df42af90425025c38b9ca6e87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOT2DVYB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIHFnRJM0%2FxHGPnP29%2FNRAEd8iAj5Txii%2BR6myo1z6EzWAiEApP8sZKrFclAixnUsDA04ds1817chD0UBPX1lNjnESUUq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDJmA%2BCSCJEoRDUKDByrcAygvz2tHmMPnlK%2FRTW5dAZgPWuLRoSn%2F9eHVbqeNz3tO62Gav0a%2BYC98yesMoHX0jgd8G5eyoAQ%2F97LjvtDWO65ZDjyMGShqnuas6AvYwVC%2BQC8IWdF8oiaw1y7hdZuTMVvgJNUiINeaIa4s%2BuPyM%2B6qyVEyxqEBmAIeHoXiARTQlE11r%2Fbj6Uc%2BXh34i8qBZZLGUvj9OcV18BEPzg5C22EloH2ezZ5eszufHBUUUqkknZYpDLEjdCCNmf%2FifzAk2FyVpEc5PdyXxOQuS7KPmNki5N3Ju83%2FxpDayJRcBrugFnEdoiYWzYQWJZFpdqujeFFigb%2ByrlgvKo0gixdLJpXrXMFEBOlnbLAugSaqDPkh2UGAYCyuDbpn1I%2B57PHZa168Qz3DR0bt4x30y%2Bn%2B3WZB9oRebwcZQs%2F6Fglc7DSh3lylbPToj07g7Hq1XIXqOp4JMoDWGEjPXPOolku1TSZeZn%2FN2P4GF%2BXM9JiIj9xSd1mKGO3lbvp%2FhfhZCvfOMSCsH1zlTSP7MmyGyKGj4oH2ukHnrf%2FG%2FLnynaWasoGMcE3NqkCEzCmWV3ppqenk%2FNc1wSKKYfkC2uhav2OFjyasFKXtMBqBaM8LSoBNoQc1VnFrZ2yjtQ5597gKMNqw1ssGOqUB0U9omT%2BPVkiMMsOKVI%2BNfHb%2BljeO6embVx6RKiBUkxvPlsVcFjpz6hDX%2BOuygk0rMcCKf0spqAZ3Upo93F0WDSu41odRuw4LGH9PyxBBUhTEjvmbx6yAuPz%2BA73E8m%2Bl3gN88sbpWPvaqEUJS3lcvMewnz6b5c8c%2FywgBRMoz64NO4Gjk6si1VTLV4WsYZVj9xpNcEK0w4CKOVNOVLU7XM2RNzlE&X-Amz-Signature=45305ac959eb64ef46df398c54d7cec11131de3df42af90425025c38b9ca6e87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWGTGIHQ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIFoWm15ZcfVn%2FeVtc5FsIDnNf7TsBHSB%2B1euTO369ttDAiADAT2EOLzCQOQ93v%2B2q7VV9pfAALsipyjsiuH9eoy8kir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMaEiTRIsTLm9Vt%2FCmKtwD16rtnp3ba0TsyTuDUP5eABy%2FkmoPEjXZ3F4R2OSoOBWKsVhVvdaYoUSDTzOTAxeke1h1%2BDzks1dvVzUejxZJxYkbR5K2AU2P7QBSihqRd4mqqZs8C8UiCQz9KG2jKbSC0CWXZQA2JzSjF6ocFy1yuHfSfD1tqVJA7l7llc6SCI2tiyrtjvff%2BXf7ziXiZwgfLzEBmIKFp855J%2FxzOHkj7ie77prQtfdZSM4VLzgv6haDUB7t8IJnVYFwZlT6cUdQ1u%2BXklbvHuOdiOrwr7o1vcY2WOG4i%2Fc%2FsY7wPHNxFQrLBLe5oA250R%2FYrX%2FbZ3PPs757Opo9y76wV7Th45k6rywdUyMyY03RDETdwxFCw280thX6aoHF2gJdvcx832htvTBwFh%2FRHLThDdGeyqkTQTyiHkasBMA9BIt4%2BFOHiUmfToHCLtCJaOBzwaslh0PueKoG9XZWMBxFCtDuGq8KAe80BAjBuwzNNmjTr5wBKOe3NkiD4qGUY3PVuPBAf6tJUEGiv%2Ft%2Fizoyb9RTshaC19uTnBBQh6twMFiaXudfJlku61yXajua4zVw5Zs1GCXb8jJiMZJ0mAQopInl%2Fn5LWV%2BlZChTLWtc98KQUcoKtLLEQpqqaDbE4p6Av%2BowpcnWywY6pgEBgtRw4MHNbue%2Fh%2Bqj9cZI8wit8Ue45iixRhQ0Ogs91i07ATpXo%2FZN3d9d8Hq6Wzo8H8xRk6HJRIS3wL0mk5TDF5MVNcdK5Y%2FIOPCzm%2BHXL2pE4OfFgsqtgBvS7YUVNKzFKhhKBfjZ9dX%2BWbc3ROBD3FT6tUfC2EtLDcEI2Wn91JrEOC%2Fs%2BKIP9GHFEA6%2BlTwtp1pEV%2FxcsACYzDxh%2FdbfrMnHL0pj&X-Amz-Signature=56a212125e9325713b203a7dbb6a8dc28f2ee01f0d35f56f2b8cacb6196f705b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTUJNBPZ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIC7mBLrnQyY1YBGpWvzcDVZnyk48QegLz4ZIFGuprPBMAiBF7THD2yVnHZZr8Lg48ExCGkEh560kXXO2kcRZkLqsbyr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMJj9lQtVizatesvkTKtwDPiRZQSR3zVUOICjRB%2B0AsEzmDlova%2BX7RrgU%2B914%2BkUgAPtWUMk0LwOczKDduVdZE5ygEQMBBS%2BQmxnOBlRsJK2Z800WIO3o9wC7IOqvq77%2BSt2T4YgLNg4LFFeQkyzubq%2BtFVcdatrN4uowyoBf2T5xtJdXTzCcQrOcdY6IDy0bL01nS3SivT%2BPcab8IW4l29FrP8X8n4cdCMGdwV%2B25fKeCe3gGSqv3T2rys3BCcF%2BB0%2FT1hbI2odLIApKcsGRyhyHgl6yVtVKSdpMWdHGcKUMOSASq0wMA%2FAFUBR9C8fl9Vc%2BUfLs9KuXF5kic2vJpvrzGTK%2BrQ0XLdmEnRx91sVcVbtcZcNuMwQQyanDK23IcIm9yZLDAMny9H8pPMobAg31dCs0qpaXilg5Lymnp%2ByHGB%2BIG1Bf7cUuaHEIK5DNPzY1dvCEBQtbl%2Fy1%2Bkx7oIDvMf%2BU8qFO1%2BL2WQSCtvbl5Y3FiilBs8Woisif256sXjzmtpIWDcuIf1P61hHO%2FonAMlFxkMyReyCQ74V1cZWEFgdPtRaSV5p%2FgKeDz%2Ba9KOGpXH%2BjifGogy0WNe0xXloc50e0WeA4Hb6KeXzfjpXnBgrMz6Nc43QOBtk8EOc7pI9c%2BW7FEE4xAKwwyK%2FWywY6pgET%2BkKuwAdUrO%2F%2Ff0G1lXW1AuCuP4HRu4MMrAYoB8Hs8vvef83lZLpYCqiHhlxGRJJl1ILFUAfZOUpYyE6X2xlbuEY6bQnWu21woxbHG8wN4LCYMNfi745MBmJxO99uw%2B8vS7xK5qjT273%2FRLJMIvG1z38PLKLcDzUuVGEnT7PXVHP0Fk%2BchhXcW6Wv7zMPIOoiFIdLYzqrQT4ILNFt6b5tnXlYXlm6&X-Amz-Signature=222eb5bd7608f9fe7bc693077fd315f413f5c9e99b7f74e153c9cf771bb3da1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTUJNBPZ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIC7mBLrnQyY1YBGpWvzcDVZnyk48QegLz4ZIFGuprPBMAiBF7THD2yVnHZZr8Lg48ExCGkEh560kXXO2kcRZkLqsbyr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMJj9lQtVizatesvkTKtwDPiRZQSR3zVUOICjRB%2B0AsEzmDlova%2BX7RrgU%2B914%2BkUgAPtWUMk0LwOczKDduVdZE5ygEQMBBS%2BQmxnOBlRsJK2Z800WIO3o9wC7IOqvq77%2BSt2T4YgLNg4LFFeQkyzubq%2BtFVcdatrN4uowyoBf2T5xtJdXTzCcQrOcdY6IDy0bL01nS3SivT%2BPcab8IW4l29FrP8X8n4cdCMGdwV%2B25fKeCe3gGSqv3T2rys3BCcF%2BB0%2FT1hbI2odLIApKcsGRyhyHgl6yVtVKSdpMWdHGcKUMOSASq0wMA%2FAFUBR9C8fl9Vc%2BUfLs9KuXF5kic2vJpvrzGTK%2BrQ0XLdmEnRx91sVcVbtcZcNuMwQQyanDK23IcIm9yZLDAMny9H8pPMobAg31dCs0qpaXilg5Lymnp%2ByHGB%2BIG1Bf7cUuaHEIK5DNPzY1dvCEBQtbl%2Fy1%2Bkx7oIDvMf%2BU8qFO1%2BL2WQSCtvbl5Y3FiilBs8Woisif256sXjzmtpIWDcuIf1P61hHO%2FonAMlFxkMyReyCQ74V1cZWEFgdPtRaSV5p%2FgKeDz%2Ba9KOGpXH%2BjifGogy0WNe0xXloc50e0WeA4Hb6KeXzfjpXnBgrMz6Nc43QOBtk8EOc7pI9c%2BW7FEE4xAKwwyK%2FWywY6pgET%2BkKuwAdUrO%2F%2Ff0G1lXW1AuCuP4HRu4MMrAYoB8Hs8vvef83lZLpYCqiHhlxGRJJl1ILFUAfZOUpYyE6X2xlbuEY6bQnWu21woxbHG8wN4LCYMNfi745MBmJxO99uw%2B8vS7xK5qjT273%2FRLJMIvG1z38PLKLcDzUuVGEnT7PXVHP0Fk%2BchhXcW6Wv7zMPIOoiFIdLYzqrQT4ILNFt6b5tnXlYXlm6&X-Amz-Signature=6422a76923ccbabb4e0b0965081f066be3be8273875db158f45e357282b890b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RA5TB5W%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQCrH2%2FYy3MoKxuCC%2Bajqx1iK6gMEayxENhFC7a8%2FqnjhAIhAPDlUyZ8J2yUC4oxSX8wG4%2FyJFI8%2F26nBMmKt5u%2FNhu7Kv8DCB0QABoMNjM3NDIzMTgzODA1IgwP43KKR%2B1HQO6GCTMq3AMCXceXZWQ05DdVuuzimfJIbRoppy7yEBajuVo1TxdjPv6Gto7Vx8owC0pnWFMwKI5euVYGx0aUUW9RDkowf4BRjKR4ABrwF7PSor60m5BdCthI%2BM50u5TudX3PM6%2BBaImCl1mbLY3TsIq%2BLs9WU9RgOVcGZyux7iOM0KcmOvj5U5zBJt2ESfGZwEEy3qXIeDxCTLWZfr%2BeXRibHQ7ND%2BRHAT9xILiFmbRh2BqpG96rq4U7BogLbN4qRuTJU7KxDOKLf%2FZqn0lYtN5RGRYlbCXM8FJ7HuUZHSSkHeNhWUbkOX82sCGjJg1ffGEPZMtT81s5z29tSE1EFRnxIAces3K108U806kk%2Fprv1%2FpHeqWa%2BY6lTfFfn4%2B5guh92gp0zfmflC5R%2F5yIgzwInnS4r6fqrqr%2B4uPQmmSykwe%2BJLggNDUF0OaYvonGAR%2Bu6Z5O8WvwBvqzy04Ch%2BNiaIetMsLG2dGqRgW5PxPaho7mziw75kEI%2BzMTXq5JPjwST7ZwUzyLCE7Y4VP3WPaWJz%2FH6SdTlHfkN8d7SuCAgxn2LltjDEzxj4jBvmEjHV1%2BQMAp%2FdCRaDhKhcpM6rxYhMTjCReykELhbWWysedxCSHmQ5PiMKTz4gwc2udNUW3A5jDJr9bLBjqkAcEL5S9g3UYlO5csYNIEUsy%2FJjNGYKM9ypDfN29iLiJFGoZQleaBwjrx3GAy4qLYGy%2BMy12ORE%2Bvv%2FYnBBeqwhv%2FG5KGw7OIgnUXkAP20At%2FolGHVG9Io85iofzTyM7kyo%2Fsz91FhmPtJJmHji5d%2BeNoeS8pSVbCVojqYETl2913lrvbg2WZ5adDk2fiWCgBIPNEqI7ZkThxJc5HLfFgrej%2BgPhV&X-Amz-Signature=83ae90997b0a188ed948b7d1c316e73b1fe516838a2283e9579a0f08ab387559&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSXDWWEW%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDAXQ%2FEoo03zO49d6KHS0FduC7PTVW6LpI3J7eOjex5JAIhAKM9uhAlD5llXWfjUmthB1JZjlLmCaPRpu1u463JqXczKv8DCB4QABoMNjM3NDIzMTgzODA1IgxPpNKRPbduTw%2BvOnsq3AOQ3VUJrtgZxOg33y92xcQdrwl3ykN8bU7Si79GYZKzmW1VlA2lFiYT8FOiLomJ2XwEMgaNLb%2ByyKL3iyF6E1gEEOvB%2BBXWdx1QcJZ1g15%2Bzb0ok6vEIs2lUoShHJTGycyEiEuA4jirLQfVDscVGQHu97gJYDTKbWroF9BoT%2Bo%2Blre9OGQ1jlaXobSJXuguj5srSyLaqwerRrUXtCbbwZILusYwWaAyYjIfHG8mpUf0%2Fed2yUHyshDjbxsrWd0n6y52ACOFh5S7R%2FlwTOCz1%2Fg8pQXZE56tuWu8tEv4usUmpYJ1VjH2h2ybH9DFCDHBVD8gmfqZD2JzpB7f5eWYgZn14AYupK5g4TyQHDghugnbNc2jVhoYLfJL77MRfW5toIY3zJi5GTiBh2tqJvSM%2BjcfVWiTXCpaXSfrgwO%2FDz5TPg690St%2BNiCKLE6BiibLBIfs20Y9OqFW9JRxQtix36eyPcataugQDi7PgNkvfLrOdftiplHiypiGUhyX9Nw0x%2BFUgDOGJ3YC%2BzV7BAv1qjs10jQ0SLpnUu%2F0bMOwYB5jKxEeVio%2FhHPirveiC2M04ZwHmGH7HXy%2BoSNOwybKs%2F9%2FO%2FAOgiIxlRIIeO7KeBGMACB4NMKWxe5J7hQfJTCsz9bLBjqkAU3CDnoKCPlJzX9hk5rEFFgNbNco7yegrSIQSEJKbf8e4niI09%2FMy5dqMs5AX9U2b2TJdUQ%2FMvzc9TkhNEuEWemteiF%2BDvwqIM%2F8d%2FuVOt0MdrLdupwzduJYSPGUwC%2BdUriPUe4X5Oxwy%2FiIQccrEVys8h566zvTk9sb41izn8jrY2ll3BLh5eJdXwrCn9zff%2Fjw1Zr57j2fqsSN9Qd%2BDvRQP7Lt&X-Amz-Signature=2612ceaac9d1f5268c9c94b1d1426d19ed867d35bf7a5efd808e994ef33bd9fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624VPNO4L%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQD5mVjLmXCONRICVyyOydT0r%2BTclA96XfPIx6s%2F5pqx3QIhAIAkyALQJ16Nbz7tObg7%2B9LSBfus5YC7ovhESprH8lN1Kv8DCB0QABoMNjM3NDIzMTgzODA1IgzBWSilQLS%2FrjPEoz0q3AOqLqawOWd6w0CSuyEDKgMKHBjMgE%2BZipmOEPu3GRkYqmziFsX1L1cyKPMMr4SCEHJHUPcOhSYlCejcHzUhx3E%2FIXbxN2mA3rzXzV0fqzXGwWe8rS%2FfilnMdASFLV49NgpZTSLPmwt2RayQSaspbACaulFyQt%2B9%2FDZnuc9wMNkXDmSczjtp%2FlfvpcoutIjARy1gl8zDI4YHtA%2FY3u8IWLcIheeUvBYftpF6MA67xohuEjaH4bKEwPsP5EB%2F3BU875ZH4jZKQBG5Xjqblm8bCWKBenADLsCLPkAffYs7okUDHdhgY6uyV22SToHWbdcuhDTZd8A7hMkPLC6p2npwYULbQYLQKuRNeksTEjZUQMIScEoE6Yv04dvYVPy8rFzfcNOElr2CJgLze46g3qLsTXiiGG2k03ygATr%2F317ccxn9fOsDO1dxFdWkP4rZ%2FtfuEa1pcv9y%2FclEGlw%2BZ01zHpAFXJ8G8s8xxoKXcRWOPQQ6u%2BYSkG2dvkVwpuDIX%2Bpef9%2BprTfgMyfsxFcqz7BkDIEzMBCv3ip3OWFcIS0KhU1mYbIoMVsa6FOb6V1CIRjz%2BomK51u4yR11RM9DI3I5c9%2FshdcUmatqqkLAXENWreeZR%2BlbFlm2cM%2B7CKDW%2FDDjr9bLBjqkARpDfCmsNtvIMy9BSfHiFVxeY3RdztYG6CxWhKxOYGjoF7GYdWRlhIOy2F4VwyyjBPzTSAvBIcBtGgrEchIbG41rRRVSJHrkvk%2BDFzHDfUEhNwutwuodrnIX7fjpyUCkyiVRsMupiCa17XyndR69F9Z9J3zI5rEim5EMhPrSM5krS92Pm23cctRewKr%2F6BzKvTnaRY5QPu3Y19lDC%2BUQ9lvG57XU&X-Amz-Signature=9397316063e525c84813cf3f53844c24254501e46a35b4b6f8039edf0c179917&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCAWLFF3%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDB9IlSQvHyhat6UPazMV9CyBgA6A%2BPiMWCuuWgQr%2BYJwIhAOgMGzFensdfHEwe1zM0a%2FH6MRN9nBTdVSjG%2FtQxMAWyKv8DCB0QABoMNjM3NDIzMTgzODA1IgwdrYknk5BRBilsVsIq3AMeRJvhpNN1cBNj0eU7HgAK1Ur2Z7f2t5gwIXCQzuK11GGLavmEWu96SCFS%2FJCvLQFFvwEXFgYvnm8EG3b1y1KAHrYR7UOBko7lLgQ%2FaaA470puJ7eoaV9v%2F1GOs%2BeMEX%2FK5%2BDe7kOJO82Rrb2N9oVgi3vU%2Bl0aNZXbjDJobMjQ8TqsEIyqF0OHOVZWd1kAbpwrbVR90EGW0UtIT7XjMScbK0CuGssEaUqYZzGgwRN82qiwUm4Yw13UF24jYl2c69GUQaNOYbhpKTJDa2m4%2BORMXL0BzdUsens%2BV%2F4jVXy6DnLcs66oPpHgH7FfUq%2FnR0lgQagAM3VWuNoRdjKNB8n9R46Q9TYT3c5d%2F64jkNGaGrxraT8suQLkrvjMOEvdHGyPh0j%2BhesnAzy2gAOz2yhweFDNSXUCa0OWFl2aXoQ2y0cqmHVAGFWGQED6wp38W98DX%2BlugvPjMBZ9FKxOFBDwtYGJpw3w5VflflkM9NwwDrlmo2QrCWq%2FqHFbEUrM8Gbp46C9rbsxM1ZxCaN1dBLRI2m3PJKZqwfpzIvx1Hf1cByf%2FnYuEI7%2BAn0%2FNcYqnOFI%2F%2Bch1EJf%2B83oOjjm8PgsfenOHgsu2jT4MGKwiILyKbbJ0lEkWhEu0JF83TDKr9bLBjqkAWq4%2FRafWSOZZg41SfMQphk5BCELRkDlcpJzvrjMjQzzdAzaBsokaucs3R52iw1Y8oBWpLHSHvtwauoOiFx%2FNZVcrANlgMuczDdPn9lkcKmQO%2FlwMnJx5RSnMrU5BT0JRN4iHk7Njrd1aHhzvqCfXcSTJTaT0aqkV2JmJsVeqFQqzfpO2SzK%2B8VEvzilLWW69GrL9ywnrDjTrG06SwTJeJ8dCNtT&X-Amz-Signature=f9f01ec279ea01496311eef0bb43f5571e3f03d9557fe49578e2d078de07f22d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCAWLFF3%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDB9IlSQvHyhat6UPazMV9CyBgA6A%2BPiMWCuuWgQr%2BYJwIhAOgMGzFensdfHEwe1zM0a%2FH6MRN9nBTdVSjG%2FtQxMAWyKv8DCB0QABoMNjM3NDIzMTgzODA1IgwdrYknk5BRBilsVsIq3AMeRJvhpNN1cBNj0eU7HgAK1Ur2Z7f2t5gwIXCQzuK11GGLavmEWu96SCFS%2FJCvLQFFvwEXFgYvnm8EG3b1y1KAHrYR7UOBko7lLgQ%2FaaA470puJ7eoaV9v%2F1GOs%2BeMEX%2FK5%2BDe7kOJO82Rrb2N9oVgi3vU%2Bl0aNZXbjDJobMjQ8TqsEIyqF0OHOVZWd1kAbpwrbVR90EGW0UtIT7XjMScbK0CuGssEaUqYZzGgwRN82qiwUm4Yw13UF24jYl2c69GUQaNOYbhpKTJDa2m4%2BORMXL0BzdUsens%2BV%2F4jVXy6DnLcs66oPpHgH7FfUq%2FnR0lgQagAM3VWuNoRdjKNB8n9R46Q9TYT3c5d%2F64jkNGaGrxraT8suQLkrvjMOEvdHGyPh0j%2BhesnAzy2gAOz2yhweFDNSXUCa0OWFl2aXoQ2y0cqmHVAGFWGQED6wp38W98DX%2BlugvPjMBZ9FKxOFBDwtYGJpw3w5VflflkM9NwwDrlmo2QrCWq%2FqHFbEUrM8Gbp46C9rbsxM1ZxCaN1dBLRI2m3PJKZqwfpzIvx1Hf1cByf%2FnYuEI7%2BAn0%2FNcYqnOFI%2F%2Bch1EJf%2B83oOjjm8PgsfenOHgsu2jT4MGKwiILyKbbJ0lEkWhEu0JF83TDKr9bLBjqkAWq4%2FRafWSOZZg41SfMQphk5BCELRkDlcpJzvrjMjQzzdAzaBsokaucs3R52iw1Y8oBWpLHSHvtwauoOiFx%2FNZVcrANlgMuczDdPn9lkcKmQO%2FlwMnJx5RSnMrU5BT0JRN4iHk7Njrd1aHhzvqCfXcSTJTaT0aqkV2JmJsVeqFQqzfpO2SzK%2B8VEvzilLWW69GrL9ywnrDjTrG06SwTJeJ8dCNtT&X-Amz-Signature=8277e31ea7118c8341f8568fa78e5362cf4e18ee25f7e4cb5849987287da54a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5C7RTUR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIBUrBkZcub2D%2Fmew%2BtGtFzOcn0aF9evNz%2B3%2F9sKYBRSLAiEA7KESGFFg599edsllWpdwrEA02gV%2FdDXnUaBcvEh%2FT8Iq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDLnf4dmldNu4BtcDbSrcAzHBF0TDoaB%2FlBNoQ%2FiBuA%2BYhbSIbxmCdo0q5Mg1uiLFUDyjV9QqH8g6DtxX7zzqCnq1RgYaxfezLOYwzs%2FCBshWr2SQ2nM08ea1WocXcz%2BrUsMbUKoIUjxrHnst4JJNXRpCkOIcXZNEIa1Jv4f1S3bJ18OO%2Bfo0yPVtb7NzDBTAUholXo2fz42hqo2df0lwc%2F2Wx68AHJlsnnyHDcK1JPpgauiulqjhTdzKJzlDx7Qc9tn6ONzqu%2B7sStNou%2B3RdCHAfNXt14aHZ3EobojY3a6fx%2FyPc4h%2FRH4qDtjqQSI%2FPV40T7QsKLUZ0GoD%2FBOpU92xLXnVr7r30PomFYtAbvY7HX1GVUMKQMtTc3s1iErjqKZ%2BxBNatzDExvO4C1PbAxkK%2BQgOo%2FsB3vzMsOZDRs3w0Oz7GhSfs7RVixcLstmhd3jcsDdkYOls%2B7ZFkXnns8%2Ffs%2BI8LQKO0kPTwlv7qwTC1aii8Axh8ubNpGzDATTmQwrczGK2FU30Jo96y9fVFZcEO1x%2BNm0dOPTXewjstWCpSmr0XMUUB08Wc2FGorGBs3JcKksSBvA%2B9OsgaoSGZjsHgYH1re6iTokorNR42756TS1HJiaD8ItJH4pb5ZOxdB13CVfAsVvWdE2dMMqv1ssGOqUB54AqgktKvvoRN%2FcTJIpRLeDd7ItPmio5tyhGVHyXABOuTB%2BRYnkvdJvAeRlWHdb3p6gnasgaOj%2BAUsn3squYP2x%2FDUfTySwyzZ0QBmuR5bgY7azAt5q12NeHDP2840Zc%2FTezWtmOT3kxmxFhFHd%2B84jcwm7xd1Aecj7vTN47%2BsyaN0Lx1FetGlK9uzJuexeC4irvgWZWLQ8h10uQLupD2iPSFrGq&X-Amz-Signature=cf64b1191c14f260b583b7570a8849116bc2779757b9da8f6f1b53327a4d7599&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBLMAEFK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQC9WJcDRZ4vEEx1Lp386PzAYXWUVNWEji0rKZJRTSdi7AIhAN%2FSp8tDUa%2B9WnN%2B1A0hIioAwjTpgTTRDI%2FEv3jZv%2BlvKv8DCB0QABoMNjM3NDIzMTgzODA1Igypwc0M1HD%2FgX1CXWYq3AO116NnwtDqLr3xAiKjYdb9cikdVqod7tiu%2BOsQC3FLL1KR012bpteMbj%2FZU5ybL%2BQh5JutUPCvas7cX8UHF2SgRk%2FjjyKPP6LWcypTfm8krtWybx39JpcZps0sk%2F7PgmodwtXKCcVsTGKZpRpRylcOyGQZ%2F6wgL3zKhFJkympgcZPr57p7xRNB4o5ivr7d6LtGZOP%2FKS6Zb%2FSipwrBbvmU1fi7HPJs5ahuV7kfTMmjKsgd0MskHaP9Gfy8odVl84CDntQqSxu5J1zhVTh13C4yWHfrkx%2F2kFe09NQXMSDJWFBnt1C9A94iscLQHS9gFpc4VTdzHa0Aas0P0gyD570Fcu7DrPjnpxOfa0EKMuP73JoEN5tqdLWUmL%2FnVRW%2BlrHgKvoeli7n5AUv1mX7z%2FOw%2Bs6qF8Zh5%2F0DzO3JOVts21%2FHvsRM3LRpoe%2BA5XtYAei%2Bix7oUOtEYxkMBbqc4YxWNLyQapKrhAlK7Uzb3YFBl92ZfxcRGhG1FKQij4NnaXX6o4Zi3G6uHOiDhuTICHeA15J7zQpqvVa%2B6USvc1iPIBkmJVWwoqikjLaGWRyDM4XVl07xtuWI%2BwvDNFORQJYST6EXimcVt54e7dJKa0slenDLGy5xmqb43QY3PjDGr9bLBjqkAW4KF2Id4MnUjmCCwFZx9jBBn%2FMHvB9hF0JucAh%2BzLmCVb0KjibqFJ%2F%2FKfAfmJuVO%2FuygVKPNMJYYQsCV%2FHq5g31eVuzA3mDwfcFL8V7mPQwd7gyV%2FY%2Fb26XR6%2BDJ1L11hRIGfRvRJDyLFFEl53XRyQvovWMANXOrLMEJ%2FLxHAKtLskAK2Aqe98hVsTJWosJvyJ%2BQPOHZORvGv8Ry%2BqXaiyJODM%2B&X-Amz-Signature=881eeea7d53e38d9c6b33c332cc0e1d1bf22738df2a66ccd53e88bc33106bb5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBLMAEFK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQC9WJcDRZ4vEEx1Lp386PzAYXWUVNWEji0rKZJRTSdi7AIhAN%2FSp8tDUa%2B9WnN%2B1A0hIioAwjTpgTTRDI%2FEv3jZv%2BlvKv8DCB0QABoMNjM3NDIzMTgzODA1Igypwc0M1HD%2FgX1CXWYq3AO116NnwtDqLr3xAiKjYdb9cikdVqod7tiu%2BOsQC3FLL1KR012bpteMbj%2FZU5ybL%2BQh5JutUPCvas7cX8UHF2SgRk%2FjjyKPP6LWcypTfm8krtWybx39JpcZps0sk%2F7PgmodwtXKCcVsTGKZpRpRylcOyGQZ%2F6wgL3zKhFJkympgcZPr57p7xRNB4o5ivr7d6LtGZOP%2FKS6Zb%2FSipwrBbvmU1fi7HPJs5ahuV7kfTMmjKsgd0MskHaP9Gfy8odVl84CDntQqSxu5J1zhVTh13C4yWHfrkx%2F2kFe09NQXMSDJWFBnt1C9A94iscLQHS9gFpc4VTdzHa0Aas0P0gyD570Fcu7DrPjnpxOfa0EKMuP73JoEN5tqdLWUmL%2FnVRW%2BlrHgKvoeli7n5AUv1mX7z%2FOw%2Bs6qF8Zh5%2F0DzO3JOVts21%2FHvsRM3LRpoe%2BA5XtYAei%2Bix7oUOtEYxkMBbqc4YxWNLyQapKrhAlK7Uzb3YFBl92ZfxcRGhG1FKQij4NnaXX6o4Zi3G6uHOiDhuTICHeA15J7zQpqvVa%2B6USvc1iPIBkmJVWwoqikjLaGWRyDM4XVl07xtuWI%2BwvDNFORQJYST6EXimcVt54e7dJKa0slenDLGy5xmqb43QY3PjDGr9bLBjqkAW4KF2Id4MnUjmCCwFZx9jBBn%2FMHvB9hF0JucAh%2BzLmCVb0KjibqFJ%2F%2FKfAfmJuVO%2FuygVKPNMJYYQsCV%2FHq5g31eVuzA3mDwfcFL8V7mPQwd7gyV%2FY%2Fb26XR6%2BDJ1L11hRIGfRvRJDyLFFEl53XRyQvovWMANXOrLMEJ%2FLxHAKtLskAK2Aqe98hVsTJWosJvyJ%2BQPOHZORvGv8Ry%2BqXaiyJODM%2B&X-Amz-Signature=881eeea7d53e38d9c6b33c332cc0e1d1bf22738df2a66ccd53e88bc33106bb5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q57NWYNP%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T051937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCICtAKNazj3TpIXxR6Wp9efbYjdfaH9AGWgqAdAJB4zJsAiAkKPNJQFoxkcvjku1%2Bg9vnrJQcK%2FUFwkVZczVyR891lCr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMP3wlOnwebQpgCn8bKtwD%2FQkwYWUCADGCedYFJNtH5ZdwzOK0wHPz9ehKMSz%2Bleo1p2BdyWmD0HdVY6Sdu5ZdniSGbo28vXYoIV6p42TIbKvV7OVy16zymPswXaZCCT6DPgljTOKWjw7znuOSeitDaYLpC1ci%2F0mLZ3saSs8mGRY%2Fmb6IDMOaaVIA8xdHEuvirAwgtIgzvsSf64GBwZqgHbasN280MaHvVYWTTKJEocve%2FnVOV2H%2FPlpxmzFvUEZRsaFQUqyYTqHi1q%2Bla9E8LXAp%2FsOa8Yhs7iYdiUsXRc%2BTZTqmAguuIGMowP0fjZ1d1fTleC2%2FMi9PRhK3wGyALG6DUwRm%2FJKcIEbEWM9HXo%2FvzH8rFmMvwxQJxIrP6Iz4hQP0E%2Brqg5OC78fmHQEGrBsWaPUvIVY1SGe9SGPNvgsmRDvBMjrQGfd1NN9rNbsmIDlGssOti8Qyy703LO4E47KGFn4DCmG2odDwFJboBkTeWZ4MfIgjekefBSfMBE8Ys4I1ZOiGDS12a6Hda2bSkSQDkdcHwDzLnY7q9Tf4XLKy0lQmXb1Wnik4li40y2Z7W6pSO7K69tZ2euvYoKzmr0iqVUvvKSjSpT2tnl1q6hBLV7AhVQhBkl8ibCmSlsfH4riuOq78Fg2IsUUwlq%2FWywY6pgEnzkAjgNt%2FtpFydCRaAYBfBkSBFPfWk3VnW3REsKJkYKeG3bIzf1IziavgjFzXPi%2B9bai%2F7vEp0KropSNdUAQuSFg6YtMw1CDkK927HlMLTSuVnCOVejmQpP0nwyzb1DLnND5XwRhjNaKq7zqPmljZZBQvngU19T0czLmB3xGW4UPe2EOADcnVhYxqj6jY7U9togcloLV1dWG66VIRYOJ1%2BqkDOawX&X-Amz-Signature=1ec0bedc914a4f225fc29fb7df00ba5e6b847962e719eaaee6f220726ef92bb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

