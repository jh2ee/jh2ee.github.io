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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQW6PS4V%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0e6VBqFqBMMiIvl0BgGy1JDeV0ymNo39D4%2Fon4SnGWwIhAIvOQTZzWoTD8bqVY%2BbhlhnVnSIRJWXUJntpBDiNUVdZKv8DCHoQABoMNjM3NDIzMTgzODA1IgxnUU1IcTTzgDRB1H8q3ANaDhyxW1sX3epcj1DBKiJdwv7NcS%2FSizcz%2Frv9vSvgqq%2BCRqxw9k3d23EEHGqbuYYwmeBZUZ14RyZzbPeyRGAa951H61OS37JfKh3oAzrAvNuduzyZjjLbvhfsuBTxDezgP4pCFoFchY4Dxj%2FgrK%2F6elPG%2FypSlyVmL8hkUyitB4hVxR59gqgVkzqVQ2km0w%2FRjJsVMCKDnMRMYoofqxl293gN4NVfDqBPmV715C3wLk%2B1IdQVA2WAFDXPPmj61NReDlzTbS4KSao9qIHlK%2BPHqUrB8pKNENzztbm6e%2FFR2kY8cSArKYz3GC7RU5OOZfwdoboYyNgnW52t3O0Prrc5RYy0d9dxyQlwwCUSkA1WaKnlSKdnC7jci1TSRJoNhHGt8XbJmFLGPEjNmR09bWPEns%2FQ2vDlyeaH%2Fylwm3W5w%2BoxN1i%2FClkD6iaMdDibDcHcLcCXL%2F8kwtSA7bLQKpVxZ7LT9t14597FE1VgEZrKWTZrkHLaB1ZUg10cgtdY4gOekQRyzvuiXNKAn6P5PvPESKa0JygdjMA%2B7mJsj5yo1rELzNmTy9u47hsF6t0ubVaIfTWjysOEk5vcDWoYQ8rWF6ioHLuhHCbH7N4ndY4Mvoa6G%2FuBpwQcQKEx7jCJ5cvNBjqkAaGutdQZssez%2FFZ2%2BomRaO0rTw25LxVondXUcf43xO6xw%2FLfMX1OqJ%2ByjYgwEiucHROaKUQ3HJFQWZaZZhTOfx6hgI7lVk59BRzQyuynHML7vjM%2ByFu4%2BoJ7%2Bs%2BYPKlihmjtwNKYUaUvhWyF39clKH1QBGvqiYZQ0fjCkLjmxCZCW8CCN0Xfw67Qhi9lXnbyehafKsoZX3ymMHONgBHk3mrDbzUS&X-Amz-Signature=c92b6700853f2d0f87d612c293df0a8401b6a9dda1ff9b6d15db45fab79cd755&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQW6PS4V%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0e6VBqFqBMMiIvl0BgGy1JDeV0ymNo39D4%2Fon4SnGWwIhAIvOQTZzWoTD8bqVY%2BbhlhnVnSIRJWXUJntpBDiNUVdZKv8DCHoQABoMNjM3NDIzMTgzODA1IgxnUU1IcTTzgDRB1H8q3ANaDhyxW1sX3epcj1DBKiJdwv7NcS%2FSizcz%2Frv9vSvgqq%2BCRqxw9k3d23EEHGqbuYYwmeBZUZ14RyZzbPeyRGAa951H61OS37JfKh3oAzrAvNuduzyZjjLbvhfsuBTxDezgP4pCFoFchY4Dxj%2FgrK%2F6elPG%2FypSlyVmL8hkUyitB4hVxR59gqgVkzqVQ2km0w%2FRjJsVMCKDnMRMYoofqxl293gN4NVfDqBPmV715C3wLk%2B1IdQVA2WAFDXPPmj61NReDlzTbS4KSao9qIHlK%2BPHqUrB8pKNENzztbm6e%2FFR2kY8cSArKYz3GC7RU5OOZfwdoboYyNgnW52t3O0Prrc5RYy0d9dxyQlwwCUSkA1WaKnlSKdnC7jci1TSRJoNhHGt8XbJmFLGPEjNmR09bWPEns%2FQ2vDlyeaH%2Fylwm3W5w%2BoxN1i%2FClkD6iaMdDibDcHcLcCXL%2F8kwtSA7bLQKpVxZ7LT9t14597FE1VgEZrKWTZrkHLaB1ZUg10cgtdY4gOekQRyzvuiXNKAn6P5PvPESKa0JygdjMA%2B7mJsj5yo1rELzNmTy9u47hsF6t0ubVaIfTWjysOEk5vcDWoYQ8rWF6ioHLuhHCbH7N4ndY4Mvoa6G%2FuBpwQcQKEx7jCJ5cvNBjqkAaGutdQZssez%2FFZ2%2BomRaO0rTw25LxVondXUcf43xO6xw%2FLfMX1OqJ%2ByjYgwEiucHROaKUQ3HJFQWZaZZhTOfx6hgI7lVk59BRzQyuynHML7vjM%2ByFu4%2BoJ7%2Bs%2BYPKlihmjtwNKYUaUvhWyF39clKH1QBGvqiYZQ0fjCkLjmxCZCW8CCN0Xfw67Qhi9lXnbyehafKsoZX3ymMHONgBHk3mrDbzUS&X-Amz-Signature=c92b6700853f2d0f87d612c293df0a8401b6a9dda1ff9b6d15db45fab79cd755&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XD3VZLL4%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAWqp8xxlKMv3xvmuQYSvuWV0K3ZdC1msHuYY03p0RLoAiEA4vGOkb%2BoJmlvWVELeXCq5wR81kN4vYWN8nYaA6CTSrcq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDA3Xf58jxDCPG3lapyrcAyJD89mPlk60%2F2CWIW5scq%2FVgCPR5Xsg6g%2BZG9OkWhCtlXPCw%2FsQ32sj8f8mcKSYpfbqCpj0BjI1jBnOlKm3gFILwX7BEPQtmOJhOJabGbQli0HRhKRfdna%2FjMTURp7eibvQkujYUvzhMD9BPzd69F8dBk0zwgQd9eBZQ4lH3wdIqSKUfjVJp%2FY5n7fclolJ91s0B06hlc7UEvaOQ72M%2B%2B75tke2F1xvkfDJCWwn0d%2FcJQ%2BLqf3C5fqBDBD29e9QEFxO1EpBXOtCyQX1t9dtYgije0hb%2BZ36Sn2h2MHXLcgSrRdqGaB8Y3s35pfJa8cRoBsABqskrSNrKe5ogcLwk4pjp2V8EyMHii15mNpx%2FSPmgkYU9WUYHyWkuG1UdUEMw6R1RE9caOHYNo7F5uTKxwNNlqawrERkyfEYXYVVWrI%2F%2BiTlCnt0CoP4Lc8e%2BHgnt%2F5KUomcnkU2d76BiEHi5lFw7G2l7W8K6jNwrTRiAfMRd5%2FhiBw%2FDQL0cgYG%2BDqN5pbioJMu3nCbRFzbErFb8YsMaCMKcMHmWZYK3KxHe7n4CBwr9X6mvpUneL36H%2BGcQdYo%2B%2Bv12DI9%2BdpdAcs%2Fweoigdn%2BJjfakv2YWgXHNwN99enT2TEtIky5peqcMNDmy80GOqUBNSiY%2BGrTiN7fWlMNzT5hsMGoft9qMjW1HYwway95%2FS8dJTddzBGG42fcm4zIyg%2F4fdnKT8YtlUdKRkay5KhvbrPhrkkRzctWV2HaVsa5%2BbwuV%2BRotdMUqjMcRcVm43CJLNwuWLd0PV2nI4S8JKRQok7%2F47qJNMs%2FcXCJdpY9ahdTSGUN4R1rUd3Xqq7HWf1wY961uY7gzPVvliz6x4kIeVxRva4t&X-Amz-Signature=75ddc4d8206178a6e7651d5dc4bb697d26a771ec61dbabf6007f4e79591b77f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2LAXQVL%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBds3S1dk5I0kbHiUoGERWAq1BT6n%2Bna9X1OPYHT%2Bh58AiEAkjk4OKleehqEgo4PJumyfd%2FNhVx4svHO42fnF6ML8jsq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDMafxAaVKliwENg9mircAxc5l2pLQ4VvpDlvPR1QByVDpIeEGSVyKxfj1yVN1f1Te%2FM2dE%2BUsWIpTVSJ%2BoKWBUEcRzKy5s09c9XmbopXW8UOJc2%2BjLZfZZQcNnFHZnwtnFIRFyyFI5W05PwZWb0eLdrR6yXdSvQtvw1f6HMEq8K4UkzB94ns1RAl8tHWnT0CsDfxk2cz2FFzZVi8YRd6EjfJtDPFpIpNRMBsZRnhDU%2F0Sk81oICTtrYq%2BUopyVSxVsZStUklHGkLb2q74rEK4mIPAOYJN0pmQcSj3m%2BMC825DPBNn6vlvtcp1xtMZnn5RDEvzN%2FjW0aekFpuNKeY3p68qEYpIeiybLdYL%2BwtBLthBTQci3FtuHrndCgEBb3ifdXmIeSddGHcEnbrmgAqjUPbRwAZB8fl2JnUagnHArSUv5k7oFgWn4wVr4zRpNtEKMWkMj%2BmOgCszAhc7q5af74O8hTrQEA8fRLDPXX03wxEa36F99j13IQZZET7tWfox0iY%2FFQARLO6H8wkGtdQqVh%2F6f24rOg%2FXm9xwgyCsc9hZPhiko0hjO6fn7qRqIsxghv0VBNti9fgveiC%2FyFRp2077XBiC6yuI8Pal8PXzDSCw0KT6MTz5wqTPSC6J3sHouQZuZJrmTWNkc45MJ3my80GOqUBSLZ3yaa7g4yai9p8%2BLiXw9Y9HdOzqKj4rcNRUAAcLzRIitslS%2BMzNwroAf1h62pan6OgdAIE67%2BroNRZ9hZ%2BIEyWV1Ey8z0NMpnCqSB%2FF0mS4P0Y1xnh7B4U7eJ%2BQtVf4FvNnYwHsbFWPomvVq5edwF61NNwYwp%2BmFcEkcixaIFO0JXbCZzBMRwspD%2FNGsgxHM2UyQB%2FLILdAP7rz3AMe2XZSVRk&X-Amz-Signature=149db8c44526d4415be712be705e05a9c985e446a31deb765593ba8f2a6448df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2LAXQVL%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBds3S1dk5I0kbHiUoGERWAq1BT6n%2Bna9X1OPYHT%2Bh58AiEAkjk4OKleehqEgo4PJumyfd%2FNhVx4svHO42fnF6ML8jsq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDMafxAaVKliwENg9mircAxc5l2pLQ4VvpDlvPR1QByVDpIeEGSVyKxfj1yVN1f1Te%2FM2dE%2BUsWIpTVSJ%2BoKWBUEcRzKy5s09c9XmbopXW8UOJc2%2BjLZfZZQcNnFHZnwtnFIRFyyFI5W05PwZWb0eLdrR6yXdSvQtvw1f6HMEq8K4UkzB94ns1RAl8tHWnT0CsDfxk2cz2FFzZVi8YRd6EjfJtDPFpIpNRMBsZRnhDU%2F0Sk81oICTtrYq%2BUopyVSxVsZStUklHGkLb2q74rEK4mIPAOYJN0pmQcSj3m%2BMC825DPBNn6vlvtcp1xtMZnn5RDEvzN%2FjW0aekFpuNKeY3p68qEYpIeiybLdYL%2BwtBLthBTQci3FtuHrndCgEBb3ifdXmIeSddGHcEnbrmgAqjUPbRwAZB8fl2JnUagnHArSUv5k7oFgWn4wVr4zRpNtEKMWkMj%2BmOgCszAhc7q5af74O8hTrQEA8fRLDPXX03wxEa36F99j13IQZZET7tWfox0iY%2FFQARLO6H8wkGtdQqVh%2F6f24rOg%2FXm9xwgyCsc9hZPhiko0hjO6fn7qRqIsxghv0VBNti9fgveiC%2FyFRp2077XBiC6yuI8Pal8PXzDSCw0KT6MTz5wqTPSC6J3sHouQZuZJrmTWNkc45MJ3my80GOqUBSLZ3yaa7g4yai9p8%2BLiXw9Y9HdOzqKj4rcNRUAAcLzRIitslS%2BMzNwroAf1h62pan6OgdAIE67%2BroNRZ9hZ%2BIEyWV1Ey8z0NMpnCqSB%2FF0mS4P0Y1xnh7B4U7eJ%2BQtVf4FvNnYwHsbFWPomvVq5edwF61NNwYwp%2BmFcEkcixaIFO0JXbCZzBMRwspD%2FNGsgxHM2UyQB%2FLILdAP7rz3AMe2XZSVRk&X-Amz-Signature=9a1e90e6a816f92d86a0e1e3b3e52ee0a1808256c1d8410f6538f3fffcaa1ca4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YI7W6QES%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAVNULo2bwQY8WxI8vas9%2F%2BMhrbwfCnWfiTradaICKzoAiBkjNngT8A64bwBjO8TJQEeXGfN1WX2dEtXE6JSIhQEDir%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMBhKeK02QqLzoffWNKtwDST4XwwyfJR3EFs2ah7ZjOKxnJjY%2FKAMo%2BmZ0x7eFR7Lw2bDUx4W3hwROYpMFScN2NhF0I%2BvEVo5Ccd5woDn2brBFWNdlqiJaXnoVOIWa9b4%2BgnPS9lsPlH81ZzhpH9%2FrRb7iFPKlhm%2ByjcXePwGrnG7cSZO1t13NwHf4ExYuMTRWxvGXjBDDIoUWsy9c%2Box6zvZginfJyJ0fNDLsTefcEMOfdw0nPMqIxdvhEpgdS2nvAGMXJYHpxFe1aUUhv6bjRF0ZoMczYMM9KpWc0tmRImbgrFoCNcK0PqXtTfeTOonRwB9Y4q2cloTOxrNiJJ4RuDbEfnLaZ2nCHan9BB0%2BRw4G7OeFeUIZ2zKVK8y7SNkYqPhbYIr4Yz3fDeXPHTMEjPpTcFvw3jByu7KljR48%2BMtKT8%2FzcXvEO9WGoeZkzSsiV7iNtpJdf8BgaVAqze7puBhiXNOauDiCN39aartq%2BhtEVuYzA82WfCyu2DI685UFE9je8kiTQmKLdzn5vw5xqry51BA8JNkwkmmF8gyTd%2BnhXdjAV54XNdzHwxdKsDHHA%2Bsh9sDt3YyhGDxG33yjOR%2Bmnf6Y1hDuXyujtTuj3%2FWLc0SaelOqogIaUly%2BYPf5BYKXRlu9MG0tTucw0uXLzQY6pgF%2BuwlW70mc3Xvg%2F1wQkJt%2F1vvSx3KW7FByWytDlDpZEyzQO1lS4RZpGNpPsU0Lgc1eijCjzaC1IG%2FKKwzzRn%2FzJuTd0ylwJ4g7JI0ERnjAUrqMGuu5vSuUkQPO2T0VhHANNoR7xo2JGpA5g%2BcmORFlrCYGLqOrTUS%2B1OAh3ICgbzMvn84W4gihKB1GHv%2BDh%2F4L7SMln%2Fv3zI4vcGJdnpfegTDgsN4n&X-Amz-Signature=d341d259b53f2204217a7dea2eea52f5ad30cd112b093c5b2797129ffbd472a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJO7IO4C%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEpz2Cnt9gLfjcEsrmQy2MZ84htxiQuGh1ddOlhZZIUoAiEA5CH%2BWfs0Sx8Bc8kTKrcTC2U5cxvc16FqfI7WzpryWLYq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDGQVuckQW8h%2BooV21SrcA%2B2WBxZ6RKdh8kiQWT80N74QiQ1l8RqwGrPV2eUy0I9SQ%2Bgduax%2FLfkjlg4sPATco05gXkmLBGU%2BX1oYNeKauwV3dyMUIEZ3a5ZiLMs1BzpNgEjw9vOekYylpA08Wctwlw6WJXeDBSgsS7m8jntQmTmrnCBzrst%2B7x%2FOKyTnxql6gxKk%2BbxfYzV84F4NKevdbox53mckjPDGOdlDG4H%2BqB2gFx8MIWMJjUW76u1vC82y%2BGqErYsNm5qWoGnOlGfNl%2Bb2rURy%2FiR77C60jaWi86CBrmTOIm75gQbMshvhGEe%2F5eniNe%2Fg2kg%2BV2%2BJjlnnf0H1sjRMcR4cletlXGYMtxCvGRc%2BBptzKkLzHOsoNqPPttSX74AHVf7%2BVXnIcxf%2BQB3Dyzsk%2BtXfj0xygKdnVvLkBgcczu4I9%2Fr%2BaNHQuSqrF73TOc55G%2B4U62XPOWV1llA4KZAQDv0h3RW%2BN4Is8cPiuhsAN7RDzbl66RrxZNNtrx7m%2F8fI5kGTmm39unVJOjxVKIuHgJs7PIIsWMVI1IsTVNLME0flxMqJZCLAwYiToi85aN4DupK5TEVKhT3wLaRE3oDFAMKuHPnWLXhN6fd0Kaa2uPs2pSM5nHV4Yn0loupbkQIL8XeUizfOMLjly80GOqUBXBNoIVOyuL8w6MmUPLdEbk6pW41bT1wixf7onLyBg3zcB2He0blugfig2KondJIM8nRudAPmTxbhNnKw6%2BQeBOjvVpnE6E10EnWa01RV%2BbMHD5QQ4Box5tiTEr8q%2BqceJ8mxq1WanfFuVhEgQzbAvWFYXYHO2oPMHEnVre%2Bus6mE459AljXNJgF5AbLqZkVfGjpdM0H%2FAyOIO34K1lI%2B%2BuHSRDRl&X-Amz-Signature=5852ab4ee3b19e174beab284a825a5da60b1edec92bfefef6f4429221eb65ca4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3ETCPRY%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzy5orGbPKZCw%2F04aoH6ze8JNkTO4wjqV3mofaEPnTQAIgUBVZLjjaECGBWQS%2FtcSgpTbX8OMQnEgeVo0A4TSFR78q%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDAzCh%2BDIHEtIuwFZ8CrcA9YaAWv%2FCGjEj3YtidzCs5lHOf4GRLe1RWdg9TNAbJNWrKSbO1r%2BF6kopAlb5A2eR3xp6zCViMcj%2Ft3a%2FHrJWY8WiEM47NAs%2F1pYyBCrUGWAkBMeVePVD0xCHsjrm1cV3Zg3D3Eg8NfgdMHRNPaDfJkc3LfuJC49bU37lYLSZFnlhGtOLdjW0EMJxv4VhnNYUqNB2wkzlg8N3OMV7WXYZwgU4BnhAnz0ARAX%2BpAw2H4E0yvoC3NO278io5US5oRbidJb3CeVeQG3M4PQd9tuDEQ7tLJIZ%2FvtFYz4pGl%2FLVfmkeTvxuwCLU%2BN8fyku5C2423d5sVmB6HAtDBEn%2FS2QegMwuZ19ausTnd6gSTjjzxSPWwY7WJNCs1sHLdyWqzdfQm%2BHWO%2FfrXIori6xjmyKOGv9eRNmQeWaIlne1Fj9aw7bmJQyqD40fLJ4YTrdvm7A20yy%2Bt8Lwak9K%2FZKKeR%2BstBkEeSXxUJS0p3FyNmiEBpDGOYdCc6OSF2Ef5Y%2FdXxDxyX%2FkOHozRjlou9ayOop8pGgDIO%2BCfx21XMBbB9Kxhn1%2F4dG4dGs%2B0xLTT28nmZWZ0iW5xeHnxC5lwcFJSNpOEYFWiXpTPPxI8xLyZ1Geim6LyplftrN3iyAKqOMK7ky80GOqUB2Kj6Adj1OKwmD8TsQe%2F19VttK6jAv4%2Fy6e51dUwREOLc%2Fxlb3870egcgJWsq66NdkjbJCIeD1eSCWS8H7T4YxIQdHfCtVJHnt0oA6BjmGlFov4OszqpRsSJprb6M7P2h53jUzMMFqLCVVmafN%2FwFaqq97ZszLmNzsVySVNfGxUzBaXRuNCRMIQRsY7rK5sYuixhS5RlC8ERkudBMhGCazo060Q3v&X-Amz-Signature=86c0b39077f691629d4e3fcade1996a10ac09a37d5ca587a29b23c986a903b2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV46A5AB%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC0fRac%2B6UAddOMMHbn1lyRsCY3hVB3I5TN%2Bn8kW4tozAiEA2I17Y795WO9l%2FJWJUex7c%2BV0LOaCwRL4vjMDwN3HfXgq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDIKilggpGwaj0DQfAircA5D8e6JCBTsVliNZAfC8BbvSU3pzCD9hsPwGwI%2FN81bNwlyP%2BCWo7z3YXHhCZeO%2FMExz4Nd6rHjj93thDDXt5iv9rxMmwV3l29KMNPLtbKsTSp4FBN8AuYAQKEVyGyqU5LxgBLHlVm%2F0zw0eP4aNsHeXvjfp9nY600Ednhu7kHI7G8AAcTOCdaqFtpPC4ODO9BC%2FazKPPCCGNlJDqsX%2FqS%2F72EGkft4e9dzSwj1d2D3UkbDyW8A1mFoxmyvhT0GbaG%2FLgtxhu9J3%2BkC2SZy2XVlaPWj6lO1MVVxqKrjoc0sqIEf7zSaRZFYi8O%2Fr0HIrOrjjw6oqjVq%2FEKRkiVpXc1MgB1JpXgNJtBrwS9sYDuopHL%2BSzQEUvBAUuTXGGzwMYH2BQh8VbP03TsGY25t%2BFlS83uAGG%2Fx%2BY7eow7YJ8CCFysqG8POdrfCXuN7tBUwbxK%2Byivqmmg14NuMhNYHYIxIbDCA%2BGQzy%2FqJfbKSpIL5ASRjXLFGZ8VE6Br%2FrAALWF%2F1qBMfEsEKJJMKzi5zD4DolncBePxIy8wiHWrUfcR20miWZv6%2BdOXzgP7Y33Fq4cR1OKVMGOOng3nzeCqbGzSEaPIiuDmb0tHKHqvFLqSFz6ZwYkY7IhonTcIGHMMLky80GOqUBp8oasV9ui4yDxmqd5jDbuaqAO8eoNXRMugiqylsSVg%2FlJWmp9X1PNhgwqS0kSaDTsAKEAN57gg%2FUl3r%2BVuFQuhNY30Xe24dRHlAsRh9i4ACdls8n9Z5zsZ8BPIY6PnM%2F5tZOi7w2kG0FQaJ0zRsJpUzvFELCIE1TeolGN93MGyoU%2BhcKZTd%2FF3IZAmDjxtm6fWIXs7w0dzt8d%2FwvEtEq021489e6&X-Amz-Signature=ea75a9f8db40f404f1e06bb9270eab803759ea6f94ca36bd5891a34e3f210689&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV46A5AB%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC0fRac%2B6UAddOMMHbn1lyRsCY3hVB3I5TN%2Bn8kW4tozAiEA2I17Y795WO9l%2FJWJUex7c%2BV0LOaCwRL4vjMDwN3HfXgq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDIKilggpGwaj0DQfAircA5D8e6JCBTsVliNZAfC8BbvSU3pzCD9hsPwGwI%2FN81bNwlyP%2BCWo7z3YXHhCZeO%2FMExz4Nd6rHjj93thDDXt5iv9rxMmwV3l29KMNPLtbKsTSp4FBN8AuYAQKEVyGyqU5LxgBLHlVm%2F0zw0eP4aNsHeXvjfp9nY600Ednhu7kHI7G8AAcTOCdaqFtpPC4ODO9BC%2FazKPPCCGNlJDqsX%2FqS%2F72EGkft4e9dzSwj1d2D3UkbDyW8A1mFoxmyvhT0GbaG%2FLgtxhu9J3%2BkC2SZy2XVlaPWj6lO1MVVxqKrjoc0sqIEf7zSaRZFYi8O%2Fr0HIrOrjjw6oqjVq%2FEKRkiVpXc1MgB1JpXgNJtBrwS9sYDuopHL%2BSzQEUvBAUuTXGGzwMYH2BQh8VbP03TsGY25t%2BFlS83uAGG%2Fx%2BY7eow7YJ8CCFysqG8POdrfCXuN7tBUwbxK%2Byivqmmg14NuMhNYHYIxIbDCA%2BGQzy%2FqJfbKSpIL5ASRjXLFGZ8VE6Br%2FrAALWF%2F1qBMfEsEKJJMKzi5zD4DolncBePxIy8wiHWrUfcR20miWZv6%2BdOXzgP7Y33Fq4cR1OKVMGOOng3nzeCqbGzSEaPIiuDmb0tHKHqvFLqSFz6ZwYkY7IhonTcIGHMMLky80GOqUBp8oasV9ui4yDxmqd5jDbuaqAO8eoNXRMugiqylsSVg%2FlJWmp9X1PNhgwqS0kSaDTsAKEAN57gg%2FUl3r%2BVuFQuhNY30Xe24dRHlAsRh9i4ACdls8n9Z5zsZ8BPIY6PnM%2F5tZOi7w2kG0FQaJ0zRsJpUzvFELCIE1TeolGN93MGyoU%2BhcKZTd%2FF3IZAmDjxtm6fWIXs7w0dzt8d%2FwvEtEq021489e6&X-Amz-Signature=09b9c95ea56afce92088b88c7a0cc5a81409316f950dd34f77f158dc6feb48f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI7G47TB%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBEVZosN2bbO6Cn0HvuOggYp%2FtGlMr2Ma4%2B9R%2FCNlXFEAiEAhqtwpQFYO%2Fp81DJUqvTatshKNNc7c8FJp1niOu1dmOUq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDNjJvPHmnb569k7h6SrcA7P7meajO8i8KEWX4UPhThzeGnM4YJw5STBD4vNP2ZLJaXyLA4cORaZaNG1Cq4rJS%2FHpEGWfHDb1KoI73x%2FpeLWCfS%2BHZGa8W7bDzOCByX4bJO5lSe%2BJ%2BfrTAE25MKls51dkV3DDbgW%2Fkwp5VuFOy8WMOAuhZDomzdP%2FTeR6siiztmUWBysUa3TZoFw6fWUMfcg%2FuakI6A%2B%2Byy6dSKXo9Twmjerru0I6bbZsuE4pikMOqApPH1rvurh80vUcORlX%2BGAmRtz0XML1p3fcO%2BnrMdxWLuOFtuJ75Mzaksa5NIv7CYmv7Z0yiS%2FgDiYcmPLFH2KEBdlWCYll9EDqLbncnzoCvxsAH2giq8rlOBrY4xN95%2BTaFof2vGsJA1bQXIcx5c7iS5qh8bVZLgity9QlRkQO5Va6%2BQ0AxaXtRD35D9CozJazB8Tm1eHEpJAdq40lWTgLtNoRE8bt0%2BeezTFkYINRRw9F1epdnWwi0hAZCdMQ4%2BJAZ4JEvDZ9o5tMrjZFbMV96HFwJgvAIpqMcntrwVc%2ByS0iCKtky3kJOCqv9AlAk0Y9O8fo8kzDlqJIkmQoWHYXVnWn6wyDXgAIWn0%2BTpvNoe3lx%2FBylxOAysBkS7n7gIlODcKsm0nKVIYHMJvmy80GOqUBmDpKkn%2BFT9C1iCpsClcEEmQqj1jynBIwUq1dU0NcRp8mwN3K7gMZaY6KoCsgGooP1MjniLgGf9u%2FS8BH2jYEzi9h%2BeVYulZqcQwt5locT1A8FlatRXdy5de4x7UB07ypQOcGCIxuEVDjgDdGXvZHW7RsZAMEmDQtsAVP69suUc70mFQeb1LYCSU2HDf5jBw78Ya6VlyIt2IL9if7X9dsQ49mEAiH&X-Amz-Signature=d79af37dbaaf0f81c0e71bf32124a8786e8a282ab91a8b54afd62b54022f2317&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZWAVSD2%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGc3f9dl8UQ8ErPXy6%2FLFN%2BFajfWH0L7FtWQagqGfZ6gIgJromboxuEmPY5kAS%2BNb1P6lm04NgkZcnYJ%2BhKZs%2F0MAq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDEwtrT4ADmRJtJN3qCrcAzIm7P%2Fa2zzqQ5DdSqkD0jtkPpp4vnWxbLMnluPmT%2BaAmfe%2BgRrQ8Wn5U6O8wLCxnyivQLDw7xzS9HxoglIdm1awrgSRHa2IHYECAaei%2B%2B8z36iV3AR0VyJeyGn3Pk1LjZP8p0vk1QfUaRQetv9w7NNTpvUvMBdlzIal7Umc1wfB74fR7fb0A2SnQtk2s4XbQ%2FRI6arfci%2FPRz5%2B37sd7%2FLqeZw2LUYNg33Ubff%2B1k5lMmII0j4fxJCVllCL5D3NLK8oXUi0wgq4408Cp6wmZBcmv7Y0%2B6VH9a6fJwiTTg7EQVbDYdiUGZnxy%2FFiaKfriIjyk0KxAXp5yZewKIUlmaFG2SYOxulbam%2BEhS%2BK826URlVNzn30ZQaug8bnQpmXnBDbBCbDc92bdb%2BDyqdUxTJxruhJe%2BxpOKv43rdeZQwbblxxccRRNzUoMT5KieCLpFLGnbX1q%2BH7RUHJy21VLL9ioAP5evJTg5WjnCjulLP9W3tJBdpfnXbdUXH75eAYfrevazVluf%2Fx6VhZFqwLF69WAyZ39%2BoNNT%2B%2F0Wb2yXyoQ8aLS%2BNJeYV7wNIAiwPOkArYn6NXiCVvkBCLYzWJfN%2FIokUf2jbAwqytVw5MGZ742Dy0TGyYfpl7Tlt%2BMNbky80GOqUB3AzbPmsS%2FMR%2FWqfpUfyxRxog%2FHgBF48fH4Dfmi3pX7RyymoevZcs64AdXYo8DaYrZmEU65IWHcpyrKqLAD2C0yWVMF%2BX%2FDBDc70923x%2BiwbUtAy8k%2FXH9zbVb2DVDw2QixFFnsdvxnjK9LXl9Bgp0aCHCJV6DDTNhm67Dm%2By1z%2FrzpqGvXoi0zIMrUN63jijUnq02Ith8n1H%2Fy06oA61TmSgxk9T&X-Amz-Signature=775ae40e1c0f2c1025513f38b914fa6233aa7f0d82d557b924a5d736ac225841&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZWAVSD2%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGc3f9dl8UQ8ErPXy6%2FLFN%2BFajfWH0L7FtWQagqGfZ6gIgJromboxuEmPY5kAS%2BNb1P6lm04NgkZcnYJ%2BhKZs%2F0MAq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDEwtrT4ADmRJtJN3qCrcAzIm7P%2Fa2zzqQ5DdSqkD0jtkPpp4vnWxbLMnluPmT%2BaAmfe%2BgRrQ8Wn5U6O8wLCxnyivQLDw7xzS9HxoglIdm1awrgSRHa2IHYECAaei%2B%2B8z36iV3AR0VyJeyGn3Pk1LjZP8p0vk1QfUaRQetv9w7NNTpvUvMBdlzIal7Umc1wfB74fR7fb0A2SnQtk2s4XbQ%2FRI6arfci%2FPRz5%2B37sd7%2FLqeZw2LUYNg33Ubff%2B1k5lMmII0j4fxJCVllCL5D3NLK8oXUi0wgq4408Cp6wmZBcmv7Y0%2B6VH9a6fJwiTTg7EQVbDYdiUGZnxy%2FFiaKfriIjyk0KxAXp5yZewKIUlmaFG2SYOxulbam%2BEhS%2BK826URlVNzn30ZQaug8bnQpmXnBDbBCbDc92bdb%2BDyqdUxTJxruhJe%2BxpOKv43rdeZQwbblxxccRRNzUoMT5KieCLpFLGnbX1q%2BH7RUHJy21VLL9ioAP5evJTg5WjnCjulLP9W3tJBdpfnXbdUXH75eAYfrevazVluf%2Fx6VhZFqwLF69WAyZ39%2BoNNT%2B%2F0Wb2yXyoQ8aLS%2BNJeYV7wNIAiwPOkArYn6NXiCVvkBCLYzWJfN%2FIokUf2jbAwqytVw5MGZ742Dy0TGyYfpl7Tlt%2BMNbky80GOqUB3AzbPmsS%2FMR%2FWqfpUfyxRxog%2FHgBF48fH4Dfmi3pX7RyymoevZcs64AdXYo8DaYrZmEU65IWHcpyrKqLAD2C0yWVMF%2BX%2FDBDc70923x%2BiwbUtAy8k%2FXH9zbVb2DVDw2QixFFnsdvxnjK9LXl9Bgp0aCHCJV6DDTNhm67Dm%2By1z%2FrzpqGvXoi0zIMrUN63jijUnq02Ith8n1H%2Fy06oA61TmSgxk9T&X-Amz-Signature=775ae40e1c0f2c1025513f38b914fa6233aa7f0d82d557b924a5d736ac225841&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OB57GDV%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T173855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEL6M6nMJ3wg%2BMs7vNlOcMQTT8UxSli8HXXN3wGML%2BqAAiBeYFTSvNI%2FaQv7Wm1iG0KWiWLpSsxtqKMKZMx4wPzo%2BSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMQkAdtI59uBVMFoS1KtwD2yRavwr%2BqjL3bf8lxJ0cxbRL65rE3s6Bs50M7Nq9O7xsQRimSUxs3gdoNWSwoo48UhesJJxZWR9nuHt%2Bv5g641W%2BecePuf0B0mdpZM3uR0XKaGj8WHbKLTFsOgY21CjoURWzuL7Z%2F9X0Ixz7cRCDbcsEyM%2B2Fs63nKhzA4ymy%2ByfSxiLRm6WYRlYxY9i0xGFZQhuFKuS5%2Bjgd3ShpFP1l%2BFFltECjs8bDOtHsUnlkStZcHv0PZeoBqilIqgBlSw39xNBFSHIHCJFu%2BalMVlKtQRIrwsHssKfXg8WO7cJYbZhueUjQkl2Dckm3hmDBJ9FcegOAqhzG3XIYSUEFss6RThr8qREF1lRSREQx8prkph2I2HS0TBjO%2FVt2JGLfRQag6ClaJsX%2FElBhnAZXpTtIWkr6fcN2LLBiEe3EuwjSSS7gTCwW%2B%2FUS9a%2BCYftZ4aQCdwk88RfHiomif5Ovt1MwvEBsEccqEg3Y0k6ZiJJhiSvgrHOPBzyhQI0u%2FnHHTFy602oIb6nKpjhyh8Itr8RkUgohKIE3%2BI%2BzU%2FJHWGUUV3Q%2FuSt9Nzc0e1GhbeEpm8%2BBzejWRv7XivbPIF124DxBztKgqfpb8%2FE3%2Bx%2FzpihfNAMrqPLgDcPPb1MQYkwiOTLzQY6pgH2frhwhddaMrTyKU3ik3qLpAPRtjoMowR7qwgS5PQeEUkZO268TKarybPgKaIjeFBJYz6bw71GywqnNXKrdXSiLW2HQbdYm5gNokSIAHpQ5Tuj%2BXquYPHNRcF1%2FWwZ%2FNj5V9FpztE%2BXlVruOSvy4Q9%2BLaa%2Bi5pNacwK6Wpio7Q44qthbPKhfMindOJMrpihKE7YrP0ARxyaOn46lw%2BMrxTlMevtW%2Bp&X-Amz-Signature=07d1f5a888e591919c5fc274782d26bc8eaf5f9a1e30da32f5a46ee3e6c9afc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

