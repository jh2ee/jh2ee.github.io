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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4YXT25I%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCKKLAPS0hULtjiD9SB%2BLQ6Rgs0z%2FQ70FUllfmWsAxJgQIgVomU3EqhH5NMNZGcvHSvUBhoyDZxzNfxfFJi4XnbSB0q%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDGrXLn3F0n6VoJyT5CrcA6eKf4McLJQSGlH3cuebcB9frP5GdfsSsgUjpitQH2ajFPD%2BK6leDTQ5rkciXWdgVMjQ5rcg9%2BRVg43lP28xEAPAFFyMLkAUdDRAZJt63oMF9jepZitddU4sw2%2FGnvWhdQGO43TSQuGwlcG3vSgd86kP9QUrJ8yYfEag4hNmrKiY35259%2FP1PNIgwp69BX2LhspzN6FgLoC3usacSGvp0wUy3T5NnJ5ZAEL6vVWo5HTKqeW6AEYda5B4VcetuGTIDuwwv0uHK938K%2F9Jpe8YbL7LGP8aFjpd3MOA5Wyqv%2B2%2BJ6F4QxzO6YGcf6ZRM4%2B5dxdmqbWFs3xtbNh%2ByOmYxbGWSOf6ur2EMFaHo6LTL4mOVMEPfrFDl3SetbwiiGFpad3NId77jsTazg8FxSq%2BzjUpWT22sdhUebJGW4%2FdGEbo2eQy6anDIC0uO9oy92%2BeTxio0N3b5jXBRxGSqfjbw9umJGi2WZJE%2F9FDh%2F1vjt%2FItEyd7u6IE5v68s1DqJfX6oEzxsdq%2BfHc0205F%2BxRxAEGO74Byq0JdjzyYOj2M%2BJwH2X7CFN4joc8joDsO945x0%2By7YBi%2FlYAjn6Vzm0LJL878c8TXS50peiZhmjSB9N8wkaAJuN7aY5rlmJqMJyx3s4GOqUBKMeNkkwN1MhbsEOkRDJ8MgtUY9DU3KK7uOL74hG%2FTV616y9y0zET%2FyUdzHMosl4Zv%2FyN135BqRmQhxDpfYu8vpUXinFDFga%2FD9t%2FsVFEVg6714AKaR7Qd%2FlvbW0WJ4D3sPKa09HotxNNEG7C%2FL79qPaXCJBi2B6nfueYR20rqLiZ0ah9%2B54yY9sIRClG1GoQSspw6%2BvWezUyaU29g9u3IRo7F3sl&X-Amz-Signature=aa24efa42e73ec23be7a03b48f9713690e1789e64d5655e3024ae47e7e49cf47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4YXT25I%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCKKLAPS0hULtjiD9SB%2BLQ6Rgs0z%2FQ70FUllfmWsAxJgQIgVomU3EqhH5NMNZGcvHSvUBhoyDZxzNfxfFJi4XnbSB0q%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDGrXLn3F0n6VoJyT5CrcA6eKf4McLJQSGlH3cuebcB9frP5GdfsSsgUjpitQH2ajFPD%2BK6leDTQ5rkciXWdgVMjQ5rcg9%2BRVg43lP28xEAPAFFyMLkAUdDRAZJt63oMF9jepZitddU4sw2%2FGnvWhdQGO43TSQuGwlcG3vSgd86kP9QUrJ8yYfEag4hNmrKiY35259%2FP1PNIgwp69BX2LhspzN6FgLoC3usacSGvp0wUy3T5NnJ5ZAEL6vVWo5HTKqeW6AEYda5B4VcetuGTIDuwwv0uHK938K%2F9Jpe8YbL7LGP8aFjpd3MOA5Wyqv%2B2%2BJ6F4QxzO6YGcf6ZRM4%2B5dxdmqbWFs3xtbNh%2ByOmYxbGWSOf6ur2EMFaHo6LTL4mOVMEPfrFDl3SetbwiiGFpad3NId77jsTazg8FxSq%2BzjUpWT22sdhUebJGW4%2FdGEbo2eQy6anDIC0uO9oy92%2BeTxio0N3b5jXBRxGSqfjbw9umJGi2WZJE%2F9FDh%2F1vjt%2FItEyd7u6IE5v68s1DqJfX6oEzxsdq%2BfHc0205F%2BxRxAEGO74Byq0JdjzyYOj2M%2BJwH2X7CFN4joc8joDsO945x0%2By7YBi%2FlYAjn6Vzm0LJL878c8TXS50peiZhmjSB9N8wkaAJuN7aY5rlmJqMJyx3s4GOqUBKMeNkkwN1MhbsEOkRDJ8MgtUY9DU3KK7uOL74hG%2FTV616y9y0zET%2FyUdzHMosl4Zv%2FyN135BqRmQhxDpfYu8vpUXinFDFga%2FD9t%2FsVFEVg6714AKaR7Qd%2FlvbW0WJ4D3sPKa09HotxNNEG7C%2FL79qPaXCJBi2B6nfueYR20rqLiZ0ah9%2B54yY9sIRClG1GoQSspw6%2BvWezUyaU29g9u3IRo7F3sl&X-Amz-Signature=aa24efa42e73ec23be7a03b48f9713690e1789e64d5655e3024ae47e7e49cf47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KQQGYYF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIHv5n%2FGB13X5sEVc17vs3t%2BNVHrzSJecjR9EGZXE4jOeAiAekRkJJXuytUkUPQd2zsrTXVw%2FyYx83z8%2Fl%2FwfWwOKcyr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMX8b7x0L0UeiiXa5rKtwDFuXvDHw1aHhpgK00kwj5svku3yt2pzhmxMOVW6uPUa8oPMrC%2BhoB67g84YNprIqNTXKkWLXYMQmloqyvDpWomdYTd%2FBAUfoic6A7IcL9t1nm2W72evI0gOmMi8f5sdWhkl7zrzzjY7hJjKPZJSmuC3z5GoedwoFqkic9Z79YztRwIh%2BZzo32qk%2BPF27USdga7OVzDnduHDI0fLqhe83aqB6HFpDXnXi%2BcpLhZJMxxj7Bhl0j1I3ueqWzjOCSpIdBHi307etNryh8vEAlv%2BPiKGvg0yeEMdeu4wuf8T2GxjhufhzL1EFQtM67KmrDNC8ZU2t5jEu9JRtFJjYauRINKGONBChfAWat7DwKLPpnwFW1VBJn5KN1%2Fvhry3YWDVXU3oVXZ719JX76OY1L92UCinj8mTCi1BHwdEY2mj4dEACB8j7rFlyrY1Z4SRT8Z60SYsqxtPE5PC9FLFaCq8W6PslBmHPAX9vO0HrPwiha2yqD2Pom9ZNtbxsp0VD51j67X3UBBYAFmWGFVJVNJGpVEEZBlpMMSIZVeuO9b7%2F3fC%2FxXtjLBWxJtONNlPRZcTSffSIX%2BXaUPtgUz%2F3UjcpzVOBr5ZeXSxC97gm3Rq43%2BCsLW8%2F6YlHqkj8rG84wgbHezgY6pgHGBb8WSsf4EjvPNJIL0GgcyDzF8XFkKq0LmN2DlVn85EFMdL6Q2icANi%2BzKXXgsAh%2FPHdLhUwtZbp54wFwhIh5q%2BWJSc2jZgvnD4ijufZfwJvWoz84iuzWD8rmIFu%2BCjBo0C8vkwDAPbaKOCntaiLT9rGHLfrXxUxcFzoN4%2FqXjBfVjSyv%2F8r2gJ4MUo4MzBgUjHcMOTR2e4Cd%2BBr8NI1FusC5HiXt&X-Amz-Signature=6bbe0d1df3e4f486a7b5320acc1b8ac0ef0f115324cd8aec5f16a0dbf8258223&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUKXLW2K%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCoDxdrNraUhren4wbRQ2u3PUfAkD%2B16DOdG5w3SZnL9wIgW4WuxOr0GYeiHNS8BVQTNinqYFUP8tkQ5Nsxve4hrCYq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDNl99uMgKEL4W6v56SrcA5iY9PHQVJxfMg4mv%2F1e6XUwcFJP%2BpXieT%2FBpY6UIxdo2HytC%2FdiQfsu78CkOougXb62pXD9%2Ft8V%2FHYzAi0moxGGcsdzF4acY5EnsEd0eoDM1RatVOm%2FMIAfImv8W81tzxM5Vx2RZlcBVs0PVYss0I0tP%2F2rbz4zSQ32z2SMdsuo2sloY%2BIt7vMbVHaILLD8O4TuwPNAnbgRBR7JNV8zjbvU6HvH2H7ZirmTWUy9PLHhW8tRElFYGvvwRMoZJK495DO9B02UUgt4KyJIPBA4qSvwjAdqtst6eYJcbLn4hBlqYSspyO2WKuFbiopMHmXP2CIEFRnQQ5dE9Wli7xnowEaAPnZqCQsoF9c%2BrCB1B0Z1H%2BoMTD5XJrI5y3WgTcHPZbC0H9VoxG3NkvFQ61J1WktDtj%2BqO3WV7CGMC%2F0omVlDqIyNb2V2s5YZ%2F%2FFMA4IWvDMbgdSPabR2uKvX3303htmC%2BQU9OtABJ1r1xdozQEylfUDK2EtRg48AXcLs3RxtVfGp5UnKAX8V1Vv2klOWZqe8L1TIUBq4bOLwJ6Zi8cEnQ6TGgKtLg63uqMXENHg7%2FXOAKbzuiK9DPiVOpeNQnPgpXFR3atGhcZlA8B2mN8gOlL3aBbvOx79Fx8P0MNSx3s4GOqUBe7GH4YkiUDl25wLisjqJDZW0Q25KRDUg79dh3JuThOXjRwdHVdhtgKaTFUc9jIOhhJzws2l6mgHFhcezlP%2FxEGXaAwdxepmcQGzjP0cFOvRuroq%2Fba%2FjLJlyQHjJLZZUC%2F9%2BzgrT4pVEcvKr0FFjK4xSL1im0Ggh2uB2Y%2BwQzCVQnb6KMZ3aXWfuGqpKBitjfQmu9k2lLDrDyaoEY5mT8SWtRMQW&X-Amz-Signature=69c4aaa7002a939e4f804a54a02081dc845c56a4485c4d36cb6dbd56ae35bd38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUKXLW2K%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCoDxdrNraUhren4wbRQ2u3PUfAkD%2B16DOdG5w3SZnL9wIgW4WuxOr0GYeiHNS8BVQTNinqYFUP8tkQ5Nsxve4hrCYq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDNl99uMgKEL4W6v56SrcA5iY9PHQVJxfMg4mv%2F1e6XUwcFJP%2BpXieT%2FBpY6UIxdo2HytC%2FdiQfsu78CkOougXb62pXD9%2Ft8V%2FHYzAi0moxGGcsdzF4acY5EnsEd0eoDM1RatVOm%2FMIAfImv8W81tzxM5Vx2RZlcBVs0PVYss0I0tP%2F2rbz4zSQ32z2SMdsuo2sloY%2BIt7vMbVHaILLD8O4TuwPNAnbgRBR7JNV8zjbvU6HvH2H7ZirmTWUy9PLHhW8tRElFYGvvwRMoZJK495DO9B02UUgt4KyJIPBA4qSvwjAdqtst6eYJcbLn4hBlqYSspyO2WKuFbiopMHmXP2CIEFRnQQ5dE9Wli7xnowEaAPnZqCQsoF9c%2BrCB1B0Z1H%2BoMTD5XJrI5y3WgTcHPZbC0H9VoxG3NkvFQ61J1WktDtj%2BqO3WV7CGMC%2F0omVlDqIyNb2V2s5YZ%2F%2FFMA4IWvDMbgdSPabR2uKvX3303htmC%2BQU9OtABJ1r1xdozQEylfUDK2EtRg48AXcLs3RxtVfGp5UnKAX8V1Vv2klOWZqe8L1TIUBq4bOLwJ6Zi8cEnQ6TGgKtLg63uqMXENHg7%2FXOAKbzuiK9DPiVOpeNQnPgpXFR3atGhcZlA8B2mN8gOlL3aBbvOx79Fx8P0MNSx3s4GOqUBe7GH4YkiUDl25wLisjqJDZW0Q25KRDUg79dh3JuThOXjRwdHVdhtgKaTFUc9jIOhhJzws2l6mgHFhcezlP%2FxEGXaAwdxepmcQGzjP0cFOvRuroq%2Fba%2FjLJlyQHjJLZZUC%2F9%2BzgrT4pVEcvKr0FFjK4xSL1im0Ggh2uB2Y%2BwQzCVQnb6KMZ3aXWfuGqpKBitjfQmu9k2lLDrDyaoEY5mT8SWtRMQW&X-Amz-Signature=cc4df9207450b16ce4840179194f21de0e26039302080f9c92360e522e2e13d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQZQYBYP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCYibkJtO0Hny8f7%2FyUT4D5bWfFXVSkHZ09E7w9ky232gIhALPS14wlnCjOk%2BqguyJ9oqYMpu%2BkXI89RE2ROhwF5vJAKv8DCBUQABoMNjM3NDIzMTgzODA1IgzpQkb25G%2FkQBehT2cq3ANbdsa1WejJUooTp%2FSB2LOMcsTul69kU01yEm6SX1w4MFlu%2FHowGc2GXSfF5ecDLLARWQCji9RyAFjh7TVpXDkv8EC2ncp5GOrcUwjTRTQv0FlEt%2BYMmsR%2B%2FcGa1RIpJZL7iBGbyufjtEABqkh03TyIXVZBpR298J7v8UV2gcn8MLvOCvQqqKTVty6zmP%2FdfzR4PbBRlUpJ8MoXnSQISOT27QbFqOdIrjbFvPdpZw88YjUk75jpa6d9A9kVkh8cIY2xYeBdqJSaTYelEF7EPYKbwGUmFNPFl1oCJqA%2BORp2K4leolMl%2FdvDpeieGASqt3K%2FXv50OiRZwH05p4DZz93vkJLB5gQ04UiCMSoDvlLCZDdPCDosnZpjqHTTWvz%2FfV%2FzAhWTpzjHoYWiPF9eojuJ5GBViL7XjQOpVd9B80bDs6bBWaF0YI9NnKOr2VbgIZOSjFsbYotKqJH2VVOHUgeLc%2BkTV%2BlDz5q56GmZiEa4vFbmxSn1sQSCY%2FLjb60CgI5lbLAm6dcCGqd%2BS5LE1PbMr%2BwuWELKRMWpxjU6nMz7qLtTMZzs2fCS9mZBh57IklZ9Ul%2FjdZX6LNRheHPpwgYOwKdDLn7P40Vybj7BBc0%2Bj8OJgbp9sGU5ajpvRTDZs97OBjqkAfbBE0%2FXAEmYw1aE0IJ7%2BqbheW%2BqK5ZzS%2FkbRYOe3XgAN0BGFORIN0B5g4ohR%2F9RDM8PM96HQLig%2FvceiHzSobWHJwjjsgspVtuqROGcPzQbO%2Fmw%2B3d73xiqNzkQ9ENNaave3ayJhF0zt5HPyr8jM71N%2BDdwZLDIvYqA6rVMpSi2YVsCkaz6MsWG8z%2F%2B7QS0oorbOCH3ZOYLagKg7WwLl%2F4diUS8&X-Amz-Signature=c9ffbb8b1fcfb45766ba86ee56c2ca1e0d1c9e0d3608a45c67ba43c749751fbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5YXQZTO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQC4zfPOEGl5TYFbu5nYIDYqbg9hxg8glGKpGaxEdhnVUgIge5l%2BnsEB%2BurYlq83V5Cz8j1KibPaaMeCY84omUKLiL4q%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDM%2BiIcS6WdC%2B7%2BW4%2FSrcA5gFMUfOMDld7zjOh5hMwfwdvX2ENkAkWOqyThDdTr0sjcMtzIaAebirDaN482oEOv9Yci0mW1UeKw5%2B0F8doixD5WlyHsu1cqn0ciaGdRNEswmEtmYA4Z9yuJMcciTTiXv839pbf3Hra6Jc3ZL1qH3ItC%2BRUqSnLtp4Q9A4imNMUFU3YXRcRtXHMsHYpRbU5JVE07NEm1HPXmCq3LqOFTjuVjcb1Kjw0Qen0Porz1TtNErYykrSS0K7%2FJ%2B0Gexem1AXTykQp5OK969epZPVsFkMDMfn9TVVCFXxDrlhWNZrxOpXATXEUCgQxXBmT2ZjFMlNvDNNqhTijKS5CvwXDosN%2Fk6yXi9%2BlzWIVTOFMUVS07FXEFhAcymo%2FeduATsyJASD0q%2Fh0B4RzEH6uZ1O3B6h2fyu7HR2XZ23GGOBmhvdC5V5zTQqkhuEL1f%2FgnIiEpYLzriGRw4Nrd3%2BWC7M3bZomiA3qaBitobsWLZUhXoDsfqiMVphk%2Ftu8Skwpny11R2%2BLa5NquS0iAGTSASq%2F5M0BOzOVWfuBAh8tGPuSMHp2%2FgUr71%2BZlD3gKk2lebSemqZyWBP0fhKOe1KYf4bIkrup%2F4N1LWY1tClGl3IRumsgJzYhTqGZo8%2BEGGDMKqx3s4GOqUBvbTimLi1D7hJCXU07s5%2FfKQ9UP3rV%2BBE0gcmmT4z9bMGGZ0CZ%2FPyFQxj6QEcIywlRR7B2H5%2Fuv8THOTMSgGimMCmaKXxMWXoUamK4R1fxD7H5MrR6GIWPIbgGVhxYUuStTMjPI%2BEtORsKtK0qqW%2FJWzqnH7kgZMR8%2FYcPKdDAPYRS8x3e%2BFqe%2B7GR2vgy%2FLSD0DuLhRK8yv1mnd1nqtFuY1ywHQK&X-Amz-Signature=62be6c01569bf5d70d2705ccc112c9979b38b84a8e704b45a37ac59c0d8ec63d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665I5VHIMV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIElS1GIL84HnP6V8GO1esFVLMeSBhkV5gdUyARBPqJVcAiEAp1ZDh4Q3%2BauWl0PmPu8fwASo%2FkeGrMUdRm10cAs%2FZcEq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDDv10yy5tpoRA%2Bnb4yrcA57pyF2A7BuCzK64B8p5Uihkhkx6VRfmu6kNFxTFwk7MK%2BNOe3zyBFaNz0Cixz50AhrJ1uIZ7O1lIENvzs9BNiqB%2Foi%2B%2FdS9lQlsEv4Bb6%2FTepNoBYlX0WbEurxTFKEW7SxKKaIlnDRNBF%2BQQeE8pexOtPR4gDqQvRf5U210FFtsDBO7bPSJacipjEUr5GyAFc5z01r19SSHSgGGB22b7ePSvwyjxvMIKusO58fITJE0IL7qiaSNEBrEjkdvf9adGd5mMVknjYUGwybkdFNkI8VnXlVBsvC3ngVs5DI2mc7zQr2jLVKe08IxI50d0q0dqq9nvl05Y4qzG6YQaq6I9HMpY0GU5lOHbZGbMR51XlZ2Kv7Ib%2BnEDpKyVY8mCZIZF1ZZvJz6brFJP5HUAehe41h2QggNmRGDPDxJBWzNgeRf%2BkZpWJmlMQQNr5MTFDKIwZRi7PtsNAHct3erLEIM%2FkZ1Wkffqa5vT2yzDX5CWkV2mJuHNFfo%2BM8e053Nf1dstlIY58DB1f7XIloTboSycf77novlbNtRWIrIJFI5qjVKeqwLl%2FNZ7LFUhApI9AaUB5hRIRBPxb72q%2BOBCdf6HvBOSC%2B%2Bu0YFGVNGeIB%2BHuhurs7uGzseXedfoL08MLuz3s4GOqUBj%2FcIPgrQsO5sJxXCwtrEJUAsewhV5hGCEBaaaQ9H0i4EqSE90JnTdvoWzOili1TmsH88Aos7VD2ijQ2Uyy%2FekACBq4EgqceoaYD23MzqegjknfgF0QlKqtADqusQucnl0xdx%2B3dcKTUGLClVQ8hZL407PfMhZwjV86OES3DJXfD09L1bDGWZMP1nnTFxPAS7oErayGzoYO0zkYd2m7ykd6Hj%2BCfW&X-Amz-Signature=2b9c7e1298026bd0eb6b5af017876a9899e04f9dd806b225003906bd6cbecbd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUJSXVVQ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQD8PdpXgKuXQGEdlg0bV6lJ7heeUr99Wyr%2BnLEY%2BfQmygIhAJnoA8HildrhRwdPGeim%2BYl%2BC0YkEOXXVnyrltuJD7hvKv8DCBUQABoMNjM3NDIzMTgzODA1IgyyCUMBb15wND76wBkq3AMYuZVfqVVZ5kNbZnZyFoQbEhqXv6pMxfUpWTlFpUnD6Mj65ai%2FNAAPOpuPbE3hYfWB4pqsf1wCxHEZPA%2Fd4SoyUX7Dy%2FqeRWyc6KKqvgj%2Bl%2F5%2BfJtJRHvr84KO0bOi3S0henatvNMYOI9iFeOxuL1YQA%2Bnug5ce7cfXfb1j92U27kiRi15EcuF2ez4HIvtTWQT0q%2Fi%2BZpzdjEwhGnbsC%2BLR8hIWRIVfRJjoAvEUhxfKUHWx%2Bom7wz9Ig12Q70AIjL3Ba3eUf1MBvZD3bxQ5HMALpMyrHMJ%2BmcPJcMCa0jcUctt5%2FPAG3bqTkOwGVBlxFArENDZ1kx6LcDiNLtkf%2BgTF9RIDnUU4VvOtXZ7FFqeJKy45fiQsyuoidZi5YWBw0mfVfBwSDJNmrRq9oHubVPfJNDSlKIM3%2F%2Fn8sE7MQbCTgqoTGrnpO%2BcB7UkP6V9VdvJxqGdeTViMIfhOQSAKL0LePIsZHuGcCuf272X%2B5jsbkpUsIkgZu5sCPHOQvvamW%2Fitt9Xp%2F6NhjKwt8h86QunB%2FmWXImeowvsXWmvgjj8lKLAPvKn4vI2j8Vidx0o0nRPr21gsTeNeK3wELbgq8OmVajYMho7y3VWjqDmYFhjnkkSE4CfXVTZijU1ATDas97OBjqkAX%2BhiR7Rsuo9B8h90T3j2HTnmzhWS3%2FcBVGtUBOLhXOXOjfR1c5md8HJD6fGG81r0Q6O1yGipYEjrAlSBPJWLu2uWlMVNvlAKOiBgMbJl8ppFkAx48yfF8CEcUtNHmrzCCVYIEEJQpH%2BoV%2BRj74SJJzYGmwbY1DdSuZlcwVqRswv47M7YOb8pZf7CoeJezffG1mxnVPcWZyYfCG6Z%2FmddILafzL9&X-Amz-Signature=79ce7891cc3af453ce10f8117bbdf1f89420699ac4243c39a73533a321270ac8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUJSXVVQ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQD8PdpXgKuXQGEdlg0bV6lJ7heeUr99Wyr%2BnLEY%2BfQmygIhAJnoA8HildrhRwdPGeim%2BYl%2BC0YkEOXXVnyrltuJD7hvKv8DCBUQABoMNjM3NDIzMTgzODA1IgyyCUMBb15wND76wBkq3AMYuZVfqVVZ5kNbZnZyFoQbEhqXv6pMxfUpWTlFpUnD6Mj65ai%2FNAAPOpuPbE3hYfWB4pqsf1wCxHEZPA%2Fd4SoyUX7Dy%2FqeRWyc6KKqvgj%2Bl%2F5%2BfJtJRHvr84KO0bOi3S0henatvNMYOI9iFeOxuL1YQA%2Bnug5ce7cfXfb1j92U27kiRi15EcuF2ez4HIvtTWQT0q%2Fi%2BZpzdjEwhGnbsC%2BLR8hIWRIVfRJjoAvEUhxfKUHWx%2Bom7wz9Ig12Q70AIjL3Ba3eUf1MBvZD3bxQ5HMALpMyrHMJ%2BmcPJcMCa0jcUctt5%2FPAG3bqTkOwGVBlxFArENDZ1kx6LcDiNLtkf%2BgTF9RIDnUU4VvOtXZ7FFqeJKy45fiQsyuoidZi5YWBw0mfVfBwSDJNmrRq9oHubVPfJNDSlKIM3%2F%2Fn8sE7MQbCTgqoTGrnpO%2BcB7UkP6V9VdvJxqGdeTViMIfhOQSAKL0LePIsZHuGcCuf272X%2B5jsbkpUsIkgZu5sCPHOQvvamW%2Fitt9Xp%2F6NhjKwt8h86QunB%2FmWXImeowvsXWmvgjj8lKLAPvKn4vI2j8Vidx0o0nRPr21gsTeNeK3wELbgq8OmVajYMho7y3VWjqDmYFhjnkkSE4CfXVTZijU1ATDas97OBjqkAX%2BhiR7Rsuo9B8h90T3j2HTnmzhWS3%2FcBVGtUBOLhXOXOjfR1c5md8HJD6fGG81r0Q6O1yGipYEjrAlSBPJWLu2uWlMVNvlAKOiBgMbJl8ppFkAx48yfF8CEcUtNHmrzCCVYIEEJQpH%2BoV%2BRj74SJJzYGmwbY1DdSuZlcwVqRswv47M7YOb8pZf7CoeJezffG1mxnVPcWZyYfCG6Z%2FmddILafzL9&X-Amz-Signature=4b44f279b3895f53eb326c5fb38eb865b0c458c31f05c17705c6401265e207d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ2UPQWO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIC3Fm%2FS8kuiI6%2BKyvXgvrtIvp8%2F15CjEZ%2FUws0typMdQAiAjCVmaUqduSfOXc%2FlAwoE6IbfbcV47PIPJrWTwjxvyNir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMnBiPwJOMrlPOD91jKtwD%2BccJLrAdaGkTaVPxRIW8i2h%2BEbMjPfrvnubUuWhcaBAZ7FlPOtp7muOfxcjiapc4q6e0nU7GSrWK7TzKAAjwvbJ69u3pdMk9w7JcfrhfaA2sN1SUeuOzVTiy5nm6IYTrPggbNKrh687uYMrex1AJ5bqq8XSz4X0did4prI4cPignEzlNHx8cRrLbYD67Qn7BB8ApDM%2FdBfyTd1pMUpRAS95e12gJVoaV6RkHhBDfWPe4Hc1Er5ViznaZ9h4xDC4Mx7mxTPg%2FXxYENZENnYT9qjxSfbbg2iSShKynHqxOv8ZIvy7cynD4WXX5rR0WSMGtm5iIklxV1DiZC0nRJqZiKn3QcbTgRosRY%2FtqEhfQ7equ69kAJA7GyK2lyXbVOak0VvUv30cx2erOTLtOzSyAkdNKkXZRRAsitLPtXjhY9AsoASHv2JNlPwq7ja3aOcMRO1w40%2B79qEuG8kVy52w8WBCmCUw5HoeK6Hd2OYrBpn01Ryw6MJ12HBaYXLWzj7g3652mDJI747ClgYKfJnLzkWN%2B8zpaiCKY2Z4T8xZimRu9JEYnWTAv2jOJOd0kFqjL5XjcMgspxX9sUljdVtdXod9HqcoDXEhRvPF7q9%2BC6gDDP71qrmrhRK5OvLUw6rDezgY6pgGlkNN57FpvA0IXkpTSE8Q1n9rI%2BxNW3MO%2BOVDiFlAWK1knr6Rpw7M%2BuTt7aj0CxBEqeWy%2FP3%2Bta4X%2FKs%2FaJQNacq7LCC8zR2ufqrWqnIM2njcri3QkanIRvlTePAut1UfsCR9YlMPY2qTxOKXH1p9t5Btv%2BXoT5mmYqBQWEe4Yc%2Bwak9VcXZ%2BvceyDX3e1bgFgGBFQ%2FAd9SLCxvVveaP8SQcnkC138&X-Amz-Signature=525e63a0439c70886dcede394e456f20b5d244e6bbbb8291572ab85f840bab9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS6JBBSX%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIFMqVhLKH%2BgfPkftEF1LOOvClIyc7EByjE6leB2nmCBjAiBPoxFlqXzO%2BChZ5gwU2XH9JgDUYdByQyL5aPFmBUhdEir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMeWWxSTMMdRVDiCrkKtwDM6%2BJ%2FkLS0CldVT8gtTVbgZZGqXtm6WTs7SZF7qKQa0qUjO%2BLDzBna5BTTNV6gt%2BucbeyKoOscUj4VPlQKm2NkKZCCjLfAS9%2FxrX85DBTDMB0Ll5rke5T6WDbVkqm2WDXcAlEOSJm7HYPoHNrUA1V4krhXj4b6YtreN8qPO7t6sh%2BcAOhbos1LGiG%2FFiPtTjFqYFeEPfujodoKvGjWq0VYduJ5bRmC2Eo72MYd40JHHTOBXLZGfiftayL%2BLfrEZS%2B55lpvc0in1y%2FsM8FuOlYmffYtZm9gPF8ulgu%2F%2BIDeSdxyMfSgJfywe8PfqALTL%2FWDoHXAioTwSWQLztBNweEEcTCpTS75x7ZfRWzMU4XmqJwExZra7hbckZXCdet1AkH13hedtFMlDO1X%2BpxD1h7m44JsiTu6xIn6kA8thmW8d%2BfviBBQhmMYnpb8Fkqx7bptvjk6yk%2BhmqUFp9pV55R8hBGC68UjnjRA3mSzdF%2FR5CqUZ%2FLKgWIdarTmA6ebLshtChUQD4Dcmh9f6uD%2BxOlW9AWZovIj4Vn3xAHjJpNpZ87Qo00tW%2F4CEvMceRgnWBb8%2F7CAiv8ml7Ue8yQPnabqq3d4RWriO57QQqX%2BwZ53uAYwSXeRNXfC3ELn%2FAwm7HezgY6pgEbkHR%2FGui5D6%2BYIhcHMP9%2FOXFiCVmAHfJkCsiNM3eFbG%2BkhVp%2FO1lFkJCQYSIUmRBZoVXyG8L4f6WzXcnFTeS%2FA82EDqZCcCPxmeQ1BGDtxP%2Fxvi1DRVRmuxTLVShEC5ttBVAbtm4UKh0vOMWpTWmjCQlmZ%2Fdn00DEwmph5GHt0WPRN06QLUcyYMmTK%2FlajENdCPHBKs7n9kM0Fiqbyx9XSEiEZnpl&X-Amz-Signature=377ae4f4157d58f747571e349a882085765d9d90d737a95d2075270fea334b31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS6JBBSX%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIFMqVhLKH%2BgfPkftEF1LOOvClIyc7EByjE6leB2nmCBjAiBPoxFlqXzO%2BChZ5gwU2XH9JgDUYdByQyL5aPFmBUhdEir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMeWWxSTMMdRVDiCrkKtwDM6%2BJ%2FkLS0CldVT8gtTVbgZZGqXtm6WTs7SZF7qKQa0qUjO%2BLDzBna5BTTNV6gt%2BucbeyKoOscUj4VPlQKm2NkKZCCjLfAS9%2FxrX85DBTDMB0Ll5rke5T6WDbVkqm2WDXcAlEOSJm7HYPoHNrUA1V4krhXj4b6YtreN8qPO7t6sh%2BcAOhbos1LGiG%2FFiPtTjFqYFeEPfujodoKvGjWq0VYduJ5bRmC2Eo72MYd40JHHTOBXLZGfiftayL%2BLfrEZS%2B55lpvc0in1y%2FsM8FuOlYmffYtZm9gPF8ulgu%2F%2BIDeSdxyMfSgJfywe8PfqALTL%2FWDoHXAioTwSWQLztBNweEEcTCpTS75x7ZfRWzMU4XmqJwExZra7hbckZXCdet1AkH13hedtFMlDO1X%2BpxD1h7m44JsiTu6xIn6kA8thmW8d%2BfviBBQhmMYnpb8Fkqx7bptvjk6yk%2BhmqUFp9pV55R8hBGC68UjnjRA3mSzdF%2FR5CqUZ%2FLKgWIdarTmA6ebLshtChUQD4Dcmh9f6uD%2BxOlW9AWZovIj4Vn3xAHjJpNpZ87Qo00tW%2F4CEvMceRgnWBb8%2F7CAiv8ml7Ue8yQPnabqq3d4RWriO57QQqX%2BwZ53uAYwSXeRNXfC3ELn%2FAwm7HezgY6pgEbkHR%2FGui5D6%2BYIhcHMP9%2FOXFiCVmAHfJkCsiNM3eFbG%2BkhVp%2FO1lFkJCQYSIUmRBZoVXyG8L4f6WzXcnFTeS%2FA82EDqZCcCPxmeQ1BGDtxP%2Fxvi1DRVRmuxTLVShEC5ttBVAbtm4UKh0vOMWpTWmjCQlmZ%2Fdn00DEwmph5GHt0WPRN06QLUcyYMmTK%2FlajENdCPHBKs7n9kM0Fiqbyx9XSEiEZnpl&X-Amz-Signature=377ae4f4157d58f747571e349a882085765d9d90d737a95d2075270fea334b31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZPOINDD%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T125139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQDFy7W3sO1iBTyVO0%2FxG5OUQmmudUSgA55T%2Bg9Gymh7IQIgaHnOR%2BDT8FLSjWLC%2FQ46OFKnOuE%2FvMOtzgzBVcR%2BDsoq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDKSlKg2Xj5TUseTrHSrcAwaAWsEpPYnQZKwwJlNpFfEgqBOA5gEcgyCg5yIJxsHjhrIGw9mi9R9xqth%2Bj17v%2FJQCY1cRwLb%2Fl25eFRc%2FEqhXA7eIxZfheGmaHLEwsaoZENz67we7EXmNDBcDQ%2Bc%2BftPRQRgBKdD7st5PrSokLFtN0FEoN2hTcFHHg4zzJ8vS0Qp3G%2BKnao7BCOkatO5d6fNHKkcZ7Zcep2L5NZxQ9XWj58R3tzx6Fy8j1fgAsWlg5dsk1hnNGU%2Bdv9nN%2Fc5351EEHh2cUPZIaRFUKiYm6OMJoW%2FRSqbxW1DUfUtFhjpEnq3cWdWgwllpJz986uPRW3mt%2BOxcc7y3Jf3gwHb4IGcjpxPHnD5gH4jcbUUJkvc4%2BIhX3Vl7sEO6l4uILkm6rE3Hogu6ohTQ%2F1b9mwsJ0eR615o6p3pLCshqaBTIzJJrKaZUft5UusYFjF9gEcdrG0JB%2FH2HkBmqlu9ir1ntaXwatBIG6rm3t48zVKJTj58a14hqYwJ4125LW1ZkBfyqr1HHM2rqPQPBVGkJJJp4hCq%2Bkg7yLCvUYq%2F3RLTlgUrtlT35b03fL21mNvXN2xUe7W62ULZK%2BMKL6WnGprbkVgkMn53%2BAQYz1XhPDsuwg%2BOIxvM%2F0PM9HJYrpe6PMJiy3s4GOqUBXx%2BtFUZ3ClbCDPiN5qgyy8Rz5uUDZQ7nAbBfLsnoIWYdeVLwJkGL%2FjEpNZl1kW7%2BKLmlkOfOiOkL%2BRG664Qn7Ot7k7HhI0j0a2flMw70ro9R9xfeIbwNfWJVHjup10gMK5PQuRmarIKOqH9Fos7W5CKJ9taDvz51cWeCvUs7NTN0J9lqJHlE4AjA2n7YP930DvrzRpsBgmmh5SXGMWUVCMrkFiCU&X-Amz-Signature=8eef06eff567154b0906e8dfb9120eb20280e11ce747911239c5f71dc3b137ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

