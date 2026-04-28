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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666H6VQS4O%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIFneiXSZfAVZDfY%2FKyaKM%2B5OWDcqH54uY8JRybjiy%2FAjAiEAkiu2YO6WNsu1X6HBqipKoLTrvGY7Xrh%2FdQAxbPH9YkEqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCRRbL%2Fd%2Fsmdb1OCESrcA0NY4DPBwSvohTJeKtKNtt4Ps9g5x3h1vvEAtfVvQEbzOjczu3%2FWVc7O3z799%2B1W1nB8dbfKQc72a1nqsUE%2FRMX8%2F5D5uzsXxZLZ5teLejRxoPZxVwRyQap3gtzwHmsOs1g1wnu8gCEFPvJ%2BPws6FfCdUXmly8aN1bhoMXW1i0n7pDyOomWQ518Nk58zsEZ%2FK2NsER%2Bc%2FdjLyglLAKZ9yCgqqp6v%2FoIppl0kRYPw%2BAB0Oc%2FrgMl1IEwwv3P%2F8an%2B4XW2nEmEeueQhRPAAAnMjE5py%2FZX2oYPHg9cPndmes%2BYFQFryZAb7Mv6Kui%2BXS9x9nIIDPxRWgpU3pK4pYBZ9BU9nRKutQC4qS9akFjVEhPnbEog4J9ql%2F%2Fp4wRHpeuV4p4OrlLdnejteQm1TKLobFnwm48aCzPRs3mK4SOIldHRnTZ8IFUNXdagcVU7Bfg6kfB%2FzQ4XSdh9V%2F8%2BtXCbFJliXm9QPepzm4aBJ0f3KN8lud7lUwsRkyL3TiVJq3%2Bxutqrxu8IouNKJIWTc68Qd2DN9T8yMfQ12mz5u7AQOEjrfEtrBChldNHXoQ5tJwLYHaWgU%2BGpPxRP4Kp34iR7lCdjuzurv2fbCGxl8U1Ri7sN6WR4ZLN5v6xxQ%2FYQMLD%2Fws8GOqUBS8Qduey4F8S7h1tfC7zy272VAKeHuK%2FYHz6Jk%2F4jTZffAR%2FRG092Sxy%2BXoh5km%2Fil8hlmoILGvgK5AADMPxYurO6POY2zdfz53k8smggyADV5KBp6%2FNTGw1h4e3zoNeZIlGaHKiK8Jbixj7jrPJ2dYnJ2oKuhUsEz%2F4NFv774DPl4%2FhXRAD2z67BC1vmCYS63gc4ClsH%2FHP6Kh1yIf6ORnDcQui6&X-Amz-Signature=c11ef8d664da6dea98aef64b974330acabb870f4a971b46d2296c9d9c066c7e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666H6VQS4O%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIFneiXSZfAVZDfY%2FKyaKM%2B5OWDcqH54uY8JRybjiy%2FAjAiEAkiu2YO6WNsu1X6HBqipKoLTrvGY7Xrh%2FdQAxbPH9YkEqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCRRbL%2Fd%2Fsmdb1OCESrcA0NY4DPBwSvohTJeKtKNtt4Ps9g5x3h1vvEAtfVvQEbzOjczu3%2FWVc7O3z799%2B1W1nB8dbfKQc72a1nqsUE%2FRMX8%2F5D5uzsXxZLZ5teLejRxoPZxVwRyQap3gtzwHmsOs1g1wnu8gCEFPvJ%2BPws6FfCdUXmly8aN1bhoMXW1i0n7pDyOomWQ518Nk58zsEZ%2FK2NsER%2Bc%2FdjLyglLAKZ9yCgqqp6v%2FoIppl0kRYPw%2BAB0Oc%2FrgMl1IEwwv3P%2F8an%2B4XW2nEmEeueQhRPAAAnMjE5py%2FZX2oYPHg9cPndmes%2BYFQFryZAb7Mv6Kui%2BXS9x9nIIDPxRWgpU3pK4pYBZ9BU9nRKutQC4qS9akFjVEhPnbEog4J9ql%2F%2Fp4wRHpeuV4p4OrlLdnejteQm1TKLobFnwm48aCzPRs3mK4SOIldHRnTZ8IFUNXdagcVU7Bfg6kfB%2FzQ4XSdh9V%2F8%2BtXCbFJliXm9QPepzm4aBJ0f3KN8lud7lUwsRkyL3TiVJq3%2Bxutqrxu8IouNKJIWTc68Qd2DN9T8yMfQ12mz5u7AQOEjrfEtrBChldNHXoQ5tJwLYHaWgU%2BGpPxRP4Kp34iR7lCdjuzurv2fbCGxl8U1Ri7sN6WR4ZLN5v6xxQ%2FYQMLD%2Fws8GOqUBS8Qduey4F8S7h1tfC7zy272VAKeHuK%2FYHz6Jk%2F4jTZffAR%2FRG092Sxy%2BXoh5km%2Fil8hlmoILGvgK5AADMPxYurO6POY2zdfz53k8smggyADV5KBp6%2FNTGw1h4e3zoNeZIlGaHKiK8Jbixj7jrPJ2dYnJ2oKuhUsEz%2F4NFv774DPl4%2FhXRAD2z67BC1vmCYS63gc4ClsH%2FHP6Kh1yIf6ORnDcQui6&X-Amz-Signature=c11ef8d664da6dea98aef64b974330acabb870f4a971b46d2296c9d9c066c7e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KFZUE34%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIDELpSYsn15R2VZZput5tu6JOJLvmzQP%2BnYxNu%2FxpqLDAiEAv%2BgGm81YwJ%2FpGnwJNfs6P9rvCUpog25CehRcPxhISNwqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDErZfXc4eMWIVp0udCrcAyKbxtcAVqGYzpo%2B%2FEGhom20M%2BMoTqqLHv5yON%2FwPCfCrvxBzyuJXjsDo1v2oU17eH9886Bv3Q6UWJv71EPPsC6Z5X6gZZpFftSxx39aTJjfenNxlN8evlRl2aGy%2Bv8dZlAUPTeSldE0uhTpM6t7db6%2BJ3jX0c7OxMKhdLV5qbtaanMqfFAnytqxj%2Fb3B5HGq4TP9aft%2BRDfnMnv%2FukSsMdNSf5Mtj5pWHftdM3dP9sx9rXq5uEj%2FbhRNSDQAig7eDxFbBNiAp3XZ3Lys238WUYkkmquD3FcDMskwLf2R6xZzwGaoCgKg27ODnNoFssSC779NBC9395MFV3nBdXlNBRkSd5uBXNKkvOgrvUh1VDvnS6iGSFT8KzbQw58pZrDL8N%2BTy0HoPN7oBI%2FwyuQssZ94oePuCGV1Pbt2wvPspiKa%2FymyCYrL8NgYQtu%2Bo15EZB%2BQlT40nECTPbd9P4eGjf86ZPixrxPhM65ctmiGrju1nD6SbF%2FodMovAfqFB2cXel0hf%2FXrPqcDckZJGgukHKzmlyDaITUEcdta2OTDdYdTprpbchq5q2CNO4MSvwo9%2FRzU32bYKsB4GE6KlZhj1LYmh1%2Bsd1C9o7on7NSMD%2FP5cFIWGRClPOlwEqdMK%2F%2Fws8GOqUBz0aSjMDfFwMO07Ym3MRhKU8EBz2xAj5D1d%2B8ptxYZbkMoeJ4Hri7qkQOgap662LzewejIfV99FXYGPuABzIj7PMjaywPdvNkuYc9%2BWM%2BYaEjYXLjzV40KfK3Z9%2FGj6UJMnkGl90Ji9HbZ3VlBWbV6qAaB0tvYk4kGRIjSeUC4VDnenFxdg%2FIZxsftYAjLlRMUMrFFw930MheQO66aER%2FMBrruQdo&X-Amz-Signature=22df1ee380a2081996cc0cf96571697ba9afd096c8af930a6c274164ab6ec879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEW6JGSF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIAQti12xRX2pRzgwvNhFPGGbBdZnH%2FaKtaF2k%2BqoG4%2FrAiEApa353kj%2B2jJNeU7dPBHEQj7jjkmIHA%2FDIhJvxknc1vYqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF0mDuiXU8rvRlUIDCrcA3JLNwxY8WGMO8EtSBt2risQ7019uyATc5oJyAeNteMx5XZZ9e6za%2BI9OPEcCkaA5PVJy2Ix9CaIoyV%2BPK1%2Bj%2Fqi62QLI3xnfAxZQroMKKWgWWdzxm5UMNDE4614WxzBKoow3Nw2gVMvVHmxBqLSBv%2BbyZnjV8dzsgbpToWYu%2Fy%2BQNtcQz8wRnE8cCYqRSIUqiiUsG5UrHyrF5bfeCYPp%2BDxaLzEAZ8veH5p%2BxSuwcGxCGcJ%2FCG%2Bemt6938W5sNKJNvMPOYfulBtQe68k64Evj5WSpmXekCOhx1v2PWHkdIGgMFpSWGnRUmapoT5xTQfvnyxqgI0bQ8aGN2IIM0%2FC45emaUx%2F2tIRusZrSudzY1GAln384dg6rsVyULVFlKg3lKHQQRcXHG4AzDO5MqmPZ4Vp5uEeAonseGhW8hNbsz3EARny35fJ5QtemeHhP0mVAqPtMPNQJawWINCFSgQXdeYc1nLpBl6j%2FpKZn4PiK6%2F9ZvF9vuaRLGUcHwTYLMMfRLW2ChbXtUOiD9KzWbLJA4hoDeoI0Cfnjz0moV0osXUpwYva7IhJTinybkxat4N5Fc1AO00Ay5bSEIFjNnIy5eTi7rngrW60SIH0HaMd4%2BhTOuRl79DHVULEyLfMPX%2Bws8GOqUBcLndVqjn85oTP3ERoB4yxlAnuxaj4O8OiuodCH531O6c5k64HOun56prEeMPKdmpKXixTBXii4BGxK1RuJRZGJ0xl%2Fezz3y3cxZgNsCywefDqAE7SSNLsGAo4Bx%2BNDL2uV2uMyQax1VFxjyXzBbbbEeqeEFI9ySQTvEck%2FaZGB7jC8guSUNrxVMnW0nTP9vedpspMXOHd%2F8onZp6yC2w5uF1QVHi&X-Amz-Signature=66a283990aafb21296a82a48f4491da0b6e6d8b9740235e4196757f58b1f619e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEW6JGSF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIAQti12xRX2pRzgwvNhFPGGbBdZnH%2FaKtaF2k%2BqoG4%2FrAiEApa353kj%2B2jJNeU7dPBHEQj7jjkmIHA%2FDIhJvxknc1vYqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF0mDuiXU8rvRlUIDCrcA3JLNwxY8WGMO8EtSBt2risQ7019uyATc5oJyAeNteMx5XZZ9e6za%2BI9OPEcCkaA5PVJy2Ix9CaIoyV%2BPK1%2Bj%2Fqi62QLI3xnfAxZQroMKKWgWWdzxm5UMNDE4614WxzBKoow3Nw2gVMvVHmxBqLSBv%2BbyZnjV8dzsgbpToWYu%2Fy%2BQNtcQz8wRnE8cCYqRSIUqiiUsG5UrHyrF5bfeCYPp%2BDxaLzEAZ8veH5p%2BxSuwcGxCGcJ%2FCG%2Bemt6938W5sNKJNvMPOYfulBtQe68k64Evj5WSpmXekCOhx1v2PWHkdIGgMFpSWGnRUmapoT5xTQfvnyxqgI0bQ8aGN2IIM0%2FC45emaUx%2F2tIRusZrSudzY1GAln384dg6rsVyULVFlKg3lKHQQRcXHG4AzDO5MqmPZ4Vp5uEeAonseGhW8hNbsz3EARny35fJ5QtemeHhP0mVAqPtMPNQJawWINCFSgQXdeYc1nLpBl6j%2FpKZn4PiK6%2F9ZvF9vuaRLGUcHwTYLMMfRLW2ChbXtUOiD9KzWbLJA4hoDeoI0Cfnjz0moV0osXUpwYva7IhJTinybkxat4N5Fc1AO00Ay5bSEIFjNnIy5eTi7rngrW60SIH0HaMd4%2BhTOuRl79DHVULEyLfMPX%2Bws8GOqUBcLndVqjn85oTP3ERoB4yxlAnuxaj4O8OiuodCH531O6c5k64HOun56prEeMPKdmpKXixTBXii4BGxK1RuJRZGJ0xl%2Fezz3y3cxZgNsCywefDqAE7SSNLsGAo4Bx%2BNDL2uV2uMyQax1VFxjyXzBbbbEeqeEFI9ySQTvEck%2FaZGB7jC8guSUNrxVMnW0nTP9vedpspMXOHd%2F8onZp6yC2w5uF1QVHi&X-Amz-Signature=cbed1c192a852bee4f622c34fd191372482be37541f6efd188dec10a5797124c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUTTLYQI%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDhC5tlNwBogfVHg%2FLgwQM98ocUNxyxpaTx3R0opbWU3wIgTyuGOinqdfSO18u7t8w%2FJWR8mu0IGcJ7gI4MvENsCywqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHDt2AXgvnWwdjPt9yrcA2gyOtdWqp18d27f3YyEioC%2B87jB3X8QCfS2TFdw3t85BJqNVEYXO1AQei1f9D%2B2iuf%2F2%2BHLC1CELOLuHlzjceK16cmozoIDnQM6%2BUG59ET5g%2FyGEiPUT4NdEa1M%2FVGHjzy5kUyuu3EtIb0%2BdEstuncsFbBFzDe51YhDSexS3mesrewnnFSV9AGH7UEkQ8BOl55HPYjMfdS%2BwXkBWCElmaPSSJHBzFU2Tuq7nQLe4OYnBGlm67r6XTZgl8kvorMbAmtNfvaXc7bToKG%2FrzJSUuLwzbbztmDQ7Ctefzhs%2B5a26R3Q5DG%2BRnhNSlY6S%2BpDdxOxmoXqg5GcRrtsMKKaNv2Z5nLOAdJ1N0JrPLcBJ7moc3xOTNkZPXPHVQZrwu7YMt%2BHgck21XfO0IUWvcxgMcFQm0mIx2BYV6nkDOqNQJklpRO6KszN2PtYDc%2BROlTMCxp8mD%2B0oufmK7DN4i%2BVW7nOMev6DYg1gbFhhHFPDbiR7pbCtDFc9YaIC0uuxO9gLTBvfyw1TfVnxbu8bQyoGSQqKreiP6TuYOdizBKkmy6e0XD9nwJRFv4Ht6s%2BbMYQ5PK0UINL0KGq47384EUeau4yvDgKbBdEleq3VPRu8%2Bmz6KZ2vONmb98fkx%2FZMKD8ws8GOqUBownzutfAkJSRv9i2Ij%2FbKlWZiPlsesWsT9zrxFxtuZqcKXzO%2BydGubC7Tjqr7AsyRMHP9eYWjcuN9LTnQKo2%2FuZauzpfgfOESXiheyjqeI8xF8kt04hy4HKA%2BnbueX2HYe85v8R3zUhodXjORNh6BTbaYR%2FdoppTqpLS3h%2BNTH3qR5bow8ZU63eMvzW7yMVeV841Be8x1iazX80n%2B9t%2BMIC9HYAU&X-Amz-Signature=0e9e4d39d9cd2ada421a94dbba03dc8ad2493863617590c41e4307d77bd8618a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NUTNNI3%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQCIyadS99qa7AYkwrrIjsyfmsvpU7OGCYqY9ynpGPnqxQIhALSTcs1n0Bj7sUbvs8cCsJ5VPKA8EBFy4ImLO3B1JsI4KogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPRBlTLbJfz71BWssq3ANlEhBWGgepHbNIzxNizWSBOAsN4EoR6choNgD4D4htyUgfr0HuONMrFh%2BC388fQmgxjh9O5HveKkGxZZJ8jviSQ9q2btUFp%2Fo9alLsC43HzDxH0tsOId1D%2ByjTQ4zmowM82yvgIWLLkwpTgIRhTm7aJa26vHRy6WCz9udp1fD%2FkpqdjT0ANIJkUQrew978KkN1l43v0rXiFLmVvmrIcHE0fKE2WdM%2F%2BhDt28vSBOw7S%2FaJ5LXXG3VMtGHpD9yZqfzY%2Fb%2FhwS%2F%2F%2FplcirQbXHVP7At5Hz1J%2BHrCS3zkuxSm65qaH5v4ybyaxHzepuGD4zTS%2BLpgHpodL9%2B%2BC%2BEwh1%2BGPW59JB996mOoHYX7GKPuwgpadmaR%2FC1s8Dbn5aeHUxkLg6k3YZMty6sowPBCPz8QDSbJ7wW9ayL%2BK2d9fd8k0X1B5mbsCF6YhM7UaG767te0R%2BLIi9OznDBbufrX9xtsxhH9ISfNZUydiLW3%2Byg%2F6i8l8wFvEE%2FpCGKZ32H7uWMOgaxeVsHplboJno91Q%2B8rie%2BLKQy7gI1c1PwRvm7Qa4AlLIasiPXe5oqh1ADWKhV95gj3lrpPuYV3oklftW6O4DBOfDsGJeWLG4T4%2B0GSksxmRxqu%2F0kWpGNZNzCh%2F8LPBjqkAe7g5Od8eMY402ZQtMRdGEX63Yog3w4%2By7E18PO5wahg4Yau7vXjbgkcYrz1xvQAW7QSPPU1q3gRpm6FEMhT%2FfMlYCXdUT8ljptnbD1yuKPHbuMRz7RPx%2FTWO3E94Q%2BMD8DLO0vxkbXvddsNXmMCWHWNsv78vjKWFDFypoop6u948JFCbJuyEGEBMi1nOl6ypVFoyIhLd2G%2BrWlVl1s%2FJRDOrA%2FI&X-Amz-Signature=11acb5fa66bf2b3d7b5e6b6f1ff3f8e959beb578a09d037ad5806f2355fe7430&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWPAMEBB%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJGMEQCIG%2BEQjhzCjR7MX0FqBGT4W%2FCO6YpaTjohHrJpL7WjX4nAiB6qjP4x1YMM7HFr06R%2B7Lz8ITXLxVhCQ32EOBf8EQ8VSqIBAjg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC4nnfvM8PVxWO0sEKtwDsnJsH393NRV%2B5tAmWOp3K21JGcm6ozy%2FYdBU%2B1aFqJnrVJFVyWj9PmXmRMkHNd6X8%2Bu5%2F%2BTzZRk93uU%2BXy5wak8xLwY5p6HLNsZBVN1QsrizsUD5q1a6lJn9ZDybRaNOHxUmK0Z0%2BsuyA5jhtpGetMsZubBSeBWJX01vzS4%2FtF9UbTF%2B0ZZjzGdn3yZGVtcJ5kZyJFvxO2aDvhnR8RtwH9yLccn7GypUKCbZZT0wnV3%2BUSqrBq44wVHlOBxeoShAbA7hy6cj30ZOx25GYo%2BAef8Szn6Eftmt%2BhjeiCUYZseoLK5Fhqo7bVuMU9jk6b3j5xYfWxbzqJNWSS1udOtdBwoFHNefrQvM6Jp1DaZEsAlHVlLORX3Nv9n7N08ekWEs%2FoxWVacvOCPHCNHdOL9tGe5Anx7G98iVYx8L%2BUUBTAb3otB06UO1YPvOzJxLLBPWl2GJEHy08IjZ7Z3PHaM3lYp3dOPgh6LcXMBwQV6YwOsDy3wucgYpJkG%2BQchsCD%2BaStk8JMR8sRaGbZcHox8amMFxKSuh0loNKUfd8U2PEEeySAQduJlN8yCGVvrNbJxp2Wuj0mdBbbJazkJWrvAZwIDqv7JUPYNgLQrfVg0nX6cP%2BKTz9vKEFK8rcHAw2JXDzwY6pgGK7%2BHcbDfsTBs9YHAYHoj8gCJ%2B8Ueg5ealLtpFSKMYFJB5GR7GixHmydF25ctgwozlZ8KZNwgRmAj6%2BvSzlMom8CAxIZn6sAPxIgo5w1nRlXi%2FOm3MugKJiCdfNt2cM5aRruDhN4sRp4I74eqpVIScWQpd0o4brvhfY7YzIbY%2FqS1KOeKnap0kC4zZ5uqnDtfVvORL9CJEwT%2Fi2Arndlu6%2BNoL2lbM&X-Amz-Signature=49bab469c48131a3fc4f6cbe53313286c6df60aca65d1cc2ec9b0c3c23dd8629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB237I4L%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCICF6gELE2nndLmK7G1ZUKnpkkg4reQEu5dhVHAr9k0pvAiAefLP%2FHaF8lPSO4rGzh571QDERzshX%2FbsusKGm%2BJPDrSqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdjn%2BomeixiOWT3qaKtwDI4pl18ChqdfMQaxAUKCZwMVJYFheg%2B7D2JGyZ0reLXCwwHy39mRvzswEe3MoflpvgFPH0pNYHXoh8WEIXAxIECqVSJH%2BUe0%2FjccVscY94OxLywDyWH9GAEgLXUSqL9gMF06fQGca4yrUS0M9%2FRZQuHFyfQqTp92nhZkkBvJva7pvvNOdUMqNsofJKhBnzHmCl6599eLX1dYTf73RXly4i%2BTTwV7gK81uqNtXGN35QWIp8iIDOBNRxrJJqDgkBm0T5KTcNo%2BvInAmmsIOq1Jg%2BoxlBewrSdQOFFc7dWCET4G5WVRS%2FXno%2BNL2om%2F%2FK%2FcHA1VBuNVQZY9VeBlLdqXTMiT6mSohqOWBxjFWoDNHqWUuPMVpde9ie%2BiLSyC57%2F0YUzrrIIu4Kfyik8%2BLwzJT%2BxG1eri5wwsgLbN2cnsIb0TpgFLX7r1pd16cx81jlaCPhfTyXsHtzsq6%2F3Uqzjk4Y94XxjeyW28x8itNaLUUn60IGfN5cU%2F88IU5tCrXEO9IbAv3LzriNSneUXZgP2XGTNE0Pg8wZS3%2FGTeUMhp5kuGjdacfGE3MmjZ5ShEiJ%2B0D%2BPww%2BxNbFc8g4n1%2FAMLY1ncx8WLDzEKPHd01cIknUu9%2BdCnSbY2%2FrcamgewwxvzCzwY6pgG3BW8a328yMvkm%2FopF%2BcICH1WxwKgH86AebQly%2Bd9xH%2F8R%2BAXj64BC0ToVWfyTLkHUFf9KN1TCWs1B6OibzSg341Twt%2Fn7UllINg8LjVfHkBTxRJJc02vQRDX%2BxKmBzLc9PhJX6PrWm%2BmMfqAK1%2BvSK5d%2Ffe9Xhg34LPCGsvrXsxrld%2F1zOldZxR6szLtmiLQ3GgdhTdCAyKPItRaC8IOSJ49gG2sm&X-Amz-Signature=b96c36f590c9b7ad4c5d325fd1dd1355b2f37ae88665e708cd6dd5701f7fa99e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB237I4L%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCICF6gELE2nndLmK7G1ZUKnpkkg4reQEu5dhVHAr9k0pvAiAefLP%2FHaF8lPSO4rGzh571QDERzshX%2FbsusKGm%2BJPDrSqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdjn%2BomeixiOWT3qaKtwDI4pl18ChqdfMQaxAUKCZwMVJYFheg%2B7D2JGyZ0reLXCwwHy39mRvzswEe3MoflpvgFPH0pNYHXoh8WEIXAxIECqVSJH%2BUe0%2FjccVscY94OxLywDyWH9GAEgLXUSqL9gMF06fQGca4yrUS0M9%2FRZQuHFyfQqTp92nhZkkBvJva7pvvNOdUMqNsofJKhBnzHmCl6599eLX1dYTf73RXly4i%2BTTwV7gK81uqNtXGN35QWIp8iIDOBNRxrJJqDgkBm0T5KTcNo%2BvInAmmsIOq1Jg%2BoxlBewrSdQOFFc7dWCET4G5WVRS%2FXno%2BNL2om%2F%2FK%2FcHA1VBuNVQZY9VeBlLdqXTMiT6mSohqOWBxjFWoDNHqWUuPMVpde9ie%2BiLSyC57%2F0YUzrrIIu4Kfyik8%2BLwzJT%2BxG1eri5wwsgLbN2cnsIb0TpgFLX7r1pd16cx81jlaCPhfTyXsHtzsq6%2F3Uqzjk4Y94XxjeyW28x8itNaLUUn60IGfN5cU%2F88IU5tCrXEO9IbAv3LzriNSneUXZgP2XGTNE0Pg8wZS3%2FGTeUMhp5kuGjdacfGE3MmjZ5ShEiJ%2B0D%2BPww%2BxNbFc8g4n1%2FAMLY1ncx8WLDzEKPHd01cIknUu9%2BdCnSbY2%2FrcamgewwxvzCzwY6pgG3BW8a328yMvkm%2FopF%2BcICH1WxwKgH86AebQly%2Bd9xH%2F8R%2BAXj64BC0ToVWfyTLkHUFf9KN1TCWs1B6OibzSg341Twt%2Fn7UllINg8LjVfHkBTxRJJc02vQRDX%2BxKmBzLc9PhJX6PrWm%2BmMfqAK1%2BvSK5d%2Ffe9Xhg34LPCGsvrXsxrld%2F1zOldZxR6szLtmiLQ3GgdhTdCAyKPItRaC8IOSJ49gG2sm&X-Amz-Signature=1e32972d6d15acd48fc250c7387091157ab56eeeda9be71dca57c599d2ffd509&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BTTKQ46%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIGZxYJvd6nsrmtlcVs%2B7e0xVRUSdN7S2t5EbT3J6iHtFAiAReoq8bNFm8vgUBqXf1pjfSldkMr0cS9n%2BZy1W92%2FxpyqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqT%2F9q1qUhdyhCmK3KtwDCWnRPbXcsiCPbdCbWnex16pM0OIrjB9lzE%2Bas%2Fx5VG6H3%2FQv4cGv%2FnKKnPLv3gIo4hp%2BJJ9AQChjpZp72h%2BkM5PK%2BO3HhUvKO%2F8ZUWPd%2BcoQu7o6JXALngrMYzG6iZY4uCvD9gAdmKEbabPFhCsFhL0fmP4PRRwh8KKReaqq74A9k9JwxKVEkzKlNfG56BxXHUmyJHGaSA6SgVD1a86RW5hUWBTfAoVpdCLZ1CqxhwfR3to7rQORLEeG35EguBPBKs4FDgWGH588vqPl1gEzgfBNmp7KzKz7FlCSYNKExz3HYvSk91HwOJo1WehiewE9f6v%2FiY0EWV5aATXtO1tZRne6O4EpPVoyyJOQNCt3ynO7CcY0fr%2FEMgWJubvH5SQmwm9mtXJWyyBaZIaCPcyHl9ub4hyLVQgBA8wcgBhFH6apmFkfpmPs3%2F1SZho24AUGF1hUYv7FNCCfi%2B89SyxW3gzqU2zTluF%2Bf2zJcjZmNG67uIWwXQuuiQA5rfhJEMlWNSK4E0bOIPtqQXSjt%2BJZ6HDtEctWHWFlKsP2gcbL4GiR0VN%2BLALaFzoUmzOy0h%2BOMkDH4S4eyVfTaQ546E4Y4jY1NNu6eq7U26EWqDRbUFCNd%2BUY4WTTXhF4jaIw2%2F7CzwY6pgFZblHGr6XQg1P0r9bvI0jfqyY9bTQDa36Z4mp%2FJcgFSZgSGpe1guTpAXGjtMImiwOLuPqgLzCEbJQYGkA%2FhohwSzxr9Yi7E71%2Fhoe03%2BDdCvvUwPgaqzOzfPD5BAlA48CC0%2Bqt07ix%2F9Jc5upAEA2w%2FfDxzHWqGExm781SqhpKoZpFgJOwK5rn76QPG9rK9v8mq0IaKZcHEcX8Sq1M4yIHYjn1Fs8f&X-Amz-Signature=be662b415dd0c901ef7013357816cb4de140416a54dad19e7954f0ae1404fbf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCOGLSJP%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIDEHAI4v%2BQoQ%2FTQpLOB20VHmSP%2Fm47eweL8nnXg%2BPh%2FyAiAXoVJWztnp8eXcgNOs0tvq52HrLOFny8PwMi%2B8yRaxCiqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqCHdw5Hj5lgZ063TKtwDcw0xamVAPWUMUWP%2BcJMQH0Xweqqr0gi70NQ7eQ82NMq%2BImsSLWoRksB3zzm0%2B7MbaDwGRWQLw9XBjdEF73hmG3Jj05rp98%2FIragB24xGR2mkt0dQO8fbxJVY7s1H8ts8zQ2vReHFVaqjvWtLnjN8BnOBK0fSfnL4wpZgdbnKJE1OBqNHGgfy80i4VanvI3ENkeSdWKxCNkvtxtHtrFSIgKBmLTdnGXfnDC8DSWp1k8EnEqi3TCqTlj3K%2B9yEacgIA9tbMLc4ZTrTY1SIaCr0yaVDnUY5%2FRShS33tS9pa3Q%2FJYWF7hwHiHgyHQYkmJp%2FutnDJmaP8Aja8wmLef79bVtZZvsOWBlBAfc5bTA64B7hW4UuZSE21QbX4Xw7KlB8o0JZ75zONTqFUmcxjiN0tx87ml9tCUUl1LAhNqmz7xx1o3uHrl3XXe10EN80LzE%2FcOnMxEymM8iW1tgDe5%2F5AOc2R0D54hWUENiwuLgbLp%2F9LJRGSeWTnFQMp2rcZdtcTUVcm9DlBpyp4xUOgIjQDX%2FwX9vqR4MeAkgQoRjX5GuAFtRDNQNkKoZ45cBesZF%2BMawaLIiWOlPWGiJ9ixgWelKAmFT9hlHSlP81nOHm0XoO2hoJ5evDjZrH3F4Qw0vzCzwY6pgG8dGRSZhLudHYIedGFWSoPTOHrbQ12%2FKq7Ogvtno6fsAo31WHmS77fqzZ8en51er%2BVVFgEbuHYBEiWE%2F3aH4i6WcNdDs2%2FsVDyYtmGgnx9KIZGTWduo65sBBteCR05oO1kB7EO48wOpMM5NtNdJIQbizbJWRkIbmYTW9UQ04q8lytvHeWNv5NxpAmTN8a1XTUHIg5VbAG%2B1nUswjjCkH6OdX52HTY9&X-Amz-Signature=8497a26f30ddc138b87449ee04d2c9c42690a4d58e09b12b471745eefb8858c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCOGLSJP%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIDEHAI4v%2BQoQ%2FTQpLOB20VHmSP%2Fm47eweL8nnXg%2BPh%2FyAiAXoVJWztnp8eXcgNOs0tvq52HrLOFny8PwMi%2B8yRaxCiqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqCHdw5Hj5lgZ063TKtwDcw0xamVAPWUMUWP%2BcJMQH0Xweqqr0gi70NQ7eQ82NMq%2BImsSLWoRksB3zzm0%2B7MbaDwGRWQLw9XBjdEF73hmG3Jj05rp98%2FIragB24xGR2mkt0dQO8fbxJVY7s1H8ts8zQ2vReHFVaqjvWtLnjN8BnOBK0fSfnL4wpZgdbnKJE1OBqNHGgfy80i4VanvI3ENkeSdWKxCNkvtxtHtrFSIgKBmLTdnGXfnDC8DSWp1k8EnEqi3TCqTlj3K%2B9yEacgIA9tbMLc4ZTrTY1SIaCr0yaVDnUY5%2FRShS33tS9pa3Q%2FJYWF7hwHiHgyHQYkmJp%2FutnDJmaP8Aja8wmLef79bVtZZvsOWBlBAfc5bTA64B7hW4UuZSE21QbX4Xw7KlB8o0JZ75zONTqFUmcxjiN0tx87ml9tCUUl1LAhNqmz7xx1o3uHrl3XXe10EN80LzE%2FcOnMxEymM8iW1tgDe5%2F5AOc2R0D54hWUENiwuLgbLp%2F9LJRGSeWTnFQMp2rcZdtcTUVcm9DlBpyp4xUOgIjQDX%2FwX9vqR4MeAkgQoRjX5GuAFtRDNQNkKoZ45cBesZF%2BMawaLIiWOlPWGiJ9ixgWelKAmFT9hlHSlP81nOHm0XoO2hoJ5evDjZrH3F4Qw0vzCzwY6pgG8dGRSZhLudHYIedGFWSoPTOHrbQ12%2FKq7Ogvtno6fsAo31WHmS77fqzZ8en51er%2BVVFgEbuHYBEiWE%2F3aH4i6WcNdDs2%2FsVDyYtmGgnx9KIZGTWduo65sBBteCR05oO1kB7EO48wOpMM5NtNdJIQbizbJWRkIbmYTW9UQ04q8lytvHeWNv5NxpAmTN8a1XTUHIg5VbAG%2B1nUswjjCkH6OdX52HTY9&X-Amz-Signature=8497a26f30ddc138b87449ee04d2c9c42690a4d58e09b12b471745eefb8858c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFFHNBW7%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T151140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIBkWALwb5L23RjXg%2FWf8USJvv%2FRDyLjsfdxfCRhTCdnhAiAJeDNF1XerBKyBT%2Bp5J8Qkq18JsCuj20yA7dwqXsIKICqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK0ThMyf7CSPkbrMpKtwDinQ2DFZwpqycOQLHEZokbE35znqIaGc7N2htviWus7htO4Ma0%2FyOylk8fGHXuqFg7EcGGYVDAO6m8qmM5Du7UQBQSrLnEnUCdcS6ZjKXugXskdM3Y1zf9mvVEchydY%2BCBPulajFN9zSIDOS3m8eA1jhlXjTAaS39VC4Swh5H0kCL5oyg3VUPsSvjdYYjR9ZhMAfzIW7l1pfthmyLX979%2BMZdXW%2FQMVpCc6CB6CQ1LXmJovAunl1a6qSOY4hJG%2BKKM63W%2BVA2SF0HaH%2BCz2bZ6ASzKJoBxoXGC7zSCaagf4s24pj%2BoOjSoOpyXjLjzDEl5Cem1fT9CSFc6Mcf0ru0p4UKzxCEOWie5TU9cPbglCl%2BDPbXWTaGdojZgontzdsDRTdL8yMydJreYY9nCaMCPeVg%2FKP5dpf%2F%2FHVTBozlq3r5iRu%2BbjUBBsmyczqwFV5cLpVmscC3GsR8fxYoZWJivAATsgPFWCyX4GXh87aH60vykAwAEYY71YdUWFUwq7wy%2B6TgtSDSw8ofruuDohA0nQPtDhnXA1bQ3ACuD5IJ%2Fz1nro0OhikY79rt2xp7qCHICwX7Up16zpQTs3SbIcypB4LSh0GjXb3rivZEFCEY2cTWzeb6RDsE%2BYKv5p8w4ILDzwY6pgGBT%2F2OV%2FBlIAKCwdAzLBFUAu5SEJshgxGCXuZI4wHP848eKa4LlBEotBnqzGxtHgCaw%2ByiJFAq9hkwJI5%2ByM29pEN5xTalzFhM2ys%2BbrO47ZnDg%2Fj9uc848Wjn60pU8CulZsGxA7DeX6Z28ycLXx82ppgQEanVMrK%2BIiOlLqIFlFVsf0%2Ftb0eUyVZPWVdT9zJ2zrW94z%2BvMmUQ2HugtfSYVFCjwcWk&X-Amz-Signature=e07052c742c335b53f4d135d14ba538467522787f14d5e8c88121af4ec92e8bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

