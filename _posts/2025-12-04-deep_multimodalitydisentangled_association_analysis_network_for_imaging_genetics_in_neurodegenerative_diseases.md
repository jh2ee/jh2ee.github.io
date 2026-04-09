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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDNDFZCK%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQCrub12KQowSXYPS1lZNYw4QilT2HzUaYk%2FcRleslVTYwIgEfcHA4FoW8zZ7YcoT2VIvqW%2FVSUvkG3QpCLVYLJ%2FMN8q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDK5A8bhq5dC0fmBzfyrcA5NuvPTsQii2wDknHNXEtI8%2Bi%2BKJ0dX8yeAFlXfXDIsAwo0CzI3IVn2D1rwchuGwkDxcs%2BqE0TgVSEXxi9qNs%2Fc97A90Gundk7NcAA3mRSXBm67lc68HVH4pCzaYuOqhTgYJaI%2B9PaoXLh%2FyNLy9lcocO6WyuhLnsrhFGyn1eRrYkp4hzGvIo2xrXSun7o%2Fltalp4OIDseXLfbXWa%2BJJmobNyt298Y0JxhbpzJYaVj3CzrXkVqaSL8jV0aefTp%2BBsPxVMr7IJcb87u6DHGFyShSCkLOaSrU0yiooedIoejMMG76HoCg6lzndgPWn4Cc9vbm9aoitznofdEG48H2oKMkG1q5XLTgViJDwhyyJn2zoCEG6sD2gTyasDTWQ8TXtmDX2%2BahDH9Z4ZacGs8eBlbaVAu%2BSKFdrgqVyNvOUJ8PEC09DiJN9lF6jUSew0WoHfNXsFP8iGUUY18xLc3UFHqNBKiAEYoLIxDBS%2BbxVPIZfWcZeXprwDEKEroYH2GONOmhs8jC4%2BrGE4aFFk63jZNXgtcToXI9nCqPx3op3Fl0ueWVGPGx%2F9jFjejKNPrHfIGY%2FlgetI%2Fw1lZalGVNDPDSi%2BFVGUUBZDSH1J5qr8mZgKkSYivjNcMo8V79lMPbT3M4GOqUB9mOmMDSLsanAnmvtppIRTChJWu1C3JRvDhAyYmqeCbIZspCY6bPe%2B8QGGXBueq%2FPMx3ftJVS%2Fm1efNOitOHh8J9X8ljISPjBDKfJIHFAHCGnnnS8kZdFwoa%2FEu9W7wRadwd7ErxZG4O4DzrQbgPhHiIrj7ysvuoDpL1e1fBvSSlC5EK3SJUMkRBQaXwPadYSjlrR9%2FH%2B2wdmCiEl2zQesnXjVdeG&X-Amz-Signature=51c9a61508de4c1eb83fc4499097655afac893b1b0dc2142809464a25c0b3230&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDNDFZCK%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQCrub12KQowSXYPS1lZNYw4QilT2HzUaYk%2FcRleslVTYwIgEfcHA4FoW8zZ7YcoT2VIvqW%2FVSUvkG3QpCLVYLJ%2FMN8q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDK5A8bhq5dC0fmBzfyrcA5NuvPTsQii2wDknHNXEtI8%2Bi%2BKJ0dX8yeAFlXfXDIsAwo0CzI3IVn2D1rwchuGwkDxcs%2BqE0TgVSEXxi9qNs%2Fc97A90Gundk7NcAA3mRSXBm67lc68HVH4pCzaYuOqhTgYJaI%2B9PaoXLh%2FyNLy9lcocO6WyuhLnsrhFGyn1eRrYkp4hzGvIo2xrXSun7o%2Fltalp4OIDseXLfbXWa%2BJJmobNyt298Y0JxhbpzJYaVj3CzrXkVqaSL8jV0aefTp%2BBsPxVMr7IJcb87u6DHGFyShSCkLOaSrU0yiooedIoejMMG76HoCg6lzndgPWn4Cc9vbm9aoitznofdEG48H2oKMkG1q5XLTgViJDwhyyJn2zoCEG6sD2gTyasDTWQ8TXtmDX2%2BahDH9Z4ZacGs8eBlbaVAu%2BSKFdrgqVyNvOUJ8PEC09DiJN9lF6jUSew0WoHfNXsFP8iGUUY18xLc3UFHqNBKiAEYoLIxDBS%2BbxVPIZfWcZeXprwDEKEroYH2GONOmhs8jC4%2BrGE4aFFk63jZNXgtcToXI9nCqPx3op3Fl0ueWVGPGx%2F9jFjejKNPrHfIGY%2FlgetI%2Fw1lZalGVNDPDSi%2BFVGUUBZDSH1J5qr8mZgKkSYivjNcMo8V79lMPbT3M4GOqUB9mOmMDSLsanAnmvtppIRTChJWu1C3JRvDhAyYmqeCbIZspCY6bPe%2B8QGGXBueq%2FPMx3ftJVS%2Fm1efNOitOHh8J9X8ljISPjBDKfJIHFAHCGnnnS8kZdFwoa%2FEu9W7wRadwd7ErxZG4O4DzrQbgPhHiIrj7ysvuoDpL1e1fBvSSlC5EK3SJUMkRBQaXwPadYSjlrR9%2FH%2B2wdmCiEl2zQesnXjVdeG&X-Amz-Signature=51c9a61508de4c1eb83fc4499097655afac893b1b0dc2142809464a25c0b3230&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UR3JRVKR%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDAYD3Dv1Z%2BWCDSnvS%2F0O7VIjBR7zNiORcC955upFBnVgIhAPb5iRK3UYSRMiDapy2bVXt8Kjl%2Fn0cH1IOG3SBT85uVKv8DCA0QABoMNjM3NDIzMTgzODA1Igw8ZqUes8iQkJojtd8q3APq2nI6uJsnWmIIZUB81R2rsci8H4OCWs5%2BuWlDo1SQEhl4VXpUZr1m3foPr9Z4j1StZ584T1aQZeW00NUuqOOM6DwNGa1JUg7JuJQFoTt1LIPa%2FYZDed1vM6PPWq44RTNfjI%2Fcqk63ztEtRcoWogtEt7rORUZmca8ru74DEm5bjezileggVfmamtTytEaOb8oCTlifsAaNVUeWElQDxqmc9xOmVXiUYW0EuxkjBSO58yrupwFoiiT%2FYcuY6l%2BgCNF8SK6lYtEbsiLODWkGj%2BjdR0XRqEA2DNAsnntWv13MnIx2ikTynd3K7gVsyis51UqMAGNTBju41XZJpjOKsyXeWSKwSIS6IxTAX1nSGS4NWEtuoNRptcyZ%2B6TPotOlMgdgUd2ZquA2WLOsVvYM8q%2Fi8zeST%2B6o%2FtmMhH7OsyAqjS%2FABwyMOaGJMp8LYxaO%2BspAIA9ftmWxxmVqkwYUlcgz%2B2xGxd80G05W7DHSmVD18hbQQF7QjBMTShHY10gRj6taggP5404IsW0NKljKrftcOjBQ1fEhidT%2Ftxz4rP9p9PuBuf3KNy%2F3DcjgMlXNtTGvtJpBp1IhBwKo92O4i3n%2BRi3jEN%2Fyxl13sD1lDxnCpbWzKhU4GFgM3WiyzDDH09zOBjqkAYpdVotq1mToWIFMcR05QqIwnYwJ2n74f2hOvouYH4o%2Bg3tRPuOk0LBkUwklgpBpx%2FJ%2FXcnyh6YOjUVVDCVncSMTieP93kOFQ0LV8m%2ByTzv7YAcDSQLzYE24dOWvX5wjqyZWxJeeKMmYfVyZabExsZHK18FBsVDRHezbdcNIKitR5UQ5M1Jzd%2FKRyryrV4u3VY2rQ2EFcesdbYB1OJXvSR2HUmu%2B&X-Amz-Signature=050eeb4a1092bb52faee9b300df77ed539225dcc6f13b770877d835359471df6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJPO4RN4%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIANZZOIPKKuVF9V2sJpIKNVR%2Bq3UXjeSEulUgp0NCN0yAiEAzRUgScK6gU3PhhEEd5EQMoEZBY1Tdv7Y7aF794iQ7bkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDAiKUCMOgFaTH1mK2yrcA0gOhEwrz1ZT7H%2Bmxv%2BtIUf9dHWQofv3mwfnMlh41VTDm4Bf1nVFD%2Bk%2F6ZDr3rdMMMWsHEOLFwHUqDLetxSG3wXhbEWmCVe89qsFKlxOEX2P23Of%2Bm9IDUQoSD8eudXFCe%2FKw1OyAEZOp%2BaRL8FUTyXVlvMDqDO4GV6djyhWyt2Hsuf%2FgFJR%2FHQYpGvetUP2s79gFrnPG4hB%2BxpD5TiJK7Odty%2BYOHewxolnRw%2F1QyMj71aqmC66s7kwlM8zoFQkRib2Frbsn%2B6RGRDj5ovU%2FJfCdMxRoh0WN7c4%2FQPb7TPyCJbWMcmYFCStzoHfU8yH7D0So48VYaliiJ0KPaM3TwZMY6ugSaBdgJcnSbDxoUjgPIcRHVbRoQEoXOwWOOgXxAj4sIaOm8lnSgDvxHdpedSVmVlKqtDrT%2FBmjxjYYdvA6BBfkFkw%2BlHnascpaaVJso5XCZTn14W7p9Xljir5xExNIbT3IMTizBSD28RxfKmTClQq7w3wj%2BFWnuvh0x9eWGBVXp516%2FR%2BM4xtupMLndhpH1sMy17u09poN1a9dmSdWykWgQoyukYW4U2Y9H1bzY%2B35vfKf7Uq%2BSc6y8%2Bhl4TJo96flv%2F%2BSNoLIbVIxeFP76OGvBCHsrGC3SGXMPjU3M4GOqUBfy3LoiYFzzdTwDL%2FuDLYhqSkHpjRy3sqKuW51oLv%2B1rxCDYP7Z9cPs%2BPTjyw653kIk4IT3TzD0LUGAxB1ZvhSqF36sn0p5rNY9py2RIzwp6IyEKq94pdxcIMfNbpsaVcTWPakxIFe58Ppkh7XAFiBp06vpXf8xgY3NkZftf1fZqepxITEZ5BqDOZmiM65FgcU8QYKfM0a%2F69EzeBt97%2BN06%2BQLPd&X-Amz-Signature=5ac9e58c4a76950bf1a6fbb6f0fe7f9f7b5d21fc83edbe35aa1b28f9ed1f4baf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJPO4RN4%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIANZZOIPKKuVF9V2sJpIKNVR%2Bq3UXjeSEulUgp0NCN0yAiEAzRUgScK6gU3PhhEEd5EQMoEZBY1Tdv7Y7aF794iQ7bkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDAiKUCMOgFaTH1mK2yrcA0gOhEwrz1ZT7H%2Bmxv%2BtIUf9dHWQofv3mwfnMlh41VTDm4Bf1nVFD%2Bk%2F6ZDr3rdMMMWsHEOLFwHUqDLetxSG3wXhbEWmCVe89qsFKlxOEX2P23Of%2Bm9IDUQoSD8eudXFCe%2FKw1OyAEZOp%2BaRL8FUTyXVlvMDqDO4GV6djyhWyt2Hsuf%2FgFJR%2FHQYpGvetUP2s79gFrnPG4hB%2BxpD5TiJK7Odty%2BYOHewxolnRw%2F1QyMj71aqmC66s7kwlM8zoFQkRib2Frbsn%2B6RGRDj5ovU%2FJfCdMxRoh0WN7c4%2FQPb7TPyCJbWMcmYFCStzoHfU8yH7D0So48VYaliiJ0KPaM3TwZMY6ugSaBdgJcnSbDxoUjgPIcRHVbRoQEoXOwWOOgXxAj4sIaOm8lnSgDvxHdpedSVmVlKqtDrT%2FBmjxjYYdvA6BBfkFkw%2BlHnascpaaVJso5XCZTn14W7p9Xljir5xExNIbT3IMTizBSD28RxfKmTClQq7w3wj%2BFWnuvh0x9eWGBVXp516%2FR%2BM4xtupMLndhpH1sMy17u09poN1a9dmSdWykWgQoyukYW4U2Y9H1bzY%2B35vfKf7Uq%2BSc6y8%2Bhl4TJo96flv%2F%2BSNoLIbVIxeFP76OGvBCHsrGC3SGXMPjU3M4GOqUBfy3LoiYFzzdTwDL%2FuDLYhqSkHpjRy3sqKuW51oLv%2B1rxCDYP7Z9cPs%2BPTjyw653kIk4IT3TzD0LUGAxB1ZvhSqF36sn0p5rNY9py2RIzwp6IyEKq94pdxcIMfNbpsaVcTWPakxIFe58Ppkh7XAFiBp06vpXf8xgY3NkZftf1fZqepxITEZ5BqDOZmiM65FgcU8QYKfM0a%2F69EzeBt97%2BN06%2BQLPd&X-Amz-Signature=5030830ca17a23b484f4230bf12c2a5286af2427f3be098a2a2795161fd62854&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLMPLPBP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDww7kUOilSA0NpS95rM9uc7gPyQsMak6Iaqu9iTmHQyQIhAM%2BxWwpx5KjmDl8fsBS4o2RTN2FrbcLv%2BVuM8VhuOAM9Kv8DCA4QABoMNjM3NDIzMTgzODA1Igy5K7Kb8oaY5hbLytAq3AOJsegSHM7UEF7bRZVRF7Utttnyx%2FnPhfDs%2Box1wz0xcw5bTW9nxt5UYy%2BEc1etLehrSdNukk8UA3JI19csxiOYl697u49BMuLL5f0Cbij2vBDHwU8ujphyLhX%2FmtdcyPxMlWwVP0%2FeRCPSxLR7%2FiXG%2FKgP4xS8gb7cZYe5UnDyxe33LYOKbuFnmF%2Boi22XBNXVnSU41ao%2B8lF8%2BQtQMcKd0%2BqkjbW4S6RgCQb2iaciF8JN3FvrHtzEX3YBv3QWjF3vE5zVpkxmilj4ohzXPO7VOmNlJbDft1L7PEekjbBHSDEe6%2BD1sOCxU2lbzThle1To3HqFt9KaQYfMDOlRJMMh%2Fg7nbFaTxqOIgiRGSIkvJ0XrGFCu%2BwuFvMiLGuBS3Of2AEfTVyX0yAsPtllFV033%2FS299a2e9fA870lGLZsGAmNlAVGZmbp5O44OwqI5LMw5kyDEbe2%2FSvqnEX121LdXVqnCvSWxU%2Fck3P13ISCHzjJATt9guDnKn8yyJIDp5%2BhZ3Br3yUNf5TcYtjlZv9KNWqv7WYF6afrqd6NxDZR%2BKG7t9V%2Fnw2uelS5YEDWEmub%2BN3XvGWOsQ5hryBZkOhTeXbBH1IqhgFEkhByoNcmbh0jQ264cOrw7ntwQHTD%2B09zOBjqkAZnX8380ww1OI8uk02OSYv%2B8uUJ4PFZ3ccDndW5MOWw74hjfnPqMOZ%2FuocqJ4%2FCBKEwv4nSIDeanR%2BsWbpioV4%2FRBuQMxFami%2FJTndUrw0Y0nUMHUKdAVaeFQfRvGvFg%2FCqV9iZhJm2I21RMarVGbCo7JuW0pWai3ADC6%2FDZA72LPnSzh6pjBOiAbwah5HnolePcZw4nSEHjsfRnpuh8mtPAXDIU&X-Amz-Signature=a784383dd3a499c582424caa8242599c2a21e67684d8865aa004498acc457ca8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKPGERSX%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIBmk633aOG2BjTE6%2BHrsHBiVu7YBI3jDbN6IyejoRqdxAiEAmiDRXhEZjj7fd6Sqm1lUzOMkPNgLXOJOM7%2BEc%2BIlClEq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDP7us4o1tXL12RMXpircAwhpzuZ8HGBJXMhow79Jct1dS7lpwcflcsUvkjN2i7s%2F9xZYSYyMXfjfd8VQh7AY%2Biu4%2Bm7wgE7ZO1n8QD0Bv3WRTFsAOrDMwX6%2FhiwnaaxT13P3NrtiHCqHxFI8KpqEw4vWLtPq4iQUuj0vaIimAHUCtVsTiFPOgmQfKztrhtKleGVfmzBmY%2B4NqVALZmC63ua922HRYIJaE7sXAer1LvXp9t1YMJwnBoxmXMfuGHjLwv5kYdIoJA07Opn5mt1cofnNzBl4AUhaCRI5RmNFdUbM2GDKgPl4SenY%2BgizqvUcAlYxpTsOumzLmJ%2BZOk5vIyDxNxjDfdvtLCHmMKUBh01NMifd%2F%2BFhm9Er6xRI%2FK8y%2B%2B1fFz9pnbrXNxs2LyEX%2BkxMDfo%2Fht24WEqMCjFfk8YLmI6PBKxg8NWcuLw7XhL456txxPbQ%2B2yBy696Zq3t%2B9%2BoX8fW4A%2Fx%2FLCK6HV4p%2BEd2u6JYejlWS7CiXHnUtcitYdn%2F2Yh0QD7DTbt1Z8JmTAWGkmjWyLzLKc%2BYxXQ2c4OJhXXle5%2BZz5HLaGTCjyu52lOjR7%2FQ86Ezb95DbUwiEtNyzOp4UPtscwfrgcn2q1HRssl6lXnzCgwA7atTS5y7FCWSuE%2FEIYyPQINMKnV3M4GOqUBwfOpeHvaNv3mJ8tY62Aqhy%2FcGu3MlLHIkSAFQ2HOYyqK%2Bqo%2FbB4bh%2BByCZfi5T1sbQn8EDBQz%2Bch5duuuAz6oDwn6XAgqyYUcenAvz1voNPxDB9eH8O2GghojtGcUFjeSvoOHA%2BnArMghjIv%2BceCSk%2BfGa3AFBFcB3F1pJm%2F10QFMuOACDG9VhvtFt3reZpPNy0fEvN4TNOvyuYdRNQxj6kR%2B8aZ&X-Amz-Signature=9a5ecdb2488425654878ac387d315010afb144e3fc08a6f15743fc107bc9b386&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAUHV3XZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIC52MxPRbHoHuB1ky9ELsVFank2MZNSRZ%2BxotHZnlz%2F5AiBCS106i84ap5qJnBmnRHobW%2FUdjHOAWqWOwVxkOxHivyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM40sDUaJVKCuY7NzVKtwDCjPd%2BPJDEN5OxPX5DczTOv4Tkmh9vQvnPNEjZBWjzr2ioiXo0Z1qhtj%2Fx6gEl3%2Bjp%2FxnKWkDLy4sHUeSD%2FevwVwBNpm3Mj0LOV7q1ay%2FKFbEDJPJd8chMWcedpFLQiW2MQ6%2BvUp6jhlCg%2FbttObIUIOKP1aHINKZYypJFGhp9iQHtnVG6NKle7E25KretNMzbdgSDEYg7IXhvMyZYOaXWWCmHyG2bNfgh3LgiyUcnsnUDWBQ%2FtO81Me3GShWAmeQDqoYzYse5ia1levfki%2FxHFZGrdeQIu%2FqGFeHnFdfYkClfDpLpU%2Fku7Brycfc5gfJjzg4tdw%2BiTdYRMJ5A8pgtOvgzk8WH3CHuNj52AViMExd8fkMaxf%2BVrNoha4nmGaQOloFhpUGFSHyjtKm%2FVm29HghQZPZ5LLuxao%2BqL0O8Sv1zOHFFYnGZ0dWsM8kGom1BFiSu0ehkU8U3jsHY2ullPhgx144WUscpAX4Fi0iPxHxx45pCjOhRlAo8lOiIJoQJAIdcw2cSEWR94alfAu%2BPoZuOkFEz7PBqvO0Sq2qcshiB0zIimc9%2Fv8ntH9erf4kUqWhO2u2c0n2mpO87%2FzzOgN8VO7pm6XS4oWGlycNC8LL%2FjPSR5YbOuO8h64wptbczgY6pgGg3OPXZMFSOlJrN%2FPItZKhZ7YDHFzKgi%2Bg9VibnpNulrZuj7x%2BdDRNc0uOrRkEkyEJ7axhZBvbSo05A8bxaarLEsqAHQNjExhc319W7eQOm0CIzNfKI351ZgLnwW5r1XuIQ50M3%2FQWycmOU99a48xZUYd4asrG2C70QbypAuA6CNMSpBXScvoUE9vwTOhliH0r2npMyiqSURUXZ45fo1S6%2BWRGDBh%2F&X-Amz-Signature=9f71c3b404ff290e2416f0d0926e45bed16dc02dd23b64768dac8927838b7500&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4KFZTBC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQCJyWkmlokdnxZ0MXLX9Rb%2BLrkjBucPWn4DsbGgVDBuBAIgTva%2FYV6vsQN9NE5BKUuvNHnGXB%2FxQxx7Z76%2BbDu5dn0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDObh0YDv2jZeGmJ34ircA2yla8XkI13rNeN%2BoluLOYIQdmy1MzDaS1%2FjKJ6%2BtiFLt%2F0BPyv%2BXjZyNRu7Q7bc7SfW3e%2F0PcZIMW77SYFx%2FWl7C2nMd00vy69%2B%2F3luro7Pg4O1F5kEiSHEjp8dD8J9VeLWio0jJczj2Cb0KBeMNLEv46NQZl49nOAKMyDFhbov6RKOrMYnVkYKQ2GYaDaQFtOfrcMGvAB%2BCrJPs8nEMsp9FtuxD8kInX7woIlS0Crh78RvIX3PTvDNQ%2FIfKaSLz8GutI16lxMgfSAdyi6OrGiVOH9eBFOrdKw9wnSF2TYmLBYI8igHfkjK3%2FpAPGQNOQeEH%2FyIAx50Ta%2FiOhCDLBluVh%2B7hnxe8smacW3pebjsXP8CRdGF%2FFbqpgXjfJ21kQDHrPc9rB9GhBpzRYNQt%2B7daN26kBMtUlXXP0v8zHTr6xkIn%2FWNX7T8bKApz6SDVJt8MMM8bHrrRzx%2FUv3Nbsho1i45dO3livkIfJIfhCnSUODjeqUuemGXyfTbGRqyVvede4w4sE%2BUWMktyd5ENy6YAqv9Ntl8bFvtz4Hts0JyHZGWZIPYD%2FizJ%2BTV%2FXu%2FnZsycnFriUA01jg%2BCApYlAqPieD69t1khezm26hyodz88CKK%2Bxjmp%2B5RWweeMN%2FT3M4GOqUBLJhuEfNv%2FUsXMtfSJMKTp6XnlVslgWusFUaaANj8rd4hhfikDxmcfxmOgS%2Fxo3tF4l54VKOWskOUWF%2Bl9sAptBl23X%2F4j5S7yYqxgErIlIXz2gI5tRGm3p%2BpTASWsP8Edhd1FY47j9rV7vCDUPrLlPKbeLBNQsdH%2BadFSg0oSxvFLRx5OHewyt07pvAp%2BvB9r56DmM3FCnnDMV5TVSgki7rpJs%2B0&X-Amz-Signature=bc9d4d1b9a71a4cee304452f3205c3c7bfdc79a3a2b04ffbcd483dc119949426&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4KFZTBC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQCJyWkmlokdnxZ0MXLX9Rb%2BLrkjBucPWn4DsbGgVDBuBAIgTva%2FYV6vsQN9NE5BKUuvNHnGXB%2FxQxx7Z76%2BbDu5dn0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDObh0YDv2jZeGmJ34ircA2yla8XkI13rNeN%2BoluLOYIQdmy1MzDaS1%2FjKJ6%2BtiFLt%2F0BPyv%2BXjZyNRu7Q7bc7SfW3e%2F0PcZIMW77SYFx%2FWl7C2nMd00vy69%2B%2F3luro7Pg4O1F5kEiSHEjp8dD8J9VeLWio0jJczj2Cb0KBeMNLEv46NQZl49nOAKMyDFhbov6RKOrMYnVkYKQ2GYaDaQFtOfrcMGvAB%2BCrJPs8nEMsp9FtuxD8kInX7woIlS0Crh78RvIX3PTvDNQ%2FIfKaSLz8GutI16lxMgfSAdyi6OrGiVOH9eBFOrdKw9wnSF2TYmLBYI8igHfkjK3%2FpAPGQNOQeEH%2FyIAx50Ta%2FiOhCDLBluVh%2B7hnxe8smacW3pebjsXP8CRdGF%2FFbqpgXjfJ21kQDHrPc9rB9GhBpzRYNQt%2B7daN26kBMtUlXXP0v8zHTr6xkIn%2FWNX7T8bKApz6SDVJt8MMM8bHrrRzx%2FUv3Nbsho1i45dO3livkIfJIfhCnSUODjeqUuemGXyfTbGRqyVvede4w4sE%2BUWMktyd5ENy6YAqv9Ntl8bFvtz4Hts0JyHZGWZIPYD%2FizJ%2BTV%2FXu%2FnZsycnFriUA01jg%2BCApYlAqPieD69t1khezm26hyodz88CKK%2Bxjmp%2B5RWweeMN%2FT3M4GOqUBLJhuEfNv%2FUsXMtfSJMKTp6XnlVslgWusFUaaANj8rd4hhfikDxmcfxmOgS%2Fxo3tF4l54VKOWskOUWF%2Bl9sAptBl23X%2F4j5S7yYqxgErIlIXz2gI5tRGm3p%2BpTASWsP8Edhd1FY47j9rV7vCDUPrLlPKbeLBNQsdH%2BadFSg0oSxvFLRx5OHewyt07pvAp%2BvB9r56DmM3FCnnDMV5TVSgki7rpJs%2B0&X-Amz-Signature=a95811cd9a4f1f9079801823238eec70a1833110a2c4a3581a4e3ddd93f7b223&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VDDZNRG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQC5%2F3ZNh7Bqxs9KD0vk9ksTAt%2FHFCMaSBFdJUTZ71BUlwIgKLrnmcH8j3eRo%2BH4S9vWlmEh3BSFvAul1r%2Bu%2BAV6Czsq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDGIRzVZ0I%2BxYFCCdMyrcA9ph6NpggnQKcWceBQIBQRWFGMEDoM8GvCTVKY2LylVJzTBq3WOqFnIy0jMc5QpWcTlHSeDx6JwGOQ7Q%2BgoBWqj0UinkSJqMaQOXPWjhTY2%2FwF8TWL3jCB%2BBSr4HLTWNWxk0JxXiiHk9Xoq0nT2HOvBNYiyV43DOn7mOnhM%2B0SvYnz8ueUL3qPCywumFgsgOSl9QCJM8L8kEh2G2pPKs9U378CH%2BKG7XpvtN9T0ztOsWGXdedn8itMzoTsw92sx7Ubve6KLcBS6wthgYZe7NAuM%2FVEjv6hHCMYMYOS4oc59hH5Ut7giXI8orAG3Dr7iL5mb7FTWIDLYcCglW1iDOjNdELPSY9GJOKcktGU6FO7i0E9T54M8J%2BnDIOf808RQ1aMefqaQTChzjVRozcVOAxI08EfhmL%2BFNRmi3%2Bc44bUrMtCueXW64qQ9MaSWsfa6FIokcpSGoxlu%2BS8QZyEnoUzVs8sp3W8VHEqa2yqO2n%2FSUga0uBG9g%2B37CeQg3bCrBBwodFH1to%2FzdvU0%2F2f%2BVKJuLeKfKAAQFHdiNLd9qOEKRkZGfxnQgC%2FKXWuN8ARGqYXsDIsbkKWCbZeoFn%2FDqA5Z6OyoTnzHyEr%2BnkVLiETzXRpmnZgiGSOcRxKutMNrV3M4GOqUB%2Bv0Tzy7VTArjWUMCbVjU7dGZzIGFOh3dTBEv5%2Bsh%2Bi3fN7yZwl7zpzmVDEvoQUd7YQql%2FAHKYsoKO5l2WU0YFe3%2BAu8bwzS108m46%2BIpo3nAuUxLxM3zUPGEcUKdkb0wsI5ICsajKVeiUhnEuKWJ2l8sesyYg%2FWgu6DYD0hrookFBTwekR79YX%2B%2F07b8JibgPnRbXGvfVAHbUfkagbjEJ9C7crNA&X-Amz-Signature=5296315bfec8f7c3820c0912142d8c46877e0d60af0e783918d7b9daffb79f2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFV7TYV3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIFx4VcBHUjV4zS6uv9UN3Lw66hXgWEJpwVkfkGE0wllFAiAErpgw8s2ootJKnSMVTGYUcmmc6i0i90VcgDV%2BqgpTfCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMoCgEJmn%2F3BzEw29gKtwDDrY0IutyYe24ZNwoAG%2FI1BVclCMqNZ0wZhKhfvz%2BffYzRmwR2WLG9OYM9qM1OfOOhtZAuB%2BlRBTUDnyB6EVGns5l2huKIkw3HK2CZH%2FIcosXsAmv1k%2FQeoWpzJdmVKupjzLUnqoHaSZSlhPHPZydXHB8DRvMe1IazVpvXkn%2F2vm1ZSe9lQxe8n7d3MbN2anUyQuR3w1NzzWlVOvmwIBjiOt%2FzSjYfS6rKfziCwlyR0LD1jvF7lMfRNPRx8Cv6nSs4Eeb%2B60ABJQCGD2wmTLqyddQKHRBVh5Hc8uEn592kdXHuQvFAZmRXCxYl3BOGhSngARGMaYRuf3rbVyXhLMzNu41psG%2BmbUmRGoUaryp4qhpt8SqYKj%2B5i0%2Bv8WTQw4ibQ0U4MHNfwGmCYGWxuHDHPxORJS%2FKxl3fiqntX3jKkzUp3reUnsIu7XefN7WuJy4l%2FpTq6q9hS5kRd6EQfPoteo7dUJ%2FONzF1PT28kvv0G583WT7DnmTkA3IVVPTDNcxjP6KkoKLgx8syM4dTOdjS%2BbCU6lioRJiqf%2FN1UVvBxOwUDfkjkPd7xudP5KFo6xfkh4XFBBiLeE3X%2FdVbzCJ07GZs0DfI2SgL2loB52wvVUE8%2FBhd79DmNMEj78w8dPczgY6pgF%2FD%2Ffg4b3BAICD3i3Iaajsi%2B6aUSwfSPmQIb7CLhU0InSw8ujBiX0T423LNKWdBnudvITA7PmFE2D7kqfZdBBL1RQUdkLLkT0StP7Z11Jer8TpnwT9qSfx0FchFNACXf5ZJ8pwAsy8pqZpr%2BJ6U3sZ%2FZOnryma7ovxn4tcqqP5U%2Bbdrx5l3R%2FCtxaEjku6aRObZkJCqU8Unu1L66tS%2Bo7hK3mi%2Bs%2Fa&X-Amz-Signature=7a886c40c60ed172980b057aad8f6c7186c5512a2ac63c91eefe2fd3dab81fe5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFV7TYV3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIFx4VcBHUjV4zS6uv9UN3Lw66hXgWEJpwVkfkGE0wllFAiAErpgw8s2ootJKnSMVTGYUcmmc6i0i90VcgDV%2BqgpTfCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMoCgEJmn%2F3BzEw29gKtwDDrY0IutyYe24ZNwoAG%2FI1BVclCMqNZ0wZhKhfvz%2BffYzRmwR2WLG9OYM9qM1OfOOhtZAuB%2BlRBTUDnyB6EVGns5l2huKIkw3HK2CZH%2FIcosXsAmv1k%2FQeoWpzJdmVKupjzLUnqoHaSZSlhPHPZydXHB8DRvMe1IazVpvXkn%2F2vm1ZSe9lQxe8n7d3MbN2anUyQuR3w1NzzWlVOvmwIBjiOt%2FzSjYfS6rKfziCwlyR0LD1jvF7lMfRNPRx8Cv6nSs4Eeb%2B60ABJQCGD2wmTLqyddQKHRBVh5Hc8uEn592kdXHuQvFAZmRXCxYl3BOGhSngARGMaYRuf3rbVyXhLMzNu41psG%2BmbUmRGoUaryp4qhpt8SqYKj%2B5i0%2Bv8WTQw4ibQ0U4MHNfwGmCYGWxuHDHPxORJS%2FKxl3fiqntX3jKkzUp3reUnsIu7XefN7WuJy4l%2FpTq6q9hS5kRd6EQfPoteo7dUJ%2FONzF1PT28kvv0G583WT7DnmTkA3IVVPTDNcxjP6KkoKLgx8syM4dTOdjS%2BbCU6lioRJiqf%2FN1UVvBxOwUDfkjkPd7xudP5KFo6xfkh4XFBBiLeE3X%2FdVbzCJ07GZs0DfI2SgL2loB52wvVUE8%2FBhd79DmNMEj78w8dPczgY6pgF%2FD%2Ffg4b3BAICD3i3Iaajsi%2B6aUSwfSPmQIb7CLhU0InSw8ujBiX0T423LNKWdBnudvITA7PmFE2D7kqfZdBBL1RQUdkLLkT0StP7Z11Jer8TpnwT9qSfx0FchFNACXf5ZJ8pwAsy8pqZpr%2BJ6U3sZ%2FZOnryma7ovxn4tcqqP5U%2Bbdrx5l3R%2FCtxaEjku6aRObZkJCqU8Unu1L66tS%2Bo7hK3mi%2Bs%2Fa&X-Amz-Signature=7a886c40c60ed172980b057aad8f6c7186c5512a2ac63c91eefe2fd3dab81fe5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WBXL4SW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T054235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIB83kbx56On%2F4UJ2Y10JvGl6rRA1sr6JD5G41LNuVrWhAiEAhnKsLmRzyCQ%2BQDrsa4UxiXjKyAZ5rC1yakMgV3%2BWx00q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDFWFov0k64v2pvLBAircAyXqnXXPuwhUMEkEJfOElRmQvQiBI4vlVy2hh2fmQ8RqksaKj5BgFMOyd0LCopUv32EBytuZOyL6cRXzstekvaRojzoXOrjCgprhoAbgLXdQXS01mTPV%2BLT4F7cpnOp47viuZQdbd38R2%2F9CKBlxz5LhXuMAigndkGyQEHXA9f28tqNio%2B%2FgZJcPJUszQKYbhKx8VQyPJwrNrWJwWm3HHkW0rb815tRC3b%2BRchiqUNkJdvS58d0oPI6wdEU5%2BUN%2FgfNH3NCEUHZYPWyqVijD%2FVJKeM98maibAq5gC04cDumpof81DCJd3EXNbcHWu9ewChQOtS6MGTkal0TjF%2FhJvj4ISROr0axRVMY8qBzvnpE%2BFpUriZCT5nBY5jkyUnDJfEK0z8i%2Btbkk%2FbZhI9V4nyiwFKhQkH8t%2FfGfgvjX8KUNtuqz%2B4ZRShQjTBxnpBDm%2B5gBoaEcgjk99B1i1JpZ7OnebwejCfoeyVl%2FOr1cB8rl9MW2xhcGvPfMuG2LVRmK5RIhJCc8cSQAl9UE%2BFsmvewtbLcIM2SBLU6KhVg6hpt71l8K%2FBCTDQKTBZkZOgfKSHPQZv8z%2BChoLwXYKMPu9SNGCnKDVLC8C8gKqczZMgaDvLuJ0XYQsj1R6rsuMI7U3M4GOqUBEesN9pAQUamWk77INTzsQt1XWhFCGgNo9EgTpUCUIO0bRjNnqWX2YOJnszZ8jk2HAl5l6KrmSpb4%2FiPNyi7f0rijEzokUpFN1oZ4TyWZGIJCcF3KfOkWjJ%2BOX7u8f64b8sqH1qM1isbp3v4a2asywMKdIwKipaILfAlvvNe%2Bbu%2BBvzH%2BmX9APlUZCKJyV85Nj5QWrhZW3Cs4aZz4ZRPNdOw5sVPL&X-Amz-Signature=2d60bea38800f20681da6d8c68f1e6c94340386d752e56b739ccb272f7be1c3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

