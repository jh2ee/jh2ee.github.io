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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674K4GVET%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIGaI4oZGh0UTPW%2FAYh1dl3aVXSQSBkamJd3I7J42S2DQAiEAgKgr69xRD049GM82gfhSiY8Me152SVN%2B9rhdE9%2F0ZLAqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK%2B08cflQDhs%2FQ71lCrcA9kYI1T3CAhkl6QwNbD8hVGb0j9ZZrrmeXIq1IxIROWh9Hp11q7EYMNIM7X8IyWrbmFJKd%2BF6iiwdtzgdQUr5%2B62X%2FERLdruhtWl0z1CxvDBuGpmNTdsdnPdtUlXCqipqodPnhVR%2FsRMisVQEXAck5U4xchU48LyNT8K47N2AMX1XoZyvPMAdzJIxeEMj2NM5TUaFtwv2yEB2UA77gZ4OYvfmPyU9wotP4xjY6lQxogWoq0QalzvPu%2Btlo9hfXQ4URaw1BBvVvu45l7PZmhvPOdT%2BTWXlqpym16K7G%2FHn6SfP9oe2XuP7uHlqu03Ur3cSkSq8MmiCRcrwFtvc%2FBj1tMj9R%2BXJ5mU%2Bq2rKCm%2FFvj0lT%2FIANXQMNyyvmaMTDC9A8iFyh82PNhnoLvPjB0VbSGGeKeVA9uL5crtdFzhp8d0wYEcNGTGS7by%2FuDBYkFzgw4KI9kSYPLm72kiWv5tXB%2FpP1SiL8rSMgiWMppetTH9rAT7QuAEmeZjvEDIW7%2FPXzjTaTSFsYWCVkXeLre6Cz7vvZrckQO80miJYLT%2BZiipnQhPntLrWOjWy1UM0hfq6cbgV2qrzbGyz3SXKaZU48EnnfZfRq%2BF1gEJCpZhbtsp8suNv1hae%2BDBGsQxMOqAls4GOqUBS6i2V3ua2Zw8wiFvOTzmY%2FqwL%2Fomk0lCgExQoEh9QxYkqLA686tnt%2FoSydGyMG2OKzKblHKm9z6doY4dIIGQUKAhjycyC9E2fTZ0%2BEbeH71MXdNHO0E7g7mvSH3vLA8AUDpZHKvhGZVLHY5W65Ki11XcAnm7S397W%2Bs5uDVNxbcINH0nih5fszk06qx7JnGTobfNG244ITGic2gE9v48cwJlMm1v&X-Amz-Signature=7921bd10a54605d2ec3f0836c515233d7a6381b23b70c76279734475ed3bbd4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674K4GVET%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIGaI4oZGh0UTPW%2FAYh1dl3aVXSQSBkamJd3I7J42S2DQAiEAgKgr69xRD049GM82gfhSiY8Me152SVN%2B9rhdE9%2F0ZLAqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK%2B08cflQDhs%2FQ71lCrcA9kYI1T3CAhkl6QwNbD8hVGb0j9ZZrrmeXIq1IxIROWh9Hp11q7EYMNIM7X8IyWrbmFJKd%2BF6iiwdtzgdQUr5%2B62X%2FERLdruhtWl0z1CxvDBuGpmNTdsdnPdtUlXCqipqodPnhVR%2FsRMisVQEXAck5U4xchU48LyNT8K47N2AMX1XoZyvPMAdzJIxeEMj2NM5TUaFtwv2yEB2UA77gZ4OYvfmPyU9wotP4xjY6lQxogWoq0QalzvPu%2Btlo9hfXQ4URaw1BBvVvu45l7PZmhvPOdT%2BTWXlqpym16K7G%2FHn6SfP9oe2XuP7uHlqu03Ur3cSkSq8MmiCRcrwFtvc%2FBj1tMj9R%2BXJ5mU%2Bq2rKCm%2FFvj0lT%2FIANXQMNyyvmaMTDC9A8iFyh82PNhnoLvPjB0VbSGGeKeVA9uL5crtdFzhp8d0wYEcNGTGS7by%2FuDBYkFzgw4KI9kSYPLm72kiWv5tXB%2FpP1SiL8rSMgiWMppetTH9rAT7QuAEmeZjvEDIW7%2FPXzjTaTSFsYWCVkXeLre6Cz7vvZrckQO80miJYLT%2BZiipnQhPntLrWOjWy1UM0hfq6cbgV2qrzbGyz3SXKaZU48EnnfZfRq%2BF1gEJCpZhbtsp8suNv1hae%2BDBGsQxMOqAls4GOqUBS6i2V3ua2Zw8wiFvOTzmY%2FqwL%2Fomk0lCgExQoEh9QxYkqLA686tnt%2FoSydGyMG2OKzKblHKm9z6doY4dIIGQUKAhjycyC9E2fTZ0%2BEbeH71MXdNHO0E7g7mvSH3vLA8AUDpZHKvhGZVLHY5W65Ki11XcAnm7S397W%2Bs5uDVNxbcINH0nih5fszk06qx7JnGTobfNG244ITGic2gE9v48cwJlMm1v&X-Amz-Signature=7921bd10a54605d2ec3f0836c515233d7a6381b23b70c76279734475ed3bbd4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQ23BEIT%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCqvNVCkjwmx2%2Fn8I%2FgQPNMgwM6TATt2A3sdfrjv3jrOQIhAJcidmmEYSWMoIBPCYjPbt6FaOhdaSb8N10h3JDXgBokKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy2gwG0C%2BuH%2BcSBkaEq3APz7wrZ5cGO7STsW8NviwlBoN6z%2FS8ab6zGACzr4TzgaEhbm1TrnBbAG8carDGcaVyFoqk1vNTooyapOOrGSzO0ztu6vdXToRUz%2ByqYjRP7KNCJGjBuzQZqwtCBRMuXz2JHU2AnwC%2FeEm%2FJ0Ja4V1F6rE8Nz6QqY%2Flf0ZJX1V8CeaS6UVirD4ENRSe%2FIwQNZW5MOUu0E4PwU5qX7u6AyUAL2Bgs9i%2F65lnLPZliYgciacXjjOXgcCFPQbt%2Bow3%2F32hDN%2FyD4nhF8u0ne7ss16WuT3XXTNzQCHQKxfqj7nLkLjCNDJDBOtm5y6z9Ydv7pyYNRuwyzHzBKkGJ3ZeUVL1SGgpdaehj0RhT18wes54Po8WlzVajUXUkHjkme2Ezdnc9duA%2BritUnhl0r46pWienMCAwcGo10PvOKRm5TwlSJBJWvL5SJIKmWssDZKQztXKJTd8UPSHIKdQNcwLlcRiXr%2BFI%2FaZ5EtzG5eWeo%2FOq07fA6d4QLrb4Ha%2BQTF4KM24QTUdue6pWNTLeez15PzYaAvjoNSZvfc%2BaNCaDbkkupojn%2BIe6dmif6LeOuqlynvuerMEYONMGWaH1TveQmwcOAADdofZuu2c%2FZi088z%2BzzK7cunlV8z9cdZa7hTDagZbOBjqkAS%2BaAZtkiWLZl6pzdIuCVNXFRcViCo3PXvT0XD6sKKwE2kMJm0Gc4hDElC8n0MR9ZnmJ75K7%2FZp4QKDBlvZUSoVmQRNB%2FV%2B%2ByuFUJVHDpjZ3kPg4t7Rh%2FZ2MBaQK06UbMsCxlX3TtDUeFB%2BWq65kGQOqIqyvrWcspFmRSwUNkKdo1duLIvpTOnibgsdq6v6BScneaRYwbgg28dQu2M%2FStVaqEc8V&X-Amz-Signature=fcd4d90e280761bd6e09f83492dbbde8007db2a5b22064135f633dea9af0b438&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SYE6O7T%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCmcKS7RhkxTTgojmyPyL7O9rqxmhN0tv2RLrtX0o5eOgIgUtUWu%2BCuQ7b9TMV3Q8uNXCkGgqFXHGecBB%2FBzqxTGIQqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLxwSspzUujoQq%2FbzSrcA%2FxQ5duenTI25ButRb45A3piD72bltB25coq272mg1Ju%2BVtmjIMwjOGon3171EWIkCUnE1o3cZr0pjuwxscSyJiDRFDFijx0L8h6qGqKmAp%2BcypldCuco3AY2RuboF0lu%2BFrpSl6ne6uJDQL5iXYj%2BNanxPKgobB5%2FRAsvD3PyiuKrFrkhbUilBuBbvzhzrHClF0qjBMzy3KlV21qvC%2B9hI6MaZ4htM9sif92uSJBJegR5h377Hg2MSzDFtDbFMSIJ2JBdqMR1gk9jUZjQU6VZ5TnDpg3Uw2A6EHb6EZURt4LEIEOjzMX5dRiDNzu9IirYfl0FUnWsAlUUq1iMMiOMJVlTnch6XaQeTPulOyNItNsTbbI%2FxZ%2BMb2%2FtbqnHOF%2BrOfUJWtbHIV930YQ8UGFFIAw8VSXmZ1cjsl7vzwGOb0X54PTTwIHfJSZqARS4iqnA6%2Bev%2FvQzT9sEMb1kqlWUgceIwlKKV2VGQydCG%2FndaYcjFxeImxukYN%2F%2BVZXFa9hzQwJQvzAsAxcyYqLYL7IkV8WZuVugca370pQiWPUxdfrqocj8qTtOnvHTDpV5G%2Bgl7tw7EgNAKpOJ5UJPk6QqEKBw7Awl%2F1buq5V48%2BL9696r%2FXZIIJtjjPUzxlMJmBls4GOqUBELBbHnkQZxl6TOJbgaULykxmPujlNCwFuzVMK%2Bp37MVY5HUnaJD%2B5rohIV5a7fSwHjcuHaozNaQv4ITYeH5BLFHPMVzwIGNc9hv89FPOfV9CXbN3zCkIzUQOjald4f6Iv8uXIW9kwVxiX09Rw5p0LnqqHnXUKmaqu9rHz1gLpIoahkVzl693yOzp%2BlHIqvKi3RneNm0fwceRIDup1O6cKBWGVbIE&X-Amz-Signature=f798d8e4779cf29de9dbbb21d4911f5177af8daa020131472239427587c84450&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SYE6O7T%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCmcKS7RhkxTTgojmyPyL7O9rqxmhN0tv2RLrtX0o5eOgIgUtUWu%2BCuQ7b9TMV3Q8uNXCkGgqFXHGecBB%2FBzqxTGIQqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLxwSspzUujoQq%2FbzSrcA%2FxQ5duenTI25ButRb45A3piD72bltB25coq272mg1Ju%2BVtmjIMwjOGon3171EWIkCUnE1o3cZr0pjuwxscSyJiDRFDFijx0L8h6qGqKmAp%2BcypldCuco3AY2RuboF0lu%2BFrpSl6ne6uJDQL5iXYj%2BNanxPKgobB5%2FRAsvD3PyiuKrFrkhbUilBuBbvzhzrHClF0qjBMzy3KlV21qvC%2B9hI6MaZ4htM9sif92uSJBJegR5h377Hg2MSzDFtDbFMSIJ2JBdqMR1gk9jUZjQU6VZ5TnDpg3Uw2A6EHb6EZURt4LEIEOjzMX5dRiDNzu9IirYfl0FUnWsAlUUq1iMMiOMJVlTnch6XaQeTPulOyNItNsTbbI%2FxZ%2BMb2%2FtbqnHOF%2BrOfUJWtbHIV930YQ8UGFFIAw8VSXmZ1cjsl7vzwGOb0X54PTTwIHfJSZqARS4iqnA6%2Bev%2FvQzT9sEMb1kqlWUgceIwlKKV2VGQydCG%2FndaYcjFxeImxukYN%2F%2BVZXFa9hzQwJQvzAsAxcyYqLYL7IkV8WZuVugca370pQiWPUxdfrqocj8qTtOnvHTDpV5G%2Bgl7tw7EgNAKpOJ5UJPk6QqEKBw7Awl%2F1buq5V48%2BL9696r%2FXZIIJtjjPUzxlMJmBls4GOqUBELBbHnkQZxl6TOJbgaULykxmPujlNCwFuzVMK%2Bp37MVY5HUnaJD%2B5rohIV5a7fSwHjcuHaozNaQv4ITYeH5BLFHPMVzwIGNc9hv89FPOfV9CXbN3zCkIzUQOjald4f6Iv8uXIW9kwVxiX09Rw5p0LnqqHnXUKmaqu9rHz1gLpIoahkVzl693yOzp%2BlHIqvKi3RneNm0fwceRIDup1O6cKBWGVbIE&X-Amz-Signature=a8b9e3fbc0d2c7545094468f13360f139426e734208fd3f36d9510a369fa4aac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633EEZAZK%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCEAGRWSSu9vbZxaqajsf4b2iS2R9ip9mewDBJENVINlgIhALRM51IL5qsJ%2Bz8gSQ58%2F%2FKs2Xnj4PZcUhZg3Caw4pZpKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwRxIuWDIvd0CcPiFMq3AMPs3hscd0SLtAVBkxIMEk8WphMWoByIhd6sQ%2BYZTQ6e9q1Lc3DWI0HArMp46dIGTjGq5Jp2vIXyU7i02jd2tSQkyGawjAifhLkZNASSCX2%2FFtB8%2B5boqeyXHVqlr5gDncT1mPk5ZfbN%2Bey6Pe9JyvM5PVzwzoZvC8aTTw3NzGOwfy%2BRtQR4ALOZJCWxnaGyASOXa2EqkULDFX5IfcMTpmOtpXd8fBfqOyedO4lSWN%2FOWG6RTAdFxM%2BqCNUWNTP0AomgR0EWkfc62pMWrVqx2vc9%2FNA0E1I5ZJanUi9A1fFcGb4z4jpyEl8A35wz6cbT9GRQQvb%2FZdQ%2BBYGQwvxdTo7pDYwIp60WMQSYmVsTVU2SmkwrSbiUX62RqPyYaKTy1dmW%2BslppND%2F7VQ%2Fgjd%2Bm53ih%2B0KQdN2C%2BxVhRRKeQFlu75UX3qjlt%2BdI3LFVd73igrcy%2Boc7QF%2FD4p%2F%2FZwuxVGqqcK2XdZzBJs6bAsRxVBf6QVHH9HTUew1jJO3v8549FCK74iuv8rTRBxPE6UYq2uCBIxMHnRJkTX%2F5Uo53aRLM4bgxN6SvKM45d6rXZYlFyIx8XufTkwX4Yph57UxHxDjMkhLDuOFI0Y%2F9QQ9h4SW6k%2FL2VHnYC%2BCKx8azCSgZbOBjqkAVvVaKtxVqK4TwnB%2FuleL6jjcyBr%2B5VMXQ0n7MsMSLnV1EPli%2BjKThShDodShr0XBkzR%2FNOryppGot13XAfGP36QP8hc4fp7GxihRNGdiNOSrOqI4cBDOFQ52m3FKWCbBL2NjxW3Imzt4i2gKrks0q6IhpLwTDht%2FsfUIDPPd1SiM625U1oz26%2B9DWQnEdzuGWQ2jUZtDNLxYgx4KTqycO9t34FY&X-Amz-Signature=7bb4ec920d562319be1bacdb50991f1c92c99eea25a0a86b01a1081ca9157746&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VW35ZZP%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIEqQvQ1QTHg86HSRQ8Oktln8tYvcmT93qCmI%2BoNMAEcbAiEAjb%2Bid0Wm4oSCkSCfNoUqWQwjQt47oeJPU4BFJdHVwYsqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLRqKHxzjybbNJ%2FRfyrcAxq7%2F7pDtPJ29cjELPLoMaUqLBsgYAyeYKMNK0FPDFJA4KY18RGSU1T%2BC8XoVCpmzI5OIaHvWxXY4af3XvQ72wtFmVqtqB7MvOYXuYoKiNs0zdtXKTrainMGF7vxsZG3A8gCu1refVzy7Gh0%2FE904JNZ%2FzIqL9Tf2u6j9fWG54H7q0NJOibtOs%2FX8QW2j2GeTt6MmwUZE%2BuDZZtYDiWlas3Sv%2FD4SpvFVD7JyJf7JDLp1HcbmueCtr7E%2FYwM6HbVMfqtan6bu5EDj3wbl1UOz0%2FHPWiSSP479UAz6yQ%2BqQ1P35fJkFxpNc9hmn0xnWfMBaIvbVOZbxzzQHCFRuzd0z8IJr7Zm83oeFi%2BMG8bnzwn49IZ2YV3lwlWdbu8TvIZYgOUHWqNQVMZiK4ZNhFMm1H1khtNybw6fTD8oseeF4S1thmuoZ6xAzCS3fVBhpSmQYhneEGZ2sOt8C7eQ6ZZvssGSHxhJaj5Fu6kcznRnvTtvT8lHGMmqV37X0nbqoghEydIvq6JPANmPZXi9OKqmZfMNHw4ZEEiH6vxicgI2IOYG2b0wF6Eb32nhpjko%2F5uacf%2FAjO9fyoAnfDeZZao3yOskQRAnZ9u5y4FPS%2FJjjA0IgYfXiPDfvO35QKLMOqAls4GOqUBtePqjMoK8y24MtTVTiJtVIpFpLQsDATwAuHCVi%2FyjI9spql2QeYnha2%2FWQyHpGw77RroIShv8UG8y7zkFrEs5aiySuMhEB9nEoZ3PocTwmf2U380Y4Obh3tzCGestVjc%2BTWKWnt3D4wRlPF9CVdv%2FPNPlMNUgTA8UOoNHSGkwaumGVsWaSV8ex%2FkbAYRTwaHGX2Tq%2BMhpN84IOczAXXGHK2LCJ7q&X-Amz-Signature=dce67cf8d6f6b4f335dc5a772be7d8626fd4971d73cd82ee8ab9aa400907b1e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFCHGYZJ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIDq9XwJXDUyD9b1ndnNy1Du%2BLWXdVbFLkI77Acu4tAF1AiAPkdvdtvFaR%2Ba3HVvYO7nLWe3AvoGh9D%2BOuv%2BBSiIp%2BSqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8G62fbjqitLcyFsnKtwDmAS2wgBVIF7CQ8nilWCDRHTq2opgOQuAYsUmz7%2FnR9XV6WLKmH5X6abo8ArsTzvZhDnY16NTFILQJgp60O9BEmmYPgfrQLCjmpK%2FjfzsTxu6wdXcMoyTZt4SR1lf00qqORlr%2BpqTcLB9IcSWOCXf99ESd9tb8CZz61Scdpkv%2F29R7fnZY2F6ODZLnkylEQ%2F4u2BvBWH1FbLPQasJQ54bYLxJvFgRhTJuCcFcDoU3xHLLActaWUI1nkpJ3E089EDr6nsgdfYLFBqy%2BHRy%2Fc7Uq6PqlhuX5HDIqrdKbXExZ3aRsMOu%2B%2B2dnq8kCHD29SA4z5uVS45l2oAvj8pBzeODEPGu1OT9wBF4RtT16D%2FM4RUOVmnKY1aRwVqEz3CwXpew6kk10QkDsGNj5OjK55VrmIsPyGLhMX0r4h1GDFpqORftIlo3EuXt%2BtR9CyoLHYPwecLCmhmNVxO%2F0K991OVY2p%2FujyIpF90EeBEPWRs2JSEANGAd7QZ7hLRLYZSQ%2BuMGT84If1Ckhuh6ddlAs%2B5vQhlYZ5pvzyyY1FN5qaAf%2FJhx%2FLhdfhKne4SKE487OPRldz2Ji4Pi5%2FO%2FKkz5o3rLoydJhr5NH6QlAsHrmSxYBTO%2BygtvXEzkTypGw%2F8w%2BIGWzgY6pgEDxHIkb2lnprPvp1SDL6MbGb38zgjFpHL6Ua%2Bh%2FwwCgMChTPodD38jrhwIBIRlcmTh5eRkTWzYF%2BNA%2BwlTUTRYRMZLrIfG4tnvpYikj3tj1jGLrPXBDleE%2FYR9W8aj6x9NiL%2FHNUZirEEGCanaJIZ%2FQncdr4N0GIZOfO7j%2FgBZghmTEArqE49ldQOlY%2BTbcbSWfYR1AUqP9Y2HPbZu58SqwlMqPJ7I&X-Amz-Signature=1de26f863ec82a6fbeff755ff00d168a39ff980db27897e98f34543b66ff29a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WF5SMWU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCZThFENRkX3G1KsG92ErGcEScn%2B6hivzcKWlvuIKe0YwIgDIn96St3y%2B9pG8wt3PlNdqrtwe8ThJ2kq0UyE6OnyqoqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBfwr5f0SgaS6My%2BTCrcAz5G%2BuUtYyzzENnFIMIdiEbFadgKafJABjdB7JYXdH%2F6NEegxJSKC3MqNpzqOJTQNesE1iIKS5x%2FuARAibR8F9EAT2PWjbMT6cWV%2FZZmOaycndGLDt%2BUZWRv9y6Shyz%2BzgepkVW%2BW38Wzzripp56ud60BAC1LrVpxZYJeokaDNpapDhsXJbGklZMC%2BfDNcrHpOKLsyfL0ZZ5KLDCFe8FJc6ExH7nioNxMJFFVIKbzaixxFtYwADlW63PbJFwwc%2BiP2Epgz1LmGIvZ%2BTiBQ6tgKv05Q%2BNXFwRFW7j3Mar6uS4afZ9PBauVAAquvAfX8hSFFfreJYk06uWWFIXvFuzkgQ3gtZK0pqDAvNV%2Bza1An4g%2FsZ6EADWv%2FN8E4HPx%2Fy6haKyqOj%2BferqcA6PTTjKVqZd%2B1KUl3B9xE5sB5dwRquyM3MDeKxfX4Tjjo%2Bb2Jv9W0nw6VswnIaBj2SbF1St6e%2FssNXDINL9O9ueORaQeEbWvt2ZzHpb96oRmEmYMivytI0UIQs1L%2FZWrTCRyijIu4rwRw5iyiq5AktZYhYla9j7T46Zeictfs%2B4eU0yKc7a9RwjebgK3sPOEGU4X9Lv%2FExdXvUY7aFmmo0m36rtzXGQwHaMvcYDGbc4ZSgFMNqBls4GOqUBSeyGy2V5t8er95UvgDOC9X34e3%2B2GVSa1RoMZVmShpPSQD0yZUmhN41ydY6Ptc80i4j6b6w8AX0UiGznUe75yfaGolJUMo0vBDxGNVerNNWAM2AmUHUCBmsWPPJKndzrwm47q%2BCTCXqq%2BiWGtS092PdPrgDGN%2FQHoD%2Fx235odBlnq2iHJUrdfx9ndpshYc9IHtv5gHXuoMsGVmT4Vkfy51UHOxjn&X-Amz-Signature=684d60b1ec7670fc7bda529fc5f179506c1700cf100e33fe08123292d23db904&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WF5SMWU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCZThFENRkX3G1KsG92ErGcEScn%2B6hivzcKWlvuIKe0YwIgDIn96St3y%2B9pG8wt3PlNdqrtwe8ThJ2kq0UyE6OnyqoqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBfwr5f0SgaS6My%2BTCrcAz5G%2BuUtYyzzENnFIMIdiEbFadgKafJABjdB7JYXdH%2F6NEegxJSKC3MqNpzqOJTQNesE1iIKS5x%2FuARAibR8F9EAT2PWjbMT6cWV%2FZZmOaycndGLDt%2BUZWRv9y6Shyz%2BzgepkVW%2BW38Wzzripp56ud60BAC1LrVpxZYJeokaDNpapDhsXJbGklZMC%2BfDNcrHpOKLsyfL0ZZ5KLDCFe8FJc6ExH7nioNxMJFFVIKbzaixxFtYwADlW63PbJFwwc%2BiP2Epgz1LmGIvZ%2BTiBQ6tgKv05Q%2BNXFwRFW7j3Mar6uS4afZ9PBauVAAquvAfX8hSFFfreJYk06uWWFIXvFuzkgQ3gtZK0pqDAvNV%2Bza1An4g%2FsZ6EADWv%2FN8E4HPx%2Fy6haKyqOj%2BferqcA6PTTjKVqZd%2B1KUl3B9xE5sB5dwRquyM3MDeKxfX4Tjjo%2Bb2Jv9W0nw6VswnIaBj2SbF1St6e%2FssNXDINL9O9ueORaQeEbWvt2ZzHpb96oRmEmYMivytI0UIQs1L%2FZWrTCRyijIu4rwRw5iyiq5AktZYhYla9j7T46Zeictfs%2B4eU0yKc7a9RwjebgK3sPOEGU4X9Lv%2FExdXvUY7aFmmo0m36rtzXGQwHaMvcYDGbc4ZSgFMNqBls4GOqUBSeyGy2V5t8er95UvgDOC9X34e3%2B2GVSa1RoMZVmShpPSQD0yZUmhN41ydY6Ptc80i4j6b6w8AX0UiGznUe75yfaGolJUMo0vBDxGNVerNNWAM2AmUHUCBmsWPPJKndzrwm47q%2BCTCXqq%2BiWGtS092PdPrgDGN%2FQHoD%2Fx235odBlnq2iHJUrdfx9ndpshYc9IHtv5gHXuoMsGVmT4Vkfy51UHOxjn&X-Amz-Signature=0cdb3f8e060e3a36b13e4e8402b48b18662b0057a078f872840ff71ffc00de29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SLDHMTW%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIHjOzgMd05pNpitGvY5oqGLhc7lqLWSIlHTfAlnz9f4XAiAwTtYohxUZCemCN%2FCgQzyjOuGKespHl1In%2B2yiFS%2FcxSqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMp08wqjPok0H3O2HGKtwDq%2BFxGrz6s0ik%2FI7AcZcp3nW0IBG7Q8jojz7pIkkLmnfyU%2BhcMYV6bjgZERVyNJhdp1MvN6nMtorNzl4awbhboVRBZTktBCX0GnbhkiAdMY94V9cPoaZxCe8vW7Q%2FhPpgVwlnu3Sa6Ukq3e8k6HieS1DR6zcpUpvMFbbedZ%2FoKJbDgxyIImpQwvDR%2F6gUC6nihkaxptZxf5avd6HsN0%2Fv6Me%2FvyQD8iI5H6DmRwirkT8edYHJ8fFKjSHM1LTHvG6cenJGfL5EtaBN2UWqgUFxZUyD4SD%2FXeA5HHYxkUqCMSmNUTX50htn%2FBC9Y3JkVnz1UfkFqYztT7VHAwXyfLAqCkcANmjaDLnamXuXnfA07YWcHooWjf9CHDW%2FUsvwgiYbvrkDIh9Uq2Y8QLOGuFw26R%2BhXpLlVE76YJF4hFXDUcQpJwPEYnsbseX1rBlIDQLpsrqZcOxG2hL0P1yx9foWT9hj6KOYBJtU3aDzQCHvXWDg1AB4ljYsTtDjoLDCuyMRdOag78g7Aqlc51q6UTfjKvjOqqcnddyrjlgRxXv7wIH5tL6GVNeAZ3A1NTU5ZHE2P4GwmfwAge0g5SGZ4HNqtyLsHGNmr9xnDNi1fYpqnawndSBoAxGrveRGRP4woYGWzgY6pgHRunRz6gut%2Bd1bNT38P3TPk0h9F3M3SgRyjcrDxjCztcByMqHNDCXKBMPQgxY1hkkTw0ewt%2FXqYcFlIdrI%2F1D25tQGMmkUMgAoxUQ9giY6bRIFGqipCVmGzd%2By6ASuyoAYmeKkHqx93J%2FQm0y9RSDmLer%2BZDsWEoGJkK9cEIhaLEowAz4iwgs8vK1HKinvb0gO7Vhw5WhMGvJrjU9z0zZkWoYzghOY&X-Amz-Signature=dc59a72055a9efea6a992773f482f8fdfe13ad2ce3e2d220eb99bbdcbff5fcb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3E6JJAM%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIChrDwolYYTAgSGdWkV0Lb9g3g%2Ft%2BGaFtd3sezU%2BCWuWAiAUrFZQjDMB%2F8PQ3DM7Q7RwUbU%2BXpD1asfj%2B0g8GZ0hgyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0Cr5Ghmgwv9fQtHBKtwDdqiu4GR5EY5V4eYLzr%2BXlH%2B1YPfsWjrXmKoa5bx1sQ7aT1HoLkwVxhETy2aXZHTUIbaaHlQLGu7fLy0psX0jBTqwxbJTetSMilRdGgZjp5pPCyWbhVmy40Qdv6HHyBt2rZM1I6uVQiLbmMqgQ8O3d0xyXdFAivDWWJkxwynmJ28Mqg6vxVm%2F%2BieVdOQ6VXOlRdH1%2FSPSSU4K0A0oCTXdtwkNKfKSIqLuxDJIKGWu%2FPmlTQPZxWkk6vq6RP5FCOzLTaRktPXPq5TrWqUldliAkJLXp9BBePxLkBfr7cx2wdsFeR8HBu%2BHULbLY49DzMtuHMt9yKG4hC6Ig%2FtEd5itBc7w8vvsiUpZ2CtBdARK9pKzCkojUbp3At%2Bn16IQ8UJIrXaTFVgCuPN44Tk6rG6wbNDh5AA5MalCBRVJuZWevymV1L%2Bi5M9T7CTH2V8wtRXnwg%2Fo%2BuLbOFhWisVcXM4gu280Ib18GGPh8MQtWEtrVqP5wA61EW0D1dbBZbHWl0AlRJF7ueLeGsfg3mpYGDM361pF3vCkBayLx6AzIFz4513AuwLTEVUVg%2FOvGM76e3q3pAER2fVYLtHEWk6q466Z7WNqmQ4Y9wlPcBPE%2F%2BfBHPkimLp2y1Bq5J1O0WkwhYKWzgY6pgHMAxyUevSeUWtfAIYl9vWu6jVCoWzGjaNpviNbmzgMsgwyUQ%2FmcA3KTXMSRLCKSpKx6Q9HSR0qvsEEZZAs%2Br4fvWl0TlKC7hxPEz0%2FlANpd%2BXamqRiGcqV22UKLBd9VKEcfA2DCB2HCdRXsXRCuj9goXBwDpKKAKWh0%2FaI3cVw786rty4vkX6khbxSQskERxy5jkA0FfrLBsDPci8tekV5Mjm9LlS4&X-Amz-Signature=7959e9a67c2c3e505f184710081f7aa9195dd4c09825e4267ecb69644ff2c7a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3E6JJAM%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIChrDwolYYTAgSGdWkV0Lb9g3g%2Ft%2BGaFtd3sezU%2BCWuWAiAUrFZQjDMB%2F8PQ3DM7Q7RwUbU%2BXpD1asfj%2B0g8GZ0hgyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0Cr5Ghmgwv9fQtHBKtwDdqiu4GR5EY5V4eYLzr%2BXlH%2B1YPfsWjrXmKoa5bx1sQ7aT1HoLkwVxhETy2aXZHTUIbaaHlQLGu7fLy0psX0jBTqwxbJTetSMilRdGgZjp5pPCyWbhVmy40Qdv6HHyBt2rZM1I6uVQiLbmMqgQ8O3d0xyXdFAivDWWJkxwynmJ28Mqg6vxVm%2F%2BieVdOQ6VXOlRdH1%2FSPSSU4K0A0oCTXdtwkNKfKSIqLuxDJIKGWu%2FPmlTQPZxWkk6vq6RP5FCOzLTaRktPXPq5TrWqUldliAkJLXp9BBePxLkBfr7cx2wdsFeR8HBu%2BHULbLY49DzMtuHMt9yKG4hC6Ig%2FtEd5itBc7w8vvsiUpZ2CtBdARK9pKzCkojUbp3At%2Bn16IQ8UJIrXaTFVgCuPN44Tk6rG6wbNDh5AA5MalCBRVJuZWevymV1L%2Bi5M9T7CTH2V8wtRXnwg%2Fo%2BuLbOFhWisVcXM4gu280Ib18GGPh8MQtWEtrVqP5wA61EW0D1dbBZbHWl0AlRJF7ueLeGsfg3mpYGDM361pF3vCkBayLx6AzIFz4513AuwLTEVUVg%2FOvGM76e3q3pAER2fVYLtHEWk6q466Z7WNqmQ4Y9wlPcBPE%2F%2BfBHPkimLp2y1Bq5J1O0WkwhYKWzgY6pgHMAxyUevSeUWtfAIYl9vWu6jVCoWzGjaNpviNbmzgMsgwyUQ%2FmcA3KTXMSRLCKSpKx6Q9HSR0qvsEEZZAs%2Br4fvWl0TlKC7hxPEz0%2FlANpd%2BXamqRiGcqV22UKLBd9VKEcfA2DCB2HCdRXsXRCuj9goXBwDpKKAKWh0%2FaI3cVw786rty4vkX6khbxSQskERxy5jkA0FfrLBsDPci8tekV5Mjm9LlS4&X-Amz-Signature=7959e9a67c2c3e505f184710081f7aa9195dd4c09825e4267ecb69644ff2c7a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPLV2LGM%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T211926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIBUQjb5HHDy4ohCjg%2BfWflLr2CdJb5CCjLmdVovzScx1AiEAskYyzjcFUwyQR3qqHCDWYDBeKLZ3wEJnV5ff4DLElW0qiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEwgJz1CjdoWF2BqLircA%2Biqbz%2BIvi%2BiQt%2FyruhOlr%2Bu4lXUqG17w0R1QZw5W3vj6hR3v6RyEh97t73NtlwxsQ5ySw5l4eOdaLm%2BDIlVKdNJr0UFIgPE%2FKd1kcBmR5GZirz%2FlbB7%2FWkmy%2BLyQ%2BnCooaQPYQ2zawFSNv4WHYIcHhhCcJrpvQpfU2qW9pigFnf%2Bm8Oit7EgeNUpuEQmEeG7JOTweYxlnZxWOZX9vjMb%2BBVn%2FopUyVGoiwDYIZavLq5GuznLoHyfKJBMbI4fT4%2Bxs%2BWhq2iorsbAPACR6SMaMF7sGnii8EYvof8r7AjkfaDx2fz5PuSRbnxul5rnaBYO%2BOrSPVjHT9BIi7cLZIkIwJm032Ram%2FnwX14RyzFrYrVF4GayGeyaw1dPi71bqErTg9ThqGHVk0Q47c9v3Zkje33R6JLOIJ4iuYfaMTUPIqtCb2hnS7GK75b4%2B4DrNkm2bszpVxhkWye4j%2Fu5NAzVtKxy%2FeyTFF%2BL%2B%2FmeNELO5TGmnmljwZALPopupRqBdrs2og1A6tgcb9LEqZNAmXNUhHY5Laq3W%2BnH49cDUy%2BUT5ClBZ%2BE52CIKDPkJIIcdFXcCvrY%2BlnNcr517rdr0dqulezZeFJyOW%2BVudKfEmhaKHoo1%2F9IluaBUoKJ5wBMN%2BBls4GOqUBpQ0sMbkrFKHokh9asOXwWlSbmFzOB50tSQfAlQBNvC0vijXLPmJG%2Fc8uHO%2Bu12wnu%2BhT9MlOzVouFiss%2BauOEadG8tU2CJ%2BZ%2BQyWXx50ezXLqVnHwwJFcX8Y4mcEEbemoP2wdisIkBrGd4PFQ0QW9fZO%2BN9FXmkmLY4PdZwdDQlfcP%2By24eZ8jWiCwqXQlooj34FGtFF%2BXeV9VM3W%2BnNGMouKy0X&X-Amz-Signature=ce9d18ae4f50ecfec7f9fc2254da71641ce68c5d569d804a8a44da38a800015f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

