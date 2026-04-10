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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ICXPEKI%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIA29M2AwQE6aQ07JpnrCuHw5VwTXVEAjQIqLkgPDRhVZAiEA%2BVqVavwP0XP9su09XeLqD6p0Uq5JwP5ZvM2r5vs1FTgq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDC9pNEMXriYkSVi0yircA9ISs8ZwO2cMUkqVWrp8qvM4nw8W9i2ctUrEtIV5dRjuigB37c5i65pkY7tkAFrT61MoO5DI5lrGD60VPEtPPYqM0G7pFgVcnMDaqk4CdeUfXKL9I39Ny7zgIhy%2FA54D8D44cMDyxM9Zuy77dYhOAa5mw2RS3YFFySSffR7dapEuVrkXacRc%2Fgrhun8fT5GacL%2FDCrGAw%2FJcwbHInochxhlifuJFb%2F7gkb3BKLbwu%2FQ4Di%2FKS%2FmHPAGiDXsw1OW6imaMeiOJyXRT%2B4ArKq7oS3Rpoor76WYHYq%2F8RorBAoZzZ6iSVZ6ctUOvG%2Bd8TYb%2Fz%2FYP191NsSc9DuyiVFqvnSXBTJsC0dOwAtbA93UScb7b1FoCijuwy5%2Bb%2BVnITNJuwYS4%2BWFtMO2sfsHxRnBCC9OgSu18hNZpjRHqx93gTnyBsbRocoUUa3vNfZf86JwPzJisvoSc0CM6S%2F%2B1ZyjdSDe2VKfs2GGdanjS2h0xtgDemhQ6Ki7iftbrKOYT6qw%2BKyW40Wx%2B3pmm1Qv%2B3LY14LDDjpbGtDoNZicExvFblw%2BnsryZu3WrxPQ45GsFEIfhVPU2fVA%2BSMxoE%2BTrmlck9ui9jMeK1MOdElSUm9J3H2bwzMpd31ESzVp4Z6c6MOLv5M4GOqUBrg0OJLgTHgLfnxQXTP00ADhIlqzBSspuN6cpPEzbH0D4Y5SbuuGSjxR%2FsXw8ialr6d8woL2Lg5WGrl2soE41uFQXmKlc2FEArspWl6OwoKh2SjzIxJlvdgwXUjAlc%2BH9xmjrZFkFTfPZSdtoRTEvUS1EwU6C2yBqJ6OJvC%2Be8P37WiVzdZPyXIFI3zjbRNbVKColaDdg9%2BOOX3iVby9Mpc07%2FaGK&X-Amz-Signature=bfb72d9f3fca594236f8e6cc62ed18c908213dfbde403f06851c39d9ae7f658d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ICXPEKI%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIA29M2AwQE6aQ07JpnrCuHw5VwTXVEAjQIqLkgPDRhVZAiEA%2BVqVavwP0XP9su09XeLqD6p0Uq5JwP5ZvM2r5vs1FTgq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDC9pNEMXriYkSVi0yircA9ISs8ZwO2cMUkqVWrp8qvM4nw8W9i2ctUrEtIV5dRjuigB37c5i65pkY7tkAFrT61MoO5DI5lrGD60VPEtPPYqM0G7pFgVcnMDaqk4CdeUfXKL9I39Ny7zgIhy%2FA54D8D44cMDyxM9Zuy77dYhOAa5mw2RS3YFFySSffR7dapEuVrkXacRc%2Fgrhun8fT5GacL%2FDCrGAw%2FJcwbHInochxhlifuJFb%2F7gkb3BKLbwu%2FQ4Di%2FKS%2FmHPAGiDXsw1OW6imaMeiOJyXRT%2B4ArKq7oS3Rpoor76WYHYq%2F8RorBAoZzZ6iSVZ6ctUOvG%2Bd8TYb%2Fz%2FYP191NsSc9DuyiVFqvnSXBTJsC0dOwAtbA93UScb7b1FoCijuwy5%2Bb%2BVnITNJuwYS4%2BWFtMO2sfsHxRnBCC9OgSu18hNZpjRHqx93gTnyBsbRocoUUa3vNfZf86JwPzJisvoSc0CM6S%2F%2B1ZyjdSDe2VKfs2GGdanjS2h0xtgDemhQ6Ki7iftbrKOYT6qw%2BKyW40Wx%2B3pmm1Qv%2B3LY14LDDjpbGtDoNZicExvFblw%2BnsryZu3WrxPQ45GsFEIfhVPU2fVA%2BSMxoE%2BTrmlck9ui9jMeK1MOdElSUm9J3H2bwzMpd31ESzVp4Z6c6MOLv5M4GOqUBrg0OJLgTHgLfnxQXTP00ADhIlqzBSspuN6cpPEzbH0D4Y5SbuuGSjxR%2FsXw8ialr6d8woL2Lg5WGrl2soE41uFQXmKlc2FEArspWl6OwoKh2SjzIxJlvdgwXUjAlc%2BH9xmjrZFkFTfPZSdtoRTEvUS1EwU6C2yBqJ6OJvC%2Be8P37WiVzdZPyXIFI3zjbRNbVKColaDdg9%2BOOX3iVby9Mpc07%2FaGK&X-Amz-Signature=bfb72d9f3fca594236f8e6cc62ed18c908213dfbde403f06851c39d9ae7f658d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMTNPPE7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIBmdZG%2FiF3xfju4qgbHmrjI79nScPPg8VMXGPZQ7RvAvAiEA8a6f8Y4uDtRzSFC3IbShy%2BunUZ%2Ffrnmh4O82yzj0Pr4q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDDMYHwPFdC1WOYuQXircAx%2FdlLdJ5GcN%2BLorKfShfiRFGJkKIEGIj3tPU4%2BzKNL0KXl%2Fgzlu%2B7hj5wFgjtjq5XABNz8pFMlFNrc8KNO9rZO%2FfV%2FhrPCpRdwOg3BNDGcV4YALsELk2HGhMUabwFar%2FKl9SUzOBBSL%2BKtuPWmfxTIAw0k9jcjQQZU6BS56GUmA8bhoiKM45tHgBp0doDn63rLn%2F0sQYItA8BGqVMU8UVGEpoL3tULSMJaminu%2BKX0Nx8bU4XMwVBtr325Nu2vyY%2FuPXtO%2FUZ7oiq9k%2BiOCPJhFOl839BkiHScGMySAppBkMOoMrQsjdeAfIOAvpjY4807VTlgyGC5ON%2BssiU4NMY9mj7xhGSz2pOEloqiCaWNgUnPeexgXA00tMqBgtEVwUcMxduyOA8QKEPcEYrGPL788I0utHQPBoqIssCTc7ChiH3CD%2FT0wDdYWFcKRy0N4wTqe13MVDuvzxTuLJISAq%2BNQRcHQ4xOfkvJkNAF2YF%2B9JXYYxO9zrGGu2%2FVNl8sOCCyHrNzcz4eUedXscZt%2BmSKcRztMkZZztk6cjcQteVGENL2NnNv3Wcsm%2FGa3dLVDaC7U6sR%2F1j9vNHejJcsOV5HTKjxfwbmanoSs%2Fru2Vo0r9J4lRctiblT31e60MLXu5M4GOqUBra%2BQLqTdO%2BC79cYTSutf3W4teqOXucQPdecgXWfkt39Nt2uGo3HQWToCtpUoCOcM2nVAHOjJfKriMu9XYwIHBRcFtpy4zR8xMwP%2Frw2E7ZMvOSTLG8V3aTiGRKsCmOjTWTsSNhi2J%2BVLZU40Di%2B6cwj80BRfbQbw07Epx3eV8ydObeXWZiDQt0V3P15%2BAYR0LkTFldSYZUI9YnnRz2b3TYtUE%2FGD&X-Amz-Signature=70d352798f5463bab12a4cae1e08b26340fe4205353569283b859a87b4cd2eb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DDFEB2A%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDZ0KdH0rVKXClacHbeQTctxGksULCBGRdobsA8KKuypQIhAMQmrBIuvm7jhMIg2ifKa7a4uP%2FDRr%2Fdo5VdlRWrSrl4Kv8DCDMQABoMNjM3NDIzMTgzODA1Igx6ttm7Igjr1OP4x18q3APhnms3IoEWOYFad1jUO9H2ox8yamEJ1L7NM8J5iMzlEeFkeJIlu6tvbpBwHJnjz%2Bo58Zsa%2Be0UVMnVGUT8w8tcVOhtveBsYM4dhau5%2B2bG1XXXMCPFHissPXAH0SDxIiJCP%2By9s%2BW3DANqoK%2FQA8vtTdMSHfeTvHyh25obRCRgiyDmz0cvTj8xVjHfSo%2BFO5zuYYiWNsgC4xF0ttFn4E0ihecC3X1XxBQ%2BYMOr%2B9TMNOmDmlD%2F6wFUC8HJ3CZcxz%2Bv0UJZy4xLN5Pqz6v8JHGYf94tkR%2BnBSclmTiPyjgmX2TWct%2FGGhB9cZd6niHNMXeTHblPo2P%2FJMt6L%2B3KvSjVVKPon%2Fejs%2BCKuIJXMSeaM4CcBPpUUNmOuW3zqy8BlqtzpZNbb9J8ulJIbQpKVJ%2BQlMJ9xPsKVpvle84z3sCu2bqqFQAqE1%2BVUIMDx4Q12P6MT9UbeDmRQB2u7gSTFVjZJfMIJNyW4cyu2zS6Zg0thp02WSWHcZqkWsdAuWa0cgqPuUfFXEGtKdvNuaQCU5cmScqAMnr1QxWBo37ndWdVZpWHxNzti12oXB4YA5IHLpKt8WYT6v9rRC3goayLDhaQCC3PXR%2BzrfL89A0bQ0zehbTUYXJ23FrQe4DftTCr7eTOBjqkAabDSVXFh89sxqs%2B1v9NjqUm8OB%2BjBDC6Gie35X3VK7hTEIkcCgej%2FFc%2FsIZ5I8Ha1VW4ZOrxL24KeK8hkryruPgc5PdRwuv2t4cxG1bglEFwn9a5InedhdMhNVG17bjXu3BSl23Q9%2BPejwo%2Fj%2FiF3SDucxgEYMVRQ%2B6%2BIEWAREmjBDR0uToVocIbDuRsQI4EIVEJHrJa8RUC1Q2HyYgBVEG3wE5&X-Amz-Signature=e226aefeea5238ea72be07ee3dbe15aceac3f43856a0471af3ed710e3cfdf462&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DDFEB2A%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDZ0KdH0rVKXClacHbeQTctxGksULCBGRdobsA8KKuypQIhAMQmrBIuvm7jhMIg2ifKa7a4uP%2FDRr%2Fdo5VdlRWrSrl4Kv8DCDMQABoMNjM3NDIzMTgzODA1Igx6ttm7Igjr1OP4x18q3APhnms3IoEWOYFad1jUO9H2ox8yamEJ1L7NM8J5iMzlEeFkeJIlu6tvbpBwHJnjz%2Bo58Zsa%2Be0UVMnVGUT8w8tcVOhtveBsYM4dhau5%2B2bG1XXXMCPFHissPXAH0SDxIiJCP%2By9s%2BW3DANqoK%2FQA8vtTdMSHfeTvHyh25obRCRgiyDmz0cvTj8xVjHfSo%2BFO5zuYYiWNsgC4xF0ttFn4E0ihecC3X1XxBQ%2BYMOr%2B9TMNOmDmlD%2F6wFUC8HJ3CZcxz%2Bv0UJZy4xLN5Pqz6v8JHGYf94tkR%2BnBSclmTiPyjgmX2TWct%2FGGhB9cZd6niHNMXeTHblPo2P%2FJMt6L%2B3KvSjVVKPon%2Fejs%2BCKuIJXMSeaM4CcBPpUUNmOuW3zqy8BlqtzpZNbb9J8ulJIbQpKVJ%2BQlMJ9xPsKVpvle84z3sCu2bqqFQAqE1%2BVUIMDx4Q12P6MT9UbeDmRQB2u7gSTFVjZJfMIJNyW4cyu2zS6Zg0thp02WSWHcZqkWsdAuWa0cgqPuUfFXEGtKdvNuaQCU5cmScqAMnr1QxWBo37ndWdVZpWHxNzti12oXB4YA5IHLpKt8WYT6v9rRC3goayLDhaQCC3PXR%2BzrfL89A0bQ0zehbTUYXJ23FrQe4DftTCr7eTOBjqkAabDSVXFh89sxqs%2B1v9NjqUm8OB%2BjBDC6Gie35X3VK7hTEIkcCgej%2FFc%2FsIZ5I8Ha1VW4ZOrxL24KeK8hkryruPgc5PdRwuv2t4cxG1bglEFwn9a5InedhdMhNVG17bjXu3BSl23Q9%2BPejwo%2Fj%2FiF3SDucxgEYMVRQ%2B6%2BIEWAREmjBDR0uToVocIbDuRsQI4EIVEJHrJa8RUC1Q2HyYgBVEG3wE5&X-Amz-Signature=da2f0b1d0ec09db550444562dfdf8f171687cc1ca0059bed4d03ad6dd6e38cdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGSYCWNU%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCiFBjC2f7%2F7YWO9dFVhya2yp7uGxS%2FTWaMENX12Y%2BHyAIgZlTqncpxLaBMnrgZZUuDVBR997%2FzOxbUXPsAWn4nlLoq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDAaW%2FbORjAL6exgQYCrcA5cbukAd10EJzg83iK4VkWpmMy2VmcQ%2B12qAMPsvOTHzV%2FXTL0F0iXJM6EnJjkfT3J8a2kx2pR6hwthM4chW3OqHSWX%2BlLyX3%2BfINcXQc2cFnrr%2Bs%2BXS1fgSAnVSEEvRLq8G5gNeWV1uOn64%2FUwJdo4s54EuOU3bbWOTydwb7zvUft6T7zafxl2udDplAT30WhtmQCGhwBVeafpSvptBakGJSH8aqMt4fBxsQlSEyT4ANnCv7waVo3keKVMLoXtYLW%2BQQdu1fBiYqptVu22zFossu5EUJ8tnWpRdmgb5Cujwgdgxl%2BjWSuee9eJjLM2lCLhkH5blNxFwXNgFuuRBBK833MZii2jL9Q3dXsv768PRdxU2FNxPFcax0mwvm%2BLCf%2Bb%2BC4reSpN9B0HdpHtmziLAaurhgY0dWwk8fvWvGeJndcWv5YvqL9fVDnLdOBLppoVjvGfs0MRmfk%2BSgkigKMsSzOjHRjo2W8m5q6SLSKMiN0uJVFZA7ecn0YlXZn5YBvVy2M4o686AR72m3cIYesnKfw1jMbbXWrlEz3B4uJ9%2Fjp429Nw0%2B7m3fIXYPqsWbONLrdDYaYv5UO0ikkMEfgWr8vhvmp0is9PkZlPIeII80NbHKOy56yaqy5udMKXw5M4GOqUBETeuro331fm7kzDklXOIIsmoHN4Vw89KSes7IDUKKAbRXXE%2Bfnk%2FaYZb61xGR6%2BoV630AosDMxRP1FAgjZRXfzftW79xeoQnulWwwj1j1gHTmeqFDdZCAsW8FHYhZQNiGGVKRv9mYXz6DZTdvZfCh449PYhPDL9DIAXEyzGCaFZr4k33PauUkO8Hlplvb6qu5S0c8nDpk4p4uUpz6VuP7wI6HZ01&X-Amz-Signature=b29e81dc19c55f7145ca7f06bcd4b1a346e1fcf7c3d8d39066fdbc42b79494e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGMLTKTO%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIEksm7wSYwd8MEKBDMaC67qj974unWN3hNgFb3Etg1GlAiAIAzE%2FRmrqI%2BL9EV%2BQo4rGzGR1%2FnmBfWTRDCRHvgm1tCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMhN7kcVIxOWbhOa3DKtwDjLL%2BAyCUXVPDgw%2F0bvG9utXnS80DlFeZVjeHXPPO4IZJCvl8Ip6hk%2FfetwOSStSaVAPzPSDNhPjNcVbvA4oVer0tMHMuG%2FPoCaa1%2FURqVADvjMbwhebMbkqeQYZhu27QZ7e9JlOnYI6WSBFxnmTpO%2BoWSI8PqKs9m7sLSGW%2FS3M6LGfoG2gR9ccNz87uE7SjEPprU800USHzBcbSqlpn%2Bf1mjb8PDSAz2MaO0coZek09JpVM%2FGagJl7eb3iUHO9Q8OSqpRppk0mcq%2BD483WLbUgOtSAAMbNSwVPxRnbTOttZbnBjVmUvd8%2FDS6WqMSb5dbFS6DcsEBPjgbyQuQZVUY5noxxOlGi7LEY8nWR7d0Q%2BdoyoxbJNh6EMadYcW0pyP8UdmN1yYfhg%2FSx4g0Bd0xTtGUpf%2BSKpGR8IGKoJ%2BrVX9gYyc5OB32brqw5QcuBeghhhqWSCqJCFdl5vb%2F0E5npqoVRcXUzt3zP0D7L6fvX9dppr8ZC%2B3oW0trG1hUqio%2F8aG9UtOCQeTunK4ynEfaZJeI0Z4DoCdiDvpCGxlwxn7KemUzgQwEJp%2FGSiJhbs57lUOSQdJixD6Cw6rAnhLbaXyLCP8xfcDlO0l4o0zfk8pSX0zZI%2B0TQ6QZUwuO3kzgY6pgEspEtmSGMBT%2F0Z7Jyd6nQRDcbWFw8o1zOEtms7qMGLYCy5PNNMYKMGfa1%2BJg1MnEXubsEKOxUuC9u4cWhTVealK00L%2FxSpiRGQJmH1BJuPO8dtIJ8qnZDVSpZ7a%2FwPw6sli%2BirfcTAHjuV2hgA%2B8Q3zvuYTSVSiRT55QQtgxoxd0g51MRadC6XUlCoC5kJ0ID0P2NZAelK45%2BclfGgwYwGpsGCMlu1&X-Amz-Signature=1085b176ecf1676a7ee741c331b956dacf59e6b7b1ef65d4a2905632479fdcf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3ZW3LJK%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDTAq0ugUas667dryulvkdYzcLdabnWG0ta6yq2OH%2BEHgIhAL%2BKwVxIwEzJL3mEl0TtzlVqnYIgfMer6mQGbVWgMhi5Kv8DCDMQABoMNjM3NDIzMTgzODA1Igw9d3jp1kL3Cuob6OUq3AMIoQ5%2F4R4g8Q4reOYn7wipKLOhBUgCXJ77dPhB9aeTA2xUbPoBhHrdoGQTAROeTPepUiqIAGf%2B6LtLLIZzq2ILYoyFLDqnNqfdOLiYqb8cbWDG5fhMtZ3VRf4a6ah3wH%2FX2GjG2fYZXXBtzbriGvD1eQipSfQz99iixBOghN4yXBvOwoBvhkIvfIV%2BiIXkVVK5Yh9CdcuCGfKcVp0KgSbIfIe0xcAQW4oJ4TNxpEjTdzOqrX7Di%2BsvieCS6mx34mdrWEFJ7wE3GHVZP%2BsYTG%2FoLeMGhyE5F9xCcWKkCsLtrkxxJUf3EJVw38LaBjtPeXUc5Bwdu5gMuwTCm9FK2OnRfq8PfSicsLxjqm0lJBK%2BebiadZuw%2BkeZbI5F7fmW16Uznx8YE9TYdKnQwNRSKjRAAVYwKgtqlCPpZ7Ys778jnA1IzEKGqIbzoBM0OYk9F%2FPSOV%2BJXP7FhSLhm%2BqO0m2fdrKtUsaM0kZstR1ipeYDdE04tK1NR9Tn8j3ezN9Pk6vr8aXzd6EF0xUSZFVaOMkkGFF3ot3yBbzaXige6z6G1aFo7l3DzBGIQaOJ8sbn23SoPugsFOoINlIMgbNhyCLvc6RqP%2BwLAVsxCZm%2FPXqJtcRLxwwz%2BSa50Ok7ezCb7%2BTOBjqkAdAQF%2FjsuUU2aOEsZ9%2FTbRKfpFYL574cLFJF4oGF73HkPWuMpJviiK4nP3ONH6iGK4%2B5%2FvqRZ9%2FgIMrjb7oZ4WXnXnYKHXOf%2FOqsqfwkPRj7fAH5%2Bdlaqs0uHwWIQk0IzSWO86bxrf4dySrBpotIGakRvJlI9904MxQArV1uPeYzyhs0rc6He%2BE1rXIzRiyLAU6irxbVjC5bUtOBz11l3wVg0axK&X-Amz-Signature=5526c0554b5865e2047da4d48a54546e6418846693698b8ef3224eeb2099d66d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HGDK3WQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHXiFhYnxOrbqW05dRvpNqWXeKiTKKks1lHHIgP0uDPhAiEA8HofQ%2B6V84uMz6L0Leo1OVeVC7902HOz9kozXRdIL2Aq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDN7s2tHuOrYdExqVCSrcAz1T6E2qYARLAvhyuc6S9qmWa2UUZ3LDsx5NYiU6nihAF%2FB%2B7LoB7CxBR2YHB492ob9mzQ%2BgnbbzA5Y9Nfwzow%2FDjE8VyMnxywR%2BGejtFIuMBLzWCskG5gJLJW0gHeLBw2Z3qq9tLO%2FWUu9cCXySSt9f9WJ30mEJXemkcsP7%2Bl80P8VqvcW9Xr46mMceu0x3Kku8EvaTLng5n9tU07k23OUFu1AaOiCFid5Iji3MQgwbJhSdgyaxNUtvZdnQ1Jcj24j%2BCBvXZopRp0WvH8bPh19BQEKjcwL%2B30IbhjO45ln%2Bohwffs9WZThAQbtlElUIzGFgcpdIe9kxh1YJotuOt6Nd10DlFAMDZTGlghoupceBb2QTimhRKQ9PHm3y5KUcUgAGr5BbdfkyR7iTHYtOVQQlUUXbi2T1Y5wN7dRHlHP%2BxfK1%2BCFQlepWigeWhuWvhcMO0w%2FsjpJAp3cqCd6MXfLvFdTtceTXffszbEqWwhLOvvfyn5XGIlj5gG7SDRxpOZKUNd8Xg0GDcSL%2FxM%2BsyoEBMDciFpagQvgW%2FgrLVaGEIFl7c4cO8C%2BU62dBFjwxB8R74YuElPym5vm3W8f5JIZ2I8KQXTvPDdNbZ7rZ2wbMti1MPW5J0ifcFdprMMTt5M4GOqUBQp%2BeZH7SJuPU7zl969joOvR5UsLR7oTHvKEwrQNyA0BWO4rndU8IZ%2FarRQwW%2B5rRMimUz5Y4ifZOfAgAPhd326HBCN10VHZ2rONoTl4oV6zwfJXqL2fV3sdfS6yOWUaFZPDUgrTOEE1%2Fb6oIbR9QFfBE%2BIIJBVyOdry2pQLutZrn0jCTSuh62TQmN4%2Fws0nzYV%2FCw2F5IEs4glNAPX%2FSv8cqyx8z&X-Amz-Signature=427a9f8067375a6c8993fdcea3434c0bfe22e1c4a2e0c04f340869b7762b1604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HGDK3WQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHXiFhYnxOrbqW05dRvpNqWXeKiTKKks1lHHIgP0uDPhAiEA8HofQ%2B6V84uMz6L0Leo1OVeVC7902HOz9kozXRdIL2Aq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDN7s2tHuOrYdExqVCSrcAz1T6E2qYARLAvhyuc6S9qmWa2UUZ3LDsx5NYiU6nihAF%2FB%2B7LoB7CxBR2YHB492ob9mzQ%2BgnbbzA5Y9Nfwzow%2FDjE8VyMnxywR%2BGejtFIuMBLzWCskG5gJLJW0gHeLBw2Z3qq9tLO%2FWUu9cCXySSt9f9WJ30mEJXemkcsP7%2Bl80P8VqvcW9Xr46mMceu0x3Kku8EvaTLng5n9tU07k23OUFu1AaOiCFid5Iji3MQgwbJhSdgyaxNUtvZdnQ1Jcj24j%2BCBvXZopRp0WvH8bPh19BQEKjcwL%2B30IbhjO45ln%2Bohwffs9WZThAQbtlElUIzGFgcpdIe9kxh1YJotuOt6Nd10DlFAMDZTGlghoupceBb2QTimhRKQ9PHm3y5KUcUgAGr5BbdfkyR7iTHYtOVQQlUUXbi2T1Y5wN7dRHlHP%2BxfK1%2BCFQlepWigeWhuWvhcMO0w%2FsjpJAp3cqCd6MXfLvFdTtceTXffszbEqWwhLOvvfyn5XGIlj5gG7SDRxpOZKUNd8Xg0GDcSL%2FxM%2BsyoEBMDciFpagQvgW%2FgrLVaGEIFl7c4cO8C%2BU62dBFjwxB8R74YuElPym5vm3W8f5JIZ2I8KQXTvPDdNbZ7rZ2wbMti1MPW5J0ifcFdprMMTt5M4GOqUBQp%2BeZH7SJuPU7zl969joOvR5UsLR7oTHvKEwrQNyA0BWO4rndU8IZ%2FarRQwW%2B5rRMimUz5Y4ifZOfAgAPhd326HBCN10VHZ2rONoTl4oV6zwfJXqL2fV3sdfS6yOWUaFZPDUgrTOEE1%2Fb6oIbR9QFfBE%2BIIJBVyOdry2pQLutZrn0jCTSuh62TQmN4%2Fws0nzYV%2FCw2F5IEs4glNAPX%2FSv8cqyx8z&X-Amz-Signature=6353b3437b7510553329dc59fd454e841daf90769b223cb1342f66005317101a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674XIIO6N%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCB1nm%2BeEnmt3JVsyZg7WKv3Cs7N6r%2Fh2CKUSwIBtEr4wIhAKogxd9FVmS31x1Y%2FXGG1JQ3dvqbXPMxZgWF7Af4%2F8jDKv8DCDMQABoMNjM3NDIzMTgzODA1IgxeB22tvHaVvQfYBMsq3AMqOLI9QV74HOQXAG1jH6PRIZJTasNo4A4ssvnNTPqwMaCqixeh26xqGMcBDKzQUd%2FYGl29Ea6HwaeZVXGrNfCJfepEbEu%2F%2FSi0nkyENguECKwNtB5Bo7K2nkr9t1iqRZa9JjpPP2rEui7Wa7JWD0GEZg0i420FPCToie%2FKCNKflsGNFiIWqoawSigoTxkbnyw7BaL0b50RiXa6MwOnlWnDpQ5zSfU0Lsi7hYJvAwNEJjwf3fZFKFd7kLl1IR5uL8xWkBFOVqa5RzVTPD3la3IK8hUSghGckgPj3U6X8R1ODtdQMkZ9tDeOG%2Bliabv81im6pCakdegIHPH8mjHd4tEKVLWAgEVbf2S0DYtJuNdv3e69PlfNYloLl%2FUq4F6jorgZ2CX6KUKCPD4lhpn6KeT1gx2%2BKihE9zNWXOYjw2bugO6S56Ky7A%2FZ09v%2FHOLQXPOe1m34scs6MlLTR%2Be9MGGWQG97LsdNSpXTft3%2FWsGUDRvnOm35lyLzw0%2F1J60lC0CxMs4AiCs9ec5OKnJuCEdygwDIjAVxNwLchyXGDsTFhHEo1FintpZ8%2F7xqtZiWzodM8n0Y15eQes8dqJcblUy%2FbRtpI2xRaufB4i4ElcKa4%2BvuIr5Pv%2BdkEeZJNDCx7%2BTOBjqkAfbMU%2Bv3ipzmTdN235xVk1BjkjmTD9BqOV%2FiQAdOjolGnMYRaeBBFiON0f1NtBdTgHGc3DsXe2W8USliTV5ENO7lyxYqGytDGW7zke7WUDWhCuKb2xHAcSueKQ2T2wYv7Sc3jN%2FRqmR%2BlS9lxpGZfrdoQaGdCwD1Gywsb%2FF1ZwiU5fL%2BT5DK%2BL9BAztBeHONSfPUibyAyPi7t6eArX5LJzCenAit&X-Amz-Signature=99dda82fae905f45a07d02fb383845bbd0024a162329f774b55ba960f1e98db0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GZZTSV3%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDpNpDkbyx76hsTRj72TSyd2tVtfOm1cnv%2BTBvalf56OQIhAPz3fNdfq16FTl55p9QvB%2BVFzowJV3bczBJ0OupphmPHKv8DCDMQABoMNjM3NDIzMTgzODA1Igx8HpEVSqMec3Vl%2Brsq3ANorH2sWdIVf%2Bl93VYjUErcw5jt2fgqVYVl25gncEQieeXiAxZLmpaW35KOcp97z0PP7z2nlApl%2Bv1xaaMbFOPazF5LsBpxLkMNGpKyUzTz8i9nnWZA%2FyoNx%2BwBkboLza5XchLhhWAl%2BQuBlayP%2FZ1TaYdoxWPfO%2FgRfBRWcGFMC7rzhNGWXfCmHNj68ErmPQUisREgCtPxyucd8ErjJkdJxv6PgN%2FBroIYCcppd0HZqGMVKqTruJEAEbXduniTIoYmQMz484ztf1N%2B%2BCAq0QalTJ%2F%2FSS%2FYzVdzBPPChPU37Rgj0zmV%2F6sumTXkZ%2FfoiViE6DmJS%2Fbj363Ej5jCfov02%2BZ1MgidrC6EgFdojV3nREG7yc8HJML%2FRMApczzoMU9RhR%2F6EekrGmosYaIcjYuKQBk4eJbqYzKUTb4yKTkL32esYa7xp%2BizvFw3YUzTem0C1lKJlTcwPL9XGGR9ke698uBeqzIdPfkQ2dCAFw16DNhZxPFbrcRqETrfEzSpS%2FFrfPC5qzzQJmjp%2Fyehu%2BgHG3aX7hxdB%2Fmh5UP8Ll2vEGQ97RaSRYWRt7ewDr9AfhjVqb5dtR4fS%2F1L5JDrHRVFqruWo9pvCivFTn%2F2h0ZmV%2FTbOCeS6vp%2BEVoHyzDp7eTOBjqkAURzIGjU4n9tzulLs4phPUF8aTXB%2F7DNzT7dfmgBS9n8kPvgfUoY2eFsKvFOk6g8x%2Bfnq3VEWrymb1tYKbScvT2lbXFKRoqAcCk6kjjboIZgZAiLR2ttZ67e%2FMRc7MfMWEV9p0nu%2FSAjreV2i9ZiwpQNzYMnhDWSiGzIx23oMqlHnnrUdMq2aqtWuv95kCUaZCyRWBFXaMXNjeSSLMSY64YRNaco&X-Amz-Signature=50f3b5fcb568c24dd93accc427d7020473298772714809fa690daebe66d3c4af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GZZTSV3%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDpNpDkbyx76hsTRj72TSyd2tVtfOm1cnv%2BTBvalf56OQIhAPz3fNdfq16FTl55p9QvB%2BVFzowJV3bczBJ0OupphmPHKv8DCDMQABoMNjM3NDIzMTgzODA1Igx8HpEVSqMec3Vl%2Brsq3ANorH2sWdIVf%2Bl93VYjUErcw5jt2fgqVYVl25gncEQieeXiAxZLmpaW35KOcp97z0PP7z2nlApl%2Bv1xaaMbFOPazF5LsBpxLkMNGpKyUzTz8i9nnWZA%2FyoNx%2BwBkboLza5XchLhhWAl%2BQuBlayP%2FZ1TaYdoxWPfO%2FgRfBRWcGFMC7rzhNGWXfCmHNj68ErmPQUisREgCtPxyucd8ErjJkdJxv6PgN%2FBroIYCcppd0HZqGMVKqTruJEAEbXduniTIoYmQMz484ztf1N%2B%2BCAq0QalTJ%2F%2FSS%2FYzVdzBPPChPU37Rgj0zmV%2F6sumTXkZ%2FfoiViE6DmJS%2Fbj363Ej5jCfov02%2BZ1MgidrC6EgFdojV3nREG7yc8HJML%2FRMApczzoMU9RhR%2F6EekrGmosYaIcjYuKQBk4eJbqYzKUTb4yKTkL32esYa7xp%2BizvFw3YUzTem0C1lKJlTcwPL9XGGR9ke698uBeqzIdPfkQ2dCAFw16DNhZxPFbrcRqETrfEzSpS%2FFrfPC5qzzQJmjp%2Fyehu%2BgHG3aX7hxdB%2Fmh5UP8Ll2vEGQ97RaSRYWRt7ewDr9AfhjVqb5dtR4fS%2F1L5JDrHRVFqruWo9pvCivFTn%2F2h0ZmV%2FTbOCeS6vp%2BEVoHyzDp7eTOBjqkAURzIGjU4n9tzulLs4phPUF8aTXB%2F7DNzT7dfmgBS9n8kPvgfUoY2eFsKvFOk6g8x%2Bfnq3VEWrymb1tYKbScvT2lbXFKRoqAcCk6kjjboIZgZAiLR2ttZ67e%2FMRc7MfMWEV9p0nu%2FSAjreV2i9ZiwpQNzYMnhDWSiGzIx23oMqlHnnrUdMq2aqtWuv95kCUaZCyRWBFXaMXNjeSSLMSY64YRNaco&X-Amz-Signature=50f3b5fcb568c24dd93accc427d7020473298772714809fa690daebe66d3c4af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE2OBMWY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T193428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDJa2aBC62A6bmjLAs7fQxvAPj3B6tLCY4ttg0dUDt8gAIgEtkjMjeMgRxFW99f1hFp6ENAN7lXgmc8v6PcGt3G5T4q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDA2hL3dUI%2FTuVV264yrcA7WXQxUgfKZJ56B25IOi3f69Xx0J6CRbSlV9RY7N%2FE%2Fty2NDrjNs6NTuOwEpu%2FfNwI3H5gJdabN8JarPOet91u22f1tOmzO9erJX7Pps0Uac03lidH%2FvfwLtUJwNM04eb49a7kv%2BzBV26YiUBPo5RQMqD%2F7Wdvf%2BlLGYiOPXAeLnJy1sWBmCJA0DrUyhZAi8ldT0zM%2FPfUM2qeXTuc%2BR9QWHXiB1qhv0rTvK7frTvWfVfB%2F50RnwsaFAiaHD8BnYu2uAxcAfnOKP2u%2Bl9Iy%2FjJ17MFgOI8mD10VTeRWkeiEl3GFhK5Va2bFshiV9s2p%2F4MDxuE8EpB5fzw2u6dog3HSpBvtxSzZym3IHF6tJqXvAk%2B0hl7ekSKxnL%2Bu2tB0ztThfSfjmehoydcyJJKMr%2FZipoqVjxpMmRi8iCoo3%2BQ%2Byt15fXZ881fAX88chntipEJkXoqAhtboP%2Bnpow%2BPy7W9MftZLveqsvO7vNOnhI3K6TSuJ80nasBYQE8BOQOmCzmxT0oYGVvXiCp79pkv%2B%2Bep3fOUaN%2B%2FFDE7v7TVz8PDq9uPDd9xG3bLBxYWk2bydfsFEx9r6PqgzTMk9X8oBfHr4pGGTNLfVooxUEgbkbw8I8r9yq4g%2BTvM%2FcalZMNHu5M4GOqUBy%2FeoUgdmmJa52VakwxjO6AymfRwLLZPfA41AkS%2FB3I0SXkt0BqJHaHvd457CadZQ%2BnjRL8Pbt0qcTjTItcDJc%2BeH9dpEvsjUW1scMgyuWOs9nJ8mLypEiHk44rTmojes2fWxnlocaEceXyf69Sw%2BTiiTTWBh%2Bs3bgcFRvJtw8VbDTvSyp9Ktf1WYvhRh2PVUfYz3vc17MnNWZvts4Bfu3tIrDeu4&X-Amz-Signature=4c2f5f11fe59394c90fe355ec11695df2774d7be2b6fd6186068c0b69cb57acc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

