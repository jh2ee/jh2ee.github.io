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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VKFN2LM%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCOWa%2Bie%2FZm9WgZsH6wk1FX7rqPFr2re0ztzJr1LLIiKgIhAKEEv7AGXmGFVemjKRm2OAlchOwIsbkAjmWyJ26U%2Fwk3Kv8DCCoQABoMNjM3NDIzMTgzODA1IgypqRYSOA47gVWbtPsq3APlSliwJPBfFQ5F08Eiesx0uBsUU1m4qjbl2J%2BCkmWoch4i7OuIwsgMeCeX%2BEIuIGzlMclZHeNf02fuCheLp4XS5ilXtZx7pB75D1WJehbjRc%2BY5PTVG277D3S9IXYYANtELFDU2cJMV%2F1AvdNALuKF4xBnlVULgNW%2F9roIZnsxoBRCxvkJNT4RYXB5JKNLhQS5mfH9izqkns%2Bwmzkdywvp7NcA%2FKd6WtPUW2HG%2BWiMih4KDjir2t8ANiTZckqtif7c4LyoSMDPwDlBSbhImvExx6dpcDn%2FilDetqKLuzWQfoFNGz1K0S4iXNSeWj1w7DRvdJoHCuRjlYtmovfR0AuhiIewXprnjwrtkNvYfQNR3D5Bb6HLMELe72gMryipV6kFetbKbSWG5wa5beO7XeGK6maOelpXU46kloZvcqeJtKG3oKR1c4Lg%2Ba2pd4x7K%2F2pM7cZlnfuIc11k3olcTWaAAR4hsjrHI19Zl%2BhcLqS9SIuaULvnJijykMpXgzQBdT0hZGgufUxIsIB3PMwRpOhDcGB5AXH5jNLPiZwVvXsMubNHq7SMduVAJERHtLJVuNRPHNZUjRQbjjqygbNMBQ8E1FQ9frCQrGKGbzryKG8IuUWYO2%2BvP4Xf9QuuDCFzOjKBjqkASXZ2ZYTKNFhbmA1d1PjZQKbRm9ihLs%2F3P134HSikoclTx4pC3I6fQZWNEVfCOa95lGRugsZkRNwWiw5lLoApczQo%2Bdf0AV4iEnVZA6oJnPrtCCDgde5kf5WQacpxdksJsNTS21a2pFyn4%2FSsdGP6bTKnyemWI5iQ77LpB%2B3w7y8h7AFiisIdZe9zYKThkaeSx22GOEf%2FuAahPHskCX6RvWrBUtw&X-Amz-Signature=5fbb6768f6625cd5ff8d8a023b4d92104aca20abe2b387f573dc01a5a03294b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VKFN2LM%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCOWa%2Bie%2FZm9WgZsH6wk1FX7rqPFr2re0ztzJr1LLIiKgIhAKEEv7AGXmGFVemjKRm2OAlchOwIsbkAjmWyJ26U%2Fwk3Kv8DCCoQABoMNjM3NDIzMTgzODA1IgypqRYSOA47gVWbtPsq3APlSliwJPBfFQ5F08Eiesx0uBsUU1m4qjbl2J%2BCkmWoch4i7OuIwsgMeCeX%2BEIuIGzlMclZHeNf02fuCheLp4XS5ilXtZx7pB75D1WJehbjRc%2BY5PTVG277D3S9IXYYANtELFDU2cJMV%2F1AvdNALuKF4xBnlVULgNW%2F9roIZnsxoBRCxvkJNT4RYXB5JKNLhQS5mfH9izqkns%2Bwmzkdywvp7NcA%2FKd6WtPUW2HG%2BWiMih4KDjir2t8ANiTZckqtif7c4LyoSMDPwDlBSbhImvExx6dpcDn%2FilDetqKLuzWQfoFNGz1K0S4iXNSeWj1w7DRvdJoHCuRjlYtmovfR0AuhiIewXprnjwrtkNvYfQNR3D5Bb6HLMELe72gMryipV6kFetbKbSWG5wa5beO7XeGK6maOelpXU46kloZvcqeJtKG3oKR1c4Lg%2Ba2pd4x7K%2F2pM7cZlnfuIc11k3olcTWaAAR4hsjrHI19Zl%2BhcLqS9SIuaULvnJijykMpXgzQBdT0hZGgufUxIsIB3PMwRpOhDcGB5AXH5jNLPiZwVvXsMubNHq7SMduVAJERHtLJVuNRPHNZUjRQbjjqygbNMBQ8E1FQ9frCQrGKGbzryKG8IuUWYO2%2BvP4Xf9QuuDCFzOjKBjqkASXZ2ZYTKNFhbmA1d1PjZQKbRm9ihLs%2F3P134HSikoclTx4pC3I6fQZWNEVfCOa95lGRugsZkRNwWiw5lLoApczQo%2Bdf0AV4iEnVZA6oJnPrtCCDgde5kf5WQacpxdksJsNTS21a2pFyn4%2FSsdGP6bTKnyemWI5iQ77LpB%2B3w7y8h7AFiisIdZe9zYKThkaeSx22GOEf%2FuAahPHskCX6RvWrBUtw&X-Amz-Signature=5fbb6768f6625cd5ff8d8a023b4d92104aca20abe2b387f573dc01a5a03294b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LWNW2YF%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIBHnfdUTWoeJnfZJ%2B%2Br9rqSrghsZm9xwiaDF1qMc4%2B4AAiAswVfrPo9BFnKmLuv%2FJi884NKuEB5diMvnFzy7YA947Sr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMirHIoW1FmL9XdaKRKtwDoYlRnX8QlFmBTZkCdIpzA5R79Hygwt20O95LI5U7U%2BcV%2BZ8fPW1UHsoDHuyhWC1Uj8jOIBaZD6aPcclKwJNW5D%2FnfQO%2FGU8dOnmOrg9VVCfZFfR%2FEnOfzkw0GYntI%2B1K0DqyVjZGV5C5shcukJP8zandtTKshokqhIii3fqmxwp1hIzKMNdAxYiTydakq17udYUj5U2l98OXOSNPqg348wRjkAA2cTb9Lg5eIBN1T800xawQqiNEjuOXIja1Kz4Wv4nZVAHBHan6g8wYPkjPVqSK%2FjqDzO26HcHRuh25rQ6RiedloS0nzHnQniLui2jqLfrdEVI52WgocjDn7CNfcNCiWpKmgITW18pTeX1GK9Rj8wk6gOSMqWlWtjFjcCT8vAasTI9y%2FE%2BdP24DCKVYYeJLuZc%2BvPPB5IQx2IYGeudltI0yr3fwtTZVFD%2Fd%2FDllJzJrYZr%2Bbik5WdIab%2FKEBPP3vTJjs86%2Bac7cw%2FHgdq3B51Tc7uILoxIWOJkvoEJgp6qNWdZyGAlOH9e7FtMGD6jQTRCxQwJamSCHvT8JUbnXFn2ID8jUENQct%2BbUoEerpWpTKNu0cIcpz56AGQ0HEvIJfsU08xZYym1J%2F%2FdgMpl5aiMcz2poAJ1YI7Iw4c7oygY6pgG07dK1Kg6eDwVQ2YXjpJfCjKB3mKCkNep9xHrbFUaMu7%2FJ1HV8pr3K16co0WTDHT032P9TTV66OYPWB4zyr%2FJUvV%2F8UWxt79bmev%2FFBs5xlVyXV2FIxWkKhwnwOHUFvL%2FEruNG42wh%2BljjNWlmyk50AFrMeJoITpVHZV6c1qO8NOyurydld4rph%2FHFHvytWmiNLEIc8hohAe9pQmWepScxb2N4FZo6&X-Amz-Signature=7b30cbf52b786c9dc3d821b224209834195c9cc40864ad46e7e2bfc6e019c5d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SRLMSOC%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCNjtShkVBoZ1z8ZDlFhF%2FnjH2pdN1E3c3VJshcuj%2FCpQIgONZ830IVD3oImEyLBxJSQ9ze1ldab%2FiSekr7FsyLQHAq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDI%2FJVf4zgrkPOIKnjircA%2FS%2BchOiz%2FbkvxLhFHbZx06UGtIL20NVTeFnSl%2FkkvQDLkhG6qhST0TPh4wJY9MqV4UiS5vyPNqQ8xE0z6Eojgmknm6%2B5ZrKKSdFo0vRJcZBRpABA8uf4QfgJ4z421FTr5W5faspQQgp8od6KzzocmsSEQRq9G3MY%2FAtuYaPzeGmbaAMwx93TBlyyTeRlZmb2g1xCFRodYJvwdCWlvlLjfRkeoEH6ZA5GZU%2FYtst1tR0kYF1ZsJvEBjwVEHsn0rLNq1zpsmyqF7lT59W0J2TMmWcLDlhyFT5a88zV6JWe1%2FvS7Wmn1lhnE%2FSSmYvau8UN%2F96gsXc53DlAA%2BnuyFDxYHpIle22dv%2BqnqjyFuMkDOa1HElGoU%2BoLafl8107gEuNVq03ux3i9CGdl57U0GB0m5WUN8miL%2FPUAVIV1bw%2Bb8WGrPgJMTuCE78WtmpXKkFRkG4CfKwNPwbMAcABOFOUus9ezxDA1wkGotg3g7YNj0kqyadWTI5CBUEbPXRSjBCVhBcSRZHVbi9ApEz7fvWVToqwdN83%2BsKCN0thADlBsmKSlhlY0N8teKIgrZuBoVkQVT3avXxWvh421IqkFfGR0yQouHZ6Z0U6xFJxEBtbFJUZAMNZbCUxWNZGWOBMJrH6MoGOqUBvUQU2KEem%2BTnUVpcHguyFVFhgOHKDMKfa8uZKKDPT8BvLQ0sJjxGesV89Le9ZP0N2ls7B%2BzMSavcm3BwmIJvBKgM6RF5BPS4cb%2FzwtE%2FvR4u1M%2F68Axzq0ssqunfySMK69x%2FPKqcuFwfItCn8BFsTfVJig43bOMP84TGOkpnBpCLZwK77Q5ao9XvOocQe5EDB29S2XRGiAuetyRLeUpKau0ZkSjO&X-Amz-Signature=380efa404b10dab4b1e92eba985ac4af0e02e1be119f0987bfd31f1d8d407e6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SRLMSOC%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQCNjtShkVBoZ1z8ZDlFhF%2FnjH2pdN1E3c3VJshcuj%2FCpQIgONZ830IVD3oImEyLBxJSQ9ze1ldab%2FiSekr7FsyLQHAq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDI%2FJVf4zgrkPOIKnjircA%2FS%2BchOiz%2FbkvxLhFHbZx06UGtIL20NVTeFnSl%2FkkvQDLkhG6qhST0TPh4wJY9MqV4UiS5vyPNqQ8xE0z6Eojgmknm6%2B5ZrKKSdFo0vRJcZBRpABA8uf4QfgJ4z421FTr5W5faspQQgp8od6KzzocmsSEQRq9G3MY%2FAtuYaPzeGmbaAMwx93TBlyyTeRlZmb2g1xCFRodYJvwdCWlvlLjfRkeoEH6ZA5GZU%2FYtst1tR0kYF1ZsJvEBjwVEHsn0rLNq1zpsmyqF7lT59W0J2TMmWcLDlhyFT5a88zV6JWe1%2FvS7Wmn1lhnE%2FSSmYvau8UN%2F96gsXc53DlAA%2BnuyFDxYHpIle22dv%2BqnqjyFuMkDOa1HElGoU%2BoLafl8107gEuNVq03ux3i9CGdl57U0GB0m5WUN8miL%2FPUAVIV1bw%2Bb8WGrPgJMTuCE78WtmpXKkFRkG4CfKwNPwbMAcABOFOUus9ezxDA1wkGotg3g7YNj0kqyadWTI5CBUEbPXRSjBCVhBcSRZHVbi9ApEz7fvWVToqwdN83%2BsKCN0thADlBsmKSlhlY0N8teKIgrZuBoVkQVT3avXxWvh421IqkFfGR0yQouHZ6Z0U6xFJxEBtbFJUZAMNZbCUxWNZGWOBMJrH6MoGOqUBvUQU2KEem%2BTnUVpcHguyFVFhgOHKDMKfa8uZKKDPT8BvLQ0sJjxGesV89Le9ZP0N2ls7B%2BzMSavcm3BwmIJvBKgM6RF5BPS4cb%2FzwtE%2FvR4u1M%2F68Axzq0ssqunfySMK69x%2FPKqcuFwfItCn8BFsTfVJig43bOMP84TGOkpnBpCLZwK77Q5ao9XvOocQe5EDB29S2XRGiAuetyRLeUpKau0ZkSjO&X-Amz-Signature=9d3eaabe5236ae592123e0d2f1081c25972aae541e3cbb4e1921cbbf75c33749&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662K7GHLS%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQDILGlURJJWXAjURjN2cJ5y5C9iM45Pnw6JhGF7hZuQTQIhAMvIbxy8qeKOPoZzcFjOdOE%2FD%2Fi9hF5j6TFUtHpY4rJWKv8DCCoQABoMNjM3NDIzMTgzODA1Igy70cZU6Nr%2Bj%2BPzvPkq3AOCzJaA3428KzeqPAEHfjZXXo4fYEG00ehnU2fjDEUPhbgNwaSW5iDFRia24UHiu2VZiG3qDa4J4Ruko3VLrBw6OswQonHpsXUkitQyA%2Bs5D5AoxElfTTSQ3yChBmFgDGi9qbUSpSbkd1Kru8pGeIh5sWfEsn8yKWONcN%2BR3sjupoqiXIvATdT0bZWSVjBvR5ruLi8lHDZWOB5FuC67xB4FjIcLKSzHc%2FvsRXDTRu9Ayw4cCIzbgSGEdOAkisRr5oeWLfqNMQz8FUnG19qC%2B5Ykmn3xX1gLxqJySbsXJKyGGnEP8dQu4zHeWupsdTqTMaFchdWriDIwS6QZsbGNwY5KR6NljRFUYdcvqY2Q2wrVT0BXA53bHGXNa1U1PIikRKH7L219Cu6OCl%2B71iA3N28aRRANrmiyNnIsaVi6RmpSxhYetI4VZKb%2BqK9YVANzSahvry9AA2aBS9%2BUQ7SLyWjUuxlFLCoCVdQrpBtc60xwdy1M6AD5abY6PbexmxKyGSmmVSiVMG174bJxMxiO29o3%2B%2FVlHHeyTpSxyyzGQ%2BT%2Fa4E1QMsugYIgBdE6B072GI8UlXZI0xctBWTRAexMgt%2B%2BVKUj9ueLxDA4yb%2F%2BEpwQCEhYGPJQMr6foF8IDjDpzOjKBjqkAV93VhKr135TCNoXGsP3VDSeQxAKiCFAqp0PPJtrGoj3c2rcyQeLdqYr2Bdr1lfAjsSlFR%2BhEVZhbupxCe0hn47s8psE3FjE9mOkZ%2Bso8h41czhoDXbMHysAvHpHiJ82MHQuSOs%2Bj4E2FaJf6vvb9T%2FK5XbdT911HTWOTbUxMbmwR%2Fed%2B6uCluIJgBvF7lCjoxRZb9LxhPuglhN6e%2FYRJOVHNa54&X-Amz-Signature=f5f31322aa8d053b197b0f03c06ff07077474401b410cda0309caea27d8bcdc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGSNH5IJ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQDWL8KLkUlCxKfk2dI1HSXdaKsW2V2Jtlw%2BPaAPGArcKwIhAKnOHJwOJVctNWv%2BwQuPHTktxjseKvw3CSl8hR7ofAfxKv8DCCoQABoMNjM3NDIzMTgzODA1Igzo0QpUyXl3W27500sq3AMxvZhREglqpFGpH%2BR551ESqLPkSAkIfvIHfEfakgRtk%2BMCmR7vsg5mLy4fbepFPRPNKUVCDZ4Urvyv3MVLfVmrhZPekolvvpJ0miVy2TwdVYesvneGdJTz3g4ZRNQI6Fry4ldWyiMCBQVBsIY2G2yMzG3Hw1Eh%2FNzG%2BztCsGLb7iwajGbCBXYZ05ouoid8%2BRarPLFgHNOoDI483sbg2yUN6oXaQFWux%2B0kgQtEw%2BtZJ1fNw8LG6Yb7o%2BpHsoVzMpJb9QhMrt4X3xHX2sQCqudx1A93SgH9GFYd2XiQlYvA2129D0OGNjltlBR8fhJdJwcgCB0rLSTV14w4cUVWlsTq05%2B8PSi79walHnfgxrbSU0XeA0xmZKNnX3LgO%2Fy894Qnd4oYeptJrS0F0kppbmvxXjmJFSbJARrCDhtFhmNdeUl8mkI44P2CmsHWf0rYDvpQ%2BU3Jf%2F6fO479uHZYLJ%2BrmA5UGg5zYxYMHkX%2F%2BKoPcjQpoKv%2F3FwwnYZ1aUWJ0xOnDm5fTQSmpQiL2CHaa1IH5B1bH6f%2BGg%2F6L%2F4uFT5wtN4KXRvt7e18i3RW0LprI4eoWGx2H%2FMokRLhwVjszcQq%2F4DYE5PMTD1ZQc4Pm7RCQVvgVGFHWzaBIjNW%2FDDI1%2BjKBjqkAc7Ts%2FllZ6FYlpYHnjkNFt%2BBWjYPfjWR5s2EtrhsBvvh6fh3fhBBK1cuh%2BU%2FZA1Vu7lX5FgpaMxyw24O4dIqa5gQi8COjPgvyPH6rHkr1jl1WRcRIzBWDddH8WJNHWOa95qeyR9djuXqUYsKYHjgdnF2l8EjRBO1BsxG5VWwGZMym9QJdbU8ancwmGGc2wa%2BYLyyXX6t8B49fdxkwWBBJe%2B9qFRj&X-Amz-Signature=71c45c46220e6227387111ad6ece4bfbb48b1aef30702127f96ae868ed2312db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644GNLUM6%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDpEmZjyuwg2m4Yk%2BdivWT1zQ4P1vr2OKiorijaX2J0XAIgPHUu2GbvuOlHzCpcxFqn2mlrvbK7LzAPXaX5D29StxIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDCr52sz%2BfwbFePT%2FGSrcA3LWJtx6XAFQ7Ab4DBcB9LAhmcWunPVkpaw7CIWXZapdPmgUhISBG10xSii8UnSeV%2BFXXJ23Xj3qvt8UK%2FujVEiFhEwb2Lcb3L1QAJ10XAhC9SSJsb0U%2BOKOeKXJKP7fhEZUGvWUDU9hq5eePipnEIQ0wHO5DijKWxwd%2FmAfzFH%2BvZVgMfkyOafE8rgQ1%2FuBHziAsTVngzTsOug%2FE%2B6BS4oXZYTmeCQAgI6hxqZh2q91H%2BKb0aRoWcvulWAb13Tbi9HfKuwSRD78q8KM0UuY93MxUmcmrhPGMCJ%2Bh45n9ZwtaUv2CtmzKuCHn62CLVNLPCCNxHYd9bTMk%2BnXFur3ZLukIenUEhat%2F9kj4%2FhfEjVTqNLUtOxhM1K8QRS4qG%2FjcR47TYuIQOz86L2vL8vCQjBNlA5cR4yNX3YcxepaCLLrdCTfjWZAaC3atwI4Yw6aB4sGBhu99pbVBpPnG02WgnSG9jt8fg7pja50vIW3XyzbvAR7yU2c%2BiEGZ9O5tbuGDltUM3N1LfWF8daMLImH9AIDzRZitEi2YM9kmfiBbV6INrsCkbpr13DmnHdSqmgLONy5Sn%2BMCrcGxjAV8hZdqCY1m%2F7cYjqvvocz4Ml215lkQBR1w9GfJa%2FMDZXJMI%2FN6MoGOqUBvNX99JmM7OB%2FzYtrihN3rnUmRdgtinxOSpg9gvOtWAkrpoUoTMiaqlBcSixfxt7HAcUR2FFjNRA%2F0puf68HwuHg7FLkjMPfq9t11uzEJD89FYCDkKuXsNP9SCRMJ3%2BrbffSG8japYYGIWy25VT1DbBF3cMupoQCeEhmA12F1ieHCg2F7%2Fj8EMxm8cUD%2FxeQ6QHcaGlnUOSz%2B%2FOtJLfQnKlfOEf4T&X-Amz-Signature=ce5a7e3def991cf3414a6e6e4ccc91cc9b1f7b4451d0bd6c6aea55838dc2cf3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P55B3MU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIC2WKkDLPdHvqy9KqJqIe2HX9K2wi6hFRf1B6J7nh1EhAiEAnHQDTtIePP8VXxL1Igy4F%2BTNy2aXLShBXf4HfLq%2F7Vgq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDG1EX212cD7kgyTG9SrcA3JEaGIgMmKrxroQNiE9rLegM9yeaHkCwL82l3AXN0L3J2q45WAga8h0VDex8wfCvE6qsUZFCkXfYDGCNDfjf2AwJWyN7ouG6xGrOCIjZvaHOvPecRDvG0GOPFb2PvNmeWThf9z01n5OIVujEuRHyEZ%2F5Fqqba3pfEXi%2FLuOQG%2BkTcDRIyNQvfJSd1cX6MHDcsOuQ2SvEQiM%2FugdfDr26c6%2Fb7TdJHPEZuaZZx9u%2F4724C1JVUQlaLjQIuBWlu5pr2ONSp%2FBUdL9hQlmSS5PfPB73SywITGL4OKsc70TWKqH4IxmR%2FqZChak5YvNPf%2BjApsW%2BDcE4AXJgBdyiizeXIeWcXHz9NjiaLkw95gcPxUfsruEByZeBUrGwo48cSYVGevy5AryKG0b685wbyWcpDKwXWY9MlsyaO1jZIurOqX2OtndNvmMNbEAt0vFrWIedhzjTlrNTTmm2xsdMYol6kU%2FRqaYU6oF8NOCh1SjzLif0LmmE06dsmroeq57BEStrcGqGnw6Q4lIcWoJCdYngE%2BtxaXTpJvStlvcWAYHCfthrxfRgL0clJOthZVXfO8VPc7n6oDxl6O4KDnMpGUs6TtB6MOGH2TOSiVryjl%2FrkKs9sr%2Bm7G0qbVMLVOuMPbG6MoGOqUBbdKdtUkn4%2Fb1OZf1vpbhaq7zEwTOC521QTylRnoQJLeVcSf%2FT8VIu58QC%2F0ftEVhkUXplCM8bD7AEPPkazegM%2B7Dhr8HoHogisCtNHGhVaM5XVF%2BwoI7E7xHVZMJWA%2BgX%2FTVLRdmLHXscKc%2F%2BrTgQYkbY5sKd5wA%2B5z7WuzvwJSJ4j%2FyPumMKyaaPOS1odPao9%2FgtGvWjJBOMKo4WWDk%2B9Vacd11&X-Amz-Signature=6daaf143f853932e28c245902c89153488d72057dc8b2a78da2277617809ddd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P55B3MU%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIC2WKkDLPdHvqy9KqJqIe2HX9K2wi6hFRf1B6J7nh1EhAiEAnHQDTtIePP8VXxL1Igy4F%2BTNy2aXLShBXf4HfLq%2F7Vgq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDG1EX212cD7kgyTG9SrcA3JEaGIgMmKrxroQNiE9rLegM9yeaHkCwL82l3AXN0L3J2q45WAga8h0VDex8wfCvE6qsUZFCkXfYDGCNDfjf2AwJWyN7ouG6xGrOCIjZvaHOvPecRDvG0GOPFb2PvNmeWThf9z01n5OIVujEuRHyEZ%2F5Fqqba3pfEXi%2FLuOQG%2BkTcDRIyNQvfJSd1cX6MHDcsOuQ2SvEQiM%2FugdfDr26c6%2Fb7TdJHPEZuaZZx9u%2F4724C1JVUQlaLjQIuBWlu5pr2ONSp%2FBUdL9hQlmSS5PfPB73SywITGL4OKsc70TWKqH4IxmR%2FqZChak5YvNPf%2BjApsW%2BDcE4AXJgBdyiizeXIeWcXHz9NjiaLkw95gcPxUfsruEByZeBUrGwo48cSYVGevy5AryKG0b685wbyWcpDKwXWY9MlsyaO1jZIurOqX2OtndNvmMNbEAt0vFrWIedhzjTlrNTTmm2xsdMYol6kU%2FRqaYU6oF8NOCh1SjzLif0LmmE06dsmroeq57BEStrcGqGnw6Q4lIcWoJCdYngE%2BtxaXTpJvStlvcWAYHCfthrxfRgL0clJOthZVXfO8VPc7n6oDxl6O4KDnMpGUs6TtB6MOGH2TOSiVryjl%2FrkKs9sr%2Bm7G0qbVMLVOuMPbG6MoGOqUBbdKdtUkn4%2Fb1OZf1vpbhaq7zEwTOC521QTylRnoQJLeVcSf%2FT8VIu58QC%2F0ftEVhkUXplCM8bD7AEPPkazegM%2B7Dhr8HoHogisCtNHGhVaM5XVF%2BwoI7E7xHVZMJWA%2BgX%2FTVLRdmLHXscKc%2F%2BrTgQYkbY5sKd5wA%2B5z7WuzvwJSJ4j%2FyPumMKyaaPOS1odPao9%2FgtGvWjJBOMKo4WWDk%2B9Vacd11&X-Amz-Signature=e33609800506954bf0889b16bd0a70972d814ce30b5aede9a76e896e8d7f1f0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OPUJDCC%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIDl7VR%2Fq3z%2BF%2BrtQdYWcnp%2FNIsyuqlNE%2FxZbdDXiW08BAiAtfj5wnMkjZUO30BlOHuSZYCpqxUqfK9xex9%2BoZVGQjir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMvbgy5%2FWUGYcmliw2KtwDQkMM1K%2FYrtMZW%2BoQc0IIytolwivQg8D9kivAZ1dU%2FyBD5Do4flDeouXLEE%2FZSQpCKuc7oAoAS1g7hIjP4p1K24RegpEs6y58AhOwjms9Fi1VBrL%2BiSfFiKuf5Rk9HiYlMZbacvJrfSKM4X3mRTCPVCH8UleOmbWkfxsXNBPG1uhHtsZFCWCp2JOh5pNIlLtXwzCBODY6omXm6IiQiQg%2Brv4ZfE4eeQRFSMMvis4AWvgvHW966%2FY%2FXtXb%2Bm1bbOiU25kNXpgaWOxQW%2Btz3ljtr9ZxY6HQH78XskrwVbfG9hqPfcMdTIDlUKFoaVMbCt8IAC1Afu5X%2Frt0Vgq4P0itbbGiYANyj%2B7tFnavfjeKKwdinrOoTZyaaPQYemgYieqbgpSJo1mbBlG8S08dfhvXsw8LBP75RVWtsdkoYIkmicGD77UGHfx9oSFlRtUKBoSn3UoIi%2B%2Bea0Jt2A36UzcfLH8cRmSL6iHkE2YIiNuEJ3swT14Zudxvp9bgnT1pcBWESjNUaVtUHagki%2Fpt7%2BohLXu3k3RamGjedQJ%2BTqYaLKWjllnGTmN70l36KR0CrPaYRgYxDC03wubvN8zNM0bcdGXtYl9IsQmMSBnH%2F%2BaVY8GSmSGu87n0k6PF4JIw8czoygY6pgEUkDcng4UQm48Xx1SDIrhkoIEFfiqWRNoCilBVsf%2F5eR625hIA2rgeiAVCsu1L28EZ8th6uH6p%2Bt7HNN%2BA60Dnh0QBBfYkUWvtbfZl5oa4e%2Bs2T8TT%2FyOfCUCBD844XNljLDr2yaZ%2B21%2BYI7Mt15qAiGf6EM59xonfPrBJ1OulF4lTtUFPstdHW6u8Av8qu0z635SQyA5etZ3bM7zdSt2yVH5LEkMK&X-Amz-Signature=8198decc4f8288c5260198668585b8d131f079921aca501d55891a23d1cf6311&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HXUIPTK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDe%2FuZsS3IkDQTinFoKlcRWIRsasrMINa0D4NqayGPpkwIgPXp4LyIprmR93O9y3BwfqG2%2BXG%2F6%2FWrEpcgDlqyp1W4q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDIGWq2sqJzdQ3ZhRHCrcA8E9wTDyBkMN1gE2pBWLPPNXJGVw5T9%2BJLCV8HeCIxwPQ8t2QGB%2F28oD0Fmf4A9El3XS%2Br6pbxogSC%2F07Gexizg4B6ChrGfkxSWfuV1HpoU%2FvDiqxrNSAfgHp1jtfP4HsAIVADN03tBvubbTQfvP1ul1a87sfOTXuYnIVRBYtZemvbn1RpiYXYn%2FmJvofWRliXOxWcCIA2FQYlclNgdjPI9PsHRIdIJ5vI0Rh8lzXqG%2B2Hhdvcw8PWPZDY2pklHY9HqOdplhZc71%2FLN22gO2ZkofB8SlXYV7LUSKKhUiBD29BonqJEnvc7XvddemW28DTR9tlDrFv4smtqtmQhxY9If06h3%2F06EqVI777DKCPHXoASl32d2BKOl2YhncNoCcFuJkshFnYn%2FYalpn1LDCNTig1i1OBO3gcCwnF7Vaqfn4%2FYXr31wMDk%2BkObpYTjuo49QyKwComB1lNLTppNATh65kVa%2FgqFPdLOzdGVu6YLN8xYuoe4aXg%2FR4bRfxSNfCkTllVpXxyVH7T4CN%2F6yaLP1ZIhLl%2FqAC6SVGTyyt1bB2an8xutUEPxe0fp7HPZIlAaLA9RryxyGzjJZrjq%2Fl7r6NAXuelF0L542dcnrbVa2XS2zbVhCiHrXiEyB5MLPO6MoGOqUBk%2F0GWuiAL3ZahRI5F0k0uZSRLkpwSfeOfNMgbXhV7OegMfASZvYP6rF7xZwTY9PTkEI6x%2FaBKR%2FRHCTzGD1czAyAEnCuUTnx5Ud7sLL2dSh5E2Umg3rosrwttywp1nx4sn612D0UVwKvSQaDhf%2Fh4tLVqttWSfVC5Ou43yAXfQy9swwI1zFNHmBeNJBwOYjvJllZ5bJ3wLhtngbjfLjjNyV0KDYh&X-Amz-Signature=b43f644949b9dd0df9fe2596d740d0852acaafe42c4fcb14cc4f57d175a8da6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HXUIPTK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDe%2FuZsS3IkDQTinFoKlcRWIRsasrMINa0D4NqayGPpkwIgPXp4LyIprmR93O9y3BwfqG2%2BXG%2F6%2FWrEpcgDlqyp1W4q%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDIGWq2sqJzdQ3ZhRHCrcA8E9wTDyBkMN1gE2pBWLPPNXJGVw5T9%2BJLCV8HeCIxwPQ8t2QGB%2F28oD0Fmf4A9El3XS%2Br6pbxogSC%2F07Gexizg4B6ChrGfkxSWfuV1HpoU%2FvDiqxrNSAfgHp1jtfP4HsAIVADN03tBvubbTQfvP1ul1a87sfOTXuYnIVRBYtZemvbn1RpiYXYn%2FmJvofWRliXOxWcCIA2FQYlclNgdjPI9PsHRIdIJ5vI0Rh8lzXqG%2B2Hhdvcw8PWPZDY2pklHY9HqOdplhZc71%2FLN22gO2ZkofB8SlXYV7LUSKKhUiBD29BonqJEnvc7XvddemW28DTR9tlDrFv4smtqtmQhxY9If06h3%2F06EqVI777DKCPHXoASl32d2BKOl2YhncNoCcFuJkshFnYn%2FYalpn1LDCNTig1i1OBO3gcCwnF7Vaqfn4%2FYXr31wMDk%2BkObpYTjuo49QyKwComB1lNLTppNATh65kVa%2FgqFPdLOzdGVu6YLN8xYuoe4aXg%2FR4bRfxSNfCkTllVpXxyVH7T4CN%2F6yaLP1ZIhLl%2FqAC6SVGTyyt1bB2an8xutUEPxe0fp7HPZIlAaLA9RryxyGzjJZrjq%2Fl7r6NAXuelF0L542dcnrbVa2XS2zbVhCiHrXiEyB5MLPO6MoGOqUBk%2F0GWuiAL3ZahRI5F0k0uZSRLkpwSfeOfNMgbXhV7OegMfASZvYP6rF7xZwTY9PTkEI6x%2FaBKR%2FRHCTzGD1czAyAEnCuUTnx5Ud7sLL2dSh5E2Umg3rosrwttywp1nx4sn612D0UVwKvSQaDhf%2Fh4tLVqttWSfVC5Ou43yAXfQy9swwI1zFNHmBeNJBwOYjvJllZ5bJ3wLhtngbjfLjjNyV0KDYh&X-Amz-Signature=b43f644949b9dd0df9fe2596d740d0852acaafe42c4fcb14cc4f57d175a8da6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBUWPP4J%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIDx9HdAY9bfMO2TDrvBq7ZrPh6tuKVTI988%2FqSuitUG%2BAiEA7%2BhHMHqfriG35KNJQzCxAFVNhLTfjKSwszDxuigHpOEq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDG%2BAVANrl12%2BQXUY0ircA6p4OJ%2FbxRZ0rQfs1i5aqUtVDyi7YrQG7V2RVdLF77SJe6WgPKJwg83yxJuoF0lQpJ8MaLVkVRcKYcZtNAFQzy5k4JUsLeFSBFZ%2BvNIGcZCzkegWp7jiSTV1TeQLCNbLdG9U2Pfyve6tQ4ZtJ0rS%2BBYZKM7TNnyTALxQr%2BFbpia2LWxZ7df%2F2oCT%2F6lyv6%2FtwNUKs2qUmd5TqciB%2Fo5pQ35GHRloYLSkSxBOetMRc3uqZyBPdyV%2BRixGrSUrdt0%2Fd2ziBoVx24pf0F%2B52h8r%2B1HJWOqPQZfyujoFfCJO%2BRW0BGtY7SkFkDVW%2FyviM8WE63%2BlRcac6jl7MLKjtUapTgn10ayBpW9B3YiRhm0vegynS%2BP9wUN05%2Bw5%2FloI5IMtMx0560FQu%2F1weS80s7VA9SAZJLK1QVQ7VRN3yxffdDB5byjt40fGtF9fotonfkzX0Q5d5Sa3tj%2Bd%2FgfKw44w68pO7htfcpHbX4lw5L8jsSVUmwBHEWylNDz9uT9n95iJH6e4p6LofjgwjKmaC40WgU1O%2BMd75JuetYtAraD4eBW3EM8atJfmW%2FU7K3o67VQ8V9J%2BS5qIwsl0pEabOhHI8kBgcEGceikMOoN1CvCjkhcK2B8t2cRPSfevlBAQML7M6MoGOqUB%2F5YpT5ThzjGUALJv6IAH0Dp3TMWgUDtqhvK%2FYJP5hH1C%2B%2FuSh1Cf6uXNz9GzYMg9DoOWLVMo4rLcTY%2FM4vk962MuZ%2BwSyQQ7CdVKy7eEWAZreVdB%2B7anKFiu3ho8Nj%2B59ZcE7RwE5%2FaxnIeDnOpUSTwfNzhsm7acwce2yKhObZh%2FhORiNDOVYqlHr%2FQu8H3LhzdbiV2oFr7IZ5FQdeACHPZ%2FGf60&X-Amz-Signature=8c837b24bae68aace8a98c77a5d903d65b6d09e65541b34d94bf165a4059acf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

