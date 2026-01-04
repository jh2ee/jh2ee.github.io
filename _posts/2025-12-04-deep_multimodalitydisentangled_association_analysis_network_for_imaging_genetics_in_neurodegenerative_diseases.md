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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKH26M3S%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCICu1L0OZAOyn7fpt1iQG0XBvRkBt26lqPkbrzsf8Lxu%2FAiAXych019HTEaFVB0rkSErPBRXFoE3X%2FF2Y01JZZpghTyr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMvZtlwJit62Qk6DyvKtwDUSpz9AG%2FLHQNGbv83EtQDuAzx%2BBkvundZNJO4lP0hcxdXdyZJRNSlLS4jWIITUlcACA%2FqILRtrA%2B5tOYaSuX2q0fE01ZHypX902RfEh8%2F8swkvzkm6V4wbn0%2FebgyzNfEKBmlfd7s%2FqAdmeS2YPNnIN70Mn9B1lbF96fitf%2BBYBU%2BmHXAcoDvw6uxV09PkiJbJkoYBqwPOPytzlaOiBYAR%2BYyNkcR3jL%2FhJFVL%2F1AKhSPHvlJKk9RIblbdR9I%2BukwG%2BzJxI%2B1sqtcMEWpEJExZgNdNU3XBQ4e7XcXHM8szBTj2tPCd2Zz7vGrHUJw42gctCpzdypMHjhtlgAadgK84OjMhNuVBGU27uRpdrwOOSiWbyRwVd2ALDgL0QMUpQrooIHy%2B2TFygMuZcSF%2BK6FL0gO%2BPmAMj5Xdf7kSuwbeJ2%2FETRS%2F5%2FTm7NY9VcsmkJnnMWDyyFQqPrTM6eGEF2MUIrCEZtSBvk2sy%2FO%2FsJAENKhzhrprNXE9ywgs4V9nXgKyJDfjkZ2ZVH5odMY7ZdkeH10vx0zX5jQ%2FuIFCC95G2UeBJA0YpdGkyGJ7iBhxOvje4ibLf88FHU%2BxGj4dGA3yW6rUlFO6pdDf7%2FYpbSRT1H5tI2RHU3%2BdhQdEowvszoygY6pgGH1zmyHSZdZPlLyt9fl12B0YkwYU8zF3OhA37d6Ej3lHbiIEqQ6G6g%2BvOnmt5oAFRgsFotKE9bVQt63WI%2BzI99iEvq9sCWfjIsfVz45pu3LQN%2Bk1qpa8IlD40p6URKP%2BuQdY4w2zEenqQXe6npPSjG94AF0P43cQ%2BJP7GhRT7TZ%2FDXvgDHBqelJO2lGJplwEf5VBj0lZtmL%2F9dmUY8bVGBWu%2BqzXof&X-Amz-Signature=50532592089ff5f75f3be50ecd832c818fc08c7aaa5bc730bc0b43b6e21a8294&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKH26M3S%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCICu1L0OZAOyn7fpt1iQG0XBvRkBt26lqPkbrzsf8Lxu%2FAiAXych019HTEaFVB0rkSErPBRXFoE3X%2FF2Y01JZZpghTyr%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMvZtlwJit62Qk6DyvKtwDUSpz9AG%2FLHQNGbv83EtQDuAzx%2BBkvundZNJO4lP0hcxdXdyZJRNSlLS4jWIITUlcACA%2FqILRtrA%2B5tOYaSuX2q0fE01ZHypX902RfEh8%2F8swkvzkm6V4wbn0%2FebgyzNfEKBmlfd7s%2FqAdmeS2YPNnIN70Mn9B1lbF96fitf%2BBYBU%2BmHXAcoDvw6uxV09PkiJbJkoYBqwPOPytzlaOiBYAR%2BYyNkcR3jL%2FhJFVL%2F1AKhSPHvlJKk9RIblbdR9I%2BukwG%2BzJxI%2B1sqtcMEWpEJExZgNdNU3XBQ4e7XcXHM8szBTj2tPCd2Zz7vGrHUJw42gctCpzdypMHjhtlgAadgK84OjMhNuVBGU27uRpdrwOOSiWbyRwVd2ALDgL0QMUpQrooIHy%2B2TFygMuZcSF%2BK6FL0gO%2BPmAMj5Xdf7kSuwbeJ2%2FETRS%2F5%2FTm7NY9VcsmkJnnMWDyyFQqPrTM6eGEF2MUIrCEZtSBvk2sy%2FO%2FsJAENKhzhrprNXE9ywgs4V9nXgKyJDfjkZ2ZVH5odMY7ZdkeH10vx0zX5jQ%2FuIFCC95G2UeBJA0YpdGkyGJ7iBhxOvje4ibLf88FHU%2BxGj4dGA3yW6rUlFO6pdDf7%2FYpbSRT1H5tI2RHU3%2BdhQdEowvszoygY6pgGH1zmyHSZdZPlLyt9fl12B0YkwYU8zF3OhA37d6Ej3lHbiIEqQ6G6g%2BvOnmt5oAFRgsFotKE9bVQt63WI%2BzI99iEvq9sCWfjIsfVz45pu3LQN%2Bk1qpa8IlD40p6URKP%2BuQdY4w2zEenqQXe6npPSjG94AF0P43cQ%2BJP7GhRT7TZ%2FDXvgDHBqelJO2lGJplwEf5VBj0lZtmL%2F9dmUY8bVGBWu%2BqzXof&X-Amz-Signature=50532592089ff5f75f3be50ecd832c818fc08c7aaa5bc730bc0b43b6e21a8294&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663T42CENV%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIDWHnOJU%2BuY2Km0lCJXK%2FiCw9CcnXHEhQ9Kuqr003ThYAiEA%2BLjhb9qBvE1osb4Ki0OITQHqEpuCB%2FvCCO552fMXgxQq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDCxfrSlPGcAnt2G%2F9ircA8xxEf0cgOYAYNTiTKxswnfiAA8IfpgokadZcZm1NUoU4ijaQVPgajtHAebC%2F3eeIMG19xX%2BeJ0z35o7IzGK7HNl7TJmL%2BmvD1blsEgkvMoXjrd%2BnHtAjBXiUjy4cuIwQFPiZfom2P6ib0EWUM62DZlkwqyEuIzW4wAdLPI3%2FTsPp5HOyd2bzN9W3X5ziQchym34hrhrYv8k%2BCD1KR7apjHxn2iWfwLD%2FfpnTbssRJNo%2BAkH7SopWUUOR90n4hGWarYw2MXW5WEkp1tt7Q3c15tP6%2BtHV%2BnwKZ9YZOZMk%2BP5TdzB0nh5HzcAjGmF8ofhCfW%2B1SHnvJ5SVaotc8NDx7Nlr18i8X6VLwb%2B0zRmUUhuctvSr6wrAnUmJOQfkKtJLYaPDYwTkOOXoz7CaNJ3kZXJeGqYte%2BDd63TsoKVsVgslD6FwDKKhtZKd2Bqvm4wlLBodnIlklZtvOo8nnzWZ7X%2Fud2%2B3GhqMa2kG2h5rcY0B10aax%2BgiHroH8zz2uIENwzP4z2cLSYDVu%2BRDoEsgIb%2Ftk%2BdPmFZJI%2BfkT%2Bv1PsmER8b6WP2I2PQKvZ2zYiaPc4QLSC2KnlTzl3V1QxMwxbChxSIejsQjBFdHAzOWivcoPe080scb%2BMeuVeVMIzQ6MoGOqUBemzo5Gzi5iWQnkzt2UVPky%2FZmmg7PyDdVSZSnRHht1piKsykJ4ArzMJmHPx5qkvfskU1SdGk7KwxzcgP7KQ03A5FoD2a0hfRkTjfWTXFiRZ3S7we9QfoRN%2FrtfYJZarVvTgq9Qds4YBFJv5en%2Fw1SEqqWOZA%2BdTBnNv%2BfUhvWFDqdl%2BgUQ4ZJm%2FT7lBrISuAjIYoxqqqQpqZfqiOEl%2BigsPjhf8V&X-Amz-Signature=4a393b7aadca2fcfe55148efc052eb8ca7a697bd2dc836229ae2c328c5783f19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RC5ILOT%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIEyBLuRPjL2%2FlyjU5s5wsyRxoE0rGM%2Fq12r8x%2FDvvel7AiEAqmniRpJKpOWKBFzgO4NQN5AAgg2oQid6uqDpUZb6gO4q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDJCNYu7rzRAuqhMzNyrcA28LOmWVXB02hHuhKUHsMqDEctniL5eNMC%2FEncmLGhhLaio%2BXICec72e%2Bvq6UaUtkxFrL1dWk9kMwfbK%2FZImOc6PlmzzxsJp5jI5KNVOEbMFxg8OusZcNeT1sa9ti%2F0cVBNKeL0xEGGGyKOo%2BiAEHsRtDoZLEZjiZ3YXUphhi2IRClvY6T4KDy3wIG7ADOg%2By7V9IQa5WrOvvAr19RXUBhi2iwuqlOQIZubHRIryxsbeNjp1cEdm8QQU0Z6iUp3qD8B1TGUdfhhMHA8SV6NTN4yU1unJUic3E6auR1MKetFDEAeaGLKikFCyFJqbDwMOcxxd65%2BQOtmdSyp2hrTEKQ%2BuaZdNQwp14xDd2cLB5p1VPFwe2%2FYLE7WAL4LIXEH3fbZJp%2BuwEFtMG8CAVmd7MZJ55RCChrky7fVyCWrWheCyTMNEQbvG9BtNSBoS36OZdH66t1%2BHRyaRjzXKoJYuUi%2BUAvgHz3rQuu659f9Ufh8eAtVvqis0RnQTiLJrItNnAL1epi625Y1oWIRt2cogSvokG9cWn9ICtnkEtg1urJ7ARiFuDjfQUV4P9Y4vv5WsPNy982BOC%2FmQDvUGqmYuL%2F2lTUPKmplKzhkTfgdFN3x6GLMzXhCy1%2BkRqNHqMO6y58oGOqUBbL%2FEipUMfgKzu0gvBalFl1TnfBHyG8pElaGls%2BT8%2FR7u45j%2BHKDnQe0jO3LK2vl8NbmQHtYuTx%2FWBUm4cc7Ayf4jKASCW4jpAtap7Itln6J52eW%2F7MpLa9R%2BzYEOqakdc5LNc7JalWT0NUca3Pfa9kS56OWGOgrGQvy4Uo0QlYlIlj8XO8OS%2FjAOr%2BSo%2FEWISO2wPpDhlgnT6YC8xNekiDjAEQd5&X-Amz-Signature=8bf382ab6454ac7c344e38ee4015ec2d1a50c345e68986560873c40201b8f7aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RC5ILOT%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIEyBLuRPjL2%2FlyjU5s5wsyRxoE0rGM%2Fq12r8x%2FDvvel7AiEAqmniRpJKpOWKBFzgO4NQN5AAgg2oQid6uqDpUZb6gO4q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDJCNYu7rzRAuqhMzNyrcA28LOmWVXB02hHuhKUHsMqDEctniL5eNMC%2FEncmLGhhLaio%2BXICec72e%2Bvq6UaUtkxFrL1dWk9kMwfbK%2FZImOc6PlmzzxsJp5jI5KNVOEbMFxg8OusZcNeT1sa9ti%2F0cVBNKeL0xEGGGyKOo%2BiAEHsRtDoZLEZjiZ3YXUphhi2IRClvY6T4KDy3wIG7ADOg%2By7V9IQa5WrOvvAr19RXUBhi2iwuqlOQIZubHRIryxsbeNjp1cEdm8QQU0Z6iUp3qD8B1TGUdfhhMHA8SV6NTN4yU1unJUic3E6auR1MKetFDEAeaGLKikFCyFJqbDwMOcxxd65%2BQOtmdSyp2hrTEKQ%2BuaZdNQwp14xDd2cLB5p1VPFwe2%2FYLE7WAL4LIXEH3fbZJp%2BuwEFtMG8CAVmd7MZJ55RCChrky7fVyCWrWheCyTMNEQbvG9BtNSBoS36OZdH66t1%2BHRyaRjzXKoJYuUi%2BUAvgHz3rQuu659f9Ufh8eAtVvqis0RnQTiLJrItNnAL1epi625Y1oWIRt2cogSvokG9cWn9ICtnkEtg1urJ7ARiFuDjfQUV4P9Y4vv5WsPNy982BOC%2FmQDvUGqmYuL%2F2lTUPKmplKzhkTfgdFN3x6GLMzXhCy1%2BkRqNHqMO6y58oGOqUBbL%2FEipUMfgKzu0gvBalFl1TnfBHyG8pElaGls%2BT8%2FR7u45j%2BHKDnQe0jO3LK2vl8NbmQHtYuTx%2FWBUm4cc7Ayf4jKASCW4jpAtap7Itln6J52eW%2F7MpLa9R%2BzYEOqakdc5LNc7JalWT0NUca3Pfa9kS56OWGOgrGQvy4Uo0QlYlIlj8XO8OS%2FjAOr%2BSo%2FEWISO2wPpDhlgnT6YC8xNekiDjAEQd5&X-Amz-Signature=1e6d9cd84a578b72c45743bbb9e27a084c95c1ae88ffcd878207cae2f2672985&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SBFHXIN%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIAE%2BvNyZJNpH43NC5SEL%2FbWwbX%2BSrMNVS7KIXRyrbZL0AiEAyDqtdShxdweXE%2FzWrPCS%2FAd6DMICXVBXyKkU%2BDP%2FHmUq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDEsulBMODW04s%2F6yxyrcA14jePWc57iIAZ96%2BJoOonhlYkMdpWhvzNwFBkIvm2vinQsi3GMMHYo%2FDnlWHUafJFapxKdc1SzKMHHzIpZF%2BcDCsZ9VLD7IxacdAoU%2BpJJVdwzUhs4XnObdMFEw69acXQzNc6PCNCaw9OHsMf5Zb40UTyqnLivWqDzO%2Fl9K6SesBzDVGNe5nD8S5hsJHZarLMBDzZvLv0zJtSamB43RMe85eF3uNOHfhEaZnAqsaoyyNwR6RMVA6ncsXya7lwDHzOzYlVlv%2B2yfroYYJ%2BwHs5h%2F%2Fv0ZXVAcmB6R6kVYhXD5SnfQJLsxa5QtmfXefw8rwbTM3g70MknFnhx6DuTMGC%2Bc6kIHPUib5EBvdIQfm0afJVjn1%2Bztx9MZzJu1ze7wMDkWmKMaHDV9txbFnW68eveHyhBFPTPBgOoasFpZ88Pw3kUbyRA5%2Ft%2BbpRIFPyGbaEY5qoCC1GdBT%2FeMhYuEy8qN%2FvIY4TDZ3oRAcV4fn80mTruWAwwA%2BYjOSXpa5BXQSveS0ifalei0R7td8aTjoPMiPVaL%2B7%2Fc%2B%2BuERoXWHDkmKEVb6ajFaoCPmQ1aGQsCuMs8ZN52osdlo0JstNS0iFtkFa8tfEMtcUofUj3NRSCLuFxWAfWD7O0dq7D4MPWQ6MoGOqUBAnVfVL9jn%2B1DAsK9OKAvmzB%2BNqNDfrN3N%2BPngQJDw5DqPF%2FSMJroVJoUel4MqtoaavQbmusd6neC7v8QM5SzqqC6DBPvGHns6AvB5cGD5y9f2M%2FM2KXQAwwKFSuPiO%2BCTVXYYAZ9Ye3MWZMyIOrSuXoNyVtlq%2BAfePaqgUNA3KiFmnwhaxYmmVcXyUzAx42jK1ruJQe9WFzK%2BIc11%2BBUjn5xKsB0&X-Amz-Signature=b41847f03cf1c539ccdfc57676fc055e9229cfb30639d01581e610299e19c1a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7YNBQXZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCXnXX76dUMGGXuUeKRCDOPqj1enNeAOTtp8caxx6eMqwIgMQO0RRtJ24jBXz9nuk19K3lhL5ZPlLFUVHN00b2g%2FH4q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDA%2BgYngj5Sgw1h63cyrcA3IsBnIlm1NkWN%2B4AoP5gQobTaN2EvztZ2JGPk7IkD%2BtDZUtfPOKqQrAJqHp66ZTHh%2ByOkifWoCLHSlNsYoXAj4D5Hs%2FIx9PqUYxqRHz4H0hG6zPDwqo4IJCij7TsMmEm55Er4gzkc%2FQkjvuAFbWIEwXmepUt03N2LxbdurAGjVY%2F74S3nOf2cIYwhvng24NTfNm7Tc1J16957RkU8jlzDKZVXk1nQMkMQzSz2CaE0u4Exud6JlJKVnAdrNA1blC%2FoLDekYC8JElfhf%2FZnbUUX0H16l0%2BL1jrHkAYWpaC6Sg2xW8SzQjEBIJNY9lQcB%2Bx0Zusv5LK0LlYlC5aZC8QOgZxDlM4EPXHUlQIJLUhPcmZJbCcXdJT0L%2FhTBfKz0HYsWXPUYAc8y0ChnaJR97Q5RNpmmk0oTfHNOgya7qDPeWLn5QOqqA%2FWS2K2xlZocGfD74779dttmaWZwtfDfsYfW7lEUpwSOc7Jp43EqhK%2FTOB%2Fr%2BoOIp9hOAFbLs%2FdXnQwAuZEwDsxxRdHdJy2rqPuj8XALJwQr6Y%2BSYnIamEpaZEpo4iAMGOqSiXVXBVHpXXO3FLjHObrXjcgLORJwmCT4tXPpfRkZvRld49EhkLi1%2BGERebE7nZmOenpwyMMK258oGOqUB3%2FKm0VETa5gVPhjiv%2BLBNy1MkiurffEx5GJHBgW%2FAPEfgLnGdHd1x33E9dclSbjuixf6bN4lWTG5wfQPthgoRTh0hmkfrAg3tOKhGWz2FRen%2FhCxkZYb0scDefX2JQLvDPh94n%2FKFVnf%2FEZXl8%2F7sq4wyYi%2BP43s55jY34zu3lI27T9B6op33vbvuoYXJGxTZDQQxFlT1uDLNQaKQX2HWt%2B1s715&X-Amz-Signature=299cd5584c01123e9d2a82b45f897b4f5dbc4bd335f8626b3f298f2e2b2e2d52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BP6ZBI2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQDlCi0Qf8bLdOHnD6iQdeljIoHSDWB2SIB9cx91cfYYmwIhAJLMEcwPgr%2FFQd%2BtfZAZfp%2Frpy4uSIlXA39uoax6owCbKv8DCCkQABoMNjM3NDIzMTgzODA1IgwkN5fpn6bwNmx8fasq3APXO3IRAK1DbOxa5chmWaVBNDnyBGdj5vLVAhvx6Ys6c2avWulo0PyFCWFnRlYYLl5dbBWKNIgy9h46Pqv5KIQ8ldsKh8GmKbYNnSdkQc74d1P6US6PT5Q1ynV6meOo7NFU91dvJN88xrkF43m4MwLEA0ZOVIV6joFhAkFMVgPFM0cQNgjbBOL%2FhWSHC8ZlJAt7Zf5L9I5pfjmLYxWjhv3B8AMBB%2BXfn7qsdMfmVBDcGFlz5CV%2Bj4Aq4pVZV9H%2FXaJZzspl1Fgn706C9edESzGfz2o8S%2BLqPQpq5ECBMdsJk7PwBjEnC7FuR37Dr8j5bTCLWXqG0KYoN46JAph5QEahkHx5tV%2BW%2BypuWmyyeXBrx8IbER5iW8kdRL5DVdY7kMvu3Fgx2vU%2B0qgfFZpbmnoBhjoQNtwM4QtA4CdR8Ykt6SwGQu7lUMZxfIXIkZQXjNNP45YRmL9ZUWvIdWPXgZ%2F94A0unrWkO9%2Bs3C3VS%2FC96Cr5UcUnF34pncl%2BSrDgEBf7IDUKpm8zUIoxUxa8UVFpddWZQvPD7AO5EvtwRWCrvwwnkbatsZ%2FQp6DAlGSEw8iEd17vyfjQ1c%2FGLIusr%2FhNEqGf%2F2ho%2FRL8de0godCnoQFX4v6VS%2BstG2%2FuojCGxujKBjqkARuLvMfVOT4%2BZshj5rf7sAT2KkvKez6olIQPuEEesEyrwLylZq2OwGxkS8DyD7Aqv0JVmmPRsWD7k2RtyjeHyepqfPP%2Fk2ee%2FR14yLvmZG%2BOJV7nK4%2F%2FPjAZDXRv%2BcyGcchElgnmpKG3wdDoe%2BaSJ4azE7CGy93QG6nGUguZXma19MAaaS5D3MpB%2F3UNrtKNhyhbz9vrjcRjw1zgNTfRDmzaVrql&X-Amz-Signature=7eb06c3c57cfd64b5f3d93d2fa3e3e3545554d1befb096495428d7adc6a52dac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X54DTW7O%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIBT8c2nVHVJugieh2eq5%2FHpLdF0GhbQMEvs0e5aWuPMiAiAccADUe0x8kjotad7tnzT%2BiuPDjtNy86HvhhDMKvwc%2Fir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMaPslGTxovXe6DRqEKtwDAGxhSlubZMvAILC3zrX2E%2FXvR09VUos%2FpDeGisIsfggRcINZqEAHTjdLPWBfaR9HbCbtPz4sG9C9MmNksBEp%2FuBMvXfFu1JPW7%2F9%2FwjxeS2kUn3VuQsZubai%2Fk7oCvGqUxJS6N7OH9LhXlTuzNHdAHhHD1vY3L1HaSIZnmrQwlnodQZrQmeLUWUH1SXsMpiBv8svhAqZst71Ccgns6cy9qqJG2jcObQbwW7bNiKSJde9Ol2p5qgTXNsxbZ4cWwm0G%2B06mIfkvkYO1Q5N%2FVDGA8S3pVxMG6iutkz4AwuVbIAKRIFqB478b0t%2FC%2BdOeGqaHsSznyaTwTa%2B8H1dSuf2xaQD4XUSmpvAeBNEH6bBeL%2FCRwNzHwVj9Rnd1NimaDDDmZqEtXChVqwgJ1uGboogpsptBpROo%2FxSYMfqQdclR0cyFaqu0rJLAeLi2qfShFoqrdKhjyhmxdcBdloVohJR41XwSPSCmT3iilxHCYJ1uSvm3RhoMYLXf0O%2BHcmt%2BiaADN0oBKXjpWtgT%2F1iBFLzTbsBeZsspd6gDg6hAQztONw9zHhvxBA2NptlmoohQRnVhEQ17JeAmr0EDygiDk6Xh6pbcCDHEhQ1fpUagBIawGe2LAAwOGKkLsZvwzcwgcjoygY6pgHYeyIbP3cl5qdyybE8jI89P6QBpJXJiN06NJdBpq%2FQH3cDhJwQ1qAThoFQnNV3FwefixK1XHxUnu3sIpzGbytMQpJG0L0Qg8ZQuWI5C9EB0RHBXBqIhzf7yfoStoZPqv3i7y0jDG7hIBGJwlHFX72ttasPr8g2NC3zNu17raFKtHK9oBsX4mji6%2F4JZSMw%2FkusWmn%2BN6qoYgN%2BdkG5nQd%2FDqLR%2F3tR&X-Amz-Signature=f8a12968bf39289782ef9e26a20615d3914081042e8331efe32fb260f92281d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X54DTW7O%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJGMEQCIBT8c2nVHVJugieh2eq5%2FHpLdF0GhbQMEvs0e5aWuPMiAiAccADUe0x8kjotad7tnzT%2BiuPDjtNy86HvhhDMKvwc%2Fir%2FAwgqEAAaDDYzNzQyMzE4MzgwNSIMaPslGTxovXe6DRqEKtwDAGxhSlubZMvAILC3zrX2E%2FXvR09VUos%2FpDeGisIsfggRcINZqEAHTjdLPWBfaR9HbCbtPz4sG9C9MmNksBEp%2FuBMvXfFu1JPW7%2F9%2FwjxeS2kUn3VuQsZubai%2Fk7oCvGqUxJS6N7OH9LhXlTuzNHdAHhHD1vY3L1HaSIZnmrQwlnodQZrQmeLUWUH1SXsMpiBv8svhAqZst71Ccgns6cy9qqJG2jcObQbwW7bNiKSJde9Ol2p5qgTXNsxbZ4cWwm0G%2B06mIfkvkYO1Q5N%2FVDGA8S3pVxMG6iutkz4AwuVbIAKRIFqB478b0t%2FC%2BdOeGqaHsSznyaTwTa%2B8H1dSuf2xaQD4XUSmpvAeBNEH6bBeL%2FCRwNzHwVj9Rnd1NimaDDDmZqEtXChVqwgJ1uGboogpsptBpROo%2FxSYMfqQdclR0cyFaqu0rJLAeLi2qfShFoqrdKhjyhmxdcBdloVohJR41XwSPSCmT3iilxHCYJ1uSvm3RhoMYLXf0O%2BHcmt%2BiaADN0oBKXjpWtgT%2F1iBFLzTbsBeZsspd6gDg6hAQztONw9zHhvxBA2NptlmoohQRnVhEQ17JeAmr0EDygiDk6Xh6pbcCDHEhQ1fpUagBIawGe2LAAwOGKkLsZvwzcwgcjoygY6pgHYeyIbP3cl5qdyybE8jI89P6QBpJXJiN06NJdBpq%2FQH3cDhJwQ1qAThoFQnNV3FwefixK1XHxUnu3sIpzGbytMQpJG0L0Qg8ZQuWI5C9EB0RHBXBqIhzf7yfoStoZPqv3i7y0jDG7hIBGJwlHFX72ttasPr8g2NC3zNu17raFKtHK9oBsX4mji6%2F4JZSMw%2FkusWmn%2BN6qoYgN%2BdkG5nQd%2FDqLR%2F3tR&X-Amz-Signature=0e8ab9517664a63a81ee6f2142963e33218e85fbd6e0c6309ba949e579bcd7b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LMEHWA4%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIDh404Uwd5OIcVVYUZqOdLmcnlOHNFmf%2FK0%2BDaNjcM7cAiEAk07xPyF7LNSzf7PVty2j9FP14nySthTyO8CEM%2Busn%2BIq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDKlJCN5UE6JT47moyircA6vLn4oaVXf%2Bwvdr88Kze5VkpFaUS8CQo6relIJnC9lCwXYvDqJWHPp8pxtQf1xsnfWGx196gJ87OI9achRz%2BiX3Nzs0r4vkdJTqbTWxAzn3wg%2BjlvonBVgzk0FF1Yx%2BaPAZEeU9PZhOa2SZLuUoVYRy4SS6GR8ejSQgeF%2FhjX6RMcY8FceR%2F%2Fdec4gAeL14hxViA0CAje1HaA3x%2F8QwENM%2BTzv7tMHYrs76hGObFnIvFvDENeFqD%2FmWeGOqZ8OW99NW6wP0xM%2BwpeCouohJSxns5rq6cMFTuKIq5e%2F1z9abBDQxRhrbX2Ib8kN3B5rPC1w4x5GHAePwv4PXS7QychnlOf%2BQJPRArrm%2B%2BPHqbG9IBop3KEmaodHZJw%2BpUoob%2FqZkLToLq01AYFpsclbfQPL5SBh1%2B2MR2xAF31cY4kVmP13hf2UZ5bLsQU3wT7cX9rdKJ%2Bv%2BEjQa%2BsrlBb6nL3XGgI70tGpE%2F%2BkAJs2qNR80yUOufC0hguEEOeBNmaXrEOiATapesXUHoJT%2FF8%2Bz3Z7FF2GIxZ3XzQ9QSRlzDS%2B4drNByKLBaEBp4%2Blrmvyow0%2B0I%2BoVPBl30mHPcb%2FU2N0znYMRbqqQ925AMe2y8JSjSXIM5F7dlR90JBYWMNHJ6MoGOqUB1Wp6gJ0DqHtBGfoqiMtOkzTek3T8gJuEFSwl%2BjHG%2FlXAudp%2FMbO0M5KvXkOnJuhJNG%2FnV62OTdsLHlHNhEVoFYS0ecP6bG3qchri9lDSjDGmJD9lyRPMcdyixvek3g%2FWl5M9874wq1f9IhguGELtFVcekuN85Qsmx2rZ2NAOrvn7UI1y19u8AztxssOSJVOw69WsDB44XsQ3tI%2F7X%2FMiy9%2FL7Pio&X-Amz-Signature=11d207e562498f3ac43246e9ff4df798e97281e2bf00ab6d5c5d84d9aefe2c4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UO7WQ2TK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDT3cljc%2F8I3Noe8IDMq%2FW8XMQsvf5o%2FO%2BWqeEGG3%2BlOQIgRkckeWGJaC%2BmxFS%2FWQydGQqOkBn0IUMc73GoHOIypwMq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDLEezLmYvfwKty4g5ircA3ug2O4N1LhuEgKXm2ktFzzOtkZ%2BKPft1V2wDTvPMpNV0UHQP4nQlKpGsTzh0i5qMvP0g5oybMDD0JG%2BIihx%2B%2FrHNmgCxd%2FgyFdDANSc5rtCeveCl%2FR%2B1bQa6ddzOc89x%2BA9LLc%2BHDGZryUf1um5lPd7U%2FT7kEm%2FAVUnIVaaixI4c6bkbKtwzCUZv6IpHKKcPWbyi82dliavMDboDpUPdHI0JL1jXiKA7e0MuVRJoBmdeVIXlCV6o0eiQvq6KtmOGjNKIEN748gq6zOzw9birVJZtIRJus41rGgRPCn8gduvPUoSuf2zBNVDtEqsnTft0Q8HbF0IxFeBOwnZLHeNVgSEOjtRYQ8APgj7hqVvuKyDPDdnGc7GHvK4bE0wqI%2B8zZrGA99p7DTrPfdpdxDfYToQ3sZ%2B%2BEP%2BRZmxqFAUhJvcDGA4QKXpvGeQ42e0r96DFeAK2VMS%2FiQcwcJG9JVJAipLjN7E6%2FFS1Y92%2FjDbKlFHCphmsuB42gOTVr6v1b8oh%2FK1GBrjjgysxxRU18DicCTqLNjhu9Fao2Y3yV%2FzF7uwnw6B4evZHCCTyHEkQsdgaFOPwpu7q2VhArwPCfpG8%2B31Xv0LG8A2IwXEi8d4YSczH2uxZtZ3NergU450MNXM6MoGOqUBKrxR8Lma7qs%2BhhpbmhGYfoWN0AG%2BDlK7HjnaZHS%2BM%2BIDnC1T2o6ZlNH7XEywFWCKtSemAhrBgOaFvyDxa%2Fln73jdYHZfzbLo%2FNPqvBpfb1rJfA3q16d4%2BjaM%2FDkHU2w2gLqK7FvGHepOlzBunFRLe4AyIvK5P7k16tpZP8LpKgQ%2FMDZrO35hYcJM4BMvrDywNCPUjT6FNsOvjEeV%2F5ucarBegX%2FX&X-Amz-Signature=accda83f8fbf547a046160716db1f4520d766235cfd2785c1e8d056c6088b634&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UO7WQ2TK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDT3cljc%2F8I3Noe8IDMq%2FW8XMQsvf5o%2FO%2BWqeEGG3%2BlOQIgRkckeWGJaC%2BmxFS%2FWQydGQqOkBn0IUMc73GoHOIypwMq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDLEezLmYvfwKty4g5ircA3ug2O4N1LhuEgKXm2ktFzzOtkZ%2BKPft1V2wDTvPMpNV0UHQP4nQlKpGsTzh0i5qMvP0g5oybMDD0JG%2BIihx%2B%2FrHNmgCxd%2FgyFdDANSc5rtCeveCl%2FR%2B1bQa6ddzOc89x%2BA9LLc%2BHDGZryUf1um5lPd7U%2FT7kEm%2FAVUnIVaaixI4c6bkbKtwzCUZv6IpHKKcPWbyi82dliavMDboDpUPdHI0JL1jXiKA7e0MuVRJoBmdeVIXlCV6o0eiQvq6KtmOGjNKIEN748gq6zOzw9birVJZtIRJus41rGgRPCn8gduvPUoSuf2zBNVDtEqsnTft0Q8HbF0IxFeBOwnZLHeNVgSEOjtRYQ8APgj7hqVvuKyDPDdnGc7GHvK4bE0wqI%2B8zZrGA99p7DTrPfdpdxDfYToQ3sZ%2B%2BEP%2BRZmxqFAUhJvcDGA4QKXpvGeQ42e0r96DFeAK2VMS%2FiQcwcJG9JVJAipLjN7E6%2FFS1Y92%2FjDbKlFHCphmsuB42gOTVr6v1b8oh%2FK1GBrjjgysxxRU18DicCTqLNjhu9Fao2Y3yV%2FzF7uwnw6B4evZHCCTyHEkQsdgaFOPwpu7q2VhArwPCfpG8%2B31Xv0LG8A2IwXEi8d4YSczH2uxZtZ3NergU450MNXM6MoGOqUBKrxR8Lma7qs%2BhhpbmhGYfoWN0AG%2BDlK7HjnaZHS%2BM%2BIDnC1T2o6ZlNH7XEywFWCKtSemAhrBgOaFvyDxa%2Fln73jdYHZfzbLo%2FNPqvBpfb1rJfA3q16d4%2BjaM%2FDkHU2w2gLqK7FvGHepOlzBunFRLe4AyIvK5P7k16tpZP8LpKgQ%2FMDZrO35hYcJM4BMvrDywNCPUjT6FNsOvjEeV%2F5ucarBegX%2FX&X-Amz-Signature=accda83f8fbf547a046160716db1f4520d766235cfd2785c1e8d056c6088b634&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YI2ACD5U%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T090108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCTz1%2BLjfbmfVNnheobncymWRpDa0TNDbN9SEs%2F4Yt%2FQgIgfKKOjevEaWKGbzBVbPEDtZMfYfojCVMGKZnk0qQ80Pwq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLVNOlQ4zTk5gsGKLCrcAxsMls%2BzxlW69DqBC7GbUvkANNL%2BJrc9MfJigJdy1PGvsJpohCd3SfnhhFKe%2FSRTzUUyhPNAaRjaaJ7KuK5usQ%2B52WSjGh%2FKbzc7QTCEIsgqVPBBIyFMliWBxzLOa7HfpDEpxLWYalzDsr52maH4lYlKUFaRkPY1Wplj6yGbfxtovPxxidRP3v6xzCDsi2dbyasMWO4C%2B5fjqvVQx6jXsKU8Wep90hhRot9RvrcFizBkHqNqMDdHeCD%2Fg9OrbeRMBUAaWa%2FhbDcQEYAu1ZjySckXwDrY2LutCPbuGP1XuB93cZvm9WgIQH4VfSfID2Pw7XZgJM1YQ%2BrxPt7ltvdnUi4AjPxUHvVKofcl6%2BY%2BxAn8EUSDjM0kEd3CDAEhcS%2Fw9x5CTVDga8MGOa7Fs%2BkUss7KPnHejfRao%2Fjhc2DcqEUAl9rYBntGN0gIPs6PIyFXuPPZ8ZHr24DPJmnFDv3TUJQb7nRvlo%2BRBbIXtOJYz19%2BnVke%2FO5t5G9MGuzlnotaDmxMFsH55%2BFZl%2BIZarlPcdh%2BnJUHpzd2gxJUl8mlko11%2BX9Dpcn2QUNhVNy5bkHbIpUACMGO9FEnPoQXXCJX471j65yUZ4qlHJOm2oc1eMMuBWGtDxBHqdbyXQ2pMM2058oGOqUBhkG9jsleNhHOMnoA7WQ%2FbDLK1SMV33ue8NbBKds8AmAIPYHN4lveOangqVQmD%2Bs%2B0MvORKUkiRARpEUAuVBrVWm8TKMBq0FuVi8qtvnwRVZo9ijnNe%2Fl1bkNIF7VhTvrATigBkM8TA4YvXm54nOHg0nUbsLKCwGufxG%2FGrySGIhEB6t%2BFFV4tR4fx5Dkdn2MvTW7HSAdUWjjuhmISxvQMaeo8ZtE&X-Amz-Signature=ad558e594a561c321160b7481e43bcb57359b90f49941bcc41290435eea118ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

