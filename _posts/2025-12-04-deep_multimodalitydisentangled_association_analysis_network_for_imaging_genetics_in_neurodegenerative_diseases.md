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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNTCRRPP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQD4OLP34V%2FLSY3Qkz6MKsOJUTzJJpzZGRzqwiLhNIzOIQIhALBS3DC9zHmaVDSdmzXd26h3s3FHN0buHC4OumHgtBFNKv8DCAUQABoMNjM3NDIzMTgzODA1IgwMg%2BCbbha6%2BfwNrp8q3AMiYjGGaD7l%2BktTtZlMBYT72SCLx4f3LA6MIPBLeT0SKU6OB55ZZ92%2FvPVqDaQkbLRnDDjGTFb4Xg5G6O4tXvFv7BQYhg60aJlpn6AnMVMNx6saz6zQd6dHtOQ6K284H%2BRn%2F9nWMItgnguXe0WR4Dn4b%2FRrRTg1NVoibxzzmVNxg1KeXo%2FBVW3yHtYdWEqEKSq3SUHB%2FSj7DWyzA1Yy1cfBheLvKAFsZ1qyxnNakE3e2MKeJA66eu2jkLc8M%2FNjhmNQ4mXCRsHpvApnpHLzln2pfs3eDIGQUJ57vY4n4YmIfaNdfjlc0FrUI%2BSQF1Iki35ZAwh3m0RwcftzXP0%2F7%2FP%2FlXzgtPoU5CWz3gXshLweNv2FMc0YS7JPskw6siN9TLI%2FfYUBUKrQv4giw70Tf9b8NJ4veoto03b2LP5KDnp5DM9ifA%2Fa9mRMsBPYg86SN9kst%2Frak3wnFnBypG%2FlaALNPuKE7fc8Vp4ggh8elMPJW3gQCueqeQWWmZiUVZADhe9OuP%2F7Yd2diyAZcRySTYQqsJoaSZffJqR26T8s7iwBHaNu1S%2BMbGFTdC2jlNIBsfiWgqhtbuBHViqH1wckRDntH4i4FLHak7Ow0kdvKUM4Tyr4y6%2FeAzJyGw%2Fn9TCkx6LOBjqkAYmeIid074sfGC8odlDRa%2BdCE%2F9zlbMzfacjrh6uSCizm%2BLSRA8Yah0F90U6Apzjg42eP%2FIU2bB5Rxd%2FCW0UL4wS1WUDpfPt4WrOa9MEOYH6ubynisDTSPVWUumem3%2BMVeWg6QavAP%2BWlfud%2BUecY1RniKEQkFgOBciG9l7AbQ%2FCP7QHMIFbhqYfCm5xiSBJcO%2FxyXP%2FO9Bujtoqb61EZGNdMCYt&X-Amz-Signature=3fd649a1a4f87876c17d3a8933d2227ac53eec657e978b53a2592bfb527a136d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNTCRRPP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQD4OLP34V%2FLSY3Qkz6MKsOJUTzJJpzZGRzqwiLhNIzOIQIhALBS3DC9zHmaVDSdmzXd26h3s3FHN0buHC4OumHgtBFNKv8DCAUQABoMNjM3NDIzMTgzODA1IgwMg%2BCbbha6%2BfwNrp8q3AMiYjGGaD7l%2BktTtZlMBYT72SCLx4f3LA6MIPBLeT0SKU6OB55ZZ92%2FvPVqDaQkbLRnDDjGTFb4Xg5G6O4tXvFv7BQYhg60aJlpn6AnMVMNx6saz6zQd6dHtOQ6K284H%2BRn%2F9nWMItgnguXe0WR4Dn4b%2FRrRTg1NVoibxzzmVNxg1KeXo%2FBVW3yHtYdWEqEKSq3SUHB%2FSj7DWyzA1Yy1cfBheLvKAFsZ1qyxnNakE3e2MKeJA66eu2jkLc8M%2FNjhmNQ4mXCRsHpvApnpHLzln2pfs3eDIGQUJ57vY4n4YmIfaNdfjlc0FrUI%2BSQF1Iki35ZAwh3m0RwcftzXP0%2F7%2FP%2FlXzgtPoU5CWz3gXshLweNv2FMc0YS7JPskw6siN9TLI%2FfYUBUKrQv4giw70Tf9b8NJ4veoto03b2LP5KDnp5DM9ifA%2Fa9mRMsBPYg86SN9kst%2Frak3wnFnBypG%2FlaALNPuKE7fc8Vp4ggh8elMPJW3gQCueqeQWWmZiUVZADhe9OuP%2F7Yd2diyAZcRySTYQqsJoaSZffJqR26T8s7iwBHaNu1S%2BMbGFTdC2jlNIBsfiWgqhtbuBHViqH1wckRDntH4i4FLHak7Ow0kdvKUM4Tyr4y6%2FeAzJyGw%2Fn9TCkx6LOBjqkAYmeIid074sfGC8odlDRa%2BdCE%2F9zlbMzfacjrh6uSCizm%2BLSRA8Yah0F90U6Apzjg42eP%2FIU2bB5Rxd%2FCW0UL4wS1WUDpfPt4WrOa9MEOYH6ubynisDTSPVWUumem3%2BMVeWg6QavAP%2BWlfud%2BUecY1RniKEQkFgOBciG9l7AbQ%2FCP7QHMIFbhqYfCm5xiSBJcO%2FxyXP%2FO9Bujtoqb61EZGNdMCYt&X-Amz-Signature=3fd649a1a4f87876c17d3a8933d2227ac53eec657e978b53a2592bfb527a136d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUEXJCPS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIGMHRkICZ6W6TPgDM0MRkejMSz8zU14%2BhVKzCEjH%2BlCMAiEA80Ziuebfmxz0oBSApE04SZuFHFq3RoTvMgmPEXUoXKwq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDE2lB%2BrsAKDfQykkPircA1rDrVf2Cfk3Sf6Z7G888UAIQ01SCOM4lcoFwET47VmPyPzD%2FyqcIuyqk8oTrpjanXBYlzs9xehM4u03a3hqe2k0vQcWq%2BlEuoaJrTe1W%2FgJ5kJWXhhoKXYg%2BWq0iDPTRxXG%2BlSXgiLXPxN7cyOP0hgIb0gu%2FzwoQDJrgqt0ZYDWC%2BV0uXIikZhaqT7rw19fvN%2BHhhyisib9XEVwIe7yiVZzWKmENVFqkJeGWLh1DOk1F3RX7fjeHLXcafgqi1bVMkiKRKEQOT21nVhye%2F%2F4mVWmg%2FUDFMbX2ySgAt4lMWZxX2kfL0gfVUfi1yo13Q%2BiKiVbgzQl8yDLEfLnCZFa8wJUXpbxeG39WG5YRgHgVnNl9lANnGw7ohWA00c0fK4ssRX4ZVGw5EgULMchH7t7alQibrdXWfecr3CEY20Fd25TtYR1V8WwEF0TKznoVZRZgXBUXg3X3ANkkvOm9PdJ3EL1yrZY2BCfDMhk4RmEemL37xnQQxyXcujON3P%2F%2FBLiMYJ97S%2BcDkq%2BrKB1VzFZS4R8FPKtBLvQqC0XropzT%2BOlFANmQvJfb%2BLND0sI0VtWxC1yJ%2FYjSxiYNg6ZeVx1eueM2McQ7fiuPmFfbHrs1wrpYHx2YXyvd8naARBgMJzHos4GOqUByd5HwDUIzA9l082wAdZYfepRxNFKXc%2BVePIOO7NB5soHJ6FtOjwc5dHOZgQgtFSBDK85NxPVonDfcuqnN9wu%2B4ka%2FpDjBkl5iKC7DPrAdc0M6Qi2fe%2FeOuhMwfWltA5lOpipyk1u0IlOwaUPCfFe57T73sUksuuH5YNzHls1GJn%2BaMqdhTAJLAyYxZlySMMXEn8BHAxcr%2FSGtNvb1hI4DuW1t73O&X-Amz-Signature=a34757591604d80f0796d041ac7670de09a52859d6f79cb9e860de07815c47ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635Y4AOFC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDONjan1%2BdI6c75d4QNaKjJllNyHabOjpHV0rUmOHEIgwIhAMs%2Fr5F7P98ig9T33ygNXrjJzGBPaRbp1Yb2BtbtUpHHKv8DCAUQABoMNjM3NDIzMTgzODA1Igw7mtRVC6gbzFrS8NEq3AMolUhdC%2F6vAxupRrtkusNzf7%2BK%2BbT0J%2FbQzO6OBDap4gGLGQt4079SEWD57JUYY%2FGsxt3%2BB1K9Jo%2FLDsWI3E53Y6fcI%2BUgb1DFwRCT55JZMXeJlzHN1w8WgvW7rSSlcgsY9p4e9NPWFmAHCRoGm%2B3%2BknLSjeM7t3PvBIeRQ1yOUC9YI%2B74LJA2JWFhVrbQcNbOZKkK0zi35d67jn%2FLuse4eZsZFTTYB619WBxE27kOPcrF0tiuCrdDYGvOnJ5ePTBd7%2FEfz3vgWPqXazIimQznFsh8J15Tmga9O0HPWHZb9ZorUUKzSESZeIBkqKbigOaCThV6iE%2BAJjICr9mjQ5C5OYGdcMsFJFLHKmJkkYckvBsitXUopshoLtS6ThSMD%2F9wLHF19n6IRDK%2BnadHYyjbp5j7VWiDAmy5vzizCV3JLEpM%2FO6aLSTuN2YoLnRUh7%2FUjARRC3BxiNrcBowVOXOriRPWg6eNAowEHGv4bzilCK3iak3W1xYmIGkbBWkGgQmdDu40NyrDmpHvZkjTsSYwW5izUeojje1mOuYQgiHzCl3Z7KhLvqhOheTX%2BjXeHVoUyFfcsE6fJqwxa2NGEFap0MqdpixMIYywTblf4aeEhBF1AsFKWelfoyutGjDux6LOBjqkAUKVn9fvQxDHhpJtSC%2BhWPt0M91H%2Fkl9ZP4dwEdv9tJltCeDjNn9EpFjFuoowCFLaS6n1ky7GbmjpEIPBboHNqSiOOEOn%2FKnJqEQQt6x%2FlrvkpUPCY4oLxRkOFXF%2FmkISG3JxhH047rYRdp1bq4Mf5bV68wDAl5M91oKz3jOBJx8OHSHB6Z3Y%2FXodhSeT3omerZXhxpfmK5Oj6GqmsLJr2uF0tgO&X-Amz-Signature=f2f6f8d145cc3a26cb1ac7ef1be88b6b2e8c804f0e39d88f63b73201a9a8c5a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635Y4AOFC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDONjan1%2BdI6c75d4QNaKjJllNyHabOjpHV0rUmOHEIgwIhAMs%2Fr5F7P98ig9T33ygNXrjJzGBPaRbp1Yb2BtbtUpHHKv8DCAUQABoMNjM3NDIzMTgzODA1Igw7mtRVC6gbzFrS8NEq3AMolUhdC%2F6vAxupRrtkusNzf7%2BK%2BbT0J%2FbQzO6OBDap4gGLGQt4079SEWD57JUYY%2FGsxt3%2BB1K9Jo%2FLDsWI3E53Y6fcI%2BUgb1DFwRCT55JZMXeJlzHN1w8WgvW7rSSlcgsY9p4e9NPWFmAHCRoGm%2B3%2BknLSjeM7t3PvBIeRQ1yOUC9YI%2B74LJA2JWFhVrbQcNbOZKkK0zi35d67jn%2FLuse4eZsZFTTYB619WBxE27kOPcrF0tiuCrdDYGvOnJ5ePTBd7%2FEfz3vgWPqXazIimQznFsh8J15Tmga9O0HPWHZb9ZorUUKzSESZeIBkqKbigOaCThV6iE%2BAJjICr9mjQ5C5OYGdcMsFJFLHKmJkkYckvBsitXUopshoLtS6ThSMD%2F9wLHF19n6IRDK%2BnadHYyjbp5j7VWiDAmy5vzizCV3JLEpM%2FO6aLSTuN2YoLnRUh7%2FUjARRC3BxiNrcBowVOXOriRPWg6eNAowEHGv4bzilCK3iak3W1xYmIGkbBWkGgQmdDu40NyrDmpHvZkjTsSYwW5izUeojje1mOuYQgiHzCl3Z7KhLvqhOheTX%2BjXeHVoUyFfcsE6fJqwxa2NGEFap0MqdpixMIYywTblf4aeEhBF1AsFKWelfoyutGjDux6LOBjqkAUKVn9fvQxDHhpJtSC%2BhWPt0M91H%2Fkl9ZP4dwEdv9tJltCeDjNn9EpFjFuoowCFLaS6n1ky7GbmjpEIPBboHNqSiOOEOn%2FKnJqEQQt6x%2FlrvkpUPCY4oLxRkOFXF%2FmkISG3JxhH047rYRdp1bq4Mf5bV68wDAl5M91oKz3jOBJx8OHSHB6Z3Y%2FXodhSeT3omerZXhxpfmK5Oj6GqmsLJr2uF0tgO&X-Amz-Signature=8d8ae3d81a3ab7b85cf7f72d12f201c55278dd86622efbde4f564ead4a12301b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MMQA7XU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDqBjQxUbo7uuPNfwZk5uC4yUnq955HPm2J6owypZJ%2BjgIgY%2F1%2BJISv3PfHKIXIBN1uIyD3uB4fOhs82aV2nBvOQkgq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDOc50bJ6P3lN95eF9CrcA9guT1J5rB7KQBLs2X1QozEcvQTCs4PBQRpSQ%2FQOUIrQ7m5oq0f8N0gDt1hhEsJ1x6var7wNdjoRrqXrzd80OIb8XUN5JLQZuRemczhmYcbRMhX4GzwdDb0lPpsJ0begrjUeVyg4jgoytPnCC%2BbE49py1YGLfnd9d1E5wiwQ8oETRZKomr4a3AFxm2erZ0xlNGL2SThkJH%2FCNzYnA5P7WZWXesItP%2F%2BdN5TY9iI02PDi1MmyZkekwONVJP3XCUBtHerloCL1z%2Fnn6RC01laYlCH%2BNRVsHIKHRLehEJ823F1u2xXWQIv1L1%2FP1F32NYpUfzOeDhHw5PGbArvO8eTWN8slrcnU4DU8Y3ymyWKz5EuSAEXxmryMTsyehS9g2qkg%2F70knFhvRXXU7FCa1QT27E0QC9lkB1%2BPLticqfrDTfQSuIw6mfsbByCRvoctnMQv4ICu07PVJlIlEsm15DFUmFFGXtFF9GJGz23doKfDYhQATCk6V%2FGJOpNbdkSK1uEYfD1f6bv%2BJ3BDKpvrm47Oex5E4SslCYPxnAry%2F%2B%2BNO7hEOMY26p57vvsGclMG1M4PdYY30QBza0yYB83IKag2hNFWF5TGM5v8enNcSvi322k7EETc4BlUScKGxMSGMIbIos4GOqUBIYNgecAOrt%2FaesPU0CIi5NwULCk7wkttqnbFWyyeUEw0Md%2BAQClGQ1j%2FL9KZm54NRdfAhUW3Mstf43Hc4nolelWkWDXMVmgNwObRc0nevsYGHAriLAwwkOCiwjTb24WpAAeH2c3%2Fl4hNx0J3HBkguJeR16%2B%2F36thP%2FZdPffNMTZvEh2yh8gAxG%2Biql%2FASBgB0CJ4vmNhtiezuR0I6EK7TFvBXerb&X-Amz-Signature=b9adcfbecdc7566924e97a4eee252591c953327a89af4ff764bb26763dc10fa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6JNH6PN%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIHgRZh5MREuWPR43Kz%2BhmqKXQ20E2bsLvw0KJOhX3JsQAiBOcWD1y4XVurq2wg97W1vx5Cz%2FAaeGxfeof%2Bqol2Gd%2FCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMF0LrRaPw50tMTFU3KtwDxe8CrpvIamCWIcvjyrUrVxLjMx3AxElPm2%2FJ3%2B1rdoNOIKvaoq3QzJn9fkFecC01YRrRAdewG0PPNOdgGvRWW8vEURg%2FQR%2F3IhnMU2CRc%2F7axRRyPhByV%2B1%2FQQlRbSTfN8zSp%2FGhclWNGfsDdg7YGjvX4AmojADS4omrALG%2Foq3izjU9x8OUa2q%2BHCIbj9fW%2FP%2B0rUESOtyln0QI2juA5TGkKMz220z%2BebfqY00xTl%2Fr1eUZqM3hDJzBd4qIMthidAhsLUsHY0kaSQuCrjnh0QVLlwAfSqKfSV5WP%2B%2F3HKmdTP7T8JHZyYhdncM%2BM8FKPXcsRASOBiKBoxxMLtDJmVvUz7LhxmPTvxrrC%2FCBTBo8u9N%2F2%2BMrpFayGvhUFZVxqgdjP4%2BPLGI8DaEELbGTeMJj7r5rtYOiFpmae4DS4qb14DeK1uesNeHtkkUBNVdmu8fr9H1jcar3zaywPA1m5o39yrkwmcJIgwQwR%2FYni09uFdkTk5DcT0OwircGoCEDyG%2BUYDs7VVLXG3fLdolL9JJO1%2Fn%2BvAmUI%2BGtsE7sNroxZvNCkYZBRKtXREPZMdiOUtfD3OD%2B9fTZpkyBrxGhbcGVcA7O0OUR3C2FRhDZ7Hicg16HfNx%2Fngelbf8w%2FMeizgY6pgGxBg2Vkt86Yq8XDpJ85hJb0Bnqn3kGiBkvo4JIAW5fisntno3S5YDbb0a9pxelwRW5HLrO1EGf9qj1nrJqlARvx8CNRrHi4Fqqm6yBV2o40xdibvmyyH7hkLorvYNl1kXn7sY5dpwH%2BchmYak6uNX6qUZN1UT%2B137OX5PBhYGE08jHXbYVtwEg%2BpYi3y2ArAAXVD0mNZukbzP9Xi9HEL76kBwUUO0g&X-Amz-Signature=7ecd8290d98cbcdee68cf2391250cb1477b802ca8cc6c8791300590818ed0d27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQPRXG6E%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDnb4R%2Ben4PsRi4O%2BSzaIocsO5w%2F%2FMm%2B%2FP2152kGw9zRAiADjnApAF8YVXELouVnWSaPomPM7kN%2BlQcOJy%2FPHA628yr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMkPjyud174%2BfI1zE%2FKtwDkG2OetLBm0Tx3pmqsmvVwMfB7Cc%2BDYJ4S12hPpRti6AtixOgoENDrem01kUOtzZ4P%2BUjIx2bfzujyIQaS5HXcov4%2FtJgks22s%2BranBG2aO1dYOyfxXSW15MIOjnfVNE%2B0GwN2MUqROMkLnmdFWcI2lhBbmIIPzbisNOKqshrvQqschI7Fjvmh%2BlN1wzetlWWpwbbAaVKyzPKKusvB1VOLE%2F01ahBw01kv9t6ivvOTl5uUo5dgaAvfakW99VrvGuiy%2B8et2ul421tWumKaaRRDKdTTmm8SgcwGLk0y03qIaMP1BfoZvwcwt757rAUUq2Bqj7oeZRc7Bp5cs8dkYxPuCTbaOEuGqsX6DJGiryhOnd919qMzXjXZci%2B%2F8Mv1BrQZ942Bj%2BLb3sQQCpuF%2FUH5vYlxVHi7F8nIl68w9CKC%2FKhYxN2LxygPB0aS2%2FkOPqeVDTIpLTrXAXQYbVnWtRBhLjQSQ%2FA3s7h00Z9otwgLH5jDlCZNMLSN8U4%2FWZxzsH5cDpZpRIZ1H2EsgT0rfmN2Wk5tgGD4VvRlKCAwgIxOiZB9uMKC%2BY%2FGHqrdatou9zLOmOfY7MZvQxFunbUD11tjifN26m1JuMDf7xCFr198uNlwNduZO59Vsdt068w28eizgY6pgG5KQ90NtkXc%2F08q6dHRmvPSZjyTYvMqdb9ilKoA9g%2BvuPHmKy6eg9mYyt6bQUd96vNo9a7BfzaGXOpHd76JW4wWhOuOtu6sRUN9fQc01HxlKjalIJheoQN%2BR%2Fyd5vQs81A7q3i4gVGAm28wPKKCvX70RXmr2lPySnrHp52TpDQOU0a7HajXZ3kYVsY7ijgTjRTYcGuAleaXtAhgOB69wKa60sPUBK%2F&X-Amz-Signature=431ad9128fe1e661cd3c617dfc1a65170a4d06cb86113f147846056e712762b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDT7VO7U%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCSwXUvbYNGVkQhgputs5lyxLZzSES%2F0A6W2%2BJT18pjzgIhAMMZePK%2B4Zcs2HbL4k95VLEua1M8ZtZv6exPQDB53PfiKv8DCAUQABoMNjM3NDIzMTgzODA1IgxMLz2jEKvdp1cikdoq3AN1I9FegGiakbgpEY9ACAUVfv0cj%2B5%2FLAq5CM1023UidJIQiyY7V697OCDl%2FQaR7IOcU9Hdg0VHXgcS%2F4eHB9BfHXmKyONT%2Bcd%2FtkBfHGgcA1Ul%2BXo3fikpzULS8lNyZcCZ1CHF8bzk6%2FSAg%2Bt9Hk9cJjsheMKypqlDcZ%2BM0OV1ZZotJ1UbupFU54x4TnozL9Y0A7D3rkFdUynPAngtN8FseutSkjVhWAnoyp9D8skdE527NeUvS4VNXLMee8wjo11mcujgqi31%2F8Pl%2FWXviuLHSt6FeH6nBhfQ%2BoMaUPNmAdRI3vJw28R3I5fjnLrvErtkdS0h38tSaOJ05LkhGMWqs8B%2FRixxVddLBY3zA9QZbtgsL%2FdZdM1j9yrPY%2B88ZCV1TdvMWgu1I2%2FpH3kC1p%2BmBQkMCyTeRWr7pDdhKRorDKtHbUesMGZpcaXveEkK83t3AsX9ZYfWTMVWlKfTGGEiqrQKeXKKAnZMFwPbyI1p37zqR0uIHPUQtK5sf9Sl%2B2wgyDiYapPJz76hz4ySvFmvNxO2uyXcvcCQ8UK1AuxBGpRGH2u7BLaXNcy0mFLsh1SET3z97QFXF%2F9OWkAJ4Jspa%2BAheHsDMB8qHyg%2FAyKIK7O3tNus17M9MSJSHTDXxqLOBjqkARq3ZPXAnJdaqGzAyrlF4rYmTTA%2FoWBLrVKdoqG2BpqaLUe9G0%2B%2FJaxrEJV6%2FO0vO9ov740C3cPaGWzbnL0tQA5LquxucJWxgNnDlb4jqVXNo4sSPgToTJcN77ZU0gGouU94X1pD1limhJi0JJXhh%2FGzxUIhGarTeOkFN%2FdbjlAnQZIXvFxDsqulP4rl0b1y8iQoAgSwY4U2%2Bp2UOsI3lUvTJPiP&X-Amz-Signature=3dc2eaebb130573089d50938f9b8e156c2b8c0ce1b4979e71911b4cb3498ab30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDT7VO7U%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCSwXUvbYNGVkQhgputs5lyxLZzSES%2F0A6W2%2BJT18pjzgIhAMMZePK%2B4Zcs2HbL4k95VLEua1M8ZtZv6exPQDB53PfiKv8DCAUQABoMNjM3NDIzMTgzODA1IgxMLz2jEKvdp1cikdoq3AN1I9FegGiakbgpEY9ACAUVfv0cj%2B5%2FLAq5CM1023UidJIQiyY7V697OCDl%2FQaR7IOcU9Hdg0VHXgcS%2F4eHB9BfHXmKyONT%2Bcd%2FtkBfHGgcA1Ul%2BXo3fikpzULS8lNyZcCZ1CHF8bzk6%2FSAg%2Bt9Hk9cJjsheMKypqlDcZ%2BM0OV1ZZotJ1UbupFU54x4TnozL9Y0A7D3rkFdUynPAngtN8FseutSkjVhWAnoyp9D8skdE527NeUvS4VNXLMee8wjo11mcujgqi31%2F8Pl%2FWXviuLHSt6FeH6nBhfQ%2BoMaUPNmAdRI3vJw28R3I5fjnLrvErtkdS0h38tSaOJ05LkhGMWqs8B%2FRixxVddLBY3zA9QZbtgsL%2FdZdM1j9yrPY%2B88ZCV1TdvMWgu1I2%2FpH3kC1p%2BmBQkMCyTeRWr7pDdhKRorDKtHbUesMGZpcaXveEkK83t3AsX9ZYfWTMVWlKfTGGEiqrQKeXKKAnZMFwPbyI1p37zqR0uIHPUQtK5sf9Sl%2B2wgyDiYapPJz76hz4ySvFmvNxO2uyXcvcCQ8UK1AuxBGpRGH2u7BLaXNcy0mFLsh1SET3z97QFXF%2F9OWkAJ4Jspa%2BAheHsDMB8qHyg%2FAyKIK7O3tNus17M9MSJSHTDXxqLOBjqkARq3ZPXAnJdaqGzAyrlF4rYmTTA%2FoWBLrVKdoqG2BpqaLUe9G0%2B%2FJaxrEJV6%2FO0vO9ov740C3cPaGWzbnL0tQA5LquxucJWxgNnDlb4jqVXNo4sSPgToTJcN77ZU0gGouU94X1pD1limhJi0JJXhh%2FGzxUIhGarTeOkFN%2FdbjlAnQZIXvFxDsqulP4rl0b1y8iQoAgSwY4U2%2Bp2UOsI3lUvTJPiP&X-Amz-Signature=3798ea4d6580381774bf21fc4bfd0d9f6df359b2fb0ae94f370732aa705b224c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVIYRWVW%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDXUAIALia54Gfb8yirKTjcZQbcnLeh98%2BnLxwuv%2FKIrQIgN0CAo8%2Bvj0M7tIyeC6RJsWSYOwGwUZakeuHcuXqyRo4q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDPeAfXaTUeglhAjfDircA7DTkTGtNJJZBG5V1ISbN%2FMZTSQW5%2FdYDc4o3qLrRYrfwAhMjZ7fwRbEE3B09hmrkFL2iNQrnCTagixVG8MoXCfstoJmTWMIxjK9t7y6qCp%2BrQDeitgiaJKbh%2BVFyPTz8HIvdC1%2BUecJ3Tev6VGZ4Ey3qGkqS5%2BInLyALzGy7%2B3A%2B%2FSSPqf3G1LT5TOYEjYzG2wt8y5ryWMnxtY6NtydF%2FPP2KgMgE0SkUzTSaDhOdAFTbP%2FZts7pmu%2Fu5gXpN6VdDaudmlt1T5y3OR2Uo7%2FIgWeyyf7i8w1UmzwzrkX%2FTKgOmVZpVhsOuik8zO4mX7sHf4INXXNweckv3FG%2Bt7vRPjyeY06Zwv7ue43jDm8OnSorW%2FsqLn5%2B42E7papv1LOFORhmc6anr5wHjzoJ8j9KV3wOo6n68m%2F2Reg68LgYfVBMc8h%2BztFSPi4f3gKy9fTxqaUsHXmdOxhrwOBJrFh7LdZiORxfM%2BzTcMtIt1fnfbsKk49xFfEVW0vAimED%2BBbfpysQN5arhSCnZZ7%2B2fAOVbpsiz9iHBghhsRqYXiX%2BPJyZjnL5E5%2B1DwxQwt8DgM5HPhIYUt8Xli6Y6X3yXfKBfk3OnCAfnjUyzk0d6iBSaj3ze5koRyWW0KKQKaMPjGos4GOqUB1wG8mvFfBNeE8F2Ozusco0W%2B8YIw%2Fy%2F%2FV7WYW7ZWcV1Uz7tqdcgQ4t7RM40gOqgur9dzDdfJfW%2FFbgzn9DOoXpQx%2B8V%2FobFWs0wrUF%2BKW7hNMH8QO%2BUTQrzgOUZfi6QcHc5Hti23DERvVJtOCUgNRwtkC1FYo8tJpsLs7nBzudeR38TrT7LT6o2dMAtBxNAWAwM2lGPY%2FHysopXv3YC4QKGpJyEM&X-Amz-Signature=550083d1a34ac9c87a922ddf2025994514c85d88e8c00863cef3ba04a7c4f8c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDNXMSIH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIFEjtplZVRCb1z%2Bi%2BLVHVeaWbVbm0TG868O1EDSO2ve2AiEAzOPPI3316dja0o2zwxaLOFG%2Fy1brdZaWrb3sQPYrVecq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDDAfaQZZPLG7vfyWCircA%2FsaKka0CnsFx0BA%2FxZQDFmHSl0EZxVhjUYV0HvSUUlLqjb3NXRQMAjmWlSJqXegonk0J5PCldJy2I8ZXBy%2FD38gV%2FDfk0MMQMKmWuNPL1C8eIdKpIAGxn9l4FjkC34lPWSt4eIm81uw%2BETDKbO0PQYQnGuAOuIZPTY4vYxW7Y%2FLdos%2BCLBIC2MkIPyw8%2BJ27bZBhNTIaer8ZHvQFslVq2x2mj8lnHHJAhxY4Sb33UT%2FLlGmQMOenX6tcaiXqRnFzFdChUnTfAXIKbiY176zCrnvISEDyT3Y%2FhNjtOqJH%2B9Rc78U3uxGLlD1M2JLk2KL%2BhJTKshJdJq5dw6HQ9vc8kb%2B77jCyZVA8bUyfJungggs2x%2FlOICRUEji3sui23nXphQvfLJyGYDGQqFZFI4UFo2DRJoQo3vLwGchAMYLJuawM3BI%2Ba49W607onn311A8HkpsQMZn04IMQ1THyTjM36l4qULcWzzwfqHzWGlc8Aept3yxO2BbdJ7WQuAd4eaYWO4b3kR1S3vX0C8zMCZIH1tIyQfs%2F5uQRzH9GesF6kjPhNHgpJIx3Xj4rN5tsko6qIqNTa15lSKszwdYLB07AfrIuI5FBwSvaUzmJJbF5FuVdurBBnCtNraO58tEML%2FHos4GOqUBE%2BGlMQdiAf34Jloc8NX99SL%2F6bNsQQXHMDvee90lk9iRgTiz%2BZUV%2FJQBi3GpMkTLBzJ5ZZX9sGjUHh8RN8XzoCS3OKZ718TDLHJoFKcV2tdZ4ZrYh6TLBUaBipF5dxT4Q8MZ9%2BfXK6TfKs6i4RU3bKajCwdoDYtjiyQXLpUFf7YKcrjrrJMzIz4GeOwh6Aui5F4EjK3T%2FJbiKc7gzSg8nvYqWdlD&X-Amz-Signature=1d3587efac4c9b72c671a5ec9c239faf5b104017b86fd2ea9f8c7cfa022e1916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDNXMSIH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIFEjtplZVRCb1z%2Bi%2BLVHVeaWbVbm0TG868O1EDSO2ve2AiEAzOPPI3316dja0o2zwxaLOFG%2Fy1brdZaWrb3sQPYrVecq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDDAfaQZZPLG7vfyWCircA%2FsaKka0CnsFx0BA%2FxZQDFmHSl0EZxVhjUYV0HvSUUlLqjb3NXRQMAjmWlSJqXegonk0J5PCldJy2I8ZXBy%2FD38gV%2FDfk0MMQMKmWuNPL1C8eIdKpIAGxn9l4FjkC34lPWSt4eIm81uw%2BETDKbO0PQYQnGuAOuIZPTY4vYxW7Y%2FLdos%2BCLBIC2MkIPyw8%2BJ27bZBhNTIaer8ZHvQFslVq2x2mj8lnHHJAhxY4Sb33UT%2FLlGmQMOenX6tcaiXqRnFzFdChUnTfAXIKbiY176zCrnvISEDyT3Y%2FhNjtOqJH%2B9Rc78U3uxGLlD1M2JLk2KL%2BhJTKshJdJq5dw6HQ9vc8kb%2B77jCyZVA8bUyfJungggs2x%2FlOICRUEji3sui23nXphQvfLJyGYDGQqFZFI4UFo2DRJoQo3vLwGchAMYLJuawM3BI%2Ba49W607onn311A8HkpsQMZn04IMQ1THyTjM36l4qULcWzzwfqHzWGlc8Aept3yxO2BbdJ7WQuAd4eaYWO4b3kR1S3vX0C8zMCZIH1tIyQfs%2F5uQRzH9GesF6kjPhNHgpJIx3Xj4rN5tsko6qIqNTa15lSKszwdYLB07AfrIuI5FBwSvaUzmJJbF5FuVdurBBnCtNraO58tEML%2FHos4GOqUBE%2BGlMQdiAf34Jloc8NX99SL%2F6bNsQQXHMDvee90lk9iRgTiz%2BZUV%2FJQBi3GpMkTLBzJ5ZZX9sGjUHh8RN8XzoCS3OKZ718TDLHJoFKcV2tdZ4ZrYh6TLBUaBipF5dxT4Q8MZ9%2BfXK6TfKs6i4RU3bKajCwdoDYtjiyQXLpUFf7YKcrjrrJMzIz4GeOwh6Aui5F4EjK3T%2FJbiKc7gzSg8nvYqWdlD&X-Amz-Signature=1d3587efac4c9b72c671a5ec9c239faf5b104017b86fd2ea9f8c7cfa022e1916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MY2F54I%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T042527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDhPvof2LLek8JjJ1MedVRLPQsGrG1QYkgdgoXbU8oOCQIhAM1xbCzPT8bJYuZBjNB0Msz8Az5UorWCAUnuipdKrE7BKv8DCAUQABoMNjM3NDIzMTgzODA1Igz6%2FO3xJWxaU8vONc8q3ANJwqpsZbDrKrKLae8Gr%2FCc8vupNlATwfP9SZ1Y9rvQWEzwM7sxlVep1gBpeMU3xsgUZsCYYqQ4rYhzL4icbNW854zqWJTTLUS0Uia50OG%2BYu2GaV7F2LZtQUEZ1iDDYISoPXMwJw%2FP2c1FtR3IBrtHFdfAPUrXFjMgeuSmHtOIwsOpswMdsnAG8hTZ7DLFmCo%2Fa%2FBoSravQziL4lA8Jf3z11FNgOnOEnIkb1%2BGxlkP41F6QLmsuVoPxou1kYE41nl2ym8a6DF44sqSSfCRVr%2F%2Fe6sIpGizPiC88%2BC7Bh1pgOBTIuRf8u%2Bsxb7iH6r2P3vii5KtT4ZA%2BFm3RJr8elqPLeVdsqQiAFZ%2B8qI4UpBQDEnqjpqAOdVjysSkCNtphRGf3CbIlldDhav6gKCVE7bd%2Fgsood4im9RuLkuJ9I4hSg2PtO18BFmca09DtIjbFSHZGBkXi7%2FV4XI0igJ2YZ1%2Bs%2FF5LsmHyPF9BbONEH21q5oTWIM2AFKGDGJyBs59Ny1UEIHIa59DkSeq1JqjfWII%2FTKeY%2F7k9hR3%2Bg9nWsaj14JOkmaRZtVKBs8dIQrHWe6587woRNJBYFSX8mT0%2FZZ%2F4x9eQop3QZ%2FiFdrd5HNx8Vt%2BAX1nOKY9FYP8hTCtx6LOBjqkASuytVgcxv3Om4hc%2BuDjuO%2BeAlD0f99SUChkgqaiDg2MydJYStGJx2zEJFzgqtHlIuQZIqcXM3NBjvmro5G%2F9lEC0nNHTJBL%2FjrLnGX3Flz6GTrBCa5ay0jMA4s9zWbKq9tr9sM29mDcy9RJE6FtTHTe5oK%2Bpho54TPBuq3a4VihyLj5IpurRP2uaKbA9UEjqCoUWmk2HGoPd%2F%2Fvp6ugLy02%2BHnT&X-Amz-Signature=346a65eef803c64df117a4c5376a0bd31d07a5f14e7cdf21154b73817b7f3864&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

