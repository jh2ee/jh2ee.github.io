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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHJDVZVU%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDYkGWAKIFqk%2BNZaZ9knFa5FX%2FWC%2FsagI83ZTVAuXXwTAiAkwBIrDVaobj9HKj71ukgiXZrJI%2FWP7bUd2TYCcgrNHir%2FAwh%2FEAAaDDYzNzQyMzE4MzgwNSIMDPkFph9JGFD1kCH1KtwDxgGEabwkgu1bZ%2FEJUhv5tjRdLLEQ1UNwHvYuqgHc%2F4%2BzYBtKx%2BoLzS1CkqE6WrFJfly9aHw2LKECfdhIzmYCxHuTIVetsfv1q5RKm7PcVfGATZe1XOKKGXrUJb%2FvrC6Oc07h75g5ByDBcDBepB%2FpubVNKPwfeaV001thgYNAnNBiuXBxNRaXrwqHtAHSkjMJuTrXKir4B7LyB%2B5viSr91AE5oxWTfoqUD085FKnapfHCI%2Ft8DheHlI37t9QU3ODB53UNjHt4Bok8IbaUWgvB700tZdnVcxWZMsVo2LO25zIprpKXSAgHnsdN1q4p30mVyDzCH%2B68kl26pW1rp%2Bz8NHJxZmIOJxmUk6P5zCSct9KBEq%2Fb7ZnhrQpOVBgTSP9fmR5PBDTkRy3bnCT0XRl3tB9Brz%2BGBMuxal2HcgYVMKDrg7lPgrBVSVA6FBS7GgGXknvLlPD%2BrQOF5whMPgnZafUkzYJFutm2MunuOILwZbI3AwMkUCREya%2B4%2BU1vFXvFpCpYGpbIayf8QFrixkLlyJS7vxlojEXVV2LvAAtMouK2PrmGupn0dRp1Ui3vPVjOnSD%2FWH3IARGjOnGovPl%2Bx2UEldUT1UujlfTgDddJ%2FyVNEIDKxUPObTsh%2BZEwi9KzywY6pgF3t4jaQCVN51WMuZGsWc52uJ1azXknEdAQ%2F0sLifyljTQeFVt07uYHysbDtNTiixtT%2BYZ8zh9h5dc2HuINLrCMLoRr0uOC9aocs5Motf9ZeR3GkyDX6qZrnsTUu6jkz568wtXb15DtR5FCfVFPEVyY5mMkvUYD8pvMgGMHD9cckTkwRJ7kUnuhFAc8RWc%2BiPjYxPiBJv0C2cCsVAg1cmVewCl0GhuU&X-Amz-Signature=5b07fb79a0227149785f69915ace8642d4be509c0f478fc78190779c7b6a5d16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHJDVZVU%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDYkGWAKIFqk%2BNZaZ9knFa5FX%2FWC%2FsagI83ZTVAuXXwTAiAkwBIrDVaobj9HKj71ukgiXZrJI%2FWP7bUd2TYCcgrNHir%2FAwh%2FEAAaDDYzNzQyMzE4MzgwNSIMDPkFph9JGFD1kCH1KtwDxgGEabwkgu1bZ%2FEJUhv5tjRdLLEQ1UNwHvYuqgHc%2F4%2BzYBtKx%2BoLzS1CkqE6WrFJfly9aHw2LKECfdhIzmYCxHuTIVetsfv1q5RKm7PcVfGATZe1XOKKGXrUJb%2FvrC6Oc07h75g5ByDBcDBepB%2FpubVNKPwfeaV001thgYNAnNBiuXBxNRaXrwqHtAHSkjMJuTrXKir4B7LyB%2B5viSr91AE5oxWTfoqUD085FKnapfHCI%2Ft8DheHlI37t9QU3ODB53UNjHt4Bok8IbaUWgvB700tZdnVcxWZMsVo2LO25zIprpKXSAgHnsdN1q4p30mVyDzCH%2B68kl26pW1rp%2Bz8NHJxZmIOJxmUk6P5zCSct9KBEq%2Fb7ZnhrQpOVBgTSP9fmR5PBDTkRy3bnCT0XRl3tB9Brz%2BGBMuxal2HcgYVMKDrg7lPgrBVSVA6FBS7GgGXknvLlPD%2BrQOF5whMPgnZafUkzYJFutm2MunuOILwZbI3AwMkUCREya%2B4%2BU1vFXvFpCpYGpbIayf8QFrixkLlyJS7vxlojEXVV2LvAAtMouK2PrmGupn0dRp1Ui3vPVjOnSD%2FWH3IARGjOnGovPl%2Bx2UEldUT1UujlfTgDddJ%2FyVNEIDKxUPObTsh%2BZEwi9KzywY6pgF3t4jaQCVN51WMuZGsWc52uJ1azXknEdAQ%2F0sLifyljTQeFVt07uYHysbDtNTiixtT%2BYZ8zh9h5dc2HuINLrCMLoRr0uOC9aocs5Motf9ZeR3GkyDX6qZrnsTUu6jkz568wtXb15DtR5FCfVFPEVyY5mMkvUYD8pvMgGMHD9cckTkwRJ7kUnuhFAc8RWc%2BiPjYxPiBJv0C2cCsVAg1cmVewCl0GhuU&X-Amz-Signature=5b07fb79a0227149785f69915ace8642d4be509c0f478fc78190779c7b6a5d16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466452ILENC%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG1gjpjuGg94XEZegDKHT%2BHHOV7Wf%2FFJfURYNGAeXk6RAiBf92ZpegaXdj2xE%2BwmLSBjIh7aMOHwBRHMZ9d6Q9YVXyr%2FAwh%2FEAAaDDYzNzQyMzE4MzgwNSIMH3yrWMIvR6Gt9yOoKtwD%2BRVO1RQb9EmD69VI%2FR8QTPRSrzSad49PqpRRoOjnR8KhdhkEZ0vUSXA8cstkB2A%2Bvh6rWOp6i62B5%2FMUSMU9Ese5v%2BBRQB67o7yLJbbKyOdXA2vMNWHuCdOT0MYH2xvbNayZE0LnAwEXS0gvE8acEhcaxmIlahxeYsCrradPsH28JuvTy4nJ5dbU%2FclY4G7%2FtjLB913RFYHMTmx45CaRqDFEEbY2Iuit1bH4a3f8FqsPQakv8kh32h01wOOVWOZip2OWQla3SiFoMNUU%2Bh5VtC7vezlv6q8SW5RdcJAJTqjF1g6lBxCkFQIC1R1a57uglehY4DzWTYL94q2TBnYxe6KK8NRVgCR2LQ%2F38YHkpxTO8FDQjhV3SPhoMA8VFKThtS0UwQdK%2BbkbtZ2duPY7T2A9k6yqM0DgowWHJEhea2wPWswydZ9mQcSc%2Bv7YdQsytXCYwAUW5UncCI2sgAjg%2BKDfj%2BRvZRH%2FiCAYNAAu0EMRvIdDXrglwhiotiEC5V3orVKqmx8%2FStiqqSsUzRTOC%2B%2FJfFc00a%2F3xs23UBFq9oy2xIc96XKZCV615Q7wiRhJTQ2VRxcVGBvUx9YpA%2FZwIKgP7Gz7ftGT1FM%2Bq00NrUezeSl8qxM0vQr3nPQwps2zywY6pgErKeuZeTgKwa6Rh6CC6n7PKVCxRUIyuC3yjaJoqnXdx5bmnKaabMcBv4Wxbtmsrj340y2s6xe3myzFAug%2BLU84oT7UdbpEi7wan8bAx%2BPvFzhPl6godFqgEwIpPnn4%2Bbx6kL0fJp6qXeHeFo27lsnLAzNBbwE28R4Qg6QV%2F8JUpj8VYS6pWg39GoTe6BLnrh0o%2BvxqnOiNbFCu7R5bK8ezGy5S9q%2F6&X-Amz-Signature=08603955cd2e17109500a797877f9f7937ee483b5b4628c9d0e98ac265866fed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKGQBZBN%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBoXYYln205WsDn7hg3Mbt69FzOEqgx1JKDgBuir8oC6AiEAs96wxZa1r6Pc5pU6%2BiVTq7jBlIbXy33AhVTwIkvDQjEq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDOMPi7lnNq%2Fj%2BkC4zSrcA9vbmqGV8mqFnpRDbzFlbpDvSHJXw3B6mVwt%2B1uxBdXhRnDVNWo9F1%2B21CVY4P7qQXZbR0lek5%2BqTJjEBxDovLaG7aaEdffu5p292DnRAtF3PJwRXidyBipkQMJQHObfjDYx44qo3xrOBUGowiljvB80PVesU7RDEVqdcstdqJUUMxBWpKXnZWk5EcHgcgXBO2Y%2BvMr4PrRUoG6GM9607LgPjXIwI%2FcqMCHxPdlnQj8i%2Fq7RGtxATJRyCwOd5Q9GthnKupooIdrn2QZDw268aanCr1ShuCsVqmZ%2BHAeKEBvp8f17FgWfUOWIXP08H7fds4ugyFwmi1o1HlzxZIz2Wl2MVpyovUWeHzCU7asl0KFqiD8s6AKEmqMOkOWseV3ScKQ3iRcSMwRicu27RPvvFTzrvpsDxNCMCe5T%2BT5YAACap0FYaPPQGbYyHpyjqLj4OXEIMNnmBmOe%2FkLVlC8DuqUSWrFn0e7w1ReXG6FbxMdqyHFszrVPftJ9DPZ5mFcxWyW6W%2F7D53k7z9FiipxYDvvgoE1UR8Vku%2Fn9AM6eAZGyoyBl8klWrds%2Fn5rDHfxH7VbfLHNI5Mkk2vRX5X2R%2F%2B01DWTQBnS7rRLgIP5WYkhT1lcrxkNzyNNqoFy%2FMJnLs8sGOqUBy3cNZjBFtD%2BstsRlU0aTK2NU4gHB%2BBx9L%2BddNratinCdJ36VTeK45T%2BKms5djt4wT2AaEM%2FvqTU%2Bc%2BOOaXKPQm1CjJCSh7BvElwiFajeM6Xn0uye7VovKCH%2F0povnB%2By7I7IhoPe%2FVpqVAZzV1%2Bvstt9dkxJzGuyCqqxYgOAdD8KxfHBTC8Aslsn1ud54fX1YjFBBDMXFIrQI5hw5MqNOcaKcGXi&X-Amz-Signature=089af9861d1fa2d896421ac4704f23905b802bbbafc87afc12bc139a424ee799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKGQBZBN%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBoXYYln205WsDn7hg3Mbt69FzOEqgx1JKDgBuir8oC6AiEAs96wxZa1r6Pc5pU6%2BiVTq7jBlIbXy33AhVTwIkvDQjEq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDOMPi7lnNq%2Fj%2BkC4zSrcA9vbmqGV8mqFnpRDbzFlbpDvSHJXw3B6mVwt%2B1uxBdXhRnDVNWo9F1%2B21CVY4P7qQXZbR0lek5%2BqTJjEBxDovLaG7aaEdffu5p292DnRAtF3PJwRXidyBipkQMJQHObfjDYx44qo3xrOBUGowiljvB80PVesU7RDEVqdcstdqJUUMxBWpKXnZWk5EcHgcgXBO2Y%2BvMr4PrRUoG6GM9607LgPjXIwI%2FcqMCHxPdlnQj8i%2Fq7RGtxATJRyCwOd5Q9GthnKupooIdrn2QZDw268aanCr1ShuCsVqmZ%2BHAeKEBvp8f17FgWfUOWIXP08H7fds4ugyFwmi1o1HlzxZIz2Wl2MVpyovUWeHzCU7asl0KFqiD8s6AKEmqMOkOWseV3ScKQ3iRcSMwRicu27RPvvFTzrvpsDxNCMCe5T%2BT5YAACap0FYaPPQGbYyHpyjqLj4OXEIMNnmBmOe%2FkLVlC8DuqUSWrFn0e7w1ReXG6FbxMdqyHFszrVPftJ9DPZ5mFcxWyW6W%2F7D53k7z9FiipxYDvvgoE1UR8Vku%2Fn9AM6eAZGyoyBl8klWrds%2Fn5rDHfxH7VbfLHNI5Mkk2vRX5X2R%2F%2B01DWTQBnS7rRLgIP5WYkhT1lcrxkNzyNNqoFy%2FMJnLs8sGOqUBy3cNZjBFtD%2BstsRlU0aTK2NU4gHB%2BBx9L%2BddNratinCdJ36VTeK45T%2BKms5djt4wT2AaEM%2FvqTU%2Bc%2BOOaXKPQm1CjJCSh7BvElwiFajeM6Xn0uye7VovKCH%2F0povnB%2By7I7IhoPe%2FVpqVAZzV1%2Bvstt9dkxJzGuyCqqxYgOAdD8KxfHBTC8Aslsn1ud54fX1YjFBBDMXFIrQI5hw5MqNOcaKcGXi&X-Amz-Signature=ab39c1cbc111281a22400337b8b657c236780815405b1c9e32aa1e0f45c5cc27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6SSHSUP%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGr3Fn5f7KVDWHRS8BNyRO2InTEX072MNhy7dyE5qGkpAiEAsZ39LiQqfl416Tq2s2We4qhJMegE0t9hTnIapFyvznoq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDIUnwc5%2FoXLotmHQuircA%2FRPaqasf651zQspt2qVM52CFTl7%2B%2Fv7LsVvHFQWDF77Acr2XyK8v4RGh8C25ANhy30bubJVQ6iclQkBwLMCZmfn5A3ctje44n4AjFG2rthO1hyLivqQGKsST7YfwbTNSd5omr6bKEq%2FFXwIHv6zAxvsI7YzuqYkprjhlLnbQ9olQR53IRADAQ2oRFKsF5YDtcr41U22aBsR52kWJHOTL2I7DfWoKF5LdVCMkiBF107jtpX%2FqB6kT1kKAsEQvH9qzE6sLktD6kJ1r3nKdG9V21YSPtKYfIk6tMiiTkDAEHvl5u3n4KVVEjSXvj5keJyIJKw9YdtIOODPQMSwxGQ1s%2BQXaNUqEBfqUxxBHygieiO1mmHZ7KI6VRbkeh7Vk18XtNDyWjtPdmLLE7S6EA45E3SjsSCXZmAPD2fIXeqrHu%2BBRPZIcsH0Z1vXyTuN%2Be1x4UDp0SfJHe301QMOge2Sn6KrTb9W26%2Bomp%2BEPxXwB95j04FyLmVWfWGCZ%2BREA7LdipJsVRb9pZnGvexSJrdCEInISwHZH2YKo4TprrzNbv96%2B0a5yvf7uv0at6zGj4ym0V2H5B83r4LJYcdtzko4GXsJwtnwSVZUNqZqUYB3IjMiZ3pgunyndf4XhP4CMIrTs8sGOqUB4IH%2BfqknAUdcPk5Fbc%2FZ8obwkvuB%2BF5I4zUNLPPs9xjdCEQ%2FVAcPw6TS3eID2Go4VZuQG2lyuYCA8oe1VwFXyS1%2FIdd%2BMccRooZCshHT119FOq1eJ2aYqlhIJZ%2FKcMJ7NABp9Ig0ha%2F%2F3efx6hR8BEa7kPRiNI3ldz1kqqI64%2FeQBFusAW3EBas91fpjsaZm%2BBiOfLLH66EaHaCU4L1zBFgc0aHo&X-Amz-Signature=6b6d88da3fa839663854df78d20a9a640772b5e45c3051d2265155ad9d6665db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646ALRUSU%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGlFWWeFaytxyK7UUeJuTK8A0mXcX9GIGTeYQu%2Bi8rSwIhAP%2FylJ53pLphhOH3mlmqsm9SyJRqY%2FECyFoKTcbP9cM%2BKv8DCH8QABoMNjM3NDIzMTgzODA1IgyxBwalcO%2BlyAg5o8gq3AOE3HzoDfwbMeW9s8Vm7XGdetscS%2F3d17CjcLEnYYz3redV%2FwK4pGCXlb6T3L9oXOT3j2ZLyLQzZx7dr4k7cjEFEa7t1coAT5TVK%2B72MMGfCSI1TO2T0U1hK31G6hqHyody%2BfggQFW9Ubm5hz8p623Sqq884vj5EOKvmjy8Aqqux1yEXsIMtQw%2FljIfIQxZrEsd2recQrTBN82RgOI4PB%2FanxMsm3%2Biwq697kvpw86l2%2FvnRJvdV9WWL%2Bcv2n8R2pRbSQ12gsvSbtn0Y5Fa%2FqWSYKJEqHSK09HDKlaA85yrtdBuAgk%2Bz8pM8yOMdh%2FDnhvtS4Nko53UbhQOB2ebZRGxT6zIbUqK3J%2BMfCrffHEke7nGfQU8%2BaBhtgeGlyM5tUtCE0r6%2FpR2bvXUPhiXdn9NMs8aHJ3yBYPPgnD%2Bewdh0OcJPYaGcnev2woIzrQib12wYwON%2BzUBYlXoPC1WZLrV2tpE8Z03GalQ2xiMXnyO6rueUKN3VTQRpcupbMcAYzwtf8w%2FBK7M5BdQreW4ov8gXRfHWg6F8ECh9IbADIqYxkEl8uWfc4eMrUnsJ1%2B2%2BdPCJ2NaaKAtGrdOlt7bSzrmdbYyl423vLNOMU9MhGGYAHdL4vF5ZAeafDytujCX0LPLBjqkAY0CFMu3YZohoJ6WGDu%2FRtLtJNHw3i4IE1jE%2F4bmgsrejplimwzk8d31aUEKx%2FBOWzcmgcO6f2lx%2FpW9H4TGPzfp0ixK3%2B7GIN%2F60H6k8CdSQ7uDiMNoPV1w7FkULWdx9Pu3wPvJg0%2FLC2XaH6UttqkzpsTgxgQxCORuXnhVnuhOf5zl5Fg4sSLjtMYYkrHxHHzLyBTXom2XGMvaK6l2NV5GrJyU&X-Amz-Signature=7b4a1d3bbf1d45f72d658eba86cfe5ea5bd092425f9ab9b5e0938838334d121d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKWHUPR4%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCV3wf1HWfDrRLSWCMrXYCrU%2BqXF6F1yVGqmhT%2FrHcBHAIgYl5qOwJIY74MxzPvYw34t7BPZjxjHIpJloF2f8ZcXQQq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDNHfV%2F7Mow1MtVQN3CrcAw0u5Vlsj9y%2FYRddS0Pjiyw%2BScSB2Hx9wzfcGE7QhMsP994Xs562SyNoqscwvZ7pGf9hogbDPISVZINmqVnE8YVSdRdzA%2BAjlP2We2QdozRRvmdrvTxoRqgx7OVnx2aNmrPAQ%2BF9rPMNhq6P5uh5MQUAm%2F8zN2HIUYflndPO6NKhJyda4%2BL41Mh0BG18fmYcoTt6IY7j0gsWz7yNWUaQ%2F%2BCWjS9CPz8MitAKu2ERktoykjmWJ%2F4CJKBSQdAd0mMJujgPlqT%2BKxmdOu3dknhKLcxzgLvfbgwkR1vosh2kEe9FoGtnzi9hoC54h0dNH9weBFYXt8%2BTg%2ByoFmYgZwp3RaxmpjBnrwcFF0Uy37m%2F%2BNTI2Zdkb5g%2F%2BJrB8kkaxs62Es6nHC7Y6DdRP6RPOtOkUTC%2BZY5%2FOd07xbIqFF%2BJTQlJgXtZW1WEfkvqlcu2KRMJD0%2BqcEl81mI6YJ5WUeFS6qkRTM6CVan%2BE4sT%2Be8SXyTTg4PBIq8D72yZX%2BLU5RPYJrrV2BAVb%2F3a6G0QhrtH9Jc%2Bw76bsCDnY7fkPRXQaXZMKS8082i8Pob7RlcwVY9MMxU2XuTlVDDKpqOGBdIyA1K4lPRPsBe6Hmc5ghcC4wweTO9zoalKZZNEDmacMPLLs8sGOqUBKbF2PmJYaZsFfolAbgRwGcY6oSbHpggGMSldMHO0L9bZKqxsfsYwDmuMKcu8O7gIkTWbUESs1FLNe0SaGMELvNysH%2FpoWEAF5r1s%2FAY3ZO%2FHavZz9z8rRSH%2FIVRVkY6cAl9LUr2vJ%2BDBAYIqRwdfMI7sM9BIadA3REynCF7h7xp41jQG%2B%2BcTP1Utz%2B44087WRPwvQE92pxYARH4%2B4fUA6Wlpd0Oy&X-Amz-Signature=9903c7a89c57da8055ebcdf815158b5ab47373fec98559f22cea622310f3fefa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WARH7X6X%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBJELeW50031gkiQQeccWrmLoX7HU3x5aIVIQ19tbTOEAiEAh0kwiXiPzPxRD6LYAFlp%2Fd5y%2F2kIxVeA%2BZXLgaY8b3oq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDC7o993%2FrQ98DZ0SIyrcA7n6USoWSuFgMUczIQr%2BuelPm8v6%2BGlg%2Ba4RWSimvRb8iiqetG0lEA5%2B6wDROqmU%2BTWYi%2BIG4KRgJVLFSdjjuQC5KPQrxfT4zwBlSTw01bEcbElFl7qtABXdoDTmO0OGuv%2F2SnFjFmm%2BnTdsfjuAAuEe4ZKU80pxK9rDg2YGX8fFd45%2BP9CO%2B7aTwrVW1M2tih2OV6vbifJJRBUdICqlXZ4G909DOH4xF8inTzbn9zkquC4jykxZ6wmuxEr89F6Gk76rYpKTOS4F5%2BdhmtfXJPRtfN4Xipogmkuzg16OMkMMqoXXycdl0bkwLpa9dkpEfedaPyN1H93AFGZe4zIi3vqSR1U%2F4hx0UV6ODg8rK%2BmBFnhlNWWnphOo4%2BLtxPGmCHeB8agMMohfkxpyBhe4xtkQsHC0h5S3YrLJWqTTfuy4GEcY6D%2FqKU7GTtxjvQjxrdvcL5J%2FT%2BazOC9mHw%2BwoQTwlmaO55jpkLEiKCMLPLnUw9M53wt6hohZFQW%2BoTTeqy9ahZd7wx7BuaZYKNSyOhiit9FcwlQrHhNNba446R0nG59erOQQNDw0TpnjES1lOR8XgyPzX0GoNu66LsPGCwEoIYbK89HSxe6cUDWn7Uk7qdjEV8eK8UsnELiWMJjSs8sGOqUBu3Yn7yXNG%2BuraE07kbqKwdcMayfTaouUz87G6F1Jk4%2FlmOBKjdWYFb3shkSnfRPrqU%2F4qBuEYNBoEnD%2Fhoupf74bELW1vgSsuVNNG1mBfSdUnNVcBwVe1ZFmiwfn%2BzmZk2DKYGvXVerddU%2Fmwfmn78RretBBUICQesFarwOfrUb8TD8xAZHb3UlA6XCTk%2Bp3DMievhth1tmCgzQkfuQ9whyYjzRk&X-Amz-Signature=979059ed93cddb0f6d86a5d79825e2493bb3e730d96269d0513804d1efacf8c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WARH7X6X%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBJELeW50031gkiQQeccWrmLoX7HU3x5aIVIQ19tbTOEAiEAh0kwiXiPzPxRD6LYAFlp%2Fd5y%2F2kIxVeA%2BZXLgaY8b3oq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDC7o993%2FrQ98DZ0SIyrcA7n6USoWSuFgMUczIQr%2BuelPm8v6%2BGlg%2Ba4RWSimvRb8iiqetG0lEA5%2B6wDROqmU%2BTWYi%2BIG4KRgJVLFSdjjuQC5KPQrxfT4zwBlSTw01bEcbElFl7qtABXdoDTmO0OGuv%2F2SnFjFmm%2BnTdsfjuAAuEe4ZKU80pxK9rDg2YGX8fFd45%2BP9CO%2B7aTwrVW1M2tih2OV6vbifJJRBUdICqlXZ4G909DOH4xF8inTzbn9zkquC4jykxZ6wmuxEr89F6Gk76rYpKTOS4F5%2BdhmtfXJPRtfN4Xipogmkuzg16OMkMMqoXXycdl0bkwLpa9dkpEfedaPyN1H93AFGZe4zIi3vqSR1U%2F4hx0UV6ODg8rK%2BmBFnhlNWWnphOo4%2BLtxPGmCHeB8agMMohfkxpyBhe4xtkQsHC0h5S3YrLJWqTTfuy4GEcY6D%2FqKU7GTtxjvQjxrdvcL5J%2FT%2BazOC9mHw%2BwoQTwlmaO55jpkLEiKCMLPLnUw9M53wt6hohZFQW%2BoTTeqy9ahZd7wx7BuaZYKNSyOhiit9FcwlQrHhNNba446R0nG59erOQQNDw0TpnjES1lOR8XgyPzX0GoNu66LsPGCwEoIYbK89HSxe6cUDWn7Uk7qdjEV8eK8UsnELiWMJjSs8sGOqUBu3Yn7yXNG%2BuraE07kbqKwdcMayfTaouUz87G6F1Jk4%2FlmOBKjdWYFb3shkSnfRPrqU%2F4qBuEYNBoEnD%2Fhoupf74bELW1vgSsuVNNG1mBfSdUnNVcBwVe1ZFmiwfn%2BzmZk2DKYGvXVerddU%2Fmwfmn78RretBBUICQesFarwOfrUb8TD8xAZHb3UlA6XCTk%2Bp3DMievhth1tmCgzQkfuQ9whyYjzRk&X-Amz-Signature=d8c0de5f7222ec0c63327260ca84d4c47f8ed8b5e37b9655fe4d41151b765b3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UQSLNMS%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCarnF%2F8jCTCfX%2FqL%2BH1zKPIJyIDPwB0DAuxYHmYqLVmAIhALeiEIR7h7rxIYyj7VCBh20itk%2BekCk7L5xmuYr42c4kKv8DCH8QABoMNjM3NDIzMTgzODA1Igw%2Fn0Hrw3tyqZjP%2B%2FQq3APsvz35bq%2BLXUl%2FLeUO5TDeQ%2BBiQGl2uYtukVN3W6MFVXXLNYcJHV6LVWpNC4E5d8FBag7Qnc9Ya%2FexEwH0B%2BQ3ZsLS6J0XqoRVHZMfOrxxZispxyBMLLUkwB1gxIq5FFGBqFD3LTRhuAwb0bB6Zkuzu3hLNRwh0CXVOz1qi8S0CaOxuDmf%2Fgro%2F9F8qeTqXQFFXbi%2BVarVSoncU06FsMNQum0360fN0zvOLPRKtuiwfsnBo7kI4pJy55btNt8yGbaJwcwysWmygrq9RS%2F14pb7YbuOmhaK6PHeeSVaKnMTb1IS1S7HMjnMzdI%2B2gyhD5rdABqMe%2FVkE9yt2jQDvWW8FcG%2FbQk2%2FX1oOobA6XkdRmNv5cN7WJiko0YpLjIBSQ3riet8xwxMJCvPKHNg0idmQdggTLasRn2tTh4iuAto5avh9rRS550Afvz8oPxrdne6pcBl7FChUJP7b1uyjv1hsigW0r%2BKdA%2BmX0H3lgBqM2NZwPc9cp5myl4VD5%2BNJMlvaDlvlqt%2Bm9B%2BgvfN7IzfJtgO9Ws%2FV0ga6m8eiwpi4M8jrdxE5uQFN9B7aSp1hWfqFbFs6xJotZkihmWfxOlTDgU2kGYBjTYKo7IaiNeiKsEeSxN77JzUpe4vejDR0bPLBjqkARu3Z0RPHerfp6F5D%2BfTvDQwXEZVsWATv0NZs9mmSNX%2FEsNp095Dr6lG%2FqCL%2FfNIMLIqhqkhLatev8QPB%2FXhIXJFuppFzdGLTc8MRE%2B5QYXJ66UfEMv7Ph4EN0zh5eXq8WggOQY0yJoE3dD6brfp0%2BioBmJ9DPiL8Ig9vWjX3ZljX6HMhdliL8DNBf9RJWPPqaY5qtb0qr06cNfOxGss9gEJjYb1&X-Amz-Signature=6263ae4dba95a49cb290ac4093a9f6b0d306153bdbbda776b3b004cbeafc3d61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OQNQFUF%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJ2VWpfGy3thoa0iFaFyYYEf13B3wf4q3bQrmdsnULcQIhAJQMwwpYyJMW72zzingoJaMUImNjLIoxWlv04pA2lb22Kv8DCH8QABoMNjM3NDIzMTgzODA1IgyfP%2Bt1lRQXEfEGqLMq3AM3BBhbFs18gJe%2BauLoEg7VRXNjX8Pcj0RYkN8zGEzAit3PPaZahpDaSDX8Jbl%2B8zFexzsP3ZltccfgaH8OjlcboHRFz8mZS5lPc13s4mSHNPs0dT0k9qXp5zGgCt0alyI6E96k8QMCqwyqP5cp1fJUe9fcWXIy5W3Bo5yp1IgilYGgp665WnXc7ltZUxcrFn8vcg%2FLjfNTfAYPuSj4e8VejyiOYfdLCv%2FlW23VY%2F0QHzvS47YEjszRiqFzIvyzxJEs8NLv3ncl7yLYAC76p2u154lHpnIGoQf572Av1fjWHuZ3ruMm9443wsM%2FjSTzFAB1HVpjq4VgOP5d8rFz36SbmVGwrk9TS5cebr%2FQJbcnh2eJOlfLcJzvKvqWXkQd%2F7Sx4h1DJu5tYpHs0QRXgTbom09NSsYVKvEqDM8MJ%2BacZBoVzv%2FT2oDiHO73alqXAz3Kde%2FiY%2BqY9%2B7AGFyUyWkz1VgqhJ0TGCeHqkyORIV8ogzUSHKgGHgtap%2B8en%2BF1bnr%2BdBN8TDJy664RrOBa%2FD%2FanWEubjKrztht%2BoNooWbHNE3J6GaGqooEYuvewjFyr2tD20UOkgOqwTwz2RftobdSgQ%2BsXdNy4xHs0BYYF8QBg42O8HEMe1hszKCLTDK07PLBjqkAb1V0jDA9QMAYiSS%2BgV%2BuE41mJooezKVGr3c6H457nU79poVE4cgaClUYYbRPUWpKXP9nmTlE%2BDBrKv691cwED%2FH%2Fsveszovhc3SNRiG6NzKjVMSFpDXU06HFFAiwBdm9%2BtXtCc97DOnxaohPzFKKOnZpdj%2BE6nl0Yhula2GaxiPKDud264%2FTpD9kO4ih0eUpDkEZJLY53TZgCi01bfu%2FTxLhwKU&X-Amz-Signature=1cf69fa172bd2fb72be6ad6a4ef353f3f956d93ad26ebc26d22427205c3b3643&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OQNQFUF%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJ2VWpfGy3thoa0iFaFyYYEf13B3wf4q3bQrmdsnULcQIhAJQMwwpYyJMW72zzingoJaMUImNjLIoxWlv04pA2lb22Kv8DCH8QABoMNjM3NDIzMTgzODA1IgyfP%2Bt1lRQXEfEGqLMq3AM3BBhbFs18gJe%2BauLoEg7VRXNjX8Pcj0RYkN8zGEzAit3PPaZahpDaSDX8Jbl%2B8zFexzsP3ZltccfgaH8OjlcboHRFz8mZS5lPc13s4mSHNPs0dT0k9qXp5zGgCt0alyI6E96k8QMCqwyqP5cp1fJUe9fcWXIy5W3Bo5yp1IgilYGgp665WnXc7ltZUxcrFn8vcg%2FLjfNTfAYPuSj4e8VejyiOYfdLCv%2FlW23VY%2F0QHzvS47YEjszRiqFzIvyzxJEs8NLv3ncl7yLYAC76p2u154lHpnIGoQf572Av1fjWHuZ3ruMm9443wsM%2FjSTzFAB1HVpjq4VgOP5d8rFz36SbmVGwrk9TS5cebr%2FQJbcnh2eJOlfLcJzvKvqWXkQd%2F7Sx4h1DJu5tYpHs0QRXgTbom09NSsYVKvEqDM8MJ%2BacZBoVzv%2FT2oDiHO73alqXAz3Kde%2FiY%2BqY9%2B7AGFyUyWkz1VgqhJ0TGCeHqkyORIV8ogzUSHKgGHgtap%2B8en%2BF1bnr%2BdBN8TDJy664RrOBa%2FD%2FanWEubjKrztht%2BoNooWbHNE3J6GaGqooEYuvewjFyr2tD20UOkgOqwTwz2RftobdSgQ%2BsXdNy4xHs0BYYF8QBg42O8HEMe1hszKCLTDK07PLBjqkAb1V0jDA9QMAYiSS%2BgV%2BuE41mJooezKVGr3c6H457nU79poVE4cgaClUYYbRPUWpKXP9nmTlE%2BDBrKv691cwED%2FH%2Fsveszovhc3SNRiG6NzKjVMSFpDXU06HFFAiwBdm9%2BtXtCc97DOnxaohPzFKKOnZpdj%2BE6nl0Yhula2GaxiPKDud264%2FTpD9kO4ih0eUpDkEZJLY53TZgCi01bfu%2FTxLhwKU&X-Amz-Signature=1cf69fa172bd2fb72be6ad6a4ef353f3f956d93ad26ebc26d22427205c3b3643&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LIYGN5Y%2F20260118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260118T160106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCsaJI3uyaiL4buy%2BgdgU1cQw38JpAygZCGGT3t6EaZIQIgHwBwgUmF%2Frpmf9T3i6BSwJ6rqjhmZ%2FAjoGFJ9EGnnukq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDPacfGNvSIBKw%2FVKJircAzRb3afC5BE5FlgWVCsG031foII4l%2F2vPUloHzhswN1Thlh%2B924YsIh75sEHzXcR8SDhxlEXvbuN1L5pra%2BRxec2HYsOJgJ6EWcRJluaHqmn9XL6fwZQ8kkxV7XExLTyWyt92j93FJvWJgbAj7iMRQ8AB9RJvNOV4VIxpVORIslZ8j%2B%2Ff2ad4XIDieSmU5W9RGTs1IbEMiidjyLzVbvhiEGftQ82%2BmWsggNxFyjzE%2FKgMHfk3KhsU9PQ%2FSYtlZ3DztpBAhr8N%2BjY0oPV%2F8wPQktYPsxVZesaR8RMOVsNWSBLSkrAj0D2INetEnRHROy5aL1JStBMoABPKXHI1rKGn4d8OHaJz3uUGT8KpSEONygpsXWrarG1pQAbdXmvVhYVgq7rd7nBN6x1exz43EHsMYAitF4IUVdWAjMK1NsArA%2F6OO86Lx%2BZEGZaVjK74q7CtuGk0S042ndHNcvoi78YnPBIBbuW7Hbu9h5t1107Zm1VnAMqlccc5ov6Y65ycbQfidJOs9GD2xYplaenAvyDin2Qo%2BsK%2FwwFVbIW37%2BdHuOR%2FuNsvWGjAeWY03%2BEswnh8FurIhFD%2BtjAgDyO2jS9Ey3RxQnVHvRlP%2BcPCvkfd33%2FIFW%2BkdsbE5x4qOOdMNHVs8sGOqUB8hFntHSXK1ckIx2etlN0z6LNSZNX%2BB8xtg1AfXO19%2Fph%2FsjKycMJ06ZDmt8s0K6KNaZuyd3qAJXsspAA2xqxUAfVOzi%2FSCYV%2B564AiUEE2p%2FElu0p4QTuEokxuuA1jLdRk%2BEjicUu6qFvsa4UGdg3E30AvmTcIR%2BbC4hEJxQf9r0oSBVbaGkLXmLobPNEsRbm00tVxQMJc0BM9VN9tfzrlGEUslI&X-Amz-Signature=a339dcac0860785c6f861c0b3f45e991a5ab844a7d8e33d193ace4dbb7d4779d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

