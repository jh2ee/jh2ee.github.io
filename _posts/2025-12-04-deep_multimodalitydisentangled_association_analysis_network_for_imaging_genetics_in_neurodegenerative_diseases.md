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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBDKYZMJ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIGRjRfYsFX5yTa718EdHCI%2F%2FW1aqtSnEcD9sBitye1QSAiAIF6uwv5ckbsqI%2FDxqO%2FwmBb4O8t7mjaffXib41raRNyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIM0owiGsqhX%2BMx15i4KtwDEkTsAdhrbsXHifxKuCawXyUEHPQnFnnfaD0Dn7OZMtPjIGUsgGQCXVEDS%2Bo2fzQ1MVg%2BusyKJIqKVK9MTHt0rjOMCZvIIoSCXF4Erghzuzil1wDFgD%2B%2BnGg1MecZFkqz%2BTnUf09tJOgFlRS96pm4G3Qx3T%2F17o7CCY226PdFVlneJ%2FXKrD4Ox7jjretyOZcr%2F8PxOSaZcuDmOKcJAaH6AuUFWiV9GyF82BAAP6K7xiX5p%2BUslv7JwwjYKXodv3RD3%2FcoKIyxRO6snSiK3A%2Fe8Eu28wUP57ldDOccuhHxHFuNLuZJHtUVFdLQWy6SPPv%2B40hkDnpkeJaPr7Ooc922yFbVBj7lN9ptk43NfsiFuw2O8TnDwj%2FhmXtUC%2BtyWdB0aP%2FgI9NDAIOHuJ7PzNbc70iyoXILRwZNtTDch9bhkiIZ%2B4ksHKUD%2BbDNeGbJG3aw9gLw7e0oRlBt1HkeDkQBKpLMvnsiZScYEiqixXWe%2FV89NRMi8MCfQgSz7G1Fcv9jf4cv5jEfE8qAKAmwJ4NsSwIeTVIXii7XorXXuy%2Bq9lxho9QvSdrj0J0SeJe7nBMFdBLCxi82Mj%2FBRRtL4vvIim2pvU8dbH4TINpg7WdPvPYbScBlt2Jc0LEk07gwjYHqzQY6pgH7R5AXJVKq%2BM7gYwoJm7JMKpgwjZRi5Lc72u9sfUWvjcekUWlxfKhUf%2BRBHv5RQFUtp3cZpE%2F0TC8x04Az4LoFWM9Xdwi8SE1dcI95we7ZHlbyXXQMUVSzuYq3zVErCb3jspgUGrEY5McKgVb5w%2FRhh%2BAB5Qb5Gw5RCoQYbQayQ6cGb7bEOzDhQuPO0eu5%2B7%2FQIexZap61%2Bvm1HtT1psDEbHvFltlZ&X-Amz-Signature=202733b1585a93c2e407410ff20a6c3c952bc2a87921653fcf9557ae67e2eecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBDKYZMJ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIGRjRfYsFX5yTa718EdHCI%2F%2FW1aqtSnEcD9sBitye1QSAiAIF6uwv5ckbsqI%2FDxqO%2FwmBb4O8t7mjaffXib41raRNyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIM0owiGsqhX%2BMx15i4KtwDEkTsAdhrbsXHifxKuCawXyUEHPQnFnnfaD0Dn7OZMtPjIGUsgGQCXVEDS%2Bo2fzQ1MVg%2BusyKJIqKVK9MTHt0rjOMCZvIIoSCXF4Erghzuzil1wDFgD%2B%2BnGg1MecZFkqz%2BTnUf09tJOgFlRS96pm4G3Qx3T%2F17o7CCY226PdFVlneJ%2FXKrD4Ox7jjretyOZcr%2F8PxOSaZcuDmOKcJAaH6AuUFWiV9GyF82BAAP6K7xiX5p%2BUslv7JwwjYKXodv3RD3%2FcoKIyxRO6snSiK3A%2Fe8Eu28wUP57ldDOccuhHxHFuNLuZJHtUVFdLQWy6SPPv%2B40hkDnpkeJaPr7Ooc922yFbVBj7lN9ptk43NfsiFuw2O8TnDwj%2FhmXtUC%2BtyWdB0aP%2FgI9NDAIOHuJ7PzNbc70iyoXILRwZNtTDch9bhkiIZ%2B4ksHKUD%2BbDNeGbJG3aw9gLw7e0oRlBt1HkeDkQBKpLMvnsiZScYEiqixXWe%2FV89NRMi8MCfQgSz7G1Fcv9jf4cv5jEfE8qAKAmwJ4NsSwIeTVIXii7XorXXuy%2Bq9lxho9QvSdrj0J0SeJe7nBMFdBLCxi82Mj%2FBRRtL4vvIim2pvU8dbH4TINpg7WdPvPYbScBlt2Jc0LEk07gwjYHqzQY6pgH7R5AXJVKq%2BM7gYwoJm7JMKpgwjZRi5Lc72u9sfUWvjcekUWlxfKhUf%2BRBHv5RQFUtp3cZpE%2F0TC8x04Az4LoFWM9Xdwi8SE1dcI95we7ZHlbyXXQMUVSzuYq3zVErCb3jspgUGrEY5McKgVb5w%2FRhh%2BAB5Qb5Gw5RCoQYbQayQ6cGb7bEOzDhQuPO0eu5%2B7%2FQIexZap61%2Bvm1HtT1psDEbHvFltlZ&X-Amz-Signature=202733b1585a93c2e407410ff20a6c3c952bc2a87921653fcf9557ae67e2eecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643GRLBRW%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIA9Xy87rSedclbItPc%2B14M0x2he2E0yBWQtWFABBLHieAiEAjGaWuRAkWabmVnv8FpEJdoHzBsq6aNuCKZD96vAOjUcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDDh%2Fx2IvLfGCgKFGUyrcA4uDLE6Ky4zOTiPWLHgwTjRzhjsYWR%2FSiRlI8RBlRlCKQAHUgEt2i%2BT4fmJhVUlxfLgN67%2FBDdoC5hV27FPD8HmD1RqmYMILP0RLuT%2BahLlhdYmBNYV6wJ5pM%2Fv1%2BUqFHAt52bO90obUMElhyHPfw9IOei%2FEQJK0eApHVFul0n7oAGyvZW0eQgcSs4X3NVoCn5rRyjrrgZvK%2FocVFf6Q6loti8ltrbptUzK44OwQcHa8VJj%2BR7mjNH%2FqpGiYc5vYhPeQWI0tJ%2FbyVKhoAX86hpIiqWLfCjkn7cVH8FDq9XDQbJBwt1NEUEHifddFwMrSlNPXvQf%2FrlWJ5tkb58rV8aKBYSaMtUWhJ80Cjp6f56MkY%2B%2FTdvSq7Ey%2Fg33JnWS8KbxPk0N%2Fk1tB8gyivAcTT%2Fg%2B1ogu29r9iD2k0oYX%2FbADqnbZ5wbFxeib6q8LktolKDJu0bLCX83NYTgFoo9gfRpWPaBwDvV%2B%2BxFOCSZUTuY7agIzwMjtbLIk7VrxaUgS7GqkPdXixCfGuonwz%2Bt%2BQcc9X2ckoVGdcfVHryCvNb5GZLxij6L3X%2BSj8LrmAUUeNFaZ7AftG868tE4otMgAqqkgE8vS7idNj1ev3LMhQN6K%2FCyZc6hnQ3So88C7MMyC6s0GOqUBnywV4SiYFy0PiAJzEKRfLS%2FEDXFYGXdArX2rzhZs901VvDTFsiuC5AuThwas16%2B6gN7tpQhm4VunyRjI5CmJRqbHuZT7BW5S8ycjN3ZkcwQ%2Bd3J%2F%2F0U3L3EseFNZbNK29GIM9ySCofA3ewKejn%2B3hQAxk58U270ij7vw1uFDrX3NHGFVrHcUy8400Xo9CB%2BB8bljrPTu%2BmIBHgtCIuZ9R4ASczD2&X-Amz-Signature=eb6465159831f8424bfd87819426eec41dd56dcbc176d83bbad8d1c50d4df8be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHVGVHI3%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDyFXsC5IqELh1gMUb7XG%2FUI%2BtSl1umGgumSHo1kcAtwwIgVuW4wZbq%2BdrGiRIl1pjFFHUBBmJ9AXR1nL7QeqObSJAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDDvLu4LK67gQRtJ03ircA%2FypGJGBh8lr3jHK2Q%2BL0Y3L%2FwSo9abpToS0eU8O4S74sgDmMthF0EomV%2FjmTbpYcy2R1cqaHjQSrn5xQeZY4SQmZI2uaxlN7dHyH5AemkBqatjdWc05ZAImHILu6FvievPnRaZn6loCxOUiTa4Kr85d7IsUrha6XvfnTrAvXc2b7nOyaZ0kuq5WRzc4UP2MQHli5mOLMC%2FXMxpbD8MZ2Wq0Zxc1Xn9ioj7Zu3RSdwGmV2M6Gg7q4LKnEJA2SE7sly%2FYEYBUAg6foQ1q0F8r%2FQcHQ4bOBHzZ9eQTbw%2BNauf8Q3ZBLA21dEj2MTHVtH4yptezLeayhe9970MAtQWf9ldDTE%2BOslNxdPKL5SbXhYZ%2Bgh9bqu0MPvt3SVdxsFeomu1CHBKMvcaqVh0yS0XAs%2F1kB662jElsoNd6Y5g3OGUHHOSCIhoR2O9%2FzHnaP6eLhKAPYafYwFVNDmV2NVsByNitsGRj4YmXOqgtvJNiZ29HdXfsxJRsjv%2BWJJ9LEU03DudfgiUrhmKhspiBkfEFCRjNz3VzxbFRuWyO4TbHCreQYyYHuBiwCa0oGqFl9P9BU5HV9TaJEEjzHLK1Pfi79%2FVIUiMCvxLGGbdgNsX19UEtOUs%2FTQVdXLF1NymsMNmC6s0GOqUB8MuoteBtX59FwIsqit%2FRWbeVJMfGqPXsbL9rcf8wAQCjGqX3JF1tNxYKePlzc1TzW8a0VB1o2LAcnFx30Vo2o60YQAtr2xeW04FeHUvCdhKF6sZtB8jh17EZ393vl6r9VaxeHvfA6%2BnXYfG1QjFn22UukMVkQaYd86Z9UGeYO%2Byb8izwYWpLzZ4xD6tAmi5AvEcGmSnREiuLi07SS1mJvDWtDqh6&X-Amz-Signature=ace1631f0a253344a5be48d62c09d04eeeaacbc0f2b808c01a6c6a45bc3cc92c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHVGVHI3%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDyFXsC5IqELh1gMUb7XG%2FUI%2BtSl1umGgumSHo1kcAtwwIgVuW4wZbq%2BdrGiRIl1pjFFHUBBmJ9AXR1nL7QeqObSJAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDDvLu4LK67gQRtJ03ircA%2FypGJGBh8lr3jHK2Q%2BL0Y3L%2FwSo9abpToS0eU8O4S74sgDmMthF0EomV%2FjmTbpYcy2R1cqaHjQSrn5xQeZY4SQmZI2uaxlN7dHyH5AemkBqatjdWc05ZAImHILu6FvievPnRaZn6loCxOUiTa4Kr85d7IsUrha6XvfnTrAvXc2b7nOyaZ0kuq5WRzc4UP2MQHli5mOLMC%2FXMxpbD8MZ2Wq0Zxc1Xn9ioj7Zu3RSdwGmV2M6Gg7q4LKnEJA2SE7sly%2FYEYBUAg6foQ1q0F8r%2FQcHQ4bOBHzZ9eQTbw%2BNauf8Q3ZBLA21dEj2MTHVtH4yptezLeayhe9970MAtQWf9ldDTE%2BOslNxdPKL5SbXhYZ%2Bgh9bqu0MPvt3SVdxsFeomu1CHBKMvcaqVh0yS0XAs%2F1kB662jElsoNd6Y5g3OGUHHOSCIhoR2O9%2FzHnaP6eLhKAPYafYwFVNDmV2NVsByNitsGRj4YmXOqgtvJNiZ29HdXfsxJRsjv%2BWJJ9LEU03DudfgiUrhmKhspiBkfEFCRjNz3VzxbFRuWyO4TbHCreQYyYHuBiwCa0oGqFl9P9BU5HV9TaJEEjzHLK1Pfi79%2FVIUiMCvxLGGbdgNsX19UEtOUs%2FTQVdXLF1NymsMNmC6s0GOqUB8MuoteBtX59FwIsqit%2FRWbeVJMfGqPXsbL9rcf8wAQCjGqX3JF1tNxYKePlzc1TzW8a0VB1o2LAcnFx30Vo2o60YQAtr2xeW04FeHUvCdhKF6sZtB8jh17EZ393vl6r9VaxeHvfA6%2BnXYfG1QjFn22UukMVkQaYd86Z9UGeYO%2Byb8izwYWpLzZ4xD6tAmi5AvEcGmSnREiuLi07SS1mJvDWtDqh6&X-Amz-Signature=9593565c5ed0cd1807dc19a386bf6b0f0670035734ed0b05e456b6e887a7b71d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAYVBQ4E%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDeKCQ4ZoG0nP%2FxXfgJPCXY%2Fx5koEckRHEdiDzmeu3togIhAOvVn69cIP8QjBCc5rIv%2BQbwmEwpynzVZpilWA3j%2Fu1dKv8DCAQQABoMNjM3NDIzMTgzODA1IgwrUIGeS4E9R1bGllsq3ANjRPTKanaabQZddtTqzzvCcS8Y2YjSB8cDc9NjNqUWseGlVWwkCWkMsp%2Bve02noLNdR8o01SNdEC59rs8%2F7wdqpEz6un1fqW7CHU64f1cyChKSFw9t8%2BztAcOfPnCb1Is2qS0Z99zaudxRu1vKbzHOrWAoBb4JyK66XxJ34oNiw3JnPYAmVK2jSFVmBUO%2FpvA4ZHvK97zVoC5919mgrWGaebKttMHZXtFlwb2hT7A9HhgfD7pOrEH2fkPnA0xI9%2Bj3yyrCljyvra37m1LwLfP2rnQ44jE9yf%2FycLWqUo1KUh6ctGvgFpldQWsidoIz28%2Bn%2FjNzrk7xj0tL6T7i0gwHxrMP3e72T4ck%2BOFYjmXWzJHvXqX28vxAjkdyc2rvr6P%2FEDC4FRiHSP1bMVoQ3mTwLVyIRKAFW3x8wTmBNfjrBilp8bOjvnilI3lCZ3oO2w2Ve2gLGKwZYr0RNXn3J%2BP%2FnNf2k3%2FhxzVvPo%2B8L1FKeK3WxGSMtjbEfJDqRjJ%2BK%2FvyVchtebKreROkkfFq74tsL%2BKfZnTLmEjOriiuX%2FJVZpJVCQKWbshjo36Ey8MdYtrKbqQ%2FJbIIsRN9jgBP402s1apFZeDx9Tak%2FWrQDiuVT5Gkv8N%2FogADZwt0mDDUgerNBjqkATqdCYkNCy6PIt41cvP8L9aosuZKDcyxYtNyKWe9AFunOJiHsKRzUZ3BLFiTXI6gktSzUsrJwkdI0IB%2BspBQXO0h8T%2Bi1v6zsdjodSY4XClyFvBFwoFYrfWnEePeA%2B3Hdqrs%2BiQJtBULUGnshdEzBvCqImd41Tjv65%2BWiwDo%2BR5H1%2BjZeytz125wLNZyzn55tVDdWD%2BI146TxhW9v4FxHad%2F6SfE&X-Amz-Signature=3ec4ab49688d1756a51d86a6de4ca4e2fe7c43e8a60e0c4ec0d7f5e93e149f1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFOIGWPI%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIFzn%2FJ1OjD9siasItbZ6vDc9JPAhRruKuHxbsWrp928AAiButOiI4UdF%2Bf%2F6Uni8on%2BILBGEmKKEEPnd6ygesI2UQir%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMshjmtWT0qR5qcnbAKtwDPQtUY44X8oN1L0GeHYL0lcyyig9c5ujybz4D70jdebWQPP%2FxajCw4u5KevgFXI2Nd9G%2FCCyFFrW3vbSYwi619GKgMrGubv4j1KFGxGZHghW42lGGRcz1v5RjaaYNR697wW7gJA1R5IyeRLfsls9BjFMzveg1eoRnyY%2FNRTLgDq%2FXokiPlTBOhG6%2FAKeQyyOVTIUss9SWCG2aF6Pv72oai4Yvd0NFpZbD2h0k23JKfezL5XLJEjdP%2BYJAkLUiK4kMOlgdWMoASMXLzicJ3ouYCH7XvV%2BheuS1eqaeewM5aCjDQhkJEx12ztxUS5w6coWc0jwRyfmaLDrtgCu6dH7t5OUADXbX1XEnlt%2FUXPlW8aLfNPNVFsyomSek3km71oGnRPDSXUjQMgvv%2BKGWzKBCihy3cse8TLS28j%2FjHrLTiU6wTaLPXGLRE4%2BVqeAVXAslKOGz3bUb9kD8%2FZC7WT285GbBO6FnBBn7mFPJKkSa2tjsxKJQmZc%2FutVob25Yhb1EXq1qvQqK9%2BOof%2BcSwCt6qi0i1YwcjmJzx4Xga2QPxvT0Y%2BXhZL%2FeLMbJts0lkrGBuvhZhqpxbecVPwPxiZoXxR%2BIYD6j1wYji0A7qnebL47j51Px6xPO0kgXUwMw1IHqzQY6pgFWwzecahykJOU5psizRrPsSQPF1bQ1FfaHY6OJWryeeTgBVvYju6LZYjxsMIiM9tNFYOihuET%2FRskXbq7XYS6kNkuqWBtGqt3oMHBLWfLGP37Qkb1LP%2Bg9Ah%2FzAlPFPeNqFcr%2BLKh%2BbCk76mBry9p9lgbTlmzSKiQ5xu1W69G3Xf31Y%2Fjm8qma%2BfMLDiNhZviU6VpwHRkRhFjwKzA09BmicpIktwUU&X-Amz-Signature=598764ff4f22eca91e80b72a19a6b6ac654524eca310cc77acc8c01270d78380&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQO66BAL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCz5hyaiLXmmZdjsCicL5m12o%2Ba5zWn5Xe8FggtpsDUpAIhAKkDcag1aNEd3Jo2Wm6bBlCtAC81ymcgeN7oeJfvwNUzKv8DCAQQABoMNjM3NDIzMTgzODA1IgyUt5pH1juJ5K0W%2BM4q3ANcEDzbehZKM%2FRjIQXHULSQYHUJ4Z9v%2Brrc9H8KQL8dcEf%2BaE5pvzc%2FkLhYbV2GAsjKvM02TLjN8l6az6oO46RA%2FmykD2lwK1ssGvt44tbigqUyJ17%2FejwcmIOuSwmfCGrCHUy3FDl0KJqr%2BIgjhuAejW4SzDAv2wZn9pPk9Jwv3rpPUZG35dQ%2FPfErddEP5UzT2V7%2By5FATRtPdU5IqnH7bHnrHIe7uUWPVuxOGvfAimX14eZw3xWN%2Beddux2sMMEhsY9lhqKPWFlckZ0XXgznpaBZQY0dnCLZ4u9ljKE0lA4E3%2B5x7xHIFVMc2J%2FystO9K924SDfkc%2BFtCJitcgzrjjiY7oqBmdcshiOVx41zlc9ZqZg3aaNJqzBo62Pp0rzaswesWmD3MffgkJX%2Be3N%2FHRNKxHHT4mPvCues8POElHpz0eREhjEx5qSz5aNkelpLEUB3qx5YS4c4gDAcyd6foICqOfpXGJwVGRWQ3wYv7NcbzwzlGJgD4kYummQNP6AMqspVWHgsQvUUGkvwJxaGGAmPP6nmYa2%2BmzZjSgVSyb5eBXT48i7lWkoGIWJ03A7%2BLbOhm9p2f311MmUfrbfKKPyUn55QiUczQVy%2B%2FSTKtSaqJxIzuM9eKKVjPzCEgerNBjqkAR42naCdXjV%2BHBkUWGStTycE9nqZaWXY9%2FdsOcZr0LgXTDyX%2FraoKUCLSqUe6fmWXI2m38U5U56jM%2BufNY20FD9wzZ1FqnzRa%2B9SoUyFtuG088nG3tn05aR%2FHRL5HB89cLtyr8iiC%2FEzxc5K%2B9Sa9Xu%2FuInP0SG5yZQCG2OUn5YUfPK6LTn0q0Sx9ukeFXcCiXLar%2FteKNkIvVkTmP6iymkhbXC9&X-Amz-Signature=34ea4506bb392a92c81e62804fc3b7cb4fdb92c475088415a61d61194e90a5a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR4U7ERE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDFRpp%2FjYiM9QYUMoptGeXiIdaIy6mvGaez0f3L42CrnAIgfIrEEEYAE%2B9T%2F%2Fp%2FE6S2PyCd5PTcUqHdQW5D4aJxvEQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDAPw3BuBOEYZ5fvYOSrcA7fwtjTFRkAQ%2FFaEMZtkthyaA2xUJbmzV3uFViokB8LWa4MKZ7oKelinwwALoZSLYSlPRlk32CEusptDN%2F610C%2Bfur9oxLbEqqTDEcfYy8TRixtgNwHqb909SBQu7eten2s2apZNL8jINHjtLK0HZyIpemrga0zTPvg8x6MgeF6xEkxRfaMToanIHtS6hXKDqDspX7GnIJfSADl7Hcvdqhu725pRv403Tlgxf6cN5m2jCAurC1vkliG1HSpl92h5V1ZTXiMNn0eZzHQMG2LnpQPE%2FIgLsZ6DLmN%2BlCWO0g35v9WTLmVjlmvVtd5IaLE0ANGwWrofomvEsIg%2BeAJUxyEBLISHgZL%2BbtOpnvHKbXfC0%2BJmLG882PtEx0Nmhrf%2Ffv%2BTQCPpR141SDs39Xre%2Bth0Mi7qJm0Oqo%2FFJTArdo2YHtH%2FtGAWRHfJXvgRDhkLc6sNbfKiXvciqAtgaB5Wi6%2FzGOHxir6h2knhkGbpcME5LkqiAinbVFUzZDWLsfgDh%2B5of%2FawkIE0E%2F0cTKRtf3w1pZKQ9ygFCscA0o2eDPTwxV0I9Mts1J2f2tA1tHDLQzan7t6Yv2TvbammcHXHwk5olFIAJ%2BuPONGjWO6K1Gjl%2FuCO5NE99uWwjnUcML6k6s0GOqUBu%2FJVYIlIZj6uSy8zqILWBMhj6oajhLmV%2B2coLBYP%2FkukB5U7TvKwOuDGLsrob1d7%2B6d%2BgUyYEAT6BPqRwLIs6wQdVjJRm%2FDqIoXH4%2FlkRxhBJiuDncuXXXPrYzVqet5E1%2BEihk%2F0KCzgXpj%2Bxgt855cA6AcVgOBEkm9etGTfcvoLAJjt54C2dtbja%2FT1osoflziYuDO2v2mPEB422Hd6jJLpHQo7&X-Amz-Signature=01ad18df0c30e68d383e576dd4bc4e0a5c7789e3eeb07079669987b145f7d192&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR4U7ERE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDFRpp%2FjYiM9QYUMoptGeXiIdaIy6mvGaez0f3L42CrnAIgfIrEEEYAE%2B9T%2F%2Fp%2FE6S2PyCd5PTcUqHdQW5D4aJxvEQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDAPw3BuBOEYZ5fvYOSrcA7fwtjTFRkAQ%2FFaEMZtkthyaA2xUJbmzV3uFViokB8LWa4MKZ7oKelinwwALoZSLYSlPRlk32CEusptDN%2F610C%2Bfur9oxLbEqqTDEcfYy8TRixtgNwHqb909SBQu7eten2s2apZNL8jINHjtLK0HZyIpemrga0zTPvg8x6MgeF6xEkxRfaMToanIHtS6hXKDqDspX7GnIJfSADl7Hcvdqhu725pRv403Tlgxf6cN5m2jCAurC1vkliG1HSpl92h5V1ZTXiMNn0eZzHQMG2LnpQPE%2FIgLsZ6DLmN%2BlCWO0g35v9WTLmVjlmvVtd5IaLE0ANGwWrofomvEsIg%2BeAJUxyEBLISHgZL%2BbtOpnvHKbXfC0%2BJmLG882PtEx0Nmhrf%2Ffv%2BTQCPpR141SDs39Xre%2Bth0Mi7qJm0Oqo%2FFJTArdo2YHtH%2FtGAWRHfJXvgRDhkLc6sNbfKiXvciqAtgaB5Wi6%2FzGOHxir6h2knhkGbpcME5LkqiAinbVFUzZDWLsfgDh%2B5of%2FawkIE0E%2F0cTKRtf3w1pZKQ9ygFCscA0o2eDPTwxV0I9Mts1J2f2tA1tHDLQzan7t6Yv2TvbammcHXHwk5olFIAJ%2BuPONGjWO6K1Gjl%2FuCO5NE99uWwjnUcML6k6s0GOqUBu%2FJVYIlIZj6uSy8zqILWBMhj6oajhLmV%2B2coLBYP%2FkukB5U7TvKwOuDGLsrob1d7%2B6d%2BgUyYEAT6BPqRwLIs6wQdVjJRm%2FDqIoXH4%2FlkRxhBJiuDncuXXXPrYzVqet5E1%2BEihk%2F0KCzgXpj%2Bxgt855cA6AcVgOBEkm9etGTfcvoLAJjt54C2dtbja%2FT1osoflziYuDO2v2mPEB422Hd6jJLpHQo7&X-Amz-Signature=1e3735df6b66bcf3c9e6d09a21c9630371eab40809fef30e6ca497e5e55d8f2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZQN3Q6W%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIH1tizjdf0q207BnNw3Wx12eB5XnDmyy%2BJo14nANdmeeAiEA53497thHXZ23uP0iMVp%2Fzk0dQXzdfgRtgQ6MVLWJH90q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDJ4gpmTrwTEVDl3cryrcA88Pgz58cIRgdPcSiJRTsFKY5YCfdgZelcA28e%2FgsiwJv7E398Df6b%2BrVrdh%2BuVD9LTEdF%2Bap9%2BHNw%2FrZO2sOwhUcVF1QBJJzxamCz6%2F5nnyWbRVDS1ubDYksICU5T1ClA9%2B54gyK9wR2C7vHpDfHQBWSZE4gIc1f1KyciaBYEF3UnPDmtGkS%2FHEYW%2FwWG4Kre8O5xjaExXx12CRNDZOrMvIVsYGsfRllbOfoCBSzJB0d0W5LLosjH7Pj%2BRtt5qOSjBL9IRP%2BJzfFn5E5jA%2FmMc0xG5qsxpDBj3slN9cP9D%2FruC6wG8xfqBAwiJNL%2BMzQz0pcgtzcAf%2B%2BrfAXxghhLJr%2FnSa5O3nUNZZFj98ZqSpK3L7HhK5tCkmOyvRSYWkDdW5gvaGbXs3MWYp2SFlPlcjdyITpC3EnTceZDwI%2FqobaKDNEKYGL2VMl1rOwFDVoOQy7kytk1LUjSjlR1beVWxjA%2BfWdJtLgJX7%2F5ADZjd5%2FQgb1IGFYru0j40D4aFVd1m3QoZKtNg%2Bm9CXIZleImwsBkkpKxkUA1F%2FqM8%2F6sip5KA%2Fj6GZaMVqzbIQ2KSSoHxzlaNyxF5ahqX0WlGUrsLo8ecWyH4eZa3njB3m0TarJPafqgEIC%2BghUWdmMPiB6s0GOqUBAXVyC02P0acWRCKSviZcohOjclYT8SOnc%2Fx8d6nQUkcoOetiAdmdANuzOERKmk2ewETYx%2FXZHjNuQeqbAStYLXpw5BCKYjxt%2B7UDTc0YM2ExeGgOdIoK%2BswjmbnUdiopbZh0%2FA6zBV9N6cphavgKWQkE79wu0cMEcxlK7Mly858p7Un4oG50yKvkOMUu7YLm9rD%2FP1LbUdG5%2Bwijjmg2avCf%2Bfh3&X-Amz-Signature=f779cbd1a08315e909add45de91475939cfcc98f0da6d9a9c8c480bb2c8d8b87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGQUQPKV%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIC0kpr0CwV%2B533b%2BQm4MRCV65ventwk%2BHYAyTQFXuZU6AiB4tpB46FaoZc9ilSpgYZE1GpP59A0QKocp7ZGjRrk1dyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIM8lEfnSSPnI%2FtvXozKtwDM%2F2VCygZbP9rd%2BHFyMwsVpSFXJqRqQ8mO0g8x7Ler3eQvwh6FWAD6Wv9%2FPyyMvFJyjLiRYAd%2FcfNI26s%2F8e0tAZ4ngonEJBto0e%2FLOYaZoCpEZYp1Lr7gDDAFOrg5f7ajBMFovBHJ7X6pCZwX71Is0CY33KOuK9iEu4rPtzopmptDFDiEriCxG6zjJvqcZXV59qfBelyizjWh9l96Wazsi9kqe28MPk%2FcO03FWmMllkNWjZrWeiXRWgD0WHo2dspjo6K25u2V%2BwZnQFM33JS4doHc7q9LYFJLlvzQPkvrDQRNYcNf0ybvBum3dx2dr7ho%2FfKW0MGE8%2BMt6FPbJVPqDTZ2ZCSCZpXODpAlbISzB9Fc1Zmt6KDmm64l4sh9PxS5LrMulZCYovg%2FkyhnuGnG2jGI%2FKD1b04QL0mK2U4eyiyMA3u7H7569YENA5VDlGGlDqsZEgazwzIiZdgQ7HDRKeKzWlRPWSinX%2BJUqPlVrcA3fL8MSQ52rF2LDfmLMO2gw5RdtbClaFGiWGJ8Hw%2BV2fwBdq6kAXEv%2BWYvrR%2Fspb9kHc7VTw1PlP61Ml0454Ilbc5WANdPqem6eUHezgth3PjToSMsJ%2FsLy7%2FqSuqosbfk1LjwDGXOWWhphUwkIHqzQY6pgEf3FVR%2Fiax1xA5pNkLz1LAJOVJbBcyQoDT1IpEmtzH3iqS2iZJPn6IwliDjTvFvGiFKK0wnq0oM2ynyZZHCrgakQIgNHsKsitwboZ3N%2BJ2mPzwOpt8eZSOpY4js8McX1tZ%2BXHRQh8vp8A%2BoAnuQaiAI9FBvhWF1tvWJXA6zV2IxQFcfLrunfhnHUWES%2ByufxUNBIrWvvot2MNgvfMM0FMlH2MzQUdu&X-Amz-Signature=bca751148ebd828d7e1cec3d96d6d5496a93692b0763cb3d999b946bc9c31da9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGQUQPKV%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIC0kpr0CwV%2B533b%2BQm4MRCV65ventwk%2BHYAyTQFXuZU6AiB4tpB46FaoZc9ilSpgYZE1GpP59A0QKocp7ZGjRrk1dyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIM8lEfnSSPnI%2FtvXozKtwDM%2F2VCygZbP9rd%2BHFyMwsVpSFXJqRqQ8mO0g8x7Ler3eQvwh6FWAD6Wv9%2FPyyMvFJyjLiRYAd%2FcfNI26s%2F8e0tAZ4ngonEJBto0e%2FLOYaZoCpEZYp1Lr7gDDAFOrg5f7ajBMFovBHJ7X6pCZwX71Is0CY33KOuK9iEu4rPtzopmptDFDiEriCxG6zjJvqcZXV59qfBelyizjWh9l96Wazsi9kqe28MPk%2FcO03FWmMllkNWjZrWeiXRWgD0WHo2dspjo6K25u2V%2BwZnQFM33JS4doHc7q9LYFJLlvzQPkvrDQRNYcNf0ybvBum3dx2dr7ho%2FfKW0MGE8%2BMt6FPbJVPqDTZ2ZCSCZpXODpAlbISzB9Fc1Zmt6KDmm64l4sh9PxS5LrMulZCYovg%2FkyhnuGnG2jGI%2FKD1b04QL0mK2U4eyiyMA3u7H7569YENA5VDlGGlDqsZEgazwzIiZdgQ7HDRKeKzWlRPWSinX%2BJUqPlVrcA3fL8MSQ52rF2LDfmLMO2gw5RdtbClaFGiWGJ8Hw%2BV2fwBdq6kAXEv%2BWYvrR%2Fspb9kHc7VTw1PlP61Ml0454Ilbc5WANdPqem6eUHezgth3PjToSMsJ%2FsLy7%2FqSuqosbfk1LjwDGXOWWhphUwkIHqzQY6pgEf3FVR%2Fiax1xA5pNkLz1LAJOVJbBcyQoDT1IpEmtzH3iqS2iZJPn6IwliDjTvFvGiFKK0wnq0oM2ynyZZHCrgakQIgNHsKsitwboZ3N%2BJ2mPzwOpt8eZSOpY4js8McX1tZ%2BXHRQh8vp8A%2BoAnuQaiAI9FBvhWF1tvWJXA6zV2IxQFcfLrunfhnHUWES%2ByufxUNBIrWvvot2MNgvfMM0FMlH2MzQUdu&X-Amz-Signature=bca751148ebd828d7e1cec3d96d6d5496a93692b0763cb3d999b946bc9c31da9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HVUUF6P%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T141126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQD1ZWiUgZvBX9CcgV01iicTcOgJtzVmVONFz%2B8CPQirhgIhAPMV6Z7rSYHzeTrMXJfW6iaIHKRvWk%2Bue%2BZPpflHb5EjKv8DCAQQABoMNjM3NDIzMTgzODA1IgwIgo1QuqJIZrSmriwq3AMSTiFQR2lArN1%2BaWTCjJe%2FT1RLGrkIIdL3pkF%2F%2B8bI7yUpRriRHw7DM1ghm9S3mRKcUz%2FBOB%2F3Mm2aY64ZsXAzhgnD3jY9ryj4%2BP%2FUtnP3xs4z204aSWv5T57M9XA3KXcbsxXN%2BT4Jqb5IvTmnEQqCBs%2FtBY6sDCq4wNZsE1VgJPTOyDkqpS7zeXSdcDTrN5XbL%2Buv%2FomJJH19MRoNDrvA6U85nOHy0lIfYFu5BzI50T83LX6oK92bXOGr35ntPXYv5wSNRyoay3cMYtLFysyidXclY3CqddJ87T06F1sMSQxGb8sBjeyxcjOcXp8je%2BxIxDAHdkUgyyBYhnrWQS%2F9HALJxXNo0Uomalq6TkYE4CwAYJXTCytkiUCWq4crqPB3oleLoEBtJ3hdScqtlOU32nau%2BwhXP%2FLdHw4g8SIqYNYfDEBKAqUnsAqc1JJ69QiFH23qvkPX%2BwDjL028jCRmVTc2DbLozGh5IxDYiHhWTA6Aq2beniNwTyKpdLGMMr%2F1SEbSnHBWkR%2F1sYQVzs%2BA6ZJpOjcqTHEJ55AtfFPrylEJ7%2BVOmDyqQijujJklQBDMhNj53tQzySV82oIk0TEIsAvzIWwjYX%2FNwP%2FHMC4Gejb8m53cYVuTt%2BO7ITCOgurNBjqkAYxbQVexJgh%2BggL495PdWoKEf4k0wAyTVWoqDGOzhNuu1B96PqrYL4k8%2B8sTLRxpJq%2B%2BqZaNnpIE9sT50H67%2FIsDuWJg5QbvGlKVbZTLNCc1NQl6NF0KTuxc3hQmgf%2FCXoXiR4%2FLeBTIn4Q35WbLIH1tTn4X4XQhnHkddwpKsKOVHqkO4wBDv5rpEA6%2FBeOBummtgwAtMIdi52kyKFZQgG0gPoXn&X-Amz-Signature=8ab25c49edcfbc317c9878fb2b7d655566fe2cf57b7c278c7d16a0690a3b7f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

