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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TDKLMWP%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIBgpYA%2FhSAT5rqNFTFqjfEw92avPmuIKlNCIYJN2BA3UAiEAnewoeZK8xFdjfX06wDaw21B9VoUiw%2BM250DTsWoIE0sqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFprA98xCR9S1%2BmIsCrcA5hG2oNrmlF1g9OfyNzCpvOKOYe01l%2F3LZ94k0vMKGhPBQxFx9sq%2BPyA8eYyXkpVo6L7rkh34hTis%2BDNl5isqG0os7m7HJ60jr5zCeDVfXdkjOWB6ZgBD5iKhmo%2Fa4EFuoB6qqipYRHJOvywGqzzMdh6sJhV5dJV0l2r%2FHWBIrHblVBfJ8LUHYlYIaDsF0JL26fsObKHCNI855dCXck%2FUiOMKiCUyoN93y%2Fr36aIpZQ3BMYxLZGdH%2BtlG7r49Uhp0Sr%2Bw9quW3ySqWmZW%2BZ7rsGdEHH9mM%2Fv20J9kCFOSNLIKB%2FO42FUcLcFs7xjtDarvZC%2BvLvwfiiotxsCegIQzEsR492K%2B1mA906XC485AY0DBIb%2FobqT81TiBy1uXk7oAE%2B0JSEk1AZ%2BFERopxX2a6%2F1zoOPQZosmARHzJTJTynGgkDONg2yIXCZR0gB5L3oA2f3qj45fz%2B81To2If0df1USunE%2Fu8oE5mlHVKgya4fRFgnwMlqlMI5ZFJ6pJVC221sQrkLYkakItdIXzO%2FsqisxVx1TTKL4eZaZtHAQtnt626Xn31u3T9%2BCrJN4A9qJPmd5%2BmMQ0s51Rrd06fwI11jycBh5iP142r2eTY8ro5gLHFYkdpYTw9himBayMNSyx88GOqUBQQLfV5MyG%2F9hywkN3n9dAn86rNMPWTi0c8AL0hVQ4mLZx0UVCGcP9RzoaHAqu4rYBsaS%2Fkn%2Bip4sKohjwenzpKmDwFGqc1KxKIZxGQ8SjgM3hFzy9%2FZzuJzq%2FGU8GAQFYZi7QzNYF35tKflH7oK%2Fl%2FsHPHLvTIcIyHCL9%2Fq6qelo6fLUs7lifT6FT5qruDRDhcxRMXlkrF4i6W%2F3Kphiqxt5T3CS&X-Amz-Signature=03ef4e3594b63e8dc553da7081a6cfd469a34cae5a600f6fc7c6324a872afb03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TDKLMWP%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIBgpYA%2FhSAT5rqNFTFqjfEw92avPmuIKlNCIYJN2BA3UAiEAnewoeZK8xFdjfX06wDaw21B9VoUiw%2BM250DTsWoIE0sqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFprA98xCR9S1%2BmIsCrcA5hG2oNrmlF1g9OfyNzCpvOKOYe01l%2F3LZ94k0vMKGhPBQxFx9sq%2BPyA8eYyXkpVo6L7rkh34hTis%2BDNl5isqG0os7m7HJ60jr5zCeDVfXdkjOWB6ZgBD5iKhmo%2Fa4EFuoB6qqipYRHJOvywGqzzMdh6sJhV5dJV0l2r%2FHWBIrHblVBfJ8LUHYlYIaDsF0JL26fsObKHCNI855dCXck%2FUiOMKiCUyoN93y%2Fr36aIpZQ3BMYxLZGdH%2BtlG7r49Uhp0Sr%2Bw9quW3ySqWmZW%2BZ7rsGdEHH9mM%2Fv20J9kCFOSNLIKB%2FO42FUcLcFs7xjtDarvZC%2BvLvwfiiotxsCegIQzEsR492K%2B1mA906XC485AY0DBIb%2FobqT81TiBy1uXk7oAE%2B0JSEk1AZ%2BFERopxX2a6%2F1zoOPQZosmARHzJTJTynGgkDONg2yIXCZR0gB5L3oA2f3qj45fz%2B81To2If0df1USunE%2Fu8oE5mlHVKgya4fRFgnwMlqlMI5ZFJ6pJVC221sQrkLYkakItdIXzO%2FsqisxVx1TTKL4eZaZtHAQtnt626Xn31u3T9%2BCrJN4A9qJPmd5%2BmMQ0s51Rrd06fwI11jycBh5iP142r2eTY8ro5gLHFYkdpYTw9himBayMNSyx88GOqUBQQLfV5MyG%2F9hywkN3n9dAn86rNMPWTi0c8AL0hVQ4mLZx0UVCGcP9RzoaHAqu4rYBsaS%2Fkn%2Bip4sKohjwenzpKmDwFGqc1KxKIZxGQ8SjgM3hFzy9%2FZzuJzq%2FGU8GAQFYZi7QzNYF35tKflH7oK%2Fl%2FsHPHLvTIcIyHCL9%2Fq6qelo6fLUs7lifT6FT5qruDRDhcxRMXlkrF4i6W%2F3Kphiqxt5T3CS&X-Amz-Signature=03ef4e3594b63e8dc553da7081a6cfd469a34cae5a600f6fc7c6324a872afb03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSG36KC7%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIBDzV804jdzjCSvwPf2AZgPX5l79gKTXUA50o7eoPedjAiBirgNbdmryIVENA7v2JtW6HfhcwmlN9Iw6ODwfYm7w2yqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BGuls4n%2BecFVGILtKtwDji9%2BwInJeXHfNfflIGIUAd%2FDM7SfokcmeR%2Fra6VvxRKiyNtbjMZEb7ntsbOJinEKTdnFLpmeRmzHr7E8Bp1mZ4dYNIQ%2Bl%2BL5GPD5yvW%2B3P6nWfQ%2B82t1yXVxdlN7RpISFszQC8JIqa0Kl%2FbrgCybtXYGMBqoViXliXNbQsEsQ%2F36sRWF7pf7h%2FTm9Yd0AAKN%2F31DzW2TghBXP3dJuJ9M08ApLfj%2BoS%2BI2hcDGiJcwMQBExUyBkcKwnsFV0RwzapyeeSWdYbcf1thPIvMV%2BRF7GI9WGK6LBLcjLluzwed5kYQbL6jFd7RRQd73mRvXX7fnwB2sSWN4GMDlO1mk9S1SGwG0mEAPuNt4HZRZmmvupjBueCFBq81OIAymG1XusgHBJSxgRcTyHVKi2kdg9fN%2BxUM%2BJV5UDCqaoCfxYeZl%2F%2F2WDRd4jRwO5srUOW%2F22TtOk%2FQsQ%2FQ9%2Beg2qmDi4Z7Ua2TNov6wPgAriRzy%2BuYUedMRN3OUtH3Kca059GMrOx4DrXpC8si%2F601rlAAeTwXbvGjkk5wwm%2BJbj%2BIQx18fwfB4F8fk%2F5otBeTsQdXybb7Goj2gaWGjAj96XD%2F8b9zZfI8KjAoG5Yf8HazWIeiQ3XN2eM2wjUNf0tE%2BrMw37PHzwY6pgGLiV6IFhK%2FjybmdV9rK1nCIePPf0zkQaxD3Le207%2Fb0WengiLTGJSfv20vQg36wGRAexSngANGjvL8UtCOIZKHHg6Fuf1%2B6cH4efMhhgkE%2BmsBdYYo4NEHoJKTrJPa2vFNZzu4m8xEDdosCflFZstDxtrProQNsq6Wlv%2Byy%2Be7BhW1Ruw8KZcMvyO7Q7wvZezkh5od1v11jxqVnW%2FUpZp%2BVxfuV5hO&X-Amz-Signature=81c85124582ad674c07dc3ebafb296ecefa94dd65872e2ebc2caf46177a5a653&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662AQW4XX%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIHJNagw3BjccoXOQ8hK2r1XcN%2FZEY%2FxWTo%2BacYpGhV%2F%2FAiEA2THe0A0j7pGmKlu1htLlIqRTUOsTvBP%2BYxMazi2AaskqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFVojsFgVFEgYtLZ3CrcA5R2B82Kp3Fcp5b%2BIpreppfS3mX2XDI9kXQMeHPiLzeVyPC6SE5nZ9fuArVQPUY9gkrknsFgCF2mZOuV17sHE04%2BLnPBZ1puCFUqsj%2BmiLdycg%2Bm5I7hGA%2B0tjBCuaFcbzVTr2cX8RpxBt5I2ffpxSi676%2Ftp2zcM7liiRcyF9VlSRNM4OHjOulEve2s8pNUdl%2BMqtYnx3JeJK%2FZ6QZpC0riSF4J8wlWfzVqRUrYiLlG7BVEpaKWMseu4pjztTegTECvnME%2BYVAomlu3FnGDhk3UrVOh%2Fh6Y5RPvOzNebR2xilJU9Eq1IjoYgFm98HizNCh5oDarkneXTudp%2FdPX13RVhSSkmrVPDjJ%2FaiOhuSrIzEhtOZJe16RZ69hWpfx44JlfTNuT9ew1MTDRFpPLuhg5MgprNVquNGw6HJXc5u5BWB%2BL%2BnLDz0figPFfj8COILRqbk6zfvm%2BeTu6ly4khqaaGisObIO9hthG85%2FebA16RMvugcDwCrUJ67woPZzhjQCAChFYaiXhMH9Kah0YMhHQlsbsiDPcLGXCOWW5j7OWbQZ2Zgh9xf8luwTDvSKpf1XWX2dXCIg7a1vIzoljng7IyiEwhU2vTE3prm06ad4fP1tK6drI4rih46ckMPCyx88GOqUB2F8mY3vu3oF3hV5Bz3DvYotRmDhyLOC%2Ba8QGYH59dKI1jXCFheOpUkJwhjs%2BPOC396qUiYO6eJbKKnpWJjFyKq%2BAY%2BLOUX%2Bwojmg6Li6zeEQRM%2BAZSg7N7EqnebOazXNHMOgQWzzKOlCfAJcA7KKhoy77l4u9EHL7oYqTxjxKI%2Bj%2Bxd%2BbnXJB7MMhleXKQtV4u6Zu35GByiuryLC%2BOwX%2FO9%2FmgYI&X-Amz-Signature=8a7b10b1ca3352f7aa0eb5711aa3b66f4bbd2babe5755f956bc4c05cea1815b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662AQW4XX%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIHJNagw3BjccoXOQ8hK2r1XcN%2FZEY%2FxWTo%2BacYpGhV%2F%2FAiEA2THe0A0j7pGmKlu1htLlIqRTUOsTvBP%2BYxMazi2AaskqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFVojsFgVFEgYtLZ3CrcA5R2B82Kp3Fcp5b%2BIpreppfS3mX2XDI9kXQMeHPiLzeVyPC6SE5nZ9fuArVQPUY9gkrknsFgCF2mZOuV17sHE04%2BLnPBZ1puCFUqsj%2BmiLdycg%2Bm5I7hGA%2B0tjBCuaFcbzVTr2cX8RpxBt5I2ffpxSi676%2Ftp2zcM7liiRcyF9VlSRNM4OHjOulEve2s8pNUdl%2BMqtYnx3JeJK%2FZ6QZpC0riSF4J8wlWfzVqRUrYiLlG7BVEpaKWMseu4pjztTegTECvnME%2BYVAomlu3FnGDhk3UrVOh%2Fh6Y5RPvOzNebR2xilJU9Eq1IjoYgFm98HizNCh5oDarkneXTudp%2FdPX13RVhSSkmrVPDjJ%2FaiOhuSrIzEhtOZJe16RZ69hWpfx44JlfTNuT9ew1MTDRFpPLuhg5MgprNVquNGw6HJXc5u5BWB%2BL%2BnLDz0figPFfj8COILRqbk6zfvm%2BeTu6ly4khqaaGisObIO9hthG85%2FebA16RMvugcDwCrUJ67woPZzhjQCAChFYaiXhMH9Kah0YMhHQlsbsiDPcLGXCOWW5j7OWbQZ2Zgh9xf8luwTDvSKpf1XWX2dXCIg7a1vIzoljng7IyiEwhU2vTE3prm06ad4fP1tK6drI4rih46ckMPCyx88GOqUB2F8mY3vu3oF3hV5Bz3DvYotRmDhyLOC%2Ba8QGYH59dKI1jXCFheOpUkJwhjs%2BPOC396qUiYO6eJbKKnpWJjFyKq%2BAY%2BLOUX%2Bwojmg6Li6zeEQRM%2BAZSg7N7EqnebOazXNHMOgQWzzKOlCfAJcA7KKhoy77l4u9EHL7oYqTxjxKI%2Bj%2Bxd%2BbnXJB7MMhleXKQtV4u6Zu35GByiuryLC%2BOwX%2FO9%2FmgYI&X-Amz-Signature=4b82b0d913e85ef2d5e533e58f7067be188bbceb001096672dea3aee253325b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ORDFZSL%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIAaZOe0M4KlCNTv%2FToT4oh1l91D5mrV2h%2BgAJhNu7GhcAiAnPiqNse4xyB4rXktoBgxth49blc0aGeY28ey0LnQKnCqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMA6ip0Ll54x16ZvguKtwD3oN1msRi5fMdygfXRNI9eexhBPLipBZ6g5KA4gcZ%2Fj6camDiQO2J4Sb4jeV6nI4csruN3VVFicPROSmdH6c0iZ7FRXPG%2FnzpVln41uFsHT0L7caAusakoUx8cuPN9W7kIjrVrpoB01reQ6AX%2FQz%2F%2Bbq7qV6j1ogbvtIoXY0FPAbhu7RB2RtmIlh5qekiDKQajNd0xCaZkVYscc8aYR1O4frvSSYuCO5INT%2BuZxPz%2BSRZZF%2FhYH1uGgbYiXM7bMhPQTKWU5LqaGmy2XqGkEQc32e%2BsA7v7LOLjX1yRLAwuRyGfAluoIAI%2FgIRu6Fy6v%2Fot5xt%2B58LtR4vjfElZdk8q5V4D7jzHp5gMAtmoNiyY%2FSqEmLFF3qiYzBtpZ6RiTQDZ%2FQEltE9tGXYfStZ2mxHDoqcFBDyHawdzKWk0GyqgqWfrUFmSv%2Fd8p3DV40rJQNbVBBuWQEeHOnSCLqvIC25abXd%2BcH3U1THD1k2rnoIZwK5t%2Fz%2Br77xeobkzyBmG6lVEIOn7P97mi0Kv7cll8fgVnEjzE6JbL39gV3W9cPiWUc1HWnR7m2XkR9aFLpJcTRZ4kqJnLbAOMPjESzKiwrxOTja%2FIxvDkcdWO17vR1S146aiAynL%2FdlHKUDQrIwvLHHzwY6pgFQBX3LLQJub7VWLdO5z4vcDPQHx8DelkGRshI6ofo4PSREiXx1sKMGOwx6SNQARBrAKxcQRZBvbNpFWe4cpzQlbGCg9oN%2FHvUtGbzDm3kk0awOsG0pn0EqFu4KaJVLT%2BgkU89bwh1Wg5DhQJqnHjjRQ15Wr90KGR8gipHGfT5SQuBbfrJwb1EfF0VsDAXxY8K4endkxd1xRnnsDrjZ3Dc4rjQzsGrY&X-Amz-Signature=2e165fa2df24daf2e26b90deded91413f980dd5c93898216063dd214bb97ea28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAKH7FRJ%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIFuqszjvOyYig7jyRy03BM0EVmqJSPNx84LapDpfAwjrAiAKwiuAQsXsGp2boi%2B%2BdKvsnsGRKTFksiaqHK9aiemqZyqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSTt5aRNNnLUjDLqmKtwDKwT8RiAOFqlUMA%2FwbMfYRfxYc0X9TbxHDX8wiKDQ%2B%2Bp0IdoYkqJaHA7%2FMB%2BiJj9NKabFU2ESifxOgvu55vufkXaJan3ReNADASIV9zZ3HocEF2qIN9Q3o1UW%2FGTU6OVCXk5RA4oa%2FUcL9SeJblBeVo9YhariBDCSeGCbjjR45Xa2Y3FHZktcxMZIXUOs9N5L1hfTPJQ5N2yhLzDGuBuAdl9nxtB77gZ2zUZ%2Fr6ivrN6C9AYuL9f75hHV4srMqkkvZ2jxZviWI61gztXg%2F7T9SMl2z2siZ4tTS7RPSREDngeINmWQngYJc%2FkIIvUn7netOcsIkLZDc%2BGQyVE8XvYA1uK0PrYxLmodVdYtGCD31XaQxg3DpiZ497WqaIx5R01bLEbbtQlLajsHCR2WNVSXM7JeZIvJJ%2Bm4Aqa0w1FA4MGzpZG0acBHGbluqAx1kicnXj%2B9NIv%2FdhgVa3qp72uCAmbypgtzRcMn5sYMOX51gYzMajKwFCA48VErnQ9d%2FxGMKXkiJn13c3ZhtbMlQolqzIcKFJDuvyEk2KZRFMxWIOb%2FvcNuHfB0XM%2FJuiIXMqVGMMDA3h8X0jGuCED2FbmJcMHJ%2BSNGyVXtaPMJ4aU8xL5AMLN6WRtzxM7vTCkw4bPHzwY6pgGnR2dvnjEMQLkwv7pokSbYjz6yb45%2Bry4lAmIrHbZDse2wuS2Guk7K9qgoN%2Bv%2BN2d3EGr%2Ffm7w8sEjBVrhV2zLfjvMaYvq%2FMJ5I%2FZVt3owDqDe0VpiJvBVR6L5vVO3SQQiBh%2BxmOajmhKB1l54DpJxX%2B0A5asrpHZMY1Bx92GelD0O6LyUB3RlJ76qIUwOf9mhClIXv3pZnsqbgnnfAbWrUPkvO7LL&X-Amz-Signature=d143e28f526850b0eceeb18197ba65f889c2e8bec1e07edca2ee211de334d950&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TG42US3I%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJHMEUCICkQiTHMU2QDcdo7jjLS01vO3pkuZFTpCcpw8LDouM8BAiEA7yEagrlQq7Qjw410Nfg4CC9gItNs7%2Fsi5X2AcON%2F9oAqiAQI9P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJKtMhbkMooX7qELEyrcA5FEyDv7ncBwQgNEhVWIzH510kQIC3VzyBndgwKSxcts8CShI4fvjvb37hIJzcSzbuC%2BsJ3akC4k1lrxmnzMk8Ec3xKRbG0Bg7U1y2VgyR%2F2547N4gAiuUR1AjzFlS5Yk3kYdgbPoQCMZZN14pfnS%2BUJctweuQHM3BctNLX4UrVWFJGQubzoW1nkiG1LdpJhQPSix0tYHWIMKc1nOwhXTm3imsOkYUrFDHqLGVNLhlMTkc1Y3Y%2BFsbjtc%2BoEEHI%2Bt3Mp9UiqxdsvT%2FM1fFNT4PfaLY8ofrZAxtHZzjPGCR%2FnZLYik48fgG8X4bR6m7oZGZMRObnd862vGzDhiLqwE6pXp6lsD2Q7%2BthtSK3r5vMqNDgvBZlZH4H2KUQndUQ9SZFXm13%2BhjPI%2FECj02kDXMa5kpVSsmFESt%2Bfi5O8pCCN7GR3Rrl0qyRuZpy9wYBuK2j2sojr%2BWJmnawOR1ycsAjGWexukyePDMlmYReeWQs12v3fVDbi1vPWd5fG0R8tlGBrQYz81nt2GmS9zGO8nBIZZHF062g%2BnMETTC6I7GBuX5Kqryux04hamKyEScyveMpgWhtv3rJs%2FchCWiIsMVtx6uZay9aYOfpnFVPs09ThkCS%2BVIzz164IpJQDMMPJx88GOqUBXhPv2kyF8QNP10IE2r1Ct5Bm4fzjGDQbtvzo6tMmvbpqDf3pLmvJKGw9abHYxO0i0WDSSxcIOaoSp9sGQKd2ghNJKWSrlpMe0nPdH9%2BFNE%2BlZDGwSnjkJx245EGLDVT03BxeV0WY4eQP4Tt9Ktn7qlgjn2w9NthWGyenr831BxsrEx%2FEL6wfjwSas%2BGr%2FkiKoeKIxsQodUOpxJnQ%2BMbDB3qyjT7h&X-Amz-Signature=0723b43a4ae751ae0b5250c87b6393994acc67371ee544407a2c80762f12a674&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNLZLVUB%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDivGYkw1gljEAo%2FKtd%2FE1e%2FVjbVZ3R843aS7fREC6xEQIhAKuxUrg4ld4D%2BNRcGM3JWAIn4DdJyD%2BAtSop%2B2GM%2FjpJKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxXaMal1monjhDZAgwq3AONQtkb1ycsVOrpUu9HiHoHQSL0P1tk6rUuCcGvoAC9VHpZd2nYcl1ErwFpcU%2FKS2vYHPlGyr4YY1XjTf5i5%2F1KPmwhP33hW24Y9DiYeHZ2JnrjZTpLWMIgeuj4az%2FLWwOgmR8X3hTV%2ByyrE76g8EHxzejDEMl44Bcdf2bmJQ4RJ0xO64xYgpsMKyrEaR09xQcJUgjCNLniuDBCljEeoVhZM7bJSYDjR%2FJs92jF2XwTYqNg6EDHGgJFzHe68w8B7LqG5yYwyQDet1O52dTBNTE3c%2Bd%2Bd39RGSO6epIT9SbBBSPWtGM4nlu6avM%2BfiN7FZ%2BZ9Gmi9ajYwu6dIMDnl6nY%2BSByxzsVV1dRQ6PMs0z%2F14VL3zJH1I%2F3%2B0B7goAbhKelwZXyzuPNqdQH6VPQv6S6o6TX9SyCaofuLolg76s5kHVOqyyrsYhKioIryvwRD4fZ3H7tNlCbgQ0VQ5fHMFjbg3n1dr4%2F6afF%2BJIltiALJGTYeMWUBSoF0b7k3cWwJa5Eh1%2Fy7aJeOb6BRjV1tmKjrhE0im5F4lghszjs0U5A9EbLkj4hV3o9iKhgOHDi2FoDh4PH%2BhvWyitim5LhkbsCNfV58VyQeM2tYpvAjbJGfo1mcRx9eqV73WrNnTC1s8fPBjqkAb24XP5FgM6sP1tS0sCgnz1zsJsB7zuMIxhvK0s67eaN2yYxi2er7%2Fv9bztSHDwXhoZjxfUF8tXkzVNFSxBRmFS4fEjzsTp0QRz%2Bk4oHLMDH1McH1nl8tijS%2FM8G129ZQcIbviy9pfWmxOcCrOcFm4sURqXHk0pweJbDQpl6FDtjinUjiEwZg8dOCX6WxX1MCqsCF6xZDOhPdCiYUCcQOESj1fpj&X-Amz-Signature=e096daca0bb97024712350e852d7489efdeacb64454beee525b9f6cf46849524&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNLZLVUB%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDivGYkw1gljEAo%2FKtd%2FE1e%2FVjbVZ3R843aS7fREC6xEQIhAKuxUrg4ld4D%2BNRcGM3JWAIn4DdJyD%2BAtSop%2B2GM%2FjpJKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxXaMal1monjhDZAgwq3AONQtkb1ycsVOrpUu9HiHoHQSL0P1tk6rUuCcGvoAC9VHpZd2nYcl1ErwFpcU%2FKS2vYHPlGyr4YY1XjTf5i5%2F1KPmwhP33hW24Y9DiYeHZ2JnrjZTpLWMIgeuj4az%2FLWwOgmR8X3hTV%2ByyrE76g8EHxzejDEMl44Bcdf2bmJQ4RJ0xO64xYgpsMKyrEaR09xQcJUgjCNLniuDBCljEeoVhZM7bJSYDjR%2FJs92jF2XwTYqNg6EDHGgJFzHe68w8B7LqG5yYwyQDet1O52dTBNTE3c%2Bd%2Bd39RGSO6epIT9SbBBSPWtGM4nlu6avM%2BfiN7FZ%2BZ9Gmi9ajYwu6dIMDnl6nY%2BSByxzsVV1dRQ6PMs0z%2F14VL3zJH1I%2F3%2B0B7goAbhKelwZXyzuPNqdQH6VPQv6S6o6TX9SyCaofuLolg76s5kHVOqyyrsYhKioIryvwRD4fZ3H7tNlCbgQ0VQ5fHMFjbg3n1dr4%2F6afF%2BJIltiALJGTYeMWUBSoF0b7k3cWwJa5Eh1%2Fy7aJeOb6BRjV1tmKjrhE0im5F4lghszjs0U5A9EbLkj4hV3o9iKhgOHDi2FoDh4PH%2BhvWyitim5LhkbsCNfV58VyQeM2tYpvAjbJGfo1mcRx9eqV73WrNnTC1s8fPBjqkAb24XP5FgM6sP1tS0sCgnz1zsJsB7zuMIxhvK0s67eaN2yYxi2er7%2Fv9bztSHDwXhoZjxfUF8tXkzVNFSxBRmFS4fEjzsTp0QRz%2Bk4oHLMDH1McH1nl8tijS%2FM8G129ZQcIbviy9pfWmxOcCrOcFm4sURqXHk0pweJbDQpl6FDtjinUjiEwZg8dOCX6WxX1MCqsCF6xZDOhPdCiYUCcQOESj1fpj&X-Amz-Signature=7029c1b2e4b6c6a1164b982c470136de60823ad1ef45b0e846354ffcab1b6b33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAM72YFR%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIALs3ueDdbVCryeK9knkp6QU5I86F4QKkyghfHBUoELmAiEAn%2FpIVTNeyvoISpcR8yrbBjMp1w6OcOF%2BY8jGyXVNfLwqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHMWmJMbWfHa9DggGyrcA4T5KE0QfC%2FBKUAGnJSbuFwn7OZnZn%2FGx9tCb8or%2Feq5H0OpC6g8Y9rzU%2BWjE0ZYubOgAOc8%2Bx6J5kj7bomQS%2FvlGG9nHPDIoGSwmNklFu13jvmAyCXeOlde9pcX%2Bmmv4ZtjB9Xzv5%2FPaA7hPrQ2dQUXFxddGakcy34OTHGmhTWJby9Woz%2B0JR54uezJcRdTAnlYmC8NR5bNc6kuUx8FbY96ZFRyGjR%2BWqUVE36Fus%2BonR8459R8%2F9RH4ej9cMgSvgXyLX0qefBcp%2B46pZ7gGXIVyEO4hVqeQNfVDA7pHp6uXOJm5s0f7f5hgzCNTive%2B0utR2BBR4BAuK22eSHgWDSWwdDDArg77YFQ2U5YAQH%2FAT5%2FbI3P6oGhWpeRcb7dnYma%2FvsuJNilKYdWtvkStS194ctB0AuvramLIpqjtn%2FmTPqr3rpLCh2ziziSjSUZy5mJ%2Fto9rSN33mSq9kW81iG9m7egTgOi0wdkLboCMuUSjBe8jQ2bJWKnaVKDBNeshGeIVHAOlXYA4fAdh5TcQVXEX%2Fa4ALwPg5LuZRUtnTYH8hMCZh5C9h4D80VUyd1GBfWC%2FaNZ3mYE%2BL2tY9Cvulkd2ngQWOvAeNYPuatonnC3iPcTJ2s9wpMK9gO3MMGyx88GOqUByaEa%2FvqBjjv%2B4bz698%2B6cAN8ZTbLXlN31guGCSjrPG%2BD%2BCCqTInJbLAJM%2FgqhLt23UBxgmqpA6ULMeQE1RcmwMk9E5gOxGDupyYE3jY4GgH7TPjAxGg9lo8Yx%2F80JIRjNjRU9hW6PeHaCh1NpZkIACM8zk3AXsJvuJh%2B2hnUhPtsEvhERwPAov9dVlguRBk6QtjdR72%2FFTbrhQEHFAUYiSB7bEYB&X-Amz-Signature=f16b0bb0523201d6a80839435651e4b17d04a6f485ac75e1701b18f9786726cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZL73GNZ3%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQCOQJVgjycKXWTAPfwYI2j4neE5%2BIekM%2BVN0nOVQQOM9QIhAPpdCESBCvEroL7nRKhNppui%2Fiqb%2Fij%2BMmJuHAzhe5uVKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzr7iR2Dn71lee6rIIq3AOjEt%2BMsuIZ0GUvkXv5pLJSBYXzGEVPdCFAa4ctFG5aiiLN6GnP%2BReQTlXeetN6SNyyBqKeM3lhAh2U%2FPoXoGHmFdwU9oXGqoepQTDxkMnUPqoPCGEjcKzW%2Bid9Rxfe2r9Bnx9L3f0pRmZEqeY0rxbAXEp15zjlnzNbQrd9759jTbBWMC1arIU0rINavr%2FPLZ3gwW4qNRIT3aPBr1cXBSYDgF%2Bb15iOZV4wSp3p50s0LFbXIOkJ4DlKiqdNn6HgqtBYI34dUBMoHR8TjeQFBbLGYIfGxx48%2BaJs%2FPyg%2FvheiNzvY0GM1G%2FXbv4ivpmqZgAT18BGCNlpx35F0Ih6aUJZL%2FkCUi5H3GHzST01cG%2BmT4tBtrPvRZ00vPZbQ4SelheseICT9t%2FOEKEMBgzA3fNVYxtyBKKYeyr5maelhXzX7gNUWmD2jjOcuGGfLUA10paI%2BQ%2BT7r9vFOQithDqxJ%2BqYVk22v0XzbYlOTfG94PkO7Q4M5k5aWzzcvBBMcQf%2BKuiFVjGFOS0i1oPhznmWPR4apwQgLHl9FQeUyRaK%2BiniOMVr8EOuiDjDu7xlgehsaUIJiJCYmsBCl5Y6oP%2FAIQrWYHkjKNdwOf83GxdpU4rRxWvMYTrSbBxTvhFnTCcs8fPBjqkAUGTdBeULojCk4EP%2F1qeSF5FoSzjyKWTu%2Bm46SRRyZUjt%2FGL2%2FhfLGX2IEu57BoNpOclXvFpD3QJhQi6lM%2BPdmKZDeTJsvrQdGrRlush%2FNTjXb3nhrsNO7uJvc8u2qE0JteLXtLX4s269UJhVB%2BSBZvI2%2FyB2CIySWYU34JATu1wgteIPMhIGZpDBX9PX5CWs6rmDmAvISZHk3xR6O2T0sXeaKIk&X-Amz-Signature=c70e64f853d47b399ce7f7ee05b5c4510748e8ca8b284de73e5aed2f4e08e8cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZL73GNZ3%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQCOQJVgjycKXWTAPfwYI2j4neE5%2BIekM%2BVN0nOVQQOM9QIhAPpdCESBCvEroL7nRKhNppui%2Fiqb%2Fij%2BMmJuHAzhe5uVKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzr7iR2Dn71lee6rIIq3AOjEt%2BMsuIZ0GUvkXv5pLJSBYXzGEVPdCFAa4ctFG5aiiLN6GnP%2BReQTlXeetN6SNyyBqKeM3lhAh2U%2FPoXoGHmFdwU9oXGqoepQTDxkMnUPqoPCGEjcKzW%2Bid9Rxfe2r9Bnx9L3f0pRmZEqeY0rxbAXEp15zjlnzNbQrd9759jTbBWMC1arIU0rINavr%2FPLZ3gwW4qNRIT3aPBr1cXBSYDgF%2Bb15iOZV4wSp3p50s0LFbXIOkJ4DlKiqdNn6HgqtBYI34dUBMoHR8TjeQFBbLGYIfGxx48%2BaJs%2FPyg%2FvheiNzvY0GM1G%2FXbv4ivpmqZgAT18BGCNlpx35F0Ih6aUJZL%2FkCUi5H3GHzST01cG%2BmT4tBtrPvRZ00vPZbQ4SelheseICT9t%2FOEKEMBgzA3fNVYxtyBKKYeyr5maelhXzX7gNUWmD2jjOcuGGfLUA10paI%2BQ%2BT7r9vFOQithDqxJ%2BqYVk22v0XzbYlOTfG94PkO7Q4M5k5aWzzcvBBMcQf%2BKuiFVjGFOS0i1oPhznmWPR4apwQgLHl9FQeUyRaK%2BiniOMVr8EOuiDjDu7xlgehsaUIJiJCYmsBCl5Y6oP%2FAIQrWYHkjKNdwOf83GxdpU4rRxWvMYTrSbBxTvhFnTCcs8fPBjqkAUGTdBeULojCk4EP%2F1qeSF5FoSzjyKWTu%2Bm46SRRyZUjt%2FGL2%2FhfLGX2IEu57BoNpOclXvFpD3QJhQi6lM%2BPdmKZDeTJsvrQdGrRlush%2FNTjXb3nhrsNO7uJvc8u2qE0JteLXtLX4s269UJhVB%2BSBZvI2%2FyB2CIySWYU34JATu1wgteIPMhIGZpDBX9PX5CWs6rmDmAvISZHk3xR6O2T0sXeaKIk&X-Amz-Signature=c70e64f853d47b399ce7f7ee05b5c4510748e8ca8b284de73e5aed2f4e08e8cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTI6VGP2%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T112025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQDKpZJixBDXudMA6YXudZton1qKyYS5bYEqslj2rfsqIQIgfoZGVigyafRn2HDR7Q7rQifE3hejgHvJv1Pqt6HQjcEqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLZCwzP6rSj6QfC2NSrcA43o6l2Dk4JqTqVTljCdAJPITdzKjsu5injTsNoBx%2FceUKSU8jpZKNob2DOeh0SfE1LNiRC37NtCAWRIU3USZtQiGtrCWHrcG5tvMaGt%2BLt72VXCcE5zQ47xn1J5Eh1WcRogv2amr8Px8xw%2B2THFgpx0yyw8F74ZUms2xSnwR9lpfu0GFC80j24DjUX6O7kmM59cZYJ6AU0oaGUJ%2BAJSNYJJ0zllTTZ2glNOiyf99ooSS0%2FX8ILObLWTMfdgIyq%2B6l28Ifxhi5D1T8tSdtX2P7Ww%2F9XcICkkKmQjSbrOGunyBSfexk90yDmJfuJZ5SGjm6MMa56RnlCyE4D9kS5Uju5Hm0R4PhOSDxb7cJF2WF3p%2BugtJvaFw9bjNGKXzDEQ0x56y9cQM8A23E%2FByydAhTXbAl8MZWY%2BEN%2FJi9G%2FR2Hprp7o%2FUCCGEV9O12YC86B5yEZ8IwyWT7%2FgoNSDOYo8Y5%2BUaTL6%2BsLFucMaVH1AJZJ5NLJ2yBkLthxL3y%2BbmGUOe0%2FR3s3H4rCGaMHJH%2BYMC24LfaKnz0UMLVrGHQpg8yX2r9gTyWxNBp2%2FiHCk%2BgsbtCcnW1LdkZdqW4L9hVAAIqnjsXD%2BpzdLTXEcD%2FnJHPUwui%2BZlaG9OhQ5DEcMMaxx88GOqUBI6WMaJDA%2Fa8pTGiznMEDUUKQHQl6KSGkmB3oJ%2FPegEVQNTYE3Lk11%2BdYZEl%2FJ3AcX%2BAl%2BJ7QX4tkEMJhETVMY2mz%2BUyyEE%2FB7nOG6xfqlrJ%2FrLrMOWtBYedw7%2FGxUZwf%2BHrl%2B2urKOQe5PuBfDAdrmhBUogaqtkmzsNZlWn7Nu%2BC2VCY7KLaH2hNJEg8lt8pyCOCS%2FW5O8JpQYjdN7cSrhA0gIsq&X-Amz-Signature=17ad15f84a02a97c2530546cd50d5dcf42c1e95e62a5f579f6a77c4b0f26bfa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

