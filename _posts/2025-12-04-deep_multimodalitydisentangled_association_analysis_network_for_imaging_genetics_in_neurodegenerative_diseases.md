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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBPEOHP3%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQDTuhwEh%2FoaUMGwX57kEMnk21Pw%2B1GrVZs%2Bqpw%2FoC3QIgVtKpC3QwuFrRCswhc72Vx7sD02zAZwPFmP6U%2FvklOfoq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDIGOtMpBWJ3dIzzWQSrcA2uXiLAfRnGXbBLOkX6dGRNJ7tGvXpaNS0dK7kEh9JFY1GOBnZoukGI10br2eZ5Xrki5Ap%2F7h0c94jd7b%2FDUf3XJb7FIEm4EM%2BnaYm5e4U09K2tQ2O9s8lLQ3fovFRZznFN55iyMGFRd96UzLRagN%2BR6BHn7O0TCnpfdIG3pCUGogV4ezAlbkPdn52xNLJGF4IMhnbnqvlKgFxZc6MbYCwabaObGeVBgnAfBL%2BjbGTpW359Z5OP6Am8eLB0aZ3KHW2BJzSSIGrjF7pcAFsmcEY8DSxXLDJy0UX%2BfVo%2BmxUj340vwoItDjwMQtSDjS8f0UiJ5QwCmw%2F89Pi9Av%2F5t7m%2BQqwSa5AtEDKueuvc2od94oq370eEJH%2F34xwA6aStuw9%2B%2F6OS2aGiTzqvnAt4QqfX5gYSzlsRoPnUa8zC7eI2S0J1BNu3oJSvYdtPxiGEoUQSFiEcg0NpC9Bmr7J9HhJRAFeKDH3cIdl83g86r7eXpTpGGsPvbuVyroMS5dcFOoJRFBHXfU1Mbbrcw2Y85UCGaCiTrTAs145lTc8zrTI%2FvEK40Fmjc5a576t9PuaR47riifdNhm50S0aRo6aM4zpKpapgGtKDafxFt0VPPYMDFf%2B6TYsxQ5ngrlNMqMO%2BEuc4GOqUBGkbjMWbnnUW%2FMpJXF503FaInWY9D6bxes2KNqvy1SjKTbI%2BXOClv3eocIctvN1euC0KkCkUgvobUSY0Y1ikds1RtR6%2FgcXLqJdgcHWJE1VpTZ09p713FcALagWvJugjkJ1uLB5HrLmu1f2RUuuKbp3ut%2BsdEpmBX6g6paeumhMKtVvpCRIWCkpLgSUkNxTRxGQt5RbaQ5Jsoh66SUtX5%2F8Ae4EAG&X-Amz-Signature=c1b083e561e78282ebad6b289dfd98c54b417ef594090e38221928577bc44a93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBPEOHP3%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQDTuhwEh%2FoaUMGwX57kEMnk21Pw%2B1GrVZs%2Bqpw%2FoC3QIgVtKpC3QwuFrRCswhc72Vx7sD02zAZwPFmP6U%2FvklOfoq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDIGOtMpBWJ3dIzzWQSrcA2uXiLAfRnGXbBLOkX6dGRNJ7tGvXpaNS0dK7kEh9JFY1GOBnZoukGI10br2eZ5Xrki5Ap%2F7h0c94jd7b%2FDUf3XJb7FIEm4EM%2BnaYm5e4U09K2tQ2O9s8lLQ3fovFRZznFN55iyMGFRd96UzLRagN%2BR6BHn7O0TCnpfdIG3pCUGogV4ezAlbkPdn52xNLJGF4IMhnbnqvlKgFxZc6MbYCwabaObGeVBgnAfBL%2BjbGTpW359Z5OP6Am8eLB0aZ3KHW2BJzSSIGrjF7pcAFsmcEY8DSxXLDJy0UX%2BfVo%2BmxUj340vwoItDjwMQtSDjS8f0UiJ5QwCmw%2F89Pi9Av%2F5t7m%2BQqwSa5AtEDKueuvc2od94oq370eEJH%2F34xwA6aStuw9%2B%2F6OS2aGiTzqvnAt4QqfX5gYSzlsRoPnUa8zC7eI2S0J1BNu3oJSvYdtPxiGEoUQSFiEcg0NpC9Bmr7J9HhJRAFeKDH3cIdl83g86r7eXpTpGGsPvbuVyroMS5dcFOoJRFBHXfU1Mbbrcw2Y85UCGaCiTrTAs145lTc8zrTI%2FvEK40Fmjc5a576t9PuaR47riifdNhm50S0aRo6aM4zpKpapgGtKDafxFt0VPPYMDFf%2B6TYsxQ5ngrlNMqMO%2BEuc4GOqUBGkbjMWbnnUW%2FMpJXF503FaInWY9D6bxes2KNqvy1SjKTbI%2BXOClv3eocIctvN1euC0KkCkUgvobUSY0Y1ikds1RtR6%2FgcXLqJdgcHWJE1VpTZ09p713FcALagWvJugjkJ1uLB5HrLmu1f2RUuuKbp3ut%2BsdEpmBX6g6paeumhMKtVvpCRIWCkpLgSUkNxTRxGQt5RbaQ5Jsoh66SUtX5%2F8Ae4EAG&X-Amz-Signature=c1b083e561e78282ebad6b289dfd98c54b417ef594090e38221928577bc44a93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZKIY5QO%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDyyzFoYSeuP%2BVhx0uSzCI1RNq1M9kLi4z8a%2FMwwm1UmAiEA87VFOlB2HC1KFWYcxjZ15y768FB%2Fusp1vqBrWTykuiUq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDESMLWPHMrimmSNZcSrcA%2B9rD0V6x%2BytRkMJZ%2F%2B3a2Gh2voPi6mZ2RDuTVOjdIGviD3fx8xEXxCTN%2FsIhJb5EMEwQ2K2JH8rEUsqJMM1WNR120e654IyxgierpGIlLr42pq%2BmEdZdSVyP00ZcU0KvSJXmZQpGybiuBcUFVjI1UdYbv%2BRpPVRRGAeM8VCFnFgCmgT0DRVIMqJrESYss23eziNaKHeYw8sCEILvkSbxKqoYq0Ynwheze8G%2B7hgf%2BZJEH94lqs4o2oQQ6muqAP%2BzuWOydiHZg0BmMSGzNF9JR5y%2FkRox6P%2B6rcAtixLdC1snTxR6I512HvS4Js9H5WbCwrrr7ea%2FAdodB7HoF7OrLWEzIyBol%2BfsdoVQ69XM6RgVem5MmTQ36NJFsPR4eb3%2BAg2MDmru9MYFH4E7P0bCzqfFDqZYTn2U8gRmIAt%2FihvzVE49Zax5xFODRiLdSmZSlpQwqqn4t3qMJff0tT0hRmTQHSMLYNosW4m36Jo6YegarOT90zNHmVV3CKSsf2KqT%2BxraDobcvlvChFo8nCb78BnVf1ZnbxuO682bsd3Lns6zW30aDNkTGck0qv7Ds22QeTWT1ehNmq%2BtYHQG884bxQiA33oMePET18MOFpj1snxopjxUK1AL3TAnqIMO6Fuc4GOqUBTJdg2CTrA0IyswgBzUspQ6tJej2Hx5wXvTMleYBl4fWfKiXzsSWFhg5QsCh3z1zSMxnKSFwkmfpm8YkAEESqGuk0Wq01f449p2vIX7cMsnVWOszItFlo25yGZvFgG%2FiCLF6SUZqrnscnaZwSKs83xRfN1Wm4dxtMXSRnKDux0hr6fd2yPRZdyQa4MF9B6qbGt6SHeEB%2Fzf5%2Bqrqs8yirjt9iCHrz&X-Amz-Signature=4d08157386d8e8d46cf18e1293242d638010095ad5822de548844e2bb2ad32be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWCZG3Y4%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDlikB09HmwgzYaliA1eKugDJF96iuUPlPpdH73SiITbQIhAP1jHdMsWd1QxsTF3iVafEUtuzBl3y27gq5AmKQVDJqCKv8DCGsQABoMNjM3NDIzMTgzODA1IgwQzLI7oMUJIj5H1wsq3AMFPsX9s5ckNMm6xRr4Kp45lb6D8Qupj8%2BQh1FSwJoLYpnd6ejECYPvoc2tzK7oaJTpARBf1oVKi6mVgBZ6Oa%2FVyXctnKaO34NZWVAzxNvHwk%2Bb8Ye8K6pb%2FFGJb098HP%2FzIfVEcDv5tWtosuM%2BOSEPGFvvlphRhxhDZeO%2BLcxNSmKt7pF69G2hjIoG6M6pK3iii9wHTjMyb%2FiWWtRjLrcsnzYXXeEcu47JwqG5iBdJuHQUgIdGrIgpRG3QhDRGZIbzJmBZeBl8PRuiKaz3OtXlBNEPkzQWR9JuHTcFMPcBCkMhbOiXOrUHS2jxeuM4sIOwtydIVDnDknX13JJIkf%2B8TtuBLaXI%2Fk6EoRExTMAgEWwyNrNhvCJ2qUkBiYFS5I5pW6dH3r1FjbA0EC47fFx6uagwgf0BSPjBqdGz3bt00M4kQFjGQU25Ud%2FMNfniaeIU%2B%2FWuoW9KpGkoQooUmT2XBiYamqvfFT1BqJ2SnxN3Bjdq%2FBgBDacQODGXgaYfllkRmrTEhx%2FJBLYNGdgtVursXvteRzBUBIi0QLz2KSxqQPNtp%2Fl2NwhbaW3XUOO4ei5A%2FTvtsQIrs7fqc6NAUULeJgrUPMHAA%2BP4rztEgZRUsjRrGr6L4xMEygL3ATCghrnOBjqkAVqXnb2cUEDOCDAl0zhOGY9M3ANFwEwQO6%2FPYJqKGhSA05jV5kQxYNE3VWDRedlRAAGJjROYjVPKJQ36%2Bac9y17yXd3tgdF4E96qrK0JBXNs%2B74jC4mwR6ENo%2FNt8D5clMbRI%2BBF4FvVJMJYzUMoE%2FQuEIM7q08u3n3T49FCbWN7MkWfi5viGvvUrXbO4l3FxVc8LuF%2BY9IZWxs1unVYIe7Yo3YT&X-Amz-Signature=220f5108d40d8c5661f994f5caad9f9874de8d13e3a795fcaab9b45507d42ced&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWCZG3Y4%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDlikB09HmwgzYaliA1eKugDJF96iuUPlPpdH73SiITbQIhAP1jHdMsWd1QxsTF3iVafEUtuzBl3y27gq5AmKQVDJqCKv8DCGsQABoMNjM3NDIzMTgzODA1IgwQzLI7oMUJIj5H1wsq3AMFPsX9s5ckNMm6xRr4Kp45lb6D8Qupj8%2BQh1FSwJoLYpnd6ejECYPvoc2tzK7oaJTpARBf1oVKi6mVgBZ6Oa%2FVyXctnKaO34NZWVAzxNvHwk%2Bb8Ye8K6pb%2FFGJb098HP%2FzIfVEcDv5tWtosuM%2BOSEPGFvvlphRhxhDZeO%2BLcxNSmKt7pF69G2hjIoG6M6pK3iii9wHTjMyb%2FiWWtRjLrcsnzYXXeEcu47JwqG5iBdJuHQUgIdGrIgpRG3QhDRGZIbzJmBZeBl8PRuiKaz3OtXlBNEPkzQWR9JuHTcFMPcBCkMhbOiXOrUHS2jxeuM4sIOwtydIVDnDknX13JJIkf%2B8TtuBLaXI%2Fk6EoRExTMAgEWwyNrNhvCJ2qUkBiYFS5I5pW6dH3r1FjbA0EC47fFx6uagwgf0BSPjBqdGz3bt00M4kQFjGQU25Ud%2FMNfniaeIU%2B%2FWuoW9KpGkoQooUmT2XBiYamqvfFT1BqJ2SnxN3Bjdq%2FBgBDacQODGXgaYfllkRmrTEhx%2FJBLYNGdgtVursXvteRzBUBIi0QLz2KSxqQPNtp%2Fl2NwhbaW3XUOO4ei5A%2FTvtsQIrs7fqc6NAUULeJgrUPMHAA%2BP4rztEgZRUsjRrGr6L4xMEygL3ATCghrnOBjqkAVqXnb2cUEDOCDAl0zhOGY9M3ANFwEwQO6%2FPYJqKGhSA05jV5kQxYNE3VWDRedlRAAGJjROYjVPKJQ36%2Bac9y17yXd3tgdF4E96qrK0JBXNs%2B74jC4mwR6ENo%2FNt8D5clMbRI%2BBF4FvVJMJYzUMoE%2FQuEIM7q08u3n3T49FCbWN7MkWfi5viGvvUrXbO4l3FxVc8LuF%2BY9IZWxs1unVYIe7Yo3YT&X-Amz-Signature=475d1c93a2672cc41de725ae62a24ec75b86b88099f684838968a733227b0ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4RFFA5X%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhTeEIQAJweXMefdwRkQVaS3BbTty6e%2Fmh9Ss1iWZonAIhANGgHc1fVU6xCoFPQNLVpJnxy5G5iHRJhvo%2FYodBItTnKv8DCGsQABoMNjM3NDIzMTgzODA1IgyBH5h%2BbvuxqbXlHuwq3AMdxiOr7xaGKD3MylU9TADsn3ajlaxkdDXPel2XWLR2I68yhzUU46qffAFxnohwdYYpN5vhKC1iBpxg74kAahxoiojIV%2FIyRcCXauWES5GvLaQF%2Bk9agxjYgdpHJ8Ozqo0xeAbCbIIzZPY1kyNBE7mqBR3aOOAivDDnQzRN5s9gd0ltwMc8E5aNIf8eRx7nXomliFd7z9sVnR%2BD24kFUyCBnGYt3sgXabZoHBczDnoyIV4Ol8aSktFHqdLPf9Qn7PzFwZquHpFiiK21Mo08NNW%2FinP8%2BAGe95TMAAiMoBShCcF7LUTs2%2FdjB0ExAPCQBIGgQcZfPFgbvN3sMqr6UZxWTmybkz93sHoYtd%2FOt%2FcSJt3raP6hachGdSl040Q%2F86fgCKFvp5f44s6CEZw%2BtmEm2BYJukYcuTu3RCmAA7XmnWK85pscTOhGoNkD1mEmIyo2wGzeor7a%2B%2BsMMP8P6YjAMb%2FEbuZekwdvT%2FTJCbUA7INx%2F5RJeiATvYgo20aft0%2BrTmMQk4DsVtggtcvHW8OkL0TREqVSZdg1pUHYK3DuWYum%2FiwyBrXLHKSVpzcVyMMrNpcTmWeAXhGAcw36KhztQiJa6C%2B53ujSX1QVN0ViLY1CVujTjYtRJwR%2FWDC3hrnOBjqkAedalrVUHgiehKeTKlgt4JksQKTY0Sow2%2BYUQs657%2B0Hb7wvXT5ab3DYBD%2FQYyZYxx%2Fz78BxLNvkmxssld6WFYBjLHHu71TDKSqfEogO5QRxJjV9DEGG%2Bel2Howtj1nPlj8exu16wrNmNWoZxEOmvFGquAs2DWGnZu1ZBCSg5%2FG9X63Kzy%2FVzfCI6e6q3SJs6DicbX3DnW0D4aGQXEnylREvcnne&X-Amz-Signature=737487a4ad824c819bf45e7e81fe9d2ca2b5241d5462b740528b9e8e1fa13574&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YHVB5GC%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2BJSkVYxz3xeTNNFR2CwvNJwYPEWOYE9m6F5WRhD5mawIgdOx09vaH14C0H5zXI6%2BpxlHPc4yfgC2Fe2Doc9JqYloq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDEUiTn6DLeaju7YRcSrcA8Z36EMaJktap4FXhOLc5cYlnRp9SiKgm3pRWzpdBAQ30BiwnRTE4%2B%2B9JY4YQELj9yfmmQ9puOqF92Ur2uc3cTwPK5LWMShnyDP7o7bQ4xCeMxtO9tzry0zfkBPY3ZB%2BTuiAwe%2BrvKVcPZjEnZyvEAg6DBfcWj46QQzaHcLDpSrgtrnbtBLApvWdT6inEdXCu6MrWpEP8nUOXZOBg%2F4TmZ18nslvoR3HkJde2cyLHjZdv%2FXg1aiof7SjHewaOESQ5WRg%2FMgKAVuOU5TxpNMcvvXS5g1aSNSeI6aUf4nQS4zb71Gap83JKXmbrI%2BDJCDealKviYpIC7d8ClFur%2FJTkkHkf3PATfWk913HEhq%2FeALADDeDoeUiqeIOxDIxgsiyh01AMHNUTR0PDNX%2FhPtjtIrMu2fK8BUG49Bfl97c91rPdqz4yy80%2F2YAqU4NzQBnd13Y3cPg8SPK6JkVYAuVDapibgtM9aG8MXLOe%2FXMTODcrVuwNVmJlBXN0ir4vH3nqjvTgsSg0F2nOkeUB6RpYdfxdJFc6vUnOdrW1VgUIZ%2BNzwTRp3RnbpKMZfly4eA94gnIAJK6ih5cc7TZeECCby2E2yNxYr50m3c2%2BDGIkSTI8%2FNko8y347Gbr%2BzlMJqFuc4GOqUBDwO3nLm%2BY4qKqcKM%2FjiWuuk2Z%2BE6VqSBCKkpOVVHYaaUPTKsR%2FWmVAex%2BElEqYNb%2FAAVKOcko9AcLiWY5mR3aoOawWiuW9AaD52%2B05%2F0bHSZVAHUbm7%2BB44H7i7%2B5NPeih4ObL2Cwk3qUcq86Wc6NEeFcdsYito%2B6dcWgTZwGPHbwSjhmP4bwFAP9pWnXKTpg5rTKSB3ZaaVbMfT6hQGHxbBCKkl&X-Amz-Signature=4a51187a4c57b8e2ccaba4a42cc46caa2f0adcc4418ee154d96d8f3b20843bea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4TR77OE%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHadUNx9%2B1wjSp%2BhT4liqtlswV5IGAnjPhaWBy54dOVQIhAN8xgGAKMEPqdw5aO3WqTvKEM2rMYyEZjetNz60I6WQhKv8DCGsQABoMNjM3NDIzMTgzODA1IgyECusTrUBHw0WsZWoq3ANq3YsGKLuWUDAEljgM%2Bxlvf4xvoCYKxeoeqSS0RXHJbOjV22Rsmkzmw8wFVAvMuPui0ZickjCqydetsGq9SojW10IK%2BgX0XkhlpbmvEZ8NQWc81O%2FYsal%2Fd8ml9OJTfy3W4YAUmTIf0qgH7qqLky5xB5cDkkySUTgHcMmzzd5MgrIZhudgxIxnrK2nztOtCbK0rdjrn87a40%2BqkLzBRNmomvUFDoTVqMHsyuJ64%2BokrTjp9aAdrCXjj3UNze4vSjYHPBd3prswCJOA6K%2F1gvTzsgwxYKIKO3QRgcYiS%2FXY%2BnK7Xj%2BYMC5G%2FFeOuwsN7Va1E01w4Tqv%2F0083EYTeAQ5i4Fl6XdeoiFt0HaqNe0ta0UauBSuk4DeGThnZ2I4RGh5I%2FOpJK0xTvUNzMrm2OHEaQ7J8jyRQfZo0H6ZdUKcmmbqxiYdg5n5DOPqfJwfeJDedVEEAUaEez1mqYjQte7wsZTQMLB9KPDRJuR%2F07MWvEhfyPfLCnpT1JimDa1EYQJBbVpJ3XECwTsE7%2BAwhagc08xXM3dPpsPc%2FtPVkVYVkDSvkEBtU%2BZqGHT7rYmOGTGScD6Srob4fqKTM9buJLkTmJOOuTjFM6Jb9jEEqPC3BnQA2ftSFQS%2F0svVLzDQg7nOBjqkAR%2FhYY4y4p0okKYlHwqPmUF0Oq5%2FFASd0P37l80Spn22sxGj0OTnCDKFeFiq5fjvyt8Lr21cZ3Wb1insnjnnJZ%2BkVdJ6TKGtwPb98yWbRD%2FJTdEpryw3ZPR%2BXiG%2B6PGC%2BcbLtlqsOQd1D8wvdccSHnFpTy0hpiNCj5k5jXOIZpoDTxNLXo4lgdnARmNtpIrRZ7Z6pRsCDZ%2B9NyGLC5CvxzFCFqbH&X-Amz-Signature=c44e9e4e2f124cda991bb5cd3394ba06951d727f0c995c3ace7761a326d5d1e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CAPSOEY%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHJiABKfYlRbV1rewuSy8YWT2edAU%2Bp9HhtgR38IlRiLAiEAsf73gIkSfV%2FMenIX%2BLv0GJLALelO88aYqAJ8RyQmxQMq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDHaWpqNXgJ1y%2FDFlMircA4bJGNQtqXxUTmKhy%2BIXf3WD1nych3diImsFAeOwflsErQhEF9sqWnEdt1fUa4wuDH1ntPHs30RJdDlJO8OMlDhAu6%2BLvfupE8HSFH488NrRrf5jJ8EKPJB0JuAoZhyEgZY2SVQJVhWkAyuYHcIq%2ButYP96WZeIxIseOafVyFGUW91UJ6nWG8hEwz5K%2Bz%2BUVLTw0BdVEfT1I9mnbblH7oYPvuUgyL49Qu5j0nMguVJkB41lPbcY0KI6EdL2pHjvIKvyMNXdO0on%2FuGwNAdBRqdjN8trvEPEr1lkOcpl7G4m1XVDFp%2B08iRdp87zPVof%2Fun5arNJFtiqzPKx9aNm98AGFhD5mpho1LqN8xPONfIvZtEAm0QhEkBd4obHyZycpTdtlhxMZSiuhcStucO9fnutt%2Fvsip%2BpGVXaM6bYxBNtVadKBzMexMCB6pFuRh3jldVnOGkBlN56QXyyys%2FDeLgs2A2mQSXq5bmVPfCZgASZbAO0DthQPK2FQimFhwD%2BjMD4ivID0etn5N2YUCcsUNwAADehGwkvcFPdDYhztQqaT6qhpAz4T0CXmtPMoFLsTs69jsKHDdLIIDSZKuglYBahJ6vc6TJxAcW2wtYdRQIrCN6vshMMKFlfiUWxoMJ%2BEuc4GOqUB7CPTcVHhhsASqpQS5kfeEfSYrKcBoZUUbeGlKEH%2FFa4EIEbi7xTCFupevcruPDKWQOE%2FQiIu8ywrZkH%2BnGAOFAbNh%2F3PeqzKPotNMHOIK2BU%2FbUPR3eHWRolKCSrtuMC9Jb6qt9QE0fPnSqpwMVmu8SKNtm%2Ffa1a5Ld0DBdvzMj8DvxpG%2FWtwE9izZJS528C4T34bJDzL%2Bh2cZD0443hgTVXjFi1&X-Amz-Signature=5881d483e82d486d59f8796a6705da09615d5ac76dcbc5802942e6f74b504f45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CAPSOEY%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHJiABKfYlRbV1rewuSy8YWT2edAU%2Bp9HhtgR38IlRiLAiEAsf73gIkSfV%2FMenIX%2BLv0GJLALelO88aYqAJ8RyQmxQMq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDHaWpqNXgJ1y%2FDFlMircA4bJGNQtqXxUTmKhy%2BIXf3WD1nych3diImsFAeOwflsErQhEF9sqWnEdt1fUa4wuDH1ntPHs30RJdDlJO8OMlDhAu6%2BLvfupE8HSFH488NrRrf5jJ8EKPJB0JuAoZhyEgZY2SVQJVhWkAyuYHcIq%2ButYP96WZeIxIseOafVyFGUW91UJ6nWG8hEwz5K%2Bz%2BUVLTw0BdVEfT1I9mnbblH7oYPvuUgyL49Qu5j0nMguVJkB41lPbcY0KI6EdL2pHjvIKvyMNXdO0on%2FuGwNAdBRqdjN8trvEPEr1lkOcpl7G4m1XVDFp%2B08iRdp87zPVof%2Fun5arNJFtiqzPKx9aNm98AGFhD5mpho1LqN8xPONfIvZtEAm0QhEkBd4obHyZycpTdtlhxMZSiuhcStucO9fnutt%2Fvsip%2BpGVXaM6bYxBNtVadKBzMexMCB6pFuRh3jldVnOGkBlN56QXyyys%2FDeLgs2A2mQSXq5bmVPfCZgASZbAO0DthQPK2FQimFhwD%2BjMD4ivID0etn5N2YUCcsUNwAADehGwkvcFPdDYhztQqaT6qhpAz4T0CXmtPMoFLsTs69jsKHDdLIIDSZKuglYBahJ6vc6TJxAcW2wtYdRQIrCN6vshMMKFlfiUWxoMJ%2BEuc4GOqUB7CPTcVHhhsASqpQS5kfeEfSYrKcBoZUUbeGlKEH%2FFa4EIEbi7xTCFupevcruPDKWQOE%2FQiIu8ywrZkH%2BnGAOFAbNh%2F3PeqzKPotNMHOIK2BU%2FbUPR3eHWRolKCSrtuMC9Jb6qt9QE0fPnSqpwMVmu8SKNtm%2Ffa1a5Ld0DBdvzMj8DvxpG%2FWtwE9izZJS528C4T34bJDzL%2Bh2cZD0443hgTVXjFi1&X-Amz-Signature=20b4fb7aa715594cbdac4196d209193e86b96854736d338d9dc853791b8f0bf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLIIFL2B%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDLqtTMtLqlRucB6YJBKsd15fqzdQq%2BG5YwG8IxQk%2BiVAiEA%2FcGzv%2FdjVP6EffHindeSZeTN9qjTUC9ZfXRkYvhj1kIq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDJ1s6EZiFPjs7uF9ByrcA%2BIBZIf1MlINwurhCENhh%2F3ngIisb8HYqNie0jbpWMF0cl8BBcKSo%2BBpbdp4wLQs5qiTgskuykUXuzpjOtiHEv9I8htvTUu6I7qzQLRQGSXa%2Fgn%2BMa6QFpgEFjH1jkgPkgWEcXwEMv%2BZNpQ4vfeVGZisGWC5w3lllLpp090TQeyPnXoEg%2BlGHbRgcvflX0GerRj1Dtesb009zfXwdLldfvq8Hylcp26v%2F%2FKVNzAMfw3mzFR2L9lm%2FhEIBMnbLKyO9G9UYXppmCu9545bgpHfcn8%2BJSHtpEK7hJHLsUS347KWhTaAoUPAPgLPD7Eh8lA8NALDjtDsUemWvJoS04plvuTQncApPOkx%2BPrJNPuPEgnVNEbaSg9RciPgg2EU3j9Okh1zVT2Wf9a188wutWYG8aTafq1HdiJixe4fQRh0Oz1KvL9yqk3LJUJsgNDA36ndQ5NzUFqOTaP1muBzZpfLOcyW9LuU7ZOmUApRAOX2CtE5P%2F5kpZ0sz1d89ouuvk%2FhWZdC1ng6Bm1%2B6%2FDAVgxW1Jlii9PrQdI3aMUT4STDeNR1pjqsi%2Fi%2BO1xYIqOvXMxdA%2B7vIDwPUUCNWWlsi4HBXJzlnSlElYOSLmxPL8tSc%2Fv8B53C%2BpyTBzwI7KicML2Euc4GOqUB2rVLBvd3qOtcTEmTQ34Genauog9F434o02VnMkraeXgxj1XERIXjEvwShq0hf8XjNTl9t5bH8EI066wMNDLxQApEcsMsTIbSsoojm5sJrpa4WmZ6%2F26w%2FueShiBqYCCf3dq8xFwUyvO%2Fn5bTcJ7bfgDraSfvCqeLyHZwq7yOQ%2BrOlOqRhjCb08GhF%2Fj4cbkyQAtNPk9hS6%2FGtNH7zytwTocvR9qu&X-Amz-Signature=e5cc2fc1affcf1b50752f32aa590df3dfea1593a28c506b9ed8442639db77201&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EJKCI6D%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFDGfVLKA7rHTGk5maHlljmkpJ6EBKE7VA3toG1eTA3nAiEAvxa9Uhzg6EWy1ae%2FXhOvLaWZxLMoexKoyaSS9jgh83Qq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDOHrRqkUcBSJOFKRnCrcA9vrmV7Ev5kPCwoCEyHFoVXgYNSx%2ByVkrriTTyc%2FxC7dAjVPPEZODmNDEW0PDNe3cMZgVJGCXnIyaXgsmbBuNtRKEHsLb9bQOeI%2BmnTox0BBwvGc1RDExg0NrQD6fp8GOeRHyIY8LWueW0oQLsITLzc4JuW3V%2FtwVVur%2FO68QhUmYO7HsS7a%2BQFYbkwZ9x6VOqltyWsn9lMoOOlCWV1Zx4j9y3xzWBiLqN4shL4f%2BZvczLQChlNKEE5Jaqa48RmqyBuH3KEmVrROkv60VjcIzv%2F3Vn1w17CjB0rx491cTNpvLn5t9VicdeR3CuKCr0YZ1C%2BVCln4D7WnKbY61xSG%2F2LtVy1y8ShCObNOhCKe9mVjAc7VlNc199yfTrUQOoCPdC%2BGAmvDTdipWIsnZMhm52nRNjOEDUu9mIquhoe75h2LDIg9Yicl9cufB03Gh6vbbrKsnGvFnNkO4fUWxiN0QxVsH4obCyOLug1zatmDSzPm%2Fv%2BuUtWMSdeuSnWswwSyHQyHKWwIQjeA0Lw6sOPGqVHO9Gs3i77VXVLoKJdxVY2A6Q4tGEHlieJz3FGqIyyCJwTL7DnFu3Nu3kiYuXIVAS5%2FFRWkyTc2HWLSaTxM72tavZczAPXWEs%2BHZXVmMKCGuc4GOqUBYV9kDL8GPw5ZLe%2FZYZvh9lb6Blt9pA7sVNwqSjjxOizQX2f%2F99dyMo8k57vD6VPmRv%2B72H9Gem2FsuEYl8cqfYOEgB9r%2B0Z5xuBVGXWN%2FQ8xJ8WfR5gagYp5xgo8n8c7wr9EMCNKxbPcEdmZmKmM5FBjMhl7IKtmX79zWfWr8Shv16jjcLH%2F1FhUwCKLK0kpEzaKuZP0RIaKZnBj04tuOgpVm7lL&X-Amz-Signature=f633cf7b529313bdc04087c5b2f3895ae44d1682ab924e795ca61a662e2b24ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EJKCI6D%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFDGfVLKA7rHTGk5maHlljmkpJ6EBKE7VA3toG1eTA3nAiEAvxa9Uhzg6EWy1ae%2FXhOvLaWZxLMoexKoyaSS9jgh83Qq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDOHrRqkUcBSJOFKRnCrcA9vrmV7Ev5kPCwoCEyHFoVXgYNSx%2ByVkrriTTyc%2FxC7dAjVPPEZODmNDEW0PDNe3cMZgVJGCXnIyaXgsmbBuNtRKEHsLb9bQOeI%2BmnTox0BBwvGc1RDExg0NrQD6fp8GOeRHyIY8LWueW0oQLsITLzc4JuW3V%2FtwVVur%2FO68QhUmYO7HsS7a%2BQFYbkwZ9x6VOqltyWsn9lMoOOlCWV1Zx4j9y3xzWBiLqN4shL4f%2BZvczLQChlNKEE5Jaqa48RmqyBuH3KEmVrROkv60VjcIzv%2F3Vn1w17CjB0rx491cTNpvLn5t9VicdeR3CuKCr0YZ1C%2BVCln4D7WnKbY61xSG%2F2LtVy1y8ShCObNOhCKe9mVjAc7VlNc199yfTrUQOoCPdC%2BGAmvDTdipWIsnZMhm52nRNjOEDUu9mIquhoe75h2LDIg9Yicl9cufB03Gh6vbbrKsnGvFnNkO4fUWxiN0QxVsH4obCyOLug1zatmDSzPm%2Fv%2BuUtWMSdeuSnWswwSyHQyHKWwIQjeA0Lw6sOPGqVHO9Gs3i77VXVLoKJdxVY2A6Q4tGEHlieJz3FGqIyyCJwTL7DnFu3Nu3kiYuXIVAS5%2FFRWkyTc2HWLSaTxM72tavZczAPXWEs%2BHZXVmMKCGuc4GOqUBYV9kDL8GPw5ZLe%2FZYZvh9lb6Blt9pA7sVNwqSjjxOizQX2f%2F99dyMo8k57vD6VPmRv%2B72H9Gem2FsuEYl8cqfYOEgB9r%2B0Z5xuBVGXWN%2FQ8xJ8WfR5gagYp5xgo8n8c7wr9EMCNKxbPcEdmZmKmM5FBjMhl7IKtmX79zWfWr8Shv16jjcLH%2F1FhUwCKLK0kpEzaKuZP0RIaKZnBj04tuOgpVm7lL&X-Amz-Signature=f633cf7b529313bdc04087c5b2f3895ae44d1682ab924e795ca61a662e2b24ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZBTOLW2%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T103904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID7gJM7i4w6WHhE%2Bc1hI8SGRk%2BBOj2QaQ4kw%2BnpINtBYAiEA2IXnESLXVv4Y0LihF33ooS1STKmw2qWm%2FRCzhqhaUtwq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDOEOenl1FI%2FKOhFFsSrcA8U%2BcZ5%2BiwO8u1lStpfP6RSZYGSoukESnGTUNEWw0O92IqV4JZtxLXBxZ5lk9pWPP9hLMiJinjVESpBV%2FUYfddR%2Bx7QkXPT7YaXe%2BxgM%2FyfYjpNVKyeZrYHW0Tnz5c1dmEO7aKkDPvS1pSgcaQOSlnVvBlXNnAL9wOiDxXMDD4td6aIAvMZK8DCNABg0xDxT1L5unvXYcUvRQ0FvM0Ah5MdCJ8RjpRT9DPl68ElnfwFsj0DO0dBCtDf6Fhd%2BHXXfFs0dZQkbqY%2Bcq1M5AdK16kjS6%2B8xEzSfvzyZ2DdKbQszPoWSlsAjIQ60Ryjsq9CKSDTn77YllsCS9hAAkSRX5i3bWd7ucIdyIIDpS0%2FtkMfghiHIWLLpkBndINs9ipGNwIBoJ3P1V9jGxTTugJETybKVZf8K1XyC%2FlQOxNQjvCkm4gn34kjOGTRceFQKLWcye%2F%2FhLKBkh40J4cNO6%2B8K0dtbW5ODy76bY2NOwp0EtY5F2eAOTTUEgGvTrhwolDIWlWtrnlHcjQoSLfxf0zZcadHRsCkq7pkkyvgQkZwmn0zEBkPPTZo7oob8fI7was4Y35vNqJ1AHQUupcmWylQH0lqIrynQiVs4AWOm1jI8peQbYq5aeVW5a9sP4VI1MNSDuc4GOqUBkA7PlWa3aerYjTkJ6jIhE7kFhOdeqXtkNunOf5A371tw4rzH97LMqoyANejYvvWgesNMIE0KX5wcQkj%2F6qFiA8Ha9Ee6a4OmtvQud%2Fz535ZhgMaS1B4qE9HBqk7JjnCIyXslphi9xxqAWLpU0s2zqA9jPcrUrKr%2FOcK6UrlXIxTOo%2BroZFLBlHVl5HSI%2BwOMyi2gyvyAd5sIW3i5lXMqtWwplBz5&X-Amz-Signature=f7ac0c46965f4e647894f79d7e6a96b3fafc16e011c7bc0bbdf6151e87a64ea5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

