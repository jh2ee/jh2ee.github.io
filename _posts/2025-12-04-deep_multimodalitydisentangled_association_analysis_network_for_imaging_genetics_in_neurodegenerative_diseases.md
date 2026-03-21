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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFU5D7AS%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCq9CoLNdM2XhXxsBZuCJzB6lbFgY%2FVexCwnJUTuwUrJQIhAOUfg6%2F8A58b%2FVVnetLExf%2BIL5N4QOXe%2FYpu29hWp7cWKv8DCFQQABoMNjM3NDIzMTgzODA1Igz60rAQrSm5awepTCIq3AMygQlvvovXIdcALeS98L8vctaAad9CSa9wMEVQ6aTOPP1oEnweEzYmnoQQM5qk3mQw4T%2B6M9FL4oy8j1XX4Ob9hg1IDtEGNi9TLeFitFqCBsNtiQ92gQFY6GWg58VdPJwFSn%2FmDsNJVbeWrHSgBUVplRbdz4PXCsZZmp2AQyvYphYDl9jypsbES3i3J56jzmhLbxEOEmGQhWEyRJj2RkyKWpcLHCN8r0tV1zmRrnpmlICR1UkktsgAkL9nQGrAkpw8kxiT0%2BX1kR%2FXYXuYKV34D77F2LihUbPuUjsBb8bTteIE0DXEeI4XhY%2FcmuyHREKjSP7tXiI6fF202H%2B5UGVMPdKp32mlDScx8QyxhJ1kzvM9CctGwPkG45Qn2ZOd7FrFKo5TaCQzwBSU8tKCMXwFxlPMO1JaNIYFWADYTNWcYeNeSb%2FQ1wYBlw9Szxez5cfDyNmBWJZJLe6ImLvUWLSmKpz7Thed2JHPFV45FFxY12XqiX6DOQ57ZNIxdbQpCj6WtW3QWL80tYs2zu4mAHuOp4Dla6iQt94R6lUAo1jCEYG1Js0Xwua9OdrnDZ6CPHf8uq3%2FClsuLPZRr%2FqaEbugmTFsrDDeo1rpgaqoMrnIq%2FkjOIH92fJgCfsU2zDAx%2FvNBjqkARbPyDFWWIgog6cZmFDSexdLEQo3F25KxeniFFgpVHisPjjZW4eGJ2dmUfmsHVlG7k7YN09U3wpDk9uW%2FrboUzwTXt%2Bs0r%2BgqeQVnxm%2FP6Keg6dk87F7sN5JlHTglaZfRsDhjvkzrGh7ARVA%2Blcfzm660sG787VHuciEBaffg20wTSpsRWmo%2FhuOLAjyseqnDIMPFGT3LWzo%2FvOJ28rheKzq40mR&X-Amz-Signature=4711df57f6335f3df4364342be014088583661d92a92148176ee3d56f9bc77e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFU5D7AS%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCq9CoLNdM2XhXxsBZuCJzB6lbFgY%2FVexCwnJUTuwUrJQIhAOUfg6%2F8A58b%2FVVnetLExf%2BIL5N4QOXe%2FYpu29hWp7cWKv8DCFQQABoMNjM3NDIzMTgzODA1Igz60rAQrSm5awepTCIq3AMygQlvvovXIdcALeS98L8vctaAad9CSa9wMEVQ6aTOPP1oEnweEzYmnoQQM5qk3mQw4T%2B6M9FL4oy8j1XX4Ob9hg1IDtEGNi9TLeFitFqCBsNtiQ92gQFY6GWg58VdPJwFSn%2FmDsNJVbeWrHSgBUVplRbdz4PXCsZZmp2AQyvYphYDl9jypsbES3i3J56jzmhLbxEOEmGQhWEyRJj2RkyKWpcLHCN8r0tV1zmRrnpmlICR1UkktsgAkL9nQGrAkpw8kxiT0%2BX1kR%2FXYXuYKV34D77F2LihUbPuUjsBb8bTteIE0DXEeI4XhY%2FcmuyHREKjSP7tXiI6fF202H%2B5UGVMPdKp32mlDScx8QyxhJ1kzvM9CctGwPkG45Qn2ZOd7FrFKo5TaCQzwBSU8tKCMXwFxlPMO1JaNIYFWADYTNWcYeNeSb%2FQ1wYBlw9Szxez5cfDyNmBWJZJLe6ImLvUWLSmKpz7Thed2JHPFV45FFxY12XqiX6DOQ57ZNIxdbQpCj6WtW3QWL80tYs2zu4mAHuOp4Dla6iQt94R6lUAo1jCEYG1Js0Xwua9OdrnDZ6CPHf8uq3%2FClsuLPZRr%2FqaEbugmTFsrDDeo1rpgaqoMrnIq%2FkjOIH92fJgCfsU2zDAx%2FvNBjqkARbPyDFWWIgog6cZmFDSexdLEQo3F25KxeniFFgpVHisPjjZW4eGJ2dmUfmsHVlG7k7YN09U3wpDk9uW%2FrboUzwTXt%2Bs0r%2BgqeQVnxm%2FP6Keg6dk87F7sN5JlHTglaZfRsDhjvkzrGh7ARVA%2Blcfzm660sG787VHuciEBaffg20wTSpsRWmo%2FhuOLAjyseqnDIMPFGT3LWzo%2FvOJ28rheKzq40mR&X-Amz-Signature=4711df57f6335f3df4364342be014088583661d92a92148176ee3d56f9bc77e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EFHSNPT%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGTOIvRczNFECcBdSUhiOt3bMAXv2Nzcvb1kEDp%2FX7EnAiBmzRJbxoE5xy31QpTUk%2Bt9BjH%2Fz17PZxI52Q%2Fxcgffnir%2FAwhUEAAaDDYzNzQyMzE4MzgwNSIM4tyJ7vUQ7wvsblCCKtwDUdvur%2F4Wl636xuhPWtApa09wQ%2FUBM%2Bk1wt9ZmWUYZBA1z%2BQfPt%2F95VlYpIt7tVL9wJ5my%2BApfJFj4KaOLQUFflcV7p0HXlnVD3Djjs3fdSmRr6lKj53nOus%2B67R3TWTPz7F2lAlcAtiak7qM%2FWWIKFpYzLe4odkXTIZgKMMQZuz2dUZwpP0TWYsDKrscRCDeFO4NBxQamFDWYQBY4LMAiqb6%2BqdCd2HfhGoABBlAgg3D3g%2BEH19MyM8uyoTd4M9La2%2BRUTAwZTBFvCCn0uijOFD4Dew1tHZoPamM0g0B40ocfkIazuv8LM%2FlDiQmAYq%2BZOCcWIlqaCsMhN%2F0R4y8ByRlWYh8njIJ3cGlO6mdari8kexgsIA7x6%2FWaP0ANgnlfMaYsAh%2BS0T40K4ofpN2hLHO%2B%2FT%2BfrNmDKwd1Z4NlOMqM33BCBYdgnrMAEo9tkTSvajC4nPVa93WfnmSUZP2CYSsbgkyTDKJVnfX9aQlw6UovRokpVXHTORLet94k1mwYhoWiEr8274P57ZqOKLQrLE2LbnQ3JH5CzDW6tEmdN1KlRZESFauPfQDX0gXWifN3DD7JowHqb1ik8iAzfS6%2BeGZQOTahZbOOUPJOHHp2rMxDiKve2VLk1cyiZcw88f7zQY6pgFTh2tOFI%2Bqfn70wwS9M53f%2FEKpniy%2Brs3YQIO7prKJ0uqeHeEhdpAMatN1kaf%2Bec8yRbtRl5gc9Yw6S0h4fLDXb%2FffroiOEBBywtaf%2BRyuhgQha%2F870WJ7xgaVOruYGCGxc0csyqQWtma%2Fvr%2F4X28X7D%2FWGHLDIXUVzppi0vr%2BiHN9DGTn7aTbHcN7ONaMHDmdAX%2FVQBldgTGi%2FRHMHTuvxjPPcQVw&X-Amz-Signature=54c3d653dc5b1c5a1ab65c9c20ce4e46eae169f90f37f234cda0bf2eae661a25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVMGULYE%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICdZXnCCezBU9lXt%2F2v4vVjO6B5vssBhIdqQ4W2GyO6aAiEA3GaI2F3ah4%2Bww88BME3MxoLNf3a%2FX132mjc4jge8rd8q%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDJhf95bV%2BkNcQ8dybircA8zeai4LW%2Ba0JAMVz5p1bnkUwmNDYqU9ts4dGRzyj94XofjIPYMDP%2ByR3R4MeXsm%2Fpdwd%2F5v0%2FH7nRvvThy8IQcELZ1yJJLf7Iq0SpGwJX2a2vkqMzwAXDfZdA3AG0V0U4La4BcXVvp5TmyLWkIeGmKKnkNHMhY41ss%2FQUMCoZj37i2R8FmXSJY2caVH6tENRpl%2BcwCepEhZwlc%2BxPdMi4g7lgTtAyzOhooit0Njy9D32uSJir1CZmCfOpUDhBwuUSh55CXo2P2ZdMrPPTDgvhL2hj9gcnRR%2FRv9K2k2FRXpuqo%2BDieqkbNwvtLkU%2FYAH797moPLf%2BnLrFLXZOH%2BHuJ5aZ9tAoSi97%2FvFr%2FbiNGuJ1xwrFd8DSMIJ3X%2BDqMbY1WhLCvEaXSdVkM1X3p2eVapcYgoP%2BZWkPetv3yyAIIIuAE8fgIBIGLsWZiMfYHzQlZuzzKwYZeDndDBSFtPqiqkvSuD%2Fl0MeOW9tFA3JRnI7hiJzLudv0ejvIwsc%2FvYFInhI%2Fxl065cdJs4WjXkVhW0gqgvB68JW5xnzjI1KdAto0wqk2T82AceBDBRuzQHCb3sClu69ByI%2FQ0OpCj4kltENvxRBlFBj5TVG2v0BHWD8xD7i%2FeJtMC8XwFjMNbH%2B80GOqUBcA%2BQHYleL%2Bo6BXs5Wv5PAowpKe9RhrcPEY5zak%2FeSCErarKeJwgatgzSR9f9uzvQf9V1I1wd9isEDlHnNefjTT9lKozEyx1t8%2FdfgpfjDLPY4KLcLd2NZEUM%2BboRGbQUQH0ce54X4ol0cQR62oBfjF%2BGXe1IETcThK16cOtL%2BEQXny1dwmMUaV5LfAbEenj5bpnNyoB5vZM9K%2BYJhhZYzoUs7PQ%2F&X-Amz-Signature=ca4a0049256416baddd00fc79cab3d25d7eba260894ee8d0139b0dd64ded4020&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVMGULYE%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICdZXnCCezBU9lXt%2F2v4vVjO6B5vssBhIdqQ4W2GyO6aAiEA3GaI2F3ah4%2Bww88BME3MxoLNf3a%2FX132mjc4jge8rd8q%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDJhf95bV%2BkNcQ8dybircA8zeai4LW%2Ba0JAMVz5p1bnkUwmNDYqU9ts4dGRzyj94XofjIPYMDP%2ByR3R4MeXsm%2Fpdwd%2F5v0%2FH7nRvvThy8IQcELZ1yJJLf7Iq0SpGwJX2a2vkqMzwAXDfZdA3AG0V0U4La4BcXVvp5TmyLWkIeGmKKnkNHMhY41ss%2FQUMCoZj37i2R8FmXSJY2caVH6tENRpl%2BcwCepEhZwlc%2BxPdMi4g7lgTtAyzOhooit0Njy9D32uSJir1CZmCfOpUDhBwuUSh55CXo2P2ZdMrPPTDgvhL2hj9gcnRR%2FRv9K2k2FRXpuqo%2BDieqkbNwvtLkU%2FYAH797moPLf%2BnLrFLXZOH%2BHuJ5aZ9tAoSi97%2FvFr%2FbiNGuJ1xwrFd8DSMIJ3X%2BDqMbY1WhLCvEaXSdVkM1X3p2eVapcYgoP%2BZWkPetv3yyAIIIuAE8fgIBIGLsWZiMfYHzQlZuzzKwYZeDndDBSFtPqiqkvSuD%2Fl0MeOW9tFA3JRnI7hiJzLudv0ejvIwsc%2FvYFInhI%2Fxl065cdJs4WjXkVhW0gqgvB68JW5xnzjI1KdAto0wqk2T82AceBDBRuzQHCb3sClu69ByI%2FQ0OpCj4kltENvxRBlFBj5TVG2v0BHWD8xD7i%2FeJtMC8XwFjMNbH%2B80GOqUBcA%2BQHYleL%2Bo6BXs5Wv5PAowpKe9RhrcPEY5zak%2FeSCErarKeJwgatgzSR9f9uzvQf9V1I1wd9isEDlHnNefjTT9lKozEyx1t8%2FdfgpfjDLPY4KLcLd2NZEUM%2BboRGbQUQH0ce54X4ol0cQR62oBfjF%2BGXe1IETcThK16cOtL%2BEQXny1dwmMUaV5LfAbEenj5bpnNyoB5vZM9K%2BYJhhZYzoUs7PQ%2F&X-Amz-Signature=ce66510d8d09feb132f8c3cce7aab552a3b8d8f569643807b7b57700ddf88f52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQQOE62M%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCp2tw27DI%2F1LIadgdFYJqEgrz1DEnhsbMsrZ99xFX4VwIgK5itkvZypmIxlQt2MllRZ2ivceu9%2BGr7oQqAuW2%2FDXoq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDAW%2FbI6BQZ1XMnPTSCrcA3ntlY38iwu8ng7cdZ%2BCdajA4qNf5QSx%2F3borEPhNwdHHCJq6N6QYvswXN7yjV9XZrpX%2FaOgVEFgHyfkH6nK6FXJuGR9oRwxJqOXQ%2B3W02l5kgYsiEDsNpf8EOqK1fH5qyIlmtaHpBTourBtkpEqOcfvjfVmaCjaJPS1XlI7V4M7HtovlAtBA6cUpq6ejQGbEvxlc6XGFk18LEHjS1%2BA86uSV4Op4%2FQH34ml%2F94G6SdOveXzvtEo5If83Ty%2F6k2KmUTQ%2FurI8q5QkpH2s4iLNixXwx6%2FI6zDSVuFdPMq7DZZBQFAUUmvFTUxbRk8nZXqlzWazCIHZ%2F9wjGI3YQbdRUMJZ7tmrtxCGgKhK3%2FD9p4rUMjC71%2FWFg12pzixR%2FJKeF4higz%2FiE6Cojhm3PtnRM%2BNurAEgeGrj5jHlfx5yt8FT9BAHrvrheR%2BdktrIwKrYF35UopMXuAUj2cGysxqUw%2B2xOScLzB2TxEUo6%2F6PF5rG%2F36r7mjL4UsIhDinrRqwI7rYf7LHE5aglTYtnngJqoPxqn6NUVWmOseEVSxyRTpxoR5hmueK3v4hfk1sqZnG0JoU1mrytXBVuuOrtVhbw4JTvUKAvCMFef664eOHD5s8bj8g8El%2Bx0EgYZHMPbI%2B80GOqUBuhJ%2BheGWGzty0aV0oAgnRBtgXByfn0HswRZErHHwP23DR2Hkc9o3TT2Oa3QvzNm9tKZkDkEVKBbbyIzeFUNl2aM9O2Rj%2Fk3%2FV1WZ59rtKJy96ShzWrKrStpa7XTtcITjJVS%2BuoWszszw5R8S6BRaY%2BRxauTadbK94OuDDhcQ%2BJbkzyMEnm1sLqfmVP31lK7y6%2By8VxEec%2BOGUDRkmAKCH3gDUM8l&X-Amz-Signature=5af327827ecd5e95b3045e870f088d869ca64e871c33164414b6ad11f4fb7ae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RCLL6RB%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDLp5W4lQYAaW8xx0vSA16zc5e3zKOgZTnfdO%2B%2BjXoaAAIhALR44gsG5qdOtnKJPZMJJr7dFZGL%2B2dYOxOw7M6i6VYoKv8DCFQQABoMNjM3NDIzMTgzODA1IgzVEqcdA%2BelccyMUF4q3AMr7bqKpxiVswGk8ZcVPHdMnMvuKby84Xr4kqKYa02p3aW%2BhUpQVnLIhh%2FtRanyHPYKW7ZzdR1NittAyoEvK3RqaMFw8eEctF1g1sHGiFeFn3%2Fp7RfDydQReg72qP6Z6gvjZeuCUm0UJAHu1y%2BKQMHmq9bPoRGrru6rsD0teI%2FKVku%2FxjnDt68fT2HFBP0EQg14qZMqhM501uGEsurj94KrxldbXXapcgJrRdNJqNvpjKlVQ4xGzCJjoaMUxd7buN3kwqvx8b76wQ0RZYhArM7xCof0yQ%2F%2B0x8E%2FjoiVRO%2FH01QhiVCc27v1cNF8Oov4Ty0PoPH8XYEZX4qBAtfe7cBK1nSwXW4b0xKXh6%2Fi3yUURV4OWDmeo2B35p2k%2FoFOt3aPbq5yrOkdLm8xyNBmbZb89IMmtgqjlsshol1k8dmDf%2FYIxa5wtQUsvc94xsawJdxN9bkq%2FHS37Y6L6eeMqhVtCCAPbuRjHD6J9ECHWR5TZDy0v3Xv%2FjkSJPSC5vUZJPh5%2Fs7o7PHq3AWuYP95IqXQ5h2NNGbQHI%2B10321IwoKRwqcmWZh9KrhvbkGSb5u7%2FV2GiZ6ca5J75C0BRhnKbKM6JB6MiX%2B6qT89xcJJnKTQW01xqVDjAg4J3a%2FDCTyPvNBjqkAZCsGUnpRqM5e7K4yweP0U0oIDRsW7vsPYnbKvyvFKS5LuS7bywc%2FdlSdqgr5wrrHsLPGpDDQDT4UqGdrSRIFI%2Birkpr6tYmjoqkgr5dKAI1xfS%2BVDTcCU%2FVOmX7mrmd%2Bu4RFtbk1DwaCXjL735a%2F7qB0uHYHK0Fi%2BsaAoCWjskurGWolis2Zz7l15KTnZNx50MEL1HcfhchK2Z0WBJgF4LZSpGm&X-Amz-Signature=aab8c35a72e3b88a13ebefc2dd2999b02fd9ad1b943e0ed28fdf885b4c30c918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXCCADOJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2BQaVZ46EG8n7cw50nalXcr99KpEF0SqLk7nlW6GCdZwIgMfehf04YreIFUcD4c8dty9Q4ytCxz94zH0JY9uDBPRAq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDHac7iYyOUw9%2FhI6lircA3J4vGOt1T9PN2wWqISkqciDi2htZ%2BpGrG%2FJnNU53dd1ydnUlkDfSoZsdr%2FqXFk9Gx8zCdwZTQtYo1Eevh3aXrhJeIfJ7tscYCoomGk65%2FF3ptTDWeUdAVHHeo6pIapbLTgyRqeXhqnkRaPSPeZ8Xoz7U190XqR%2FP6peWN5fAGXBYMD1iSEuZRkx1g5J6HfGCGEYpnHeADNHPtnJTniMUS7LZDN%2FeSx3y7BVuTIe%2BFp9hv9%2Fti6o2V5g78O0K%2BSwFF%2FuVqEwoB5wXOfGQpZDQdITdhLusTB9YRTndXzhG8J36bnjNiT2PiDZ4iTgYNCtd7J1ft1rFhYnENL8Ynjatzy8WbzztDfHJH7H%2FKbxpKQ%2BAmq%2ByItozQjhsZFbj2Yw7qWoNVE86MwDjgSvrHZ%2BtfRNZOrtEmyfkGeYt%2BgG5PwukTUEMaef50NPAxS%2FtS2BxBTeNLji0m6C1nOPf3AolQ0RleiJ3wOZOr5Vo1vKxWMmbRGRUGml7skoXuaAlqxQA7zYylQ4JwmLR%2BaEvqB5%2FTHH89e%2FCPxwAxCSxQYt7m%2FVPem2E8esYcg8dfRwr8vtdCl1VQ9KsoumSwoIxa%2B7kDjcRUrpPJRSC1cxwrT5e37qLWv1QKmpsr5O8xgfMNPH%2B80GOqUB8Vj3UCGfSa6IK%2FY7%2BONXLTmcS%2BaWiAxvylgT8hSuW%2FN9LdhMjS8di7esDbLOCPv09sLo0NzoCb%2B3QBWldIfIpU9v2XE2g18xqDM5AJW7PG4QAMLggpvo2Wrgy41z5Ebe8Df%2B%2BAEfpLu%2F2Wr4we0IojOUDN%2BGFh4T7dF95GBoNpUTlyY5%2BPo%2BTlayuXcHJRQdGGWBdn%2FdxxBJSCruLOdAkARiQ9kr&X-Amz-Signature=b4baa937abe1b686a6cbf8d8eb1598c0ad368b1e431f7514d62d0b548189f1e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOF2BTES%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICoXhx7lDfZzfCPH8MfzNm0iacQVpxZa%2BVY%2F%2FTqin%2Bl8AiEA0lHvwlzB2AnRq0ajyDJucOwzSLiDPcVuHG2Qh5fXezwq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDPa0UX4mBKnxDhL%2BOircA567M6%2BD3XgFXIgdkTEH7plM%2B1Pje28AI4uFWfzP%2By1bccnQGCIYA%2FijTrf2DneSDh9R7QdHUv4rmRIf07j7O4Nzq828NpUvnWddX5%2Fmcu3qAoJzjATsGEbYirqCoVqZainlWz6gsvGsgplpSI8ignzqIUXUBXi2jrvnSWHctsLBZCIcVGxlAEeuOwnGox7qJFWJBCdwY84rxKBZTzqAis1mtSABABTAL6aJY35HRRw603xU8GqkwicPHP%2FAdH2R9pH9x6J3cEU6NvIjtB3AenMDQ3tmZUb45vUmXwT9p0ohOC4XhEZS72ORR9iQv1yDq557qjVd%2FRVh%2Bc%2BeFaFgVe0QKcEgUJtUqqnXE8m23kGXQTfoIl5XHZLYWF1C1zJjeKWyMI2sli%2FOcpgmEQMcyW%2BrHuk7efWSmHCiUZcUFB3QVSlBdm1ojL1cPKJhIR9VB2WZBhG%2BLAzyfodvLqXmRCrZwNHRAYasiJSL%2BILqKslepbwpJcCzMeS2StqaLzxSd1c6AaB4nbysZBx%2B1zXQL83WEjFrbUY%2F09nI16RS%2BkEDMMFztEId1cYnFp7zoVhwIMNhMwjHKEGXxfUb6QPCvV0elZ9TfzjjLPmHqXyca5ryYadQhdUFX2icQQkaMMLH%2B80GOqUBvuENvCTiPHH%2Fb67tEtnQ%2BOU6mJZSVWVLHJYWdWiaiMYOgrKjkCdi%2FBXksN2kBtNuD9rvpqphhPrQTPqoWvTld%2FFi6XlZsTEbToaVJpGBUKCgq%2F5%2F4WxN6fBaMUc3BVQql4cujZLoobsLMro1aMV%2FnDVcDK1ReHUctLQYyuvfvMZXXYoN%2BT%2B7iLAS184TdZeXCHjbe%2FPd72DsHqhDJ68wV84%2B6C%2Fl&X-Amz-Signature=fd80c4df04542f3ad80999f7eb10091a4ab2325fca355715406d9e9e57a55a7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOF2BTES%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICoXhx7lDfZzfCPH8MfzNm0iacQVpxZa%2BVY%2F%2FTqin%2Bl8AiEA0lHvwlzB2AnRq0ajyDJucOwzSLiDPcVuHG2Qh5fXezwq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDPa0UX4mBKnxDhL%2BOircA567M6%2BD3XgFXIgdkTEH7plM%2B1Pje28AI4uFWfzP%2By1bccnQGCIYA%2FijTrf2DneSDh9R7QdHUv4rmRIf07j7O4Nzq828NpUvnWddX5%2Fmcu3qAoJzjATsGEbYirqCoVqZainlWz6gsvGsgplpSI8ignzqIUXUBXi2jrvnSWHctsLBZCIcVGxlAEeuOwnGox7qJFWJBCdwY84rxKBZTzqAis1mtSABABTAL6aJY35HRRw603xU8GqkwicPHP%2FAdH2R9pH9x6J3cEU6NvIjtB3AenMDQ3tmZUb45vUmXwT9p0ohOC4XhEZS72ORR9iQv1yDq557qjVd%2FRVh%2Bc%2BeFaFgVe0QKcEgUJtUqqnXE8m23kGXQTfoIl5XHZLYWF1C1zJjeKWyMI2sli%2FOcpgmEQMcyW%2BrHuk7efWSmHCiUZcUFB3QVSlBdm1ojL1cPKJhIR9VB2WZBhG%2BLAzyfodvLqXmRCrZwNHRAYasiJSL%2BILqKslepbwpJcCzMeS2StqaLzxSd1c6AaB4nbysZBx%2B1zXQL83WEjFrbUY%2F09nI16RS%2BkEDMMFztEId1cYnFp7zoVhwIMNhMwjHKEGXxfUb6QPCvV0elZ9TfzjjLPmHqXyca5ryYadQhdUFX2icQQkaMMLH%2B80GOqUBvuENvCTiPHH%2Fb67tEtnQ%2BOU6mJZSVWVLHJYWdWiaiMYOgrKjkCdi%2FBXksN2kBtNuD9rvpqphhPrQTPqoWvTld%2FFi6XlZsTEbToaVJpGBUKCgq%2F5%2F4WxN6fBaMUc3BVQql4cujZLoobsLMro1aMV%2FnDVcDK1ReHUctLQYyuvfvMZXXYoN%2BT%2B7iLAS184TdZeXCHjbe%2FPd72DsHqhDJ68wV84%2B6C%2Fl&X-Amz-Signature=4f85529d6a669c547eb456620471316e0f1ee8b6b090a543e7eaf09808f7a756&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGMLJPZ5%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFgCnvzQtV94tdaRvuXuid1MnPfB2GG0v%2F%2F%2FHlnK3EzTAiEAuoXKQwGoluRrFKCCbAgoQEgL%2BtZdlSi54Xjpduud2AQq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDMLZQziP11KqjAgg3CrcAwnw%2BMmgyiJXza2cM4%2F8olnZbyBKFO65i7EEc7eDuooCV3Y2S0tfV2fD82wA80jhgp1nsORy8UX102ASDLuRq2CP6LssmXaO%2Bpb%2Brd7XptZv7Xw9awjUzQRWfdeEgDeirXljYHTTZgu1rYVuVBqgHrRpL0EdfxQ%2FHq%2BCODmPUzSXTz6HqnsTpkggbADVg4LEUSbP2Kp0Y%2Fc1%2F3%2Fith62sADU%2FdFaYeb2TuD482GKPomxPmEdi41rvbpND%2BJbLm9xyZtr2g12HZp5IAk0%2FdNag2fm%2Fjaw4ePl80n7wb2CEYMRXDjyon%2FTWXbs3lx2SoPEN0nnQ%2BRPI%2BdixNqGKKtkmU6eY%2F%2BNVLZdqsJWW%2FK%2FDWUI9xgzmGyxXtCyeKzwCE3VYOMA4knCm4rou7CIj6sAIdNkrHDXuXB%2F60L5mG8qjKsZZKImtDTrdteRvPcmW4YNWXOb7kK6DnTIOOk6ih02nKprUpLrDJ0VjhnJQ18wVLLlr0A5bPkOyNgwN5262Ckb5bMdiX3pUq40SHYnqmsM2Fw9Mhac2CgQ2WaTh6R1r3oVyjRZgANOJFhISHu19QVclBzfaFIdFeoHN7jTIvGIvG8eYnNHI%2FfDyhnpvap4uk%2BNV%2FpDJB2kZS4OooyNMO7I%2B80GOqUB7L4gcy%2FurB91QhcGnlRcLEC4LDQVPoMx8nOAU4SBnbYZozUY6ORSUDr7T5PvqqoGkrZ0s2KnqKR74kIX2%2Fe7w2pNd27HBsCZyNjZIVdLuKfXQy00bo8%2BABfDOJhonuToOQ72QU7no59I%2B8sxIcbgBIxiPaKVzAzJen%2F%2F0%2FqqX7RTOv6vZP%2BvMpDjUB6Fq5XCRWXdPSRTkoSyLa6TnJb%2BN%2B9wyGOo&X-Amz-Signature=df9d155c200b459a10a45ec7ab1c5e610d20bf1cf404f33827f3352cada9c772&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TNGQLQL%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCY9AHx1oBEIYyknC6Z4P%2BAlQ6lsyBJXUZzyOpaUw9WrgIhAKD%2Fo9xXvqLgXaMa6ZQ4c%2Brj3LpuE8Uj3L0PVwOrFJXdKv8DCFQQABoMNjM3NDIzMTgzODA1IgyEGCjTJqKseYzKfKcq3AMeLWFTOvDymOJbIGy0KcoULPoa5tXpOrg7V42vHfkkE9L6Mqfunnd0B3plOnT0Gu19WL8dM%2FKUma1EbyzWTF69EonzrfPq0SH9h26J8Rq70hAZ33XSkJss%2B2D9P8IwSRPDYrcb7CGlfQ6uD%2BMypfZRQ1NcEwMYXnd9zn5LS54xT648QRL6xLjwbAEEDwE%2FEpwMP4%2FoK2ttbtGXWlvRPf%2FP9FDFB%2BuT1D%2FlBeIWLX%2FWVRx930OpzZgR8l8keqPyT0lU08ifUvpbaCHyI0vfC7MaMC%2B1ch1YePGzwVeRZd6y2uAhMUwaVVyNl931wdmnh%2B8za1VSakyBmciSCctnuKPyCP%2BFAg6U0vibgsss2O2xWmU9HJPaREmpH%2BOZsWuarDB%2F1FhxJEAXGQ02%2BROTspBZXQkZ66m8fCBDmip1qbn9um5qr876zLhmvwgz%2FZoloK%2BBKLxU85DHkceV5UrpZsQXZIciwkJJf2gXkNYrA2FEXKJ3zpRCh1eHOIQL1cuXqq8fqW1qcQIDLFSLckLuC1shwVgpf21A0DIP4OW7Bz4dFPe650J1c1BWFKqVclwv%2FeO2x2waceCVkJm%2B6AJ0Iy9R%2BlQ9bXv7eoVmdqQVLXvOEaLMN%2BS%2BHIwlqEcwIjDeyPvNBjqkAUo9%2F%2F%2FoWN%2BQqvZ5oXYlTqy0WM7tpu0aqNRXh%2FR%2F4n3vyXmPJbQNTYZP56ilBJ1%2BrZEE%2BrUwue2Qoz5wReO0U0LjP%2B3rZH72HEjC2ua7TRHp7FawPAwtNBhWdhSib0BKArl4I0%2F8yAa36kdZJ8InrL1G6i9Z85Iv%2FmOqpMzK1V3okSWyuFqwfQBHmA%2BvqvEp5eFJ2gdEpvcslXW4KwihgUI5DG3i&X-Amz-Signature=a039d38b69815b1fa3554fd501b9f967bdcb9633adc0a5c7351d08cae88f887c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TNGQLQL%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCY9AHx1oBEIYyknC6Z4P%2BAlQ6lsyBJXUZzyOpaUw9WrgIhAKD%2Fo9xXvqLgXaMa6ZQ4c%2Brj3LpuE8Uj3L0PVwOrFJXdKv8DCFQQABoMNjM3NDIzMTgzODA1IgyEGCjTJqKseYzKfKcq3AMeLWFTOvDymOJbIGy0KcoULPoa5tXpOrg7V42vHfkkE9L6Mqfunnd0B3plOnT0Gu19WL8dM%2FKUma1EbyzWTF69EonzrfPq0SH9h26J8Rq70hAZ33XSkJss%2B2D9P8IwSRPDYrcb7CGlfQ6uD%2BMypfZRQ1NcEwMYXnd9zn5LS54xT648QRL6xLjwbAEEDwE%2FEpwMP4%2FoK2ttbtGXWlvRPf%2FP9FDFB%2BuT1D%2FlBeIWLX%2FWVRx930OpzZgR8l8keqPyT0lU08ifUvpbaCHyI0vfC7MaMC%2B1ch1YePGzwVeRZd6y2uAhMUwaVVyNl931wdmnh%2B8za1VSakyBmciSCctnuKPyCP%2BFAg6U0vibgsss2O2xWmU9HJPaREmpH%2BOZsWuarDB%2F1FhxJEAXGQ02%2BROTspBZXQkZ66m8fCBDmip1qbn9um5qr876zLhmvwgz%2FZoloK%2BBKLxU85DHkceV5UrpZsQXZIciwkJJf2gXkNYrA2FEXKJ3zpRCh1eHOIQL1cuXqq8fqW1qcQIDLFSLckLuC1shwVgpf21A0DIP4OW7Bz4dFPe650J1c1BWFKqVclwv%2FeO2x2waceCVkJm%2B6AJ0Iy9R%2BlQ9bXv7eoVmdqQVLXvOEaLMN%2BS%2BHIwlqEcwIjDeyPvNBjqkAUo9%2F%2F%2FoWN%2BQqvZ5oXYlTqy0WM7tpu0aqNRXh%2FR%2F4n3vyXmPJbQNTYZP56ilBJ1%2BrZEE%2BrUwue2Qoz5wReO0U0LjP%2B3rZH72HEjC2ua7TRHp7FawPAwtNBhWdhSib0BKArl4I0%2F8yAa36kdZJ8InrL1G6i9Z85Iv%2FmOqpMzK1V3okSWyuFqwfQBHmA%2BvqvEp5eFJ2gdEpvcslXW4KwihgUI5DG3i&X-Amz-Signature=a039d38b69815b1fa3554fd501b9f967bdcb9633adc0a5c7351d08cae88f887c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVKCHP6A%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T191410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDqPUviI2plFW4h5CpMBbr2CEWcPYQjLVvaddHR1ZcCaAIhAMGAq5HO8ZvPypNJxSUa6d2AnjmI3Iyxl5zbtDGBRhj%2FKv8DCFQQABoMNjM3NDIzMTgzODA1Igz0PGB6c1xCuFlvA0sq3ANEkWtZ%2BPZuxhan%2B3U3zpK%2BWtyaKXcornwtkSDOLbaigw12ZJwsV%2F4d%2Fx3f3ryV2rwYKDa5%2B%2F8A%2F5o9Pg5SHqKBMKaTN2bb86T7CveiI7Huz8cLLROSxVFB09w1R2m7QjPgsu2LNcbOkdWxPiugWFOUOCK8sV9R1%2Fcg9JswWFZ%2FZMveEXBQ2rQgP3nV5AW6qPTNVn%2BoEIa%2BsB9%2FgPWS3Lk035BlofVnWqqm0Xri9vfst6DB%2B4n1rqHWuwGXC%2BduZkbnfQtCyoATRF9JbTYf3DOqxfWeO3Y2GoUuYyrSRChLyPssOfmzHDn2N4DmryVEsIF9qrwuAaCWWktfdhl9%2BPDmR9c6J%2BpLU5l0STSyxTUQkhrl3T3ZFIC%2Fqzfz8WRslKdISPVM%2BLR6OiR8KjOOJ0Lalr2X%2FJhZ%2FiV7XWEndPTckbDpkL2fTDrgJ%2F9tpQK833oaXQUO1BkMCUwgBpQJTKspHZx2tiDkWk0rLmgQlyO9Ye6N5Qebh86QbKCXdGMOlRROWoCFTtyxhx82Nt88OoaqCOaaD1%2Fjs8n%2FbSgZR8Q33jZ%2BOdlecCkImgyONpU9q1gmwAaJ6iEgUrTpawdFK4il7mb1w43qz7KnznB1xzrhuMSH0un%2F3kmviNgVOzDzx%2FvNBjqkAQlN7w0gV8OCq%2FO9sMNHd0%2B%2BfiO9odLGolciIslLzQEjUWu4TJmImbHkhXgeKhu4Gs6cc8Ia7vGuuO%2Bx6XO0nOpHBMSd6xx2va6TOK31T%2F37UQyQKT5Pczzk2aP8F4njUeTP48vdNje%2BCCM%2FNJsFtxwS46dYzqiA2BMWdW03eaR%2Fyaeh3PlwtilIoGc9IyFHuYpwTEG0MWX6jP1tAskymRrBEEoh&X-Amz-Signature=e09335cf4f6e8c220e00f21673ab382146b4de6aa89d0cd72169c9773be2d114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

