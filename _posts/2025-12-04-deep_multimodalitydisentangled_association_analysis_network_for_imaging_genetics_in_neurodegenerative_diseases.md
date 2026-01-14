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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KOPQQ2L%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDgXBuWLxjGP6tlDD9aO71jSOW2F5L2gdfdXD8xsPOBnAIhAObGK4QHB9dV9jfMAP2pUszuobMZ3mjnFX8YmLCRwkAgKv8DCB0QABoMNjM3NDIzMTgzODA1IgxOp9qCR7iNpjCbF4Eq3ANEtsgKngD%2BetRftrv0YExfxO2HytqOQusXfAkh0G6UdAuojQpNtulUgZsBxWRYUo5%2FEoj%2BJpYnwzIvzOO6R6OApRu3wW%2FnjWfgWyT0EDyqsGsO46T4yTBRp6AAPpa2eatVsuMfRVPrBKgpDp3H6iKnRa%2FEU6gsUERAyIbN8dDYxU7SogLriJIkhthoQ9tlQA1Ty0H5LuDW7%2FirtWg%2FGLc8ZAv%2F1TwUwuQCoISicUQ3RxMcpDyBbSJLY5bzCBTuDJ%2FkuBu0wlWNbalbEjPCmLC24SMPpnV12hqV87cTGegFaPKKr96mONj1zRE7KwIOgXM%2FSlJ467kYqzdTFOIp66TeFK1BMxAXoX5W5tuzUplcN4T7QPQMok%2B%2B%2BSM6YgCh4r1HaK0HBHTKCAq1iNeAd4KJ9x7LN%2FyjZp1Yf1nIWk3NeniWnxo17XKkGQABfOppes9PXt8Jz1T4Spn7XKIdRf8ROfr%2FPKahF3zzC11HDDVCi7VKOQi8JZ3AKg1WJzs0I9hhXdOfPttMY1qGNNcAbJqifAOmiGorquj1VswEw%2BPkyooPcRgl6kyKOJoeJhmQi8%2Fn60D6k%2BD1X%2FlhGCVma%2Ft0FGlDE%2F9stBUeeYov3LGun%2Bb0P2yLSJflrx4RUDDi%2Fp3LBjqkAczO4%2BpfxwxsKbmSH3ajni1AkubHS2xA7DtOXXWcB8H0TyXgpIWcxc6jY%2BsqPLtMXbbih9WF%2Bx6Su3Yg3wB3P%2BS0gQnHr3yfnjkTwCHNSZFR%2FWTumskxgaZ%2F1xcb3slgLJE7vIrZUBbOeVpdWIdZOr4zNpezBBWJeB8xyG%2Fuc84krmgnvc%2FIIV750N%2BbltAJRgQfSR2mfW3gKls4sMj7Ksw1c9Jf&X-Amz-Signature=7f3bbb4cb6af0e02e8caaa8d875bf31a3c88bc32b969328d1d0341282e70e682&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KOPQQ2L%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDgXBuWLxjGP6tlDD9aO71jSOW2F5L2gdfdXD8xsPOBnAIhAObGK4QHB9dV9jfMAP2pUszuobMZ3mjnFX8YmLCRwkAgKv8DCB0QABoMNjM3NDIzMTgzODA1IgxOp9qCR7iNpjCbF4Eq3ANEtsgKngD%2BetRftrv0YExfxO2HytqOQusXfAkh0G6UdAuojQpNtulUgZsBxWRYUo5%2FEoj%2BJpYnwzIvzOO6R6OApRu3wW%2FnjWfgWyT0EDyqsGsO46T4yTBRp6AAPpa2eatVsuMfRVPrBKgpDp3H6iKnRa%2FEU6gsUERAyIbN8dDYxU7SogLriJIkhthoQ9tlQA1Ty0H5LuDW7%2FirtWg%2FGLc8ZAv%2F1TwUwuQCoISicUQ3RxMcpDyBbSJLY5bzCBTuDJ%2FkuBu0wlWNbalbEjPCmLC24SMPpnV12hqV87cTGegFaPKKr96mONj1zRE7KwIOgXM%2FSlJ467kYqzdTFOIp66TeFK1BMxAXoX5W5tuzUplcN4T7QPQMok%2B%2B%2BSM6YgCh4r1HaK0HBHTKCAq1iNeAd4KJ9x7LN%2FyjZp1Yf1nIWk3NeniWnxo17XKkGQABfOppes9PXt8Jz1T4Spn7XKIdRf8ROfr%2FPKahF3zzC11HDDVCi7VKOQi8JZ3AKg1WJzs0I9hhXdOfPttMY1qGNNcAbJqifAOmiGorquj1VswEw%2BPkyooPcRgl6kyKOJoeJhmQi8%2Fn60D6k%2BD1X%2FlhGCVma%2Ft0FGlDE%2F9stBUeeYov3LGun%2Bb0P2yLSJflrx4RUDDi%2Fp3LBjqkAczO4%2BpfxwxsKbmSH3ajni1AkubHS2xA7DtOXXWcB8H0TyXgpIWcxc6jY%2BsqPLtMXbbih9WF%2Bx6Su3Yg3wB3P%2BS0gQnHr3yfnjkTwCHNSZFR%2FWTumskxgaZ%2F1xcb3slgLJE7vIrZUBbOeVpdWIdZOr4zNpezBBWJeB8xyG%2Fuc84krmgnvc%2FIIV750N%2BbltAJRgQfSR2mfW3gKls4sMj7Ksw1c9Jf&X-Amz-Signature=7f3bbb4cb6af0e02e8caaa8d875bf31a3c88bc32b969328d1d0341282e70e682&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3HI4CSL%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDY7KDCeT5I56ZrvYZUqOZRlZ%2BsSAOO3os6829FITNlIQIhAMkaUTSiV5zCSUTTCG5Cmjy9R8Qdc0nUM9ZjnoqtXx1TKv8DCB0QABoMNjM3NDIzMTgzODA1IgxOp4XPMU80xDVp4Doq3AO39%2BlxvimpljtwchHegj6jYrv48%2F1leuK%2FWJOn8ufnhUR5Fpul%2BlU89cMemS3PFtLO5V263kcQ8ZbJgLCEK4PtBI6gtmB%2F0xOi5%2FEH2h4nbNdic8ANe1efWiysu%2FxOe1jlb3sS37b36jIvCunz9rP%2BwQ7eyJc4VJ2yQxoISAfyS0bz4jk%2BNNgcXtbeWrIIJEq7G2dzpWEhiTE%2F386xFkIZMXuqT6NsvP8AOAgWCHw9Sf5P4%2B5F6XoCLgwXcTr5hlodG7GTLwVVD01lCL%2F56z6Ed2y2V4fPCyrtnAxKsk3%2BNAhVIblB3SAHAdXnxPCrDvoDrs5KDGE6gia4H56Fy9Ld%2FxNQBsF3cZQjcwjKZHQvrt9WbVodIxdyZaMS3TEPBG5Z8DIYZiMy%2FTMZ1O8VtTeLtx%2Bi6kL0cocxkgHX5Hl1zfJazXs3oEvlTAAjfO41AjAr%2FLcR5vigMuNIDe%2BxfuDUlKC3rRO95gOGglJw7CzkGUU%2Brt6mXtu9pgwzVWTJnT9Uo7fwLm8%2BKuw3yHWttPSnWw6dh6bpPFp%2BSvxVojrKdYX6HZTF3873fXHMWNvHcNUW2ejyNYNimnoR1JW98VSroTgeePN8uQzyxumVK2XrlGSLrsjTG316gHZ%2BvTCQ%2Fp3LBjqkAUJGOHLvnAmD3%2Fn2YOpvHbxxVnf8HmC6AM3iaprlW8D5w2u0sd5VbVMshXGwqp2TY%2F5WYcrLgJvp3tTrBkjz38%2FtkPtK3ZLuw%2BnIk2dXlPc7zqV7V%2B4rfQUuH1CEdidTtQ7ugwvPk4JrOzDa%2FMos1WAd5FDreoGB2vJPa8ncg5lODtQjzihavrwPKtwfVLwa8%2BKZjS6VWJsfEoh8XM7mTIeD4VIW&X-Amz-Signature=c5213cbf049f6fc1b927c2a331f7a242e8317924f256664426212f9a246d60d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTKD7OGN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIDywr1pMmPWq0ro%2FKmB5dHP4qdg7SrSUcVauI9w5yzVPAiEAx6L2cATKamDq636uT1%2BXsGKFadPkg%2FNhq7C%2B9Cl3zoUq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDMJ9sgZ8332he0a9ACrcAyUNBIIiVrUNp%2FnaLatDLZbEZ%2FC3djE5HVILrFEWHOQjiNlltdn8JTGeJFaSc6UAv9tMiQrh8D%2B04jXbarg4aEx7NYmtGvekpmgnb0uQPowFcnoEBDKpPIsWt141h0%2FVEBenQATivmhRr%2Ftaz278RPuraWM93AqEnDMhjUDGlr3jfpPDztqsurQ5N%2BwHZm%2BiXo%2B0%2FhJN2ZsyXjwoIANQobb8eNX8H23pLV%2F3xU9T4NWJx3rVdjHOoiFrutqh5c2ps3h4D87aHwaPYSu0CN13tK0R%2F9FZewoSIj3IkK0IE6PwAIOMyyTXUG5X04OcV2WHuglrNJ%2FFjMAqMpsCj1Njyv1vzFZERbRHimAOKSZl3NvMDVY2dQQn3kQ5plZoug86f3GVLLz3wEtXOCXioIPuon4VLSv5D9BOnaEK5FPAoZlqNKuJ9poS6Zfc0X7nkSzElwlOXlQFskRRXD1ha1x1bCPd%2F54Mdx%2FDb6OejvvPTUS%2BAC%2FpOXtM1wwqydBXschJXJyJgoTX18CX0EFNaQW2dwRIfYhXnfEC6QUMLv49DopUclvo5Svg5M1ojtw3IMd9vA7OtOD%2BCUDV%2F9cfkWG5FruOvlv98ZI%2FySL5%2FOdhCbgbe8PeGqoUghKW30O3MKf%2BncsGOqUBnFajWxUMwnngANdPYxgRxGTE%2F1erWcsIzBuVDWJptei5ixo1tJCjuERIin8arcFrp9hZyv3mV7td0sKH%2FDeBxRbz22UxwqjS3EVmUFVbSDz5T%2FX3cxMpVIAjHGovqH3TbhMCCyecwXrgi9f0G5aIok4zcd%2BRY%2BF6ZgW%2FHE8A%2F87xHA0pbYG%2BWciicR4Ns%2Fp1RKRC%2B7pklic8LuE6srMgXsvR8mQe&X-Amz-Signature=44b2002f00237555094c5e96ec10330f960c4628d24209d648d041572b4a4868&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTKD7OGN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIDywr1pMmPWq0ro%2FKmB5dHP4qdg7SrSUcVauI9w5yzVPAiEAx6L2cATKamDq636uT1%2BXsGKFadPkg%2FNhq7C%2B9Cl3zoUq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDMJ9sgZ8332he0a9ACrcAyUNBIIiVrUNp%2FnaLatDLZbEZ%2FC3djE5HVILrFEWHOQjiNlltdn8JTGeJFaSc6UAv9tMiQrh8D%2B04jXbarg4aEx7NYmtGvekpmgnb0uQPowFcnoEBDKpPIsWt141h0%2FVEBenQATivmhRr%2Ftaz278RPuraWM93AqEnDMhjUDGlr3jfpPDztqsurQ5N%2BwHZm%2BiXo%2B0%2FhJN2ZsyXjwoIANQobb8eNX8H23pLV%2F3xU9T4NWJx3rVdjHOoiFrutqh5c2ps3h4D87aHwaPYSu0CN13tK0R%2F9FZewoSIj3IkK0IE6PwAIOMyyTXUG5X04OcV2WHuglrNJ%2FFjMAqMpsCj1Njyv1vzFZERbRHimAOKSZl3NvMDVY2dQQn3kQ5plZoug86f3GVLLz3wEtXOCXioIPuon4VLSv5D9BOnaEK5FPAoZlqNKuJ9poS6Zfc0X7nkSzElwlOXlQFskRRXD1ha1x1bCPd%2F54Mdx%2FDb6OejvvPTUS%2BAC%2FpOXtM1wwqydBXschJXJyJgoTX18CX0EFNaQW2dwRIfYhXnfEC6QUMLv49DopUclvo5Svg5M1ojtw3IMd9vA7OtOD%2BCUDV%2F9cfkWG5FruOvlv98ZI%2FySL5%2FOdhCbgbe8PeGqoUghKW30O3MKf%2BncsGOqUBnFajWxUMwnngANdPYxgRxGTE%2F1erWcsIzBuVDWJptei5ixo1tJCjuERIin8arcFrp9hZyv3mV7td0sKH%2FDeBxRbz22UxwqjS3EVmUFVbSDz5T%2FX3cxMpVIAjHGovqH3TbhMCCyecwXrgi9f0G5aIok4zcd%2BRY%2BF6ZgW%2FHE8A%2F87xHA0pbYG%2BWciicR4Ns%2Fp1RKRC%2B7pklic8LuE6srMgXsvR8mQe&X-Amz-Signature=eea6e20344e805ccfa0371d02e67de2b5eccab33dede46b19029b8354f8b049a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y257A3X%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIHEeSmRSNOErg0ErBV8Np6oQAF8CzlWtYHK7qMIiaJcTAiBW7TBUSpfc%2FMO5kwEsczze4m8pXknY9lhPo%2Fq7mt9yryr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMzn9PfJz2QD07IOlgKtwDcNsFx%2F1Al8SKLRv7i%2BBYkVrPfRjz3jEBLIl7b%2B%2BW5uxNBotLxi21JTxT1M03KNmLBAey2KQvJlLLtCkk7ERX7ZdRoh%2F5M9guWhYGy4q05L1bgONgJoup6xMeScPJONgPTGdqaXNsibPyvOd8TX1359zu%2BRKxR3cFCbfWzI8OBlVvKgGBKKxMrpXsvGScnRXyjCenoT%2BbkejRPLNf%2FmAMsVC%2Fe6mRH2KunLM3kNpYHnnha8q41vsF3Pd%2BMpIVBUeJgJUOcqLXUyNjGijcGKbTQEfhGqkVuS%2FuKyhekg7Juu19GIkLr7nm9EVWzsaJcmrLw7gXscJa5Bpi9oGFi4lHwUVNRtyVVFOE%2FkhhvAn6HpRubLTIDsr4aUvJrhBH%2FVw8LKRgA2J1ef%2FcIRtmbdQeMP3LDMYR0wEP2UF6853Y1Qx04X5YlutPPGX5if%2BY9Z0rIyEqe%2Bj9kG6jpIuftpnaLlRLgaMFEwKO8EQqWIoTn0j6ERgVxzqAXko%2FApWVc2Nay9ycALFvmJELj1uUjx9ZIqNJOAnBtKTsd8Gq0X7zoOx1fT7OcTLin75lVztxn%2FflNYIEolbL58nzqaZqI6wGaLHby962eTVAAriDaPutCvOT3aTmkmu69xRIFVkw6%2F2dywY6pgERD3hJEJns8WizB1sqJm15U2xlOotgsp3Leg8pSFXs07eSclpJlSY3Gn8iGCTqt%2BKW68JtvtafSWH5ZsCl%2F4Fp0waAx2hpGapFcLodUeUbGW%2BXzWn9FrR%2BxaDjI5L1P4IqLtGtdOBvkHBGtLMwE0SQ93Q1eyyGAKGJMB5kOUVvRUR7Hf2ZfbkInOvgs%2BKHGlnqYjgOWiGTpGj6s%2FbXWYGmpynIGe%2FZ&X-Amz-Signature=e1824b2e036daa07833753042a51a44b6bca0cca55daa936b8c583558d901c05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJTBY5LW%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIEohT7EwhgERaW3OtfeHZGeycozVbHueI%2BGcU3Aua7YvAiBesdt0dhqNWpaScW9PSDlvYPGKyhLUW5uRhC1mVxRCDir%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMece3WRnpX5WQYsyaKtwDdT9E993b6FZyKJkPRIzFzQMT%2BV9THj2g0a0fJT%2F5LBKoDMaInuT4jWcRf4HpJtfVzYo7e9CEbBRv6NenNSFUn4PfpB0Ygj%2Fy1ucJ7um7kU2dgUeoxVeMW83T5VIssNOTiYCjsN%2By8o2QssKD9hQy%2FUEQ3xy0b7iZKHnmO5rDS7%2ByubhTqy1EgIg449g3D5Q9SSVEbmgM7Qm5oHemBGzgccCVLzJNOtj7Oi6bAovp1CjdN%2BHluIrr7tf2gL0p5yN3eZFwbJER%2Bo62RRV3IPEmu%2FPAkAJO55YI8jCrRorLgU5qkQnbSX5AJRjzkAEi0C8QQ%2FQIdoIiFcf%2BymQQZh1XdZtpboUyEzpnhrPrtFzUq37rW2unFBQ4LGg26%2F7tOLtrji5248829FIMKLIxQH38%2Bp8PCDROjrpSrZvNyCabutv9zW4nRYdg%2BjzY8Lx9BsVd5OpPC91Fzq%2F2o9Dogu0QtPpKbAW8cO2YQxigx1W6asJ3F50n62cz7kyjEET565nWg%2BetUKA4mF4KpE8GbPMNfLlJznxd%2BMJYTNYcMkcxfyQTnAONDhv9C6gVn2bOuVj0nkMWJCRFLopZwtGEqp5JGuh9Q1Plf0E4NuPOZblYa6Wu26Zm%2BQIIq%2Bu2n0kw9P6dywY6pgEo73fJF7r2%2FDvcBKXBLRXhbPaJcEmPXWFhr3AcBdOxlieKVSA58EGGZPRuedstDC7eL84Ihr5MbLpQexTXIL9YFxeUJ63145e1sJHOLsAq%2Ft64D59Ms9HGdxY%2B%2FxIwdHcQQTBxJwPrNAnft2aTASYsD%2FBOPV2I64p%2B2dzaQQtHjrHMXkduilccfrOpDZuSQlHngb6cJkrfQs0JR%2FLJ2pI0qNAvU%2B2w&X-Amz-Signature=955ceb06b93fe9eca6611ebd3c824fba8c21d4d1d5510488d7b5dcb23f733df9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G7XSXG3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIENt8i7NzRCslafymeZjS8JYlrrPYqZ6sI2h1MR5DT61AiEA2G%2FpdoPI7iJVLoUlFk%2FUjyPLLlXR9GhRcOqJVJATlRoq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDKZ%2F46vD5i7LIYTPpSrcA04PRR1PZhedozUXIuwR9PbnpsmSZtRumxFYe5VI8tENjKwChiS6JOdbFJzHuPilxfqQyfTz5tpohf9dNyfJZhwUXK4Xq1IKCwrrCACBx5jAGarPYJfooN91b%2FI0Twqv8wUALlVwwdwdSeahxWsmLroCQx4a9gPreijhNu66180HvR3PCOMgwssyD649S1cwTgTqGut58W564roXyANmrhW8UZL4f4306BUE97nzGpXHKrCFfFdAjtz1w8%2BryYr5o%2F47JMs5n%2BfDBSI9k1L6RxPJe7XjvdwF5uYjZd1JfHzXKFG7VeL5HTkqzbQ6s6ExnSRZHNVv7gxKK6M1j5bDW1UF%2BHGOiXGFQXQI5YNadAR4PB9w6Xoqn3mTOVj6u4k44gxLpthOOsa9TjglY8jlfFvpWCoqGLFEc0aekEqhMK9Cy8HfAuXYvpqYvPPTjw4YfDyIqo6SoPaXU6pfnFi%2BeTfzKLU95RJ5hG%2FgJGO%2BT%2BPJ8zHSB5VfzpD0PIWbt3DBFEKDfuoSigQghUAPltgai3WET1YLBMaKu8wbHIIRV9nQocGxWRbzuZ5R%2B62uxbFZdq%2FY6W%2F2ajCqTVD05GHtGKdcD9Aplw54rl5jYkRNc%2Fs67a7%2B2ddaisCCbfCGMPH9ncsGOqUBsUsOiwu%2BbDvsaillhoeEElhf1aK0k0cSMdmo1hYDw4UvDjfZWO2V5h8myhqdUz3eD4AKjVhX%2Fi%2FAmjsgGUpez2EN9IccHUrQ9Vs16qVPOq4qPzEjGrHXBWYTOGv7DpSEdrI1QLlMh%2F0cXNBEWiYBRtL6z0cMxRCAYRpxORICB94%2BdGVaTBcDi6rpkHNoTTIU6bKoX3nn3cLjNpCupNrYTrMuY1%2FU&X-Amz-Signature=20c6cd32622d7aa9331de5c2f940836ec4476ef76802d35f25e0e576b276eaa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z446BMA%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQCCGPRcw7YD%2BJ%2Bv%2BA5C%2BoKC%2BSV4zH60SgcOVEoDOhDqJgIgSN8abApg3oqpErO8OWi%2Fmeoqoj6QP1WwxNzZaOu64pIq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDEDAYdQ3ymcpHt6fLCrcA41ajxRDjN8%2BFn9sRDAivE7eEP79P43axiaaS6vwFfYGcat0GDS2%2Bam3t65%2B6vghXoq5PpIGQTdPelAXn5KklKpi%2FWQgPPDQslMV%2F58%2F2mlqpwhUWxkIGKqG1V4FaPiKXyBKlsQZkSnIoDuYYABP9c2ICJa9admQihzlbLoO%2FQpRbNV7%2Ba5ZRtECVfkdkDD8IseNCBoRTwfdAMESm%2B5n%2F7WcjZPzJs6oINX63b840C9SCnlZGKU5bE2m6ZfSjTRMzL%2BBbFnuJAx0PIbO1A6oYhsuCfF5sqpVJUbk44pQ6XLZBHA1hB6FdXOYYS05926U6g%2F9RNtoasbLg9JpSZhICA%2B7KXXTLF5qpZr80a7VVS3Q1qoSWCY3X9WioKQMlniyA1crrB66ppB%2BUP6qxr6m19A7xkKALIhumAJJgH0Rj%2BZkyP6vwjdebJbG2HKpQrypctLSFnh2oqn844USq4ndRzuE4fD1QRjb10jalqNtYmX7ouZXATrFSQwoU3k8F0QdU9YjWN5O7MLBNiG2kNigb7DEIc0k0fk2EPn5hHVFkjK9kT0jKzT0IaZM%2FsKkUNw7%2FpOd010k6%2FEnGWFO97RdEq4C9p0W5g%2FyrSezIONa8pAJQJYLTZX0GPdeaS4kMKf%2BncsGOqUB9N8ILzeLU88J4rzta%2B69%2BgFtXsmkwCSIcTWeKSR%2BeFf06mvHSKmTMXxBp1%2BXoOYsl3xdl%2FxvIv5pDveqNMLX14tDgRjj5qFL65bUPEoXHb%2F%2FMESvroowDnXWU9sKko%2BSLKVPujMwPC7f9iniyvI3jWww7OEqvO5y%2FkeiYj%2BzYObllTXe7JfJUiO7tRjs8a9UOs2%2BrfE5J2MxAzg2RgY4k112B4Tb&X-Amz-Signature=06057412084ca8835410af7fe5f9eadb143851827d333d8a0773d5e68b100736&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z446BMA%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQCCGPRcw7YD%2BJ%2Bv%2BA5C%2BoKC%2BSV4zH60SgcOVEoDOhDqJgIgSN8abApg3oqpErO8OWi%2Fmeoqoj6QP1WwxNzZaOu64pIq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDEDAYdQ3ymcpHt6fLCrcA41ajxRDjN8%2BFn9sRDAivE7eEP79P43axiaaS6vwFfYGcat0GDS2%2Bam3t65%2B6vghXoq5PpIGQTdPelAXn5KklKpi%2FWQgPPDQslMV%2F58%2F2mlqpwhUWxkIGKqG1V4FaPiKXyBKlsQZkSnIoDuYYABP9c2ICJa9admQihzlbLoO%2FQpRbNV7%2Ba5ZRtECVfkdkDD8IseNCBoRTwfdAMESm%2B5n%2F7WcjZPzJs6oINX63b840C9SCnlZGKU5bE2m6ZfSjTRMzL%2BBbFnuJAx0PIbO1A6oYhsuCfF5sqpVJUbk44pQ6XLZBHA1hB6FdXOYYS05926U6g%2F9RNtoasbLg9JpSZhICA%2B7KXXTLF5qpZr80a7VVS3Q1qoSWCY3X9WioKQMlniyA1crrB66ppB%2BUP6qxr6m19A7xkKALIhumAJJgH0Rj%2BZkyP6vwjdebJbG2HKpQrypctLSFnh2oqn844USq4ndRzuE4fD1QRjb10jalqNtYmX7ouZXATrFSQwoU3k8F0QdU9YjWN5O7MLBNiG2kNigb7DEIc0k0fk2EPn5hHVFkjK9kT0jKzT0IaZM%2FsKkUNw7%2FpOd010k6%2FEnGWFO97RdEq4C9p0W5g%2FyrSezIONa8pAJQJYLTZX0GPdeaS4kMKf%2BncsGOqUB9N8ILzeLU88J4rzta%2B69%2BgFtXsmkwCSIcTWeKSR%2BeFf06mvHSKmTMXxBp1%2BXoOYsl3xdl%2FxvIv5pDveqNMLX14tDgRjj5qFL65bUPEoXHb%2F%2FMESvroowDnXWU9sKko%2BSLKVPujMwPC7f9iniyvI3jWww7OEqvO5y%2FkeiYj%2BzYObllTXe7JfJUiO7tRjs8a9UOs2%2BrfE5J2MxAzg2RgY4k112B4Tb&X-Amz-Signature=be65c079585ad28aaf244eb93a0a8133a43d0f37644e7870b6110a6e0f104107&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDDTIMU4%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQD1e1vIn%2B%2FntT2pyJ3uQeXtmR6zQTXzP9wZKhiVuvlmNQIhANUW0vbcmYKXgON7JmYAif0ftcj56FmUG%2FFJ7mAdhOhsKv8DCB0QABoMNjM3NDIzMTgzODA1IgzodCGH0ZDHpnJNdhUq3AOy6LuV8Wl%2FLEXFkI1x7S8fubTPIL8pw8JJYs126hFaGGqnIiGJqAsLQm%2B1IeON4j5UQm%2Ffnm1uin2%2FROfJCpWcmW6DyxpAyUCD67JsIiKQFPIMjh309nLw3CKbK%2Fk5mCt4pd%2FZtHsk%2Fl4jpbGFPC6ZfyrMelsB0BH73Mmwvodxr%2Bk%2FUWtedAvktzmhJ5M84okb1eL5ajwH92nNzoYeoXuW%2BWxaw4f7i1WJrdTNXAiTwXz%2BHOx%2FdSYlRLsiFbOL4l%2FAkM8McLwMlN3QAtTaoayc9VFasFF7uxNwwksJ%2B%2BpwdupyTBGqr9tnEVUd%2Bje%2FGZCyKUP1pFx1UfhU21bLODUANXrlWaWEi%2FSB5IQzelZRCaoKO%2BK5Zl9KVUQlXiypRhhAioOQqmuE%2BshALPoSkFSx%2BPHjpyjTvkRu2Kn4KE9ZvNaRQuyrKHEf0ihY6A7GvAdMO85YCFhF%2BZIGLyPqB2rV%2BVdiWz55fP10uzXuN6moYzMH%2F9iiqrWQsrRGxWYCbteQE07%2FKVLntoMkXQEU9eiN3F3pOgDPV9p3ruxKN%2Bz9utwrhjT7t%2BoLvqVpPDF6Y4qTLMb637cEkjp6CHIt7nIII13lMgt9pTuaTcIoOuBZZe%2FLVQkJLWt7djeArjDp%2Fp3LBjqkAV2ccrRxAFkz6UynolOZ2wa6o0YMUrgJGT3HiQ6KPW1dOhPDEl0fxKgMDyT7LuB1EIukVD38llGboy2ino3%2FT73KSMxoMbVUm9JJTxlFweps%2Fms56e3WRzsoSWTDQ7zQfL5vPxZoQZ%2Fmjpw%2BJLU2WMWEc%2FroiHtYwN%2Bb5ZCogn76SgdPHNXykGgPcjryB8CodM%2FoaBAhfXxpEmkREEtlLqZNyJfc&X-Amz-Signature=1b7b6aa290da6c939ce391ffebf981a95cc058a720f4b1d18d513dc2027a40ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LRNSPMC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDG%2BdhRHyOHdaX%2BHJGL8CbXCImJc6iPEBBv%2BBw40ht4kAIhAOQxC0Bkd8YRpL9U4Zs6WY1QIxYQaSUgiv9faxKWLHv9Kv8DCB0QABoMNjM3NDIzMTgzODA1IgwFL0xtJl85%2FQyGSFsq3AMBnVyxvcb%2BYP0KXMXBXHJ6dtVXx5%2FcpXNuZ5NGeyFsXQ29O%2FjGYolYqDmtHsZevLqIURt1qNvqpnSDXEpCh2QESLHI3UShlde0nyj2W5IGoppQzLZ7qo2zpmYr%2FiXc3eIwI4OLdikJm7AdfhmafFU0oi%2BrEXNBrAh8LiY13M2%2FGD5wpUf8%2FFYXxQPL2I3Rn7ydQSPkBQdqXM05yP95iVG1gKqCpcMce7BghuzbC3sH1b8%2F%2F994ugIFQOTfECC5%2FLSb4XDxvsB8te2t6bExwqIkAaJt1eEDJfnfjEgcegicx3LDOILpNykLP8TI33Knh2tMh64n0H%2FYH4%2FJbmvdBpfy9yhFT1eCJQDBFs1pOMP3MWfAYlpbmQbgXPSN828yL1v%2BKfgpe6TZhXUzyLCUUvKJQnsx2p9lcotGjoav2PeB0B2h0xSPOIEFoTwZ9zAupnRkklOAJ6HOZf31Lhr5C09MVrNeJJkNWDDn236NWzO%2BgWMHCacB%2BFJ5SkIR1LoHmJ5Gu4vnSFeCDQgKgPslJsJmg7koKEK7kSZm8AUgu1c8zBqVxDXgwat%2B4Lfb6vOkatq2S7SiWKu1Ix9LiKbeMR9Yf%2BLZ9HW%2FG%2BGqyHmJioKuUNlfB7HcKtmxaVfMAzCB%2F53LBjqkAbtiQGMt5D9wfkhtO20%2BsXriRK9fXzI05xoTsRmyH01JRtuO4cUQh8PxnLjiTguFpNhQCf8lZWsW7CK1T%2FzG1KH2OZWMoLT7aMVN1aZVT1je7UtJNEDjLk4hmxVhUc%2BvVjGUlygF11M7Nkxbus2E%2FGqlQoM8Uwc27CHGEcyFgg6elj3K5qr4QLqvE3QtbMRBqHaoNXZ43Rq%2FAY1qlrN214YRk962&X-Amz-Signature=2261eb4579f72b479cfa7a3cfb5d950eae9d5ee8209030b89130f892a5a7b68e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LRNSPMC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDG%2BdhRHyOHdaX%2BHJGL8CbXCImJc6iPEBBv%2BBw40ht4kAIhAOQxC0Bkd8YRpL9U4Zs6WY1QIxYQaSUgiv9faxKWLHv9Kv8DCB0QABoMNjM3NDIzMTgzODA1IgwFL0xtJl85%2FQyGSFsq3AMBnVyxvcb%2BYP0KXMXBXHJ6dtVXx5%2FcpXNuZ5NGeyFsXQ29O%2FjGYolYqDmtHsZevLqIURt1qNvqpnSDXEpCh2QESLHI3UShlde0nyj2W5IGoppQzLZ7qo2zpmYr%2FiXc3eIwI4OLdikJm7AdfhmafFU0oi%2BrEXNBrAh8LiY13M2%2FGD5wpUf8%2FFYXxQPL2I3Rn7ydQSPkBQdqXM05yP95iVG1gKqCpcMce7BghuzbC3sH1b8%2F%2F994ugIFQOTfECC5%2FLSb4XDxvsB8te2t6bExwqIkAaJt1eEDJfnfjEgcegicx3LDOILpNykLP8TI33Knh2tMh64n0H%2FYH4%2FJbmvdBpfy9yhFT1eCJQDBFs1pOMP3MWfAYlpbmQbgXPSN828yL1v%2BKfgpe6TZhXUzyLCUUvKJQnsx2p9lcotGjoav2PeB0B2h0xSPOIEFoTwZ9zAupnRkklOAJ6HOZf31Lhr5C09MVrNeJJkNWDDn236NWzO%2BgWMHCacB%2BFJ5SkIR1LoHmJ5Gu4vnSFeCDQgKgPslJsJmg7koKEK7kSZm8AUgu1c8zBqVxDXgwat%2B4Lfb6vOkatq2S7SiWKu1Ix9LiKbeMR9Yf%2BLZ9HW%2FG%2BGqyHmJioKuUNlfB7HcKtmxaVfMAzCB%2F53LBjqkAbtiQGMt5D9wfkhtO20%2BsXriRK9fXzI05xoTsRmyH01JRtuO4cUQh8PxnLjiTguFpNhQCf8lZWsW7CK1T%2FzG1KH2OZWMoLT7aMVN1aZVT1je7UtJNEDjLk4hmxVhUc%2BvVjGUlygF11M7Nkxbus2E%2FGqlQoM8Uwc27CHGEcyFgg6elj3K5qr4QLqvE3QtbMRBqHaoNXZ43Rq%2FAY1qlrN214YRk962&X-Amz-Signature=2261eb4579f72b479cfa7a3cfb5d950eae9d5ee8209030b89130f892a5a7b68e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGLXROF3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T121818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIHIu0HH%2B5RqyAmp1EbX%2BslbIOJgRfsoWZRERJzehZysyAiB6OSSx33hIqwKlZVcYDBtB0vS80doIxjmVsZX7fl%2FwNyr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMwU5CEYrf861ZXf6zKtwDqz4OvzIpdxpioDM7aldoDohbHMQ9dwV13S9CcwTXDMv65r1vgJvf8V96%2FtXClIpQ%2FQNzs5HWGpDKgEVNAhzU%2FCFG%2Fj7if4c6pgJmMFrepSEJkffgu%2FBED0Z9BwQ8LTQ8ecAhaQtjM9sUewbPqt85gQj96Ubc9Iiz0JnVS05dA7kwqP4lijpa1F7ZuGCh%2BOl6xPYUcL%2B%2FKV8NPFPHcI%2FQK4pPoBXfDW473YKyhhBiavR1pinNqItIubvIyrHf7oKaGF0onIMzF%2FZ63autZ%2FWysvaEw%2BWn1UMN3F9jZOW2ccpCv4XAyLtMLlO97VnpoIQWknP3kFmTQxdc2xE5ZJ24blk2yC3JriQRvRC8Y6YxLB5nzITrqP1vF%2BVTyJjYVy37OvHPi13wBp%2FP0rgqbiQ2Rqxy%2Fr9Zlxw34%2BrIpvZJT%2BovC6BACQhgzqFmFL0RmvESQz48UsbA5OEMuMsclKM97YB1%2FSr3jQbQgyElMrOXZvPIIA15bxVKqD0F2bNDeErI8s63cXjEu7qjMbYb3hfJ13EPWaaVahKjKqo2xRQdC3AELL4DzRA8ZHOIsviXfQpDmnNYHbbrpJO0MtTlku3kCLPq%2FfVv5Yhytm3bjp73VOjG5T%2FkcgZwbH%2FU%2BF8wrv6dywY6pgHJGK%2Fa5TBn4KWBWRMuK%2FSgIh8oolRBRQhsQrDm4ihR6eEjQf%2FNupkASXOFDSdXjcSWBH5UDi6X8CAS4GDS9y3MG36%2FZnP%2F954j44ENTO%2BoMsq3hRfhc31vOrzmL%2FRWXfgfnqSCayOO4P7w7jqd6wVzhqy9%2FoE4r%2Fc0ZWT%2FP2Prvh%2FU60UYCVvsqb7PYuV0q9Pj6IwF4Dj96vdZ8QU7ShGlQnpJQ%2Fwh&X-Amz-Signature=29a6831518145378618d98818fae963c942ca7af7e352609a1945759d24376db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

