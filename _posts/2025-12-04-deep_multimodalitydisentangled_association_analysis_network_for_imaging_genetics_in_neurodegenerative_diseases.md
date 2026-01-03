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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662U5XDHS4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDcFfgsDuMga%2BS%2FojFb8tdb7XLvL5Po0YRdne3ZK8S6NAIhAOqV6fD5bXtyCpYnEeDAQZHf08Kd9L8vWJ9P9%2BaZAoLpKv8DCA0QABoMNjM3NDIzMTgzODA1IgyQhyWHHece%2BhM2ZuYq3AMwP2oP7iMwBfl%2BeJ%2FPZa6ruPfnFX9l%2BbHU7diQ7T0074VOmhiZxBGmenASdTBudwYB1qVhX%2FfZy1XFPDoOj6AbGlsaUd0OXxNcTjJe%2Fwy6VNZDBsFD2nLWDql3PSUdMIz1wd2Gl0CFkyr0GP6sISpLTvs00LG8V%2BEvyqdOq5vrHEXn3KHEx%2FLKM8qudG8WKvWtT%2F1V35rTTdpAdbCbdLTpBJLrybAa22UC8DR6zaJ2whcRhHToecXtTlhPqmdybk2oJUMAgeYQe5NY8Bu0xKr3DvXGYAND3O3x4vXID1Mynkz4A%2Fb%2Bsv5PaZwscjQEYEycTHegdxOOQ%2Fd5uYm2RS59VYt3d6obkeyvw0sJ22o6vSfcsZOcnX%2Fm1uWBNAN9%2FkXwtddPZPYfrxbIj%2FXMj3PXFKH0%2BsT3b7mSu2LAwGTJ7SX2Q3TcghhEVEDIImKxQKeBRYVMtpeOmr9kDF1cqhN%2FKNVnBvnxt%2B%2B3Aal4n97iCHWGBXe8l11EpI9vo%2BqlFFsFYj5OZTXvtS7F8GIM6lgYuxFP1naE9GPt2YfsJBrdJR5sbtKC%2Fyt1jogF3GQou%2BMxLuBXjnHNQ0lfMhRcWBx3ZNX8bJKr0yz3o7QreP0TbK2nnbsRXJerRsAnKTDkp%2BLKBjqkAVvDGde7SrDXAGF6C%2FgLQIvIHwttfrdwT9uSzYfBwB1rkVmrY%2F3KLHTW4CbxB2EzM6%2BFAv6gtfEmEDYQi0idoC%2BopSMIp9ooeU%2Fu6P2U%2BbL%2FG0mi5UAA7%2BOgmQSP0QWY13FVJ0xTQkpwhGkoaRxYW3GE7pxMDVSdtgAvKyyBTJW0aciqtdbqVbPt%2FUecMI%2Bg89bU0i6f%2BXmuRpPU1kbdYQCF1Zh6&X-Amz-Signature=272225babaf5dcca5cbc69e88af023513b502079264719e0d0489e25cd7d215a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662U5XDHS4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDcFfgsDuMga%2BS%2FojFb8tdb7XLvL5Po0YRdne3ZK8S6NAIhAOqV6fD5bXtyCpYnEeDAQZHf08Kd9L8vWJ9P9%2BaZAoLpKv8DCA0QABoMNjM3NDIzMTgzODA1IgyQhyWHHece%2BhM2ZuYq3AMwP2oP7iMwBfl%2BeJ%2FPZa6ruPfnFX9l%2BbHU7diQ7T0074VOmhiZxBGmenASdTBudwYB1qVhX%2FfZy1XFPDoOj6AbGlsaUd0OXxNcTjJe%2Fwy6VNZDBsFD2nLWDql3PSUdMIz1wd2Gl0CFkyr0GP6sISpLTvs00LG8V%2BEvyqdOq5vrHEXn3KHEx%2FLKM8qudG8WKvWtT%2F1V35rTTdpAdbCbdLTpBJLrybAa22UC8DR6zaJ2whcRhHToecXtTlhPqmdybk2oJUMAgeYQe5NY8Bu0xKr3DvXGYAND3O3x4vXID1Mynkz4A%2Fb%2Bsv5PaZwscjQEYEycTHegdxOOQ%2Fd5uYm2RS59VYt3d6obkeyvw0sJ22o6vSfcsZOcnX%2Fm1uWBNAN9%2FkXwtddPZPYfrxbIj%2FXMj3PXFKH0%2BsT3b7mSu2LAwGTJ7SX2Q3TcghhEVEDIImKxQKeBRYVMtpeOmr9kDF1cqhN%2FKNVnBvnxt%2B%2B3Aal4n97iCHWGBXe8l11EpI9vo%2BqlFFsFYj5OZTXvtS7F8GIM6lgYuxFP1naE9GPt2YfsJBrdJR5sbtKC%2Fyt1jogF3GQou%2BMxLuBXjnHNQ0lfMhRcWBx3ZNX8bJKr0yz3o7QreP0TbK2nnbsRXJerRsAnKTDkp%2BLKBjqkAVvDGde7SrDXAGF6C%2FgLQIvIHwttfrdwT9uSzYfBwB1rkVmrY%2F3KLHTW4CbxB2EzM6%2BFAv6gtfEmEDYQi0idoC%2BopSMIp9ooeU%2Fu6P2U%2BbL%2FG0mi5UAA7%2BOgmQSP0QWY13FVJ0xTQkpwhGkoaRxYW3GE7pxMDVSdtgAvKyyBTJW0aciqtdbqVbPt%2FUecMI%2Bg89bU0i6f%2BXmuRpPU1kbdYQCF1Zh6&X-Amz-Signature=272225babaf5dcca5cbc69e88af023513b502079264719e0d0489e25cd7d215a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD45J2HU%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIAgSHE0OJ2UbsK6PJfq0annqgU9nPQcbiBjmGQ0s4jYrAiEAswvY2vd2J3FG26W8KVlTisAsi3F8AB0zz12FyyNOP9sq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDAMkYEoImCOzHwWJYyrcA6w2%2F0kFJNPwJOMoLbHrjekOhB7FFzNmqUe6yk8W9sq5Xfqp1bOHMAS87pHkSMKfDAgFsCN12g57w%2FFpGIclDxiAixci%2B4Hr790e38hd%2BFkoebSlCSDB8kN%2BCksV7C%2Bju9O9H3tnSC3%2F8TvruY1orirZkXBPvOYLLpm%2FR2jm3xoX%2FbHBVBSDVLE19eZykwS0HXPaYyWUsD%2BB2K6i32vxajeFUWGJ7jItxT1jhEQMNZsyvLJtASjiwJrflZusErmbYzgoYGYq6u6zuGlJ%2F03laWYcXY1vZ97ftHcdZgBqZbkvbr%2Fm%2BMOgmP%2BOxQFCCuZGnj2%2Bjb3Caf3QUL12e1goV7%2BJ%2FQ1YWdkMtUgVjXa9YWLRvlqAlgjo7TAqYCUiLY3uWRT2RDwiyvZjgp7w%2FSJB9xC9x3icOg5QD8AHFWYQgqFFUFztCOpOIN2%2FSf3q4ucfG%2BBxC8HG5%2FPSMzdDyc4CF7IiukfcE0HsbeTK0edeCWaFId3iwD1JX%2Fb8otGkh%2F%2Bq9%2BwHty0jGhXzJ33HJU7tVt%2Bw2C6N99iWASqzOKpUjTL%2FuNwPqN9ILWXSKu%2B01omUCgnp1wRskp6QlKeMboL8ydHrOuy54nRdwztO%2B%2BXz8QeurJ76u3XOWRFOhKK8MJmo4soGOqUBmcr%2BHM5wpRoKWFCcXCCjIsRPc2yq9fbGLXg%2FCWadj7D5MPDNtm6bumoyXHl6MwPrnQD6Cl1ZFw9eurBspO5iFu3HXDC9YrMpWpGF9olTDryeBql9R0bbQvJqJj6K7JsWwno8H7JZFk3BYqrg29%2FTzqMCzKo%2FVXWiyso9fiyS1Xv6G4j6HxN6WK4srYjNbe1fpdgm9obrUacb1VXG2LfcEScS74ep&X-Amz-Signature=913b08576d852cb295d59b4230b385613e6f8ab18229fd5451073b99de9a593e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX4O7IKM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIESbADI9%2Bz4Jg2Q1AVG%2BnRFmwze%2Bwt5hfiUiYlqBIk02AiEAjkdXCmM4UCofmzqY%2FJWoThTiKXHxePbtRRxMtlMyaQoq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDCYeghk7yM3Mgtws7SrcA3NAZkD%2FJwu5tbPbxGmQMGCWZm%2Fjlb5LKeguttvGTLhUF1w9dzbSZ8ubkt9HLccEk07Ed4TpdTdF%2BXCUSTWTJXANOdenfnxzpT5zGLAZ3YLwSealz0uO1Q94tp9cZqnkxgjNZ0DP%2B9Nr0Ik5zbi4aO%2F8kwcYZ4R2aO7lrp6QuIoLD9d%2Bv1jM%2BrU3O%2FlX5MyhtzhREnQJlyvljFLfTizKnI9ZFjQgrFPpikc5rjlPnPswZmXdaW3jef9C8MZDyCgylR2Zg8cKoV7JsPmWTXiL4mEz8GPmm6pdNQ4MSdlEFOf0u5z3CsE59i1KVMl8HCDV3kZX7O8vZkOHUtjLRRBcGvUiG93HduoP1B9FdzKEHRl%2BKst44ewjzAAvb4DTc91zd%2FoA9jegssLOhMmK43uCviB0Md7zaV3ofB%2BrOruUdXqabRFEDGHQ%2BUPW1PMc8ECNFLzWcmNKuOqSTIOdrjOO9LAFpc0GPB1AyiyPNtBcPMpgEBZVhk%2B0Y%2F4nUbJukGFbJnhb5NEfH9ojdOGobxWgRRShmftrDUdvO7Axm7XszuLWA4y0uhve5eUpRIEvPX9rnbt4r7zLAAmBHjZmD8RqWec6m6B7E1DCu5q824up07O%2Fqa20mA7WfXMm9ZaIMPKn4soGOqUB6FGgG451jrIqYlSmDWN0Bvz2r7AbViQlUJBMqoNfOkwG9d0M%2FK6dtH%2FmC3v5s9gCppdfmsWuEWEyuKp%2FPvlXCMlzNQXleu4UaJ2X8DRKiIJhvglrqmvFERWQfUN%2BJosJWyanzxZdikzGbMSwSx6PRIZqd%2FoNIYaGorTHht%2BQ93szHpQ11HDY7Q1c%2F9RLOZXf%2BYGIya24DNeXOGJ4ut%2Bp0wCylc1j&X-Amz-Signature=43fd6d2e69cc7a5e1f80e60ba9bbd4750d18549543c1c800c0297f971d369e16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX4O7IKM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIESbADI9%2Bz4Jg2Q1AVG%2BnRFmwze%2Bwt5hfiUiYlqBIk02AiEAjkdXCmM4UCofmzqY%2FJWoThTiKXHxePbtRRxMtlMyaQoq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDCYeghk7yM3Mgtws7SrcA3NAZkD%2FJwu5tbPbxGmQMGCWZm%2Fjlb5LKeguttvGTLhUF1w9dzbSZ8ubkt9HLccEk07Ed4TpdTdF%2BXCUSTWTJXANOdenfnxzpT5zGLAZ3YLwSealz0uO1Q94tp9cZqnkxgjNZ0DP%2B9Nr0Ik5zbi4aO%2F8kwcYZ4R2aO7lrp6QuIoLD9d%2Bv1jM%2BrU3O%2FlX5MyhtzhREnQJlyvljFLfTizKnI9ZFjQgrFPpikc5rjlPnPswZmXdaW3jef9C8MZDyCgylR2Zg8cKoV7JsPmWTXiL4mEz8GPmm6pdNQ4MSdlEFOf0u5z3CsE59i1KVMl8HCDV3kZX7O8vZkOHUtjLRRBcGvUiG93HduoP1B9FdzKEHRl%2BKst44ewjzAAvb4DTc91zd%2FoA9jegssLOhMmK43uCviB0Md7zaV3ofB%2BrOruUdXqabRFEDGHQ%2BUPW1PMc8ECNFLzWcmNKuOqSTIOdrjOO9LAFpc0GPB1AyiyPNtBcPMpgEBZVhk%2B0Y%2F4nUbJukGFbJnhb5NEfH9ojdOGobxWgRRShmftrDUdvO7Axm7XszuLWA4y0uhve5eUpRIEvPX9rnbt4r7zLAAmBHjZmD8RqWec6m6B7E1DCu5q824up07O%2Fqa20mA7WfXMm9ZaIMPKn4soGOqUB6FGgG451jrIqYlSmDWN0Bvz2r7AbViQlUJBMqoNfOkwG9d0M%2FK6dtH%2FmC3v5s9gCppdfmsWuEWEyuKp%2FPvlXCMlzNQXleu4UaJ2X8DRKiIJhvglrqmvFERWQfUN%2BJosJWyanzxZdikzGbMSwSx6PRIZqd%2FoNIYaGorTHht%2BQ93szHpQ11HDY7Q1c%2F9RLOZXf%2BYGIya24DNeXOGJ4ut%2Bp0wCylc1j&X-Amz-Signature=4d8108d8bee98c65d7c28eb2837ba8bc6b85582553add5fdf7548a4fc29c84ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XZP5MM4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIGhktZL0KL%2BjbiDLXS6o4WewNrRViCxXDBkVjQHDI9vmAiBec4UesUc8VRsqqDFch%2F9tcNn%2F6fB9ZwH%2BZJ45G25YVSr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMQg2%2BuJgxnfnrzaS%2BKtwDa8bJW%2Bw2fM7d%2BgMkq5q9hz5kmK%2BejeDGw3drKIJLGacACAotMtOB2BbmsegGLJJONBZ4XxYL3iYdVsLs4eTP%2BGOTZAN0uwG5hIrUicH6aq7mgtkx4TKaHodSeVrTvq2o3xvPG%2BeIwFBJFSHyZBlAPGNBdSXfhx6W%2F6mtoEhxUQmbKtx0z%2BK%2BRU2xDoX5CCFK4SwX4PvS4lvytgY5kikRwp6sBDRpWoMvvmC3yASfFz40ObV0TaSanZjlOpY2Zm4oUFK0qTreSvxr4LXT6nn1pFhT9Q%2FA3dBFHwnV9CgkTisWmTnM5eZXR5mI5yKeXxV%2Bch2kzyIMvgOLGousEjJbfs%2FqRIJqoBT0HAWfn4YqCjXZS6HTVZbGiJ5bWDO5st5I9PWc%2FCCBI13x2JodlNANeRFCojZgr21TAK2s7Hkn9uqDkXoCV%2BsxfTTIU1QkJHbR7982gZ9pc9AQPZxYNlfiCQQ4aVOW%2FysHLZiPOI5EwynPFseZ2TrfsXxE2luZviuvtuA0TZDsPEmfvEDjjrclPeqBRHMe5YxcLnv5Gsh9SBJ1F3ZxdicNOFWPXMUYSZ%2BaG0dQmkJ1%2Fj5sDN6l7nRIbfIeqGA8UI8w49W2M6b2NEZty6YybmG3bCMVrjswn6jiygY6pgEOLFK%2FwlgscCkwtUMevVIplGQ1w4UQkd%2BKEWefLR8hbqnFmQVtrxwfTUhBj%2BvK0IYpRx7HpHzsPKCtBNgxtxwx3Kc%2BooQzoahw8kaFUNCgK2yqSjBy6FfkL7PgL8xUWto633lu1xh0CkWakSAsmgrrsp0pMzRw9FSY3PmjHozBolPKX3qk0WHDK0VCRMMsKMJQvJBWXRjWNyt%2F2Ef3RrJ8wqrZe16O&X-Amz-Signature=0d485a3f6d5127a3a6340ba2b3e73e11b940c18a89e6a52d72f2847d3e731f73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3UYQVWH%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIGLUSYmEcaJFzzeKIErWXmV9jQ1xueGnEamUkO%2FIvrVcAiBfIlkW1R5K%2BzCKxhgHUacKPE9YQGXd0GrgbjRyrwypuCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMGMlpk4hhPtz6NNihKtwDfdj9TgcXrNhkQFxQwhw9gL8ZmMbCl6PXGKNuh9SHZ9%2F8AMs6p6pLUWZXknqc67SIm%2FXhfKDJHZ3eebjzyWpktb0hV92ZcQFPuJIkwP6mUPsXmNs4ZzzzLSWPynjF3mJIyLQJ77KFtAP57RQhntN4iAI8NwcuMHJ19PmYa6Gq%2BuSYokGXqUwSMAePdaGXkSZbYOcLzQT%2BamnhuxWsyCw63lujBv1yC2pu8xAtfYQGnMr5bG2VvyJ8VqIytM3bmPKJadm0d%2BWKEptn6IUsqDEgKG57c0%2F11%2BnJgtHqxQh1nrvipb0xMuUokflgRHrsV5whwlQJurm5e2Yn0XGYcO8ybueRpVxy6ayBKrY2rD75VE3ykPPhwibFSI6x1fOtmLqDo3NrEy%2BKv%2BX3hVo80lhfzEWD2EcMnYj7gC2orOBoZ%2Fm8ykM5APLmO74U%2B%2FoQ1rSPmUPRMF2PMDKlmUEwLKWREeyOtu3CjyV51lXZW%2FdtCGkT6hsdapU19%2BYYL2ZcpbNbYoAn1acwsN7jobUL6ai3GSXD6o59yJAgSDTsSfBCKiL3TQbid4qpOIFbpT%2F5dsXz6bAb3Oj%2BmsVb34jHjBGMTDJl2Oykmu7qCULmDZZ%2FlyqLPtTxLWY41JAw0zkw5KjiygY6pgEiXRNiWyT0ypKQwlRFWbgwofE84ZJIMcvevHeW2ENUYaCYmFhyaHLd8estVkWys5dNevj5TvaAvZZWRV%2FNchlCUW7onRdDC6iovWN8RS7IkNfDRzWfghGBxVFHQdCsd2lK9SsuJW4jwy4VOvotN%2Br%2BCfBZoADqAOKitzbyCbBPfikGNThoYkxtu%2B%2FPAuRdr2IZOq58vc0nvzbFQAXqRh%2B2AN288hSr&X-Amz-Signature=0700e1be86f4aeab1177f97978577d9633a0572f038c17438c2496ce3db55c82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOAT6752%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIB%2BfAL%2BPAX9AR0hK2qHS1fJayoArFh0DRa6x66wU%2B%2F27AiBzGWMasjlepn1tj1ztgVa7A3ikp%2BNDnroebmE6bXwj%2Fir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMwUDXCm13Ebvm%2FABWKtwDDPbxc9Sh2afIPErehevY%2BV1ubb9rTtNYaQNoBwDLczFfMVCmJGOcKtgwljqJErdifrmFP4ARLkyLxCYFqQKRGZNmj50ZkW1RzpZMCQgJUaIqEmgWKgPtf4yyXnQ94LlM%2Bwt4ITlRFPjiMdaPR6ox6CPyIiyw1VXF6RkQH0wucBxyTM0%2BdEAiXL6ds%2BIN8Z9Vh4ZyAxlDhTmXli3oK5SM2z0Mq%2FNZwzpzlFMuexOEoLxbW96g%2FyUdHIdcZdNyY2YTRounqbn8mi3mG%2FQsgZii9aXhiyeVdX0cGJPTvpwgKmys6OA%2FSLvaLAoq88Z0sUdx8lajRu34uZhOGo7fBjEHmN4Yis8R%2BfvktbcRtmw2uSvYm3u9YuDhRFBc5y3%2Bp4227B%2FDCwmxsyl0zaZlrUdWxr%2BSNDb%2B7xPtzRGx%2BPSivORFsJiiZ7ZYz6aYFpedEflmpnUGntPY3hX8dfz3C7cdaX%2B6EyBMa4taFR1wlMuDS09%2BlUAR2OWoKpW%2F%2Behx8dFMdQOE3gthTir%2Bqjr1RPsQInjBJ8Ieqi%2BEI00y6K8fck7bKkb8zmFmT5aSV34GFwINVt90bdbZLZxVvWSbtYhAQwIivzyIN%2FLJ4OKHQ9vOH9yqvWgJlPWBkjgrzQAww6jiygY6pgHyMnl5TmREZPLzmZpVxUxGGcNUuASM95BrFUaFPv90NyWiN5AqGblkcBkHiKpJODmxr55eP6V9kMocVINXe5KsJW8ZYMtQcY7pBKp4K2bOadvBq1SS5W%2BmN%2BAsGFJQvOYXX5zyrZZmtu206qDjpGxzjZsf54ot6ZhRUFuDp4H6rtpII2mnV%2BBfb%2BDXqo9biUYvrewY9jfCrQrPjl92p%2BtAsCDwbxB5&X-Amz-Signature=8b86dd8378041e385bb4c75ba2a1d9d78a9593a93e2e9ca6aa34fc2ba99ca1ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E6B3W6T%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQD9LggKwpBzYKI5YPDbQmgVFNTzM6d1FbXgURynz%2BY49wIhAInOQvTe2AskfwupI%2FePSxxkZ5JQkwIDPvHDyB2SelCRKv8DCA0QABoMNjM3NDIzMTgzODA1IgwHmXT6Q9hlr8P1n7Iq3AOZ9Yih8cZ1hwauetl4JV43iJzv2bvUnlNSlRFc2PCPe%2BWA%2BPCS15GGLLzjFQOcvOt8uY7GAr0fglx1MSP4jx1VrB8df8jI4CFR083BAXKRs%2FJD%2FWN%2B0Z4GbKHkO61ejn3Xygib%2FFjyZ%2F2LsoBViD3RcrQxIbgojnmoli9HNgUvpO6oc8pSiJj575LYgj%2F%2FUyADAzseNNRVd%2FtZ5jwXU6jVWICUazHALNzTT%2BK4lltanicxGjFGxxmH91C7IoTdZ1ShUWOFTJQWHZSEwsN7TlWn2VQIvLIlTn1oiaOY3x7kAJ54U77IQPf%2FfXJQzNTHhHJa8RDT8GQ6aUS5cotQE%2BXJcTVdODwUyqohwxoYzJd62YxKLHeFdOTSfv3N%2FH8YehHtAuksJN8i3YgoNV0%2Bfqpzc202Da1nZW2%2FCbHNKHkyNEi6pI0dcbZmw6ncaNW2F0%2B%2BxA2p3ekdHc2L4KOw4kXGyYxwAaPt%2F18SJOQg%2BAMWbcrIhNCozliE6RnxtUEDF3SgNljTKAVnRaRKGUDHBZyVSEjQMzdzlPJK8ebKDZL7TUY8dlS3yQMHLkgZ3AQTn5hhXwKDv69X4MI2NNsBV6C%2BWMoL6%2FahhjvAxWoNX66jwGKrHpwFsaP6IRpjSTD5p%2BLKBjqkAdvCiz%2BiQxzPJpuUzvyG6YDuqidFuapEevW5lDKuicyYpwl3iCTZvKjOYOrVlffUMZikoWfIy73suWZrwTT67KXsL%2Bl0TdZUxmP9CJ4CgWh51L%2FrYMxk9HCER5CuRflGxl8tphwokaFMAVJAtGTPDuc5Jphh9eC5mV8lEVZjMCfTQhERTvu5Au8rwkITb9nD9pPLUfZgJV5ti8foU%2BNeMZMPIBsI&X-Amz-Signature=0bf3bfd001b6aed0ba6c1249a8e53631a3d471c0730abd19520e6ac45e132977&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E6B3W6T%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQD9LggKwpBzYKI5YPDbQmgVFNTzM6d1FbXgURynz%2BY49wIhAInOQvTe2AskfwupI%2FePSxxkZ5JQkwIDPvHDyB2SelCRKv8DCA0QABoMNjM3NDIzMTgzODA1IgwHmXT6Q9hlr8P1n7Iq3AOZ9Yih8cZ1hwauetl4JV43iJzv2bvUnlNSlRFc2PCPe%2BWA%2BPCS15GGLLzjFQOcvOt8uY7GAr0fglx1MSP4jx1VrB8df8jI4CFR083BAXKRs%2FJD%2FWN%2B0Z4GbKHkO61ejn3Xygib%2FFjyZ%2F2LsoBViD3RcrQxIbgojnmoli9HNgUvpO6oc8pSiJj575LYgj%2F%2FUyADAzseNNRVd%2FtZ5jwXU6jVWICUazHALNzTT%2BK4lltanicxGjFGxxmH91C7IoTdZ1ShUWOFTJQWHZSEwsN7TlWn2VQIvLIlTn1oiaOY3x7kAJ54U77IQPf%2FfXJQzNTHhHJa8RDT8GQ6aUS5cotQE%2BXJcTVdODwUyqohwxoYzJd62YxKLHeFdOTSfv3N%2FH8YehHtAuksJN8i3YgoNV0%2Bfqpzc202Da1nZW2%2FCbHNKHkyNEi6pI0dcbZmw6ncaNW2F0%2B%2BxA2p3ekdHc2L4KOw4kXGyYxwAaPt%2F18SJOQg%2BAMWbcrIhNCozliE6RnxtUEDF3SgNljTKAVnRaRKGUDHBZyVSEjQMzdzlPJK8ebKDZL7TUY8dlS3yQMHLkgZ3AQTn5hhXwKDv69X4MI2NNsBV6C%2BWMoL6%2FahhjvAxWoNX66jwGKrHpwFsaP6IRpjSTD5p%2BLKBjqkAdvCiz%2BiQxzPJpuUzvyG6YDuqidFuapEevW5lDKuicyYpwl3iCTZvKjOYOrVlffUMZikoWfIy73suWZrwTT67KXsL%2Bl0TdZUxmP9CJ4CgWh51L%2FrYMxk9HCER5CuRflGxl8tphwokaFMAVJAtGTPDuc5Jphh9eC5mV8lEVZjMCfTQhERTvu5Au8rwkITb9nD9pPLUfZgJV5ti8foU%2BNeMZMPIBsI&X-Amz-Signature=54c2abc9c128d7d5f2027a6c760ce9875fb904cb6174afb870c268f0f6dfb5d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VQV3RIA%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCICuvb%2BzaiGnxgz3%2FBHA3Ya2MKoSzT3OlkiU%2Bx%2Ft1ldXKAiEA1%2B9bDQjww1faEqke9VRtH9cNTZTKIIoPkFPXEekFKigq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDF5MrhgiVWTov9v2pircA6%2BZrJloqdjM8rcVCNN%2F6OgUYq%2BPpf2IN3HwbCOuLKfuEOVMma5JIGVTnnKsiPogHwaCDM10j1w0BUvjO4jnCb2Ty1C%2BA%2FJRnnQQ4FoJJIGGmBnSYHm4F4xLmHkl3syaGg8TYnSfgUmAcgAiKvRgoYrz48k%2BXaHIcsWu3eFuXfaz82CBPpkaNhMwRZF5lKF7B7zJimRIALb2F86u6KlRTMRZHOCRuful1ahHIdrOaSOISJiGv5ef2BYXKlOZCuv7GH6XWXiRw8DJWdvh%2FDXETMTcJuGkFPP2jQYMinG6%2FhO49AoH7oHJ5Vbd3PRBZdZ2a89RMKLzCN4bo4ciP%2Bv3GdQ5qLc7kG0HSka%2FRHxyC6dZd0XmY5wWuF0xGYG%2FqwbM%2FeinWzdoKTR%2Bc7Iq367zEwGdU0Dks5ILVgbeuc%2BCIhxXbYkQ%2BLNmN%2B%2Bpw89AAxDejhwLb5Bqa1wHMTDLsldoOAF9fN7uPw5RvQ6S5%2BomUYV93s9QHalIBAlxUvoqxctvmzL5t%2BzmtL9cBX91evoNV%2Ft84XY8maWQYgEQClfo6xWxL9GBoiApdwZWsukHUPGgjcXnerK9p29y66shH2FqCDiWYgL%2F4Re2smQNGWMlG1SvpFnwdpWQbJ7GwabwMM6n4soGOqUBjhVkIhU0wediHNxgLLNYbPvWRx3b6kystCB5dnfLa2UsQsqcN3MiG2u3DdxFftY7UR%2FRyu%2Fw5WM1ep9%2FmZBH7lNQDBncl5X34bGae3oo%2BfZgkK0o7ZLa5G42YWvyhKOmxIvLm2Rxr%2BXzPQOuiSjf%2FliW0nL35HAvcI4SjUQKuNqMYNTq1NueTi99fMndGVsrvZNJjgQVddOatTG%2Fb0r7rejzlk5p&X-Amz-Signature=1714a2dc9a89ab5c1170d0af36b5c469906753317f8a2726b3b8349ea7d827e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKVEIUDP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQC7vHf6Q4d0YSYUx4QEoe%2BuopVe6YH3VqjWiSRicWY10wIhALYZ40rv%2BzwV%2FkJbQsn9P%2BEAfy5TRk1VySD1dgeMut9gKv8DCA0QABoMNjM3NDIzMTgzODA1IgymNByebVE6K8HZxUkq3ANihK4CpB0uFbdEnWlmR38Jff1osbsohtTIvW0Y47U8670XA%2FNfFZXbKemMpDO8Gpq8WwZk5YhNp0mCdHhtBWBHMQv%2F%2FG3JseKZgY53A9hq5AdGs3USwTqRDWoAx5J9%2FfVQK28zTe3%2BvGeutGIsAcwzMAECC0GX21zhQRFsP9laWVabH0QdjbhG5AQTRhNridWpr%2FqNpAOToR0mDzix9efDanrBkOb4vJ9y1eRlMlUEeELUrCCTg4AF%2BgFJM8V2TbljUdTCbM4P87kRq424iDMD6Uo7Ka9xTYHlQ%2BHJbyU6os%2FsIPYvIOGN4Osq12JMua5ZmqHkfAi4QFaQHKO9eo8dr0mDOB06weBQq2XYfmT1HHzcjqiSHkxtgfuGcKq7WspbNqni2YjcXsX4wyusTO6Hc6USRvUPcvw7G%2B%2F6r1oDM4iZOlomaypOiiaR1IWnjsQCEfXgodo7DBABdzszY4AE6T6uBA2Ygj5efSl6fS%2FHjl%2BCyJQ%2BNaE3%2F%2BRgA6iJ8jneWLlqyxhJR5d3SKXXbu1kuJ4m4C8vG%2FfdyvXcStnQ7HPyiyHF1H5k%2BIBpjbQOf%2BLp4P48%2FyiCqoozm7uV5b4UBejMbzelZoXkYON2HOUihSiYQ3BTY5NfI6ELWDCCqOLKBjqkAQmzncLuQ68LM5aXkyGUYz00jY8%2FJ3pkvneQJl4L6QnU8PkMuoi20TxnW3kg7iUHp9DIQy%2F0KsNX37Hqfaw7Fo2uSz1cH3JPLTFIYpKzGO4pRlI2n87%2FdbQZh9L75WqfPFnL%2B4ucg53LZQdj3Ab2DU8se6Zgf4Rb%2BsIKIAkvbYpYfgTuff%2FGC2sq6YL6KRufCmry6n3Hy8I3cSMxjgg15GRLjUCf&X-Amz-Signature=254bc4b58b9fdbb048f62a1ca43180b52880243098ed8dcf6f175aa6f79a005a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKVEIUDP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQC7vHf6Q4d0YSYUx4QEoe%2BuopVe6YH3VqjWiSRicWY10wIhALYZ40rv%2BzwV%2FkJbQsn9P%2BEAfy5TRk1VySD1dgeMut9gKv8DCA0QABoMNjM3NDIzMTgzODA1IgymNByebVE6K8HZxUkq3ANihK4CpB0uFbdEnWlmR38Jff1osbsohtTIvW0Y47U8670XA%2FNfFZXbKemMpDO8Gpq8WwZk5YhNp0mCdHhtBWBHMQv%2F%2FG3JseKZgY53A9hq5AdGs3USwTqRDWoAx5J9%2FfVQK28zTe3%2BvGeutGIsAcwzMAECC0GX21zhQRFsP9laWVabH0QdjbhG5AQTRhNridWpr%2FqNpAOToR0mDzix9efDanrBkOb4vJ9y1eRlMlUEeELUrCCTg4AF%2BgFJM8V2TbljUdTCbM4P87kRq424iDMD6Uo7Ka9xTYHlQ%2BHJbyU6os%2FsIPYvIOGN4Osq12JMua5ZmqHkfAi4QFaQHKO9eo8dr0mDOB06weBQq2XYfmT1HHzcjqiSHkxtgfuGcKq7WspbNqni2YjcXsX4wyusTO6Hc6USRvUPcvw7G%2B%2F6r1oDM4iZOlomaypOiiaR1IWnjsQCEfXgodo7DBABdzszY4AE6T6uBA2Ygj5efSl6fS%2FHjl%2BCyJQ%2BNaE3%2F%2BRgA6iJ8jneWLlqyxhJR5d3SKXXbu1kuJ4m4C8vG%2FfdyvXcStnQ7HPyiyHF1H5k%2BIBpjbQOf%2BLp4P48%2FyiCqoozm7uV5b4UBejMbzelZoXkYON2HOUihSiYQ3BTY5NfI6ELWDCCqOLKBjqkAQmzncLuQ68LM5aXkyGUYz00jY8%2FJ3pkvneQJl4L6QnU8PkMuoi20TxnW3kg7iUHp9DIQy%2F0KsNX37Hqfaw7Fo2uSz1cH3JPLTFIYpKzGO4pRlI2n87%2FdbQZh9L75WqfPFnL%2B4ucg53LZQdj3Ab2DU8se6Zgf4Rb%2BsIKIAkvbYpYfgTuff%2FGC2sq6YL6KRufCmry6n3Hy8I3cSMxjgg15GRLjUCf&X-Amz-Signature=254bc4b58b9fdbb048f62a1ca43180b52880243098ed8dcf6f175aa6f79a005a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYQVBBV6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T042114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIANSJvxgn5evrK7cembPT95YztXani5vr5HUNdxEsZ4JAiBq4mdOLilTsb9pZat2dwnI6UffKgjT2lgHtHd6r%2BhPAyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMnVxFbBMX8NjU1JVnKtwDR%2FxVIxO0kVj6n5V3xFm4zEtUUaW%2Bxu2WE%2BmZTH%2FIpQIOU29IhZu7vCDJZWhwm%2BDnXNwZuxLnb7iTNHk73qwZb5MqthxyCX0JGDNIJB8T3RcorH2ZmKUlP24xSNw9wPwPBUE01wPCXicBvlEIJ7bHvpWDtsSoETacQIZiRbPzthy%2BgosjFMJsbJm%2B4gKzv5YwtB%2F1KAnZkqrzDepu8uhueGgONeBZmUpAG39i45Cjrn0rxLW%2Bgs9bSCX2ZTUIv4RaufGAb6Ar5MhKPrRQ2kePQLZD8I6xotgxH8yLz0LUIhT2d9IwedU%2FZaDPCrP%2FeId4qjjxWHTu%2BRWfLaMDKOLAObgBifHZ%2FTvVztbqNizfjZ0iSFYZSdMLBXPnpiU%2Fp2NLnzvqf7yQUnnD4uqflpxJoIUwdGMo%2BZW5T7rkWZX1wvQBs8OhJACLhyRBJTlCJStcckQntsKEEpTCaPPBdZrkvq6tCyB4A94MaKXV2%2FLkk4HVDW%2BgK%2B%2FC%2B4FdHL%2FEd5sqy7lvRQ8l6xpIVaErPfzWG%2BN2%2BPqeu%2Bl%2FyMTEiX97mspD%2Ft2Nk%2BUNAAnq0hB0lacLA0iOiiDnWeTidK82a9H%2F2LkmdsEbzmaNkbc3EV7vr1HREOxs5PuPXRAGm00wmajiygY6pgHFicNgI5v5eQ%2F98qtJop166njEVfP7PogBk%2FtxUsk7EPU4qQ7%2Fs2W10cZDXuniG%2FMIimou7MXqWcmnEnJmi0cBYujohSKetW1hBvmrkRV%2BQkbVfIT1F37PtVxlxdRdss7y57PTh%2FaO3Mor3jZydi%2BVZ0tgS7rsukCciX9bnECKapnYSctM15eLrM7FqHYKhZ5J4zOznvWrKjAzS9nMcwr6lxlGsVkH&X-Amz-Signature=77b742423c0841a0412fe10a117717167586ddbf2d8c3fdb1fc8b42fea61a2bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

