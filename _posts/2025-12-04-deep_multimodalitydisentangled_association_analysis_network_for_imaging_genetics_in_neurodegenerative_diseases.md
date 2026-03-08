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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3SRHKST%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCy5qU7vO6RcGY8GWvNfPbXSC8T87fhJdKyFTAhs66rmAIhAK0DQeMkiR9sjMHE%2BTfTdwltfsWkZv4s1GRKVkMKM2WDKv8DCBkQABoMNjM3NDIzMTgzODA1IgxrJZlQmHTqlI10MRoq3AN%2Bu8y24uS1ZlVEPZNo8QZvFydnSFVSDcGDqRs5fGzLWc%2FphERNNt3HtHQ%2BA94f8Gs4M4MXxROMTbGSjGSuz8YyNK%2BJ3p3vAw%2Bp9OoxuJ0IopKlZWJv4pkMAYnXxTk6K4CbsVoA1jzJxbYsHtCb1LEzbAaUS0btODv%2F9KW60a0QeQgJ%2Fd1awcJgUDYPL%2FqOfjOJQYw4p5%2BuJPMcs1jm27myUuOcxVhRv%2BF26%2F89kMas%2BGT56e1hUChw9SdE%2B0ZtRH%2FM2GbbuIbf4v%2FTUm8BsQ0s32Eue3Jy6Xy6hy%2FClX6lf6fCPn2Uk%2Bwn49AYZhBu2vdcJZDbKo68rlIAKNYiYrmYNTd7SgP6KP3ZRUo0Wa1b6%2BM%2B%2BkG7OC0yoABTDe3W7e2yP49fk3yX7h2Gxxi78ZVvIKmEwb%2BnuyGg%2B5HgjvfA8WMLB5t4ftIKaNNEakMDV%2BebHnDaLtmV2ct5%2FG8BXCM9eAS6soepGBF26xyk2eAY0A%2FUKjJ%2BXHWXZjIkvyvL%2FbusNfSaOUkGV9oDQRK2z3cvBgn2o62rxazU4RU37XjMixw2udY21DwkByQR2TljEY0fIJdbVPbQK01xmfJXUVFfGxwdPzbfdATNk7NzYy2jmxvWdCZkErUhqkgejDDCwrbNBjqkASIlTtADf6hZ6RhiH%2FYE3zTpCNwMJiJXTFpNHs3ApP5%2B8bYT8mhuLJIHRB74S9jayUXN5q1dEfD2L%2BXJw46p8JTuVTioCvPQKLAEFfBQOEOoR26kQAUoCsUsDl2rUkIfDaX9Do8u9e%2BxdlklKJw5IYVVStjzsdmwRc%2BxExi6AsDZWJUtwiYOkut%2B9zsLAhBaFmVAjtYyQU1rXQHmXR8xzhADRlpE&X-Amz-Signature=845b11dd9a80d7dc4fc5540325f59ca21baa4a84cebe2cbf549fe4bda1cde8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3SRHKST%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCy5qU7vO6RcGY8GWvNfPbXSC8T87fhJdKyFTAhs66rmAIhAK0DQeMkiR9sjMHE%2BTfTdwltfsWkZv4s1GRKVkMKM2WDKv8DCBkQABoMNjM3NDIzMTgzODA1IgxrJZlQmHTqlI10MRoq3AN%2Bu8y24uS1ZlVEPZNo8QZvFydnSFVSDcGDqRs5fGzLWc%2FphERNNt3HtHQ%2BA94f8Gs4M4MXxROMTbGSjGSuz8YyNK%2BJ3p3vAw%2Bp9OoxuJ0IopKlZWJv4pkMAYnXxTk6K4CbsVoA1jzJxbYsHtCb1LEzbAaUS0btODv%2F9KW60a0QeQgJ%2Fd1awcJgUDYPL%2FqOfjOJQYw4p5%2BuJPMcs1jm27myUuOcxVhRv%2BF26%2F89kMas%2BGT56e1hUChw9SdE%2B0ZtRH%2FM2GbbuIbf4v%2FTUm8BsQ0s32Eue3Jy6Xy6hy%2FClX6lf6fCPn2Uk%2Bwn49AYZhBu2vdcJZDbKo68rlIAKNYiYrmYNTd7SgP6KP3ZRUo0Wa1b6%2BM%2B%2BkG7OC0yoABTDe3W7e2yP49fk3yX7h2Gxxi78ZVvIKmEwb%2BnuyGg%2B5HgjvfA8WMLB5t4ftIKaNNEakMDV%2BebHnDaLtmV2ct5%2FG8BXCM9eAS6soepGBF26xyk2eAY0A%2FUKjJ%2BXHWXZjIkvyvL%2FbusNfSaOUkGV9oDQRK2z3cvBgn2o62rxazU4RU37XjMixw2udY21DwkByQR2TljEY0fIJdbVPbQK01xmfJXUVFfGxwdPzbfdATNk7NzYy2jmxvWdCZkErUhqkgejDDCwrbNBjqkASIlTtADf6hZ6RhiH%2FYE3zTpCNwMJiJXTFpNHs3ApP5%2B8bYT8mhuLJIHRB74S9jayUXN5q1dEfD2L%2BXJw46p8JTuVTioCvPQKLAEFfBQOEOoR26kQAUoCsUsDl2rUkIfDaX9Do8u9e%2BxdlklKJw5IYVVStjzsdmwRc%2BxExi6AsDZWJUtwiYOkut%2B9zsLAhBaFmVAjtYyQU1rXQHmXR8xzhADRlpE&X-Amz-Signature=845b11dd9a80d7dc4fc5540325f59ca21baa4a84cebe2cbf549fe4bda1cde8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUJY77HF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIFIHraC9%2FM%2FX8wgBDfQcb%2FKtAkbpZ8tydaLWr6yuXpsgAiBgMaNWmPhasBnhI1AvOoL8xmaZn0vlBOaunIk0wgIJByr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMr5W55Exs7T%2FpSD4xKtwDqYAe6Rgu11BYiYey4ZTz%2BQwyMPUcc9qzrqGE%2B3nl7%2Fmkzvx0nDNdb89p9JxXsKB24gIu4z8QiVRoRoqNJOhGu6vsHFRZM3b6Iaxk%2FO5IYsKpAEdd%2F1IMs9NOeupwUBxJW7B7SjKSYUL66Knhc9qpnAklO1XJtNKxzU0njtvP%2FtfQEzJayKwSjqGyAWDiOK2UpHYRQyrtSD0wvu5bHuqlNrdwN7QtqXI6PemIo4qM3J3eFCQZGP1gu8%2F0ZRzSulZtCn%2BS7eGcKoIhDQFEbTc4tOuV4ygZCY%2FxFV6ELfrtTHEMH%2BAcjefXCDX69RPpvvOBi1xTgKGlaOkd5WB1tljMAiMLd%2BAndmdIRlHFIj0W1Ik7DDDwWF%2FyKVP494vxrcVujVKptDLhNx4dYMaejm1w4gC0CpllF7MyVFvBL885S49FA334uDqvpMlJrMZp%2BPUxKCLOFvHaHkT2wvWh2mGKq6iNXu0%2BkDobNDB1MAprSonQ4%2FjiM8GsUQLEtk5GyxABpgUBJln%2BlbyQBCE5YBBJAl4FVD5RdJLazGWymxRTZ2odpMcF4OIMasQnd6gLNBuXpYGgomjSk9SnyGUvGnqiZDfI9%2F4i12qExbzTYjLcDvt%2FFILn9WI0PUcQsuswkMO2zQY6pgEZcEGotOZe6x8wZS00fHG3CWZRWg7XB21g%2FYPVMW23QlkwD8E0tPy1UuPWiaeuUM3nN6ZxAuSkRxB1WQg7jDO2neTStZSyLTDl2ww6F0w1iCgN%2BQ6HoEPr4sYksJjbEVfUICYhLZZWz8fIaWFHINfDlECdNNhDx3IWtModKrAYj%2Fv5HevnqnXENMgSFlf8yt6SCofGncTiOIeYJ1PMZGJxUKUD5C8x&X-Amz-Signature=96cf87ee944754586108deb94e97518ff03cf45e1fcb89c1bdde9da1e36690ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WADPXFCS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDyev%2BcXsLYp%2BHh%2BnD4SioKX0efbgROYF4ohr7vdN5VcwIgB0%2FvmvcZwqdK4PnueJJuiUmlw9N%2Bs3o30AzpOHZKUbIq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGIp0HPLln8FUEoCFyrcA8GPG%2BYSHcBM1cocXa1rFLE6X1tgy%2FuwFbl7jsWH5WL7uN%2B%2FhmyXRdCiHDLwiHV1q3A%2BirDmT6bGQEE%2FRpTd%2BTblg2CnGe96kmzlVjYGyC9N2DCqzjY47a0KT3sXo%2BZ%2BaTOCltzLO8B9lDnTGAMbkugoYGF%2BIytN9gvQOLN6BoCuzPYdJgsNU%2BWc1EAmz14KK6RDYWWfxWcUFGfMyNwyJ9ShilNehpFOGB475ZaQeMXLzYevWqLTCex77i3JsV51O%2FM7wQ2KzZV%2BGTfKp0QC5SNpCBctpchTVasMXxE5MNfNcKNSCyUPo9r39p45lMs6yMLYBv3ZwR7FxWz1bKks9RYGLNQ6exrkd1RO9GgrEsge5OVr%2BZqzH9FHvaT3XU5Zizp%2FbAvTD0jm8KILPTR%2Fbxg7LGhjiCxuFKXrJvjEbmrQlA99fiZboP8%2Fg1L7qdW1JvRKZ6gOM%2B039TXi0t7UpwPcX6B5rlwB4GqEefgBjpu6ekEMUxE0TI4jxrCDKqnlBxaAc1OWY55hO7V8H%2FpTMSQXh2auc%2FuzZoMVKHIeqtbcuhLbyN37uBMCPA4bMSebnNcMlomUqWeqUDWlWzA87W4QE9PB24Ck1CAgQ%2B6220G1dJAfNj98yTpLoOvlMNTGts0GOqUBH0yH0EEUwv9KHoUDAUW%2FeM7YT2AzELOpuAJle7%2F7pMrqhGi%2FSTbkfTaH7kNCV%2Bxd9%2Bjo8IyjAAtFlfjRJi3oVlfM03LDH7Y7KsYfBJ%2FEZMo%2FCLqEB1UYXwIgAmkKg7338bnDAttrFYYChYawdfJBGET7j1bSACm2mV1gXVsfInocqygi09uglCEtdLoqxnpQrmOq9Zz0EvrZelZ%2FcFbnTJzoXVJc&X-Amz-Signature=a5c1debe31eefb8f95db42bec1df5333e5f78b6622f9b8d9ae7414a585701857&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WADPXFCS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDyev%2BcXsLYp%2BHh%2BnD4SioKX0efbgROYF4ohr7vdN5VcwIgB0%2FvmvcZwqdK4PnueJJuiUmlw9N%2Bs3o30AzpOHZKUbIq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGIp0HPLln8FUEoCFyrcA8GPG%2BYSHcBM1cocXa1rFLE6X1tgy%2FuwFbl7jsWH5WL7uN%2B%2FhmyXRdCiHDLwiHV1q3A%2BirDmT6bGQEE%2FRpTd%2BTblg2CnGe96kmzlVjYGyC9N2DCqzjY47a0KT3sXo%2BZ%2BaTOCltzLO8B9lDnTGAMbkugoYGF%2BIytN9gvQOLN6BoCuzPYdJgsNU%2BWc1EAmz14KK6RDYWWfxWcUFGfMyNwyJ9ShilNehpFOGB475ZaQeMXLzYevWqLTCex77i3JsV51O%2FM7wQ2KzZV%2BGTfKp0QC5SNpCBctpchTVasMXxE5MNfNcKNSCyUPo9r39p45lMs6yMLYBv3ZwR7FxWz1bKks9RYGLNQ6exrkd1RO9GgrEsge5OVr%2BZqzH9FHvaT3XU5Zizp%2FbAvTD0jm8KILPTR%2Fbxg7LGhjiCxuFKXrJvjEbmrQlA99fiZboP8%2Fg1L7qdW1JvRKZ6gOM%2B039TXi0t7UpwPcX6B5rlwB4GqEefgBjpu6ekEMUxE0TI4jxrCDKqnlBxaAc1OWY55hO7V8H%2FpTMSQXh2auc%2FuzZoMVKHIeqtbcuhLbyN37uBMCPA4bMSebnNcMlomUqWeqUDWlWzA87W4QE9PB24Ck1CAgQ%2B6220G1dJAfNj98yTpLoOvlMNTGts0GOqUBH0yH0EEUwv9KHoUDAUW%2FeM7YT2AzELOpuAJle7%2F7pMrqhGi%2FSTbkfTaH7kNCV%2Bxd9%2Bjo8IyjAAtFlfjRJi3oVlfM03LDH7Y7KsYfBJ%2FEZMo%2FCLqEB1UYXwIgAmkKg7338bnDAttrFYYChYawdfJBGET7j1bSACm2mV1gXVsfInocqygi09uglCEtdLoqxnpQrmOq9Zz0EvrZelZ%2FcFbnTJzoXVJc&X-Amz-Signature=5b223dcc242d67f2dcb599c0ea2d379c2fe5105744a9fdb9bdfe3ae9afcbbd72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S7O7HVD%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCez92p5Rj0a76ZwAG3wun1GHJqBbTZ9n%2BpwPegmwT1ywIgIWZjyhZ96Qe1pakNrNSLgK3RhhQ2ITGQ%2FGwAJL60ZTMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGsEggjyfve2X%2FA%2F3ircA1AjlOtug2fLyL82QAqP1L3uUaYjsQzdSr1tmAQv4BCrfvhC9zRpsGPZOe6intxAohiFcpPHelNGcft8Du7cq9ZbVwSzBqwnBu44rbFkycYXD92AxaTWkHpgSDGNpM4MMx51RkfjqHWR1b62mOGVHL52iBzxhjVCu8lmRjrR6hr8qFuMleGd0yy7ubh2d5SSi3FOb6azDauPB7BdGGlihYAZ6ux3z0I1yVCYADmuiucMW039KF6PkTozpRA%2BQVEaNXX2T0eD71gDGX%2Fi%2F9FJonbxH3M2jk6gXfHRFAUuzK1rJUxM4bcEuKRD8K60q9%2BzBHIjpGQ0mSV2s4j%2BiRs2Aa7FObPIwx%2F5RMp7DEFCDOOGtqaZPVKJvJQuZ%2F6fy768bDSy2E8A0Dte5XvcuVcyRoklL6bcOjFE9IEnX%2F5SqdcbB1793t3J5lnBL3FQO2X4kEwCXwksvvciKVLAZQcsstqUImBngcnZniDiHe6ICr5Yumnj315yaUcDPR5Jb0nIAT9wooTGXY%2BDKZY1ZBPEo7UAr3AugulXbtwKlOvNpqYnqvr0k1mc%2B3th0LD%2BWGGeJV%2FXrPsUONduRT24wC4C0EsjINH239a7TQb6I3Vl8bEw5Vskr%2B67lGEP6myvMNTGts0GOqUBRF%2Bo3tJngxRj8ZtvDvV2BhUxEXROYEImSsr8hVOweDQGAmVC%2FRNiANc0jXZAdIQb7GCjVT8eR6NKp4gAWeeqUU5m0skuHvNLyJV%2B6jcFWPK165Nc0bkzr1e71zHAYoCOx%2FfMmXA1WEJf1bxRLgMfzzz%2FGiwU8NL773PYs78ra%2B4nUuBG9REvhclHcJzrNicDO1VGd8EDRmf9JbrxuypUn4QKxewO&X-Amz-Signature=9d1d6fb91ce9027417600606bea0870e884fb65a54245afd20247ee1a53d4d53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YG5G2GHF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIC4SNfa16bzfqOkwSYO5BiYSJbt2G4%2F8k4QTDIEyVCTPAiEApquxC6F9CF%2FBj1EYWezbeTcnjFb3oX5k9xhRFdE9A1oq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDLxvo0HBduhfQ7Cy3SrcAyaltzfFTJH%2FQvP5iUaV1StmnTWoT9XB3X8zZ43vxLrURiyCAhHTxqblEvJwb4fVhJ4mGj3GPI5KpcceV1MIbFyblQ2xPUVmIdMToqXMy5m%2Bce1eRS0CFzOBJ9MbYIcUJdvAHk7jwPjOcM9Xp5BI2lTNmGzudFmmApLdj31pi%2By6wvSij1R4pVn9JjJ9CCmFrJpbaTfFXH%2FkyxNGill9XI3mdbIg4zJViQ%2B3%2Bg1B2zGeEY7ZZCjVlUDOCnwjQAV1oVz8td2B03u2k1PLdF%2BbCie9eNKPeDH2AqzoWMwDxA5%2BpH8udkW515YPjogvCtlKETHBkaAlSIiKiKBUgJ7gb1GdBXjKzVP3if7SCB3i4nM9Fm82UkUKURM7Vg%2BGiZe78VRDF7iytXYoBStTHrwVzd3GlETIInQmqD8X7FLDyZpRdumcQw44uiHz%2F9VrizDzrndGAusDC4XFzmZE8Z3L9E0gtvTJSRvzLGAQCwbnJ6mfR%2Bymi%2BSUO2ldO3UNk%2FU9htsALKX2S01kmSsmWhaUtvBhywB9umY5e1tHb4ZA5L1mr3AK2G79pw2SfcVlFrN82jU1HQgO4mgXJ1gK%2FjV5Q7lMEfgjDDxbjCbo9k6bwkvoWyUUarwHGE3mmELcMK%2B%2Ftc0GOqUBnstL0s6fKTs9%2FUmE%2BxRGRqi2EMOFaEdlbivMJeZ35WtDjINbnzKfY9FLAbopdGZ%2FX3I3xZzr5p0ZSFrn7M3Sx4K7r3N0u%2F%2FXOrdofkDTtdMzMhuPx2piflxbUFMdQUS4VtJQgaRH5EC6U%2B%2BSUrHOTY%2BzdG8rlQ8b6UvztnWyIiAEd4vGfFE%2Boxt%2F5u1TIDQgNJ1eQuHiZ4m9LyTEjVMlxYpRVApr&X-Amz-Signature=03943407687f4d3420b61aa858bb687cb97871ef34c65e1cc541888fd1519442&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WF54JSXN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIETxenBJ%2B0rr5BPKMYbswnKrITBWbe5ObMDsDRTl1zYiAiBlCMmDfIQSqezAVqgrH7krBfyGjMamAXHkNqgvETr95ir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMlH4MqGDcyCB8%2FC%2BvKtwDdfDsaz7AZFC4cFnA9Fr0MNuY3Rin1EU9JgtLnTQWQ1ONBbHNe%2FTopjLbuwW%2F4obT7bzk19i0UpSIGub7DeY2h9b0t7ns26A6E92ziE8UN3A%2B29qTSuRPHCIiBg%2FZbLC1QXT4JzjRtX6nPMDysqTnui1SwmDqdqL%2BLIYYsYVGz0p8WPscPxbTVWXEAy0a0O9%2FhZBX7unD2KLw6TpKXL9yplPixhPC%2Bm9nvbGHVUjTqxxLhTdnq%2BDal81k71x2I8lqVdIr%2BXWG2brQ8cBONz1P%2FBKFOomQDLRWMgvWMI%2FN6WIWpEWA7dq57dBwX1aeRehgL2fk0EuG1YiioTDkvxPi2BXr6SFFzpq918ha4pqamHk8ugOjvDZvfcR31qhB5DX3WloP8E90gHoMoJNShcqMTS1v59N86t9%2B3ttQMeeSHgTQaxJ6Zbf0gVokP1e2gPEa4lmfMXV8M5Wi%2B0T8kr69hX3oUTa2KPpbuV%2FLJ2sZQ0pjknnL7Xku1FM%2BNhXNu7h6EPaX283Gomqh6e634oCU0ELQpytYF235ecYVQ%2BVIfiqO%2FbCdU5X7xAl8O6RIZ2kkRCconHLuyVo35YmuviEu%2BT1BQ7OPRyf7IT8y7yuIshPYCCVjSczcgWL0UKUwjMW2zQY6pgFdb%2Fc5sQZuYwaoBCZOei5V2OE2DCuM8fPtrLTR2awuUh2tnAk0wPqHufUQ%2BKtYQg18hq0Fs3B5Tbg5NNfSo21cn6uN9%2F94d5PB20CQIY4nFOz0lnRVvqCR49cc7Q9HPsYxFXZAftzqQrrKIU8nVGrNaR83AMTtAUe0RyAeif6HEnzp2fFfUht2nKg4Z3M%2FHUkvhr1QfwknpyquOSvGv40yqa1Wh4aK&X-Amz-Signature=af4b5ccff74f40400596e36d6f9457c56c38b5d0b01973ecf1d77e12f8033f12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGM3JJNR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCID63j9fIDPGobtVWrp52ifHPU0ujAEZRjlZNEthhK1dAAiBEBhDk20p1iumW8LZfBFGqoFwxpInajq5PhYAMZ%2FzCQSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMupIAx%2BSr1bl5S0g6KtwDZq6IHsUTZyThS3jjnU70tnzZq2y2zzQxuYg2%2BJX7RVY32CTo%2F95XlutAfu36vUcl4tXw%2FlIw%2F%2Fb3xPBDbceKvAQKFfc00gQLM%2FBeZ%2FfUO%2FDDKqqy8fFe3O8VpJlGDBPmmfCD4uQ%2FiVhN7PFwr5WFDmBP4fWKCoKXr%2FQlojaaA2YGG0WLgO3KBskVcA%2B%2FWnvtnt6p92lmMMOXguHTGn%2B%2Bf0fnmwjnqKsWA%2BIxl%2FG9shSwFewZx%2Bxd2NjCoS70Ej%2BD%2B23KkqBM5fud3ptt1Bny8nCvpgNQTEUT29HX52mTT7%2FvHStIATOLjpI683CqtCXIQKiZ6VbKmqDWSZrlL%2FUYaLcPNZd5v4q0InpEDNMQjk%2B9mGMkuYwH52BkxV6pkGfFwzeLTgtzVrmCjOt90Jy5UUtHCbSGQh3JOQ19eTms97yCmuzeHUd1vI6i4iM82FyXbZwzZkiKXk5TPkzwAtUX13LAjtLEwhGuZ88jd45ebzi%2Fb1jGby5Su%2BCKO6%2FaZc1kZ58xqfR4oAfloIkg1D%2B03WtNeu%2Fbn04a1QbCPYDj6%2B%2FerwNCKqSk%2FeJxtiEUCTl%2FcNyQhKOqtrIMLdyl1kjcEgOaOgS7sHzJlF9fXAX5irKS27hYBZbYE02VhWsw%2Fsa2zQY6pgFepF1GDRa04SQ2ivcMvQgsPHuAOEmeokSuX5Ujl3y2GELc4QCq23tl9fDwJQIm5fPJF7vs6%2BmF3V4J8oLFU0mL6VCOvoMsfGRoEPGkDkpaw2mHvElRPLumvfGCS4SwR6cXN9Ab3FvnS%2Fj4oGkAqarw32BlTJeGGAgne5jEbnBh6yfFgZl63l9E2jgJC%2F3kPP3Wx0A3qQI8F8XTArt84qO9f8z0IcJf&X-Amz-Signature=141a96bb29fb9463584b6b80e4013a0a1bb31bc48ec63fbc7f89fba420f8d832&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGM3JJNR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCID63j9fIDPGobtVWrp52ifHPU0ujAEZRjlZNEthhK1dAAiBEBhDk20p1iumW8LZfBFGqoFwxpInajq5PhYAMZ%2FzCQSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMupIAx%2BSr1bl5S0g6KtwDZq6IHsUTZyThS3jjnU70tnzZq2y2zzQxuYg2%2BJX7RVY32CTo%2F95XlutAfu36vUcl4tXw%2FlIw%2F%2Fb3xPBDbceKvAQKFfc00gQLM%2FBeZ%2FfUO%2FDDKqqy8fFe3O8VpJlGDBPmmfCD4uQ%2FiVhN7PFwr5WFDmBP4fWKCoKXr%2FQlojaaA2YGG0WLgO3KBskVcA%2B%2FWnvtnt6p92lmMMOXguHTGn%2B%2Bf0fnmwjnqKsWA%2BIxl%2FG9shSwFewZx%2Bxd2NjCoS70Ej%2BD%2B23KkqBM5fud3ptt1Bny8nCvpgNQTEUT29HX52mTT7%2FvHStIATOLjpI683CqtCXIQKiZ6VbKmqDWSZrlL%2FUYaLcPNZd5v4q0InpEDNMQjk%2B9mGMkuYwH52BkxV6pkGfFwzeLTgtzVrmCjOt90Jy5UUtHCbSGQh3JOQ19eTms97yCmuzeHUd1vI6i4iM82FyXbZwzZkiKXk5TPkzwAtUX13LAjtLEwhGuZ88jd45ebzi%2Fb1jGby5Su%2BCKO6%2FaZc1kZ58xqfR4oAfloIkg1D%2B03WtNeu%2Fbn04a1QbCPYDj6%2B%2FerwNCKqSk%2FeJxtiEUCTl%2FcNyQhKOqtrIMLdyl1kjcEgOaOgS7sHzJlF9fXAX5irKS27hYBZbYE02VhWsw%2Fsa2zQY6pgFepF1GDRa04SQ2ivcMvQgsPHuAOEmeokSuX5Ujl3y2GELc4QCq23tl9fDwJQIm5fPJF7vs6%2BmF3V4J8oLFU0mL6VCOvoMsfGRoEPGkDkpaw2mHvElRPLumvfGCS4SwR6cXN9Ab3FvnS%2Fj4oGkAqarw32BlTJeGGAgne5jEbnBh6yfFgZl63l9E2jgJC%2F3kPP3Wx0A3qQI8F8XTArt84qO9f8z0IcJf&X-Amz-Signature=e9beb9c23b36c3f16ecef8c465efb53bf3423df4d477c0945916f7a419c11f6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OO42HFT%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDGZ8hoVo9frgeaxxGZZGcUzEzf%2B0OutofRysogdAIA%2BAIhAKhZ1BzUVnb%2F0u2jZJVcYIDI8SBU4rOlpMDXxH5F6%2FrSKv8DCBoQABoMNjM3NDIzMTgzODA1Igy3Oon3OI6wFqqTALwq3ANCYhfkENPIeFNFKvVWUS9TzxAO%2BrfpNMYYjlZJnOmy71OI3J3vH8Zq2fDK6%2BXMCQT0F1SrSZ6e3i%2BMeTAslH0HLsZb3zB10opbrslpOXop9GDsLiBZsqo3GZ29O%2BkgDqNR1IuJwELRWzSxm8iCidMqvKoOE%2Fp4Yfx9UHOV7%2FE5gHZcpRiuPV%2F4CveqZrijT%2F0ch0WkZFEzcFDCFgB1pkj%2FYg3gIG3HfIQaE296TmRv9DMbPdfSNOpMSjNPcxKf%2Fj08hSg48WmxDKMB3I8j8jBnXTYREAFLnWWRpKocZzkykQZRu7KnzBQQM5MBaCaI9AKFwrdDXohzTWsPpBqC8CwMAjgAKHOPuALhOp93%2FDdEDLZ5XWWHxGztolb7jSegfCCkUObPqfa8O%2F8wuA0qokpRXyksOwiIY75FVTBdFwU0XTx3K5dOJJVhyhuOFhhkAj%2BbDtfJ6dH1qgcX0RiBhyt2nppFZvw8lCiTou1K93WYikaJWnnhFnkj83p7EX7DMb3%2F5%2FFaZL%2B1u4%2FbUSwqS2ShoYmRglXNu42XIAv0laSRL8upVRR83w1tRbqxqY9NS8x4qwko2dULVNsKjPFT%2FrjYxuLGfnM%2BWPNG%2FPlqCSHScWZ3UlwkFh9%2FLN7%2BHTDexrbNBjqkAf5Vwcd8Huf7zg7qjZHkpL8Kc7sbNIQY0V5qGXX9vlrkaBPx38LDQA5VCqeY38TIBPTYK9TFgDUqDIqf%2Bo7fe%2FMQKbCVazCQ8Le2XLhTULfQ5reFJVzCYtXoot9HEaQ%2FkQ%2BPhPmM8AksxAuEueo2fJOrTDK9YQySXN1PeaUxlNoJAUNQxmTSII5Ye29fbVYV%2BF4hEKq5UhNYnunkIZyuhfehkEih&X-Amz-Signature=e2c278f5783740992fccb750b6693b6c7c7b773e3bbc4fdb0e2b784a2341e17e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MQ43ET2%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIB8s%2BXkU2%2F5h5hXy23JksC3AHufSIEPBVgvZoUFlVNuzAiBAmwDhxJzKe%2BWrWYymtijBj1YcCoWdpTJcKTjbbpw%2Flyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMskmMsat0GXf7bSmcKtwD3ow1O6YyaY91sl8gkElT0I29eEs%2BF40eGNOh8K%2FrcHk8OB7hjoq0W6GALA7AynW4UwItgDaZ9dliDjR52kXBIQfNdOLM8fmx9bnUvfkQlHsZwsxmx3IL2pJlHIuwW%2BhhTzOzx9fxPnzPngRv096732VTgkhn72uzrpMxomyPyOgaZ1Uns7JYHoBY9H1PJ0JDw7Ytmfl%2F9kYmu%2BVRBFbQ%2F6SgcF6PCcgpMbU88Td6ce0MT1cDhwGbvsuHguzmB9osTCNIM%2B5Z5i1ZqnwpDLpricNx6yc15VkCUBihdv5XYKyYkOWQ%2FI6maUYtVoQt327DOc3GlB7eZp9%2FfxK8iU0ITWlXo%2B37Cb3RCM1HTgAxAYMgg1KmASyj4ypEFM5JP6sGASLqTIiqZaBKAOqvAkAKTWAhq2RV%2B%2BD8fqO1ZicQ6UHE5i%2FKK6B6XQTGqpC3pq%2B%2BTEaEOFKzampJiDBMY1gTF0vCUtopCS69%2BvH0193bQ3Y6zHNVLw0hg562mj46P2%2BDBZfyp2nmKL45v7Im%2Fy1ZQosE701SJ8zM7GL4mMMJ3bSbH3%2F3Zc%2Fyb0Omyt8d87TRgtL2iqdPUg1r0%2BsH1KZNkEHYprm01gcwvBQ6Dtm7Pid%2BtAssWEoiTblIuVcwqcS2zQY6pgGHMZU6eiSeB96iDtlC93xVCJ82TF6OyDz4HpJ9muKSIkAGe2JtMbwo2%2BY44liro2kkP8AOkmQyNJAtHsU8jy1yHwUEhnxlKpssIiuyD8LTABmELW26WIVbKXi6wkzPUDLq%2FtjRKQo3ucHx3PRXGn0veOjcOLlbET6rICEhKEYZfrFUNi1EXfZ%2B9Eq%2BmyVxPaT5zZEDX1ox1uuDFpJEVAkRlEpmpvPO&X-Amz-Signature=40b692c84c7f440274d35fe467ce707d49aea01e9f9605bf71e38a2e28215445&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MQ43ET2%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIB8s%2BXkU2%2F5h5hXy23JksC3AHufSIEPBVgvZoUFlVNuzAiBAmwDhxJzKe%2BWrWYymtijBj1YcCoWdpTJcKTjbbpw%2Flyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMskmMsat0GXf7bSmcKtwD3ow1O6YyaY91sl8gkElT0I29eEs%2BF40eGNOh8K%2FrcHk8OB7hjoq0W6GALA7AynW4UwItgDaZ9dliDjR52kXBIQfNdOLM8fmx9bnUvfkQlHsZwsxmx3IL2pJlHIuwW%2BhhTzOzx9fxPnzPngRv096732VTgkhn72uzrpMxomyPyOgaZ1Uns7JYHoBY9H1PJ0JDw7Ytmfl%2F9kYmu%2BVRBFbQ%2F6SgcF6PCcgpMbU88Td6ce0MT1cDhwGbvsuHguzmB9osTCNIM%2B5Z5i1ZqnwpDLpricNx6yc15VkCUBihdv5XYKyYkOWQ%2FI6maUYtVoQt327DOc3GlB7eZp9%2FfxK8iU0ITWlXo%2B37Cb3RCM1HTgAxAYMgg1KmASyj4ypEFM5JP6sGASLqTIiqZaBKAOqvAkAKTWAhq2RV%2B%2BD8fqO1ZicQ6UHE5i%2FKK6B6XQTGqpC3pq%2B%2BTEaEOFKzampJiDBMY1gTF0vCUtopCS69%2BvH0193bQ3Y6zHNVLw0hg562mj46P2%2BDBZfyp2nmKL45v7Im%2Fy1ZQosE701SJ8zM7GL4mMMJ3bSbH3%2F3Zc%2Fyb0Omyt8d87TRgtL2iqdPUg1r0%2BsH1KZNkEHYprm01gcwvBQ6Dtm7Pid%2BtAssWEoiTblIuVcwqcS2zQY6pgGHMZU6eiSeB96iDtlC93xVCJ82TF6OyDz4HpJ9muKSIkAGe2JtMbwo2%2BY44liro2kkP8AOkmQyNJAtHsU8jy1yHwUEhnxlKpssIiuyD8LTABmELW26WIVbKXi6wkzPUDLq%2FtjRKQo3ucHx3PRXGn0veOjcOLlbET6rICEhKEYZfrFUNi1EXfZ%2B9Eq%2BmyVxPaT5zZEDX1ox1uuDFpJEVAkRlEpmpvPO&X-Amz-Signature=40b692c84c7f440274d35fe467ce707d49aea01e9f9605bf71e38a2e28215445&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BH6TP3H%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIFKBNLlXEI857CNMTuQEnW9KBgFW0gQ%2FWcGeu%2BJodBF%2FAiAqUOQIEwzYk8L6jovAvIy%2By5ZWDsw1%2FV7qGwWS0nKT7yr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMnr8lFeQidhYvyIg6KtwD4ct0KAvZABWdNk9LhLI5fvGo92LAhJGHH4M9JFy2p38peythaXCEHTTbYrqMsCabZcmmkEH82SVLICpFJ%2BAWN6bka8A4ZZ%2FdbxDejAyFnzAGaVwSmKfmNlhrwmOFv788eXXIUNYXcHD%2FgVRSYPZHdTQlx4RqW8INQi6z8DazKnWg3fsLHLOMpirvxTCXVZ0xxqpLaGY0fuut8CaR1XRJ8L0lL2RrEW04DM9NsddGpd%2BSF7WJHz%2BJU2emfaui5hy8nkPyM7K7yi6nb3zIjQoAPeLJapIKiVmwsDJcQZOp0utjsyTivz8pPKM3xr3YdBu6cLSwcCMqXtrbfveEZEo5YYuhDlU%2BWO4MgI%2FKkK51GmSaCXMCGYCVbQEjLvRptcd2srfNCnneGDd6jpn1%2FgIZ9hy%2F2Khb%2FvHB0dSk6GCAL487aNVQ%2FBzM3jf%2Bu8QZ5pTPBLLwi5ltBCPE8y7mqqnA81svhxf7eiMprAIHJsannu2XTd5zZfgLIU64AyOjTcDnsw6LdcUk93mCrY8mWpJHfOVw%2B%2FdWfiN2RkwfLMY6okB1rCH6sP8VHhMvMwbiHZICOFqiPh6cera5qYUd%2FRM0iz0XD4NnoNbOQc49uW3ZJDsXMX5uUzQsg5iHInAwoMe2zQY6pgGexUxIVv5jZbpLxSmDP6YVB7LwF5KogBTWHI3TPMT4KphGv4%2Br0SikJoBW1xRamK68BbfB8bl0QN2G80zxrqi357kSdKFM6TF2XNQatHkP%2FQVWoCG3%2Fnsb1Px1TWKvTUkOxJQal6xq7zwefbKU4oGUnNxpkEuiEwA08qK%2BtR%2FKdVo1MN1N%2BZMwkq6CYiu7T9siJVZd5tDeD0URTMDzyI9jmRPV%2F6U1&X-Amz-Signature=6c65fb997ae9ef460d8fd35b755028c1e4bfad4e3887ceb2458e578e902eb334&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

