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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NRFACR4%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDHe8khwoifQlrLH97d1%2Fvfw0zswcPm96aGNAAAZ5U0TQIhAOaf%2Fi4WCGtYleFsIebMvqDr0ieR5vpri33wPWsAWUGDKv8DCFUQABoMNjM3NDIzMTgzODA1IgyBIATvQ0srFo3Mtd8q3APTQ3qDeEGzFjV4PUAuHUK%2BZkWaRiQUYTr3ADkSVVV7uiOzsl2SNxx0X1sZn93ixOfB4faHnscRwzqI2ehUcXtHfZi%2Fc%2B0ro6knAp5ezObkaVVwNo7f%2Bt%2FKWmU%2BppuftGz9zjc1hZC8%2BqrDHqTtSthuzSqOwpbbBApZCVsNQZ9iOfzpDGi4tl7KhlKf40jD6jhtGrmgRLbyL6KmUJTa2tM%2F%2F%2F%2BOL23HTT5PQB5ntKd4annMNJLAUf4vNfRuUD%2FNuLGYgEAe7gP5Qdv8rxUEEAwuvqCoEQu0HhZpgwyxOb8edMZQK2ot5RKKhua0cpWwFfDiAIb5AAEOV7wbK4uPGdwgT%2FX0LKAJo52B2tiwu29MhiIcd9sCn0HVDZC9Uj4RzeIpKQcVWmzl%2F%2B7VBI6UJmCZbwwIVLg13yTlXCLEweJt5YC8Gd0synYB2o0S7vNBylivU2X0v8x%2BkVlmd7wZOcBefmRRxymRZgHDOH2AgGQJuffAunyw6v4tHJMl9c6pMhRAF14CEw%2FwG0kWzID6R5YAFiQFErRIJ1aCEqMaRgVgb4sV5RFOvs9LoOpcbJvHKhQONHNzywe1juybQZys54nXtQtGwhvZ8nH8ttshVmc%2BNtoiQD7WuIAK0KzO9jD47PvNBjqkAVkrbZo24Qe3Pfe7RnObM363rMELZAwhAfVa%2FzqmE32%2BZHcssxTXcmqn0uSOsYy6r5fPaOWy4D0A7IngCZ0SGzsmsNJPzfrftztrvCDf1BivogtVdheATF4IOqHRIWenF%2BK5mX8hLnWrRtUvYcaCPaIqBgeUSQmzU9EDvYnaUCSr5JsbeC9TBsHpJ2fHfsj3lPhYlsZ8d2upbYWOH9rn80Ob0kkn&X-Amz-Signature=52f11785ce5b798aa0b6b8059357ad2f700a2ad74dd2f3a21e8f6e033e7cc5b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NRFACR4%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDHe8khwoifQlrLH97d1%2Fvfw0zswcPm96aGNAAAZ5U0TQIhAOaf%2Fi4WCGtYleFsIebMvqDr0ieR5vpri33wPWsAWUGDKv8DCFUQABoMNjM3NDIzMTgzODA1IgyBIATvQ0srFo3Mtd8q3APTQ3qDeEGzFjV4PUAuHUK%2BZkWaRiQUYTr3ADkSVVV7uiOzsl2SNxx0X1sZn93ixOfB4faHnscRwzqI2ehUcXtHfZi%2Fc%2B0ro6knAp5ezObkaVVwNo7f%2Bt%2FKWmU%2BppuftGz9zjc1hZC8%2BqrDHqTtSthuzSqOwpbbBApZCVsNQZ9iOfzpDGi4tl7KhlKf40jD6jhtGrmgRLbyL6KmUJTa2tM%2F%2F%2F%2BOL23HTT5PQB5ntKd4annMNJLAUf4vNfRuUD%2FNuLGYgEAe7gP5Qdv8rxUEEAwuvqCoEQu0HhZpgwyxOb8edMZQK2ot5RKKhua0cpWwFfDiAIb5AAEOV7wbK4uPGdwgT%2FX0LKAJo52B2tiwu29MhiIcd9sCn0HVDZC9Uj4RzeIpKQcVWmzl%2F%2B7VBI6UJmCZbwwIVLg13yTlXCLEweJt5YC8Gd0synYB2o0S7vNBylivU2X0v8x%2BkVlmd7wZOcBefmRRxymRZgHDOH2AgGQJuffAunyw6v4tHJMl9c6pMhRAF14CEw%2FwG0kWzID6R5YAFiQFErRIJ1aCEqMaRgVgb4sV5RFOvs9LoOpcbJvHKhQONHNzywe1juybQZys54nXtQtGwhvZ8nH8ttshVmc%2BNtoiQD7WuIAK0KzO9jD47PvNBjqkAVkrbZo24Qe3Pfe7RnObM363rMELZAwhAfVa%2FzqmE32%2BZHcssxTXcmqn0uSOsYy6r5fPaOWy4D0A7IngCZ0SGzsmsNJPzfrftztrvCDf1BivogtVdheATF4IOqHRIWenF%2BK5mX8hLnWrRtUvYcaCPaIqBgeUSQmzU9EDvYnaUCSr5JsbeC9TBsHpJ2fHfsj3lPhYlsZ8d2upbYWOH9rn80Ob0kkn&X-Amz-Signature=52f11785ce5b798aa0b6b8059357ad2f700a2ad74dd2f3a21e8f6e033e7cc5b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPPWKD5G%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEX7vqd%2Fz3n8rFsDxczUzZVBOIvqgGME3MPQFTu%2FyVLmAiEAnPxkDbe2%2B5HqB0ywQiptwnJg%2FOt1iluyqjFues2nqVoq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDJpVUTb9kC6wrQ%2BSlCrcA2JnYFQmFrwAE2%2BIdbxuRmCG5WiKv8BVsyLP4ndIomXF5tqPuEiI8AMnqIgVB1C6dKct43lcyD9HNcKKQEDZbxN5jLLeYQhBzojbBDdm%2B17PEFerD3ZjMvcTPQMTqM8fDm9%2F6fiZKoM55HUuW5okePXZO1xt4fjwmkDA4KL6tC2TSK2ATcnjtKHRlADFJMMPLY4N38Z0hO3GBXWbWZowqCnw%2Bof%2B0mXVb4VdVF187jUY7MUOhVelowqi79z5Zor5orTBVOTrv4gnOp%2Fe%2BdISaGjfGkS5zXIVpU19UWHjsEdjAfqLHV0HRJ10M7rbVbuKZde9sfYdHT0Vhxr%2B8sJ%2BLCwJRl6%2BPX4NIqT3dCteMOm2bRO4Ft0LuLZHUHZmH7NViiN3Ooohhcb8V9b2b6NnIe0m%2BMyuXYfNa5eXnurJFYi7Azkz9U%2BO2h9jMRiSy8NMpjmqL2qxBAmcClXxThtVeEI1A1TJn8HszRv1kQpX8IyIu3QFGHYfKKQR91dl3Pqges%2FOKZ%2B3NPe5jmMFYfnxCfdQMKv55DaS5NAgkjCYxCZYNrl7iQP6WyM3VYxghTLn56jbV2HU%2FZfsAkeXa5X9ruUxpyfOVC9ANPd10TKwN0q%2FKm610j5ZGAAcoU5UMPjs%2B80GOqUBJHLUByVzdz069iRVM1ekBQXxiyREIWfQCNdGPEeXxVU0hmkFY0ftcgSPWrPlxL8Z%2B4dtIm72MZ5Wbkf1ASLLHjJOHzXYETPaY6w2RcR2alH5soKHuh0AyMmWuAZshkM2eLNalmWEmZpqsX%2BhEvTGQbs9QDfWSYlNda3v7aRdTLAEf7gCKN9srIOQl9uMMCysXJiI%2FGyZ9l0H37%2B3%2BA2%2BoUdKLAgI&X-Amz-Signature=3f8b66c295c7dca8ce01354eda7be5ad11037ab126ba4ca3a06060eae1efc79c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKNDCYLY%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG9tFZ9PgvuWY7VfJNIWQFYCHAKTMqW9UIkHuRkoTIftAiBdMNXgWO%2FsI3N2Vt6CSveGOCA5yCtUMyzy8KdjzWTSmSr%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMNSm3VcmJYNb1Od1XKtwDraxbyEHQMFMc%2FAnZp5ntRCQ4b0lVCmNDXvlZZApEyiXlClhRo3SnNLP1YHdcCjTwJAMSqVB%2FcHijYyu576OCpjBbzNUHquO%2BwgQqbOkCKwFlOvSWKu8ltQsRpwyVDUiLar3xLswiaa1goTFIbLvJeJOaA36ShFsVWQn2E3Y5516tqDFcRSH%2FCf34U%2BlU0HMN%2BoLAxkMP4Cmg0PgwQpACAKkQY%2BtEDqYU91jjht29XFjtsan2ZtQs2Ee6fafjGJ9LoMrO897WIDUHGp3J32J1OJP4xHQu70BGkStIBTiKxCChAWvWOrNQAKP5FJhLKdGxZZ47CpsJsiAmHGQ7b6Es%2FEXBeKnxOpgQlaTJiMyW82BgPWk21ViVbXn95LJN4rP4RqTG5X%2FnilseK9EMI9uD5Q%2BDClJFrukwa7ldWNREe%2BnSG6AEROQ4pbWfWLZwhByckSWs0bcwOciwwfjawAR0whir32BDHhi85oBrxIzbnUGMj5pUJsxmC44XG1R6LxpiQ3yXVIhJj%2FU9YmjVFQGeQSdsG4CfFx8zWwxXHMgDJ0jtuDXnXvlz6jheRyvtn2AF8DIZglbae224f4ryICfe97i3erQ2wIkJOv65xxOAM%2FOojvPvxY7ahU4bRc0w5uz7zQY6pgEZr%2FeHG2PDYHT%2FBGwY5v67AUjr0Rr4C1nB2Cw9uO3e0BJxofoWcZ4dWwExKRG8Gj0EsjdsLG%2BfEjcZLPB%2B92I01Z9xUCiJ7zWhbTaLP%2FthdNlvhdh5TduPonnwmj9ngzXcdsDgLNZcrkZabGMwIP1tyC5svmQg1dtnT4glKQcBiXc9UxxwDyMFt0t0IaFdSQibfy3RLF4BYBDmis11MEvA5sXJ%2BUL4&X-Amz-Signature=55a667ba9486ed697e4cc68555af10e5bf399ac5f1a5d14795d7bd69cec0756e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKNDCYLY%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG9tFZ9PgvuWY7VfJNIWQFYCHAKTMqW9UIkHuRkoTIftAiBdMNXgWO%2FsI3N2Vt6CSveGOCA5yCtUMyzy8KdjzWTSmSr%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMNSm3VcmJYNb1Od1XKtwDraxbyEHQMFMc%2FAnZp5ntRCQ4b0lVCmNDXvlZZApEyiXlClhRo3SnNLP1YHdcCjTwJAMSqVB%2FcHijYyu576OCpjBbzNUHquO%2BwgQqbOkCKwFlOvSWKu8ltQsRpwyVDUiLar3xLswiaa1goTFIbLvJeJOaA36ShFsVWQn2E3Y5516tqDFcRSH%2FCf34U%2BlU0HMN%2BoLAxkMP4Cmg0PgwQpACAKkQY%2BtEDqYU91jjht29XFjtsan2ZtQs2Ee6fafjGJ9LoMrO897WIDUHGp3J32J1OJP4xHQu70BGkStIBTiKxCChAWvWOrNQAKP5FJhLKdGxZZ47CpsJsiAmHGQ7b6Es%2FEXBeKnxOpgQlaTJiMyW82BgPWk21ViVbXn95LJN4rP4RqTG5X%2FnilseK9EMI9uD5Q%2BDClJFrukwa7ldWNREe%2BnSG6AEROQ4pbWfWLZwhByckSWs0bcwOciwwfjawAR0whir32BDHhi85oBrxIzbnUGMj5pUJsxmC44XG1R6LxpiQ3yXVIhJj%2FU9YmjVFQGeQSdsG4CfFx8zWwxXHMgDJ0jtuDXnXvlz6jheRyvtn2AF8DIZglbae224f4ryICfe97i3erQ2wIkJOv65xxOAM%2FOojvPvxY7ahU4bRc0w5uz7zQY6pgEZr%2FeHG2PDYHT%2FBGwY5v67AUjr0Rr4C1nB2Cw9uO3e0BJxofoWcZ4dWwExKRG8Gj0EsjdsLG%2BfEjcZLPB%2B92I01Z9xUCiJ7zWhbTaLP%2FthdNlvhdh5TduPonnwmj9ngzXcdsDgLNZcrkZabGMwIP1tyC5svmQg1dtnT4glKQcBiXc9UxxwDyMFt0t0IaFdSQibfy3RLF4BYBDmis11MEvA5sXJ%2BUL4&X-Amz-Signature=3623b2b7670a6c2a30b8e9de2586ef967cf19aaa2b2f28a130f0ced1cc4ca599&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UY452PB%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH715QgmMo0qrxD26K4LXyyROlAe93wapE5o25G%2BZvxQAiEAsbp5O1StkRBoqaVVEJ4AzeZ5RgpHFmSSvt24ab5zEkYq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDLQzLM%2FEBCk5RHdISircA0kwRWFp1kNcyWFAPtr7242hJFJCPlgqELY5ZjXY4dq9WNAj5%2BjhQDJ2aR6dKIKOpeT0f27irvzkuz49bep4xHBdib3bDoJGH8D%2FPD%2FrV1XwAyjUhTih3cR7B34CB18s4yAKkJD4Wvx0F0knrFGQVgb6WlC3%2BPdeMtAfIFm727kn1O4Y%2B5uNdBUhsKwFzJ1SjWOgSMgxtqaeGejhigweJyiFNw7HJB6INW8BWNb0H4Wm4CK4QIrez2vBA2iH0JhoYjfwG2XRkvvrjEhbm7IQzFORmjnLLF62EPD9e2QCueEjfIpaElIKEYysQzteOtHsvfLHIMH86X6h6BHlLG6ku3e%2Bvq3WUF%2FZHQR52a%2B2yIja1mWGOwy6Gx7L%2BuEVlHpu%2BN2Ft7X3%2FDiQ95hjmYAcrXwRYS3%2F6PdzNEvPxSIqHtZd0%2FYTlC65Ax6a2hfnbAo%2BvsHClF7WB7YJDhkeGkvnU1mEpz0Z%2Bvlr7lvk5FAx56tcby69DevEYvXdLqXun%2F2nKRbAYjtyrDi2%2BXriE4JkubpB0doIJHHNTqibwIau8cXOB98n%2BqIzbD%2F3JOHg4Wn3Wg9RJPJ7my%2F6w%2FfIE8VgIGU0QtDcOr5ztyycjLIXZKgjRRaOVRVYAg6U9ue2MKLt%2B80GOqUBphbAT6zJGw3hjIU7TRYyWKta%2BttKAwrkiKEg18JHFiOw8aEP%2BABxC58GxvuY%2FypCD%2F7mLKcPyPBzWiKgJvRrdPouMwuUO1Lwkjz7IFzIfJv8WlKZDxmkzun2xvl25C746XxWowTN9qtVQUIP9BiuHYc9fTlM3exfsskkq%2BRSD8tGy0AfvWPkaoLdVpU3W%2F0VYdeNg%2Bh73%2B%2BBhrjKrSlakNfQrVgW&X-Amz-Signature=f26671b85831d080888595ba7e376d9c16b52a031e1db7a41881c55743b6a0d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQB3PNVU%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0DWiqn4nVC0%2BqJ2OZLYmEV5NIZ9davBYJ%2BS3FbxuLPQIgWzKWxPFw%2Bge6W68kl4T%2FwLycyvPOMuMUG97f8mxfDoYq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDCkgGd3KU%2B4RxYAxuCrcA8mC3lK58PiYyhO9sbSQA80DraYnIZ5BmQ93exRebkkh4CVBwOq1l%2FWEhLiYZHig6rQdlmTdvnnWXzO9wvEcPJJ1wTYfZRoNu2aQBk%2FM4JZYoOU1%2F1ige%2BRcj93wzpWhhJo%2F0QRroBNKTN2K19PdypDK7sTfmoHKYSkArumHhpEEa%2FIpi1Jcbdv0txUmIGQbKDlRGv4l6l%2BrRhg65N%2BqB94z7KDjxMYSpzsiwM%2BWeWcmoVYzZNYrpJYLqWgbMVcgGDeUv3wYnnPe0g03qUGMDKw9%2FYB9tYr8dvItT1xVDujLb2xcjD9J0OFxLEUQ6y8b1SgnxjewWjDQjNDW063Pe2UXRh7Or7QnPa0%2BVQOaWR2mZd7H5dHHWuXkPG56Iovsro9iLHFxme8FME76rgqNJdH33ZAPgyhvdEn%2FDcW2wURhfiA7qcyghptg4HG9YgGuOA%2F7pzFOOwv%2FzR9rYfjSGqx1xrLRZK2EPYzu8hUfGkcm9pru7R36Q7FtbfvdckhDphBeCmB98lbRnJd4ikhHQuLtploXK%2FGhoTLJBZlCouRXikckBNoCr%2BYqjzTxswnGKq%2FZqDZg%2F%2FmflG87pgJbp0V2E23M29zN90lve1l6EACseNu5YLcGU%2B6giYErMMjs%2B80GOqUBEmCHvxuOH2nrYbZptetB5lE1Ehuuzje2F%2FXo4R1xgdDi7KooomH0ALOqZyz%2BCFb5RDCVAdz1cRdrbrqkmMcV4BH4ykQ3yapJFCa5MHpo%2F911dO%2F7d%2FxB9sKpKcf4x%2BvJL3aVZZj8UQWOdReE%2BgT008wd0RQyv%2Fa5gfcM8XUV0ob0s0ihoMGl%2B9z2cmhB4AnlRMrEVdQ9LoeyTS2IHVaeb6Wz770m&X-Amz-Signature=c1de40c2909bac0c64d090eaa0512bd4bdcc1956321a01c1009cb23d48bb65db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667N6GZBF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZGr4eTFZrK5W2nP9bctITXtZRRKTXUZWjtDJmnWLgiQIhAMMrVaf0ZWBG75%2Bp8hSQRvo8NH1IJkg8KUuwV%2F%2FOruwwKv8DCFUQABoMNjM3NDIzMTgzODA1IgxjIbzAiC3CzLCJpxQq3AMH1aPCKHmiLQvLLttJxllJBOL2GFgqXlHjL%2BXQH%2FD%2FLUYOc%2F9iH66J6BSXwLZIK6XFB7hlMlRdRBCBmQHESo6EcGr1lmQWMvgSPyrGu9UVsbCJk96M%2FrY1ZPHj3xtYZEpsxlCNm%2F4ep2g5PBa7YuHrGiqUK65ylzMos0BEcu7cuPIvgXJUHbycKZLqSXjuMCq58xgzMEQ4zW%2FGTbMEOwEAYCAuwD5Zm9wv36PnM%2BWxbAFkTznRiwLeohR121vRiHDWefro1E2nqz59DWoVMjLPuxASpbe64mF0bqiT%2FFkC3cGM%2FGppM6S1v3sQlj4YxgqTleYcHf06yKCY2lGp4iSKHPxGzjG9MDG1SmpDz6WE8p87Q8ha5pXs8qC2mHh4GAWAHdRCTpfbiw7YgiNxHmVjO3y4x0pkTLvCaQV1Pymoeq%2FfSPRaYifOHwVl%2B0tboZVqRUlub6CBNxQU%2F9J8Kn69G%2FnPcKgeaG5A9WRSa2%2FOCCkKRfmhiG372c5XrpGWH9Opu%2BKZ36Kkq%2BGXGfb8YxrmHepgIXkOf8JYpeGAjTbtlbASMzZLEH0z9pNHflRS1aKdXDmDrgCIpIkp2AT%2FsgXWQSo72nxFA%2BS4i0yYCtObLxfcplA92EkueTuzXzDs7fvNBjqkAakJ8o1zeNhapluShzQSGRJd1iH4mZZdLX2frt4Guv%2F2%2FQY35EbLt44qogzfe%2FwgIfMZnqrZY5n4%2F4r7YY3su6DCE6Kr%2BayCR5GhX28AzzUVkKUyxc9COkIIOSyvnOV9CA6RKPYGXmnN%2B44I8getmpDDVFgqvaoHRQz6%2BMnGQ7uPfHK5KI1xAkX%2BDm%2Ft09kRkgSJ5AuQ%2FRaabXdCRjCHfLKTWHmR&X-Amz-Signature=82064599458bd436ce1c46434b60d524878fdc970caf71433a3b50c92ed0fcd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCJXO3QS%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA9mXLeYcjDvcktx1KuqdJpYMVHqj%2Bx9gsASn4gSIoQWAiEA%2BkwM%2FxIxzoi3qALfSFspceRXD7WdLQusD3TdiuK3qO8q%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDBHPK8Xn7v7VhcMNPCrcA3VdQ6pr8%2F%2BCTfh5FSlsXqMQdw%2B5CsyHyHvpjJp9KmPaN1q8UwpVtCD2LbPMcS0bLlyPnfwTy2Y1jHvfVNAiNzTw%2BGkcpLvAQet3J8wLYzCUopfsZAOkK383Ar5t1OpCJPXPCYWXRlsaX8xsiE5JqCF5UILyJJzUEcLsTyr3%2FQ9RrVoUxiFsmQ7JyqtmUufU4kBa8%2BIQdmtFq11oytvuZuFmWGOk9j%2BitYbIbvNkP4IZpLowkfcC3IyY8iTxez1PhqdTCIzDlR45DbXzjjZlaxwfEDWP2XEHz3ZtRoQ6UjBZNDWFT6vEfej104JAFqjXm15TcaR7x39pL2au3OOPYfIcA0S%2ByxIXvUbt%2BkeQ4vS97T6xgyPaJF29oivL7oMihwYzPlJBA27R2ptrhrylKFamaXqTia82%2BiNMnC7Ux%2F76ACY2JGUFzCkmVGEJ5GF6UBN2njnNCMw3%2FSKutQ%2FFRCQQHTzsMZ0aXAsvcxdmDRd1u9CUPqwzNXl6bVJ3kLLHt2mBGYFGzneUdXlhbr9l8LgT9grlIIUtXPfOal63XupcBEDPI2CRRv1lIukDemxOZzJ0yDczurXHdB%2B0YpwBSQslEBi9gVQKhWGpAwHx%2BuutbOYrZI%2BRbXaRMIxzMKLt%2B80GOqUBTSaQWQJt09ZFMoUoO3gVkamk2YI4rOlhHA6gzG%2BObWXFxtQoBpQNtIXU41Tk7ibAdJ1FOtShVDESMg0hmH2x8L4xQHHmCkXUWKTzwh%2FDwxmcz4IwionBoXrmiDzJUkNo6gG1BfTUc4xCqrMfDh0u0NAhf9n0tgHC2e%2FHnKaDjbO8e7C93ZDlMz9o17yJnJEnfnbJgL5dmhGu9SmoJBPuB0skn%2Fyw&X-Amz-Signature=0b5f687ad9f80639720930679357b7d6adb02dec65fd962b54e9ab98378b17b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCJXO3QS%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA9mXLeYcjDvcktx1KuqdJpYMVHqj%2Bx9gsASn4gSIoQWAiEA%2BkwM%2FxIxzoi3qALfSFspceRXD7WdLQusD3TdiuK3qO8q%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDBHPK8Xn7v7VhcMNPCrcA3VdQ6pr8%2F%2BCTfh5FSlsXqMQdw%2B5CsyHyHvpjJp9KmPaN1q8UwpVtCD2LbPMcS0bLlyPnfwTy2Y1jHvfVNAiNzTw%2BGkcpLvAQet3J8wLYzCUopfsZAOkK383Ar5t1OpCJPXPCYWXRlsaX8xsiE5JqCF5UILyJJzUEcLsTyr3%2FQ9RrVoUxiFsmQ7JyqtmUufU4kBa8%2BIQdmtFq11oytvuZuFmWGOk9j%2BitYbIbvNkP4IZpLowkfcC3IyY8iTxez1PhqdTCIzDlR45DbXzjjZlaxwfEDWP2XEHz3ZtRoQ6UjBZNDWFT6vEfej104JAFqjXm15TcaR7x39pL2au3OOPYfIcA0S%2ByxIXvUbt%2BkeQ4vS97T6xgyPaJF29oivL7oMihwYzPlJBA27R2ptrhrylKFamaXqTia82%2BiNMnC7Ux%2F76ACY2JGUFzCkmVGEJ5GF6UBN2njnNCMw3%2FSKutQ%2FFRCQQHTzsMZ0aXAsvcxdmDRd1u9CUPqwzNXl6bVJ3kLLHt2mBGYFGzneUdXlhbr9l8LgT9grlIIUtXPfOal63XupcBEDPI2CRRv1lIukDemxOZzJ0yDczurXHdB%2B0YpwBSQslEBi9gVQKhWGpAwHx%2BuutbOYrZI%2BRbXaRMIxzMKLt%2B80GOqUBTSaQWQJt09ZFMoUoO3gVkamk2YI4rOlhHA6gzG%2BObWXFxtQoBpQNtIXU41Tk7ibAdJ1FOtShVDESMg0hmH2x8L4xQHHmCkXUWKTzwh%2FDwxmcz4IwionBoXrmiDzJUkNo6gG1BfTUc4xCqrMfDh0u0NAhf9n0tgHC2e%2FHnKaDjbO8e7C93ZDlMz9o17yJnJEnfnbJgL5dmhGu9SmoJBPuB0skn%2Fyw&X-Amz-Signature=4fffcbbf8dc2070fc776dbf2d976536143df9547a40a2e3db3835673afcd1e95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PHK2NOQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDywyD8eqadwFPy7bdPw0dEc3V6jDEDAAgpyaurA3SKqwIgaMEJqtuscjdX8b9yWOER6hkTJK8SP%2BK5zIAWWMnx%2B5Iq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDEgopr%2BhXYZz%2Fu80kyrcA%2FD5wgb8GmS16lVvT0LosigeZDmEg84pkEE5KQjle6%2B0Z7lz8ONVCwMHph2ZPM1im1gydib67plXS4ZWUyVLlfDKGQ76JBp5nzbu5lr0JEG%2F%2FE1C5X5A8qSksBHpOOTNU8Ts7jbuFyDP%2Bo%2FJtR2paJ%2Fp4qicwIqYZ%2FopcqwKXjiRijOP3Ea8SQaj%2BX6%2FNHfpzzLK%2Ffh2j0ejMk%2BQ0elgll8QsWvAUO8PuMVeuIg7Gra2KO%2F2P8cwZuUAysvFvdtnaCwSJTwjgwCMgWcr3pAJmA18mePMWF1Wdu2a618rD9G5pyFfJOfmR29xBdN7MHwsCH8N4mdRt0MVXm5yeHGCHo4rbRb96ZCTjP8FnJifWiIMxIY6OiH7De1g5Epxj5%2FkummHQ7v3QAThVrXoSBcAOzEpY8%2F8KEYvR8C4PGobZfIJ0S4AugaDa0w5cZ%2Fm%2FNdQecTzluVkZDU%2FwDE65%2FpBnxjiZbQDT3YaJGyUl0wHF%2FBGAr9tC3AFyVoKtR1kZIOlmElAIxZ4XVMPuljY2xGFRuUiQn1XZUbiHnLbQ096QyilGt43bzJ3DwTqoyWeC8PT5vcfE2dZoYxPJByQmuZdae6FndDBIXVLCs9uzuZWQ0xvy6LRY8rxl4dj%2BgeZMIft%2B80GOqUBU1UUmsD%2BpnnLNB7uUjt6FloDmE4Ue1MF2mKjuIuxejFtVQWZk1SvHk09sF8PYhBg0%2FvoT0Lwh3lIOUtMHnnqaYrcMOiIT75dKIvs%2FSFnnX0lm2tC%2FxMSPe95gG1Lp56QC3J21HFOQnnvsaxM23fDsp8DyoePqkD57hOM4mhxIw7Alj1k59iwhayLJEbBAfNEiuaXQetWeJlPRUOfxXTMWWWEbM0p&X-Amz-Signature=e2e39baa93301c776626eb9b52354c32a07bc6405dfe2183f1e81d62675642d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7RXWW6M%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCl%2BTJFBo%2FKRP%2BD44qMnW1YglvHPurTsDH2tNdYoRvR4gIgAoUY%2FOEF%2BGW57zoLRd8Twkfalc8kkxCKZwE6g9EIp5Aq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDPKUkB%2BtUvNqSvgtgSrcAyX3zm0TS8Tx1ijN1K5CruYA3oUV4c7frr4NQfrbR0wX9WCJzG8ndq9ymEwjKN2ft75N4lm7KrxRdb%2BPl5p3rnj6k9FGuzu90j8sM1%2BJtbXqyEr4WAGaM5UIztJFRmUXpdpjlKydDOefzOBLoQlYW2BPyephHcOp18zt9Ag13VEb5t97%2Bx2jdpNjPXgl%2FBlrVlkIibDdQ6FoBhh3ur5nnFGvofuMBUUhDTmj0PzXo27dCJmDT38X9kPJEgNsWfEwldOSd8y3y1nEowQT9hwz7eT9oNHhTOSHYEXMKpSB%2F0UncetcDdqtnlnH0485TcmuStGLEykRraqL%2Ba1rbN%2FVo4rs3a0amo4g%2BNZAMP%2FC%2FTfkEUH2LW45cTdCi3Dw8gZIFGwbztFcCDFl8zOVPAnjHuoShBQpaFd9JrPrIu0qIEZIcNUf%2BtCMnEHwUpnx8mPcWx5OffC5lESRAB1a67phcqhBADDD1DcwNC95CBGpHRKE3mcFGKSvLFknMDy3bSjPeyKcU2fdbjxVypxRCwp5SPGme7XqFhAGasfeR0jYWTWrWD9PvyQV3rMOpLL2j2yyxY8bQ%2BI1nGU%2FlVqsfpwkypxsIY0HWGqE6CryjynfGAh9sKVUAojexRWTa7t2MLrs%2B80GOqUBO8WJUimG8THc%2BWNFUTVJx0%2B3nVORiDf1pdeuuIBhAKWN6IqDx3LlBgF1HYfi%2BGOjzTi2xrfbwFbR2hIp%2Fl0C672ESxrFdnGdsYr00GC2urd6oqIKpO9yYbJk6CZX6FxIYbt%2BSCDjXKLrXvRvM4ZNf1FSgAODNms9WW2NDkucUEmTBW3%2FB4mjuPpuxtLGjbQRIRzkA9eeKd4PFKWzmqBqPjZqrcW9&X-Amz-Signature=f610bac3734058e3d5c7ad8926c78df2cdcfb74ebfc5c17241561cde8f4a4b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7RXWW6M%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCl%2BTJFBo%2FKRP%2BD44qMnW1YglvHPurTsDH2tNdYoRvR4gIgAoUY%2FOEF%2BGW57zoLRd8Twkfalc8kkxCKZwE6g9EIp5Aq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDPKUkB%2BtUvNqSvgtgSrcAyX3zm0TS8Tx1ijN1K5CruYA3oUV4c7frr4NQfrbR0wX9WCJzG8ndq9ymEwjKN2ft75N4lm7KrxRdb%2BPl5p3rnj6k9FGuzu90j8sM1%2BJtbXqyEr4WAGaM5UIztJFRmUXpdpjlKydDOefzOBLoQlYW2BPyephHcOp18zt9Ag13VEb5t97%2Bx2jdpNjPXgl%2FBlrVlkIibDdQ6FoBhh3ur5nnFGvofuMBUUhDTmj0PzXo27dCJmDT38X9kPJEgNsWfEwldOSd8y3y1nEowQT9hwz7eT9oNHhTOSHYEXMKpSB%2F0UncetcDdqtnlnH0485TcmuStGLEykRraqL%2Ba1rbN%2FVo4rs3a0amo4g%2BNZAMP%2FC%2FTfkEUH2LW45cTdCi3Dw8gZIFGwbztFcCDFl8zOVPAnjHuoShBQpaFd9JrPrIu0qIEZIcNUf%2BtCMnEHwUpnx8mPcWx5OffC5lESRAB1a67phcqhBADDD1DcwNC95CBGpHRKE3mcFGKSvLFknMDy3bSjPeyKcU2fdbjxVypxRCwp5SPGme7XqFhAGasfeR0jYWTWrWD9PvyQV3rMOpLL2j2yyxY8bQ%2BI1nGU%2FlVqsfpwkypxsIY0HWGqE6CryjynfGAh9sKVUAojexRWTa7t2MLrs%2B80GOqUBO8WJUimG8THc%2BWNFUTVJx0%2B3nVORiDf1pdeuuIBhAKWN6IqDx3LlBgF1HYfi%2BGOjzTi2xrfbwFbR2hIp%2Fl0C672ESxrFdnGdsYr00GC2urd6oqIKpO9yYbJk6CZX6FxIYbt%2BSCDjXKLrXvRvM4ZNf1FSgAODNms9WW2NDkucUEmTBW3%2FB4mjuPpuxtLGjbQRIRzkA9eeKd4PFKWzmqBqPjZqrcW9&X-Amz-Signature=f610bac3734058e3d5c7ad8926c78df2cdcfb74ebfc5c17241561cde8f4a4b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDNCYMJC%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T221108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDgGW%2FxGd52xBSC%2F2dxe78ZviqbWZopX%2BQe2S85SN6X8AIgCPB11sOVdpRYsK3w9lsHA7f%2FfYaAoeJtISvWAH4Lrycq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDL04TxSFb3HGNqBx%2FCrcA2c6sm55NmMbkidGB%2FLVV9Pz0aVgRziPbZZc0AnWYLNuLhwWxFWe%2BZcHWLwesNJbzVjgiHokaSGuQHWeGIQnLWehmXeC6FvwyA%2BCS7MYvKB%2Br5NVrgk5%2BK8AcGQdoRaAEN%2BdDYKZKqbOnUw1nR9YZQ6ndbpMSfEZYBoBvNl%2BKvvLPebAcE%2B%2Bc0Y56Bo%2FOB0QMWAIvm3Hj94S0WFC8g2bXKIAo1pqDw4gNSD9Vxa5w9sJMVZIlZAxerNgrvvR9JoNPllXFPXSRLZvC1sAtyYiqerGvHLYmJL8WSqj6bEiM9m3HCtarcQWt2JjofB7g2%2BGm8mPY%2BGmpC3uxeATn1wDCPKDKsiiWsRwbc6S7TspNZ6lfqgnfCS1E8Axl8swg9wBAFwiJp%2BdUvtdYj8YdV8JbMBA1fsJVb66ZKrHVojKjavhB3Knl%2F3dcRUT%2Bkqh4AScb3uyjHJdI4uRAh0iHbC9MaU5GK%2BPpC7neeOwQnauQW%2FI4EU2tgLjMkGi645MgnpEln06daswwZeC%2BB8Q8aw%2FLfppkTqUSJNcIsNruarBuvSUcvR%2FXIQ5utwGnHp%2BUQM6psQ29l3TLzOqjf7GHshFqy4HTVozRMTUYAtonzO7boZO%2FwFf3GU8uClmL1BgMLrs%2B80GOqUBMlxEn4afjTtJxLTfchqcLFyVgVSamxLnnCkrXH7%2FeSsKyr%2B%2F5MkNZKFzRpARQYFHu6OPTkUguwCi6UIsxRFpG2i%2BXSRVOSzOrsJmURJMcNbbYalrqyizguJUs6FigtcawlwKXjkS6UJKPQk0WIMy1vwkLx9dsdIwzWqcvqSqABcBKdzvf1O52tyZW1rEpxPiVW8TDf8qYWg66fCJU2La6NU%2BUfyX&X-Amz-Signature=4b831968e7a5d4efc30c379cf403252c011b99553368b0ee4956cb674e56cc54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

