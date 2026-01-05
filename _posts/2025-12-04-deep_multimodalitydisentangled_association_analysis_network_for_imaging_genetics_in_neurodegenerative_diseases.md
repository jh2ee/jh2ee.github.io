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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBJKKSSX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIESJpbAQx2t3q6Nu%2FtIobO4DhW4eOsrYYkGvPT1o3EOSAiEAvqTRK7e1RFfCkuOEQN4BICCsabTRqxXxzjFjLQ96c4Mq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDKu9mZhxHScZ5C%2BsiircAwzvITMnyS7sMa7W0UZhmHaBwSdwgXSOVQq6JQOgcwvz0risagaxbhZMn%2BXeH9j3n0T9lSG2xZOsKF3PDLxzyq7D7qWDgi5Cc18A4sYDlyf6dJRyKylhjZvKYebY1QnKrFjbNDLf1JcOSNG8OrCivHkj13lvt654ouoY8e7iOI5zzpcvGXSJUhWWhnOdlbKHEQ2LAbUQU6gn9M1voxiOilhPH7G4QdNzkELpnNglZ9%2F0gqBTeEtmPGUrJHg12foc8rT0FHb4syGgopSa1wMf9K9AyTuy4EwoKOLA%2Bx4mMOC%2FiWiREXKgx60h41r%2B03aBZKblK3iTrBq36KOQCwm8f7XqNHVM2M2PyZ7CtHqFBvNqacBnA1k0S0bsEHS7KCBGzhehMRqHMThqQe6RwhYXzSIWyQ9s%2Bejndvy21WLu51lBlEhQDxmD2hXCPgHYxOGtLXQGBKM%2BzgYDYaOTgvdhmMgcDjUlhl7MmBfZKW7ZRLfptHcuqNkITWn8QJGtVaj8uRyAH84GFTEzYB9Zo2IqkAGlytg8ZQds9Sku%2BC%2BwxvKpWa0zxY4IliGo9H951mSE2Ql58FsB5IOMaJCyjnFRAFPnX%2Be8pcyEbagOi2GOx0QEAoD5fZEY2l8jnqvuMOLh8MoGOqUBsWyE32138wtN%2FeucsnlUf2QNi904DLx1Op2%2FfBQsn4leyUMI2tbW%2F9Qb1cehlqtIzCGWXu54zfIbkHEV%2BxDZPfkXtcOMDuTWD%2Botf6eMFTaKfyxCv5GCXr77kx00fF99LwQdFQjYkWZGtLJbfrAEn%2FKTExGjTnTXjnBXfB16RXyVIYyQgmQ8cijWbPZ4qp4r48st%2BONsdnzlxOqY5UGAbBWzoaq7&X-Amz-Signature=89c566fca415c4c6ea1fb9091894e830bbf66db286a0ac874e8c9225191a3ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBJKKSSX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIESJpbAQx2t3q6Nu%2FtIobO4DhW4eOsrYYkGvPT1o3EOSAiEAvqTRK7e1RFfCkuOEQN4BICCsabTRqxXxzjFjLQ96c4Mq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDKu9mZhxHScZ5C%2BsiircAwzvITMnyS7sMa7W0UZhmHaBwSdwgXSOVQq6JQOgcwvz0risagaxbhZMn%2BXeH9j3n0T9lSG2xZOsKF3PDLxzyq7D7qWDgi5Cc18A4sYDlyf6dJRyKylhjZvKYebY1QnKrFjbNDLf1JcOSNG8OrCivHkj13lvt654ouoY8e7iOI5zzpcvGXSJUhWWhnOdlbKHEQ2LAbUQU6gn9M1voxiOilhPH7G4QdNzkELpnNglZ9%2F0gqBTeEtmPGUrJHg12foc8rT0FHb4syGgopSa1wMf9K9AyTuy4EwoKOLA%2Bx4mMOC%2FiWiREXKgx60h41r%2B03aBZKblK3iTrBq36KOQCwm8f7XqNHVM2M2PyZ7CtHqFBvNqacBnA1k0S0bsEHS7KCBGzhehMRqHMThqQe6RwhYXzSIWyQ9s%2Bejndvy21WLu51lBlEhQDxmD2hXCPgHYxOGtLXQGBKM%2BzgYDYaOTgvdhmMgcDjUlhl7MmBfZKW7ZRLfptHcuqNkITWn8QJGtVaj8uRyAH84GFTEzYB9Zo2IqkAGlytg8ZQds9Sku%2BC%2BwxvKpWa0zxY4IliGo9H951mSE2Ql58FsB5IOMaJCyjnFRAFPnX%2Be8pcyEbagOi2GOx0QEAoD5fZEY2l8jnqvuMOLh8MoGOqUBsWyE32138wtN%2FeucsnlUf2QNi904DLx1Op2%2FfBQsn4leyUMI2tbW%2F9Qb1cehlqtIzCGWXu54zfIbkHEV%2BxDZPfkXtcOMDuTWD%2Botf6eMFTaKfyxCv5GCXr77kx00fF99LwQdFQjYkWZGtLJbfrAEn%2FKTExGjTnTXjnBXfB16RXyVIYyQgmQ8cijWbPZ4qp4r48st%2BONsdnzlxOqY5UGAbBWzoaq7&X-Amz-Signature=89c566fca415c4c6ea1fb9091894e830bbf66db286a0ac874e8c9225191a3ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MFNWHVU%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFRu6OAfx6NmCttrgv0h%2BoPMiy9d7x86a38FiM3rLjmTAiA9jIzW%2BJPDKj1O%2FrGsKx2b%2F9dpOzjuApriWFDgAwoyvyr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMBFy7Ym%2FXjOj6lCPtKtwDBwv9eSIPFUdF2xMo49CaR4oFWTD0Ojv8MmA5iwuUSlkwNs%2BKkGPMRVpybLrIqgwHh9CJb%2FwBIwSBmK2lXEzhbe2oc9VjL0u3BUHVNA0PWbzE3%2BkrimHEFW5y44TMTCYPTkxYTH96BQMf%2FMoVQwYnv%2B31JzUJ5b9kuaqYtuhVTY%2F6We3DMGxXQjFIY9obfBlJTAAPNDBoFiUEGb%2Bb6rxTNvYd6OPmrwW2H5r4%2F2A3SqY%2F2PKIecyZaATxEd5XmH%2FWDtJGkOIjHmF5V6gT6272xJrfn7s%2BJ06cVE6tiMK14YNNAXqyMs7PgD5SEiIf8MPlvwMvVJPywKi64lV4hDCDSrXBPob2iwYxg0ldtfdEvVcsznz9ylm1jovCthJLB%2BBkdnP5o6GUykcoNBZzvEEgsu1DilYK0KP8K%2FI2rEDdZFplX6B7pOVWmhUk9WA61KQJCFO%2BMDDHSixJIyVr9%2FDhAquMlC8xXmQ%2BH4Q0HduiD3xW7i6Wfo7bCBiY%2BwCmYvKToVAeZizA1eKlguVXzB6eghCdYtJLtvFEiPZSyeVhu5UBswqFJn%2FDtbve%2B1tOSFjgh3WO3LROEP4RJ2YdQ4ggfKemf%2F1PRyJq5DottktngO86927i%2FqDXoQLHJoQwg%2BHwygY6pgE7ztrnnkEVpCsFsQbW775ApbUNtsTb6MF8qsgSJwcRDXRGWF%2FYqJfrTLouxtSyybdX8GxrEmTaszpxNwrSP2YWo8szvtZ9Uiv0PzQIt4RtLNqdgULm1cpColFDGVO8DbPltHTf3SG51RqwfS3AX%2FCTkB350tLKVJvViILZT26oH3VKjXaT6HmbpGJtp2BOOoZehu534xA2LRLtUmUT76v3cXVj5xef&X-Amz-Signature=802282a83e392761c6e0a8e5721ba1f3ab9b86556ad15d341e68837425abed06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DTYML3G%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBklGuEYJLJSVbyH%2FOwml%2BOkGcX70FAglYZBpPWjKvbqAiBl0C%2BgUc8%2Fh0KZOpPx7Qyi9vBsKMuHWmc%2FGj%2BC1D8Q4ir%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMyYeu1BU0U4MTzKSFKtwDKbugl5VnQta2bjZnR7tvyZyT3nsZ8vztz%2FYFQ8p5gYZ7c2toEwZcgtX%2BkaikyZy9hZhd45cDAE9nuIVDbRRBpKg55RdQTmRSbDSX6DPfeoTZQk9caqdgPQIO%2BSGUnBC96yH5dz%2BR22CXKY42ZJW8eV5lZQ3GwUgSVykFSfBiIR%2FtiSxwmAzvLd9WFSDBFOyBATm38bL6riCJr%2BP1ajNNRKjCHEncZtJvI1bfAT3hs0zzV6Tci%2FR91glyvzsSSY13ejPhJjrMMfeRouP9RkVm98EMY8XES%2FKI%2FlJEc1QOZFMXu%2F4o1AeFiGBVBigc6SlcOgFCLYU%2FCmAo3LoTPYjiv216%2Fith%2F8XTMTNZp2iTAb%2Fe3xbc%2BQbAWJYmRhxI1RbqZn7ib1o5%2FpOBqI7yu222in9XbUM05LnmWf3aN5j3621bkcJlyVBiLq3oUczzhfPgVct6rbPtfeH1gWReeCuP9TtxX8942h1nYY%2FLZKLAQuPSAMxuTosqk%2BYIrMr%2Fod6z%2Fyz2KwkUkfNCXbgjGvMl8Z2FEIrr0LoQ2tvZc1hdAqzARLL8PIZ2jBJasoFCTMm2jN80tloMyxyURGCaAAt2Z7D9Uau9h89vrjH6bMq2nynyOMQafN1pOsN5mAcwquHwygY6pgF3C%2B9LZsorClyQ01Mudaw8DovEKpEUa4KatM7d7WaDBCWsFCfiK1kHu7GIPh03zoyS7B6ezxKp6QELWTm2Jmc%2Fq1f2ISNDWMueWSN8o1qdqVDvupox58CGfxSDvDp3xSv57hcAEmyTqGcr9SxY2mo7Q9sUWQtQkRRgJkKbBGINoblOH06MPV34fK%2BItk%2BNaz%2Bjfxrprdxkq%2FyvxpNTgMzFwgzryXe1&X-Amz-Signature=14055037d25ba88b00fd82fd23569124823ff4edadfeb2c2b7d18e795a0fd5b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DTYML3G%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBklGuEYJLJSVbyH%2FOwml%2BOkGcX70FAglYZBpPWjKvbqAiBl0C%2BgUc8%2Fh0KZOpPx7Qyi9vBsKMuHWmc%2FGj%2BC1D8Q4ir%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMyYeu1BU0U4MTzKSFKtwDKbugl5VnQta2bjZnR7tvyZyT3nsZ8vztz%2FYFQ8p5gYZ7c2toEwZcgtX%2BkaikyZy9hZhd45cDAE9nuIVDbRRBpKg55RdQTmRSbDSX6DPfeoTZQk9caqdgPQIO%2BSGUnBC96yH5dz%2BR22CXKY42ZJW8eV5lZQ3GwUgSVykFSfBiIR%2FtiSxwmAzvLd9WFSDBFOyBATm38bL6riCJr%2BP1ajNNRKjCHEncZtJvI1bfAT3hs0zzV6Tci%2FR91glyvzsSSY13ejPhJjrMMfeRouP9RkVm98EMY8XES%2FKI%2FlJEc1QOZFMXu%2F4o1AeFiGBVBigc6SlcOgFCLYU%2FCmAo3LoTPYjiv216%2Fith%2F8XTMTNZp2iTAb%2Fe3xbc%2BQbAWJYmRhxI1RbqZn7ib1o5%2FpOBqI7yu222in9XbUM05LnmWf3aN5j3621bkcJlyVBiLq3oUczzhfPgVct6rbPtfeH1gWReeCuP9TtxX8942h1nYY%2FLZKLAQuPSAMxuTosqk%2BYIrMr%2Fod6z%2Fyz2KwkUkfNCXbgjGvMl8Z2FEIrr0LoQ2tvZc1hdAqzARLL8PIZ2jBJasoFCTMm2jN80tloMyxyURGCaAAt2Z7D9Uau9h89vrjH6bMq2nynyOMQafN1pOsN5mAcwquHwygY6pgF3C%2B9LZsorClyQ01Mudaw8DovEKpEUa4KatM7d7WaDBCWsFCfiK1kHu7GIPh03zoyS7B6ezxKp6QELWTm2Jmc%2Fq1f2ISNDWMueWSN8o1qdqVDvupox58CGfxSDvDp3xSv57hcAEmyTqGcr9SxY2mo7Q9sUWQtQkRRgJkKbBGINoblOH06MPV34fK%2BItk%2BNaz%2Bjfxrprdxkq%2FyvxpNTgMzFwgzryXe1&X-Amz-Signature=cbb8dd6fb7e6e4ea08e16ce2b3712a04f4cb0cc44ff9a5827e015fbb3b638c90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXU4WQWA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH82CDv5WYgbEdN1SFLFfIploTGsHVlOgcMiO1JeY54%2FAiAtBhHfiPiyq0lE6CDUIIpEoig%2FfpJSFKvtVvV0Q1kvCCr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMs1vlMQMk4hyE9kgXKtwDF7Oi6x%2Br3UcXUnBsyoXRJWe5sqgLlGChmdtag3vkGAbcSN8yOkLRLIrZ7fzTrue6tq5AO7iEkSIUXtShgaUlZqiUeJqEbtmoJ89I6b00AxuvgwptUq1EAbWUR9mza7tHP9T5BckoLgNWsC6BJrBJad%2ByRhpxFtGSEoJBerVR5Y6j7VlJdtOQ%2FbAvKjPoHbXd%2FQOJjNflTsKlf6uYWkdG2HXn1i6d0kRSHSe%2B8U63JHy2%2BufMPzYL2m7bH713y5UV0AxOHZAj2xoG0pXdCiWTbnuZGy7ZAKJRAmF1HcJewmelcn7TVxCsqYVF3rB2jbt2kWIYdQW7GOV0oPBaWmeQAi9C%2FsCm4rnDml0quvBN9mzkd9DE83O8ifSSjMotaAiiGhi%2BgqSu5shxonNa0I9pArSb66IOEAr5Q0q8E2%2FIaZuueMkxSuHm6bhH%2BBs9tmgaKDRPG3lKpwxt65n7xUYLM4CBC1mgSiwRudophibfJUBJyUPb1wIDm%2BcRvI3w42KFdhvqq%2Bku%2BA2AkzHZW60ktD3GFclF%2B10GBhCZpJHQkoL29Uhuo8DkYxJ1NuBqy6trPBJwpiz9ttEOSfDO4hwfvJoI5UOmTYgLsp3MT0hq5X9%2BfmrjJmkK3%2FhrN9AwueHwygY6pgGfoFITQqYGRu%2BbCdqr2AB3qVMg%2FyPmwpDaHBXmmRlg%2FjIhzv7lmOLu6HYjXxVHIt13depR2CMp91b%2B7Na1S9PmEz5jhmbDUvoAREUKDe7S%2FKMt7G3JKUHGvd8OsdQ78%2FdBTmvwXLkWpf9meiqG6SnQyc4ivmYgo%2F5q5ipIk5HyXVRot444FhxIstRm4YgWq8WqYtXJDJ%2By1GGIrBmG4nAEoKAMzFGS&X-Amz-Signature=68dbc3dce32f530a8ea441af1ee877048d276c7be41eba7bc91dd63696e01925&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRTIN7SH%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCgbjyJoGx55clUixqgdRy5f9fhGvkBFkiyM4o5mq1vbAIhAIoJKFT6fq%2BLmGuefa4%2B8MwYFEkwB2O2tp3ftFxGCoNpKv8DCE8QABoMNjM3NDIzMTgzODA1IgywdDu89x1SxWpcEKwq3ANtCwvc1zFqmLFFwJ3SaDwXiUptsR2ethO23ENrgoxcgv5fkCuD3LqQ5YAyZX4DBgY3uThnTcSRPk%2BDznmrUcuTLBqAar19CpncUTt2ZQJKZHfIjiN4ms35tWjjZIaS4Mob%2F5pNkaJxiW24VsfNcd%2FCp50TuKUuN8vYC3Ul%2BnYLOBjFarzpgen4E8MYcD%2BpxJMLFE8Mj%2FYIpxaMsUD613%2BeklvzbKQwpDjPMg8G64Jj93xLaqNoYyMLE2KnCaMuTwqlGTJ6QY1uOBM0AoNCBBOafF1D9DJ29Pag%2Foa28gP2EUdlIHhduCH3rDYytyrrHY7U3UotH%2BCjFqgoATsveNEYeAIe1I1MZvEDfClNjx8zYSJR7LJFruza0%2F%2FlzqsqtSFJhteHQ2QjNsk2GoAxbFm8cGP7aQS%2F2xDf85lNC7uXdF4Nz%2Ff5Z5o5B%2BAG88%2FSPnsIDyX28rKT7X0dKIgTDWDWHlkU247LAUdHHOJl%2BcZ3mBctb4Mq3G5TYn14JYRuzIWT%2BgHd8p%2FlPKzu%2FuBl3Ky3EkJHBSKc6djtBxMgRaPg5IEWQIoAQBLv8bcJVoh17GAMbGUP7hCGdlpfzEaq%2B%2F9m3IUiSCUd03Tlb3iZGfNO%2BzJuy4aMZzIxu63TJjCq4fDKBjqkAV2AEIg4Wk226URfqRNAXRDRc03SInq7jcTpERR18BYOjQ9UbVKKC7vbxIg4s0ubOXqul7g35WUjxIC5nmE%2F45Fc5QvrU4D6KxrqchjWIFgSYmmqlDymYw7dxK5e8ICidWGriJnev1595d6%2BVunpUvIZu5fI5LvVHXQYEVM%2BIkOYSeAjCim%2FqdpvAqiXk7GeUL%2FMHzs%2B9nm29eYKEqT%2B4UQJ3l1%2B&X-Amz-Signature=be16032ad4348201fe473f8f7a3643c23a6dbe47f5367372b502d4633a59bd0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y72MKWXS%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3O5lmeMSEDQco4HatLGsemMxfuaEOylt%2BUz%2FqiJyLQQIgVQ6AUAWCzantCgnAHlmRo2SBwEXs08Sg95qiB4SnjCQq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDBJ76QYyeDuC3tQvdSrcA9YgHUw3atgb75Jy5dHS01KYHs80FTOz4Dp7gBgXr12OOrHZHzZD%2Bos%2FD5ghgbogRqPTKXq1v%2Bmv9Q9rCURJHrgNhpTtJOQhtSuOL6mDVvqO4Z3pluOqC844q%2FA84aXnyMNrMKuX4GF2ZLS%2FXsL6O%2BmaElRD7dDJY3UHHc5Ngj0zZRuRqgUX46T%2FQmT3%2Fq%2BZSpHpqhQ6rECDNTrBfLpOvWhaW%2F5GCCb1sKiEeHviaQb71RI2bBkhKVW1x9p7%2B4UB1WjjCD8L%2B%2FbTw5vZZlWYSE3loMCM%2Fmg1whQyR1pW0%2FKOtGwJrM1Kn1bUdemwp%2FO%2BcOJqKAnlq7TXNVERqfRKqtO9jUZnGZ7jhpRtZjkJBd3%2BxmYnw3LFK56oiJOc9v95%2BHx9lqZmlWAGr1lvpvm96aNjpDXbdellP4oVwN%2BDIzD%2BQyBEqH4Lh%2BwpTKim6HsgjC2IQ5mxuA3EyBh3Nju88lCnkyN5uO7a17rbIDIfSj%2BbHWSFO7xXImSndL20LB5K9zjwR1xT4axEBYDX6JgUkax6LHElrtLGAexhNZWeGmzbzhRAF0ED%2Bw7pVhyAr2xP2TrLw0%2BEe5uPunpG198I5ax5gog%2BffD0RG9bAT0IN%2F%2BPLbjbM3ExJtJPiFvtMM3h8MoGOqUBvhjn6%2Fh%2BIne30xgbW4aZldh%2Fef8SkdyC5wQhMurjADDceVu7R6joZIGc6QUH0BQR8xbEIzn7QpxHwu%2FamjZrDL3ESQ%2FB8rJaDrwnQOTKMKXDniQulm%2ByYhA%2FE7JG5sNqSXV227FJyUhqQ73ILzFMZGz3aAK7Cd8A3dFXqNQ5bUZ1tJ5IjOgBuXK2TTeodYZDLn6EXBN9i%2BifGgR9%2BwAN4G49Zn0X&X-Amz-Signature=ceed88bb5478d1e86e33c947adb46120b6bb4bd80cf01e8bc0570b0cdd0d3d7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC7BW6ST%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEma%2FvjSpYFNC3kraSdnWcFOKEmr8KUtHWLNiAuhBmajAiB1ar1XLlxeDZQA7xyfpBqnWTq6SKdRfJ9NYZMTY4c6zSr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIM7OFxMQT%2BcvMDnPrEKtwDLi7b51uC8EN5w1L3hrRvd5ynskemeJy1zMEf%2F7AHRODIuV%2BV4pOjGfFzJYQJkTNXlBrJQDasu%2Fnhb8ZE4UIAr9HpUdYewCts22oKAMH48ywVV4ZD6hNs%2Fa%2FB2oHcMa3kmca%2BzkF1K8cQMDh984sLv2V6UuLyGadDLemwJGwD%2FkAtodf0Oy0maldXSke3H6YoO87dzPDvKhshr2rkxa0cmWfUqabz%2B%2FR6hm12vWIniUH%2BYxM9Ht2cmDrS0wR2EXkM3k9hp7xcLIFAsEah9b%2BLVOWDUbxnStgoIsXAEn1EeEWZVuwQWofTuVK7qtUwY7iXeFH1jhL6pl%2BMPJ2wJXojVUldjDNA1FGjrTo0SPHXgDm4lAofz915x0QLyfUr8dnWKd5g0Fffp8g6kYK2W8RKrXn96lnqlxzjpKlA4EB93LjxURyhGq20Stull%2FVyGD89KWkMK99O6HaWDL7jCDLUuAFpO1q2fsZSghB428HMCrd2iA4bIDCONid%2Fdlmr6DAnvLbLFri4Vt8tLiwfvwHI7Bf0jT22XNeiC7M43B7bNPdKthAgSnZeEgG3uYEq1rUvy0Ea6Ah274vpUnxDYBp%2Fs22kqADvES33RjzcLsJq0kyFMIBPJNfxFnQboYkwtuHwygY6pgHIvdiBVCV7J%2F%2FOwVzB%2BOlcoq6jiXBfZ7uch0JKKhj9Ic6DLtzNgLjH0AeWevxTdhcyo%2Ft9AG7dWjvgNJQGVCtS1vpg75JGE8fLrncchczBVU6oGNjThSITb9dHlDFjDMrTQXq6dSc%2FcOfI0s5LOoqqKDhigT0kdTipmq4gJSrjG0f%2BJFEMRFFdTHGCbExX2Shi9%2Bi6ySVLBi5zjs3krthNTOIS1X1w&X-Amz-Signature=19c6010d0599f790c043818af85a53be24d474e9779d3a3f1a1f9fd1b6eb994e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC7BW6ST%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEma%2FvjSpYFNC3kraSdnWcFOKEmr8KUtHWLNiAuhBmajAiB1ar1XLlxeDZQA7xyfpBqnWTq6SKdRfJ9NYZMTY4c6zSr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIM7OFxMQT%2BcvMDnPrEKtwDLi7b51uC8EN5w1L3hrRvd5ynskemeJy1zMEf%2F7AHRODIuV%2BV4pOjGfFzJYQJkTNXlBrJQDasu%2Fnhb8ZE4UIAr9HpUdYewCts22oKAMH48ywVV4ZD6hNs%2Fa%2FB2oHcMa3kmca%2BzkF1K8cQMDh984sLv2V6UuLyGadDLemwJGwD%2FkAtodf0Oy0maldXSke3H6YoO87dzPDvKhshr2rkxa0cmWfUqabz%2B%2FR6hm12vWIniUH%2BYxM9Ht2cmDrS0wR2EXkM3k9hp7xcLIFAsEah9b%2BLVOWDUbxnStgoIsXAEn1EeEWZVuwQWofTuVK7qtUwY7iXeFH1jhL6pl%2BMPJ2wJXojVUldjDNA1FGjrTo0SPHXgDm4lAofz915x0QLyfUr8dnWKd5g0Fffp8g6kYK2W8RKrXn96lnqlxzjpKlA4EB93LjxURyhGq20Stull%2FVyGD89KWkMK99O6HaWDL7jCDLUuAFpO1q2fsZSghB428HMCrd2iA4bIDCONid%2Fdlmr6DAnvLbLFri4Vt8tLiwfvwHI7Bf0jT22XNeiC7M43B7bNPdKthAgSnZeEgG3uYEq1rUvy0Ea6Ah274vpUnxDYBp%2Fs22kqADvES33RjzcLsJq0kyFMIBPJNfxFnQboYkwtuHwygY6pgHIvdiBVCV7J%2F%2FOwVzB%2BOlcoq6jiXBfZ7uch0JKKhj9Ic6DLtzNgLjH0AeWevxTdhcyo%2Ft9AG7dWjvgNJQGVCtS1vpg75JGE8fLrncchczBVU6oGNjThSITb9dHlDFjDMrTQXq6dSc%2FcOfI0s5LOoqqKDhigT0kdTipmq4gJSrjG0f%2BJFEMRFFdTHGCbExX2Shi9%2Bi6ySVLBi5zjs3krthNTOIS1X1w&X-Amz-Signature=a1e63e588264ab17e531fa5394c050b1ba705e250d72e3b29652f3ed90972eaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFU34A7Z%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9%2Bk8om0PKRAQUkj%2BUltJvLc9WKen0Ji%2BnCKavnGIjYgIhAJ%2FyYK6%2BPDKTb4z0KvPn%2B2u0mq3h9836GSff26oFTYNFKv8DCE8QABoMNjM3NDIzMTgzODA1IgzIir%2BXAMswserlceUq3AOte6N%2BLmbw%2FsDTNcQlY%2BhzXTIs2UyqGmYVG1lfUm3PvU1PcdWQpNCeciRXFnFdCQYrZWXFdne%2BPR2iYl22k8F9F17GAAol%2FHKPPDBmufYSE%2BsLdYUvdSQxKFLTeYNwKHc9KhkKM8uA9%2BC7NAZz8xUvv7u3KdwNinEVprHg1uN5plLbCjqy12TRDvrkHGYXBavH6KVO7LntezN5eun%2ByIecgn5vhyaDr1RhZQUDg6Bn9RncELlrcXfGwffbg28zD3nA06K%2Bh2z0WUo3liWGVj%2FYz5a0ziiZx6g2J0nRBtq%2F51enS%2FyVcWpzVFUafNvZmDkxWgEPaf%2Bn02hWoUR9TRfh9W0Gm91hIsS1WdBFc%2FIdGb6vmqPk4L8AJV3zNAHoXmR8mxrXZgPig518WfoNYxO2W%2F76LvDGjYtaYCGEMki10ZFNuvi%2Bn%2FtWeVOE%2BWL%2FMJ7vPvsK%2BlZqnJzhDmh4wgkVWFScx6pYW1Tpymx5xXj3v4q%2BL4G8vLQKXnB41E10VbMx76%2FBge5G2AN7l7iVZ%2BcXifZDROkVXOTHpWQW%2BpPCX2uzRKZg75jWwle3TU4v4fQ2MHiGRUSFC9FjtviQe6c%2FUShC%2B38L9x4Z18SbuDlVGaAwFSXp03yssDBmTDC54fDKBjqkAY%2FXKUYI1t20iMYfAJuRJcJCBc8riTJPB4Ay5hrOcMPrh9qEYUZAxky62yXRoWsBSfCQ3BtWdFL4E3aLHeYy49IiqjQsFqQGsWXxQdFFCirbtL54XpiLBEJ0qO9V78bJAfuBBjvKBq182F%2Ba66NMrLOoSEePpVDzoXZIzcZB9Z1WwIxgWVuhV1N4pNSRdSJ3AvW%2BDzKcYmpgTgdK4E9pCOP9hVIg&X-Amz-Signature=271f863894acf33deca5a80c185f546861ce575e88d7e2e6d09d04c7272b08f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P3PONY6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEgqlZx%2BG70hA9XgX69L5k9jfO8dv23b3ucsgOr1yXSwIhAIpRnfZpw4waL586IXiYgI8sucv2GMqMT6vGYfHBJX1kKv8DCE8QABoMNjM3NDIzMTgzODA1IgyvUzmS2L71W8mPDlIq3AMjown%2FmYPL5kTIjknOOBTLT87umC1dYRpurH9WFIZNZGbjzlbNk%2B%2Fjx4pUt1%2F5MY9jlgmQDO%2BPPAMwOPdFAwp0fG39lh9UqTRHjqmSakAU7jr24IegR%2BNd%2FZTL6Ibhs0FNIA0a7U7Gy1Ol%2FzB0ZBzdMSCKhcuYPnM%2FYjVVHiKXq2xbWF3ZaJULmGNLOhfvcNYyqnaCjlfiJFwnqu7Ku8RzepRscrQ8SuolvS4kXmeKQH7V2zOwVz4urnj3ke9NjiR1YKfHDvM5LTUH4QoFmq2yDCflYQsi8%2Fc3z1zJT%2BxfLsZMG%2FddOgnwRDPia4vGtmQ5XoQbxWQBWFOAPaQVb3SX4TEvuq6Zu0i6L%2FAU2ziGbjXi8SI7gOB9t776GM%2BnuBabhccP76B9%2FXJLJfRjKS40hBawOLx%2FhQZfDHyTWcTGbbYLfUVLCj7%2F1rvrPsVqvPvDx9nj%2FKKuEd09J2hveYaDle8%2BGzgIN%2FU5C1iXrTZFc0ToWVFHJVJzcfDcTKLMG8cnfQOzq3nd8%2BAh2G94%2FGg197nR7vGZYIRsFv1AkDumUSRx5jq8rSksWRMuUlOXmeDMofXYZRbKgnOGcfz9ZVMh8UEPbwGtFARCSMxXhIo1jCZDPf7PJIrTitqzQjDm4PDKBjqkAQKErP3ajdw9t9x2k2Fb4bSXXKbjtp7vQulG1EZoybifyusrUb4Kzd4yOoo06HOt%2FqXLwCM4GbsWRhpAqkgXoj8GDJQbqGVjMUD7CxJOgTKs0flO2STrYmOv1uWJWktmEraLZZ5kWGyKoDAn%2FcgCiBmxUNZzHg8Ixkzm9ibyY58FStdLZ1Jze38IZ6j19Nff7uwZqQA0W54XNDPC%2F340rUkOhGCf&X-Amz-Signature=e9f0ca2648362496455fe5c762d2cf8e409dd8dbfac2ada3a3b70757c8a3e58e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P3PONY6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEgqlZx%2BG70hA9XgX69L5k9jfO8dv23b3ucsgOr1yXSwIhAIpRnfZpw4waL586IXiYgI8sucv2GMqMT6vGYfHBJX1kKv8DCE8QABoMNjM3NDIzMTgzODA1IgyvUzmS2L71W8mPDlIq3AMjown%2FmYPL5kTIjknOOBTLT87umC1dYRpurH9WFIZNZGbjzlbNk%2B%2Fjx4pUt1%2F5MY9jlgmQDO%2BPPAMwOPdFAwp0fG39lh9UqTRHjqmSakAU7jr24IegR%2BNd%2FZTL6Ibhs0FNIA0a7U7Gy1Ol%2FzB0ZBzdMSCKhcuYPnM%2FYjVVHiKXq2xbWF3ZaJULmGNLOhfvcNYyqnaCjlfiJFwnqu7Ku8RzepRscrQ8SuolvS4kXmeKQH7V2zOwVz4urnj3ke9NjiR1YKfHDvM5LTUH4QoFmq2yDCflYQsi8%2Fc3z1zJT%2BxfLsZMG%2FddOgnwRDPia4vGtmQ5XoQbxWQBWFOAPaQVb3SX4TEvuq6Zu0i6L%2FAU2ziGbjXi8SI7gOB9t776GM%2BnuBabhccP76B9%2FXJLJfRjKS40hBawOLx%2FhQZfDHyTWcTGbbYLfUVLCj7%2F1rvrPsVqvPvDx9nj%2FKKuEd09J2hveYaDle8%2BGzgIN%2FU5C1iXrTZFc0ToWVFHJVJzcfDcTKLMG8cnfQOzq3nd8%2BAh2G94%2FGg197nR7vGZYIRsFv1AkDumUSRx5jq8rSksWRMuUlOXmeDMofXYZRbKgnOGcfz9ZVMh8UEPbwGtFARCSMxXhIo1jCZDPf7PJIrTitqzQjDm4PDKBjqkAQKErP3ajdw9t9x2k2Fb4bSXXKbjtp7vQulG1EZoybifyusrUb4Kzd4yOoo06HOt%2FqXLwCM4GbsWRhpAqkgXoj8GDJQbqGVjMUD7CxJOgTKs0flO2STrYmOv1uWJWktmEraLZZ5kWGyKoDAn%2FcgCiBmxUNZzHg8Ixkzm9ibyY58FStdLZ1Jze38IZ6j19Nff7uwZqQA0W54XNDPC%2F340rUkOhGCf&X-Amz-Signature=e9f0ca2648362496455fe5c762d2cf8e409dd8dbfac2ada3a3b70757c8a3e58e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CLBJ2YR%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB1LsHJzca0HplWL1EsJmWr2LWF9IrK4yj6%2ByN4Hp8hXAiAHp7%2FLGIykFPcPAYnCRjIk4GOAh8ecu58NMwqO2LYilSr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMGDYTVDA8HGld4lT0KtwDnfll%2FUW2fehAn4RIA4NyOyjQyCCKVrBVZxHhzVs8gFfA1KS2FhQOPnk4PR7%2BUTdbn3D7nhRYyGQMRpqZEAWGF0pGt2iPIB1j3o62MMLZMTCswwyb%2BJ3XLfL%2BhGvFbivGf0%2FYQIefpN2Q5xbzBQlfECHPsboY9MOv0MZGsp4akSRfunWHhDXvIzu5f1LFKjy1862clxIuypJ8FEIxWUJFkAgx8yiLN5GShENKI6TjeMQ1CW2J%2FM%2BE5AJNLK8F7aYHSBsk9QrNWPIUWY7dwp66%2BINysRO%2FUq1%2B2Z8jYHAjnI%2FQFGfnupxl1jwEFMzbQFdnDSR1go58hwftY4mtU%2BNn3tAeS%2FzRe0NVFhgpiWIjZJBf%2BfojtgQkCvq9HgjYvZrtQqFAlq8WYVxRe1vdRqmpqfobUF0OWLb61QKZ1t8qaTm6TWLNuKdbb6B18UPR3ds60WwGoJdARsVm7GxlHWpkmiR%2BP7pCgPa4hN5aUf%2FnkuM3XkzjIjs%2Fr5Jo6oMvpDcN8Ka%2BcHDXFaJpoChZIpRAqA0%2FgNN5ngYuT17aaI1mgB1%2B5R9vFEgNTdaUjBp93s6HBtFerwU7%2BOxof0mT4RPrdmpv4Jx%2FRAII3JNCyjCgvcUaXp5hCOs1nEta54kwqOHwygY6pgHjKHFJW5jiq2oXgWEEGE7KOoJVKAcVHApo1%2Fz%2FHAMMbBFgG%2FhBDs2IOLKOeUE7yba3XKPxKV7nyqv4ArOfB%2BV0Bb90SMN9wxKsjQXJ0cIuzSvagYf1ZN%2F2%2FZOh%2Bkm4HRROvi%2B%2FA3oLxFeox0i0mgvQd8bMgjOVAaIseVtDx2hK1ws5xmgD34uC%2FD1oqZ1AZCNHvdL5WZE8VupyXe2aPKh1vxcjJBn9&X-Amz-Signature=d741a2db4c0ac823cffdd65467285090d8b0cf970f6cb9449970f839f2c2bb50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

