import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setReady } from './actions';

interface ISubscriptionMap {
    [subName: string]: Meteor.SubscriptionHandle;
}

interface ISubscriptionStatusMap {
    [subName: string]: Tracker.Computation;
}

interface ISubscriptionComponentProps {
    mongo: any;
    setReady: (name: string, ready: boolean) => any;
}

class SubscriptionComponent extends React.Component<ISubscriptionComponentProps> {

    subs: ISubscriptionMap;
    ready: ISubscriptionStatusMap;

    constructor(props: ISubscriptionComponentProps) {
        super(props);
        this.subs = {};
        this.ready = {};
    }

    componentWillUnmount() {
        _.forEach(_.keys(this.subs), (k) => this.subs[k].stop());
        _.forEach(_.keys(this.ready), (k) => this.ready[k].stop());
    }

    subscribe(name, ...args) {
        if (this.subs[name])
            this.subs[name].stop();

        this.subs[name] = Meteor.subscribe(name, ...args);

        Tracker.autorun((comp) => {
            this.ready[name] = comp;
            this.props.setReady(name, this.subs[name].ready());
        });
    }

    subscriptionReady(name) {
        return this.props.mongo.collectionsReady[name];
    }

}

export const withSubscription = (ComposedComponent) => {

    class WithSubscription extends SubscriptionComponent {
        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    subscribe={this.subscribe.bind(this)}
                    subscriptionReady={this.subscriptionReady.bind(this)}
                />
            );
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return bindActionCreators({ setReady }, dispatch);
    };

    return connect((fn) => fn, mapDispatchToProps)(WithSubscription);

};
