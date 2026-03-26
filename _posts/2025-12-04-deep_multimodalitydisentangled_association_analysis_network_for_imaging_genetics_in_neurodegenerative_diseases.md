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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IZ6KZ3R%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCnyUhMj%2B0IZE6EfLD4snfSbWoDdRu6CHdNEcZFwOD6CgIhALUo51cEuS47bynkq1dJ0FToCKMMH4XVqkW1S5mJfVqqKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz9NqblI5Czm7VIz1Mq3AMGeU2IyT1l70uHXYkUPOg3Lar4MghYYKZdhh5C4bU9Y%2FHS16hvdWTY9DfEJHmz%2Fr%2Bv1t7UFSUdbIvbCvyk5B8%2BZ3TntYJeAaluG3KNlzmQbG78XeF91jYTl5uvxCZOYBzgyknX73SJx6mLVOGQWDIW%2BX17jvwwTViK31Wr2Y4W%2Bkd11WDwSOlvCEbVd1%2Fcerc9kmrh0g%2FdM7TOZiEynY8EVb1qoroGrRRweVKqgnI%2BIoVwJ%2FolPmQylPj0OO8EXDpZzlWM1SBrpEQ1J3kSEfYFKyE0%2FGHIwZLd3ccQMJaT5WM9kIbGy4YG%2FiXPxR0G320aDiDMU%2FHYaeUnceYxtoOZ6b%2BgxV6KesMhgeSZtndbhHWF0ifuBCaC6eN3pYkKBsmMH5ZWgT6FfU2URDlF7Ag5MOvyjatqbCACMqUd7kP21zPSvySk1Q8NtfQSWJt1cOp89jJ57dNneH0OV3fHjBOoYAarhPJxENMQlh4tILB8tfU0etq%2Fxf5%2BvWEDzHPgHHVljuHIIpkQxwEg7A1SfJ%2Bnj9lqOQ7xDybZoBvPRQBNciP92QUvViwxefVp9yfGAkysR%2FPL5WMwP7EKPV%2BWnaHC6Qnkz4VKklZkWa0PmUJYvnwU2PBEkxTm4nOQ1zDByZHOBjqkAT73A1fXcFm53FIyJyfjsPhNJjn1w8YKrFI1ZtS%2BwwnIQhahvMFfiHjkR11bmS0SnDcX5tsFakaG7fCWDInxcbOgRXBgjbww9UaeMpj3i0xBgY5ZCSJIcaefucXDaWQc%2B97e54irNcevTGt72VPYybkRofWuQnHmAfPx3kLRKaiX3KK%2BFzjwYc5dyS6dgzwCIkl6XkwRhEux2eQ2nvIbyfmu5OdV&X-Amz-Signature=8a109b0ab7d6e2ffe95fbd717c9fe5b0377f228c0621ace0ef8234269bac7e7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IZ6KZ3R%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCnyUhMj%2B0IZE6EfLD4snfSbWoDdRu6CHdNEcZFwOD6CgIhALUo51cEuS47bynkq1dJ0FToCKMMH4XVqkW1S5mJfVqqKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz9NqblI5Czm7VIz1Mq3AMGeU2IyT1l70uHXYkUPOg3Lar4MghYYKZdhh5C4bU9Y%2FHS16hvdWTY9DfEJHmz%2Fr%2Bv1t7UFSUdbIvbCvyk5B8%2BZ3TntYJeAaluG3KNlzmQbG78XeF91jYTl5uvxCZOYBzgyknX73SJx6mLVOGQWDIW%2BX17jvwwTViK31Wr2Y4W%2Bkd11WDwSOlvCEbVd1%2Fcerc9kmrh0g%2FdM7TOZiEynY8EVb1qoroGrRRweVKqgnI%2BIoVwJ%2FolPmQylPj0OO8EXDpZzlWM1SBrpEQ1J3kSEfYFKyE0%2FGHIwZLd3ccQMJaT5WM9kIbGy4YG%2FiXPxR0G320aDiDMU%2FHYaeUnceYxtoOZ6b%2BgxV6KesMhgeSZtndbhHWF0ifuBCaC6eN3pYkKBsmMH5ZWgT6FfU2URDlF7Ag5MOvyjatqbCACMqUd7kP21zPSvySk1Q8NtfQSWJt1cOp89jJ57dNneH0OV3fHjBOoYAarhPJxENMQlh4tILB8tfU0etq%2Fxf5%2BvWEDzHPgHHVljuHIIpkQxwEg7A1SfJ%2Bnj9lqOQ7xDybZoBvPRQBNciP92QUvViwxefVp9yfGAkysR%2FPL5WMwP7EKPV%2BWnaHC6Qnkz4VKklZkWa0PmUJYvnwU2PBEkxTm4nOQ1zDByZHOBjqkAT73A1fXcFm53FIyJyfjsPhNJjn1w8YKrFI1ZtS%2BwwnIQhahvMFfiHjkR11bmS0SnDcX5tsFakaG7fCWDInxcbOgRXBgjbww9UaeMpj3i0xBgY5ZCSJIcaefucXDaWQc%2B97e54irNcevTGt72VPYybkRofWuQnHmAfPx3kLRKaiX3KK%2BFzjwYc5dyS6dgzwCIkl6XkwRhEux2eQ2nvIbyfmu5OdV&X-Amz-Signature=8a109b0ab7d6e2ffe95fbd717c9fe5b0377f228c0621ace0ef8234269bac7e7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FYRENKO%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGKVyFeXdJ1Hyx3tqW2UQxRMyF3FWmJQrwzpPbx6TPmCAiAeGlzaN6PDEdY8n7c0f1%2FKYO9gEK%2Bp6vysSXhoUMj86SqIBAi4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMeLO8k67z51qTKZ4hKtwDCdixOjRbpGIzmSdDmBEB02T4dVP7q3vWenIk6p7SGMhpW2hWmDKLJ77c8%2FuV2pc%2BPhnnJ1zZCzj7zbe3GHJjgX2t1I2cnXTrnzuw73YrH9HR%2Bgd43Lo6uoG50bAMT1QXUNNeSrrzW46YDu1Peka8lFQTP2fydWq8fWZx0L2XVWy6zhdkg5Wv5Qh8A0GdRSdY57JKOpSQ1Jse1W8eLa%2BSHdT4FdniOF5LPT39gLQhGdoht420QBrDecb9IAHPlnBfP7gItRwmE4c%2BOLbc93VciRrpUVaxX51IVkI5OKeXqY3Ivb0WkfI%2FZ5zp5ApClHiWlrjWep%2FDBQ%2FN7SocVl2uleWJ6UOCzHOb53uKzhGBWMY4NFrZRRdIu8aK87EvLKB%2FhgbKDl06CsLZ%2BrojwbYUqPv%2BwQ%2FMKJLNwVWJ8Vq33VFzP4tqlqsOAPTPsFlN8LTop%2BfjQXwYIzaiYZcebNTaPsf7pHVSEvuxuV41PpHPJQYVp03uCaS5b9bAiYmRyjt7sXCBqG74L6KtaNrG9rjpeicIomqoT3UgLDBLo%2BE9EkXxotwSkDCVYKkwIiMTGGAZR5sfGVneK9Wlvyy6D%2BjzD3sGkkzfVJVZhdEfHl07dMirEJFWCTuELSvd%2BWAwxMmRzgY6pgFEZ5zlhnatxmEUECfbxe4URgm%2Fk7xnQX%2F4coacc%2BByDgLSMkb0i8V1nRsIpJQlZRttxuDBkArBJ239IB0gA0AYVRm8z9SrUK4pdRmKnyfM5dfBhNifBDRpfL5bevo6tlgWlip17RB6GM%2FUOX7nhJCLBu2V8OqCCczubhKeaztWZOsTdXsbxS3Bh9PaIf7RR86Wt320RCqTCE97KyP%2B7yJAOhRh8YMw&X-Amz-Signature=5deb2c8a24551b44e0188e59b78242e902fe172e0a4759e2b911e8a8735a7518&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625OWPHBS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC0Mt39D7PNBw2YjrvbwqBxHLKXtogSQxBCOaJ6pcwlWAiEAlHOors5Xys%2Fce%2BQ%2FcSwwCScZKkacxWf3DQu%2FluGwWXEqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGsWL8sAJKbNlGUz3ircAxE9kbYsbd%2B%2F43sMWdz0N8c0Gf1OT5icfMP5nm6qde%2BScltDSDMm7Bxh1VvLShtEyBJHF6TBaxT%2BhChcSccyuE2K9I1QKWfonUQcCrVgkp51QPL3ZOtDZNEtXuHY%2FdOiIXLm9yCGbsKl2%2F5zvryWfLkZkPpdP1R7ILXK0gHlAqUpsTqg%2FKov8xrJ%2FMH%2BiKXn2ZHAvlAirWnNM8IUUxEodZtwMk%2B%2FjZarLoVueUK9%2Fd552Jr%2BXH7jXh0693t%2BYM3Z5N6BwgKFTU4l%2BaY2C%2FbsZA8JjttF1YJFh3sCWtDPQlEpcMQeT57okxXlIlOL38kXekijytnbokfDShTX%2BmAznnWUYBPl5eGoTsPTejFkcXb7Rl6ZYtERI0XYDyjgKlyKrsHPIm%2Fh3MdINKs5KnkTp%2FuQ8Uk4cr6rNlbMFk8ait%2FTMvl9InOJ6o91aDCfO7PPj8XbS5c7Y1%2FF1L0p2hNDzv4%2FngwiknMwx%2BjYMLVUhYw9tH7zVkAyBRPwq6y%2BrsGVZCfi3YsFw2hXCP749c9azXL2ZGqF06VuD3bnUN5nGc6%2FLZVjNm4fl2rnYuYpp8%2F88Q%2Boys6i5c6%2F51cPUCgGSNa7lFGSMyqR7i2SrT%2FClhWm6KDHnNkXECP92M%2F9MLbOkc4GOqUBzHoPa5mEWlHcEhOm4zCuQhUCdwuSAIDxWFTKLJAZXQpVeMOdBH%2FTyb6wcpPXoUNr7Bd%2BKYSLLuUtCBsvfYpU%2BwAjX3D1dij9QU70m6riWdON7eDbD%2F2AeoC1Nf5c%2BFBIfbPdLhPAXKf8CaOveG2nFH6%2Fk3YXbrsjfIWb3PUjgasuFH9lgqoalV7jPDni%2Fgib9BDqMOvQcyfe7aWrH0TERzefMdla&X-Amz-Signature=77e936d8bd3cee82effeab9dddab10f7afdda941d184ec37ccf9900cd8781381&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625OWPHBS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC0Mt39D7PNBw2YjrvbwqBxHLKXtogSQxBCOaJ6pcwlWAiEAlHOors5Xys%2Fce%2BQ%2FcSwwCScZKkacxWf3DQu%2FluGwWXEqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGsWL8sAJKbNlGUz3ircAxE9kbYsbd%2B%2F43sMWdz0N8c0Gf1OT5icfMP5nm6qde%2BScltDSDMm7Bxh1VvLShtEyBJHF6TBaxT%2BhChcSccyuE2K9I1QKWfonUQcCrVgkp51QPL3ZOtDZNEtXuHY%2FdOiIXLm9yCGbsKl2%2F5zvryWfLkZkPpdP1R7ILXK0gHlAqUpsTqg%2FKov8xrJ%2FMH%2BiKXn2ZHAvlAirWnNM8IUUxEodZtwMk%2B%2FjZarLoVueUK9%2Fd552Jr%2BXH7jXh0693t%2BYM3Z5N6BwgKFTU4l%2BaY2C%2FbsZA8JjttF1YJFh3sCWtDPQlEpcMQeT57okxXlIlOL38kXekijytnbokfDShTX%2BmAznnWUYBPl5eGoTsPTejFkcXb7Rl6ZYtERI0XYDyjgKlyKrsHPIm%2Fh3MdINKs5KnkTp%2FuQ8Uk4cr6rNlbMFk8ait%2FTMvl9InOJ6o91aDCfO7PPj8XbS5c7Y1%2FF1L0p2hNDzv4%2FngwiknMwx%2BjYMLVUhYw9tH7zVkAyBRPwq6y%2BrsGVZCfi3YsFw2hXCP749c9azXL2ZGqF06VuD3bnUN5nGc6%2FLZVjNm4fl2rnYuYpp8%2F88Q%2Boys6i5c6%2F51cPUCgGSNa7lFGSMyqR7i2SrT%2FClhWm6KDHnNkXECP92M%2F9MLbOkc4GOqUBzHoPa5mEWlHcEhOm4zCuQhUCdwuSAIDxWFTKLJAZXQpVeMOdBH%2FTyb6wcpPXoUNr7Bd%2BKYSLLuUtCBsvfYpU%2BwAjX3D1dij9QU70m6riWdON7eDbD%2F2AeoC1Nf5c%2BFBIfbPdLhPAXKf8CaOveG2nFH6%2Fk3YXbrsjfIWb3PUjgasuFH9lgqoalV7jPDni%2Fgib9BDqMOvQcyfe7aWrH0TERzefMdla&X-Amz-Signature=4ce4f8569f3616202d4a098fce5003aea0d30ddb92e3a8dedb250ec5e616daf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PEEOBD4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCorU7tzBxreGMXv5YKSq%2BNF%2FKOPbYkztOpyXXXi5RmBwIhAPIN38lNyg1qgip7KvGHvx651F7PLsrV2UwTa6zUFq4WKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzIxRSZP9feOlUKEl0q3AO%2Bg5FWWcYS%2F2G0ZiWX%2B5%2B8UVIh6q58ZxUl1OYcDd03YXfNLcFqpZLB%2B7GQeyDX1Sf0HGSFhsQXrM3fAE%2BuYc2tbvXdFIapcJOWWuoVyOjquVLm7vHOx%2F2lVhX6cN04QgFQoGXcHgvAdF%2ByGyIM%2FeLYiDiojVcbL19pTGLOsfH4mIfwjk%2BnujGEYmIXimQ4V1HiG0YLp2P9Tgv3m8gWqaPrhpsHHBI2WA%2BPH7YZ1epERw%2BuVgvNMyqpB9LEAreziL%2FoMWEcmQAAEi%2F5K1iwbNAZ50sqWpyit3x4LeunB3WeLLTQY5T88yvfqXMci8l3WxJsw05ExW05qvUyE%2BbHlvnEqsQlHuoYeK%2Fr5xae9tRtg4V3RxFmst5YxJg4UBiaFxEymORHlsuhcQzw3JawevX1h55avpmlqaRx8ItiCl%2FOqxzA%2BcuE%2BTTVa6P5epc9xafDmYhdVV4MpRnNOWQB4q8c0gOupqZs9obUFZ8EliLD07rOVgkJSYSlug68sj6o8i7Uz%2FGfxvwQRmdRitVAGG2z7U1f3LANJ%2BmqmYWRf25My5FeuhInIBgBDF%2BMumnB7XCsUVxlKvUilDIzU%2F9YwHBkvwOzXrtMX%2BIMGWUmMADs%2BBVqOzq24ATn0lBO7DDVy5HOBjqkAfyxwGKJYzrJpH60fyGyMUm0mHq7nn%2FfAOHSd5UwXhxcmMn94aRUjRpvFU6JnE9S7Q3caJkrVm2BKuCL8gGL8J5eqRaE3Xxy%2BdKtfj%2Bkg3XIZicxjcuvLTmyCqRleOUl7sUAjj1%2FU5SB3uTafnRsvUSkb4fEcaGLyI1RCAzqM%2BN7VRJCJeSdjJKim3ucmQ%2BwMt0DHDiv6jUrEPFwG4NYa5CyCLq6&X-Amz-Signature=613c32171b47469fe8012360f07d108ee7cd4b9ea126abb9e73f012a6cd6e008&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQV64GE4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEfLvjCYCgv%2BoOIehsHAqoWesypa80hinxiFguvzk68CAiEA%2BYaPXvOx%2BHqJ9JB9%2FFqoYCoduFCyQCFxB4y2ddv65RUqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNqnh7lM%2BiaMQ2AIzCrcA15F2kIzIMc5yEN8xOf2H2%2BHO5SBI1nAxeedPwmp%2BBt2p4qZu7tURmg38NwtR%2FIw3PlYDVQYWZT8QFE9u%2BeCjrI%2FViiuRgyXEszkXxxIkdajsSUnPZO9YuDbGc5Zf6xWEyqSAepUJqH3l9Ehm66U6avqDvmI7NaA6tApO5Z26nYGrV2%2B1qEwEujH6Z1qXPl2NQwP4r50a%2BhfDYywi8y6XfAhmsBh6QmM5NEvr2BHVpj%2B%2FoxwQ4ez9kYsV%2B7Qq5AzgVcp3lMpxd5QN5gmJvH9Pd9THA8zHU4kXCU4KckcuSccA1FxBw9MGkL2wZkQFLambZn%2FUoubOTD%2FCNYUa9k0fjCyVThUaa1fTMynvc%2FLtxv1dEVkQaB%2F5m%2FdhQEP%2Fyvm48OSm8jcu1Gsko67C2dlxa8qUhPDzJlQzY%2BVRQ6oKrsUZcUbNUiVCDI7q8T5ibEmpsZc4DqGEQQUY%2FhR7EiZ2wbhsBTYSa0KSjajTiMflHc%2BPk246MZu%2F23NDMmE%2BqhPg3O3huvrETUXqBESqSAEBh%2FgBgzATb9HQY4EpSvBS5ppgTfXJKApdDeYyKKmL0WM2LhONTasmwnPQU5yPLwiFpMB4DYQ6dlkp3RRvDHQXc3flWMyPYLic1NuwnqqMMPJkc4GOqUBLrpIDV%2FHY4QyY4zm%2FXlPfGdThRrPH8Z0sveEllwCAESAZRI6sbtTyBhsPy%2B3S84BQvZr0pHvKgZDOKt%2FLRaGuDajFWmK%2Fe2FLgC2izVEnghahk%2BloirGeqOMsmGQsOt2RdFnUORr240FdbbfB%2B3YqCNx2RM2pZHQcse7OCm7cWuBWnJCPNd4MElr9yUqe%2B%2FOlDtg0pfDaKm8qGeNmQM39okNf2F%2F&X-Amz-Signature=edfcdcaaeb83cf046d70d1a95006b10790b8b4041f3f80cbe02a3f41c69b421c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5TLSTVZ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDqCq85wrrDbUme2Or8CH%2FaIyxTzNnCMy8X%2BDx4ahNGrQIhAOkF7iZoV6nhxvA%2B3Do5CbH8Z1oBVGHRKWEr98Iha0LgKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyp6JzN%2FYiOYJ2GP4Uq3AO3equq5KOpPR15xs7EPbzjQvpFNR7A8iw3GpCicfCBqTZpEkAc8N73sXAO%2B4%2FafDMMpz4awEUp1FNgqw6qx3%2FZoCMIFB6qz64CsQ98yLK%2BvNPnrfbOduU79lA1PRsYnGoVHyV3%2BvubCmTcPgjJqsGNuLe8hG32kqWgIDGy7R7G3HKvwlMGBBmmVBUtZ8gu5IrzvsLldJybJNAkkpkww%2BhmSlQI6mncmsuqvBLI0G6QCIHyIPUA8ZtWbWEYpq73E%2Be8YtQ4kSzpvTfOoyja%2BTMfJ%2B%2FaRa75MiAd3N9TfrdZEB72MyLbRSJPJFf0VaYH7mbglST4fj1OnGcxRCHina1f4BCeTCg7aPr2W4Re3X2gTgtblwVwkQ8kSnXU5bRDrx5Uh5bo8%2Fl2YW7g%2Brzu2NSQ3hC2T%2FrMABOxRzmm2eujXvbH6zQEmO3790kZKbmJOMSHKk%2Fv300THzpfGlgFLaXKXFafjfRj0Z4LIf98kaj7pHN%2FFk5BbPd3sfiZPHLfD4qHxuaG%2BYCgpDP9Qg6oDkGUpjHwYA51jmUhAD%2B2y9F%2BPO%2FRzQh8FDJObYZWt81aKLPtsyA924aGp6qraNtXQFajmshkJSJR8gbkE1FLtcj%2FzuyHU8jiLbDJYQn8%2FzDGy5HOBjqkARrBlmCyqnBL1HMzbU9X128FncFshXZhIO%2FhnTqeJr%2F9iZZUACAsJrYZx7zCT2ngo%2FGiJV4wQV%2F3kjKVF0d1175Xw9v2gSKRK9bPzqzARatmKQ3lvMq1N1gOpzCReuutzw4dpfWug4dQVIspy4epQG86jMMU%2BKc5uhrsFU5Sb8tOPxUzPoHNPbo3%2FJIeg5PzRFUYDKuEmthdEjdM3AYGqEFzErsR&X-Amz-Signature=6f379f24787cf645398cc2253534f863720ca671b9aaad37970cafce97650413&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US3PAID2%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICR6rdiKsZvRpuVAfRc4TcFOZxPWHUr5nnH5zCPhAtVBAiAjV25md%2FyvaBB6FbAcsRpAGm8Zpu%2Fm5VRSaT7BHrXiCyqIBAi4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhrxinuczMyA95SkAKtwDeVT%2BM2lbb6DyTR%2F%2BiH2PGj6EdDLIQG15GH6bS%2BWapEz%2FQm%2FMhS3fuVsBBwlytTjAZUqH4KQeMQekbX%2FbCKjgjj2RZqvz4YU5gGJl8o9A6euceTz%2BBwCcVYxct%2BUx9QOiDKjFku8mbSaOSzlWewWTMGO39nV1CMZU6LZEFiVmNfiCX%2B22hwdRts9yW5XjUEvW662ajbBvtvg6pC%2F0AaczXMEAt1sKSrvpYDOg35m1lZBmUIS4eLPQWwNWN8VKCXnE3THG8D38HG9Uu%2BFOq0pfDG8QzDBlXfIUq1heAq3rYLoIVHffQexFUcAWDGL0G4ujIF8kXy2%2FB9IbLHobbVb3Os41wpBvYd%2BEWpTMwmAYsfqNCNN1OhsRWgm5HMzgwZp3ZRKLnZT6trJ1wV3aKvrPnySLNGE0H7VCDBT8A7hjDWEfI8cfB3fJiZbASdGlbzS9E0LE2bQo8IOHf4LrKKTYiejy4QBgmoRzv49rKWouoLHSrjkIIwwVK88L8fsfrXIXSHIVqFM4pTFXlDT6v5hDAJeG8F29A2n%2FQoQ3OKrDdTMoSKW9O8MOloAMH8jnBW6zNtJnef%2FlNdboUXbpwc%2BYTtHERsotsy6012j9hXVKXU%2FeIx8mYltOpHcslwcwxMmRzgY6pgEG134hmqby%2BGygsqmKapO8XJdzCWTVzLZxqu60eY1poYI1bU7dreH34yvyxrgA6RDIVTb88fM4wPG9VjSdzzxJxnPl7qdEjUlPPOwDByNponT9KZMPKaepchehtT4a3Xd1%2FXqVKPrsWwQOJDX3m62nXUufjx7lJERjvFZG%2BSBRWJ6hpcnbizSdgSduPXX4Wkiyx0ntoSc%2BXCfTrT2YGqbO7FHZ8jl3&X-Amz-Signature=aef24a905c966a8da27523c449cbfc5b29d96a540e43374a72e0dae2102803ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US3PAID2%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICR6rdiKsZvRpuVAfRc4TcFOZxPWHUr5nnH5zCPhAtVBAiAjV25md%2FyvaBB6FbAcsRpAGm8Zpu%2Fm5VRSaT7BHrXiCyqIBAi4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhrxinuczMyA95SkAKtwDeVT%2BM2lbb6DyTR%2F%2BiH2PGj6EdDLIQG15GH6bS%2BWapEz%2FQm%2FMhS3fuVsBBwlytTjAZUqH4KQeMQekbX%2FbCKjgjj2RZqvz4YU5gGJl8o9A6euceTz%2BBwCcVYxct%2BUx9QOiDKjFku8mbSaOSzlWewWTMGO39nV1CMZU6LZEFiVmNfiCX%2B22hwdRts9yW5XjUEvW662ajbBvtvg6pC%2F0AaczXMEAt1sKSrvpYDOg35m1lZBmUIS4eLPQWwNWN8VKCXnE3THG8D38HG9Uu%2BFOq0pfDG8QzDBlXfIUq1heAq3rYLoIVHffQexFUcAWDGL0G4ujIF8kXy2%2FB9IbLHobbVb3Os41wpBvYd%2BEWpTMwmAYsfqNCNN1OhsRWgm5HMzgwZp3ZRKLnZT6trJ1wV3aKvrPnySLNGE0H7VCDBT8A7hjDWEfI8cfB3fJiZbASdGlbzS9E0LE2bQo8IOHf4LrKKTYiejy4QBgmoRzv49rKWouoLHSrjkIIwwVK88L8fsfrXIXSHIVqFM4pTFXlDT6v5hDAJeG8F29A2n%2FQoQ3OKrDdTMoSKW9O8MOloAMH8jnBW6zNtJnef%2FlNdboUXbpwc%2BYTtHERsotsy6012j9hXVKXU%2FeIx8mYltOpHcslwcwxMmRzgY6pgEG134hmqby%2BGygsqmKapO8XJdzCWTVzLZxqu60eY1poYI1bU7dreH34yvyxrgA6RDIVTb88fM4wPG9VjSdzzxJxnPl7qdEjUlPPOwDByNponT9KZMPKaepchehtT4a3Xd1%2FXqVKPrsWwQOJDX3m62nXUufjx7lJERjvFZG%2BSBRWJ6hpcnbizSdgSduPXX4Wkiyx0ntoSc%2BXCfTrT2YGqbO7FHZ8jl3&X-Amz-Signature=3a8f0437bdc51b8ea405e065dc05a5c45114dffb0d7a4b3ddc3aa341b3d7d707&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S44F3N4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICRCSNazdkKwR9rWCxNmntyLIpwNdoc1K2P526Zhg6RWAiEAwbJnLgFnSGo%2FQkDESFbO6zxfFhnLbiTWrAhsbFm4kNcqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ577OG145snWjS9QircA7Zrh7AMWWZEpKTYQS1ntw9ipSihI%2FQ5t04HW4GrmOlc24SX15pnB%2BKTcg5ow8jRnP%2FICiRB%2BW9S2%2FScCYwRzSAqVsoKHOxW5W4p4c7%2Bx4dQMrBePjx0GW%2BjfddsGpVw6SVxXANM94RX64cF1U9zF68zOTxcpvc7gL1AK1UoTeR34J9%2BPjzO%2FIwS4F%2BMMf7vsLt%2FlzcR4SQNFGBbXFBtKQwUPFekzPxmxUG6wCeMxOzlt1OkjcxBFgmYsdLCBU%2F5BunhUFeqivLdRJ3%2FJivGXH2zxIeOqUd5giTqMQOY6b7OdXuXpGUnT9S0Omtxo2szWaxxTeij1ZBM6wIHCKcs6Po9dShJjtilfxYZ230raGMc6KPnN42qZz7KxN3A90cWe0k4fUptxQtRqpNIQOwPG7%2BOnpB2Dkw%2B1eUPaC%2BGZIhDF8uvyj%2FqRoQ3iOf1%2FKNJwX%2BFHGgsQQ8Ib%2Bpaht5qyRvfAYV1FnAZaYJDFp%2FfygNz75vYhhJdZ1qEj5hKwmRW%2Fi3p8ujIEtkruFqx89A9Oa%2FYMizKaeBuf2bF%2BiV1LJJ77QUcPrpXINqMmwise%2FwrGwDMzRGuF%2B4H5l2QNyey8YPl4DQAYr09u57uIGbSuCrgm6Uzdwi6cG3aTIlsMN%2FNkc4GOqUBqDh1DVNw%2FhA1gX6OQFI95r8%2BNonPXuqiUUYLwmRDi4vgIAJRVCtVKoFrf3tevBX5vwbGQVzWoQxn%2FkPKSgP0IN1oGOgH2ZVOIYSFvYUSgbEI9YIdrLgxxlMCs9z%2BB7%2FBmMtKDSDAKQXXhgeNIwqDFzpUuuqAB5DkRMbXh%2Bkx7KZWpqQK3%2BOVaghj2ZofYKhgYdyVMsgyUCfEcJDECwD0kY0BHdnB&X-Amz-Signature=285f39ac15024d8b1f575686ef6110efb058e7a32207da29af2a543b51de58cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLR2AEEJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjel%2BeNWJVVg%2FvMJv3yPG0jpV%2B3Vtp5%2BFbhHJlGogiqgIhAJtBS3US688JIsdOTqMTqAlxVmjQhrRDm1eQzeBSG1gqKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0LAA1NvCd1FuOX9cq3ANRzptlrB4w2unou9deiNBocE4ppiNd%2BMsnuFxGr9ECpbjU032wU19nm4lyk8bqZlK2fIbHfBjAGYuHWCaereqhWW%2BykDR5zFFRQF7Z03K8sFJbMAzKx%2BZGhnTLI7BFhwrEesmjFxwrww%2Fwav35h%2FuEEOnfjnNAu6RfPR9%2FvSqtyTNpKMkwSk6BWMRJoW72mJWAtkoMLdtot7rRdWmgnoI%2BEQhkDJE2Tcvp7nY9rLDZGWcEU1dQLv%2Fn1fctQn7Y2lUcsLjCZFfPbW8ipSKxhXoojfSKbocX6FJybhzLt5JnUQJrsCJwB2ueFN7HHYmPu2guNp6li1IoanE8m3pGN0juW2sPObW4JbIvq7BqXxUC%2Bn8XG%2B9dyBytHv5u5%2FVT1XRbP573GxQaLYLcki5E3Tz8UkWCy7jX0lyBKkvQsKV%2FfyRpGHLlB0IA3cus%2BwAvuF5iSIMo3vvsC6Gg817FSQLduFIvBrL%2FSKVpvsl7LLlQ8kwQB55v2zs%2FImdR5R%2FH9MciusWwUPKP4Jvmx4qGLYMvaX42EyTGnXSTl%2Fm1%2B%2BxJtpW4BsTmeDg9waqExDDSaS9aRhUv32J8wqQx0ux1oMp%2BMKEFCpjrjFheBHRwX5q90%2Bs04m52v%2FqqCxuPuTDHy5HOBjqkATO5bad6e44jYMxv%2BBMM%2BKGOCaVBMwI%2BQFdnE%2BNabe8nSYctwGr9t2LJ%2BXrWrcXKCFbxszwxVN1i7DU6ySt6kJqUIRZ1A%2Bo3BuxHlQlRjJUAojGfehUBLHl7%2FcNgHld0Pr8jhxjADF6laduu9113puet%2FYTQH2rSh5zeErWZPtyrHRQiLSqqxi6djFJH2D8LS%2BB2heoDEMBO85XVCSiekWC2GzTI&X-Amz-Signature=479d3be7200fdfe3bdb22f0e4a0cedc00f53277f872b1b2193e302801ce860fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLR2AEEJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjel%2BeNWJVVg%2FvMJv3yPG0jpV%2B3Vtp5%2BFbhHJlGogiqgIhAJtBS3US688JIsdOTqMTqAlxVmjQhrRDm1eQzeBSG1gqKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0LAA1NvCd1FuOX9cq3ANRzptlrB4w2unou9deiNBocE4ppiNd%2BMsnuFxGr9ECpbjU032wU19nm4lyk8bqZlK2fIbHfBjAGYuHWCaereqhWW%2BykDR5zFFRQF7Z03K8sFJbMAzKx%2BZGhnTLI7BFhwrEesmjFxwrww%2Fwav35h%2FuEEOnfjnNAu6RfPR9%2FvSqtyTNpKMkwSk6BWMRJoW72mJWAtkoMLdtot7rRdWmgnoI%2BEQhkDJE2Tcvp7nY9rLDZGWcEU1dQLv%2Fn1fctQn7Y2lUcsLjCZFfPbW8ipSKxhXoojfSKbocX6FJybhzLt5JnUQJrsCJwB2ueFN7HHYmPu2guNp6li1IoanE8m3pGN0juW2sPObW4JbIvq7BqXxUC%2Bn8XG%2B9dyBytHv5u5%2FVT1XRbP573GxQaLYLcki5E3Tz8UkWCy7jX0lyBKkvQsKV%2FfyRpGHLlB0IA3cus%2BwAvuF5iSIMo3vvsC6Gg817FSQLduFIvBrL%2FSKVpvsl7LLlQ8kwQB55v2zs%2FImdR5R%2FH9MciusWwUPKP4Jvmx4qGLYMvaX42EyTGnXSTl%2Fm1%2B%2BxJtpW4BsTmeDg9waqExDDSaS9aRhUv32J8wqQx0ux1oMp%2BMKEFCpjrjFheBHRwX5q90%2Bs04m52v%2FqqCxuPuTDHy5HOBjqkATO5bad6e44jYMxv%2BBMM%2BKGOCaVBMwI%2BQFdnE%2BNabe8nSYctwGr9t2LJ%2BXrWrcXKCFbxszwxVN1i7DU6ySt6kJqUIRZ1A%2Bo3BuxHlQlRjJUAojGfehUBLHl7%2FcNgHld0Pr8jhxjADF6laduu9113puet%2FYTQH2rSh5zeErWZPtyrHRQiLSqqxi6djFJH2D8LS%2BB2heoDEMBO85XVCSiekWC2GzTI&X-Amz-Signature=479d3be7200fdfe3bdb22f0e4a0cedc00f53277f872b1b2193e302801ce860fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3H4O4ZG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T010419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB1quBL%2BU%2F6kmxsCgW2gT2yl5IO7DRQhGHr5%2FZStR7g%2FAiBdiI6LP1byvxf%2BlWlOnvV8QEvKwmNXIbcgjdcIFAoGFSqIBAi4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLDFsP1585fODT%2BHTKtwDXxtO4VsL6zP6H%2BWqtMqRuD41SnYBCh9RwoczNt%2FOyZMhS9lGB5FLsZ8ADWQWL%2FltM%2FZA8QEPXA%2BuEZR32AG%2Bl2Z4PH5VtxrtrLc1DI2YESLPA0dennIKHy4ZQioCtHRZL5ruhuwfY5%2Fgfuziwov1iHPEX7b3gXz%2F%2BM%2Fz6ov1oEK5bhUbWzawfF1lHCzz8Gzjd%2BqiTaz87HY6iPMCTcjzIy32eVD60aQHNnD4oQdWbKKJJryRnpkf8VLVsPLV3vi%2Bv6CMkK7SZB55Dba6EdoT%2FraucW%2FfszybvAzfotOCBSyARU78k%2Fb00r5LfLLBKOgI6%2FEM9W7ASUPLEHua9%2F%2Bf1iVLYCdMkcV%2BV0Yga1pkHKcIGySL%2BVyoqvPgbwascjJMw03Ohe8kOTNnNiaLoVgp%2FCsk10hZ1xpw1Qe%2F%2FYqrrGuSpk1etGRWuvDXanv%2Bcb%2B2%2FvI%2BOyLVpjzJkL6cnUNCNB6G1OBRgn%2FThK98axbHKLbN0Ml6qe%2BlocnYECzRzGp7TXv22ZMoN9YObF%2F%2B5fKiQ1Ezl7UG%2FiGP0GXjW80pOSuMW92t8mwhfqf2%2Fso8wy8CQqAfGHuxd6A03oiWsJMltbWGfYwVVGoubjhO8KtEVTAanQV8EznvX7m7H2MwocmRzgY6pgHHuXWj6FlCC57OIk%2BX5QHde1MJkFr%2BM2c1gjCenpYyfKIn7wCfmV6TCfoZns%2FsN%2F78MygyzULtd63pl1qoq3LS3d1VrYhPWx1HBU4XmjGGRv9i4usf%2B4XzlaTTI36ygAqAr5%2BexqlAaxAjSPRe3yL1w6aM93mkK1SFb7d3K7Ur%2F4SaluVKppnNYhdXuvtxBw2pqMB1yKvZgmBXv4pUBxgU0NoaHoAW&X-Amz-Signature=865ffa7fce76e6d0bbe8cd1f2c37c03a7dbce9f758f05c46c76e322e4208eeeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

