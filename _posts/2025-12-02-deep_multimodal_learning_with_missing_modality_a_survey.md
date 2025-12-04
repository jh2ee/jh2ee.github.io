---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6M2QM6Z%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIBxI9M1HHZQP3HWoZFaLCQPH9o9MH1xBSYRrUsf6g8fjAiBapqXDcNQpgHdooSEUXb2NNocnJT5EqYSM6HX%2FNfvt9ir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMI40bT4FXUsfyKJdOKtwDDuZjIyUMaXE0cUBlsD9G9SOJRpi93H3PbBDmoGjHk7pGgG%2FwRpTHGY2kA3Z8LYbWXJN2v1jYZlEB4DxDCmSszOP%2FyILShuehnOS1Lx3Z%2BydRQTUqLORabvOF4ESKYBAP04AiJZ%2FY7ettA5cZnW4Wf5gsDevW48ch9I%2FerOibb0CogsmtRYio9X5rUj24hKHU1uDn7jC6qYQivtQUlnmmZgtpV%2BprC9WKNXhVKby8I8ISuVljiLX1%2BwTgai%2Bvcs7a0QN9lw%2FsPBgyGFOFXLoyXwYD7S3GXKwapZbsyQx0FPw7KdwpT%2Bymub%2BsQXrljSrPrbtBT7yFpDKzNHQorDeLgkmx4Hqvc2iVkV4ZjiWkmfeDiHDKfSuzBqgvge8v8g7mh%2Bvc%2BKrwod3hsiGBrgrU%2BLvGqhs9xtkX5OJHKUW2%2BxPIKQvj2az9hNDIPEEcjCd2Q44jehdSnwIpKrbf2ZjVoZJswgBv5eWKSFTILh4lZkCXP%2BFmoAPBFm%2BVeL0ej5o%2FjsUvoM7jgItBFnMxcVZPj3KEbcv9papb63Bx5dUj4m%2FV8P6fzHEJ3PvrZjXFy0nSFzNDO1h3FgAUuJBSGMbXFdtG%2FtvjYUIePPWvJGDlaSl8o0Ul75%2BgRcGmPHYwsP7DyQY6pgHOzIjsmXmAAKO92SFKzFSUXhsp%2BAInLm9bxIoeG%2FnoWZCGqv31e8MPZY3hRq3XWqVWGTjIBXAsZYadCKtgeRi57EBDLmq7%2BJOjoESFP2e0kylLeKDuMnyYZx%2BDPaNSOrvZKSus8W%2BUommWluzsMo4FlkrfnhfJ4jBCxR6MgoWFVP%2FXEK%2BOvpa0beS363Kc%2BbmEbrUHFfmqlLem2ez3s1K5I5%2BoXVjO&X-Amz-Signature=170b1ea3254ea1c3edc4d6e016e3fec9c1fe79dfb67dc6bc6082b6707d9a4503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6M2QM6Z%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIBxI9M1HHZQP3HWoZFaLCQPH9o9MH1xBSYRrUsf6g8fjAiBapqXDcNQpgHdooSEUXb2NNocnJT5EqYSM6HX%2FNfvt9ir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMI40bT4FXUsfyKJdOKtwDDuZjIyUMaXE0cUBlsD9G9SOJRpi93H3PbBDmoGjHk7pGgG%2FwRpTHGY2kA3Z8LYbWXJN2v1jYZlEB4DxDCmSszOP%2FyILShuehnOS1Lx3Z%2BydRQTUqLORabvOF4ESKYBAP04AiJZ%2FY7ettA5cZnW4Wf5gsDevW48ch9I%2FerOibb0CogsmtRYio9X5rUj24hKHU1uDn7jC6qYQivtQUlnmmZgtpV%2BprC9WKNXhVKby8I8ISuVljiLX1%2BwTgai%2Bvcs7a0QN9lw%2FsPBgyGFOFXLoyXwYD7S3GXKwapZbsyQx0FPw7KdwpT%2Bymub%2BsQXrljSrPrbtBT7yFpDKzNHQorDeLgkmx4Hqvc2iVkV4ZjiWkmfeDiHDKfSuzBqgvge8v8g7mh%2Bvc%2BKrwod3hsiGBrgrU%2BLvGqhs9xtkX5OJHKUW2%2BxPIKQvj2az9hNDIPEEcjCd2Q44jehdSnwIpKrbf2ZjVoZJswgBv5eWKSFTILh4lZkCXP%2BFmoAPBFm%2BVeL0ej5o%2FjsUvoM7jgItBFnMxcVZPj3KEbcv9papb63Bx5dUj4m%2FV8P6fzHEJ3PvrZjXFy0nSFzNDO1h3FgAUuJBSGMbXFdtG%2FtvjYUIePPWvJGDlaSl8o0Ul75%2BgRcGmPHYwsP7DyQY6pgHOzIjsmXmAAKO92SFKzFSUXhsp%2BAInLm9bxIoeG%2FnoWZCGqv31e8MPZY3hRq3XWqVWGTjIBXAsZYadCKtgeRi57EBDLmq7%2BJOjoESFP2e0kylLeKDuMnyYZx%2BDPaNSOrvZKSus8W%2BUommWluzsMo4FlkrfnhfJ4jBCxR6MgoWFVP%2FXEK%2BOvpa0beS363Kc%2BbmEbrUHFfmqlLem2ez3s1K5I5%2BoXVjO&X-Amz-Signature=170b1ea3254ea1c3edc4d6e016e3fec9c1fe79dfb67dc6bc6082b6707d9a4503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIRTY2M2%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCID5Ve6ndkg5ze%2Bzo%2B4UBx69cwUEOMuT5Mv4HuZ0dVYmiAiEA2BvFh6pqiH8yGF7ZGIXmwvN781meO8Z4x6ODqLoWQVYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDOI1pJU1DiXp5fpSsircA10crdjlGOWu33uSVxkyFVxNXRkJ7RMAKLpsya0j%2BxsQlFk0rElP01YXK2mI3KFwHKwS2o26YtGjYAvFKv%2FuX5VvghW5USUqS4Ci2y3RJJn2cywNo9jH5zhsArJRDtBaa1TTLTgRUBBDPlKO%2FfEmGZHTy6iMosn7wS09RMdsMQt8pFOk%2F7uVmEyXUaXhXX8Fi0jKAokAP2SEizSwGrIqSMNLDu031jeXDwF3vX1IPx5YMAlBcavU9ofBg%2FLoDB%2FrUFRNSLgp%2Bk%2F%2B7f7JnFUy0CZxOcxRM9on%2BPWvtqDWMYSa2wxzd1IXbKRP9O2PBcP9nwOjzyZRZ7raU5i0UVU%2FU9CMCZ1PyUXmRngr5LKMJDOPF4hEhxu%2FxwNusdFWELrNzHcaKntsAlvSduu%2BsuDDYSnAG2qfoI481Lf68czpVDCodONFawAROiBDRvwbR3aib9SLYKqaSIOtzStimqgtSS57bwey%2FisTCgPv71aBfyi76fdxIZPVm6QW0AkyQWq7%2B%2FdSsoVV4nInALRl9oEL9GBOu%2Fnn%2FMBs8RZCvCFh0V2MFZVEwjfnAbFB7KNA0Myq4q6zWW3L52oTsk5UEofyC3LTRjSJRDP76Z30PB4LYVksjgJofCU%2BU8sMP3rBMML%2Bw8kGOqUBcBIiD55lshAqeby8z7R2zrbIrdyTeoyrZDobeeLDoQ9qTw%2FGyEQwYW5tZkO0psthbDW7WjJ28TMfrWDLRMC54oT9DLGK%2Brny1BFVaRgCLcOP6AfjbD0lxmZF7S775NbQtuJ7TlvieTiRNUEvBbfI%2BoD7uSYvvu8kqZNZF7Py%2FAxGi2hgAf9IN2QkwbMu%2BWMppXAMwnaQRz8ufstHk60%2BJIUAHKm3&X-Amz-Signature=f8f3c51c9ca4aef6f4b80f2b2ebe5437482b9aa2b9e674273a14af24d30a3f4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIRTY2M2%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCID5Ve6ndkg5ze%2Bzo%2B4UBx69cwUEOMuT5Mv4HuZ0dVYmiAiEA2BvFh6pqiH8yGF7ZGIXmwvN781meO8Z4x6ODqLoWQVYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDOI1pJU1DiXp5fpSsircA10crdjlGOWu33uSVxkyFVxNXRkJ7RMAKLpsya0j%2BxsQlFk0rElP01YXK2mI3KFwHKwS2o26YtGjYAvFKv%2FuX5VvghW5USUqS4Ci2y3RJJn2cywNo9jH5zhsArJRDtBaa1TTLTgRUBBDPlKO%2FfEmGZHTy6iMosn7wS09RMdsMQt8pFOk%2F7uVmEyXUaXhXX8Fi0jKAokAP2SEizSwGrIqSMNLDu031jeXDwF3vX1IPx5YMAlBcavU9ofBg%2FLoDB%2FrUFRNSLgp%2Bk%2F%2B7f7JnFUy0CZxOcxRM9on%2BPWvtqDWMYSa2wxzd1IXbKRP9O2PBcP9nwOjzyZRZ7raU5i0UVU%2FU9CMCZ1PyUXmRngr5LKMJDOPF4hEhxu%2FxwNusdFWELrNzHcaKntsAlvSduu%2BsuDDYSnAG2qfoI481Lf68czpVDCodONFawAROiBDRvwbR3aib9SLYKqaSIOtzStimqgtSS57bwey%2FisTCgPv71aBfyi76fdxIZPVm6QW0AkyQWq7%2B%2FdSsoVV4nInALRl9oEL9GBOu%2Fnn%2FMBs8RZCvCFh0V2MFZVEwjfnAbFB7KNA0Myq4q6zWW3L52oTsk5UEofyC3LTRjSJRDP76Z30PB4LYVksjgJofCU%2BU8sMP3rBMML%2Bw8kGOqUBcBIiD55lshAqeby8z7R2zrbIrdyTeoyrZDobeeLDoQ9qTw%2FGyEQwYW5tZkO0psthbDW7WjJ28TMfrWDLRMC54oT9DLGK%2Brny1BFVaRgCLcOP6AfjbD0lxmZF7S775NbQtuJ7TlvieTiRNUEvBbfI%2BoD7uSYvvu8kqZNZF7Py%2FAxGi2hgAf9IN2QkwbMu%2BWMppXAMwnaQRz8ufstHk60%2BJIUAHKm3&X-Amz-Signature=f8f3c51c9ca4aef6f4b80f2b2ebe5437482b9aa2b9e674273a14af24d30a3f4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RG34S3WL%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDejZtI%2FdeytLhMYZeeaBujFM1JavhXlt0p%2F49Ohh%2BJQgIgfcasaNDsbqmbSctgSgu1gDb05%2FVHzYsmr69gG%2FxLhCYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDFZD3SfQgqOMHqz9xSrcA3bzsmciCpQXG00GWsFCV0fPsJpXmotSewdogvnrw%2FW5dJ1YpAFDHmE%2FQzZa9f1aEFdRXYdUQM5nkwddRJyYfkIuFtVrbOohT4Ffm6NGlAopkDh3lJlqJIhGpcHT1EfZpbSVHSuV%2FTO4QbAzTswQT4ASQd%2BDFZMkyaSDgnnE8mXDJoRt8dBZhJKeKOB8%2Bk1A78dxxFzu0dHPvTBglwvu1VCsHoBUfBboM3P1cbE%2BAv%2BzuX2IgDCLHLT4rhyTPMewaasjf0InJWCAxTiBZKfo0CucVzF%2B%2Bki7%2BPauH3e4ERN6ujFh%2Bwb7wt0A2%2BT58P8X8o2xkB%2BkXnHqUYKbDenmY7c46yvRNlcIozXkSUrE5OLnCrpRXoktZbDSy%2FvAXuFQWewDA5gaJYMfbiJNqJ1txVffDCvpC76HTNrPAuKbTOjVQYwIj6EyZNpjrRbBHcwDStCZCLepW2oT9%2BM1FOa02Q2PQk%2FgpG63h9Tp5WOZCSLoGoQ%2BqZH%2FslVUEXfX%2FV6WKCofoWxSCKlVPZ%2FRnofSgsy4KhfmfeeBHaPY1S5v0fqAx%2BsiOZMLM7daEtfY1yAwHcLKhQspqh5ElwNMHIVVJhBQR4ZOI4k1F%2FWMPqciRTeUtcp09xjeKg9JODylMKyAxMkGOqUBp8tI3JGZoVUav%2BBYVK%2FeszQkOp18GdNcoAdYs4krUUaptU5TGiPmW84DOEIEYAEAgYjHO7MIJVsN0rhFdURpwsw9LpmdSJfOD0ZV1EvsEfvEqtJ9OAs0h8lNTzRUdGRlygoXDdJxfybzxEyfkATaOciZ3GJQ2VOw219UsKsE6gEFRxst5axxbR35165o%2FlxcHYB8MCmwLZn47I6kDCfu0NnrfQS6&X-Amz-Signature=72acb4f8889defaac71bd76e51c7aba28abb81a54fea2c33855ab56b1024bdd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4FKST6V%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIB93toid%2BDpCcCXyMFB3R5M6tQduxIBRvsSnqtSX71AwAiEAxeRgmMbrjsCzKSmWdo%2FZdbUPuyyKugtx9j2dzLIEhQYq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDAN0%2BL1oyccxAOwR9ircAwYWHTPOdNIaLIBWqFxJIJSFBAn8ImTC0C3zKYisX0jd%2BerdhYhALJiljSbyA4w9UWGf03q1PZEswI0ZMIQCao8YEzE9Ep9uxuC5shDq4KyhdG6aLo9jGpOdbmx8s20L3A%2B2uLFcB%2Fv2G9QmNZhq%2BWJ0TxMRppCzoxakv9w8D4Y96TMettql7Nu%2BGzheEbKscJfnGcx%2BUfE47VLcI1rEKF0tUh82%2BAnLfU8yNx8hVwoxT3KWyqo2qRHIpcfrRjcUbcVFJDSnqlDRrN0lgirJwCiANVuSXt6XZFjzlRj%2BEX9FLUd8WJTDzBIb2%2B1iugdyCUldL0rVx%2F15xaI8L8kMltAMsjFm4u02iMVkAi6s2vQC0kI0KgwbiD16AlAxxLG%2FYmZC2pRHCZXjLWA25oLnbkf518iSVt4xtOauEn6TNoN4z5pUaxQr%2B08K6VNrHCY8xj9%2BmHu8akf9XXp92gNXwkEmGLhhMz5ISZjZac9mcqvewxitbFbQeY14rzFKrrofwoGNpanIC9FjbiWqqQc4BtfJi98PJVTPcyG6OAuYAACuewuDvNbkNrpdiQQOhwnrFv6zSu1b7WD7bN5VFMNXroMTsM5SJ8GL8p0cwQrGpw%2Fz44D7USB8n%2B7C3UtMMMz%2Bw8kGOqUBRE9jS1IIIM7BfptLttX3HBaZvETBn1Wk5QasOxkZ7G00BsRt1tj8lOR0sxwJPzjIN5oiWsb6zGBt%2BH6tt9U4jyY3u6ED3UaRKtA6jjccanESXN2br5mESTUki%2FO3I6yf6spa%2BwIyiyO88%2BTDIZf3lLM9r5%2FZtlzoW6RCqBnOI2NjcHXTOTFm%2F3lKSrfOae2FI8eBXgeFnvM1afVxv3iP56y2fbt9&X-Amz-Signature=5a626f468691eee27ac15c09ec8e093f31e9084a70c3610f0b4a0a9cb8bbc707&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4FKST6V%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T034512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIB93toid%2BDpCcCXyMFB3R5M6tQduxIBRvsSnqtSX71AwAiEAxeRgmMbrjsCzKSmWdo%2FZdbUPuyyKugtx9j2dzLIEhQYq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDAN0%2BL1oyccxAOwR9ircAwYWHTPOdNIaLIBWqFxJIJSFBAn8ImTC0C3zKYisX0jd%2BerdhYhALJiljSbyA4w9UWGf03q1PZEswI0ZMIQCao8YEzE9Ep9uxuC5shDq4KyhdG6aLo9jGpOdbmx8s20L3A%2B2uLFcB%2Fv2G9QmNZhq%2BWJ0TxMRppCzoxakv9w8D4Y96TMettql7Nu%2BGzheEbKscJfnGcx%2BUfE47VLcI1rEKF0tUh82%2BAnLfU8yNx8hVwoxT3KWyqo2qRHIpcfrRjcUbcVFJDSnqlDRrN0lgirJwCiANVuSXt6XZFjzlRj%2BEX9FLUd8WJTDzBIb2%2B1iugdyCUldL0rVx%2F15xaI8L8kMltAMsjFm4u02iMVkAi6s2vQC0kI0KgwbiD16AlAxxLG%2FYmZC2pRHCZXjLWA25oLnbkf518iSVt4xtOauEn6TNoN4z5pUaxQr%2B08K6VNrHCY8xj9%2BmHu8akf9XXp92gNXwkEmGLhhMz5ISZjZac9mcqvewxitbFbQeY14rzFKrrofwoGNpanIC9FjbiWqqQc4BtfJi98PJVTPcyG6OAuYAACuewuDvNbkNrpdiQQOhwnrFv6zSu1b7WD7bN5VFMNXroMTsM5SJ8GL8p0cwQrGpw%2Fz44D7USB8n%2B7C3UtMMMz%2Bw8kGOqUBRE9jS1IIIM7BfptLttX3HBaZvETBn1Wk5QasOxkZ7G00BsRt1tj8lOR0sxwJPzjIN5oiWsb6zGBt%2BH6tt9U4jyY3u6ED3UaRKtA6jjccanESXN2br5mESTUki%2FO3I6yf6spa%2BwIyiyO88%2BTDIZf3lLM9r5%2FZtlzoW6RCqBnOI2NjcHXTOTFm%2F3lKSrfOae2FI8eBXgeFnvM1afVxv3iP56y2fbt9&X-Amz-Signature=5a626f468691eee27ac15c09ec8e093f31e9084a70c3610f0b4a0a9cb8bbc707&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

