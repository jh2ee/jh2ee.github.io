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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C6EPFE7%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCNg5ikHEoR4Ay2oTXdGk99zHjI59F0ohXKRW2GwIlJLgIgb9Tutmr80sqD6409OM8XygSLreH18aziK8eu4pI0QU0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAOgs%2BISsL%2BsWBdo9CrcA%2F3tn33XP5lj%2FqQtw1WFxbHV%2BmfHQam8PRtDFBFcCmT3U5h%2BwzsOyWYRIewFLdMOJqFPDdzCZYFUfzOgq6LwDEX79yv14ECvHKz4%2BsqNBz%2Brej0oJ0BAzYpn1UrZKTJb%2F4xGm1wV7UrUslSLsOiDP%2BPlSWYC4%2FZbu49w7LUFzpQWdMiwJEBIAbrY9v4QSp%2Fc8g%2BYV8qe%2BHUVCLHXmAw2qmZ80yQfym4gh1H2ZJL%2FIbDOaug%2BAJtq4%2BD148hNoOoAGRb83DxdPDhfpK8tjDlFH8Mi00UCq%2BAFDvvhC6Yjup0tVSaiJMOCIWTnwjyJf7%2BmJdWAF3fv75oq1%2BbrBHCjqkjB32NUxs8SGBBXJ7PTmoZpgVStXukc8ztCyvcj%2FIqBnAwPUgseQfl3WZ5agHp4z%2FR3yFzE0f152cNE5U5H%2FxgpsnrZZm0g0s3euJtWvfMT17VZUiNcT04G3VNQ5qzibY9ICJUTbR2Kyzc4gCUWSSgqJpkJ66KFw8mmTYymMrAW7Owu3rg4Jo6poeB9MQUVUF%2FMMaw%2FsTdFDb1%2F5c589Ux6sdviA53CMQzUl2d0pPMY2Qwft%2BSpuMtz4iGap1dulDNAmmTbQnRKlvkj%2BL9GhP4%2BCm2BCjg0TZfKZX0GMOjYlc4GOqUB5vLDHEgh3zRqx2oYA%2FsekB4SVMCr96AFwuOu5BdhmKnNYoaDCiuSSVLHz3O2YreUahNU1Q5YLQdykpVjFrD9fg8%2FF0%2F%2BZaxSEnfuty7p8UGV6hx%2FZboMQRmVD9FZjYrj3Mdh4eflC%2FFH0qIuUbkVSYn5iCiE7uK8SzMeLBwvNVJREKp6T%2FnXqFW%2Fu%2BHvzXHfqCF97GyL%2F74%2Fvk3m4PTaoPzNxeea&X-Amz-Signature=086a8e51b8197a123fe2ab22278f6a52f1184bae80c8a3267fc83e1bab4c4f2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C6EPFE7%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCNg5ikHEoR4Ay2oTXdGk99zHjI59F0ohXKRW2GwIlJLgIgb9Tutmr80sqD6409OM8XygSLreH18aziK8eu4pI0QU0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAOgs%2BISsL%2BsWBdo9CrcA%2F3tn33XP5lj%2FqQtw1WFxbHV%2BmfHQam8PRtDFBFcCmT3U5h%2BwzsOyWYRIewFLdMOJqFPDdzCZYFUfzOgq6LwDEX79yv14ECvHKz4%2BsqNBz%2Brej0oJ0BAzYpn1UrZKTJb%2F4xGm1wV7UrUslSLsOiDP%2BPlSWYC4%2FZbu49w7LUFzpQWdMiwJEBIAbrY9v4QSp%2Fc8g%2BYV8qe%2BHUVCLHXmAw2qmZ80yQfym4gh1H2ZJL%2FIbDOaug%2BAJtq4%2BD148hNoOoAGRb83DxdPDhfpK8tjDlFH8Mi00UCq%2BAFDvvhC6Yjup0tVSaiJMOCIWTnwjyJf7%2BmJdWAF3fv75oq1%2BbrBHCjqkjB32NUxs8SGBBXJ7PTmoZpgVStXukc8ztCyvcj%2FIqBnAwPUgseQfl3WZ5agHp4z%2FR3yFzE0f152cNE5U5H%2FxgpsnrZZm0g0s3euJtWvfMT17VZUiNcT04G3VNQ5qzibY9ICJUTbR2Kyzc4gCUWSSgqJpkJ66KFw8mmTYymMrAW7Owu3rg4Jo6poeB9MQUVUF%2FMMaw%2FsTdFDb1%2F5c589Ux6sdviA53CMQzUl2d0pPMY2Qwft%2BSpuMtz4iGap1dulDNAmmTbQnRKlvkj%2BL9GhP4%2BCm2BCjg0TZfKZX0GMOjYlc4GOqUB5vLDHEgh3zRqx2oYA%2FsekB4SVMCr96AFwuOu5BdhmKnNYoaDCiuSSVLHz3O2YreUahNU1Q5YLQdykpVjFrD9fg8%2FF0%2F%2BZaxSEnfuty7p8UGV6hx%2FZboMQRmVD9FZjYrj3Mdh4eflC%2FFH0qIuUbkVSYn5iCiE7uK8SzMeLBwvNVJREKp6T%2FnXqFW%2Fu%2BHvzXHfqCF97GyL%2F74%2Fvk3m4PTaoPzNxeea&X-Amz-Signature=086a8e51b8197a123fe2ab22278f6a52f1184bae80c8a3267fc83e1bab4c4f2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUWIZG6O%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIFNYuzdh6JZC3wk3%2BT0wCzThje3F4d8f%2BcL54YmBlwEyAiBvRL8I3R1ao%2FODZZEcf%2F%2Btn%2F0%2FGc8PlRDBhlyOnVfAfiqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkPF3UJ6o0AU3GeiBKtwDSn9tH%2Btj2uRtsXPnxEbZV1j8EQq6b6sfLg3s8hColR35y%2FjkE2IzyPD%2F%2FIsgtepjjDKWsgniuz3pOOs5IYOlJCMWTFKaIF9wlOF7zNqErkJA%2FB2EnZbHvE3Sk5O4XEqEbthC731SVxrgqm%2Ftf2i8Hxb9PxzXcHL4vwBGotcw2Q%2FmPSibNcJKEmWtn%2FoxXy0HfglTzvz0uBOzUwjI0bo4wgJH4BZc5LzYXHhOOOVuaXCF0J9nd9ByoWbv8NYiw09d0hdkkMOjhGzfYldMhS%2BPNbYoSU1ye9J5ObY0aeLCu7UqWGa3EykP78P1yO69CMlmlOqoMmtzXHBdwwnyWnLPXsBBjnadbo6jF%2FcPep8OC2yKFp9MyDC0hBgVHoxokFCLS%2FDnICMoAh%2BNg8giKnblAkwKp1%2FtJqIHhShlCsAJ65WaLDE6L4zA3yGxdbzPIhsFHppr2ejLmjzY%2BIX1YLqKqesM1eRvbTnm4evAy07llTd8Oit8LU2xa2%2BDlHwSo7gMqv5Ij6z96tbhOHRhgn75WxNzz3AHkHbyCL3UPV6Gq2AIyEcFjOUFaYvOZ5nDK8TwAhirkyd0DV5H%2FmHuvY7p%2BEgoC7OIGtd%2Ba26p3uvxTCBYzAjBuX3vM61MJ1Ywn9mVzgY6pgFuliTlLdwuKAI68pBq9DYBfTFYyTmAROwfbQuAPbMXFIxqt0Yda6pKPYgrE5a2FSWCGbm0QihKPXvechp%2FHiVuEqigbhvmXSRA14ksZOmEoFe%2FbNfF6B0dBqqFm0molgNtiEKr6PYZEyvGucEsgfjNWrAZguXeylEV3c1AORmCorsanVl5%2FCivTCyLut8Fdk7HVzjlEnJazs3%2BVgYViSO%2BU3emoOzF&X-Amz-Signature=cb9e06bf4652002f2f37d214fc250a5592db4bc23c16708e4c176b9ef8191efa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGKMRIPI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIH45OemTh3lFXr2bch9BWecZGNSGXwkhNYkB6HCRfqwCAiBt9YCbtkFeCBnfK%2BSwjepkzVE3WCJiVkDJSRCMQCnWQCqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJus60NbbOc774NFUKtwDKNEGVQ5l2spI01U%2B4H8KZaxKUFrVxa1PUjc5BVhiQLbgAGFQJm3Gw8tNIzQdaTHGbQweSwA7npYX3N%2Fi4824QwYMDBpwGRQ3XaEyP4%2B%2B5zcWgJMeiT4lOTb875oiVY38a2Rzh%2FfHhy1HXscPBc6k91nGjE2NCCnz%2BufZAJ2eZLWnjdNO9HUW%2Fbl35nkcvBt3%2BZYyDrrZUSHTGAnnoR6MWgjLQslWjzXuSYl4VuurGbPOxrkXhJygqHLcdv%2F3s05Tsow5jyP6fSclFOBXSzpJwhupI8skQMAnLH8b037LJ6gPrMpVjij0ECFtJt%2FMnOqHpFZyvuKK4UCjM5eJyaEh3oInzpwUGy%2Bc9TpJRbEner95%2BUj3FSdw7j119mG1odDSiRWnIJsapEK8PCLIYeGWo3a0FinkUThLfWcfA7DVJwmaaprO3fL2JDzFSRuh2s9IHDSXeHZhoSzYeVWQqZqNgd7IErJrXGdtSufJd1Zjs%2Bn4GWRZSLj8IVdia%2F8CIHi%2BuQl9uweYcTylmT3vLXMyA3duwZI2HSWpgV0QqplScvBFKf8iFdbK%2FBWD8q3C%2FPvHbnlF37Q8tei5FKn9l%2BeIh12q2akor5%2B7gwPP%2FiDQAJnRCGU4fkhaay9qvC0wjNmVzgY6pgEjkzfxSHbdrbtamblISmzYmfg7RlzEDcrEkJ2OeWUCO%2BaiB1dKAMZx%2BzX6zk64fR14mliu7aqHuI%2BRQWi0a3krSzZpau9YE5mGTYSQ0g%2BbmTmtC%2BwhAKixMqYjYPZ2vg5h1ngA1bbBiZjAdLHCp6aSQtQcgWNGaKODfI6MGIf%2FWm%2B4qr7K1ak3A9NS88Eu2shYGOh8u6zPLcd0IviWqvTlUPMaD5co&X-Amz-Signature=e77c7c54655688887da15276f73f8755355f36ad22bd010211aa7cd346db27f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGKMRIPI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIH45OemTh3lFXr2bch9BWecZGNSGXwkhNYkB6HCRfqwCAiBt9YCbtkFeCBnfK%2BSwjepkzVE3WCJiVkDJSRCMQCnWQCqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJus60NbbOc774NFUKtwDKNEGVQ5l2spI01U%2B4H8KZaxKUFrVxa1PUjc5BVhiQLbgAGFQJm3Gw8tNIzQdaTHGbQweSwA7npYX3N%2Fi4824QwYMDBpwGRQ3XaEyP4%2B%2B5zcWgJMeiT4lOTb875oiVY38a2Rzh%2FfHhy1HXscPBc6k91nGjE2NCCnz%2BufZAJ2eZLWnjdNO9HUW%2Fbl35nkcvBt3%2BZYyDrrZUSHTGAnnoR6MWgjLQslWjzXuSYl4VuurGbPOxrkXhJygqHLcdv%2F3s05Tsow5jyP6fSclFOBXSzpJwhupI8skQMAnLH8b037LJ6gPrMpVjij0ECFtJt%2FMnOqHpFZyvuKK4UCjM5eJyaEh3oInzpwUGy%2Bc9TpJRbEner95%2BUj3FSdw7j119mG1odDSiRWnIJsapEK8PCLIYeGWo3a0FinkUThLfWcfA7DVJwmaaprO3fL2JDzFSRuh2s9IHDSXeHZhoSzYeVWQqZqNgd7IErJrXGdtSufJd1Zjs%2Bn4GWRZSLj8IVdia%2F8CIHi%2BuQl9uweYcTylmT3vLXMyA3duwZI2HSWpgV0QqplScvBFKf8iFdbK%2FBWD8q3C%2FPvHbnlF37Q8tei5FKn9l%2BeIh12q2akor5%2B7gwPP%2FiDQAJnRCGU4fkhaay9qvC0wjNmVzgY6pgEjkzfxSHbdrbtamblISmzYmfg7RlzEDcrEkJ2OeWUCO%2BaiB1dKAMZx%2BzX6zk64fR14mliu7aqHuI%2BRQWi0a3krSzZpau9YE5mGTYSQ0g%2BbmTmtC%2BwhAKixMqYjYPZ2vg5h1ngA1bbBiZjAdLHCp6aSQtQcgWNGaKODfI6MGIf%2FWm%2B4qr7K1ak3A9NS88Eu2shYGOh8u6zPLcd0IviWqvTlUPMaD5co&X-Amz-Signature=e6a6ed2b596fd8ef8ffc05ffd9b817108bbcfd4034beed74fb219412b7e92231&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635GRMHK3%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIAr361UU4%2BUTQE9PoQ%2BlfV0imP%2BAMT0ZRpjgc9tPVvZ0AiEAp%2BpM5EAWCJm%2BEKz%2B8unzEOki9hGmfTv%2BQeM08hkK7IgqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKGgyIz6gvW7Qz3Z5ircA57HqJfHge9p2kzLsQhJwloAXZw%2FXGuZB4Nx9PQn8yjk0%2FGNBB0EuKiqcbgQN2f41Gr7bM3iLH1VI8VaY7v9d3scn7xQDHXalujKq1lPfLI3JWZnZdauNt2nBegXs%2FR6x88eJMyJb5zP%2B4Qtwz3Q8h33Ee96pN19rVtWakL3PgKnfGMIL24JHds2kB42Jy8VF0yGCLLqKgx4ZJlu5RzUdFGZ4N7Vl5iO0EmbnkbmOWtowR7UXcO%2Fn%2BlUFEqhvEYYzJmr1l1TwAIaOkr5iJPe5AunX%2B2wpJHFMRVE4YELRG5TOWiuVd7ybI98W3YAkJpz35gmxWNeD8C%2F6IBDj6QV5cbz0bK%2F20IbsvJnnnnWn3vzB0RU3hmufIo8YdQiZqKRsMHK7tJSTd2kylad1hxG5YsWfB6cewPXN9HeQDCw2b09z1vc8XrP6LN07VwuqXJjHNEDzj5uxGKATqc8HjLHorIjpeJu97ZHs4FE0FZQLiB3HD9jCV3OyMVr8uf55TOknp%2Bwl97fjP3LkQT%2BQVB4nlfzwC4iy46akDXtG54UZ9nulm9UEhUDa92V%2BKaajQB%2FL3cYhscUHTQgkX0FbPnRZsouOdh1K6udecL7gXcvbo2p5evJkltW1794DoXfMKPYlc4GOqUBQYNgQpHWCdyPLQIqhm3CONdcXMUiPrNwtjO%2FL%2FEvnwf6jZy%2BqX66qooF9NoGVw9NtRNPccZMHGxgkZ2%2FTzRD21Vp6CtuL0iMGj4aIUNmyMJBiUYqWIiSHEv7C0D41cksX1w8uYes8mOgbbQnb9IexvJSaGSfKmrkKZS9kaEDCCD277y5x%2Fs4neqk04Waeodmdp7XNNxP5f%2BNqEvvvg33xwbgiAwT&X-Amz-Signature=8bcbb691d428d3efd435f186cf1c0c9d097eced7e1e2b5682b54ef6b671ed3a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XM62SFMU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQCCcWXrycim5wriOYUY5q63DIuS8n6KFmzP89SMCYnakQIhAOAit%2BONj2bQJHH70ILj23S8LkYbetpXxbfPd3fBGHnAKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw0NtaczUT7J6r0acAq3AOGeypI%2FXBVovtQqp%2BNFjx5wzH0KdGiqoGjmKlTVtBkXfH2hrSMAVczq8lwQgyT8B7SEDWhnjo9OmF8rOyOs%2FGneeoHHenRr%2F3D3kiUdF0dS2siwVV2fQd5E3yPrxoptBx0aXm9CslLRiEr1O%2B7d%2FcGMgzbV%2BFXP3nCQHPPlL6WCNoGM6HFlw6FJ%2B6aGosbdyfk7ZoSpfRX4msP5%2FVZ%2FvkDndonH7y%2FoVXkCEuZdK7aYZ6roJNE6nUfKolcc0qLtcwSACGEiTF5wzS8dOs38XXqstwtQ7dDKLA3tvAtZ30e1QGLfRE8chCvly0%2BTWVHyFN8UIsDedirvdHL4RGtb15s94Dsyz5ZjB7szXApjBgUn4to8ytW4uCG6rynX52ci4HWVQo07JbcpFCm%2FD4%2Fdt9icHIiDICRnmsH5%2BxrylCdydDKDFTFp077kAO7F9CIqpKvUC5Pzmn%2BimpnV7njRBGDV5VGSkhomu9eY7CzADq%2FSbjNpYQh7b321mhzSNWqOSNblgX%2BhuvTOe%2BnXkDvYiJzeknlqogMIm1UZkCe0gmyxoEWn7gBOr8VoZ5dGNJDWyfCpD6RSuMlwLt60PG8DW7xj2lz2tPYySXsQ%2BeD5QkgEOF46bPJHSkpRyE0JjDE2JXOBjqkAYmcF9itPJvTOH8R%2F33oqyu1%2BxwF91Jxu3np8vJqNhyPpDMcby%2BfiDKZWx3Mbo4kSh%2BN1IT2TQpAZrGfpB88u%2FRmC4ttQNkQa%2FQ0FovQBMJouq%2FNyFfjWLllQSHEQFLAIKpUhAsD8iHmBGbq%2BkcV7tao7KgSryl5N%2FGhUoyFup9K7cIfrZLBmoUi742Q9CUQER%2Bd11%2B8ESuEYhZE0dfnSJIeB2mp&X-Amz-Signature=4d7cf718c6bcd16c0fd3cfe4ff6b4b2b515c6320a4f4f7beaa8ee8f236909a6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHNFWEPU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIBQSw%2BsIqImSHs%2BQq7Lt%2FBnvjqx%2F3B7%2FnFqU0NHq22drAiEAjEoqwq8lgOMw8YuXssWgKNzG72KjbHFDQckt4VGNFq4qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE1RajSRVvkH8GqZcyrcA0B6%2BThhDA988KNtOkv1j%2B2jU9Tq9RXVYQ%2BLDx0dsfl6c09ZRqlmTgAybiDwJtzSOIFpNMhkqcWZabDoX6ZR3dxUVCf32SNG2bdt7jSBqsxj6Zoz6np%2BFT4Cde8nVwHuhu9gxykOS2DdEusOCLJVidgaXwszcs7djHVUwxUMcqDqxD%2BHBjnhVIhYMl7ky6d6XRpNOk5sVZHr0F%2FqDyIBLsYfszTrgRsJG3qf8794EUQ52eczorz72iSFjjMx7dxi%2B%2BMYWEJ5mWQFG2KE1cYZgekNuHOk9JbjhDHdLbjxCwzLh5X2KaPBr64snX2bAP8NiVu%2F0PLqGod47ERG1TVttLJ5d%2BaiN0tU59YKeitjJ4C93PZ69WkbavPK1n%2FYOWsW%2FoLOz7IdZkFHfOVGkgPFNduCzlQoffH%2BbZfDb8rn5PH8oyydvA%2FG6a6TwmqNJfCmUoffCI0LTNbJ0spvJ15dXWjvFQDLuZUrXexiCMxAEGOIcRv%2Bv713Jt3R4i7tcdMCUo0Q6A3bPUYqSUlsRy3oq8jiR9eBsPimqkWoQ1uYfHx%2BXI6Ro%2FiNqUoXKtXpNcpStzvgyBRsmY1gB4UMzlYWIjdbJB1CDAOh5LOFOC56Q0WJEcfa%2FfTqIWOw%2BuXuMIzalc4GOqUBGC6AO9fK78PVS%2FB%2BZutPKe2JneaAPMZ6%2F1WxhjtvwmJiFoU6KGCKxVdfm3MF13Wj5pxm0GLjS17KefT9R%2B0pLPVQXFp0Pom%2FnoWacA%2BB%2BS7ydwR%2B%2F%2BUV6k6i0fVzNmTfP6HU4NgV23q0B7oe48j0vkFQjYpzQv1xWV%2F5Vd0QO7vzxe9Wp%2F4%2B%2FfVd%2FrU0ivT%2BRmtn4h1T1CepZ7fAnsPxkacEcKlR&X-Amz-Signature=d7ee19cc59a8c985d60d3aade92e03fdb432fee8d32ec09718b969488126c572&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4KGYYIG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIFX0uPDxo3IY%2Fu6eV8G9BoL6ZfcSJSnvmb9QTX3SRDHhAiAyZxtds%2FTCCidswCtbtKfDg7eGARwu6bdJG3q1cckZ5iqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZOwUibzWQVCCbPvzKtwDdDvx%2FGU19GX%2Fc%2BRq5%2Fw%2BRPNaR4eVQKZMOLcRXMKKLIn89MKUNY%2BmKLVruCr3MgOePrnuTDrKDLIAKOWfqPFc0hAAy%2FO8oSDWHmcXSKG7P8YJVVeHCovIBVh1GGelIvI5Q9DZi4zLZtCv%2FnaLB5Syb%2FPjPxvhb4wmm4wjD0EPIfUMI7ZLkx6PyAzdJpRRLdnPRf4OTYMxTgFhmq49%2FYTJZ7Nu3GPt3fUcaxgCHjQ0pyCTsh%2Byqsobtiz%2BHy3TxsYt8t1X3zPGNco35G7cZNRtWD3Sw%2B3%2BeHot3qcdmJFqDDH0tl5gtUEkcB%2F9SFBfhP3LoUtUVB0TLvOiqXLbxHZcTklEmAiW9iasva2Npr00nkBydRAihftgKUquBndB26WbKSEw%2Bk5WdseA2RSwErljasSxuAlGihlcCQS%2FbTgZG%2FzNXjjhCw1Ve6VPs3xc7NvewKk14gN7cRZkkas%2Bz9XamFO%2F2ZMs2IrnN8jHyIJ17usdR0pF4bhxWww8WNry%2FUI65ednCqhZbSafmnA9c3nCuannp3qJ6dxMZAb5nJ4NUEiPsVIZKIl2IZPfwsH5oH5E5mhb6BDyiqzrYtOEWQjIVpF8YE5J6PmEcgdW4L4fqdoeIO7YJjPh4FyjwXIw59mVzgY6pgH48GGT7YJlP4kZJMvTgBOg7WL1%2Fekg5Bkipvz7U97TLz5vaylt6l4R%2BkD04XMiQkulsDsScPcxaIu9ysSBvhkKGjiHRkx7WsqPtZYnW5ytJmaaMyWjtjCLM8zmDz3gix8UAT97m12%2BG%2FKeF%2FPMUeqdDbZ6fxE8MOckKmgdQ5yHA%2F9g8JocvjlNgN8PyW52%2FDuECeKOKZMkGM8Qq6Ar5LB6DvJUJXCi&X-Amz-Signature=59e8970c7ce437f97c8c5bf5b58e87005748488decccd948960acfe2286e740e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4KGYYIG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIFX0uPDxo3IY%2Fu6eV8G9BoL6ZfcSJSnvmb9QTX3SRDHhAiAyZxtds%2FTCCidswCtbtKfDg7eGARwu6bdJG3q1cckZ5iqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZOwUibzWQVCCbPvzKtwDdDvx%2FGU19GX%2Fc%2BRq5%2Fw%2BRPNaR4eVQKZMOLcRXMKKLIn89MKUNY%2BmKLVruCr3MgOePrnuTDrKDLIAKOWfqPFc0hAAy%2FO8oSDWHmcXSKG7P8YJVVeHCovIBVh1GGelIvI5Q9DZi4zLZtCv%2FnaLB5Syb%2FPjPxvhb4wmm4wjD0EPIfUMI7ZLkx6PyAzdJpRRLdnPRf4OTYMxTgFhmq49%2FYTJZ7Nu3GPt3fUcaxgCHjQ0pyCTsh%2Byqsobtiz%2BHy3TxsYt8t1X3zPGNco35G7cZNRtWD3Sw%2B3%2BeHot3qcdmJFqDDH0tl5gtUEkcB%2F9SFBfhP3LoUtUVB0TLvOiqXLbxHZcTklEmAiW9iasva2Npr00nkBydRAihftgKUquBndB26WbKSEw%2Bk5WdseA2RSwErljasSxuAlGihlcCQS%2FbTgZG%2FzNXjjhCw1Ve6VPs3xc7NvewKk14gN7cRZkkas%2Bz9XamFO%2F2ZMs2IrnN8jHyIJ17usdR0pF4bhxWww8WNry%2FUI65ednCqhZbSafmnA9c3nCuannp3qJ6dxMZAb5nJ4NUEiPsVIZKIl2IZPfwsH5oH5E5mhb6BDyiqzrYtOEWQjIVpF8YE5J6PmEcgdW4L4fqdoeIO7YJjPh4FyjwXIw59mVzgY6pgH48GGT7YJlP4kZJMvTgBOg7WL1%2Fekg5Bkipvz7U97TLz5vaylt6l4R%2BkD04XMiQkulsDsScPcxaIu9ysSBvhkKGjiHRkx7WsqPtZYnW5ytJmaaMyWjtjCLM8zmDz3gix8UAT97m12%2BG%2FKeF%2FPMUeqdDbZ6fxE8MOckKmgdQ5yHA%2F9g8JocvjlNgN8PyW52%2FDuECeKOKZMkGM8Qq6Ar5LB6DvJUJXCi&X-Amz-Signature=95245d62886a152cd361521de714a7bee08d493920959089599f1074d69c5102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3PLVQUZ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCEnRhlh9XXoSADkNRLPEO0JietlnMrzIr4bHsYq%2BOUCgIge%2FRx18QFyjpkSmDl0%2BShr9cySA6rhFH6tu8Baq2F0XoqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDVEB0jSYDXSQvTdeyrcA%2Bm%2Fq34HUdBtCaUJrMBlSHGUEOp%2FtEZwQzABNiE4dWsmgO1ttnCyUGfhb7ot1XShp%2FgYglAs02AWjl6kfqxPphAsal4fsxhq%2FhpQxD6u0BYXOX5EMJWfXw7czy3P6yR9vw3bmeAVDwHolMoO9zuIu2pYMYJTct3fBoBtjtR%2FfnMhBq2oV92J59lRkxJVHLnHz0mr8lhO3ugi1Fgwif3yo86VY5Dq%2F0r6%2BJH7RjiWXV8%2B%2B9ATd%2B0IBk1vvEgHWFI1V5cuDb6Sn02gWhwN9Aq7dw%2B%2FK4OBBUzZht7Q83VcdMSzRiQdErVMtXm%2F1ethKL5n9MBXFr8Zm8CUeKN8Cu3o0lXfmYjUsI0UpMVSaZxTBExnqjjXVOPTL84ItqGSsNB%2BydFK9grCjsVtzbmBbWH3vy2WxfXwS1JP17MqggUeEQi8tnhbJ6eNWjSJoB8TgOyNg1%2FovF%2Fg7m7lXSAkyr15OhVKQQ7fWTZfDz%2F1YE3QGy7LtDtsDm35C3VZcqNOglJeOnd5D82OzioVJl7k%2FNVoLUkcDlTnJ5Unecb8waqijx80LLBQutylTF4npKZxFBkt9AkKAgb53BrLr4zLHaCTbj%2FDDlV0Q4vJPltWHzW1iO%2BJO0KOTL37WxU6vYnVMIPZlc4GOqUBICku62ZxLTFCX1QQcMFnMsMbkGrQg6sa2jeShF3cNFgfGhH2PnL6zv1hJy8IdERrgEzPs5GVYCnGH6c3DZsuT4%2B9sMsdkvKJ86WU2r3a2tekvRH51l1oz%2B0lQwrCtUjJ3aJ8jeN%2B2mUru7seoft53sEjJIHxNjep%2BSEA5HvTWUAzOtaqwu7jc%2BTXoKwTfOyX7dOXB1BStKO5bXWA7hsBNQ1caa5Q&X-Amz-Signature=7cccb5a100ae1f4c4e87315363747701b5986bc23d3e1ab3f526e248045e3f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QPPN3GJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDzBGQV6Bq%2Bk6byzj5iIc3wdesU5f9Ksm0cNDQUICDkJQIgHGOH975cwAHkZG4AjpnJsn%2BHvyv8TiF11qLbx0%2FXlO0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3Nh4qMEhgbYKmnuyrcA33LmeLHDA1Z3bGmaFdiVT37gpflS%2Fz331yx%2Bcj1qZolr%2F5RtTNAs9Z3WPQY1X2VuzA7mABS6G4t2QHP69CVUZQnF3UvFQ2ncRM4qEqJHgwedJTpN3aLBnJSmLN1iV7ktd%2FGAfgOEnadqO5O%2B43lUWAPhSZhhyS7i8kuE%2BOalHmy5pYHvmT6CS%2FwDOXNbL95sXePIKaAA6BRO9PCM5gmpe%2BPj%2FaJ3wOJHBGN%2FKaVf6ya%2FtiCi7V39Pbi2nIg4pLzDZNPAkoONxWA98HphsmMBCqO71cUuEx2GSICiInSBhovsNUtnxhVc16E%2FHiso3uARpi4snKUMMLpyskHO7eGrovVHbIVYGErJI5adh4OK44y7snPHyxMwjIFcrR3apeMHYV1BjMlW1X2%2B8FxB%2BafHMKl0bl1TPJRpXO%2Fae9f%2Fikl%2FOysUJ8aTJuqOByvQSRZnHVKBaDcCaMV2T%2FeOOEyUHmumQVS3wAUzNNRbRJLhNJDb5UeR6%2FqKFeeT%2FtvS5HyWyUlsd8RWr%2Bb9RI8vD9LARKscO%2FzTIqbIr1hmDI5fCwFXs%2F%2B3aqcyJOuZfFPJ8XxFyHlk8CVa4fcAOXkw6klGqUGolU7NQSSGwzmbvcc6CiYJ9TKV1pFvvYEVGt6MInZlc4GOqUByHCTG9hprzc7L4NNhrGak1sF6%2B3x65AUSm%2B8WdQipANjBovhQ6nU9Y4mwGscgnlOTKp4p1APUy5MGviOxzIwY9HeXISQDaycUTgPZKqJ13IY8a%2FmSOh7g%2Fdb5KThjW78aTXYSyTHXgS89dprOBG9xTq587tm%2F%2Fg%2F165Xqnt3vgavYISEwz83j6I7fsWObvolshd9Ou75PqJ49m9VYqVvjiA%2BPeCh&X-Amz-Signature=1a53a070db1c0292881dc558cb4754468a3c73529c8c3b967a51577cc5e038d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QPPN3GJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDzBGQV6Bq%2Bk6byzj5iIc3wdesU5f9Ksm0cNDQUICDkJQIgHGOH975cwAHkZG4AjpnJsn%2BHvyv8TiF11qLbx0%2FXlO0qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3Nh4qMEhgbYKmnuyrcA33LmeLHDA1Z3bGmaFdiVT37gpflS%2Fz331yx%2Bcj1qZolr%2F5RtTNAs9Z3WPQY1X2VuzA7mABS6G4t2QHP69CVUZQnF3UvFQ2ncRM4qEqJHgwedJTpN3aLBnJSmLN1iV7ktd%2FGAfgOEnadqO5O%2B43lUWAPhSZhhyS7i8kuE%2BOalHmy5pYHvmT6CS%2FwDOXNbL95sXePIKaAA6BRO9PCM5gmpe%2BPj%2FaJ3wOJHBGN%2FKaVf6ya%2FtiCi7V39Pbi2nIg4pLzDZNPAkoONxWA98HphsmMBCqO71cUuEx2GSICiInSBhovsNUtnxhVc16E%2FHiso3uARpi4snKUMMLpyskHO7eGrovVHbIVYGErJI5adh4OK44y7snPHyxMwjIFcrR3apeMHYV1BjMlW1X2%2B8FxB%2BafHMKl0bl1TPJRpXO%2Fae9f%2Fikl%2FOysUJ8aTJuqOByvQSRZnHVKBaDcCaMV2T%2FeOOEyUHmumQVS3wAUzNNRbRJLhNJDb5UeR6%2FqKFeeT%2FtvS5HyWyUlsd8RWr%2Bb9RI8vD9LARKscO%2FzTIqbIr1hmDI5fCwFXs%2F%2B3aqcyJOuZfFPJ8XxFyHlk8CVa4fcAOXkw6klGqUGolU7NQSSGwzmbvcc6CiYJ9TKV1pFvvYEVGt6MInZlc4GOqUByHCTG9hprzc7L4NNhrGak1sF6%2B3x65AUSm%2B8WdQipANjBovhQ6nU9Y4mwGscgnlOTKp4p1APUy5MGviOxzIwY9HeXISQDaycUTgPZKqJ13IY8a%2FmSOh7g%2Fdb5KThjW78aTXYSyTHXgS89dprOBG9xTq587tm%2F%2Fg%2F165Xqnt3vgavYISEwz83j6I7fsWObvolshd9Ou75PqJ49m9VYqVvjiA%2BPeCh&X-Amz-Signature=1a53a070db1c0292881dc558cb4754468a3c73529c8c3b967a51577cc5e038d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667R3XQVB%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T184506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDSohIE070oNhV5HbRvQLZDLth3Xw%2B8h0i9PDzdH5pVawIhAPKGaMlIPHBwEeFXfYWcP07RiYg1krwv7qRWC6u5sdL8KogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw0XJmSjNtFENNQEp8q3AMWOS%2FRGj%2Fn2o4VrIiieBfhgn9gzAq%2FEEbICmU%2B9e6TkLyn5XZBZEdp5UYnYR0ThCSgy3OFOa0n4nCFEjsoGNhk3H0p3YD3cdwdR9PSuXUsc9VB1XIJPE%2Bj66xNx1JWF3euwVEPMXqR4%2BffAF2q1TJR3RRzk24lKI63%2Bes3ZY297Q4pzqbn%2FImF2R0nqkxxx%2BsVTneDpyg2QY043CpVf21weOmUeHu4e6TzG%2FpyF7mWEzIxDyruunKbRIKk9gfqR8P4lLE4hoF2%2FBrg9SUe9xKDedB5RtwbHkfByObtw7%2FLv6p348JlMdaAl2MXg1Pwj6bsDb3bn1XG4QVWzgzS7ZHbHEhZPVm9qfvqe%2BAZ8To3O%2FrQwMvZAOfBDnuBrl2Azvx%2BGQdYv%2BFUpwKoBYdIAZjlc12eBwn0tXC9LxGL2t5Gumw1%2But5gaSyUknuU0v5jhYHgXlpwUEMqtWhFj7FuhreHnys24FCeaUxegbO0%2Ba58ROkrmtMkdITTckEdp%2Ftbev4IbVgpXOqZat1YJXELaAacX8PnhV7U8Y2A4fZA%2Br8Bz%2BOvGHzums%2FRxUg8dlhuVNjCj6HyrbqifBQNAId%2FNLnKJlLGnBvzkflZnUxWFDqy3FcYKLARuMuw90BAjDV2ZXOBjqkAVRFQq6rYQzihpIinQBJBG%2FCbe%2F%2Bp2ViiTKWUL%2BXNn1lmR1DUbEjhYMIeuBQCXWvXfSoL%2FcrEO4gjpIBamCE4lvz2vAgebm6xb97Rk2m1luXMx1DB7A3CA5SR6cevMBQ0Z2LsovLYSFmvvLQb8rRZSW%2F%2Flmembc5RuZ6wcMYcdY67eypJk2y9czx7Iy4Ij7pKn8RMkLso5dQrxgoHq0DumimmzRY&X-Amz-Signature=2054ec622e2ee72be9740df4cab8bbe3124881421dadff423c3bb3e071b386c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

