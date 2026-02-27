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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Y6PVDVF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIEURvhW%2Ft%2FpfkjpNKw4E1bsiodrck9Noxf%2FeiA7oDe3fAiAHK4lU3joc0K31MrBmEQ8iFU%2BrmNoNKKgTHuZ1eQ6qjir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMSyJ%2FMVS3a7RCx2RwKtwDw1nFO5L%2BvSNUlli5zU5VY6FVchCyoBjnJMC13eNQeL1AXncSX8PKfH7O%2FjW1G6AWopb2bdY8IT1gbFMwmMKBfUGjkboy4oDAFZure9kXi1P9Gb8VLac42V%2Borjm%2FaGoMBluxYJ3BqiUcpVjlZ21PVu5Hk4%2BwR6mDsV7db1aH0MfnY2SmoW%2Fn52IcvqGj7q76F29YL2%2Fyu5RGnNwI9x8xarpdlSSBR%2FHVMu%2FwQXk8ZV%2FfJhFJZ6LjBAXvCyuGbrbdxN%2B%2BbExX6T%2Fu3vITfrWD8X9B4stesOJ8GM9Vge65L5Dp3uMsfE%2FTNAAaTHpWHqIF02%2FK%2FWjPsYf9KbJ2HJL8MyIprynBL2gJvPC99gi5yxN4kzvdtmyDXPwymbwWW7QbTsUS%2Fx1vlOl89hk93ZvzM3wkW98QwC9%2BCIpRhxZxlWkG7oftqDJmpdC5I6IqJHfO8IJD%2FT8hFyXQlkGVZ7XfwpK0CvgYspFMjURZu5qyI62MWjNTVHFoY7FMJCHekMmfBWmQEm2e8xNf2N5pavYYaAWaUFrBCgUL%2BNMgvpQ7SB5tFhstX52jlLle%2B8KXjxML2M4tkfvorP4K2GHLC%2FU8IK4nkw16BW3JvOhZ8SnvHoQh%2B5Wy34BGoOGRZHIwp8WIzQY6pgE%2FmW2jAxBsgAMCXPsg5SlLr4qV1r0hLKbRVtWAwkAzmkp7lwXjLZFmHgTFZ%2Fyq7MDHjBh6NwZRG%2BRFseo0oY9bWWTrPiM7uhKww2fqGFxTaWU9N5rai4nlxOPUwsVfX9bqYam9oHbCzmumQs4jk0PkALv9KGnDFp%2F6UgZ6cwNIMcTBZoK810qP8xCaERGKx5OKIaYjv9iSFpNDpmdUC1RodPZXNomU&X-Amz-Signature=45bfed7c819d86c7a83ec12825f318edc9602484e02b6d7bc6674d970d630710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Y6PVDVF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIEURvhW%2Ft%2FpfkjpNKw4E1bsiodrck9Noxf%2FeiA7oDe3fAiAHK4lU3joc0K31MrBmEQ8iFU%2BrmNoNKKgTHuZ1eQ6qjir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMSyJ%2FMVS3a7RCx2RwKtwDw1nFO5L%2BvSNUlli5zU5VY6FVchCyoBjnJMC13eNQeL1AXncSX8PKfH7O%2FjW1G6AWopb2bdY8IT1gbFMwmMKBfUGjkboy4oDAFZure9kXi1P9Gb8VLac42V%2Borjm%2FaGoMBluxYJ3BqiUcpVjlZ21PVu5Hk4%2BwR6mDsV7db1aH0MfnY2SmoW%2Fn52IcvqGj7q76F29YL2%2Fyu5RGnNwI9x8xarpdlSSBR%2FHVMu%2FwQXk8ZV%2FfJhFJZ6LjBAXvCyuGbrbdxN%2B%2BbExX6T%2Fu3vITfrWD8X9B4stesOJ8GM9Vge65L5Dp3uMsfE%2FTNAAaTHpWHqIF02%2FK%2FWjPsYf9KbJ2HJL8MyIprynBL2gJvPC99gi5yxN4kzvdtmyDXPwymbwWW7QbTsUS%2Fx1vlOl89hk93ZvzM3wkW98QwC9%2BCIpRhxZxlWkG7oftqDJmpdC5I6IqJHfO8IJD%2FT8hFyXQlkGVZ7XfwpK0CvgYspFMjURZu5qyI62MWjNTVHFoY7FMJCHekMmfBWmQEm2e8xNf2N5pavYYaAWaUFrBCgUL%2BNMgvpQ7SB5tFhstX52jlLle%2B8KXjxML2M4tkfvorP4K2GHLC%2FU8IK4nkw16BW3JvOhZ8SnvHoQh%2B5Wy34BGoOGRZHIwp8WIzQY6pgE%2FmW2jAxBsgAMCXPsg5SlLr4qV1r0hLKbRVtWAwkAzmkp7lwXjLZFmHgTFZ%2Fyq7MDHjBh6NwZRG%2BRFseo0oY9bWWTrPiM7uhKww2fqGFxTaWU9N5rai4nlxOPUwsVfX9bqYam9oHbCzmumQs4jk0PkALv9KGnDFp%2F6UgZ6cwNIMcTBZoK810qP8xCaERGKx5OKIaYjv9iSFpNDpmdUC1RodPZXNomU&X-Amz-Signature=45bfed7c819d86c7a83ec12825f318edc9602484e02b6d7bc6674d970d630710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PFDCLUM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCTu3pyjxFQbjepOpuGaYUwRnhh51eSFZF2d4GoHjarGQIgV3jiR3ZGW%2BKHE5vPuTDo6hgFMPFm6LEqHG2sxaFQxxgq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDEcd36AVm2lPCEI%2BdircA57X21rvCdlM3r2P7cQeWx0c%2Fsog%2F%2FfFR4w9DFAN7Wf4GSODdrEPbuf2Iewslt79%2FkpDsfAEyQ5HJANMtq0A8%2B4796PjmX2HmbFLO486xhREeCsxcdZA7ED4QewwnIXWrzmbwvg3PfmkRMQ9C98KYQZ1tm4gWP60uA4%2B6CBiQ8f5k60O0HAobCRgmX%2F09UsT3pNAtpsaCeQln3Xeaw3C%2B3rXbEpc5%2F1Q9LQcQGFMEu93ZJxcASnokBU4YE75oiYmGkmNDEs7h1noPPCTmYNlCiypLuVAUkaf%2F%2BTsvBN6RyF6HBY8rOqTAc4YngLLU7z5fEtIqEByjoyPvfyzvqmGIIWCYyHjw2dJRvB%2Ba73eEDWlaJccu0mJiDhqSnd8ZScneb0%2F3H51C2vgXqOgHo4qiMRcGEhz0F%2BFFMydOG8ivnao%2F2tlhe0Dgl3zdJZk0otsKqHkLlPGixf4xuJh9w8tai8XJjryczWujVSGenYZPUW9vKWuInNz9ir5U2xS7SRG%2BrB7ua2cEzk5V88StBKyM7nMzs5xOwQWJDMOlw2QndZteAlf5Ym9495gPXRwL9shbU3LYQCQc7M%2FSf%2BNu2q9j0svhtbGhEgfPhomn%2B7kcCMPxUy0jPes1lb3ihIzMMLFiM0GOqUBNCn2gY8YHjeQKtWlJecLk8WJcWj%2Fjp2L14Nlbbd3dGJf0kwu4DccbAxg16FLcs3y2rw3daZT3CafL2%2FofqTD%2BXU%2BifrMcc9NSqmsEEulHgWmOseMXrHXc%2F8tNi83%2FUyDnaTNkUCAQArmLaZB1seyZigTbSacnA4S%2BnVWy3fv%2BADVYtt9IUIBcQX523K1TkSTQmmIW64es9A0LOhYdffPx2lz6R68&X-Amz-Signature=1f4afd42ae463db6c2d571c38f7f6d4ca4693e9d52d15c3c0c928f2aedafbe37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXF3VYMB%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIDjuRsHiDWygc4UsYR8Ca2woe40fPkTlxbcMDZKZkEm6AiAjBB%2BQQ3S0utOYApv5EAu3y8NNx92nAKuvCoa82sGpjir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM6X%2BT9l1u5wX5BhVlKtwD5pqA54KT4FyLpsZZ7uVsf1ON%2FuLsnAPoqHh5xOCaew6Ga%2FS0CqrtJQUCG7%2F%2Fd%2FpdjU5h570UDL5Bh7hjzXI0tMIEJOWsdSlHd%2FRk%2FKR2S6e%2FOxHbBHGtemEskf03%2BFLuyWkkSRK2dHQGsSeOQG7npLmBzQie%2FjBw3XqfKJrx%2FMOL%2BuSpvd0rWVpiLg8JeH9foilHpXEQlAJdxVgfNeNzv2MESoAzRFzCW6uHcUl9xfYLeAeA0SEiVnM94%2BYaWnIaESCkeT5Dc1NCX2qCKjwaNsS1TkGr4SituWLuVF%2BkhfzlIkWrsoNrIuRivJWxPBpdh090PaqkPxSFmRkhlULEs3dCBHmElNIItUTup0qxW543%2BDAQKLI7kUIVqNhs3VeTQTJa72qtKXINtC5A10SvACCvetGIDtN3R5bx3WqA2Ifjf2xEqV9V7JyaVmAL2BUTrmwXtfY4pGlk8NXeK2T%2BPmS6EQeWsWLDmr00rJbKah2jrX4k2qdL6IMVQkaZx67xXqLdfcCGYOXsItDGZbgXiiRAwWk2W%2BY4k6K1PCtQvlTV94vjKRrX9maV0LYpCFeBtCgM0snO4Ec%2Bq9Mug1XQ3J6Ci4PyX%2B7BtqmulNo6qaPpMwh16t38DdqMV%2BYwjMWIzQY6pgHUEoKNHyeOsUoJ%2F%2BHzw3HPGH0BvbgP8QiRpRsyEijihqsIM%2BrbJyfW2HXXaaaLsd4ucMPajmwaK8qbtM3K%2FW%2FgTVjPFP5GaEKfu9YWNR5bwMMyZ8KI1ClidJU43LBXb1T7hbXSEjgRnvGt3bAU2%2BrINui4zfcsNglpe%2B3pXW2%2FMp2kuFoG6bq2PQaVV65%2BAOMPkzJJlMhw2AiGREktl6nXSpl0EEwP&X-Amz-Signature=783effbc5658af1b44fbab149a4e4549d50bc78cd1d9c252a0aee55b54706a11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXF3VYMB%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIDjuRsHiDWygc4UsYR8Ca2woe40fPkTlxbcMDZKZkEm6AiAjBB%2BQQ3S0utOYApv5EAu3y8NNx92nAKuvCoa82sGpjir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM6X%2BT9l1u5wX5BhVlKtwD5pqA54KT4FyLpsZZ7uVsf1ON%2FuLsnAPoqHh5xOCaew6Ga%2FS0CqrtJQUCG7%2F%2Fd%2FpdjU5h570UDL5Bh7hjzXI0tMIEJOWsdSlHd%2FRk%2FKR2S6e%2FOxHbBHGtemEskf03%2BFLuyWkkSRK2dHQGsSeOQG7npLmBzQie%2FjBw3XqfKJrx%2FMOL%2BuSpvd0rWVpiLg8JeH9foilHpXEQlAJdxVgfNeNzv2MESoAzRFzCW6uHcUl9xfYLeAeA0SEiVnM94%2BYaWnIaESCkeT5Dc1NCX2qCKjwaNsS1TkGr4SituWLuVF%2BkhfzlIkWrsoNrIuRivJWxPBpdh090PaqkPxSFmRkhlULEs3dCBHmElNIItUTup0qxW543%2BDAQKLI7kUIVqNhs3VeTQTJa72qtKXINtC5A10SvACCvetGIDtN3R5bx3WqA2Ifjf2xEqV9V7JyaVmAL2BUTrmwXtfY4pGlk8NXeK2T%2BPmS6EQeWsWLDmr00rJbKah2jrX4k2qdL6IMVQkaZx67xXqLdfcCGYOXsItDGZbgXiiRAwWk2W%2BY4k6K1PCtQvlTV94vjKRrX9maV0LYpCFeBtCgM0snO4Ec%2Bq9Mug1XQ3J6Ci4PyX%2B7BtqmulNo6qaPpMwh16t38DdqMV%2BYwjMWIzQY6pgHUEoKNHyeOsUoJ%2F%2BHzw3HPGH0BvbgP8QiRpRsyEijihqsIM%2BrbJyfW2HXXaaaLsd4ucMPajmwaK8qbtM3K%2FW%2FgTVjPFP5GaEKfu9YWNR5bwMMyZ8KI1ClidJU43LBXb1T7hbXSEjgRnvGt3bAU2%2BrINui4zfcsNglpe%2B3pXW2%2FMp2kuFoG6bq2PQaVV65%2BAOMPkzJJlMhw2AiGREktl6nXSpl0EEwP&X-Amz-Signature=5b1f97e0e372b6d9ae05bf8479c74ca408fd0b77411705703bed7dc74f93e361&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXF3XUY3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIBnuoNLVPXLDuEhdkHc%2BLF2pm98d5Dq3EsP0Gi4KoDP6AiEAlNPBeEXI2g2pCSdxoPk85W%2BE1HnM3XfdSUmTFx4MZQwq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDBGSwcdccCpj6HCbjircA7IqLmb7YfU92yenYlUhTsxR%2F31ARzpITTGodlWHsJYMELcEvRbGKGh65nUZnBcNVp0f%2Fy2uLJ0h04cixaIZk5Kh%2FTvZQ144C78c1XBgnprGnkKCkhIr%2FgHSzrjn8uEMxup4xMbuPkNfqDusKLDcMtGP2rgH%2BHgj3iQDBJ0hA4BOQnWVb%2Bq6iOSEUQrBdnRjLZNdV5qymsERh6omeAt9kOM6WUpFFP2qnyVYCpm4gOb%2Bvm2myKsI6OjbyAAh3sHEj7tthw5PgdSq5kT4ebr0QFeXTm5FaCvM%2FwA1SF9gn%2FHz6JBAWV2qg6pfhK16KVfUB6ENqk7VPe3Q1fPvEOT2cRJiPO%2Ftl9cHOVxGpFUJm7N6JAF8KTHl7AnzMbm7uNsepqsaMtpuL5f9ZfJgrX9bq%2Be06yNDdc7q%2BqEIEGia%2FsQyWNsnQKJ%2B2nxj914VEz02WzGDKdlpj7E%2FqBMP%2FT%2BvzkpCFzSjSq1AyRhQcEWDg7vaGgQIDLPQwILpDC56E4hOw493NgCgEsrEVoD9rXCx%2FpUpBEtVvInO4CMr6d7js8qM4wrBgVkJF0UZeRb1EyXqSM5yJd6WNEC1ceceIy8M652YQ3tB3dc3Z%2B5AEcR4pGBucomlo%2BX5edJG4lmaMKbFiM0GOqUBwRSMrVrAMtfky17KyS4yu8llJXG4T2Umkl0O%2BwFOXmVaZMQtbAexJhwtSHk0yIkR%2B91qRHNd%2B35IBk2qRbl4EgBzHSvgsCRxfRg8yoDQjvYDfKk3K9VdQiBQ0ojedmJH6fii3zlQXe2ggm0Txr%2F%2Fs2HClCXY1VVRYdGhRLRZW0rC3ZnnZ4QGc5kPUjabNeIQui5cSkSCNZhJld1eUHGE5e%2FlSHu7&X-Amz-Signature=06647cf8bca6779303a8b882702dbc04d8602208422d613baf94103a5fb3d76a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKYEOTQX%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIE109T1IoO8qWlyNozMGIpH%2F4LvqWOJ%2FiAzTS%2F7SE0wuAiEAzYgfx9OukqSRM11OMHehRIPMXqqm3cp7eoXwZwcR%2FPYq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDJuX2h9GTkOfBiqXGyrcA7iQblw1DKneQWXqweJhzHUqoa2Ooj5KVy%2F5oCF3XY%2Fj1Jv6iX9A2EETp5%2Blkl2ZcxPb7EDqHVPABAfZ3F4dKpPwaVbEOsOAEqSbmDI3nh5mfl%2F%2F%2FGbaRSyZsW3Z8AhP1XNTUcgDnjtjSj%2FqtlofwiT%2BYgGS7V6Ts1nn%2FGQHXNhnKeKn2u4YPEnk73qSNtgqFSY98ValGRyw%2Ft8SCGOCFtPlo1cVc1BGfb1jNDMr7IZFfvHs%2FITZJqXbjXsgpssU88rhUSBBgH1k9zAGG9ipMsH9ECmIKLseDxkXchAdzX044fdYzeJqAXapuij8lBgNZUOp2Z4%2BD6Jb7vzToqivfiwJPkbBppAitiZg%2FwUwWuWyqZMm1JiH7zJbBqliRHHp8IP8CUi0Btk4vTWJ508BJMj%2FemlIfmrcfZt3HeoI%2B5cIaFsfx5GFpenmIbQeT3msmQRfw7MUJQAt%2BJsokYnslc%2FET%2BOkxAousYL7Jgj8gq5UOsMjre3G4BvbTfcVI8tDT5h7a9MYdw8Iso%2FiIHHttGtGGurOH0GvRZ5dHHJE6tYjOqBxt5iB2v3nexTT9q474BUW%2BQl5tSVnklnPPyBszWLJyCFmyRP0guGAMyfZ9LlYMOT7x7ShCPQa%2FHgXMP%2FEiM0GOqUBreU%2FFtdP1L%2FuobEAT6qZN0liosCbNpHY5n1yE3wX%2FaQguKBZ9xgj%2FhZZjOHGcjHVMrl%2FFcRa5m1tWDCYsuFrhObmzOZRTy0%2BNJdZe28RZwEfOQVLr6PK01k%2BcOpB%2BBvdbT%2FFDD2jPTRn2x2ovHvxar%2F%2F50itBNPOq3e7hPrxYUjMsm%2FXEmfIJs4%2BtcA3czNXlnMJMFgltKTG%2FEEXovlPIZVCstoy&X-Amz-Signature=16b9476563f9fe0a6c326883b0924341a9170cfba4ca02399000a0286f7f23de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMM2GDPE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIHTOxHKIh4qtmTM6zbBIJYdsPqHEab4oofHjTNhycMiSAiEAg%2BW85kF%2BKqyGvClY2suPwT3i%2F1GVaaCdLZdnw6EUgO4q%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDIisspYMPyWV8cjyQCrcA2xChpqP92%2B40xPmvJ3vcGT7PFEGkL6HTbYrOiW%2FBDpOvHvs%2BAnKFjsLk%2BCls%2B3U4Yay66PgYso1Re2lyGw8Bgyem6gFrW9sW7G5jsOm0ofTY9OdFVklcnEsuyM5RKvD8h0o9ncMVZ1LFzSWsauz8bvBg9F4n51n%2BlDxFD6U%2FV4LbqEems17NcuwSONaV2GdQa6npb8U6W4%2FEvTfQCFmMI0wF%2BsDjOnHCAJAcqG4WPZNi63AUeT1y4Cui4xIaqMytv3K0JgGeir59VSpnzsuNpNm%2ByAAEJh%2BbpicKIJOPWAfwpXNhq%2BEYRGihAo9GTy%2BA6yrSTNW75rWPPlQvYvl5DXjdgNu2mQCzkzB%2BA3mseZSjhOLMaVIraTdSzChgfnAe8TLzJDGPhw3fl83Mw7Ntwhc7kuonP%2Fy1UKmi2mzKmTUg%2B6YAm2aOb8lpNS%2Ff2Hx44UaifLjwvYsgBoSs%2B0Z2k4angS3tNw5SoF5%2F2kpzgvGMzQ6CTIPDaKohFEEoThqCyoSNsdaIecT7wpFrEeck3xM62csK2MsxchkjGo7BHhJTL718C2V0zlEAEfaFdXwIDPPQjf1mn00k0SamVm4rhIw%2FYnqLW42L1MxzWAvGwkk%2BOIedXToEG%2FVJX3QMJPGiM0GOqUB1vnXaKwrIabYsRC%2F%2B8fllgMq7RKN2cnOoi2GVwkFPfrL2N8aAx1gAswsmPjbGc5RylhUzmAicC7azJq0NvatOI5OK%2BGxOwAaOAxHjUeFJ0EarMNbPKMwIfEO%2FnHAnf1%2FLR17UP6Ff%2BEA9Grt1Bmnhm24L9RWfq12WbcMG4UEzlA21WGIl%2Bdf0VpKptCXrlqZSCt3TCidZndOP2z%2FiCYZOY42wTm%2B&X-Amz-Signature=bbc4868bf46f11d724352be21b607e2c1f2f8c30ceb2a0c8ccbde41490ec2d9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655TYWSXC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIFywMaX6g%2BefCsEYPc2UL4XgiZ0gzwX2R9g7jiOLSvvcAiEA9Xmn1SbDkEdUtPlGfkGFPJDksw5OuTYNnIq9kPi6Wckq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDKq3sqG8X5EFnKdYYircA2BQ1GdiXLAGfJnv5CYCxL598a3XjLKVqhCK1%2FhIpiywearz%2Fo29qPxrAIveeDI7bEXwq9qfMoLqGaEWf%2FS2zZ9T3h54SqrojQ1F0AapSa05xJGryg2xym17yZfZQFIbAvWUuaXtOwCHnldckpP1hdEZ3kyIMjzMV0LlRcqacSXuPtwF5hYZw%2FD8R7s%2B5iwnVQc3ff6jL%2FjezgzpaFBL%2FDGKzk%2Bmj0r4TqPszPQQpDY5SKoWeHbhD2XUZ5ePQmewcYpGNKZWKDSwG4AKdJeOs2c5wbZ35lxbk64DxTN6uAJvXZ5i2sWtMQmYu43bZtYwR0Mr5iJ4dAxjiJLScIstsrVBBVy5e4NyxqVp94eIa4pU2Y%2FGQbGFugkkUdUu%2FhN4wxFCvRJzKpT%2FkSDp3XpuXzud%2FFa7H3zmwLFirzGAzLst%2FkChmmX9BdlgWgsi2DPgEdAWS4LsOAUs80xNBhnosjBUawdNaVSOkq8aJ70Bqjua5kL2nFPwm5rT1lU4Y6V9KUtC%2BX%2FQ1A7Zq7%2FNuEa7tZK0btDiNfyfs7OQQ9KulU%2F%2FWV2KR5UtHTQGMu2AVUC6Y4vpZkQ1suqtdr8%2BaV1XM9NKFW%2FIEflKBUu49J6A0N0MJEOk%2FteTgXrdy25NMJ3GiM0GOqUBFqwv5CPHVSbMa191Jz0g5608N1jRkblAMvcILEmurxnS1ks4dN%2BTV52r6KDXSI%2FhS32TX7QoTr7BZeq9bsw%2F%2BoEk9g2eiy1YJvaix1VtXs4%2Ba4tZf2IZAcXqraC87s2qOpHs8u%2BTlRwoUOP5IOMPj9bHbUJBEySILoejGv9yNMTe%2BUIj6lFV%2FDSBDKwwc5dYRv7jdajZJziw7oZaa3ZRvASPqMOM&X-Amz-Signature=eb2595ec90bd69e32b501f5e7fd5e581d8da0e34f0157dabd9b9b03ea990e5e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655TYWSXC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIFywMaX6g%2BefCsEYPc2UL4XgiZ0gzwX2R9g7jiOLSvvcAiEA9Xmn1SbDkEdUtPlGfkGFPJDksw5OuTYNnIq9kPi6Wckq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDKq3sqG8X5EFnKdYYircA2BQ1GdiXLAGfJnv5CYCxL598a3XjLKVqhCK1%2FhIpiywearz%2Fo29qPxrAIveeDI7bEXwq9qfMoLqGaEWf%2FS2zZ9T3h54SqrojQ1F0AapSa05xJGryg2xym17yZfZQFIbAvWUuaXtOwCHnldckpP1hdEZ3kyIMjzMV0LlRcqacSXuPtwF5hYZw%2FD8R7s%2B5iwnVQc3ff6jL%2FjezgzpaFBL%2FDGKzk%2Bmj0r4TqPszPQQpDY5SKoWeHbhD2XUZ5ePQmewcYpGNKZWKDSwG4AKdJeOs2c5wbZ35lxbk64DxTN6uAJvXZ5i2sWtMQmYu43bZtYwR0Mr5iJ4dAxjiJLScIstsrVBBVy5e4NyxqVp94eIa4pU2Y%2FGQbGFugkkUdUu%2FhN4wxFCvRJzKpT%2FkSDp3XpuXzud%2FFa7H3zmwLFirzGAzLst%2FkChmmX9BdlgWgsi2DPgEdAWS4LsOAUs80xNBhnosjBUawdNaVSOkq8aJ70Bqjua5kL2nFPwm5rT1lU4Y6V9KUtC%2BX%2FQ1A7Zq7%2FNuEa7tZK0btDiNfyfs7OQQ9KulU%2F%2FWV2KR5UtHTQGMu2AVUC6Y4vpZkQ1suqtdr8%2BaV1XM9NKFW%2FIEflKBUu49J6A0N0MJEOk%2FteTgXrdy25NMJ3GiM0GOqUBFqwv5CPHVSbMa191Jz0g5608N1jRkblAMvcILEmurxnS1ks4dN%2BTV52r6KDXSI%2FhS32TX7QoTr7BZeq9bsw%2F%2BoEk9g2eiy1YJvaix1VtXs4%2Ba4tZf2IZAcXqraC87s2qOpHs8u%2BTlRwoUOP5IOMPj9bHbUJBEySILoejGv9yNMTe%2BUIj6lFV%2FDSBDKwwc5dYRv7jdajZJziw7oZaa3ZRvASPqMOM&X-Amz-Signature=02236d776ffd939e0d7c89fdd74f514909da61f37fe0579198a5e9d2db3203dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666COCV57A%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIH57gSyX0w1QC6kk7stMkK6WeDY%2BIwmSEepqqcpO30uIAiBBhLJ8O86Xa5Q%2BshGMRnx5%2Bzj4Gk%2Bv2rUUQRl11RLMEir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM2F9yhMCE8UArLP%2BkKtwD9PCxrPK9d2DfeexNDoFMfX7UUuH%2FBwgBCg1XR6Hy3Yrwmb%2FeKT3LfdxuFh21B7STfFEjRfWxDdd%2FIxktZJa2mSyTQfJVbR77iLuUNvcvi4v63rjNw9Utig6zPuKLbK5Iz8OvqGpmY764sfIVsNCtqAJJ5DVPkz%2FeSupo9Pc5GiAWkWkMjGtkw4VpNm%2Bh3KWo8ZkODn41ee5vXdC9lfJjLMafH6It3loOro%2FkuImbYjKo8Odl8F6nwbFwV6E69djPV2Lrn2F75QKW31JzoKvZbIaNjHIlujyGBvPlmGEnkNpYyWKJ0O2uE5iwNQyw2RbbGgPiTciEvCs7WZWkb9C4pgikPmciVVcOvEXbV4xg0QpmyVlCEcINYcwmispoFBjFvnJfhEkxmV4qiROOYPvoczndDgtjWYaro6YMVFtOsD0DCCZ7jG4pF%2Fm00PwlhyafodyL0dWZW56Dg5spqUJw0x1Z2sObeaVc%2Bt29TNJqKS3yKhVv%2FyFCRlhSqb7VfaPYa%2FE24mDyc2BcEvFnw4m64W7cloVnJsBuny0DLl1Vgqe6QtpspS9QhvcVsapNRU17vFTPX%2Bmqw25hUz1wOu9c9WenZuQvWgmdPbfxKUvk%2FZYrvKsqhOkEaje%2FvS8ws8WIzQY6pgGK3pKR6qVjI5DQ5PbuussJXAjK6DwyfB07vgnNPJKDy0UZMhZIu0UA%2F0krQQje1xXlma73Cnqq1qMcrkGZQav9DJ8mEWKjr8ZcFPWyk%2BYeBBpAzVcU4lWe3v%2Fkos38XXOkNwFu0oSjRhZ8kksioy4HdFEPIo0X4F3UdMixfzmcnXzit5iwLAuuFs%2BvFZ7UG%2FwNuUh1n0ckjwDkYIH5js7kYkFl9acj&X-Amz-Signature=4a2cfee83294f423db7061c142271b1b272d5a71cfc02bcefa643a19eec43ee4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3H2XUF7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQC%2B13okOJjn1ZAgKKibuGXaXXxP4uHtJDykE8sy17vSsQIhALJfq8ICax5oHy5AtT%2BRXM23FTlMZtjvgNU02dYxTAMiKv8DCEgQABoMNjM3NDIzMTgzODA1IgwwBdmgjsRskByFg%2FQq3AP7WQ3YJ8JN%2FgSlUScfmL4ggtiUMx9hjGUV4QDry%2FPkubU1RkqQ%2B7SN2XEEJhI6d2ESXL4II2zAVa%2F1lNICGZM7sgvYvO%2Bj6iUpUufgaLwgG8TFyyPojhXBsSc9VFfA%2Bh6jkzZ3Jhd9F%2B0wZCTmKgvbbRERUf9kIj8BKXcUb0fJHzM4mLzV3A5eyc2Ku7o35PlqCRvj9DeaVX3s9xRvr6TDyfmBZaJPbMUS7TJDxBM6YBGCI2LjQjddq1%2BNGsqqSxhc8VEuEs9pzpMhuJHncnvAxFFxYdVAYmxcCWoJaPZ4sSQC07TaTXUXEGOxXHGOaNq%2BqwUBWJJNGaByQpmPMK%2By1E%2BNrr66Am1McTxU0dhwpepSMVP%2FmfgGx7X4%2FIqSugj0FzjIpbijqu5rYdVx3S0%2FkxO0XAKQ7A58xRWT700Um1lLcgefsF63zD1qenBhjvfrx4XDuGW%2Bqbb3KcZrXyXIaKauNm6XyH1jw%2FT9OE%2B99SPIvi3w%2BMql9akecaxhSJFaSKdi0THktfqXw%2FyGMpIRBO%2BhFBuqMEdhGE261Oa8XhxwIv9%2B9pxJBZeKdV%2BwaXxGA4um%2Bc2EQXfWvyC1d9bZVTEPLcPDRkRwUQpU8gCtLzAAekwmbk3GuxirnDDfxYjNBjqkAewlRG2sFXxT7Tx%2FppaXENe00U9P6GTWjIr9CNROPhfObK2M7I4GrqFIMPw2jakWw8nUg0BY7JWGCbHEp0mEieQGPp%2FgPLwoGk%2F9dm56la40LuWFyniZCJJ5p24CyX%2Fw8rejDzvl5TLTDXE73IgYBAXKfJ82QOvWrTH6iBW3rbS8%2FhM9bUVA6nzm%2B4AHHJ8%2Fpl6WaL0EaRPAbP9Ln%2FVvdVVV4Sos&X-Amz-Signature=4dad9dc5617fc862ddc4ca87a8137f7a139e7bba66a3bd885eda4039d3355e8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3H2XUF7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQC%2B13okOJjn1ZAgKKibuGXaXXxP4uHtJDykE8sy17vSsQIhALJfq8ICax5oHy5AtT%2BRXM23FTlMZtjvgNU02dYxTAMiKv8DCEgQABoMNjM3NDIzMTgzODA1IgwwBdmgjsRskByFg%2FQq3AP7WQ3YJ8JN%2FgSlUScfmL4ggtiUMx9hjGUV4QDry%2FPkubU1RkqQ%2B7SN2XEEJhI6d2ESXL4II2zAVa%2F1lNICGZM7sgvYvO%2Bj6iUpUufgaLwgG8TFyyPojhXBsSc9VFfA%2Bh6jkzZ3Jhd9F%2B0wZCTmKgvbbRERUf9kIj8BKXcUb0fJHzM4mLzV3A5eyc2Ku7o35PlqCRvj9DeaVX3s9xRvr6TDyfmBZaJPbMUS7TJDxBM6YBGCI2LjQjddq1%2BNGsqqSxhc8VEuEs9pzpMhuJHncnvAxFFxYdVAYmxcCWoJaPZ4sSQC07TaTXUXEGOxXHGOaNq%2BqwUBWJJNGaByQpmPMK%2By1E%2BNrr66Am1McTxU0dhwpepSMVP%2FmfgGx7X4%2FIqSugj0FzjIpbijqu5rYdVx3S0%2FkxO0XAKQ7A58xRWT700Um1lLcgefsF63zD1qenBhjvfrx4XDuGW%2Bqbb3KcZrXyXIaKauNm6XyH1jw%2FT9OE%2B99SPIvi3w%2BMql9akecaxhSJFaSKdi0THktfqXw%2FyGMpIRBO%2BhFBuqMEdhGE261Oa8XhxwIv9%2B9pxJBZeKdV%2BwaXxGA4um%2Bc2EQXfWvyC1d9bZVTEPLcPDRkRwUQpU8gCtLzAAekwmbk3GuxirnDDfxYjNBjqkAewlRG2sFXxT7Tx%2FppaXENe00U9P6GTWjIr9CNROPhfObK2M7I4GrqFIMPw2jakWw8nUg0BY7JWGCbHEp0mEieQGPp%2FgPLwoGk%2F9dm56la40LuWFyniZCJJ5p24CyX%2Fw8rejDzvl5TLTDXE73IgYBAXKfJ82QOvWrTH6iBW3rbS8%2FhM9bUVA6nzm%2B4AHHJ8%2Fpl6WaL0EaRPAbP9Ln%2FVvdVVV4Sos&X-Amz-Signature=4dad9dc5617fc862ddc4ca87a8137f7a139e7bba66a3bd885eda4039d3355e8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKQJNIDC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T231247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIBkorc%2BQcNcKDbeDG3UeS19eGI6Nq7If%2FZzO9yKxc6j0AiEAmVYGVcZK258simHvLoZGy76j5DxrksdwdZwdSArFB5Yq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDA%2Bdu31gYY1SbyrfkyrcA5AMTcLkAIZYhtZ2ueB8aFioSm1pxUCdy7RaZAD6aKeDdE3hYe7pMJCpkp%2Fj8X3AhGIGEZF6%2F6UVbLn2UfIBtBSqM5VawXKytnWTTbEsRg1g7wYWoE7JYo7lpJog5koydLjQKOGpvfr2eh6gSS59xwVeD3kqBB9wN3Bc4iyNmLXemrjawdkWkapv0aBFFUPT8y%2FZyJ8uoD88pw3BK0PvdnFkGfsNf5jWGeYHzSFa4B3BgnzW3f2wdf9RKpl8rWMzkDZPtGHVvJaFDcr9LAIzkNO2jnOkqGE7USyPWceaEHI%2BwhtehrRmwrGIOyvC%2F9stmn0MygUEEltxdubESkCfBehHf7yUisDLVUPgRVXVjXqrjn0IwradcoRyojw6A8xmfJKj4jA%2BJIrjCGh6JUDq%2FxD6fMJlInmcIgVEVtA7L6OWIYfxdQGMzuOoXPicqYM4XoH7EnE4erEekG9fHaW0dRdJdJw86OLbqIKh%2BlhWBT5ugGRnG4KAPlIn5c4ggcWMNPgsV3jpkzj1sLcVxRQ0eNsSB%2BPyh66%2BjjdI5jyvaSSRoTfe6t910A0wJOxGkjJ6h%2FGGdetwPPatXZyyC8PphYioVH2JhTQFJv4T0SorXRnbplnRna%2FueGxW8Zp3MJbFiM0GOqUBrtVab9GlBkZasw%2Fu2cWu8%2FMXeiQmMHUHEDCYRCFUm%2BDGXbQVF5sUjJtioISVqUfgkpydQJO2De37OFX%2BSm1azOORyCOZcey4CuSvzUPx03HssB5f6%2F3eR0Y%2B2xlkfc20sdaqb8T9z1lucItNHG4RgIydnvO4YpUX0f25LavA%2B%2FNIpLANTqKCnECa%2BHBkeFtRHcG77s75rO3Pvek70SzhSGLfutIn&X-Amz-Signature=f3f3481deeb5544988219ec8cec5a3a730fd1573f32d77c5f5f5ec84050e7a4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

