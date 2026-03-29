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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYFYAUF4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDMO7VtrwxQ5ih2pmw%2Bc73sHek2Y1aoXNY1eWgSNveqtAIgWBCZBBGjQ0xk7b1krl3Vu%2F%2F0GnjTkTf2ufD0DJZrJEwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDNaraef8Q4q1hNrv%2FyrcA%2B7L%2B0fgpJ2dybu6nKlukpxnrskJm4WLi8Jwbly0VLK59eQ%2Fq%2BQrq9BssvNga9WDM%2B6opYzH09yQAxDYPr4g%2Bj4UquI7J%2BJxytn%2F0UmOiBXGIeuHPi7y%2Bi%2FWIJfogZ8hTdDI2xF0v9w2vjR9jdfFihQg%2BIJVeHN8jYZhEpmVbydQx%2BW5iROdmOQAEWdMqetoJla9Br638%2FWbmKFzyrJE1HLPrgHciEQ1QIyomPobbRCE3qty3eVoCQ3OvC79XUupl7bjzpKy%2Bdqx7YPuPwflZbNDRIWHu3wPjrCTHw6NIAPhj2OudiarYYeREPtiuuNAzV1EhRpDg8mDsyblqd591wF1yIKUMIs9IRsPN3odKgxwwyq412M21k371IKQzLDHyS%2FHkchNKYhPnYcRdRmkgN6gODxKThduIWPkga6a35e6jxkFXQ%2FfU%2FC2s1DJkxg82N36NzODjgC6IgrRMDoi%2BTeIky%2F6%2Bko2s0ONHzlPFjDePkxVRj300KIwb6p48bZRIRxhVJ3EbFUraMGorpDxa1C7rGy0Skj%2FMHizBAlTVyS1WR54Lg4uFopaxbpkjbEjVzqCtve73RVq3uEOFfy7ieiaAx4k4Ya9FvUVwdPWDopqFRYyAR1fDvvrlS1cMNjso84GOqUBLiRt5T912rYAHeWfTNXGhX%2BvamRaylWMKOYM699p27X0gvwJ%2FUP0r2u5rD6jl4Z7fqGWBrFOQnfrw89gGV8rsUTmJHHxgQM4ICx5Q7SsU7NCNosI3Tav5fwNaf7yLyGdhFP2kE%2B5gKaXWBZora2QxT1jKtXUMjY5%2F5QvcXl%2BbFxe%2BwkOiakN5REESl2cZ1Y31jLt%2FRyCK%2FTarNrlmPmfGOK9n6Rj&X-Amz-Signature=6c8dc0f2a365d36e30757c4e29a2722563781bdaef6e35aaa705a37ebd1743ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYFYAUF4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDMO7VtrwxQ5ih2pmw%2Bc73sHek2Y1aoXNY1eWgSNveqtAIgWBCZBBGjQ0xk7b1krl3Vu%2F%2F0GnjTkTf2ufD0DJZrJEwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDNaraef8Q4q1hNrv%2FyrcA%2B7L%2B0fgpJ2dybu6nKlukpxnrskJm4WLi8Jwbly0VLK59eQ%2Fq%2BQrq9BssvNga9WDM%2B6opYzH09yQAxDYPr4g%2Bj4UquI7J%2BJxytn%2F0UmOiBXGIeuHPi7y%2Bi%2FWIJfogZ8hTdDI2xF0v9w2vjR9jdfFihQg%2BIJVeHN8jYZhEpmVbydQx%2BW5iROdmOQAEWdMqetoJla9Br638%2FWbmKFzyrJE1HLPrgHciEQ1QIyomPobbRCE3qty3eVoCQ3OvC79XUupl7bjzpKy%2Bdqx7YPuPwflZbNDRIWHu3wPjrCTHw6NIAPhj2OudiarYYeREPtiuuNAzV1EhRpDg8mDsyblqd591wF1yIKUMIs9IRsPN3odKgxwwyq412M21k371IKQzLDHyS%2FHkchNKYhPnYcRdRmkgN6gODxKThduIWPkga6a35e6jxkFXQ%2FfU%2FC2s1DJkxg82N36NzODjgC6IgrRMDoi%2BTeIky%2F6%2Bko2s0ONHzlPFjDePkxVRj300KIwb6p48bZRIRxhVJ3EbFUraMGorpDxa1C7rGy0Skj%2FMHizBAlTVyS1WR54Lg4uFopaxbpkjbEjVzqCtve73RVq3uEOFfy7ieiaAx4k4Ya9FvUVwdPWDopqFRYyAR1fDvvrlS1cMNjso84GOqUBLiRt5T912rYAHeWfTNXGhX%2BvamRaylWMKOYM699p27X0gvwJ%2FUP0r2u5rD6jl4Z7fqGWBrFOQnfrw89gGV8rsUTmJHHxgQM4ICx5Q7SsU7NCNosI3Tav5fwNaf7yLyGdhFP2kE%2B5gKaXWBZora2QxT1jKtXUMjY5%2F5QvcXl%2BbFxe%2BwkOiakN5REESl2cZ1Y31jLt%2FRyCK%2FTarNrlmPmfGOK9n6Rj&X-Amz-Signature=6c8dc0f2a365d36e30757c4e29a2722563781bdaef6e35aaa705a37ebd1743ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMFMW37N%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCICIAL4qy2NlgW8q076CwnjkFNEuFD3nP%2B5Egm32PVq1KAiEA%2F8i%2FOp%2F4Yi7soJWGirEvXyf7wAXXGi7CIIuUnRJ3iVAq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDPV8YFKUgP4KcnmJXyrcA7krPHbj2O7uw7GF4ikiHzBtkWJOkXOuWg83uKjTKDZdkeN48un1fVvuDGkhij8heL%2FUrZUOuKLtc37FuOf8y4V%2BfJTluBsqPGw9KOET4JUSjs2WuP%2F768AcAp6SgLtV66FN%2BFgxL6E5kBtdVMOserYuyDjlw8iZn933cru31DEXXeuTiUbjpedg3cQIl%2BpS4iYcUEwIbVttCcM5JjieqiKr7zD24YxyjXrZgXIp34%2BZT6jRHc2g1apf5roROzg7tLcOL4rpC2oSvyXTQWvAbI8kWrPQCoOW5rmCb%2FXkUUPn6lGxwYy2zDdpN0f5vKYehKH8B4jidBh7Di91Jv0bjzJ51F7rX%2FFn1TSAdD5OxUmwQRo%2FQuUro148FievfS4vlr1SHLabPGmwdB18ToA7zn6OfRIZWNez5%2F2ru%2Fp7TVQO4tpmsndAqq97AOt7qmc8zVZp8OW8lISgGZBAtQfQdzlG7rm9o5kTOkssAc94grftG3%2BHirPe46p6FrbkF6nR73h028pNpvBUqlcKNA5h6VBKcyvBlL6RN18YrMf0TTbU9QMXW5yMMUqfl%2BG58Zb%2FZU0HdNvLjefMxTFXEn9R1M4LXg5MEAHg0raJQYGzfb69R8lN02HnteiEfwjkMODso84GOqUBZsio7c8DQfqJkRgUtyvr1WL4cLdb%2FAD9ZMwoNe9oO39VbRINj3jeUH7jJLDr9e25FUFL8TUfwQju91TLu6i2jAVV7%2FsyaX58hYGM08M6L8PBjaiLii%2FIsxKjiwn4eawSN7yE5sRPBy5r4Tr571U92bnMC4XSwCfPyqKJPZtVIDUMxeJ7ieCEO%2FJrlm28O8ux7ypDR07E47pNmbkpsHLkwoVl3Xh8&X-Amz-Signature=584a150e6f7d13519348c86324c9b9177cf08b05e727ad559f4a76c8f17267b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2TW7U2Z%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDE8yUV7E10to%2Fq%2FhGqdNHGK%2Ffmi4SYAwlkDALuGaa45AIhAIbbktp19OHCwCp%2FXe5BmfL1Df7ftkGSLCL1IRhPZBvBKv8DCAsQABoMNjM3NDIzMTgzODA1Igz3Z%2FC7Ha%2BTKkCFVOQq3APywJDv%2Bo3uU805rEp0uWPWD5ip2HWTUBN0Sj2S3%2BKhIX6mwONQMeYLGqCNtNf1CkmlI%2FNmj%2BaUbdMuKP7b3NxuB4J6zEtWsOTGYYuSW4daTbd1DBU80D2j3lEvuFYI9tg%2Bch9Hom2kJj4H3mZ1UP%2BP%2Bijgh2%2FZMrY%2F0Ba72zzE8%2F%2BMj3WjWNyH99AGFqwVQQ%2FnHyop1O8CJeyLXGjpsW3T1NR71cOdCoiOx156uz%2FnmINuyUdBI2h%2B6NsXYCZZm1BGRcaxcnu7JbbI4Z%2F7RCdjldUjB3Ee91ZyBXzICVrQPYa%2B2RufRZC7mb%2BTdOzQyGUB6XntgbM%2FiDnrUV77Ia4KXvg%2Ff20iP6lwQD%2BOk2suKbfwKnEGO%2BtVfUimP6vubcjziOX%2BAHBxENj1kuJ7m8D6AtJdZX8O2KQ1QQRdOTsk0N8LvmmVyz4mCyHGuFJY14fxoCQkD1D2yhsxfcuKZ1k0CiM%2BB5VMtrY%2Bgo6xflG7bDH87ASD0K6qYu9GTCwM4Jact3%2BKjBkyp0oo9JJISYy%2BHkTfkk%2BMwCYWl2J2t%2FwWepPV86RUn%2FRR%2BLkkC6QcM%2BiH%2Bn4B5CYrDzDADbwvDXH%2FOGOORjmFBfxqGnKPE27o0uyAWfq8n0pcOX5EezDG7KPOBjqkAWDt395ZLffpoHA0eTUlXSIRic0QMpXT2a%2F83OdPXYdRbEL3T9mOPPpdjyeQSFOhM19ruKqFoEbXE%2F%2FBxqFOKU2XoJ8nY799sj9wRRp%2FW%2Bx06IIt9eG2c1T7aVtDWh9C9SfjhbRk79OskMehFrm%2FsFUhJP5ZSw6VHlPhenl2aST1PexgR1P7hbw%2F%2FiyCXvJnT2%2BkoVywoq2TeYJTtHjehzRMa8tI&X-Amz-Signature=d9b821e1779deec4c473cd286611afe4a082187313c90751f536eafe00be2e07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2TW7U2Z%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDE8yUV7E10to%2Fq%2FhGqdNHGK%2Ffmi4SYAwlkDALuGaa45AIhAIbbktp19OHCwCp%2FXe5BmfL1Df7ftkGSLCL1IRhPZBvBKv8DCAsQABoMNjM3NDIzMTgzODA1Igz3Z%2FC7Ha%2BTKkCFVOQq3APywJDv%2Bo3uU805rEp0uWPWD5ip2HWTUBN0Sj2S3%2BKhIX6mwONQMeYLGqCNtNf1CkmlI%2FNmj%2BaUbdMuKP7b3NxuB4J6zEtWsOTGYYuSW4daTbd1DBU80D2j3lEvuFYI9tg%2Bch9Hom2kJj4H3mZ1UP%2BP%2Bijgh2%2FZMrY%2F0Ba72zzE8%2F%2BMj3WjWNyH99AGFqwVQQ%2FnHyop1O8CJeyLXGjpsW3T1NR71cOdCoiOx156uz%2FnmINuyUdBI2h%2B6NsXYCZZm1BGRcaxcnu7JbbI4Z%2F7RCdjldUjB3Ee91ZyBXzICVrQPYa%2B2RufRZC7mb%2BTdOzQyGUB6XntgbM%2FiDnrUV77Ia4KXvg%2Ff20iP6lwQD%2BOk2suKbfwKnEGO%2BtVfUimP6vubcjziOX%2BAHBxENj1kuJ7m8D6AtJdZX8O2KQ1QQRdOTsk0N8LvmmVyz4mCyHGuFJY14fxoCQkD1D2yhsxfcuKZ1k0CiM%2BB5VMtrY%2Bgo6xflG7bDH87ASD0K6qYu9GTCwM4Jact3%2BKjBkyp0oo9JJISYy%2BHkTfkk%2BMwCYWl2J2t%2FwWepPV86RUn%2FRR%2BLkkC6QcM%2BiH%2Bn4B5CYrDzDADbwvDXH%2FOGOORjmFBfxqGnKPE27o0uyAWfq8n0pcOX5EezDG7KPOBjqkAWDt395ZLffpoHA0eTUlXSIRic0QMpXT2a%2F83OdPXYdRbEL3T9mOPPpdjyeQSFOhM19ruKqFoEbXE%2F%2FBxqFOKU2XoJ8nY799sj9wRRp%2FW%2Bx06IIt9eG2c1T7aVtDWh9C9SfjhbRk79OskMehFrm%2FsFUhJP5ZSw6VHlPhenl2aST1PexgR1P7hbw%2F%2FiyCXvJnT2%2BkoVywoq2TeYJTtHjehzRMa8tI&X-Amz-Signature=bcd0349ce91ee116821e7f7da42443584630942c50a59f9d828f93e0a2ea4d38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7AAYHA4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDZMRkBN7JeT9mORTCUpjUEsdQFVjj7u4SW2boDiyMvCAIhAJqxA8LDk6AZqAvbAxJGiUD3VIUkwutYRdsGtxeGzpmUKv8DCAsQABoMNjM3NDIzMTgzODA1Igx5PntuY%2Fsck3ucP3Mq3AMnVrQCxgNe4YsfKt9bZEKKwM09pxdL3%2FUav9jtTG0HzQ5hJnxCE9io4fiiguv7jkF68cPniwNmc9opebCW75nww56lMQ84dKz4rVmObb6K7%2BZmU3Ilpe8BBokeN7ShZ29dA90C0C6%2BsjU9jXS9I4ldxpIgMBUgBUZzj4W8CJiWk932orux4B6C65PWPfDBb%2BM1Cgxjixn%2FiglEgXWDqghsKLJCUjJj2dh%2F2gsM8dwplBoCE3YyL9NmVIgVcz0YbQXqSdVNTOAwBb1s2nNT7AmaE%2FYfDnK%2FRTu7Q1wcmB7mOXdyWRue9xAEGNLsYwsrrwPGA%2FPpAyfkQCOWHgzWFKtkTeIqWkaP7Dp69tZFtkd2BmcQOZiXDqWPQ4XFW75M0N2AX%2FyVHPXJDGJH%2F7F8mSsLw9O4dbM%2B7q6dHrArov6U%2FnewqJR0Ad6Z1H%2BGkU1uvTFbOxoWVNY7v5Qa4V%2FZOO5bE6JrVlPOFRgHk1GMlFRX38GMiGkEW74z3pq2%2BRC1bj2AZikeRzlETDlvn7TQgCYv3qXIEMZ6jWIozZjPM47OB%2BuWEXp8YNf5Ok0EeyBlPP3WYrTvZxXbRcHSuV0gfhMAiXeA5q%2BQRkko82Nk4M4w7%2FHnyXlt2ThxP2%2B8CTCl7aPOBjqkAfjNUEbS1jvEYy9gjMuA2D8Q3BhAFGp7qZogK%2FDu5fqqixgvKSYrrvnvJDrWHeuccvqjUJxc%2Bkr%2FUHetgjtNmb3iL8AVCGZ7jeycRRrQ3tmEOeUGeTpDAz9m6h%2BQbi%2BOi%2BcnY934eefg7FqaZT%2BSy19O2NBUx7XYBv3f2aAClbvDuMmVL1oOvy1XJ8gzzIKQ%2FXVrJbXEXfwgLb1YaQHCyYPVqsU2&X-Amz-Signature=a6d2171dcd087ca1e3ab53327fef41484a02c0dcb33a2f9f42d42dd905992a2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNHCXXC3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDI68f88GWUgpiFc7epX9PsG6GElNsSiLxs3kR00QfjJwIgMGK5hW%2Bo%2FB4afAJaimpc0PSa2icLaz%2B2zSO5YOLa7M0q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDHvAkgd2ATJ9WwaDVyrcA%2BZbknSzXD%2F5uanYbQKwQSwt41ePZwwU2zcFjDDjLDreRAjeXVL4EMlv5%2BH5Flc7LZ6KY84ov2kF2yj%2FjGG%2Biia3x%2BnfnXGOoDu8AtwHQtI5WsDyAXBxJp4Amz6KcTX5xSN717nEWRU6KZTi54rBj%2F1pTWY35c5hMZMRyxpXpZwY402O%2FKeVifjxPs4yoHVjfPiMACnQY6z2gp63LNPWx83CdSPJ5H4HOfLy%2BMpTe52S0XCMFkXlgpkrvUL%2Bqo65ZecfhxY6yAg%2BQWGjihx5N6KERH8%2FGVK378i%2Bvt4nSOxbbahGO6aiwImjOSElk%2BBbne%2B2kWlvCLCsDJCU0UrxkJQ5AN%2BDeI6vTr6gQVEfPXmtUnfjvbm8ht6Tg69ke6bGkiGGdpd2XGCgy0y8LIWdCcvBQ%2BkCwaoctm3eNRBZvMUdUbpptLcm6B%2FPL1wwPy%2B9vl2mXwmZs7%2FfEqWn1L7FIbOCNJwSGaUsmu5s24a9EO5hvOiqlu62SjssXhp2D9Uwx8TbszO0j39uK59Yj3iCCbYbS1cgm%2BQNoHEIIWXRLhI1D5nFs%2FAsKSM8CmeuIQH%2FYBkPmU%2FLM70GzTIsg4XeOX7wGLVa%2F94BcTKo9GJ984x22Y0cq625I0%2FO3L1hMOXso84GOqUBcu%2B7Gmd4x7lRB3MmxuPTmyqY6GoXhNR4pcsfppuavDM%2FWdky6daJoCX1eqZLZOUJjwmE5Qv6SL9250cqCvfcfjRKZ958BItJYBUGbT7JtOZEXiyjo87AYrJtWrvTFO%2B6gYm0K3ulEw17R7qZ0q%2FyGAP5w8dPfHGQKeTAWH2QgWjS4UuN%2ByTC1e7oy3nGEskOcWvnoeEFpvOnE1ErnccjbqrBfM7N&X-Amz-Signature=dd653fa5823ec7a5d2445d9c7ce91058c76468e447a4150a98959ed0a24802a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667S3CV46L%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCXm3Mrl7353yXfR7l7AMytzBcq1TbAUwybvX0szQYH9gIhAO1HMU8ftzda2XkRQ4R0%2FTh1Br7rBG75gw2NC3m%2FJ5cTKv8DCAsQABoMNjM3NDIzMTgzODA1IgxlrTd2Dy2bDzFADJUq3AN4i1rgov0Pfz9ktiM2BeIVSjI0zC09jNNnKUWMIfrRxYV0xvJnUJV0PkjcnrDTZ3HHGV2qMcTJKJwy%2BQTe39lJ68Uv5%2B9uA8vhUdoDZi1mxywNE09Bn3tq6%2FPqSd%2B%2B8YPhc0jmwDkctcv5wOd9ERI5i6jW0SEFYL7rqp9wLHOLnj1cMjxbdsS1YE6pPR1crJz%2BJGFhs59br3rzJGCyEQrHj%2FVF8eYZHrj6DvHYydPDpi%2BDIMM59xCVYLscD4qbdmEd9OA63QOuJ6fiXF0hQ8AThgDhVe4N4pTBnLDBKm5ZgmyTbXD3Hz2jvLCwhVa1pdgiSprp433LwJ9lIqqnNCaO4R4IZP%2FpTSPwZMOhFfubLloi9ByMXNi7jJJMSt%2BLr8N8e4RG%2BkgufwEzmsWnUsLuY58pG4UN7OTauVjJJRf4OWhP26fvBslmlpbkly4Xk%2BDmg6O1obDT7%2FQQyKcB0FZG5IpsYm%2BQEGNcnG146aH4olIRaAoJG%2FidznNr6X0Qf1yUPhQfAOpqP%2BItuzTC1CBIzUJB5r%2BwARo%2FCUTSoy8%2FwXKfWN696WZJ4xv4R9JnqDmZdyDgLJClQysutIoy35ZLoekBivzCkh5zhlS%2FonYWEceif1xVK3HLjYC0OzCf7KPOBjqkAVWL9DxXlE59F9MJl0WfKABSJ0F0wano%2BgWUTeuIruJK24A937RyovW1fTkqApnqLEguDbs9oJm%2Fp943xGluyKbi7a3hnLgqnX0xGoH1DUfD15t009jw6FSc%2FSUL2gqnIMRfRKRdUM2z1JrVIkMLwHpKfV0Kp8nvICxfUEKTetkPHbe3hI0bzTC143H7dXj2TaSPSJnXV%2BDhy98JC4jebaVAps5O&X-Amz-Signature=a0863fc56ee745c9972189d5dca57df22b437739d71bd12168395a01e3153aa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4DWYIAM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCuQzEkeF%2BjCCzOvaGcLY9k0gV8IKr4shVRnDbXfRjoPQIhAP9lv1LOM1wg0fLVOPgVgcePuEaxm2V%2FrfmLoHOgdX2HKv8DCAsQABoMNjM3NDIzMTgzODA1Igyr%2FZVEK1X9SWwaCaIq3AOmXtOOUefAOy%2Bxo4A9Mw2YALE8HYVbeMIjYsKWr3D7mMSp8aS9yim5xlQjAq7W%2BrhQCpgJgpeON2rHFPnegTOUpYd1kd3KELc2rOnn9msgR%2BN%2BNpJMjNzu7Bn7u8A59OY5HmVQ0OFuOkZC4pT4czUCpJGSf%2FnGCChZBpELhiaWlEmbLevAOdI3qPHoL0bFs4e%2FjL9%2By5rVvVSBObSe1xPyJHUpQBsUhdbk0AAHyKMRLR9weezU6349iHC5urUBEuIQU8gcqYUbgSGESrFy4xGlbIYupouHlzVh0d93lsGiTunauz%2BRs3Sx0xXkxAUtWeLP8uA5j5FPOw%2BCpyt6Kgyn%2FyXg36nwv7p6UWu4rqMN9aC3pVzyVb%2BLahcq%2Bd%2BYZEYDrRMB2sWxAujLXcW0JDhIp4iOTJgLoJ8YyBgPGd6z2%2B7hr0Y4o5vPV0%2FbfmO7eAsHM50TPMbh9LLUJ3L0wj5J8sX0OVfXA5rxl4kNWrFPdV5XkeBhvEDUCEBVkfy1SgthNN1AJoNugUd%2FqAHpmrk9jpkejwOeeb3lYdq80PcuFbEqVy8%2F%2F%2F1kWusddPUp97OhIAcMx8s0mJmETxM4kznDZEpJjBFvVO%2FLujXTqzfdU%2BqBFKHl6uNRHuWxKDCH7KPOBjqkATyzaBTN%2FwzgikmXy68N2pUPYxHS9MYpFWsGS960a1PwEB0byXOQU2jiXx4gGfd%2BjfGkYvcbL8pmnZxE%2B5sykba0K8wrLiWZz0UWsSyFQ9fugCsrHVi2dqJIexLbZ8NgrqCLa2kDlgNTiFvD%2BOZqYR%2BqioGamZxDs9nFiuUR9oOgu%2Bz1D4IY9IxCP0ATnZWw%2FYlt90PRqwkvKZ5CE0nOrHuUEViB&X-Amz-Signature=7acac65edfccf82aa5ed090efd25719db74fcf00d707f305157d4de4f57fdc2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4DWYIAM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCuQzEkeF%2BjCCzOvaGcLY9k0gV8IKr4shVRnDbXfRjoPQIhAP9lv1LOM1wg0fLVOPgVgcePuEaxm2V%2FrfmLoHOgdX2HKv8DCAsQABoMNjM3NDIzMTgzODA1Igyr%2FZVEK1X9SWwaCaIq3AOmXtOOUefAOy%2Bxo4A9Mw2YALE8HYVbeMIjYsKWr3D7mMSp8aS9yim5xlQjAq7W%2BrhQCpgJgpeON2rHFPnegTOUpYd1kd3KELc2rOnn9msgR%2BN%2BNpJMjNzu7Bn7u8A59OY5HmVQ0OFuOkZC4pT4czUCpJGSf%2FnGCChZBpELhiaWlEmbLevAOdI3qPHoL0bFs4e%2FjL9%2By5rVvVSBObSe1xPyJHUpQBsUhdbk0AAHyKMRLR9weezU6349iHC5urUBEuIQU8gcqYUbgSGESrFy4xGlbIYupouHlzVh0d93lsGiTunauz%2BRs3Sx0xXkxAUtWeLP8uA5j5FPOw%2BCpyt6Kgyn%2FyXg36nwv7p6UWu4rqMN9aC3pVzyVb%2BLahcq%2Bd%2BYZEYDrRMB2sWxAujLXcW0JDhIp4iOTJgLoJ8YyBgPGd6z2%2B7hr0Y4o5vPV0%2FbfmO7eAsHM50TPMbh9LLUJ3L0wj5J8sX0OVfXA5rxl4kNWrFPdV5XkeBhvEDUCEBVkfy1SgthNN1AJoNugUd%2FqAHpmrk9jpkejwOeeb3lYdq80PcuFbEqVy8%2F%2F%2F1kWusddPUp97OhIAcMx8s0mJmETxM4kznDZEpJjBFvVO%2FLujXTqzfdU%2BqBFKHl6uNRHuWxKDCH7KPOBjqkATyzaBTN%2FwzgikmXy68N2pUPYxHS9MYpFWsGS960a1PwEB0byXOQU2jiXx4gGfd%2BjfGkYvcbL8pmnZxE%2B5sykba0K8wrLiWZz0UWsSyFQ9fugCsrHVi2dqJIexLbZ8NgrqCLa2kDlgNTiFvD%2BOZqYR%2BqioGamZxDs9nFiuUR9oOgu%2Bz1D4IY9IxCP0ATnZWw%2FYlt90PRqwkvKZ5CE0nOrHuUEViB&X-Amz-Signature=b02b967ab69495e070bacf6e3b56084c9c41309107efa35d6ac5575ad399955f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675NT3UFG%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIGm0cIUec1KqRKU6zaz%2FR32LOJmpevqH5fk3%2F1HbmPoCAiAvMMnB%2F1gynSde5BLuwnA7z%2FFZBN2i9DtvDg3GJ5sQySr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM4AVU2jYaK%2FoGQTqXKtwDzrTUliYrls7dvIYKz33rpU6cbNszYax7bLT3gIRd4w%2Fm3pdxcNGf1OnaHdikrDc7ckeupNAcV%2B5qTkHCNnqha0zzpXHvMWcAniebomUsLgZYwGGIcoIoiKph30XPmR3XSRnmz9pjUHkUPbJzXdxNNC3IhCpWJtnbh6tGp%2B%2FWcBUTcuzDctcEGsjAVnN1PHqhPQM6fTbBilsMCWvT2pqS19KsDFSDnTlLoB%2BEGquiIRQIqdVnFR4xZOr0EobLz26NawsU9L1wnVvRmzmlJw37%2BPYFi0OAKMkf1QqRwb8n7x5ynia6TlTVBMOSzIGX%2FY5rterlGEoxutFkmNMJLdVcUa3kXUj1nA6jr4X%2FC7RAO%2BaxZi9X2yPCgbQzzFpnNRRx4%2FRK9kzO03I20NZBPCaNwrZjQ7Ra1f9jtOZsbOwpWIZIQK5p6GknYl9Bphabl7RYfs5stiIaK%2B1tgIIn1EYWPIY1gafyeOQrxMBsoufJrAMfaAXT52%2Fr47LkZ3DJ%2BiHax7f9eyCoLfb6L%2FjW%2FBDTKGs2OGoTySH0nfXHqDhENAtVr3tmoiEJlumKqF6%2BVacaeeoec1QWLgRbcMpQRIwtikOnsHovljaFZlf1Os0deiznWU3xKbMK2Cryylwwnu2jzgY6pgGsoBQrt7IJYQYQZ4F%2B%2FKIr8Rq8xLwjny5k45gyRa%2B4J95U3ZPiYGs7WaqbnFLZN6BmAtR5lNZvcN6%2F5cfOH5qc79EmGFcv3R1aWkZVoT0mxXFy7Tm2cXoN3tx5fwoPUIibaTsr8RnB8%2FZzV2Smbm4TsfrrSJdg5vhC6VuG2odC6dVr5aqj1PArixviFG%2BwJThzMeZYDhQn7Bl7qKwwBFVMxCTadO4%2B&X-Amz-Signature=5033d266f82a22835545bff5eb74975a9d4fb4d7c41d6e93f65a214778ea8608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIFAMSUC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIERiAF%2BJ%2Fj2EOt6MqMuk96aAsXEBUpvZHX3pTCiZzIK2AiEA7yxRd8re%2Fak%2BMiuM2kw95M1xFchF0%2Fzmsuv5M6YAFukq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDByE0gZciYHhGfc3CircAwSYeuHP3T8mfDEvy7MNhA25l09F2BCm97kteGTjJAhXlNGN%2BgbB6TckByaGci8w8l%2Bt0gohbzdfCqgEhOlvRRKrvZ2h%2FcYVPW3ZGE0WGr8dPet81KyTIBMLHtrvc6V1QJp32EqisWclj7Z%2BTN6Hyl95k%2FrxSyBI%2FnqQyO6KmR0n4ndlN5pKteLN8Yfh3zP9WrpT7TA0xK8BCqzLS%2BWqD4CQSlv0k68%2FC3bf9Vz1ng0%2BbxXOzrbxig2ZaU9J5Ygsah6LEcKxAKmod319Kn6CVQXEp%2BZYHaAF3IrWStQXWOiVS%2BLI%2BFLxxuzOSTQxefEhp9F6yjBU25pQMFs5z0nY9WVoaMXksOUjHkPTDoBiQCVYFtA3Vv0LJWFeCwUejMIwRQUTc1aTZXEH%2FMb5GIARrayOcu6TSBZ784o2yYUjPtwUM4HYVHrCjw2HvLinqCaZfNb8kx5ocht5EQ8rKD%2FZD08qs1RFS%2Fe5CHEjcnubGUaugl3zIMbIktlbwtwrb6S9bXsvhKzSAeoibnXzwhOV5WwoI0ohapOqEpjmCpe5auSK3hroubZpZaPCHOQWTmb%2BG59sm1C9daRSN%2FPcZdybDZoTv3SpNQtR8zJGZ4%2BQvB%2FqCjF6LyvZd%2Fnx3KlYMIfto84GOqUBxVsCizlSByHrFcSv6ihOpIKAEpcrdjxXz9D54vbFrrLz8Tu9YYkrOnDx7D7ShWbwZsxeEXjWD9Z9RjFFOGoiWVdoVMOl7nd3A59sLp6MYmD75NkjSttcBklICOCRHRn%2Fwr1vIdAlesGTJTFsai3OxbqQp%2FseDKxDcTmS9dDL6nY6q%2BysNuurxp%2FwISkamaG6IzStuhG%2FbLF4BB8gwOb%2FQypSvZPj&X-Amz-Signature=5dc2a1093ec10f651304ce324d523df6bf1e4b28d66f9fbb6c5ffeeded2e5991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIFAMSUC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIERiAF%2BJ%2Fj2EOt6MqMuk96aAsXEBUpvZHX3pTCiZzIK2AiEA7yxRd8re%2Fak%2BMiuM2kw95M1xFchF0%2Fzmsuv5M6YAFukq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDByE0gZciYHhGfc3CircAwSYeuHP3T8mfDEvy7MNhA25l09F2BCm97kteGTjJAhXlNGN%2BgbB6TckByaGci8w8l%2Bt0gohbzdfCqgEhOlvRRKrvZ2h%2FcYVPW3ZGE0WGr8dPet81KyTIBMLHtrvc6V1QJp32EqisWclj7Z%2BTN6Hyl95k%2FrxSyBI%2FnqQyO6KmR0n4ndlN5pKteLN8Yfh3zP9WrpT7TA0xK8BCqzLS%2BWqD4CQSlv0k68%2FC3bf9Vz1ng0%2BbxXOzrbxig2ZaU9J5Ygsah6LEcKxAKmod319Kn6CVQXEp%2BZYHaAF3IrWStQXWOiVS%2BLI%2BFLxxuzOSTQxefEhp9F6yjBU25pQMFs5z0nY9WVoaMXksOUjHkPTDoBiQCVYFtA3Vv0LJWFeCwUejMIwRQUTc1aTZXEH%2FMb5GIARrayOcu6TSBZ784o2yYUjPtwUM4HYVHrCjw2HvLinqCaZfNb8kx5ocht5EQ8rKD%2FZD08qs1RFS%2Fe5CHEjcnubGUaugl3zIMbIktlbwtwrb6S9bXsvhKzSAeoibnXzwhOV5WwoI0ohapOqEpjmCpe5auSK3hroubZpZaPCHOQWTmb%2BG59sm1C9daRSN%2FPcZdybDZoTv3SpNQtR8zJGZ4%2BQvB%2FqCjF6LyvZd%2Fnx3KlYMIfto84GOqUBxVsCizlSByHrFcSv6ihOpIKAEpcrdjxXz9D54vbFrrLz8Tu9YYkrOnDx7D7ShWbwZsxeEXjWD9Z9RjFFOGoiWVdoVMOl7nd3A59sLp6MYmD75NkjSttcBklICOCRHRn%2Fwr1vIdAlesGTJTFsai3OxbqQp%2FseDKxDcTmS9dDL6nY6q%2BysNuurxp%2FwISkamaG6IzStuhG%2FbLF4BB8gwOb%2FQypSvZPj&X-Amz-Signature=5dc2a1093ec10f651304ce324d523df6bf1e4b28d66f9fbb6c5ffeeded2e5991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BMIWGMM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T111749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQC5UPEhvRMTlnKo1X51lIxp8Ln0yLDlMr5lpSAKxMNJCQIgEy4MfyopPIXIEw2zwfh2XQWJm6WGOIv2XzSREECM79oq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDEfnQndE%2FMwsinMLcircA85wvhN3XBD6aeqdAQer1bw5FPgw4StqjKw9llBhiopIpbazBvDb9hLe9v%2F9pTdJxS1pgUr8BGXJyNQW5bszPHdB18UbRZ3PFgdPpARAz1m0%2BQoBSn9ONmDTrJA0RlIBKQZhdCTvKQxEVT5%2FA7Oc47OSlmaUMjP87yb9dCqYfUK32TxCerVsmFsYuWjsLQqK60Gt36UnytvldiK4k4WWLbuBcXEiCuFxmOOwOpcO2x4oa3A%2B4FoNWA2ENTCrtfto88B6T9ENNbUz1i46j3F9WMythP%2BI%2BwTSLdhDo5sq4H5JXruwDtzLD%2FZQzYmOZ%2BvP9HxSQDrgqdwlGCew4VQ2SZV6Iv%2BHxAkS2kfU9nwybvzKOUDsnX31FIAmQyQL5xvuzR2hk47joI7O3fOuuQhKMlKI7jZShQSAMyCKRESiUZaiXBkDi8qvZXVWU25JEfJTUpk1zddWfTVhg0LWuRn8CmqvOGJH3TkaWqcvSfSb%2B44hcreQEp%2Fy4M5srPBcVD97JC%2Fov7f1oTKM7uVMDxQ%2FFu9VOkcRLUjFf0woOP4gsKXKlG0P01y2nJ6xAnckyp7r4953HofD0j8mNJ0rcGEZpyw4dalEPjrfhoriGwJx95aWsfwj64dkH8aNslTdMO%2Fto84GOqUB9IeoKGToap%2Bgl%2BzewgntMjFGr4urhWiKBy8dWlRQ2PRAeB0x2y%2B%2BQzforxeJWKVGikznAs744d0lQmEO6xruUi7wEOH4hd19djs9X3vDqPDYhuCjEt%2FwC5RBvsguTcOKWyU9%2BpTfrv%2FoZBM5F73ROyobrUO7k2MrF34F47DTgMV8F2xTH9IXTYkX%2FTERHDy92LYL4StvErk3r6q6%2BzXx34otU6RG&X-Amz-Signature=2b5daca438af53e7ee003581cbc3ffb9b6905113aeb77a55366fa9d1857290c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

